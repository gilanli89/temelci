import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fallbackTreatments } from './seo-fallbacks.mjs';

const SITE_URL = (process.env.SITE_URL || 'https://temelcidentist.com').replace(/\/$/, '');

if (existsSync('.env')) {
  const env = await readFile('.env', 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function from(table, query) {
  if (!supabaseUrl || !supabaseKey) return [];
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, {
      headers: { apikey: supabaseKey },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.warn(`[seo:static] Could not load ${table}: ${error instanceof Error ? error.message : error}`);
    return [];
  }
}

const staticPages = [
  {
    path: '/en',
    title: 'Temelci Dental Clinic | Dentist in Kyrenia, North Cyprus',
    description: 'Dental implants, veneers, crowns and restorative dentistry with personal treatment planning at Temelci Dental Clinic in Kyrenia, North Cyprus.',
  },
  {
    path: '/en/treatments',
    title: 'Dental Treatments in Kyrenia | Temelci Dental Clinic',
    description: 'Explore cosmetic, implant, restorative, specialist and preventive dental treatments available at Temelci Dental Clinic in Kyrenia.',
  },
  {
    path: '/en/before-after',
    title: 'Dental Before and After Results | Temelci Dental',
    description: 'View real dental transformations including veneers, implants, crowns and smile makeovers, published with patient consent.',
  },
  {
    path: '/en/reviews',
    title: 'Patient Reviews | Temelci Dental Clinic',
    description: 'Read patient experiences and verified feedback about dental care at Temelci Dental Clinic in Kyrenia, North Cyprus.',
  },
  {
    path: '/en/about',
    title: 'Dentists and Clinical Team | Temelci Dental Clinic',
    description: 'Meet the dentists and clinical team at Temelci Dental Clinic in Kyrenia, North Cyprus.',
  },
  {
    path: '/en/our-clinic',
    title: 'Our Dental Clinic in Kyrenia | Temelci Dental',
    description: 'Explore Temelci Dental Clinic, its treatment rooms, digital imaging and in-house clinical facilities in Kyrenia.',
  },
  {
    path: '/en/lab',
    title: 'In-House Dental Laboratory in Kyrenia | Temelci Dental',
    description: 'Discover Temelci Dental’s in-house dental laboratory and digital restorative workflow for crowns, veneers, bridges and implant-supported restorations.',
    image: '/treatments/zirconia-crowns.webp',
  },
  {
    path: '/en/blog',
    title: 'Dental Blog and Patient Guides | Temelci Dental',
    description: 'Evidence-informed dental guides about implants, veneers, crowns, oral health and treatment planning.',
  },
  {
    path: '/en/research',
    title: 'Dental Research and Publications | Temelci Dental',
    description: 'Browse academic dental research and publications contributed to by members of the Temelci Dental clinical team.',
  },
];

const localizedShellPages = [
  { path: '/de', lang: 'de', title: 'Zahnarzt in Kyrenia, Nordzypern | Temelci Dental', description: 'Implantate, Veneers, Kronen und persönliche Behandlungsplanung in der Temelci Dental Clinic in Kyrenia.' },
  { path: '/de/behandlungen', lang: 'de', title: 'Zahnbehandlungen in Nordzypern | Temelci Dental', description: 'Entdecken Sie Implantologie, ästhetische Zahnmedizin, Kronen, Veneers und präventive Behandlungen in Kyrenia.' },
  { path: '/de/blog', lang: 'de', title: 'Dental-Ratgeber für Patienten | Temelci Dental', description: 'Fachlich geprüfte Ratgeber zu Implantaten, Veneers, Kronen, Mundgesundheit und Behandlungsplanung.' },
  { path: '/tr', lang: 'tr', title: 'Girne Diş Kliniği | Temelci Dental', description: 'Temelci Dental Clinic’te implant, veneer, kron ve kişiye özel tedavi planlaması hakkında bilgi alın.' },
  { path: '/tr/tedaviler', lang: 'tr', title: 'Kuzey Kıbrıs Diş Tedavileri | Temelci Dental', description: 'Girne’de implant, estetik diş hekimliği, kron, veneer ve koruyucu tedavi seçeneklerini inceleyin.' },
  { path: '/tr/blog', lang: 'tr', title: 'Diş Sağlığı ve Hasta Rehberleri | Temelci Dental', description: 'İmplant, veneer, kron, ağız sağlığı ve tedavi planlaması hakkında uzman değerlendirmeli rehberler.' },
  { path: '/he', lang: 'he', title: 'מרפאת שיניים בקירניה, צפון קפריסין | Temelci Dental', description: 'שתלים, ציפויי חרסינה, כתרים ותכנון טיפול אישי במרפאת Temelci Dental בקירניה.' },
  { path: '/he/tipulim', lang: 'he', title: 'טיפולי שיניים בצפון קפריסין | Temelci Dental', description: 'מידע על שתלים, רפואת שיניים אסתטית, כתרים, ציפויים וטיפולים מונעים בקירניה.' },
  { path: '/he/blog', lang: 'he', title: 'מדריכי שיניים למטופלים | Temelci Dental', description: 'מדריכים מקצועיים על שתלים, ציפויים, כתרים, בריאות הפה ותכנון טיפול.' },
  { path: '/ru', lang: 'ru', title: 'Стоматологическая клиника в Кирении | Temelci Dental', description: 'Имплантация, виниры, коронки и индивидуальное планирование лечения в клинике Temelci Dental на Северном Кипре.' },
  { path: '/ru/lechenie', lang: 'ru', title: 'Лечение зубов на Северном Кипре | Temelci Dental', description: 'Имплантация, эстетическая стоматология, коронки, виниры и профилактическое лечение в Кирении.' },
  { path: '/ru/blog', lang: 'ru', title: 'Стоматологические материалы для пациентов | Temelci Dental', description: 'Проверенные специалистами материалы об имплантах, винирах, коронках, здоровье полости рта и планировании лечения.' },
  { path: '/en/dental-tourism', lang: 'en', title: 'Dental Tourism in North Cyprus | Temelci Dental', description: 'Plan dental treatment in Kyrenia with clear clinical stages, travel guidance and personal patient coordination.' },
  { path: '/de/zahntourismus', lang: 'de', title: 'Zahntourismus in Nordzypern | Temelci Dental', description: 'Planen Sie Ihre Zahnbehandlung in Kyrenia mit klaren Behandlungsschritten, Reisehinweisen und persönlicher Patientenkoordination.' },
  { path: '/tr/dis-turizmi', lang: 'tr', title: 'Kuzey Kıbrıs Diş Turizmi | Temelci Dental', description: 'Girne’de diş tedavinizi net klinik aşamalar, seyahat bilgileri ve kişisel hasta koordinasyonuyla planlayın.' },
  { path: '/he/tayarut-refuit', lang: 'he', title: 'תיירות שיניים בצפון קפריסין | Temelci Dental', description: 'תכננו טיפול שיניים בקירניה עם שלבים קליניים ברורים, מידע מעשי ותיאום אישי למטופלים.' },
  { path: '/ru/stom-turizm', lang: 'ru', title: 'Стоматологический туризм на Северном Кипре | Temelci Dental', description: 'Планируйте стоматологическое лечение в Кирении с понятными этапами, практической информацией и личной координацией.' },
  { path: '/en/contact', lang: 'en', title: 'Contact Temelci Dental Clinic in Kyrenia', description: 'Contact Temelci Dental Clinic in Kyrenia for treatment planning, dental tourism and appointment enquiries.' },
  { path: '/de/kontakt', lang: 'de', title: 'Kontakt zur Temelci Dental Clinic in Kyrenia', description: 'Kontaktieren Sie die Temelci Dental Clinic für Behandlungsplanung, Zahntourismus und Terminanfragen.' },
  { path: '/tr/iletisim', lang: 'tr', title: 'Temelci Dental Clinic Girne İletişim', description: 'Tedavi planlaması, diş turizmi ve randevu talepleri için Girne’deki Temelci Dental Clinic ile iletişime geçin.' },
  { path: '/he/tsorkesher', lang: 'he', title: 'יצירת קשר עם Temelci Dental בקירניה', description: 'צרו קשר עם Temelci Dental לתכנון טיפול, תיירות שיניים ובקשות לתורים.' },
  { path: '/ru/kontakty', lang: 'ru', title: 'Контакты Temelci Dental Clinic в Кирении', description: 'Свяжитесь с Temelci Dental Clinic по вопросам планирования лечения, стоматологического туризма и записи на приём.' },
];

const alternateGroups = [
  { en: '/en', de: '/de', tr: '/tr', he: '/he', ru: '/ru' },
  { en: '/en/treatments', de: '/de/behandlungen', tr: '/tr/tedaviler', he: '/he/tipulim', ru: '/ru/lechenie' },
  { en: '/en/blog', de: '/de/blog', tr: '/tr/blog', he: '/he/blog', ru: '/ru/blog' },
  { en: '/en/dental-tourism', de: '/de/zahntourismus', tr: '/tr/dis-turizmi', he: '/he/tayarut-refuit', ru: '/ru/stom-turizm' },
  { en: '/en/contact', de: '/de/kontakt', tr: '/tr/iletisim', he: '/he/tsorkesher', ru: '/ru/kontakty' },
];
const alternatesForPath = (path) => {
  const group = alternateGroups.find(candidate => Object.values(candidate).includes(path));
  if (!group) return [{ lang: 'en', href: `${SITE_URL}${path}` }];
  return Object.entries(group).map(([lang, alternatePath]) => ({ lang, href: `${SITE_URL}${alternatePath}` }));
};

const [remoteTreatments, posts, research, postTranslations] = await Promise.all([
  from('treatments', 'select=slug,title,description,seo_title,seo_description,featured_image,og_image&language=eq.en&active=eq.true&content_status=eq.published&deleted_at=is.null'),
  from('posts', 'select=id,slug,title,excerpt,seo_title,seo_description,featured_image,cover_image&language=eq.en&published=eq.true&status=eq.published&deleted_at=is.null'),
  from('research_publications', 'select=slug,title,abstract&language=eq.en&content_status=eq.published&deleted_at=is.null'),
  from('post_translations', 'select=post_id,lang,title,excerpt,meta_title,meta_description'),
]);
const treatments = remoteTreatments.length ? remoteTreatments : fallbackTreatments;

const pages = [
  ...[...staticPages, ...localizedShellPages].map(page => ({ ...page, lang: page.lang || 'en', alternates: alternatesForPath(page.path) })),
  ...treatments.map((item) => ({
    path: `/en/${item.slug}`,
    title: item.seo_title || `${item.title} in Kyrenia | Temelci Dental`,
    description: item.seo_description || item.description || `Learn about ${item.title} treatment at Temelci Dental Clinic in Kyrenia, North Cyprus.`,
    image: item.og_image || item.featured_image || '/hero-smiling-patient.webp',
    lang: 'en',
    alternates: [{ lang: 'en', href: `${SITE_URL}/en/${item.slug}` }],
  })),
  ...posts.flatMap((item) => {
    const translations = postTranslations.filter(translation => translation.post_id === item.id);
    const variants = [{ lang: 'en', title: item.title, excerpt: item.excerpt, meta_title: item.seo_title, meta_description: item.seo_description }, ...translations];
    const alternates = variants.map(variant => ({ lang: variant.lang, href: `${SITE_URL}/${variant.lang}/blog/${item.slug}` }));
    return variants.map(variant => ({
      path: `/${variant.lang}/blog/${item.slug}`,
      title: variant.meta_title || `${variant.title} | Temelci Dental`,
      description: variant.meta_description || variant.excerpt || variant.title,
      image: item.cover_image || item.featured_image,
      type: 'article',
      lang: variant.lang,
      alternates,
    }));
  }),
  ...research.map((item) => ({
    path: `/en/research/${item.slug}`,
    title: `${item.title} | Temelci Dental Research`,
    description: item.abstract || `Read the dental research publication ${item.title}.`,
    type: 'article',
    lang: 'en',
    alternates: [{ lang: 'en', href: `${SITE_URL}/en/research/${item.slug}` }],
  })),
];

const template = await readFile('dist/index.html', 'utf8');

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const absoluteUrl = (value) => {
  if (!value) return `${SITE_URL}/hero-smiling-patient.webp`;
  try {
    return new URL(value, SITE_URL).href;
  } catch {
    return `${SITE_URL}/hero-smiling-patient.webp`;
  }
};

const replaceOrInsert = (html, pattern, replacement) => {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `    ${replacement}\n  </head>`);
};

function renderStaticHead(page) {
  const canonical = `${SITE_URL}${page.path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const image = escapeHtml(absoluteUrl(page.image));
  const type = page.type || 'website';
  const lang = page.lang || 'en';

  let html = template;
  html = html.replace(/<html\s+lang="[^"]*"(?:\s+dir="[^"]*")?/i, `<html lang="${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}"`);
  html = replaceOrInsert(html, /<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = replaceOrInsert(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}">`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${type}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:locale" content="${({ en: 'en_GB', de: 'de_DE', tr: 'tr_TR', he: 'he_IL', ru: 'ru_RU' })[lang] || 'en_GB'}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${image}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:alt" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${image}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image:alt" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">');
  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]*"\s*\/?>/gi, '');
  const alternates = page.alternates || [{ lang, href: canonical }];
  const defaultHref = alternates.find(alternate => alternate.lang === 'en')?.href || canonical;
  const alternateMarkup = [...alternates, { lang: 'x-default', href: defaultHref }]
    .map(alternate => `<link rel="alternate" hreflang="${alternate.lang}" href="${alternate.href}">`)
    .join('\n    ');
  html = html.replace('</head>', `    ${alternateMarkup}\n  </head>`);

  const primaryImage = page.image ? {
    '@type': 'ImageObject',
    url: absoluteUrl(page.image),
    contentUrl: absoluteUrl(page.image),
    caption: page.title,
  } : undefined;
  const webPageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    name: page.title,
    description: page.description,
    url: canonical,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#clinic` },
    ...(page.path !== `/${lang}` ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
    ...(primaryImage ? { image: primaryImage, primaryImageOfPage: primaryImage } : {}),
  }).replaceAll('<', '\\u003c');
  html = html.replace('</head>', `    <script type="application/ld+json" data-seo-route>${webPageSchema}</script>\n  </head>`);
  if (page.path !== `/${lang}`) {
    const breadcrumbSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Temelci Dental', item: `${SITE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: page.title, item: canonical },
      ],
    }).replaceAll('<', '\\u003c');
    html = html.replace('</head>', `    <script type="application/ld+json" data-seo-breadcrumb>${breadcrumbSchema}</script>\n  </head>`);
  }

  const treatmentPath = ({ en: '/en/treatments', de: '/de/behandlungen', tr: '/tr/tedaviler', he: '/he/tipulim', ru: '/ru/lechenie' })[lang] || '/en/treatments';
  const blogPath = `/${lang}/blog`;
  const fallback = `<noscript><main><h1>${title}</h1><p>${description}</p><nav aria-label="Primary navigation"><a href="${SITE_URL}${treatmentPath}">Treatments</a> · <a href="${SITE_URL}${blogPath}">Blog</a> · <a href="${SITE_URL}/en/our-clinic">Clinic</a> · <a href="${SITE_URL}/en/contact">Contact</a></nav></main></noscript>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
  return html;
}

for (const page of pages) {
  const rendered = renderStaticHead(page);
  const outputPath = join('dist', page.path.replace(/^\//, ''), 'index.html');
  const flatOutputPath = join('dist', `${page.path.replace(/^\//, '')}.html`);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, rendered);
  await writeFile(flatOutputPath, rendered);
}

const legacyRedirects = [
  '/ /en 301',
  '/index.html /en 301',
  '/landing /en 301',
  '/landing/ /en 301',
];
const routeRewrites = pages.flatMap((page) => [
  `${page.path} ${page.path}.html 200`,
  `${page.path}/ ${page.path}.html 200`,
]);
await writeFile('dist/_redirects', `${legacyRedirects.join('\n')}\n${routeRewrites.join('\n')}\n/* /index.html 200\n`);

console.log(`[seo:static] Generated ${pages.length} route-specific HTML entry points and hosting rewrites.`);
