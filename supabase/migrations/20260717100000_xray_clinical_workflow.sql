-- Production workflow for private X-ray cases and dentist-authored treatment plans.

ALTER TABLE public.xray_requests
  ADD COLUMN IF NOT EXISTS assigned_at timestamptz,
  ADD COLUMN IF NOT EXISTS opened_at timestamptz,
  ADD COLUMN IF NOT EXISTS ready_at timestamptz,
  ADD COLUMN IF NOT EXISTS sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS patient_viewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS responded_at timestamptz,
  ADD COLUMN IF NOT EXISTS plan_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS plan_version integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS delivery_status text NOT NULL DEFAULT 'not_sent',
  ADD COLUMN IF NOT EXISTS delivery_channel text,
  ADD COLUMN IF NOT EXISTS delivery_error text,
  ADD COLUMN IF NOT EXISTS patient_consent_at timestamptz;

UPDATE public.xray_requests SET status = 'in_review' WHERE status = 'reviewed';
UPDATE public.xray_requests SET status = 'ready' WHERE status IN ('quoted','converted');

ALTER TABLE public.xray_requests DROP CONSTRAINT IF EXISTS xray_requests_status_check;
ALTER TABLE public.xray_requests ADD CONSTRAINT xray_requests_status_check
  CHECK (status IN ('new','in_review','ready','sent','accepted','rejected','archived'));
ALTER TABLE public.xray_requests DROP CONSTRAINT IF EXISTS xray_requests_delivery_status_check;
ALTER TABLE public.xray_requests ADD CONSTRAINT xray_requests_delivery_status_check
  CHECK (delivery_status IN ('not_sent','pending','sent','partial','failed'));
ALTER TABLE public.xray_requests DROP CONSTRAINT IF EXISTS xray_requests_plan_version_check;
ALTER TABLE public.xray_requests ADD CONSTRAINT xray_requests_plan_version_check
  CHECK (plan_version >= 0);

ALTER TABLE public.xray_treatment_items DROP CONSTRAINT IF EXISTS xray_treatment_items_price_check;
ALTER TABLE public.xray_treatment_items ADD CONSTRAINT xray_treatment_items_price_check CHECK (price >= 0);

CREATE INDEX IF NOT EXISTS xray_requests_clinical_pool_idx
  ON public.xray_requests (status, doctor_id, created_at DESC)
  WHERE status <> 'archived';

CREATE TABLE IF NOT EXISTS public.xray_plan_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.xray_requests(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.xray_plan_events ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.xray_plan_events TO authenticated;
GRANT ALL ON public.xray_plan_events TO service_role;
DROP POLICY IF EXISTS "Clinical staff read xray plan events" ON public.xray_plan_events;
CREATE POLICY "Clinical staff read xray plan events" ON public.xray_plan_events FOR SELECT TO authenticated
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
    OR EXISTS (
      SELECT 1 FROM public.xray_requests request
      WHERE request.id = request_id AND request.doctor_id = auth.uid()
    )
  );
CREATE INDEX IF NOT EXISTS xray_plan_events_request_idx ON public.xray_plan_events (request_id, created_at DESC);

DROP POLICY IF EXISTS "Anyone submits xray requests" ON public.xray_requests;
CREATE POLICY "Patients submit private xray cases" ON public.xray_requests FOR INSERT TO anon
  WITH CHECK (
    status = 'new'
    AND doctor_id IS NULL
    AND annotated_image_url IS NULL
    AND COALESCE(annotations, '[]'::jsonb) = '[]'::jsonb
    AND doctor_notes IS NULL
    AND COALESCE(price_total, 0) = 0
    AND patient_consent_at IS NOT NULL
    AND char_length(patient_name) BETWEEN 1 AND 200
    AND char_length(phone) BETWEEN 3 AND 50
    AND (email IS NULL OR char_length(email) <= 255)
    AND (message IS NULL OR char_length(message) <= 5000)
    AND xray_image_url LIKE 'requests/%'
  );

