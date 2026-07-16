-- Stable public CMS media, private clinical imagery and consent-gated cases.

-- CMS media is intentionally public so stored URLs do not expire. X-rays are
-- clinical data and must remain private.
UPDATE storage.buckets SET public = true WHERE id = 'media';
UPDATE storage.buckets SET public = false WHERE id = 'xrays';

ALTER TABLE public.xray_requests DROP CONSTRAINT IF EXISTS xray_requests_status_check;
ALTER TABLE public.xray_requests ADD CONSTRAINT xray_requests_status_check
  CHECK (status IN ('new','reviewed','quoted','sent','converted','accepted','rejected','archived'));

DROP POLICY IF EXISTS "Anyone upload xray" ON storage.objects;
DROP POLICY IF EXISTS "Patients upload request xrays" ON storage.objects;
DROP POLICY IF EXISTS "Staff upload xray files" ON storage.objects;
CREATE POLICY "Patients upload request xrays" ON storage.objects FOR INSERT TO anon
  WITH CHECK (
    bucket_id = 'xrays'
    AND (storage.foldername(name))[1] = 'requests'
    AND lower(storage.extension(name)) = ANY (ARRAY['jpg','jpeg','png','webp','avif'])
    AND COALESCE((metadata->>'size')::bigint, 0) <= 15728640
  );
CREATE POLICY "Staff upload xray files" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'xrays'
    AND public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[])
  );
DROP POLICY IF EXISTS "Staff read xray files" ON storage.objects;
CREATE POLICY "Staff read xray files" ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'xrays'
    AND public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[])
  );
DROP POLICY IF EXISTS "Admins & doctors update xrays" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete xrays" ON storage.objects;
CREATE POLICY "Staff update xray files" ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'xrays'
    AND public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[])
  );
CREATE POLICY "Admins delete xray files" ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'xrays'
    AND public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[])
  );

DROP POLICY IF EXISTS "Admins & doctors manage xrays" ON public.xray_requests;
CREATE POLICY "Clinical staff manage xray requests" ON public.xray_requests FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[]));

DROP POLICY IF EXISTS "Admins & doctors manage items" ON public.xray_treatment_items;
CREATE POLICY "Clinical staff manage xray items" ON public.xray_treatment_items FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','doctor']::public.app_role[]));

DROP POLICY IF EXISTS "Public read media files" ON storage.objects;
CREATE POLICY "Public read media files" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Admins upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admins update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete media" ON storage.objects;
CREATE POLICY "Editors upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'media'
    AND public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[])
  );
CREATE POLICY "Editors update media" ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'media'
    AND public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[])
  );
CREATE POLICY "Editors delete media" ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'media'
    AND public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[])
  );

DROP POLICY IF EXISTS "Admins manage media" ON public.media;
CREATE POLICY "Editors manage media records" ON public.media FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]));

DROP POLICY IF EXISTS "Admins manage settings" ON public.site_settings;
CREATE POLICY "Admins manage site settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[]));

DROP POLICY IF EXISTS "Admins manage all roles" ON public.user_roles;
CREATE POLICY "Admins manage all roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[]));

DROP POLICY IF EXISTS "Admins read profiles" ON public.profiles;
CREATE POLICY "Admins read profiles" ON public.profiles FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::public.app_role[]));

DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;
CREATE POLICY "Lead staff manage leads" ON public.leads FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','lead_manager']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','lead_manager']::public.app_role[]));

-- Publishing is impossible unless the editor confirms that a signed patient
-- release exists. The RLS predicate is defence in depth for public reads.
ALTER TABLE public.before_after
  DROP CONSTRAINT IF EXISTS before_after_publication_requires_consent;
ALTER TABLE public.before_after
  ADD CONSTRAINT before_after_publication_requires_consent
  CHECK (published = false OR patient_consent_confirmed = true);

DROP POLICY IF EXISTS "before_after public published" ON public.before_after;
CREATE POLICY "before_after public published" ON public.before_after FOR SELECT TO anon, authenticated
  USING (
    published = true
    AND patient_consent_confirmed = true
    AND content_status = 'published'
    AND deleted_at IS NULL
    AND language = 'en'
  );
