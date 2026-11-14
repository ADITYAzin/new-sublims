import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageModal from "./components/LanguageModal";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { ProductImageSlider } from "./components/ProductImageSlider";

const heroVideo = "/video/SUBLiMS.mp4";

const products = [
  {
    code: "SNS1111-12H",
    size: "110 × 110 × 12 cm",
    weight: "7.5 kg",
    staticLoad: "2.000 kg",
    dynamicLoad: "1.000 kg",
    rackingLoad: "—",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "—",
    type: "Light Duty",
    palletType: "mangkok",
    tone: "light",
    category: "110",
  },
  {
    code: "SNS1111-12W",
    size: "110 × 110 × 12 cm",
    weight: "7.5 kg",
    staticLoad: "3.000 kg",
    dynamicLoad: "1.500 kg",
    rackingLoad: "—",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "—",
    type: "Medium Duty",
    palletType: "mangkok",
    tone: "dark",
    category: "110",
  },
  {
    code: "SNS1111-15H",
    size: "110 × 110 × 15 cm",
    weight: "12 kg",
    staticLoad: "3.000 kg",
    dynamicLoad: "1.500 kg",
    rackingLoad: "750 kg",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "—",
    type: "Racking",
    palletType: "racking",
    tone: "light",
    category: "110",
  },
  {
    code: "SNS1111-15W",
    size: "110 × 110 × 15 cm",
    weight: "12 kg",
    staticLoad: "4.000 kg",
    dynamicLoad: "2.000 kg",
    rackingLoad: "1.000 kg",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "—",
    type: "Heavy Racking",
    palletType: "racking",
    tone: "dark",
    category: "110",
  },
  {
    code: "SNS1210-12H",
    size: "120 × 100 × 12 cm",
    weight: "7.5 kg",
    staticLoad: "2.000 kg",
    dynamicLoad: "1.000 kg",
    rackingLoad: "—",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "—",
    type: "Light Duty",
    palletType: "mangkok",
    tone: "dark",
    category: "120",
  },
  {
    code: "SNS1210-12W",
    size: "120 × 100 × 12 cm",
    weight: "7.5 kg",
    staticLoad: "3.000 kg",
    dynamicLoad: "1.500 kg",
    rackingLoad: "—",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "—",
    type: "Medium Duty",
    palletType: "mangkok",
    tone: "light",
    category: "120",
  },
  {
    code: "SNS1210-16H",
    size: "120 × 100 × 16 cm",
    weight: "17 kg",
    staticLoad: "5.000 kg",
    dynamicLoad: "1.500 kg",
    rackingLoad: "750 kg",
    forklift: "4 Arah",
    handPallet: "2 Arah",
    stacker: "2 Arah",
    type: "Heavy Duty",
    palletType: "racking",
    tone: "dark",
    category: "120",
  },
  {
    code: "SNS1210-16W",
    size: "120 × 100 × 16 cm",
    weight: "17 kg",
    staticLoad: "6.000 kg",
    dynamicLoad: "2.000 kg",
    rackingLoad: "1.000 kg",
    forklift: "4 Arah",
    handPallet: "2 Arah",
    stacker: "2 Arah",
    type: "Heavy Racking",
    palletType: "racking",
    tone: "light",
    category: "120",
  },
  {
    code: "SFF1210-16H",
    size: "120 × 100 × 16 cm",
    weight: "18 kg",
    staticLoad: "5.000 kg",
    dynamicLoad: "1.500 kg",
    rackingLoad: "750 kg",
    forklift: "4 Arah",
    handPallet: "2 Arah",
    stacker: "2 Arah",
    type: "Flat Deck",
    palletType: "flat",
    tone: "light",
    category: "flat",
  },
  {
    code: "SFF1210-16W",
    size: "120 × 100 × 16 cm",
    weight: "18 kg",
    staticLoad: "6.000 kg",
    dynamicLoad: "2.000 kg",
    rackingLoad: "1.000 kg",
    forklift: "4 Arah",
    handPallet: "2 Arah",
    stacker: "2 Arah",
    type: "Flat Deck Heavy",
    palletType: "flat",
    tone: "dark",
    category: "flat",
  },
  {
    code: "SSP16",
    size: "120 × 100 × 15 cm",
    weight: "16 kg",
    staticLoad: "2.000 kg",
    dynamicLoad: "1.000 kg",
    rackingLoad: "—",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "4 Arah",
    type: "Multi-Way",
    palletType: "solid",
    tone: "light",
    category: "ssp",
  },
  {
    code: "SSP25",
    size: "120 × 100 × 15 cm",
    weight: "25 kg",
    staticLoad: "3.000 kg",
    dynamicLoad: "1.500 kg",
    rackingLoad: "750 kg",
    forklift: "2 Arah",
    handPallet: "2 Arah",
    stacker: "2 Arah",
    type: "Solid Heavy",
    palletType: "solid",
    tone: "dark",
    category: "ssp",
  },
];

