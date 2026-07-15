
-- Phase 1b: CMS schema — status columns, new tables (roles enum already committed)

-- content_status enum
DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft','in_review','scheduled','published','archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- has_any_role helper
CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid, _roles app_role[])
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = ANY(_roles))
$$;
REVOKE ALL ON FUNCTION public.has_any_role(uuid, app_role[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, app_role[]) TO authenticated;

-- Publishing/audit columns on existing tables
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS content_status public.content_status NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS created_by uuid,
  ADD COLUMN IF NOT EXISTS updated_by uuid;

ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS content_status public.content_status NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS category_slug text,
  ADD COLUMN IF NOT EXISTS scheduled_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS created_by uuid,
  ADD COLUMN IF NOT EXISTS updated_by uuid;

ALTER TABLE public.doctors
  ADD COLUMN IF NOT EXISTS content_status public.content_status NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS created_by uuid,
  ADD COLUMN IF NOT EXISTS updated_by uuid;

ALTER TABLE public.before_after
  ADD COLUMN IF NOT EXISTS content_status public.content_status NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- Treatment categories
CREATE TABLE IF NOT EXISTS public.treatment_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.treatment_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.treatment_categories TO authenticated;
GRANT ALL ON public.treatment_categories TO service_role;
ALTER TABLE public.treatment_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "cat public read" ON public.treatment_categories;
CREATE POLICY "cat public read" ON public.treatment_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "cat admin write" ON public.treatment_categories;
CREATE POLICY "cat admin write" ON public.treatment_categories FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]));

-- Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  country text,
  country_flag text,
  rating int NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  source text,
  content text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  sort_order int NOT NULL DEFAULT 0,
  content_status public.content_status NOT NULL DEFAULT 'published',
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews public read" ON public.reviews;
CREATE POLICY "reviews public read" ON public.reviews FOR SELECT
  USING (content_status='published' AND deleted_at IS NULL);
DROP POLICY IF EXISTS "reviews admin write" ON public.reviews;
CREATE POLICY "reviews admin write" ON public.reviews FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]));

CREATE TABLE IF NOT EXISTS public.review_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  lang text NOT NULL,
  content text NOT NULL,
  UNIQUE (review_id, lang)
);
GRANT SELECT ON public.review_translations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.review_translations TO authenticated;
GRANT ALL ON public.review_translations TO service_role;
ALTER TABLE public.review_translations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rt public read" ON public.review_translations;
CREATE POLICY "rt public read" ON public.review_translations FOR SELECT USING (true);
DROP POLICY IF EXISTS "rt admin write" ON public.review_translations;
CREATE POLICY "rt admin write" ON public.review_translations FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor','translator']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor','translator']::app_role[]));

-- FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope text NOT NULL DEFAULT 'global',
  scope_ref text,
  question text NOT NULL,
  answer text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  sort_order int NOT NULL DEFAULT 0,
  content_status public.content_status NOT NULL DEFAULT 'published',
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "faqs public read" ON public.faqs;
CREATE POLICY "faqs public read" ON public.faqs FOR SELECT
  USING (content_status='published' AND deleted_at IS NULL);
DROP POLICY IF EXISTS "faqs admin write" ON public.faqs;
CREATE POLICY "faqs admin write" ON public.faqs FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]));

-- Research publications
CREATE TABLE IF NOT EXISTS public.research_publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  pub_type text NOT NULL DEFAULT 'article',
  title text NOT NULL,
  abstract text,
  content text,
  authors text[],
  journal text,
  year int,
  volume text,
  issue text,
  pages text,
  doi text,
  external_url text,
  keywords text[],
  cover_image text,
  pdf_url text,
  sci_indexed boolean NOT NULL DEFAULT false,
  language text NOT NULL DEFAULT 'en',
  sort_order int NOT NULL DEFAULT 0,
  content_status public.content_status NOT NULL DEFAULT 'published',
  scheduled_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.research_publications TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.research_publications TO authenticated;
GRANT ALL ON public.research_publications TO service_role;
ALTER TABLE public.research_publications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "rp public read" ON public.research_publications;
CREATE POLICY "rp public read" ON public.research_publications FOR SELECT
  USING (content_status='published' AND deleted_at IS NULL);
DROP POLICY IF EXISTS "rp admin write" ON public.research_publications;
CREATE POLICY "rp admin write" ON public.research_publications FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor']::app_role[]));

-- Lead notes + status history
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  author_id uuid,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_notes TO authenticated;
GRANT ALL ON public.lead_notes TO service_role;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "lead_notes staff" ON public.lead_notes;
CREATE POLICY "lead_notes staff" ON public.lead_notes FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','lead_manager']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','lead_manager']::app_role[]));

CREATE TABLE IF NOT EXISTS public.lead_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  changed_by uuid,
  changed_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.lead_status_history TO authenticated;
GRANT ALL ON public.lead_status_history TO service_role;
ALTER TABLE public.lead_status_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "lsh staff read" ON public.lead_status_history;
CREATE POLICY "lsh staff read" ON public.lead_status_history FOR SELECT TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','lead_manager']::app_role[]));
DROP POLICY IF EXISTS "lsh staff insert" ON public.lead_status_history;
CREATE POLICY "lsh staff insert" ON public.lead_status_history FOR INSERT TO authenticated
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','lead_manager']::app_role[]));

-- Redirects
CREATE TABLE IF NOT EXISTS public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path text UNIQUE NOT NULL,
  to_path text NOT NULL,
  status_code int NOT NULL DEFAULT 301,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.redirects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.redirects TO authenticated;
GRANT ALL ON public.redirects TO service_role;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "redir public read" ON public.redirects;
CREATE POLICY "redir public read" ON public.redirects FOR SELECT USING (true);
DROP POLICY IF EXISTS "redir admin write" ON public.redirects;
CREATE POLICY "redir admin write" ON public.redirects FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin']::app_role[]));

-- updated_at triggers
DO $$ BEGIN CREATE TRIGGER trg_reviews_updated BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TRIGGER trg_faqs_updated BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TRIGGER trg_rp_updated BEFORE UPDATE ON public.research_publications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TRIGGER trg_cat_updated BEFORE UPDATE ON public.treatment_categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Seed treatment categories
INSERT INTO public.treatment_categories (slug, name, sort_order) VALUES
  ('aesthetic', 'Aesthetic & Smile Design', 1),
  ('implants', 'Implants & Restorations', 2),
  ('specialist', 'Specialist Treatments', 3),
  ('orthodontics', 'Orthodontics & Prevention', 4)
ON CONFLICT (slug) DO NOTHING;
