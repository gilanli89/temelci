import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { ACTIVE_LANGUAGES, useLanguage } from '@/i18n/LanguageContext';
import { translations, type TranslationKeys } from '@/i18n/translations';

export type Treatment = Tables<'treatments'>;
export type BeforeAfterCase = Tables<'before_after'>;
export type Review = Tables<'reviews'>;
export type Faq = Tables<'faqs'>;
export type SitePage = Tables<'site_pages'>;
export type TreatmentCategory = Tables<'treatment_categories'>;
export type SiteSettings = Record<string, string>;

const publicContentDefaults = {
  staleTime: 5 * 60_000,
  retry: 1,
} as const;

const treatmentLocaleKeys: Record<string, { title: keyof TranslationKeys; description: keyof TranslationKeys; slug: keyof TranslationKeys }> = {
  'hollywood-smile': { title: 'hollywoodSmile', description: 'hollywoodSmileDesc', slug: 'hollywoodSmileSlug' },
  implants: { title: 'dentalImplants', description: 'dentalImplantsDesc', slug: 'implantsSlug' },
  veneers: { title: 'veneers', description: 'veneersDesc', slug: 'veneersSlug' },
  crowns: { title: 'crowns', description: 'crownsDesc', slug: 'crownsSlug' },
  'zirconia-crowns': { title: 'zirconiaCrowns', description: 'zirconiaCrownsDesc', slug: 'zirconiaCrownsSlug' },
  'teeth-whitening': { title: 'teethWhitening', description: 'teethWhiteningDesc', slug: 'teethWhiteningSlug' },
  'smile-makeover': { title: 'smileMakeover', description: 'smileMakeoverDesc', slug: 'smileMakeoverSlug' },
  'full-mouth-restoration': { title: 'fullMouthRestoration', description: 'fullMouthRestorationDesc', slug: 'fullMouthRestorationSlug' },
  'root-canal-treatment': { title: 'rootCanal', description: 'rootCanalDesc', slug: 'rootCanalSlug' },
  'composite-fillings': { title: 'compositeFilling', description: 'compositeFillingDesc', slug: 'compositeFillingSlug' },
  'all-on-4': { title: 'allOn4', description: 'allOn4Desc', slug: 'allOn4Slug' },
  'clear-aligners': { title: 'clearAligners', description: 'clearAlignersDesc', slug: 'clearAlignersSlug' },
  'dental-bonding': { title: 'dentalBonding', description: 'dentalBondingDesc', slug: 'dentalBondingSlug' },
  orthodontics: { title: 'orthodontics', description: 'orthodonticsDesc', slug: 'orthodonticsSlug' },
  'wisdom-tooth-removal': { title: 'wisdomTooth', description: 'wisdomToothDesc', slug: 'wisdomToothSlug' },
  'gum-disease-treatment': { title: 'gumDisease', description: 'gumDiseaseDesc', slug: 'gumDiseaseSlug' },
  'laser-gum-treatment': { title: 'laserGum', description: 'laserGumDesc', slug: 'laserGumSlug' },
  'bruxism-treatment': { title: 'bruxism', description: 'bruxismDesc', slug: 'bruxismSlug' },
  'preventive-dentistry': { title: 'preventiveDentistry', description: 'preventiveDentistryDesc', slug: 'preventiveDentistrySlug' },
};

const canonicalTreatmentSlug = (requestedSlug: string) => {
  for (const [canonical, keys] of Object.entries(treatmentLocaleKeys)) {
    if (requestedSlug === canonical || ACTIVE_LANGUAGES.some(language => translations[language][keys.slug] === requestedSlug)) return canonical;
  }
  return requestedSlug;
};

const localizeTreatment = (treatment: Treatment, lang: (typeof ACTIVE_LANGUAGES)[number]) => {
  if (lang === 'en') return treatment;
  const keys = treatmentLocaleKeys[treatment.slug];
  if (!keys) return treatment;
  const copy = translations[lang];
  return {
    ...treatment,
    slug: String(copy[keys.slug]),
    title: String(copy[keys.title]),
    description: String(copy[keys.description]),
    seo_title: null,
    seo_description: null,
    focus_keyword: null,
  };
};

