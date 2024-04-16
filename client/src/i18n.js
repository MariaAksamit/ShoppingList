import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n/en.json"
import sk from "./i18n/sk.json"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    sk: {
      translation: sk
    }
  },
  lng: "en", // Predvolený jazyk
  fallbackLng: "en", // Ak chýbajú preklady, použije sa tento jazyk
  interpolation: {
    escapeValue: false // Používa sa pre reťazce
  }
});

export default i18n;