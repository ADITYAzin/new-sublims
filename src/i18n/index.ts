import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import idTranslations from "./locales/id.json";

const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("sublims_lang") : null;
const initialLanguage = savedLanguage === "en" || savedLanguage === "id" ? savedLanguage : "id";

i18n.use(initReactI18next).init({
  resources: {
    id: { translation: idTranslations },
    en: { translation: enTranslations },
  },
  lng: initialLanguage,
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
