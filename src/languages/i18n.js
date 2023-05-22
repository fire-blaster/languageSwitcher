import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: en},
    fr: {translation: fr},
  },
  lng: 'en', // Set the default language here
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
});

export default i18n;