DROP POLICY IF EXISTS "Clinical staff manage xray requests" ON public.xray_requests;
DROP POLICY IF EXISTS "Clinical staff view xray pool" ON public.xray_requests;
DROP POLICY IF EXISTS "Clinical staff update assigned xray cases" ON public.xray_requests;
DROP POLICY IF EXISTS "Clinical admins delete xray cases" ON public.xray_requests;
CREATE POLICY "Clinical staff view xray pool" ON public.xray_requests FOR SELECT TO authenticated
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
    OR (
      public.has_any_role(auth.uid(), ARRAY['doctor']::public.app_role[])
      AND (doctor_id IS NULL OR doctor_id = auth.uid())
    )
  );
CREATE POLICY "Clinical staff update assigned xray cases" ON public.xray_requests FOR UPDATE TO authenticated
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
    OR (public.has_any_role(auth.uid(), ARRAY['doctor']::public.app_role[]) AND doctor_id = auth.uid())
  )
  WITH CHECK (
    public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
    OR (public.has_any_role(auth.uid(), ARRAY['doctor']::public.app_role[]) AND doctor_id = auth.uid())
  );
CREATE POLICY "Clinical admins delete xray cases" ON public.xray_requests FOR DELETE TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[]));

DROP POLICY IF EXISTS "Clinical staff manage xray items" ON public.xray_treatment_items;
DROP POLICY IF EXISTS "Clinical staff manage assigned xray items" ON public.xray_treatment_items;
CREATE POLICY "Clinical staff manage assigned xray items" ON public.xray_treatment_items FOR ALL TO authenticated
  USING (
    public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
    OR EXISTS (
      SELECT 1 FROM public.xray_requests request
      WHERE request.id = request_id AND request.doctor_id = auth.uid()
    )
  )
  WITH CHECK (
    public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
    OR EXISTS (
      SELECT 1 FROM public.xray_requests request
      WHERE request.id = request_id AND request.doctor_id = auth.uid()
    )
  );

CREATE OR REPLACE FUNCTION public.claim_xray_request(_request_id uuid)
RETURNS public.xray_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claimed public.xray_requests;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[]) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  UPDATE public.xray_requests
     SET doctor_id = COALESCE(doctor_id, auth.uid()),
         assigned_at = COALESCE(assigned_at, now()),
         opened_at = COALESCE(opened_at, now()),
         status = CASE WHEN status = 'new' THEN 'in_review' ELSE status END
   WHERE id = _request_id
     AND status <> 'archived'
     AND (
       doctor_id IS NULL
       OR doctor_id = auth.uid()
       OR public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
     )
  RETURNING * INTO claimed;

  IF NOT FOUND THEN RAISE EXCEPTION 'Case is unavailable or assigned to another dentist'; END IF;
  INSERT INTO public.xray_plan_events (request_id, actor_id, event_type)
  VALUES (_request_id, auth.uid(), 'claimed');
  RETURN claimed;
END;
$$;

