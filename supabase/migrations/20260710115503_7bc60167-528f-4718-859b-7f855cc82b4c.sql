
ALTER TABLE public.doctors
  ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT 'Doctor',
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS specialties text[] DEFAULT '{}';

ALTER TABLE public.treatments
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT 'Treatment',
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS content text,
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text;

ALTER TABLE public.before_after
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'en';
