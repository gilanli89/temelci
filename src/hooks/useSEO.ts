import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
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
export const useSEO = ({ title, description, canonical, ogImage, type = 'website', robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1', publishedTime, modifiedTime }: SEOProps) => {
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.title = title;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', robots);
    setMeta('meta[name="googlebot"]', 'name', 'googlebot', robots);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Temelci Dental Clinic');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    const resolvedCanonical = canonical || `${window.location.origin}${window.location.pathname}`;
    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = resolvedCanonical;
    setMeta('meta[property="og:url"]', 'property', 'og:url', resolvedCanonical);

    if (ogImage) {
      const absoluteImage = new URL(ogImage, window.location.origin).href;
      setMeta('meta[property="og:image"]', 'property', 'og:image', absoluteImage);
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImage);
    }

    if (publishedTime) setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime);
    if (modifiedTime) setMeta('meta[property="article:modified_time"]', 'property', 'article:modified_time', modifiedTime);
  }, [canonical, description, modifiedTime, ogImage, publishedTime, robots, title, type]);
};
