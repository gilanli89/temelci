-- Seed the English pilot so every core content type is immediately editable.

INSERT INTO public.treatments
  (slug, title, description, language, category, category_slug, featured_image, icon, tags, sort_order, active, content_status)
VALUES
  ('hollywood-smile', 'Hollywood Smile', 'Get the celebrity smile you have always dreamed of with our premium Hollywood Smile treatment.', 'en', 'Aesthetic & Smile Design', 'aesthetic', '/blog/hollywood-smile.jpg', 'sparkle', ARRAY['hollywood smile','veneers','cosmetic dentistry'], 10, true, 'published'),
  ('veneers', 'Veneers', 'Ultra-thin porcelain shells for a flawless, natural-looking smile.', 'en', 'Aesthetic & Smile Design', 'aesthetic', '/blog/veneers.jpg', 'star', ARRAY['porcelain veneers','smile design','cosmetic dentistry'], 20, true, 'published'),
  ('teeth-whitening', 'Teeth Whitening', 'Professional whitening for a brighter, more confident smile.', 'en', 'Aesthetic & Smile Design', 'aesthetic', '/blog/teeth-whitening.jpg', 'zap', ARRAY['teeth whitening','cosmetic dentistry'], 30, true, 'published'),
  ('dental-bonding', 'Dental Bonding', 'Tooth-coloured composite resin to repair chips, cracks, gaps and discolouration in a single visit.', 'en', 'Aesthetic & Smile Design', 'aesthetic', '/blog/hollywood-smile.jpg', 'layers', ARRAY['dental bonding','composite bonding'], 40, true, 'published'),
  ('smile-makeover', 'Smile Makeover', 'Complete smile transformation combining multiple cosmetic procedures.', 'en', 'Aesthetic & Smile Design', 'aesthetic', '/blog/hollywood-smile.jpg', 'heart', ARRAY['smile makeover','cosmetic dentistry'], 50, true, 'published'),
  ('implants', 'Dental Implants', 'Permanent tooth replacement solutions using evidence-based implant technology.', 'en', 'Implants & Restorations', 'implants', '/blog/dental-implant.jpg', 'shield', ARRAY['dental implants','missing teeth','implant dentistry'], 60, true, 'published'),
  ('all-on-4', 'All-on-4 / All-on-6', 'Full-arch tooth replacement supported by four or six dental implants.', 'en', 'Implants & Restorations', 'implants', '/blog/full-mouth-restoration.jpg', 'award', ARRAY['all-on-4','all-on-6','full arch implants'], 70, true, 'published'),
  ('crowns', 'Dental Crowns', 'Restore damaged teeth with durable, natural-looking dental crowns.', 'en', 'Implants & Restorations', 'implants', '/blog/crowns.jpg', 'crown', ARRAY['dental crowns','restorative dentistry'], 80, true, 'published'),
  ('zirconia-crowns', 'Zirconia Crowns', 'Metal-free zirconia crowns designed for strength, fit and natural aesthetics.', 'en', 'Implants & Restorations', 'implants', '/blog/crowns.jpg', 'award', ARRAY['zirconia crowns','metal-free crowns'], 90, true, 'published'),
  ('composite-fillings', 'Composite Fillings', 'Tooth-coloured composite restorations that blend with natural teeth.', 'en', 'Implants & Restorations', 'implants', '/blog/crowns.jpg', 'layers', ARRAY['composite filling','tooth coloured filling'], 100, true, 'published'),
  ('full-mouth-restoration', 'Full Mouth Restoration', 'Comprehensive reconstruction planned for complex functional and aesthetic needs.', 'en', 'Implants & Restorations', 'implants', '/blog/full-mouth-restoration.jpg', 'shield', ARRAY['full mouth restoration','dental rehabilitation'], 110, true, 'published'),
  ('root-canal-treatment', 'Root Canal Treatment', 'Endodontic treatment designed to save infected or damaged teeth.', 'en', 'Specialist Treatments', 'specialist', '/blog/dental-implant.jpg', 'activity', ARRAY['root canal','endodontics'], 120, true, 'published'),
  ('wisdom-tooth-removal', 'Wisdom Tooth Removal', 'Assessment and surgical extraction of impacted or problematic wisdom teeth.', 'en', 'Specialist Treatments', 'specialist', '/blog/dental-implant.jpg', 'activity', ARRAY['wisdom tooth','oral surgery'], 130, true, 'published'),
  ('gum-disease-treatment', 'Gum Disease Treatment', 'Periodontal care to control gum disease and protect supporting tissues.', 'en', 'Specialist Treatments', 'specialist', '/blog/dental-implant.jpg', 'activity', ARRAY['gum disease','periodontics'], 140, true, 'published'),
  ('laser-gum-treatment', 'Laser Gum Treatment', 'Minimally invasive laser-assisted treatment for selected gum conditions and reshaping.', 'en', 'Specialist Treatments', 'specialist', '/blog/hollywood-smile.jpg', 'zap', ARRAY['laser gum treatment','gum contouring'], 150, true, 'published'),
  ('bruxism-treatment', 'Bruxism / Teeth Grinding', 'Diagnosis and management of teeth grinding to protect teeth, jaw joints and sleep quality.', 'en', 'Specialist Treatments', 'specialist', '/blog/crowns.jpg', 'activity', ARRAY['bruxism','teeth grinding','night guard'], 160, true, 'published'),
  ('clear-aligners', 'Clear Aligners', 'Removable clear aligners planned to improve tooth alignment and bite.', 'en', 'Orthodontics & Prevention', 'orthodontics', '/blog/veneers.jpg', 'check', ARRAY['clear aligners','orthodontics'], 170, true, 'published'),
  ('orthodontics', 'Orthodontic Treatment', 'Correct misaligned teeth and jaws for a healthier bite and a more confident smile.', 'en', 'Orthodontics & Prevention', 'orthodontics', '/blog/veneers.jpg', 'check', ARRAY['orthodontics','teeth straightening'], 180, true, 'published'),
  ('preventive-dentistry', 'Preventive Dentistry', 'Routine examinations, professional cleaning and preventive care for long-term oral health.', 'en', 'Orthodontics & Prevention', 'orthodontics', '/blog/hollywood-smile.jpg', 'check', ARRAY['preventive dentistry','dental check-up','cleaning'], 190, true, 'published')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  language = EXCLUDED.language,
  category = EXCLUDED.category,
  category_slug = EXCLUDED.category_slug,
  featured_image = COALESCE(public.treatments.featured_image, EXCLUDED.featured_image),
  icon = COALESCE(public.treatments.icon, EXCLUDED.icon),
  tags = CASE WHEN cardinality(public.treatments.tags) = 0 THEN EXCLUDED.tags ELSE public.treatments.tags END,
  sort_order = EXCLUDED.sort_order,
  deleted_at = NULL;

