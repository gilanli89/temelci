
-- Fix: authenticated users need EXECUTE on has_role() because RLS policies call it during evaluation
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
