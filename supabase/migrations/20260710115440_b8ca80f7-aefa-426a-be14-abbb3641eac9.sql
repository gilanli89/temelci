
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT 'Untitled',
  ADD COLUMN IF NOT EXISTS excerpt text,
  ADD COLUMN IF NOT EXISTS content text,
  ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS cover_image text,
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS keywords text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT false;

-- Backfill published from status if applicable
UPDATE public.posts SET published = (status = 'published') WHERE status IS NOT NULL;
-- Backfill cover_image from featured_image
UPDATE public.posts SET cover_image = featured_image WHERE cover_image IS NULL AND featured_image IS NOT NULL;

CREATE INDEX IF NOT EXISTS posts_lang_pub_idx ON public.posts (language, published, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_lang_uniq ON public.posts (slug, language);
