
-- MEDIA bucket: public read, admin write
CREATE POLICY "Public read media files" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- XRAYS bucket: public read (so share links work), public insert (patient upload), admin/doctor manage
CREATE POLICY "Public read xrays" ON storage.objects FOR SELECT USING (bucket_id = 'xrays');
CREATE POLICY "Anyone upload xray" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'xrays');
CREATE POLICY "Admins & doctors update xrays" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'xrays' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'doctor')));
CREATE POLICY "Admins delete xrays" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'xrays' AND public.has_role(auth.uid(), 'admin'));
