-- A dedicated, editable lab page gives search engines and visitors a stable
-- destination instead of a fragment within the clinic page.
insert into public.site_pages
  (slug, page_type, title, eyebrow, hero_title, hero_description, seo_title, seo_description, focus_keyword)
values
  (
    'lab',
    'standard',
    'Dental Lab',
    'On-site restorative coordination',
    'In-House Dental Laboratory',
    'Closer communication between dentist and dental technician for carefully planned crowns, veneers, bridges and implant-supported restorations.',
    'In-House Dental Laboratory in Kyrenia | Temelci Dental',
    'Discover Temelci Dental''s in-house dental laboratory and digital restorative workflow for crowns, veneers, bridges and implant-supported restorations.',
    'in-house dental laboratory Kyrenia'
  )
on conflict (slug) do update set
  page_type = excluded.page_type,
  title = excluded.title,
  eyebrow = coalesce(public.site_pages.eyebrow, excluded.eyebrow),
  hero_title = coalesce(public.site_pages.hero_title, excluded.hero_title),
  hero_description = coalesce(public.site_pages.hero_description, excluded.hero_description),
  seo_title = coalesce(public.site_pages.seo_title, excluded.seo_title),
  seo_description = coalesce(public.site_pages.seo_description, excluded.seo_description),
  focus_keyword = coalesce(public.site_pages.focus_keyword, excluded.focus_keyword),
  deleted_at = null;
