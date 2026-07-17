import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Language, translations, TranslationKeys, LANGUAGES, RTL_LANGUAGES } from './translations';

export const ACTIVE_LANGUAGES = ['en', 'de', 'tr', 'he', 'ru'] as const satisfies readonly Language[];
export type ActiveLanguage = (typeof ACTIVE_LANGUAGES)[number];

const ROUTE_KEYS: (keyof TranslationKeys)[] = [
  'treatmentsSlug', 'beforeAfterSlug', 'reviewsSlug', 'socialSlug', 'aboutSlug',
  'ourClinicSlug', 'dentalTourismSlug', 'blogSlug', 'contactSlug',
  'hollywoodSmileSlug', 'implantsSlug', 'veneersSlug', 'crownsSlug',
  'zirconiaCrownsSlug', 'teethWhiteningSlug', 'smileMakeoverSlug',
  'fullMouthRestorationSlug', 'rootCanalSlug', 'compositeFillingSlug',
  'allOn4Slug', 'clearAlignersSlug', 'dentalBondingSlug', 'orthodonticsSlug',
  'wisdomToothSlug', 'gumDiseaseSlug', 'laserGumSlug', 'bruxismSlug',
  'preventiveDentistrySlug',
];

export const isActiveLanguage = (value: string | undefined): value is ActiveLanguage =>
  Boolean(value && ACTIVE_LANGUAGES.includes(value as ActiveLanguage));

const translateFirstSegment = (segment: string, target: ActiveLanguage) => {
  for (const key of ROUTE_KEYS) {
    const isKnownRoute = ACTIVE_LANGUAGES.some(language => translations[language][key] === segment);
    if (isKnownRoute) return String(translations[target][key] || segment);
  }
  return segment;
};

export const localizedPathFor = (inputPath: string, target: ActiveLanguage) => {
  const [pathAndQuery, hash = ''] = inputPath.split('#', 2);
  const [pathname, query = ''] = pathAndQuery.split('?', 2);
  const withoutLocale = pathname.replace(/^\/(?:en|de|tr|he|ru)(?=\/|$)/, '');
  const segments = withoutLocale.split('/').filter(Boolean);
  if (segments[0]) segments[0] = translateFirstSegment(decodeURIComponent(segments[0]), target);
  const localized = `/${target}${segments.length ? `/${segments.map(encodeURIComponent).join('/')}` : ''}`;
  return `${localized}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
};

type LanguageContextType = {
  lang: ActiveLanguage;
  t: TranslationKeys;
  isRtl: boolean;
  setLang: (lang: ActiveLanguage) => void;
  languages: typeof LANGUAGES;
  localePath: (path: string, targetLanguage?: ActiveLanguage) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang: routeLanguage } = useParams<{ lang?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const lang: ActiveLanguage = isActiveLanguage(routeLanguage) ? routeLanguage : 'en';
  const t = translations[lang];
  const isRtl = RTL_LANGUAGES.includes(lang);
  const languages = useMemo(
    () => LANGUAGES.filter(language => ACTIVE_LANGUAGES.includes(language.code as ActiveLanguage)),
    [],
  ) as typeof LANGUAGES;

  const localePath = useCallback(
    (path: string, targetLanguage: ActiveLanguage = lang) => localizedPathFor(path, targetLanguage),
    [lang],
  );

  const setLang = useCallback((targetLanguage: ActiveLanguage) => {
    const current = `${location.pathname}${location.search}${location.hash}`;
    navigate(localizedPathFor(current, targetLanguage));
  }, [location.hash, location.pathname, location.search, navigate]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl, lang]);

  const value = { lang, t, isRtl, setLang, languages, localePath };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

export const useOptionalLanguage = () => useContext(LanguageContext);
