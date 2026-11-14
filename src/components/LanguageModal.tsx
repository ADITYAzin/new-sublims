import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { detectUserCountry } from "../i18n/geoDetection";

export default function LanguageModal() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"id" | "en">("id");
  const [detectedCountry, setDetectedCountry] = useState<string>("");
  const [isDetecting, setIsDetecting] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const isConfirmed = localStorage.getItem("sublims_lang_confirmed") === "true";
    if (isConfirmed) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    let isMounted = true;

    detectUserCountry().then((result) => {
      if (!isMounted) return;
      setDetectedCountry(result.countryCode);
      setIsDetecting(false);
      if (!userInteracted) {
        setSelectedLang(result.language);
        i18n.changeLanguage(result.language);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [i18n, userInteracted]);

  const handleLanguageChange = (lang: "id" | "en") => {
    setUserInteracted(true);
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  };

  const handleConfirm = () => {
    localStorage.setItem("sublims_lang", selectedLang);
    localStorage.setItem("sublims_lang_confirmed", "true");
    i18n.changeLanguage(selectedLang);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const isIndonesia = selectedLang === "id" || detectedCountry === "ID";

  return (
    <div
      className="lang-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
    >
      <div className="lang-modal-box">
        <div className="lang-modal-header">
          <div className="lang-modal-badge">
            <span className="lang-badge-dot" />
            <span>
              {isDetecting
                ? "Mendeteksi lokasi / Detecting..."
                : isIndonesia
                  ? t("modal.detectedId")
                  : t("modal.detectedOther")}
            </span>
          </div>
          <h2 id="lang-modal-title" className="lang-modal-title">
            {t("modal.title")} <span className="lang-modal-slash">/</span>{" "}
            <span className="lang-modal-sub">{t("modal.subtitle")}</span>
          </h2>
          <p className="lang-modal-desc">
            {isIndonesia ? t("modal.descriptionId") : t("modal.descriptionOther")}
          </p>
        </div>

        <div className="lang-modal-body">
          <label htmlFor="lang-select-input" className="lang-modal-label">
            {t("modal.selectLabel")}
          </label>
          <div className="lang-select-wrapper">
            <select
              id="lang-select-input"
              className="lang-select-input"
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value as "id" | "en")}
            >
              <option value="id">🇮🇩 Bahasa Indonesia (ID)</option>
              <option value="en">🇬🇧 English (EN)</option>
            </select>
            <div className="lang-select-arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path
                  d="M5 8l5 5 5-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="lang-modal-footer">
          <button type="button" className="lang-modal-btn" onClick={handleConfirm}>
            {t("modal.chooseBtn")}
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10h11M11 5l5 5-5 5" />
            </svg>
          </button>
          <p className="lang-modal-note">{t("modal.note")}</p>
        </div>
      </div>
    </div>
  );
}
