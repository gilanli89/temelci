import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { slugify } from '@/components/admin/SeoScore';
import { useSEO } from '@/hooks/useSEO';

afterEach(() => {
  cleanup();
  document.head.querySelectorAll('meta[name="robots"],meta[name="description"],link[rel="canonical"]').forEach(node => node.remove());
});

describe('CMS content helpers', () => {
  it('creates stable English URL slugs', () => {
    expect(slugify('Dental Implants & Full-Mouth Care')).toBe('dental-implants-full-mouth-care');
    expect(slugify('  Veneers   in Cyprus  ')).toBe('veneers-in-cyprus');
  });
});

describe('route SEO', () => {
  it('writes unique title, description and canonical metadata', () => {
    renderHook(() => useSEO({
      title: 'Dental Implants in North Cyprus',
      description: 'A clinician-reviewed implant guide.',
      canonical: 'https://temelcidentist.com/en/implants',
    }));

    expect(document.title).toBe('Dental Implants in North Cyprus');
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('A clinician-reviewed implant guide.');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://temelcidentist.com/en/implants');
  });

  it('supports noindex metadata for private and missing routes', () => {
    renderHook(() => useSEO({
      title: 'Not found',
      description: 'Unavailable page.',
      robots: 'noindex,follow',
    }));
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex,follow');
  });
});
