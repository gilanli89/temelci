-- Preserve clinical records and storage objects; remove destructive API deletion.
DROP POLICY IF EXISTS "Clinical admins delete xray cases" ON public.xray_requests;

CREATE OR REPLACE FUNCTION public.archive_xray_request(_request_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[]) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  UPDATE public.xray_requests SET status = 'archived' WHERE id = _request_id AND status <> 'archived';
  IF NOT FOUND THEN RAISE EXCEPTION 'Case not found or already archived'; END IF;
  INSERT INTO public.xray_plan_events (request_id, actor_id, event_type)
  VALUES (_request_id, auth.uid(), 'archived');
END;
$$;

REVOKE ALL ON FUNCTION public.archive_xray_request(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.archive_xray_request(uuid) TO authenticated;
