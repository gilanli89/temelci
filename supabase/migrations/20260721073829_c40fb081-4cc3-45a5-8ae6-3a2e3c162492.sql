
DO $$
DECLARE
  new_uid uuid;
  existing_uid uuid;
BEGIN
  SELECT id INTO existing_uid FROM auth.users WHERE email = 'admin@temelci.com';

  IF existing_uid IS NULL THEN
    new_uid := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_super_admin, is_sso_user
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_uid,
      'authenticated',
      'authenticated',
      'admin@temelci.com',
      crypt('Admin12345!', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Admin"}'::jsonb,
      false, false
    );

    INSERT INTO auth.identities (
      id, provider_id, user_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(),
      new_uid::text,
      new_uid,
      jsonb_build_object('sub', new_uid::text, 'email', 'admin@temelci.com', 'email_verified', true),
      'email',
      now(), now(), now()
    );
  ELSE
    new_uid := existing_uid;
    UPDATE auth.users
       SET encrypted_password = crypt('Admin12345!', gen_salt('bf')),
           email_confirmed_at = COALESCE(email_confirmed_at, now()),
           updated_at = now()
     WHERE id = new_uid;
  END IF;

  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new_uid, 'admin@temelci.com', 'Admin')
  ON CONFLICT (id) DO NOTHING;

  DELETE FROM public.user_roles WHERE user_id = new_uid;
  INSERT INTO public.user_roles (user_id, role) VALUES (new_uid, 'super_admin');
END $$;
