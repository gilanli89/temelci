-- Publish the clinic-provided clinical transformations on stable, locally
-- hosted asset URLs. The records remain fully editable/archiveable in the CMS.
insert into public.before_after (
  slug, title, description, before_image, after_image, before_alt, after_alt,
  tags, treatment_id, sort_order, published, content_status, language,
  patient_consent_confirmed, deleted_at
)
values
  (
    'full-mouth-smile-rehabilitation',
    'Full-mouth smile rehabilitation',
    'A comprehensive restorative smile rehabilitation planned around the patient''s existing bite and facial proportions.',
    '/before-after/full-mouth-smile-rehabilitation-before.webp',
    '/before-after/full-mouth-smile-rehabilitation-after.webp',
    'Patient smile before full-mouth restorative rehabilitation',
    'Patient smile after full-mouth restorative rehabilitation',
    array['full mouth rehabilitation', 'smile makeover', 'crowns'],
    (select id from public.treatments where slug = 'full-mouth-restoration' and language = 'en' limit 1),
    10, true, 'published', 'en', true, null
  ),
  (
    'smile-makeover-with-crowns',
    'Smile makeover with crowns',
    'A natural-looking smile makeover designed to improve tooth shape, proportion and overall harmony.',
    '/before-after/smile-makeover-with-crowns-before.webp',
    '/before-after/smile-makeover-with-crowns-after.webp',
    'Patient teeth before a smile makeover with dental crowns',
    'Patient smile after a smile makeover with dental crowns',
    array['smile makeover', 'crowns', 'restorative dentistry'],
    (select id from public.treatments where slug = 'crowns' and language = 'en' limit 1),
    20, true, 'published', 'en', true, null
  ),
  (
    'full-mouth-restorative-rehabilitation',
    'Full-mouth restorative rehabilitation',
    'A staged restorative case focused on rebuilding function while creating a balanced, confident smile.',
    '/before-after/full-mouth-restorative-rehabilitation-before.webp',
    '/before-after/full-mouth-restorative-rehabilitation-after.webp',
    'Patient teeth before full-mouth restorative dental treatment',
    'Patient smile after full-mouth restorative dental treatment',
    array['full mouth rehabilitation', 'restorative dentistry', 'smile design'],
    (select id from public.treatments where slug = 'full-mouth-restoration' and language = 'en' limit 1),
    30, true, 'published', 'en', true, null
  ),
  (
    'porcelain-veneer-smile-refinement',
    'Porcelain veneer smile refinement',
    'A conservative aesthetic refinement designed to improve symmetry, tooth contours and smile balance.',
    '/before-after/porcelain-veneer-smile-refinement-before.webp',
    '/before-after/porcelain-veneer-smile-refinement-after.webp',
    'Close-up of front teeth before porcelain veneer smile refinement',
    'Close-up of front teeth after porcelain veneer smile refinement',
    array['porcelain veneers', 'cosmetic dentistry', 'smile design'],
    (select id from public.treatments where slug = 'veneers' and language = 'en' limit 1),
    40, true, 'published', 'en', true, null
  ),
  (
    'full-mouth-implant-rehabilitation',
    'Full-mouth implant rehabilitation',
    'An implant-supported full-arch rehabilitation restoring dental function and a natural smile profile.',
    '/before-after/full-mouth-implant-rehabilitation-before.webp',
    '/before-after/full-mouth-implant-rehabilitation-after.webp',
    'Full-arch dental condition before implant-supported rehabilitation',
    'Full-arch prosthetic result after implant-supported rehabilitation',
    array['dental implants', 'full arch', 'implant rehabilitation'],
    (select id from public.treatments where slug = 'all-on-4' and language = 'en' limit 1),
    50, true, 'published', 'en', true, null
  ),
  (
    'implant-supported-full-arch-prosthesis',
    'Implant-supported full-arch prosthesis',
    'A full-arch prosthetic workflow supported by strategically planned dental implants.',
    '/before-after/implant-supported-full-arch-prosthesis-before.webp',
    '/before-after/implant-supported-full-arch-prosthesis-after.webp',
    'Upper arch before implant-supported full-arch prosthetic treatment',
    'Implant-supported full-arch dental prosthesis after treatment',
    array['dental implants', 'all-on-4', 'full arch prosthesis'],
    (select id from public.treatments where slug = 'all-on-4' and language = 'en' limit 1),
    60, true, 'published', 'en', true, null
  ),
  (
    'full-arch-implant-bridge-workflow',
    'Full-arch implant bridge workflow',
    'A laboratory-led implant bridge workflow planned for stable function, cleansability and natural aesthetics.',
    '/before-after/full-arch-implant-bridge-workflow-before.webp',
    '/before-after/full-arch-implant-bridge-workflow-after.webp',
    'Full-arch implant bridge framework during the restorative workflow',
    'Completed full-arch implant bridge during the restorative workflow',
    array['implant bridge', 'full arch', 'dental laboratory'],
    (select id from public.treatments where slug = 'all-on-4' and language = 'en' limit 1),
    70, true, 'published', 'en', true, null
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  before_image = excluded.before_image,
  after_image = excluded.after_image,
  before_alt = excluded.before_alt,
  after_alt = excluded.after_alt,
  tags = excluded.tags,
  treatment_id = excluded.treatment_id,
  sort_order = excluded.sort_order,
  published = excluded.published,
  content_status = excluded.content_status,
  language = excluded.language,
  patient_consent_confirmed = excluded.patient_consent_confirmed,
  deleted_at = null,
  updated_at = now();
