import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('cardona_lang') || 'ca';
  });

  useEffect(() => {
    localStorage.setItem('cardona_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (section, key) => {
    return translations[lang]?.[section]?.[key] || translations['ca']?.[section]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
