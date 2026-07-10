
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.user_roles;
  IF user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'doctor') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.assign_default_role() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS assign_role_on_signup ON auth.users;
CREATE TRIGGER assign_role_on_signup
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_default_role();
