-- Production CMS foundation for the English pilot.
-- Keeps the existing schema compatible while making public reads deterministic,
-- closing self-signup role escalation, and adding structured editable content.

-- New users receive a profile only. Roles must be granted by an existing admin.
DROP TRIGGER IF EXISTS assign_role_on_signup ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name);
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Structured treatment fields used by both the editor and the public detail page.
ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS benefits text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS suitable_for text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS process_steps text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS expected_results text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS og_image text;

ALTER TABLE public.before_after
  ADD COLUMN IF NOT EXISTS before_alt text,
  ADD COLUMN IF NOT EXISTS after_alt text,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS patient_consent_confirmed boolean NOT NULL DEFAULT false;

ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS review_date date,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;

-- Editable metadata and hero copy for every public page. Complex entity content
-- remains in its dedicated table; page-level copy lives here.
CREATE TABLE IF NOT EXISTS public.site_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  page_type text NOT NULL DEFAULT 'standard',
  title text NOT NULL,
  eyebrow text,
  hero_title text,
  hero_description text,
  hero_image text,
  body jsonb NOT NULL DEFAULT '{}'::jsonb,
  seo_title text,
  seo_description text,
  focus_keyword text,
  og_image text,
  language text NOT NULL DEFAULT 'en' CHECK (language = 'en'),
  content_status public.content_status NOT NULL DEFAULT 'published',
  scheduled_at timestamptz,
  deleted_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_pages TO authenticated;
GRANT ALL ON public.site_pages TO service_role;
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_pages public read" ON public.site_pages;
CREATE POLICY "site_pages public read" ON public.site_pages FOR SELECT TO anon, authenticated
  USING (content_status = 'published' AND deleted_at IS NULL AND language = 'en');
DROP POLICY IF EXISTS "site_pages editorial write" ON public.site_pages;
CREATE POLICY "site_pages editorial write" ON public.site_pages FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]));

DROP TRIGGER IF EXISTS site_pages_updated ON public.site_pages;
CREATE TRIGGER site_pages_updated BEFORE UPDATE ON public.site_pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Public content policies must not invoke role helpers for anonymous requests.
-- Editorial access is handled by a separate authenticated policy.
DROP POLICY IF EXISTS "Public read published posts" ON public.posts;
DROP POLICY IF EXISTS "Admins manage posts" ON public.posts;
CREATE POLICY "posts public published" ON public.posts FOR SELECT TO anon, authenticated
  USING (status = 'published' AND published = true AND deleted_at IS NULL AND language = 'en');
CREATE POLICY "posts editorial manage" ON public.posts FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]));

DROP POLICY IF EXISTS "Public read active doctors" ON public.doctors;
DROP POLICY IF EXISTS "Admins manage doctors" ON public.doctors;
CREATE POLICY "doctors public published" ON public.doctors FOR SELECT TO anon, authenticated
  USING (active = true AND content_status = 'published' AND deleted_at IS NULL);
CREATE POLICY "doctors editorial manage" ON public.doctors FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]));

DROP POLICY IF EXISTS "Public read active treatments" ON public.treatments;
DROP POLICY IF EXISTS "Admins manage treatments" ON public.treatments;
CREATE POLICY "treatments public published" ON public.treatments FOR SELECT TO anon, authenticated
  USING (active = true AND content_status = 'published' AND deleted_at IS NULL AND language = 'en');
CREATE POLICY "treatments editorial manage" ON public.treatments FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]));

DROP POLICY IF EXISTS "Public read published cases" ON public.before_after;
DROP POLICY IF EXISTS "Admins manage cases" ON public.before_after;
CREATE POLICY "before_after public published" ON public.before_after FOR SELECT TO anon, authenticated
  USING (published = true AND content_status = 'published' AND deleted_at IS NULL AND language = 'en');
CREATE POLICY "before_after editorial manage" ON public.before_after FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::public.app_role[]));

-- Translation rows may only be public when their parent is public.
DROP POLICY IF EXISTS "Public read post translations" ON public.post_translations;
CREATE POLICY "post translations public published" ON public.post_translations FOR SELECT TO anon, authenticated
  USING (lang = 'en' AND EXISTS (
    SELECT 1 FROM public.posts p
    WHERE p.id = post_id AND p.status = 'published' AND p.published = true AND p.deleted_at IS NULL
  ));

DROP POLICY IF EXISTS "Public read doctor translations" ON public.doctor_translations;
CREATE POLICY "doctor translations public published" ON public.doctor_translations FOR SELECT TO anon, authenticated
  USING (lang = 'en' AND EXISTS (
    SELECT 1 FROM public.doctors d
    WHERE d.id = doctor_id AND d.active = true AND d.content_status = 'published' AND d.deleted_at IS NULL
  ));

