import React, { createContext, useContext } from 'react';
import { Language, translations, TranslationKeys, LANGUAGES } from './translations';

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
  const lang: Language = 'en';
  const t = translations.en;
  const isRtl = false;
  const setLang = () => undefined;
  const localePath = (path: string) => `/en${path}`;
  const value = { lang, t, isRtl, setLang, languages: LANGUAGES.filter(language => language.code === 'en'), localePath };

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
