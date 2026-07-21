
ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS review_date date;

ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS benefits text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS suitable_for text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS process_steps text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS expected_results text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS og_image text;

ALTER TABLE public.site_pages
  ADD COLUMN IF NOT EXISTS og_image text;

ALTER TABLE public.xray_requests
  ADD COLUMN IF NOT EXISTS plan_version integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.claim_xray_request(_request_id uuid)
RETURNS public.xray_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  req public.xray_requests;
BEGIN
  IF NOT public.has_any_role(auth.uid(), ARRAY['super_admin','admin','doctor']::app_role[]) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  UPDATE public.xray_requests
     SET doctor_id = COALESCE(doctor_id, auth.uid()),
         status = CASE WHEN status = 'new' THEN 'in_review' ELSE status END,
         updated_at = now()
   WHERE id = _request_id
  RETURNING * INTO req;
  IF NOT FOUND THEN RAISE EXCEPTION 'X-ray request not found'; END IF;
  RETURN req;
END; $$;

REVOKE EXECUTE ON FUNCTION public.claim_xray_request(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_xray_request(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.save_xray_plan(
  _request_id uuid,
  _annotations jsonb,
  _items jsonb,
  _doctor_notes text,
  _currency text,
  _annotated_image_url text,
  _mark_ready boolean
) RETURNS public.xray_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  req public.xray_requests;
  total numeric := 0;
BEGIN
  IF NOT public.has_any_role(auth.uid(), ARRAY['super_admin','admin','doctor']::app_role[]) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT COALESCE(SUM((item->>'price')::numeric), 0) INTO total
    FROM jsonb_array_elements(COALESCE(_items, '[]'::jsonb)) AS item;

  DELETE FROM public.xray_treatment_items WHERE request_id = _request_id;
  INSERT INTO public.xray_treatment_items (request_id, label, price, tooth_number, sort_order, kind)
  SELECT _request_id,
         item->>'label',
         NULLIF(item->>'price','')::numeric,
         NULLIF(item->>'tooth_number','')::integer,
         COALESCE(NULLIF(item->>'sort_order','')::integer, 0),
         item->>'kind'
    FROM jsonb_array_elements(COALESCE(_items,'[]'::jsonb)) AS item
   WHERE item ? 'label';

  UPDATE public.xray_requests
     SET annotations = _annotations,
         doctor_notes = _doctor_notes,
         currency = COALESCE(_currency, currency),
         annotated_image_url = NULLIF(_annotated_image_url, ''),
         price_total = total,
         plan_version = plan_version + 1,
         status = CASE WHEN _mark_ready THEN 'quoted' ELSE status END,
         updated_at = now()
   WHERE id = _request_id
  RETURNING * INTO req;
  IF NOT FOUND THEN RAISE EXCEPTION 'X-ray request not found'; END IF;
  RETURN req;
END; $$;

REVOKE EXECUTE ON FUNCTION public.save_xray_plan(uuid, jsonb, jsonb, text, text, text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_xray_plan(uuid, jsonb, jsonb, text, text, text, boolean) TO authenticated;