const exportPalletCodes = new Set([
  "SNS1111-12H",
  "SNS1111-12W",
  "SNS1210-12H",
  "SNS1210-12W",
  "SSP16",
]);

const categories = [
  { id: "all" },
  { id: "ekspor" },
  { id: "gudang" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function PalletGraphic() {
  return (
    <svg className="pallet-graphic" viewBox="0 0 320 190" fill="none" aria-hidden="true">
      <path d="m34 93 126-62 127 62-127 63L34 93Z" stroke="#000000" strokeWidth="2" />
      <path d="M34 93v18l126 63 127-63V93" stroke="#000000" strokeWidth="2" />
      <path d="m64 79 126 63M96 62l127 63M128 46l127 63" stroke="#a2c4c9" strokeWidth="1.5" />
      <path d="m65 108 126-62M98 125l126-63M130 141l126-62" stroke="#a2c4c9" strokeWidth="1.5" />
      <path d="M75 128v21M246 128v21M146 160v20" stroke="#000000" strokeWidth="5" />
    </svg>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFiltersSticky, setIsFiltersSticky] = useState(false);
  const filtersSentinelRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    const isExport = exportPalletCodes.has(p.code);
    if (selectedCategory === "ekspor") return isExport;
    if (selectedCategory === "gudang") return !isExport;
    return true;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sentinel = filtersSentinelRef.current;
      if (sentinel) {
        const topOffset = window.innerWidth <= 900 ? 76 : 80;
        const rect = sentinel.getBoundingClientRect();
        const catalogEl = sentinel.closest("section");
        const catalogBottom = catalogEl ? catalogEl.getBoundingClientRect().bottom : Infinity;
        setIsFiltersSticky(rect.top <= topOffset && catalogBottom > topOffset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const formatAccess = (value: string) => {
    if (value === "4 Arah") return t("catalog.specs.fourWay");
    if (value === "2 Arah") return t("catalog.specs.twoWay");
    return value;
  };

  return (
    <>
      <LanguageModal />

      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-menu-open" : ""}`}
      >
        <a className="logo" href="#beranda" onClick={closeMenu} aria-label="SUBLiMS">
          SUBLiMS
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#tentang" onClick={closeMenu}>
            {t("nav.about")}
          </a>
          <a href="#katalog" onClick={closeMenu}>
            {t("nav.catalog")}
          </a>
          <a href="#kontak" onClick={closeMenu}>
            {t("nav.contact")}
          </a>
          <div className="mobile-switcher-wrap">
            <span className="mobile-switcher-label">{t("modal.selectLabel")}</span>
            <LanguageSwitcher variant="mobile" />
          </div>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher variant="header" />
        </div>
      </header>

      <main>
        <section className="hero" id="beranda">
          <video
            className="hero-image"
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <h1>
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
            </h1>
            <div className="hero-bottom">
              <p>{t("hero.subtitle")}</p>
              <a className="circle-link" href="#katalog" aria-label={t("hero.viewCatalog")}>
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="hero-index" />
        </section>

        <section className="about section-pad" id="tentang">
          <div className="section-heading">
            <div className="eyebrow">
              <span />
              {t("about.eyebrow")}
            </div>
            <span className="section-number">02</span>
          </div>

          <div className="about-grid">
            <h2>
              <em>{t("about.companyName")}</em>
            </h2>
            <div className="about-copy">
              <p>{t("about.description")}</p>
            </div>
          </div>

          <div className="principles">
            <div className="principle">
              <span>01</span>
              <h3>{t("about.principles.p1.title")}</h3>
              <p>{t("about.principles.p1.desc")}</p>
            </div>
            <div className="principle">
              <span>02</span>
              <h3>{t("about.principles.p2.title")}</h3>
              <p>{t("about.principles.p2.desc")}</p>
            </div>
            <div className="principle">
              <span>03</span>
              <h3>{t("about.principles.p3.title")}</h3>
              <p>{t("about.principles.p3.desc")}</p>
            </div>
          </div>
        </section>

        <section className="catalog section-pad" id="katalog">
          <div className="section-heading catalog-heading">
            <div className="eyebrow">
              <span />
              {t("catalog.eyebrow")}
            </div>
            <span className="section-number">03</span>
          </div>

          <div className="catalog-title">
            <h2>
              {t("catalog.title")} <em>{t("catalog.titleEm")}</em>
            </h2>
          </div>

          <div ref={filtersSentinelRef} className="catalog-filters-sentinel" aria-hidden="true" />
          <div className={`catalog-filters-sticky-wrap ${isFiltersSticky ? "is-sticky" : ""}`}>
            <div className="catalog-dropdown-wrapper">
              <div className="catalog-dropdown-container" ref={dropdownRef}>
                <button
                  type="button"
                  className={`catalog-dropdown-trigger ${isDropdownOpen ? "is-open" : ""} ${selectedCategory !== "all" ? "has-active-selection" : ""}`}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="dropdown-trigger-left">
                    <span className="dropdown-label">
                      {selectedCategory === "all"
                        ? t("catalog.selectPlaceholder")
                        : t(`catalog.categories.${selectedCategory}`)}
                    </span>
                  </div>

                  <div className="dropdown-trigger-right">
                    {selectedCategory !== "all" && (
                      <span
                        role="button"
                        tabIndex={0}
                        className="dropdown-inline-reset"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory("all");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            setSelectedCategory("all");
                          }
                        }}
                        title={t("catalog.resetFilter")}
                        aria-label={t("catalog.resetFilter")}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <span className="reset-text">{t("catalog.resetFilter")}</span>
                      </span>
                    )}

                    <svg
                      className={`dropdown-chevron-icon ${isDropdownOpen ? "is-open" : ""}`}
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 7.5 5 5 5-5" />
                    </svg>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="catalog-dropdown-menu" role="listbox">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      const label = t(`catalog.categories.${cat.id}`);

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`catalog-dropdown-option ${isSelected ? "is-selected" : ""}`}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <span className="option-name">{label}</span>
                          {isSelected && (
                            <svg
                              className="option-check-icon"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product, index) => {
              return (
                <article className="product-card" key={product.code}>
                  <div className="product-top">
                    <span className="product-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <ProductImageSlider code={product.code} />
                  <div className="product-info">
                    <div className="product-code-row">
                      <h3>{product.code}</h3>
                    </div>
                    <div className="product-spec-list">
                      <div className="spec-row">
                        <span className="spec-label">{t("catalog.specs.dimensions")}</span>
                        <span className="spec-value">{product.size}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">{t("catalog.specs.weight")}</span>
                        <span className="spec-value">{product.weight}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">{t("catalog.specs.staticLoad")}</span>
                        <span className="spec-value">{product.staticLoad}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">{t("catalog.specs.dynamicLoad")}</span>
                        <span className="spec-value">{product.dynamicLoad}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">{t("catalog.specs.rackingLoad")}</span>
                        <span className="spec-value">{product.rackingLoad}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">{t("catalog.specs.forklift")}</span>
                        <span className="spec-value">{formatAccess(product.forklift)}</span>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">{t("catalog.specs.handPallet")}</span>
                        <span className="spec-value">{formatAccess(product.handPallet)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="contact section-pad" id="kontak">
          <div className="section-heading">
            <div className="eyebrow">
              <span />
              {t("contact.eyebrow")}
            </div>
            <span className="section-number">04</span>
          </div>

          <div className="contact-main">
            <h2>
              {t("contact.titleLine1")}
              {t("contact.titleEm") ? (
                <>
                  <br />
                  <em>{t("contact.titleEm")}</em>
                </>
              ) : null}
            </h2>
          </div>

          <div className="contact-details">
            <div>
              <span>{t("contact.labels.email")}</span>
              <a href="mailto:office@sublims.id">office@sublims.id</a>
            </div>
            <div>
              <span>{t("contact.labels.whatsapp")}</span>
              <a href="tel:+6285113668629">+62 851 1366 8629</a>
            </div>
            <div>
              <span>{t("contact.labels.hours")}</span>
              <p>{t("contact.labels.hoursValue")}</p>
            </div>
            <div className="address">
              <span>{t("contact.labels.location")}</span>
              <p>{t("contact.labels.address")}</p>
            </div>
          </div>

          <footer>
            <a className="logo footer-logo" href="#beranda">
              SUBLiMS
            </a>
            <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
            <a href="#beranda" className="back-top">
              {t("footer.backToTop")}
            </a>
          </footer>
        </section>
      </main>
    </>
  );
}
