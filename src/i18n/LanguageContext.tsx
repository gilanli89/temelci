import React, { createContext, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Language, RTL_LANGUAGES, translations, TranslationKeys, LANGUAGES } from './translations';

type LanguageContextType = {
  lang: Language;
  t: TranslationKeys;
  isRtl: boolean;
  setLang: (lang: Language) => void;
  languages: typeof LANGUAGES;
  localePath: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  
  const lang = (params.lang && Object.keys(translations).includes(params.lang) 
    ? params.lang 
    : 'en') as Language;
  
  const t = translations[lang];
  const isRtl = RTL_LANGUAGES.includes(lang);

  const setLang = (newLang: Language) => {
    const currentPath = window.location.pathname;
    // Remove base path to get the actual route
    const basePath = '/clinics/temelci/';
    const routeWithoutBase = currentPath.replace(basePath, '/');
    
    const pathParts = routeWithoutBase.split('/').filter(Boolean);
    
    if (pathParts.length > 0 && Object.keys(translations).includes(pathParts[0])) {
      pathParts[0] = newLang;
    } else {
      pathParts.unshift(newLang);
    }
    
    navigate('/clinics/temelci/' + pathParts.join('/'));
  };

  const localePath = (path: string) => `/clinics/temelci/${lang}${path}`;

  const value = useMemo(() => ({
    lang, t, isRtl, setLang, languages: LANGUAGES, localePath
  }), [lang]);

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
