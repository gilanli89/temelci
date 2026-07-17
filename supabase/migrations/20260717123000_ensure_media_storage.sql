-- The Frankfurt project was linked after the original Lovable storage setup,
-- so recreate the CMS buckets explicitly and keep their privacy guarantees.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('xrays', 'xrays', false, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Serve the supplied cases from the CMS media bucket immediately. This keeps
-- the gallery independent from a frontend publish and matches future admin uploads.
update public.before_after
set
  before_image = 'https://srnoroxynbvphrotpinw.supabase.co/storage/v1/object/public/media' || before_image,
  after_image = 'https://srnoroxynbvphrotpinw.supabase.co/storage/v1/object/public/media' || after_image,
  updated_at = now()
where slug in (
  'full-mouth-smile-rehabilitation',
  'smile-makeover-with-crowns',
  'full-mouth-restorative-rehabilitation',
  'porcelain-veneer-smile-refinement',
  'full-mouth-implant-rehabilitation',
  'implant-supported-full-arch-prosthesis',
  'full-arch-implant-bridge-workflow'
)
and before_image like '/before-after/%'
and after_image like '/before-after/%';
