
-- Fix: authenticated users need EXECUTE on has_role() because RLS policies call it during evaluation
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Clean duplicate role on demo admin
DELETE FROM public.user_roles
 WHERE user_id = 'c422ba16-f6e3-4287-bef7-caeaf0dd7039'
   AND role = 'doctor';
