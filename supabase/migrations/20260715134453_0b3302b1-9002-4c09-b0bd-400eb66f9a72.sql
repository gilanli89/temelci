
-- 1. Drop overly-permissive public policies
DROP POLICY IF EXISTS "Public read by share token" ON public.xray_requests;
DROP POLICY IF EXISTS "Public read items via published requests" ON public.xray_treatment_items;
DROP POLICY IF EXISTS "Public read xrays" ON storage.objects;

-- 2. Token-scoped RPC to fetch plan + items
CREATE OR REPLACE FUNCTION public.get_xray_plan(_token uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  req public.xray_requests;
  items jsonb;
BEGIN
  SELECT * INTO req FROM public.xray_requests
   WHERE share_token = _token
     AND status = ANY (ARRAY['quoted','sent','converted','accepted','rejected']);
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  SELECT COALESCE(jsonb_agg(to_jsonb(i) ORDER BY i.sort_order), '[]'::jsonb) INTO items
    FROM public.xray_treatment_items i WHERE i.request_id = req.id;

  RETURN jsonb_build_object(
    'id', req.id,
    'patient_name', req.patient_name,
    'status', req.status,
    'currency', req.currency,
    'price_total', req.price_total,
    'doctor_notes', req.doctor_notes,
    'annotated_image_url', req.annotated_image_url,
    'xray_image_url', req.xray_image_url,
    'items', items
  );
END;
$$;

-- 3. Token-scoped RPC for patient to accept/reject
CREATE OR REPLACE FUNCTION public.respond_xray_plan(_token uuid, _accept boolean)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_status text;
BEGIN
  new_status := CASE WHEN _accept THEN 'accepted' ELSE 'rejected' END;
  UPDATE public.xray_requests
     SET status = new_status
   WHERE share_token = _token
     AND status = ANY (ARRAY['quoted','sent','converted']);
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid token or plan not available';
  END IF;
  RETURN new_status;
END;
$$;

REVOKE ALL ON FUNCTION public.get_xray_plan(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.respond_xray_plan(uuid, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_xray_plan(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.respond_xray_plan(uuid, boolean) TO anon, authenticated;

-- 4. Lock down internal SECURITY DEFINER helpers from API execution
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.assign_default_role() FROM PUBLIC, anon, authenticated;
