import { useEffect } from 'react';
import { ACTIVE_LANGUAGES, isActiveLanguage, localizedPathFor, useOptionalLanguage } from '@/i18n/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  type?: 'website' | 'article';
  robots?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

const removeMeta = (selector: string) => {
  document.head.querySelector(selector)?.remove();
};

const normalizePathname = (pathname: string) => {
  const withoutDuplicateSlashes = pathname.replace(/\/{2,}/g, '/');
  return withoutDuplicateSlashes.length > 1 ? withoutDuplicateSlashes.replace(/\/+$/, '') : withoutDuplicateSlashes;
};

export const useSEO = ({ title, description, canonical, ogImage, ogImageAlt, type = 'website', robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1', publishedTime, modifiedTime }: SEOProps) => {
  const languageContext = useOptionalLanguage();
  const routeLanguage = typeof window === 'undefined' ? undefined : window.location.pathname.split('/').filter(Boolean)[0];
  const lang = languageContext?.lang || (isActiveLanguage(routeLanguage) ? routeLanguage : 'en');
  const isRtl = languageContext?.isRtl || lang === 'he';

  useEffect(() => {
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[1] || '';
    const indexableLocalizedSegments = {
      de: new Set(['', 'behandlungen', 'blog', 'zahntourismus', 'kontakt', 'vorher-nachher', 'ueber-uns', 'unsere-klinik', 'lab']),
      tr: new Set(['', 'tedaviler', 'blog', 'dis-turizmi', 'iletisim', 'once-sonra', 'hakkimizda', 'kliniğimiz', 'lab']),
      he: new Set(['', 'tipulim', 'blog', 'tayarut-refuit', 'tsorkesher', 'lifnei-acharei', 'odot', 'hamirpa-shelanu', 'lab']),
      ru: new Set(['', 'lechenie', 'blog', 'stom-turizm', 'kontakty', 'do-posle', 'o-nas', 'nasha-klinika', 'lab']),
    } as const;
    const localizedContentReady = lang === 'en' || indexableLocalizedSegments[lang]?.has(firstSegment);
    const completeAlternateSetReady = lang === 'en'
      ? new Set(['', 'treatments', 'blog', 'dental-tourism', 'contact', 'before-after', 'about', 'our-clinic', 'lab']).has(firstSegment)
      : Boolean(indexableLocalizedSegments[lang]?.has(firstSegment));
    const effectiveRobots = localizedContentReady ? robots : 'noindex,follow';
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.title = title;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', effectiveRobots);
    setMeta('meta[name="googlebot"]', 'name', 'googlebot', effectiveRobots);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Temelci Dental Clinic');
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', ({ en: 'en_GB', de: 'de_DE', tr: 'tr_TR', he: 'he_IL', ru: 'ru_RU' } as const)[lang]);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    const requestedCanonical = canonical ? new URL(canonical, window.location.origin) : null;
    const resolvedCanonical = languageContext
      ? `${requestedCanonical?.origin || window.location.origin}${normalizePathname(window.location.pathname)}`
      : requestedCanonical
        ? `${requestedCanonical.origin}${normalizePathname(requestedCanonical.pathname)}`
        : `${window.location.origin}${normalizePathname(window.location.pathname)}`;
    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = resolvedCanonical;
    setMeta('meta[property="og:url"]', 'property', 'og:url', resolvedCanonical);

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(element => element.remove());
    document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach(element => element.remove());
    if (!effectiveRobots.includes('noindex') && completeAlternateSetReady) {
      for (const alternateLanguage of ACTIVE_LANGUAGES) {
        const alternate = document.createElement('link');
        alternate.rel = 'alternate';
        alternate.hreflang = alternateLanguage;
        alternate.href = `${window.location.origin}${normalizePathname(localizedPathFor(window.location.pathname, alternateLanguage))}`;
        document.head.appendChild(alternate);
        if (alternateLanguage !== lang) {
          const alternateLocale = document.createElement('meta');
          alternateLocale.setAttribute('property', 'og:locale:alternate');
          alternateLocale.content = ({ en: 'en_GB', de: 'de_DE', tr: 'tr_TR', he: 'he_IL', ru: 'ru_RU' } as const)[alternateLanguage];
          document.head.appendChild(alternateLocale);
        }
      }
      const defaultAlternate = document.createElement('link');
      defaultAlternate.rel = 'alternate';
      defaultAlternate.hreflang = 'x-default';
      defaultAlternate.href = `${window.location.origin}${normalizePathname(localizedPathFor(window.location.pathname, 'en'))}`;
      document.head.appendChild(defaultAlternate);
    }

    const absoluteImage = new URL(ogImage || '/hero-smiling-patient.webp', window.location.origin).href;
    const imageAlt = ogImageAlt || title;
    setMeta('meta[property="og:image"]', 'property', 'og:image', absoluteImage);
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', imageAlt);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImage);
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', imageAlt);

    if (publishedTime) setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
    else removeMeta('meta[property="article:published_time"]');
    if (modifiedTime) setMeta('meta[property="article:modified_time"]', 'property', 'article:modified_time', modifiedTime);
    else removeMeta('meta[property="article:modified_time"]');
  }, [canonical, description, isRtl, lang, languageContext, modifiedTime, ogImage, ogImageAlt, publishedTime, robots, title, type]);
};