DROP POLICY IF EXISTS "Public read treatment translations" ON public.treatment_translations;
CREATE POLICY "treatment translations public published" ON public.treatment_translations FOR SELECT TO anon, authenticated
  USING (lang = 'en' AND EXISTS (
    SELECT 1 FROM public.treatments t
    WHERE t.id = treatment_id AND t.active = true AND t.content_status = 'published' AND t.deleted_at IS NULL
  ));

DROP POLICY IF EXISTS "Public read case translations" ON public.before_after_translations;
CREATE POLICY "case translations public published" ON public.before_after_translations FOR SELECT TO anon, authenticated
  USING (lang = 'en' AND EXISTS (
    SELECT 1 FROM public.before_after b
    WHERE b.id = case_id AND b.published = true AND b.content_status = 'published' AND b.deleted_at IS NULL
  ));

CREATE INDEX IF NOT EXISTS treatments_public_idx
  ON public.treatments (language, content_status, active, sort_order) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS doctors_public_idx
  ON public.doctors (content_status, active, sort_order) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS before_after_public_idx
  ON public.before_after (language, content_status, published, sort_order) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS reviews_public_idx
  ON public.reviews (language, content_status, featured, sort_order) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS faqs_public_idx
  ON public.faqs (language, scope, scope_ref, content_status, sort_order) WHERE deleted_at IS NULL;

INSERT INTO public.site_pages (slug, page_type, title, hero_title, hero_description, seo_title, seo_description)
VALUES
  ('home', 'home', 'Home', 'Your trusted dental clinic in North Cyprus', 'Advanced dental care, transparent planning and personal support for international patients.', 'Temelci Dental Clinic in Kyrenia, North Cyprus', 'Dental implants, veneers, Hollywood Smile and restorative dentistry in Kyrenia, North Cyprus.'),
  ('treatments', 'listing', 'Treatments', 'Dental treatments tailored to you', 'Explore evidence-based cosmetic, implant and restorative treatments.', 'Dental Treatments in North Cyprus | Temelci Dental', 'Explore dental implants, veneers, crowns, smile design and specialist dental treatments in Kyrenia.'),
  ('before-after', 'listing', 'Before & After', 'Real patients. Real results.', 'Browse real treatment outcomes published with patient consent.', 'Dental Before and After Results | Temelci Dental', 'View real dental transformations including veneers, implants, crowns and smile makeovers.'),
  ('reviews', 'listing', 'Patient Reviews', 'Patient experiences', 'Read verified experiences from patients who travelled to Temelci Dental.', 'Patient Reviews | Temelci Dental North Cyprus', 'Read patient reviews of dental treatment, dental tourism and aftercare at Temelci Dental.'),
  ('about', 'standard', 'About', 'A family clinic built on clinical trust', 'Meet our team and learn about our approach to long-term dental care.', 'About Temelci Dental Clinic', 'Meet the dentists and clinical team at Temelci Dental Clinic in Kyrenia, North Cyprus.'),
  ('contact', 'standard', 'Contact', 'Talk to our patient team', 'Send your questions or treatment goals and receive a personal response.', 'Contact Temelci Dental Clinic', 'Contact Temelci Dental Clinic in Kyrenia for treatment planning, dental tourism and appointment enquiries.'),
  ('blog', 'listing', 'Blog', 'Dental guides and clinic insights', 'Clear, clinician-reviewed information to help you make informed treatment decisions.', 'Dental Blog | Temelci Dental', 'Evidence-informed guides about implants, veneers, crowns, dental tourism and oral health.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.site_settings (key, value)
VALUES
  ('brand_name', '"Temelci Dental Clinic"'::jsonb),
  ('tagline', '"Personal dental care in Kyrenia"'::jsonb),
  ('primary_language', '"en"'::jsonb),
  ('address', '"Salih Miroğlu Caddesi No:14, Ersoy Apt. D:4, Kyrenia, North Cyprus"'::jsonb),
  ('phone', '"+90 533 822 9445"'::jsonb),
  ('whatsapp', '"+90 533 822 9445"'::jsonb),
  ('email', '"info@temelcidentist.com"'::jsonb),
  ('instagram', '"https://www.instagram.com/dentaltemelci/"'::jsonb),
  ('facebook', '"https://www.facebook.com/p/Temelci-61577466848604/"'::jsonb),
  ('default_seo_title', '"Temelci Dental Clinic in Kyrenia, North Cyprus"'::jsonb),
  ('default_seo_description', '"Dental implants, veneers, crowns and restorative dentistry with personal support for international patients."'::jsonb)
ON CONFLICT (key) DO NOTHING;
