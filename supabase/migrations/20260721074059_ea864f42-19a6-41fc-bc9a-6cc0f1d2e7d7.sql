
ALTER TABLE public.xray_requests
  ADD COLUMN IF NOT EXISTS delivery_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS delivery_error text,
  ADD COLUMN IF NOT EXISTS plan_expires_at timestamptz;

CREATE OR REPLACE FUNCTION public.archive_xray_request(_request_id uuid)
RETURNS public.xray_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  req public.xray_requests;
BEGIN
  IF NOT public.has_any_role(auth.uid(), ARRAY['super_admin','admin']::app_role[]) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  UPDATE public.xray_requests
     SET status = 'archived', updated_at = now()
   WHERE id = _request_id
  RETURNING * INTO req;
  IF NOT FOUND THEN RAISE EXCEPTION 'X-ray request not found'; END IF;
  RETURN req;
END; $$;

REVOKE EXECUTE ON FUNCTION public.archive_xray_request(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.archive_xray_request(uuid) TO authenticated;