CREATE OR REPLACE FUNCTION public.save_xray_plan(
  _request_id uuid,
  _annotations jsonb,
  _items jsonb,
  _doctor_notes text,
  _currency text,
  _annotated_image_url text,
  _mark_ready boolean DEFAULT false
)
RETURNS public.xray_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  saved public.xray_requests;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[]) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  IF jsonb_typeof(_annotations) <> 'array' OR jsonb_array_length(_annotations) > 200 THEN
    RAISE EXCEPTION 'Invalid annotations';
  END IF;
  IF jsonb_typeof(_items) <> 'array' OR jsonb_array_length(_items) > 200 THEN
    RAISE EXCEPTION 'Invalid treatment items';
  END IF;
  IF _currency NOT IN ('EUR','USD','GBP','TRY') THEN RAISE EXCEPTION 'Invalid currency'; END IF;

  UPDATE public.xray_requests
     SET annotations = _annotations,
         annotated_image_url = NULLIF(_annotated_image_url, ''),
         doctor_notes = left(COALESCE(_doctor_notes, ''), 10000),
         currency = _currency,
         price_total = COALESCE((SELECT sum(GREATEST(COALESCE(item.price, 0), 0)) FROM jsonb_to_recordset(_items) AS item(price numeric)), 0),
         status = CASE WHEN _mark_ready THEN 'ready' ELSE 'in_review' END,
         ready_at = CASE WHEN _mark_ready THEN now() ELSE ready_at END,
         plan_expires_at = CASE WHEN _mark_ready THEN now() + interval '30 days' ELSE plan_expires_at END,
         plan_version = plan_version + 1,
         doctor_id = COALESCE(doctor_id, auth.uid()),
         assigned_at = COALESCE(assigned_at, now()),
         opened_at = COALESCE(opened_at, now()),
         delivery_status = CASE WHEN _mark_ready THEN 'pending' ELSE delivery_status END,
         delivery_error = NULL
   WHERE id = _request_id
     AND status NOT IN ('accepted','rejected','archived')
     AND (
       doctor_id = auth.uid()
       OR doctor_id IS NULL
       OR public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
     )
  RETURNING * INTO saved;
  IF NOT FOUND THEN RAISE EXCEPTION 'Case is unavailable or already closed'; END IF;

  DELETE FROM public.xray_treatment_items WHERE request_id = _request_id;
  INSERT INTO public.xray_treatment_items (request_id, treatment_key, tooth_number, note, price, sort_order)
  SELECT _request_id,
         left(item.treatment_key, 200),
         NULLIF(left(COALESCE(item.tooth_number, ''), 50), ''),
         NULLIF(left(COALESCE(item.note, ''), 2000), ''),
         GREATEST(COALESCE(item.price, 0), 0),
         COALESCE(item.sort_order, 0)
    FROM jsonb_to_recordset(_items) AS item(
      treatment_key text, tooth_number text, note text, price numeric, sort_order integer
    )
   WHERE char_length(COALESCE(item.treatment_key, '')) > 0;

  INSERT INTO public.xray_plan_events (request_id, actor_id, event_type, metadata)
  VALUES (_request_id, auth.uid(), CASE WHEN _mark_ready THEN 'plan_ready' ELSE 'draft_saved' END,
          jsonb_build_object('version', saved.plan_version, 'item_count', jsonb_array_length(_items)));
  RETURN saved;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_xray_plan(_token uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  request public.xray_requests;
  items jsonb;
BEGIN
  SELECT * INTO request FROM public.xray_requests
   WHERE share_token = _token
     AND status = ANY (ARRAY['ready','sent','accepted','rejected'])
     AND (plan_expires_at IS NULL OR plan_expires_at > now());
  IF NOT FOUND THEN RETURN NULL; END IF;

  SELECT COALESCE(jsonb_agg(to_jsonb(item) ORDER BY item.sort_order), '[]'::jsonb)
    INTO items FROM public.xray_treatment_items item WHERE item.request_id = request.id;
  RETURN jsonb_build_object(
    'id', request.id,
    'patient_name', request.patient_name,
    'status', request.status,
    'currency', request.currency,
    'price_total', request.price_total,
    'doctor_notes', request.doctor_notes,
    'annotated_image_url', request.annotated_image_url,
    'xray_image_url', request.xray_image_url,
    'plan_version', request.plan_version,
    'plan_expires_at', request.plan_expires_at,
    'items', items
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.respond_xray_plan(_token uuid, _accept boolean)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_status text;
  request_id uuid;
BEGIN
  new_status := CASE WHEN _accept THEN 'accepted' ELSE 'rejected' END;
  UPDATE public.xray_requests
     SET status = new_status, responded_at = now()
   WHERE share_token = _token
     AND status = ANY (ARRAY['ready','sent'])
     AND (plan_expires_at IS NULL OR plan_expires_at > now())
  RETURNING id INTO request_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Invalid token or plan not available'; END IF;
  INSERT INTO public.xray_plan_events (request_id, event_type, metadata)
  VALUES (request_id, 'patient_response', jsonb_build_object('accepted', _accept));
  RETURN new_status;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_xray_request(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.save_xray_plan(uuid,jsonb,jsonb,text,text,text,boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_xray_request(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.save_xray_plan(uuid,jsonb,jsonb,text,text,text,boolean) TO authenticated;
REVOKE ALL ON FUNCTION public.get_xray_plan(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.respond_xray_plan(uuid,boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_xray_plan(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.respond_xray_plan(uuid,boolean) TO anon, authenticated;
