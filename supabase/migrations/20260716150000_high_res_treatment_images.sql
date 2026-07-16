-- Keep the production CMS in sync with the high-resolution, locally hosted
-- treatment image library. Local assets avoid third-party hotlinks and remain
-- available to search and social crawlers on stable, descriptive URLs.
update public.treatments
set
  featured_image = '/treatments/' || slug || '.webp',
  og_image = '/treatments/' || slug || '.webp',
  updated_at = now()
where language = 'en'
  and slug in (
    'hollywood-smile', 'veneers', 'teeth-whitening', 'dental-bonding',
    'smile-makeover', 'implants', 'all-on-4', 'crowns', 'zirconia-crowns',
    'composite-fillings', 'full-mouth-restoration', 'root-canal-treatment',
    'wisdom-tooth-removal', 'gum-disease-treatment', 'laser-gum-treatment',
    'bruxism-treatment', 'clear-aligners', 'orthodontics',
    'preventive-dentistry'
  );
