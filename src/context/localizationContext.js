import React, { createContext, useState, useEffect } from 'react';

import enJson from '../translations/en.json';
import uaJson from '../translations/ua.json';

const LANG_KEY = 'current-language';
const DEFAULT_LANG = 'en';

const getPropertyByStringKey = (obj, keyString) => {
  const keys = keyString.split('.');
  let result = obj;

  for (let i = 0; i < keys.length; i++) {
    if (result[keys[i]] !== undefined) {
      result = result[keys[i]];
    } else {
      return keyString;
    }
  }

  return result;
};

const TRANSLATIONS = {
  ua: uaJson,
  en: enJson,
};

export const LocalizationContext = createContext([]);

export const LocalizationProvider = ({ children }) => {
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    const savedLang = localStorage.getItem(LANG_KEY);
    savedLang && setLang(savedLang);
  }, []);

  const changeLanguage = (lang) => {
    setLang(lang);
    localStorage.setItem(LANG_KEY, lang);
  };

  const t = (key) => getPropertyByStringKey(TRANSLATIONS[lang], key);

  return (
    <LocalizationContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LocalizationContext.Provider>
  );
};
