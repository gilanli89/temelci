
-- Roles enum & table
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Admins manage all roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile + first-user-is-admin trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  user_count INT;
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (id) DO NOTHING;

  SELECT COUNT(*) INTO user_count FROM auth.users;
  IF user_count <= 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'doctor') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Shared updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ POSTS ============
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  featured_image TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON public.posts FOR SELECT USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage posts" ON public.posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER posts_updated BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.post_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  lang TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT,
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_image TEXT,
  UNIQUE (post_id, lang)
);
GRANT SELECT ON public.post_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_translations TO authenticated;
GRANT ALL ON public.post_translations TO service_role;
ALTER TABLE public.post_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read post translations" ON public.post_translations FOR SELECT USING (true);
CREATE POLICY "Admins manage post translations" ON public.post_translations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ DOCTORS ============
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  photo TEXT,
  whatsapp TEXT,
  email TEXT,
  sort_order INT DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.doctors TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.doctors TO authenticated;
GRANT ALL ON public.doctors TO service_role;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active doctors" ON public.doctors FOR SELECT USING (active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage doctors" ON public.doctors FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER doctors_updated BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.doctor_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  lang TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  credentials TEXT,
  UNIQUE (doctor_id, lang)
);
GRANT SELECT ON public.doctor_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.doctor_translations TO authenticated;
GRANT ALL ON public.doctor_translations TO service_role;
ALTER TABLE public.doctor_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read doctor translations" ON public.doctor_translations FOR SELECT USING (true);
CREATE POLICY "Admins manage doctor translations" ON public.doctor_translations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ TREATMENTS ============
CREATE TABLE public.treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  featured_image TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  default_price NUMERIC,
  currency TEXT DEFAULT 'EUR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.treatments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.treatments TO authenticated;
GRANT ALL ON public.treatments TO service_role;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active treatments" ON public.treatments FOR SELECT USING (active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage treatments" ON public.treatments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER treatments_updated BEFORE UPDATE ON public.treatments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.treatment_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_id UUID NOT NULL REFERENCES public.treatments(id) ON DELETE CASCADE,
  lang TEXT NOT NULL,
  name TEXT NOT NULL,
  short_desc TEXT,
  body TEXT,
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  UNIQUE (treatment_id, lang)
);
GRANT SELECT ON public.treatment_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.treatment_translations TO authenticated;
GRANT ALL ON public.treatment_translations TO service_role;
ALTER TABLE public.treatment_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read treatment translations" ON public.treatment_translations FOR SELECT USING (true);
CREATE POLICY "Admins manage treatment translations" ON public.treatment_translations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ BEFORE / AFTER ============
CREATE TABLE public.before_after (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  before_image TEXT NOT NULL,
  after_image TEXT NOT NULL,
  treatment_id UUID REFERENCES public.treatments(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.before_after TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.before_after TO authenticated;
GRANT ALL ON public.before_after TO service_role;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published cases" ON public.before_after FOR SELECT USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage cases" ON public.before_after FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER before_after_updated BEFORE UPDATE ON public.before_after FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.before_after_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES public.before_after(id) ON DELETE CASCADE,
  lang TEXT NOT NULL,
  title TEXT,
  description TEXT,
  UNIQUE (case_id, lang)
);
GRANT SELECT ON public.before_after_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.before_after_translations TO authenticated;
GRANT ALL ON public.before_after_translations TO service_role;
ALTER TABLE public.before_after_translations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read case translations" ON public.before_after_translations FOR SELECT USING (true);
CREATE POLICY "Admins manage case translations" ON public.before_after_translations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ LEADS ============
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'contact',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','converted','archived')),
  notes TEXT,
  lang TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage leads" ON public.leads FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER leads_updated BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ X-RAY REQUESTS ============
CREATE TABLE public.xray_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  patient_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  xray_image_url TEXT NOT NULL,
  annotated_image_url TEXT,
  annotations JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewed','quoted','sent','converted','archived')),
  doctor_notes TEXT,
  price_total NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  doctor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  lang TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.xray_requests TO anon;
GRANT SELECT ON public.xray_requests TO anon; -- share-token reads
GRANT SELECT, INSERT, UPDATE, DELETE ON public.xray_requests TO authenticated;
GRANT ALL ON public.xray_requests TO service_role;
ALTER TABLE public.xray_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits xray requests" ON public.xray_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read by share token" ON public.xray_requests FOR SELECT USING (status IN ('quoted','sent','converted'));
CREATE POLICY "Admins & doctors manage xrays" ON public.xray_requests FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'doctor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'doctor'));
CREATE TRIGGER xray_requests_updated BEFORE UPDATE ON public.xray_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.xray_treatment_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.xray_requests(id) ON DELETE CASCADE,
  treatment_key TEXT NOT NULL,
  tooth_number TEXT,
  note TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.xray_treatment_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.xray_treatment_items TO authenticated;
GRANT ALL ON public.xray_treatment_items TO service_role;
ALTER TABLE public.xray_treatment_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read items via published requests" ON public.xray_treatment_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.xray_requests r WHERE r.id = request_id AND r.status IN ('quoted','sent','converted'))
);
CREATE POLICY "Admins & doctors manage items" ON public.xray_treatment_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'doctor'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'doctor'));

-- ============ MEDIA LIBRARY ============
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT,
  folder TEXT DEFAULT 'general',
  mime_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media TO authenticated;
GRANT ALL ON public.media TO service_role;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Admins manage media" ON public.media FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ SITE SETTINGS ============
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed known settings
INSERT INTO public.site_settings (key, value) VALUES
  ('contact', '{"whatsapp":"+905391104212","phone":"+905391104212","email":"info@smilecyprus.com","address":"Kyrenia, North Cyprus","gtm_id":"GTM-MHCN4KPZ"}'::jsonb),
  ('social', '{"instagram":"","facebook":"","google_maps":"","tiktok":"","youtube":""}'::jsonb),
  ('seo', '{"default_og_image":"","default_title":"Temelci Dental Clinic — Kyrenia, North Cyprus","default_description":"Premium dental care in Kyrenia. Hollywood Smile, implants, veneers. Multilingual clinic serving international patients."}'::jsonb),
  ('brand', '{"name":"Temelci Dental Clinic","tagline":"Premium dental care in Kyrenia"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
