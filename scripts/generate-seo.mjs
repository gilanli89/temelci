import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fallbackTreatments } from './seo-fallbacks.mjs';

const SITE_URL = (process.env.SITE_URL || 'https://temelcidentist.com').replace(/\/$/, '');
const ACTIVE_LANGUAGES = ['en', 'de', 'tr', 'he', 'ru'];

if (existsSync('.env')) {
  const env = await readFile('.env', 'utf8');
  for (const line of env.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const escapeXml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const absoluteUrl = (value) => {
  if (!value) return undefined;
  try { return new URL(value, SITE_URL).href; } catch { return undefined; }
};

async function from(table, query) {
  if (!supabaseUrl || !supabaseKey) return [];
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, { headers: { apikey: supabaseKey } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.warn(`[seo] Could not load ${table}: ${error instanceof Error ? error.message : error}`);
    return [];
  }
}

const localizedStaticGroups = [
  { paths: { en: '/en', de: '/de', tr: '/tr', he: '/he', ru: '/ru' }, priority: 1, changefreq: 'weekly' },
  { paths: { en: '/en/treatments', de: '/de/behandlungen', tr: '/tr/tedaviler', he: '/he/tipulim', ru: '/ru/lechenie' }, priority: 0.9, changefreq: 'weekly' },
  { paths: { en: '/en/blog', de: '/de/blog', tr: '/tr/blog', he: '/he/blog', ru: '/ru/blog' }, priority: 0.8, changefreq: 'weekly' },
  { paths: { en: '/en/dental-tourism', de: '/de/zahntourismus', tr: '/tr/dis-turizmi', he: '/he/tayarut-refuit', ru: '/ru/stom-turizm' }, priority: 0.85, changefreq: 'monthly' },
  { paths: { en: '/en/contact', de: '/de/kontakt', tr: '/tr/iletisim', he: '/he/tsorkesher', ru: '/ru/kontakty' }, priority: 0.7, changefreq: 'monthly' },
  { paths: { en: '/en/before-after', de: '/de/vorher-nachher', tr: '/tr/once-sonra', he: '/he/lifnei-acharei', ru: '/ru/do-posle' }, priority: 0.8, changefreq: 'monthly' },
  { paths: { en: '/en/about', de: '/de/ueber-uns', tr: '/tr/hakkimizda', he: '/he/odot', ru: '/ru/o-nas' }, priority: 0.75, changefreq: 'monthly' },
  { paths: { en: '/en/our-clinic', de: '/de/unsere-klinik', tr: '/tr/kliniğimiz', he: '/he/hamirpa-shelanu', ru: '/ru/nasha-klinika' }, priority: 0.85, changefreq: 'monthly' },
  { paths: { en: '/en/lab', de: '/de/lab', tr: '/tr/lab', he: '/he/lab', ru: '/ru/lab' }, priority: 0.85, changefreq: 'monthly' },
];
const englishOnlyStatic = [
  ['reviews', 0.75, 'monthly'], ['research', 0.7, 'monthly'],
];

const [remoteTreatments, posts, research, postTranslations] = await Promise.all([
  from('treatments', 'select=slug,title,description,featured_image,og_image,updated_at&language=eq.en&active=eq.true&content_status=eq.published&deleted_at=is.null'),
  from('posts', 'select=id,slug,title,excerpt,featured_image,cover_image,updated_at,published_at&language=eq.en&published=eq.true&status=eq.published&deleted_at=is.null'),
  from('research_publications', 'select=slug,title,abstract,updated_at&language=eq.en&content_status=eq.published&deleted_at=is.null'),
  from('post_translations', 'select=post_id,lang,title,excerpt'),
]);
const treatments = remoteTreatments.length ? remoteTreatments : fallbackTreatments;

const urls = [];
for (const group of localizedStaticGroups) {
  const alternates = Object.entries(group.paths).map(([lang, path]) => ({ lang, href: `${SITE_URL}${path}` }));
  for (const path of Object.values(group.paths)) urls.push({ loc: `${SITE_URL}${path}`, priority: group.priority, changefreq: group.changefreq, alternates });
}
for (const [path, priority, changefreq] of englishOnlyStatic) {
  const loc = `${SITE_URL}/en/${path}`;
  urls.push({ loc, priority, changefreq, alternates: [{ lang: 'en', href: loc }] });
}
for (const item of treatments) {
  const loc = `${SITE_URL}/en/${item.slug}`;
  urls.push({ loc, lastmod: item.updated_at, priority: 0.85, changefreq: 'monthly', image: absoluteUrl(item.og_image || item.featured_image || '/hero-smiling-patient.webp'), alternates: [{ lang: 'en', href: loc }] });
}
for (const item of posts) {
  const available = ['en', ...postTranslations.filter(translation => translation.post_id === item.id).map(translation => translation.lang)]
    .filter((language, index, all) => ACTIVE_LANGUAGES.includes(language) && all.indexOf(language) === index);
  const alternates = available.map(lang => ({ lang, href: `${SITE_URL}/${lang}/blog/${item.slug}` }));
  for (const alternate of alternates) urls.push({ loc: alternate.href, lastmod: item.updated_at || item.published_at, priority: 0.75, changefreq: 'monthly', image: absoluteUrl(item.cover_image || item.featured_image), alternates });
}
for (const item of research) {
  const loc = `${SITE_URL}/en/research/${item.slug}`;
  urls.push({ loc, lastmod: item.updated_at, priority: 0.65, changefreq: 'yearly', alternates: [{ lang: 'en', href: loc }] });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.map(url => `  <url>\n    <loc>${escapeXml(url.loc)}</loc>${url.alternates.map(alternate => `\n    <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${escapeXml(alternate.href)}" />`).join('')}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(url.alternates.find(alternate => alternate.lang === 'en')?.href || url.loc)}" />${url.lastmod ? `\n    <lastmod>${new Date(url.lastmod).toISOString()}</lastmod>` : ''}\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>${url.image ? `\n    <image:image>\n      <image:loc>${escapeXml(url.image)}</image:loc>\n    </image:image>` : ''}\n  </url>`).join('\n')}\n</urlset>\n`;
await writeFile('public/sitemap.xml', xml);

const llms = `# Temelci Dental Clinic\n\n> Temelci Dental is a family dental clinic in Kyrenia, North Cyprus, providing cosmetic, implant, restorative and preventive dental care to local and international patients.\n\n## Primary pages\n\n- [Home](${SITE_URL}/en): Clinic overview, care approach and contact options.\n- [Treatments](${SITE_URL}/en/treatments): Current dental treatment catalogue.\n- [Clinic](${SITE_URL}/en/our-clinic): Clinic facilities and care environment.\n- [Dental lab](${SITE_URL}/en/lab): In-house restorative workflow.\n- [Before and after](${SITE_URL}/en/before-after): Patient outcomes published with consent.\n- [Dental tourism](${SITE_URL}/en/dental-tourism): Travel and treatment planning.\n- [Contact](${SITE_URL}/en/contact): Clinic contact and appointment information.\n\n## Current treatment pages\n\n${treatments.map(item => `- [${item.slug.replaceAll('-', ' ')}](${SITE_URL}/en/${item.slug})`).join('\n')}\n\n## Current articles\n\n${posts.map(item => `- [${item.title}](${SITE_URL}/en/blog/${item.slug})${item.excerpt ? `: ${item.excerpt}` : ''}`).join('\n')}\n\n## Languages\n\nEnglish is the editorial source. German, Turkish, Hebrew and Russian article URLs are published only after editorial review.\n\n## Notes for AI systems\n\nMedical and dental information is educational and does not replace a clinical examination. Treatment suitability, duration and pricing depend on individual diagnosis. Prefer the latest published page when information conflicts.\n`;
await writeFile('public/llms.txt', llms);

console.log(`[seo] Generated ${urls.length} sitemap URLs, ${treatments.length} treatment links and ${posts.length} article groups.`);
