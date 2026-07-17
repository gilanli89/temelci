-- Five-language publishing foundation. English remains the editorial source;
-- localized article copy lives in post_translations and is reviewed separately.

ALTER TABLE public.post_translations
  ADD COLUMN IF NOT EXISTS translation_status text NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS source_updated_at timestamptz,
  ADD COLUMN IF NOT EXISTS translated_at timestamptz,
  ADD COLUMN IF NOT EXISTS translation_model text,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'post_translations_supported_lang_check'
  ) THEN
    ALTER TABLE public.post_translations
      ADD CONSTRAINT post_translations_supported_lang_check
      CHECK (lang = ANY (ARRAY['en','de','tr','he','ru']));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'post_translations_status_check'
  ) THEN
    ALTER TABLE public.post_translations
      ADD CONSTRAINT post_translations_status_check
      CHECK (translation_status = ANY (ARRAY['draft','published']));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS post_translations_public_idx
  ON public.post_translations (lang, translation_status, post_id);

DROP POLICY IF EXISTS "post translations public published" ON public.post_translations;
CREATE POLICY "post translations public published" ON public.post_translations
  FOR SELECT TO anon, authenticated
  USING (
    lang = ANY (ARRAY['en','de','tr','he','ru'])
    AND translation_status = 'published'
    AND EXISTS (
      SELECT 1 FROM public.posts p
      WHERE p.id = post_id
        AND p.status = 'published'
        AND p.published = true
        AND p.deleted_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Admins manage post translations" ON public.post_translations;
DROP POLICY IF EXISTS "post translations editorial manage" ON public.post_translations;
CREATE POLICY "post translations editorial manage" ON public.post_translations
  FOR ALL TO authenticated
  USING (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor','translator']::public.app_role[]))
  WITH CHECK (public.has_any_role(auth.uid(), ARRAY['admin','super_admin','editor','translator']::public.app_role[]));

INSERT INTO public.site_settings (key, value)
VALUES
  ('active_languages', '["en","de","tr","he","ru"]'::jsonb),
  ('translation_source_language', '"en"'::jsonb),
  ('translation_review_required', 'true'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
