
-- post_translations extras
ALTER TABLE public.post_translations
  ADD COLUMN IF NOT EXISTS translation_status text NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS source_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS translated_at timestamptz,
  ADD COLUMN IF NOT EXISTS translation_model text,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid;

-- reviews.featured
ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;

-- before_after extras
ALTER TABLE public.before_after
  ADD COLUMN IF NOT EXISTS before_alt text,
  ADD COLUMN IF NOT EXISTS after_alt text,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS patient_consent_confirmed boolean NOT NULL DEFAULT false;

-- xray_requests extras
ALTER TABLE public.xray_requests
  ADD COLUMN IF NOT EXISTS preferred_visit_date date,
  ADD COLUMN IF NOT EXISTS patient_consent_at timestamptz;

-- site_pages table
CREATE TABLE IF NOT EXISTS public.site_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type text NOT NULL,
  slug text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  title text NOT NULL,
  eyebrow text,
  hero_title text,
  hero_description text,
  hero_image text,
  seo_title text,
  seo_description text,
  focus_keyword text,
  content_status public.content_status NOT NULL DEFAULT 'draft',
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slug, language)
);

GRANT SELECT ON public.site_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_pages TO authenticated;
GRANT ALL ON public.site_pages TO service_role;

ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published pages"
  ON public.site_pages FOR SELECT
  USING (content_status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Staff manage pages"
  ON public.site_pages FOR ALL
  TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['super_admin','admin','editor']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['super_admin','admin','editor']::app_role[]));

DROP TRIGGER IF EXISTS site_pages_updated_at ON public.site_pages;
CREATE TRIGGER site_pages_updated_at
  BEFORE UPDATE ON public.site_pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
