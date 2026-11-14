import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  variant?: "header" | "mobile";
}

export default function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith("en") ? "en" : "id";

  const changeLanguage = (lang: "id" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("sublims_lang", lang);
    localStorage.setItem("sublims_lang_confirmed", "true");
  };

  return (
    <div
      className={`lang-switcher lang-switcher--${variant}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        className={`lang-switch-btn ${currentLang === "id" ? "is-active" : ""}`}
        onClick={() => changeLanguage("id")}
        aria-pressed={currentLang === "id"}
      >
        ID
      </button>
      <span className="lang-switch-divider" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`lang-switch-btn ${currentLang === "en" ? "is-active" : ""}`}
        onClick={() => changeLanguage("en")}
        aria-pressed={currentLang === "en"}
      >
        EN
      </button>
    </div>
  );
}
