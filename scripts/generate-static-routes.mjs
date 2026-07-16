import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

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
    path: '/en/dental-tourism',
    title: 'Dental Tourism in North Cyprus | Temelci Dental',
    description: 'Plan dental treatment in Kyrenia with clear timelines, travel guidance and personal patient coordination.',
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
  {
    path: '/en/contact',
    title: 'Contact Temelci Dental Clinic in Kyrenia',
    description: 'Contact Temelci Dental Clinic in Kyrenia for treatment planning, dental tourism and appointment enquiries.',
  },
];

const [treatments, posts, research] = await Promise.all([
  from('treatments', 'select=slug,title,description,seo_title,seo_description,featured_image,og_image&language=eq.en&active=eq.true&content_status=eq.published&deleted_at=is.null'),
  from('posts', 'select=slug,title,excerpt,seo_title,seo_description,featured_image,cover_image&language=eq.en&published=eq.true&status=eq.published&deleted_at=is.null'),
  from('research_publications', 'select=slug,title,abstract&language=eq.en&content_status=eq.published&deleted_at=is.null'),
]);

const pages = [
  ...staticPages,
  ...treatments.map((item) => ({
    path: `/en/${item.slug}`,
    title: item.seo_title || `${item.title} in Kyrenia | Temelci Dental`,
    description: item.seo_description || item.description || `Learn about ${item.title} treatment at Temelci Dental Clinic in Kyrenia, North Cyprus.`,
    image: `/treatments/${item.slug}.webp`,
  })),
  ...posts.map((item) => ({
    path: `/en/blog/${item.slug}`,
    title: item.seo_title || `${item.title} | Temelci Dental`,
    description: item.seo_description || item.excerpt || `Read ${item.title} from Temelci Dental Clinic.`,
    image: item.cover_image || item.featured_image,
    type: 'article',
  })),
  ...research.map((item) => ({
    path: `/en/research/${item.slug}`,
    title: `${item.title} | Temelci Dental Research`,
    description: item.abstract || `Read the dental research publication ${item.title}.`,
    type: 'article',
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
  if (!value) return `${SITE_URL}/blog/clinic_room2.jpg`;
  try {
    return new URL(value, SITE_URL).href;
  } catch {
    return `${SITE_URL}/blog/clinic_room2.jpg`;
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

  let html = template;
  html = replaceOrInsert(html, /<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = replaceOrInsert(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}">`);
  html = replaceOrInsert(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${type}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${image}">`);
  html = replaceOrInsert(html, /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image:alt" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${description}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${image}">`);
  html = replaceOrInsert(html, /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image:alt" content="${title}">`);
  html = replaceOrInsert(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">');
  html = replaceOrInsert(html, /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/?>/i, `<link rel="alternate" hreflang="en" href="${canonical}">`);

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
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#clinic` },
    ...(primaryImage ? { image: primaryImage, primaryImageOfPage: primaryImage } : {}),
  }).replaceAll('<', '\\u003c');
  html = html.replace('</head>', `    <script type="application/ld+json" data-seo-route>${webPageSchema}</script>\n  </head>`);

  const fallback = `<noscript><main><h1>${title}</h1><p>${description}</p><p><a href="${SITE_URL}/en/treatments">View dental treatments</a> · <a href="${SITE_URL}/en/contact">Contact Temelci Dental Clinic</a></p></main></noscript>`;
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