INSERT INTO public.faqs
  (id, scope, scope_ref, question, answer, language, sort_order, content_status)
VALUES
  ('20000000-0000-4000-8000-000000000001', 'global', NULL, 'How much does a Hollywood Smile cost in Cyprus?', 'Treatment cost depends on the number of teeth, material and clinical findings. Send clear smile photos or arrange an examination for a personalised written plan.', 'en', 10, 'published'),
  ('20000000-0000-4000-8000-000000000002', 'global', NULL, 'How long does dental treatment take?', 'Many cosmetic treatments can be completed during a planned short visit, while implant treatment may require healing between stages. Your timeline is confirmed after clinical assessment.', 'en', 20, 'published'),
  ('20000000-0000-4000-8000-000000000003', 'global', NULL, 'Is dental treatment in North Cyprus safe?', 'Safety depends on accurate diagnosis, appropriate materials, sterilisation and clinician experience. We explain alternatives, risks and aftercare before treatment begins.', 'en', 30, 'published'),
  ('20000000-0000-4000-8000-000000000004', 'global', NULL, 'Do you support international patients?', 'Yes. Our patient team can help coordinate appointments, airport transfer options and practical visit information around your treatment plan.', 'en', 40, 'published'),
  ('20000000-0000-4000-8000-000000000005', 'global', NULL, 'Can I see before-and-after cases?', 'Yes. Our gallery includes real treatment outcomes published with patient consent. Results vary and every treatment plan is individual.', 'en', 50, 'published')
ON CONFLICT (id) DO NOTHING;