export function useTreatments() {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ['cms', 'treatments', lang],
    queryFn: async (): Promise<Treatment[]> => {
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('language', 'en')
        .eq('active', true)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data ?? []).map(treatment => localizeTreatment(treatment, lang));
    },
    ...publicContentDefaults,
  });
}

export function useTreatment(slug: string | undefined) {
  const { lang } = useLanguage();
  const sourceSlug = slug ? canonicalTreatmentSlug(slug) : undefined;
  return useQuery({
    queryKey: ['cms', 'treatment', lang, sourceSlug],
    enabled: Boolean(sourceSlug),
    queryFn: async (): Promise<Treatment | null> => {
      if (!sourceSlug) return null;
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('slug', sourceSlug)
        .eq('language', 'en')
        .eq('active', true)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .maybeSingle();
      if (error) throw error;
      return data ? localizeTreatment(data, lang) : null;
    },
    ...publicContentDefaults,
  });
}

export function useTreatmentCategories() {
  return useQuery({
    queryKey: ['cms', 'treatment-categories'],
    queryFn: async (): Promise<TreatmentCategory[]> => {
      const { data, error } = await supabase
        .from('treatment_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useBeforeAfterCases(limit?: number) {
  return useQuery({
    queryKey: ['cms', 'before-after', 'en', limit ?? 'all'],
    queryFn: async (): Promise<BeforeAfterCase[]> => {
      let query = supabase
        .from('before_after')
        .select('*')
        .eq('language', 'en')
        .eq('published', true)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useReviews(limit?: number, featuredOnly = false) {
  return useQuery({
    queryKey: ['cms', 'reviews', 'en', limit ?? 'all', featuredOnly],
    queryFn: async (): Promise<Review[]> => {
      let query = supabase
        .from('reviews')
        .select('*')
        .eq('language', 'en')
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      if (featuredOnly) query = query.eq('featured', true);
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useFaqs(scope = 'global', scopeRef?: string) {
  return useQuery({
    queryKey: ['cms', 'faqs', 'en', scope, scopeRef ?? ''],
    queryFn: async (): Promise<Faq[]> => {
      let query = supabase
        .from('faqs')
        .select('*')
        .eq('language', 'en')
        .eq('scope', scope)
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      query = scopeRef ? query.eq('scope_ref', scopeRef) : query.is('scope_ref', null);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    ...publicContentDefaults,
  });
}

export function useSitePage(slug: string) {
  const { lang } = useLanguage();
  return useQuery({
    queryKey: ['cms', 'site-page', lang, slug],
    queryFn: async (): Promise<SitePage | null> => {
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', slug)
        .eq('language', 'en')
        .eq('content_status', 'published')
        .is('deleted_at', null)
        .maybeSingle();
      if (error) throw error;
      if (!data || lang === 'en') return data;
      return {
        ...data,
        eyebrow: null,
        hero_title: null,
        hero_description: null,
        seo_title: null,
        seo_description: null,
        focus_keyword: null,
      };
    },
    ...publicContentDefaults,
  });
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ['cms', 'site-settings'],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase.from('site_settings').select('key,value');
      if (error) throw error;
      const settings: SiteSettings = {};
      // Import legacy grouped settings first.
      for (const row of data ?? []) {
        if (row.value && typeof row.value === 'object' && !Array.isArray(row.value)) {
          for (const [key, value] of Object.entries(row.value)) if (typeof value === 'string') settings[key] = value;
        }
      }
      // Flat CMS keys are authoritative and override legacy grouped values.
      for (const row of data ?? []) if (typeof row.value === 'string') settings[row.key] = row.value;
      return settings;
    },
    ...publicContentDefaults,
  });
}
