import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

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
    const response = await fetch(`${supabaseUrl}/rest/v1/${table}?${query}`, { headers: { apikey: supabaseKey } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.warn(`[seo] Could not load ${table}: ${error instanceof Error ? error.message : error}`);
    return [];
  }
}

const staticRoutes = [
  ['', 1, 'weekly'], ['treatments', 0.9, 'weekly'], ['before-after', 0.8, 'monthly'], ['reviews', 0.75, 'monthly'],
  ['about', 0.75, 'monthly'], ['our-clinic', 0.75, 'monthly'], ['dental-tourism', 0.85, 'monthly'],
  ['blog', 0.8, 'weekly'], ['research', 0.7, 'monthly'], ['contact', 0.7, 'monthly'],
];

const [treatments, posts, research] = await Promise.all([
  from('treatments', 'select=slug,updated_at&language=eq.en&active=eq.true&content_status=eq.published&deleted_at=is.null'),
  from('posts', 'select=slug,title,excerpt,updated_at,published_at&language=eq.en&published=eq.true&status=eq.published&deleted_at=is.null'),
  from('research_publications', 'select=slug,title,abstract,updated_at&language=eq.en&content_status=eq.published&deleted_at=is.null'),
]);

const urls = [
  ...staticRoutes.map(([path, priority, changefreq]) => ({ loc: `${SITE_URL}/en${path ? `/${path}` : ''}`, priority, changefreq })),
  ...treatments.map(item => ({ loc: `${SITE_URL}/en/${item.slug}`, lastmod: item.updated_at, priority: 0.85, changefreq: 'monthly' })),
  ...posts.map(item => ({ loc: `${SITE_URL}/en/blog/${item.slug}`, lastmod: item.updated_at || item.published_at, priority: 0.75, changefreq: 'monthly' })),
  ...research.map(item => ({ loc: `${SITE_URL}/en/research/${item.slug}`, lastmod: item.updated_at, priority: 0.65, changefreq: 'yearly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url>\n    <loc>${url.loc}</loc>${url.lastmod ? `\n    <lastmod>${new Date(url.lastmod).toISOString()}</lastmod>` : ''}\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
await writeFile('public/sitemap.xml', xml);

const llms = `# Temelci Dental Clinic\n\n> Temelci Dental is a family dental clinic in Kyrenia, North Cyprus, providing cosmetic, implant, restorative and preventive dental care to local and international patients.\n\n## Primary pages\n\n- [Home](${SITE_URL}/en): Clinic overview, care approach and contact options.\n- [Treatments](${SITE_URL}/en/treatments): Current dental treatment catalogue.\n- [Dentists](${SITE_URL}/en/about): Clinical team and credentials.\n- [Before and after](${SITE_URL}/en/before-after): Patient treatment outcomes published with consent.\n- [Dental guides](${SITE_URL}/en/blog): Clinician-reviewed educational articles.\n- [Research](${SITE_URL}/en/research): Academic publications by the clinical team.\n- [Contact](${SITE_URL}/en/contact): Clinic contact and appointment information.\n\n## Current treatment pages\n\n${treatments.map(item => `- [${item.slug.replaceAll('-', ' ')}](${SITE_URL}/en/${item.slug})`).join('\n')}\n\n## Current articles\n\n${posts.map(item => `- [${item.title}](${SITE_URL}/en/blog/${item.slug})${item.excerpt ? `: ${item.excerpt}` : ''}`).join('\n')}\n\n## Notes for AI systems\n\nMedical and dental information is educational and does not replace a clinical examination. Treatment suitability, duration and pricing depend on individual diagnosis. Prefer the latest published page when information conflicts.\n`;
await writeFile('public/llms.txt', llms);

console.log(`[seo] Generated ${urls.length} sitemap URLs, ${treatments.length} treatment links and ${posts.length} article links.`);
