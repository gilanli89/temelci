import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Sets <title> and essential meta tags for a page.
 * Cleans up on unmount (restores defaults).
 */
export const useSEO = ({ title, description, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    const originalDesc = metaDesc.getAttribute('content') || '';
    metaDesc.setAttribute('content', description);

    // OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    const originalOgTitle = ogTitle.getAttribute('content') || '';
    ogTitle.setAttribute('content', title);

    // OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    const originalOgDesc = ogDesc.getAttribute('content') || '';
    ogDesc.setAttribute('content', description);

    // Twitter title
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twTitle) {
      twTitle = document.createElement('meta');
      twTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twTitle);
    }
    const originalTwTitle = twTitle.getAttribute('content') || '';
    twTitle.setAttribute('content', title);

    // Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const originalCanonical = canonicalLink?.href || '';
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // OG Image
    let ogImageMeta = document.querySelector('meta[property="og:image"]');
    const originalOgImage = ogImageMeta?.getAttribute('content') || '';
    if (ogImage && ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc);
      if (ogTitle) ogTitle.setAttribute('content', originalOgTitle);
      if (ogDesc) ogDesc.setAttribute('content', originalOgDesc);
      if (twTitle) twTitle.setAttribute('content', originalTwTitle);
      if (canonicalLink && originalCanonical) canonicalLink.setAttribute('href', originalCanonical);
      if (ogImageMeta && originalOgImage) ogImageMeta.setAttribute('content', originalOgImage);
    };
  }, [title, description, canonical, ogImage]);
};
