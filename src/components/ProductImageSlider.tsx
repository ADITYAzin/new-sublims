import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

interface ProductImageSliderProps {
  code: string;
}

export function ProductImageSlider({ code }: ProductImageSliderProps) {
  const { t } = useTranslation();
  const [slideIndex, setSlideIndex] = useState<0 | 1>(0);
  const [imgErrorA, setImgErrorA] = useState(false);
  const [imgErrorB, setImgErrorB] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const slides = [
    {
      id: "A",
      label: t("catalog.viewTop", "Tampak Atas"),
      shortLabel: "A (Atas)",
      src: `/images/pallet-img/${encodeURIComponent(code)} - A.png`,
      hasError: imgErrorA,
      onError: () => setImgErrorA(true),
    },
    {
      id: "B",
      label: t("catalog.viewBottom", "Tampak Bawah"),
      shortLabel: "B (Bawah)",
      src: `/images/pallet-img/${encodeURIComponent(code)} - B.png`,
      hasError: imgErrorB,
      onError: () => setImgErrorB(true),
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Detect horizontal swipe if deltaX is sufficiently larger than deltaY
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped left -> next
        setSlideIndex(1);
      } else {
        // Swiped right -> prev
        setSlideIndex(0);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      className="product-slider-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="product-slider-container">
        {/* Sliding Images Track */}
        <div
          className="product-slider-track"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div className="product-slider-item" key={slide.id}>
              {slide.hasError ? (
                <div className="product-slider-fallback">
                  <svg className="pallet-graphic" viewBox="0 0 320 190" fill="none" aria-hidden="true">
                    <path d="m34 93 126-62 127 62-127 63L34 93Z" stroke="#000000" strokeWidth="2" />
                    <path d="M34 93v18l126 63 127-63V93" stroke="#000000" strokeWidth="2" />
                    <path d="m64 79 126 63M96 62l127 63M128 46l127 63" stroke="#a2c4c9" strokeWidth="1.5" />
                    <path d="m65 108 126-62M98 125l126-63M130 141l126-62" stroke="#a2c4c9" strokeWidth="1.5" />
                    <path d="M75 128v21M246 128v21M146 160v20" stroke="#000000" strokeWidth="5" />
                  </svg>
                </div>
              ) : (
                <img
                  src={slide.src}
                  alt={`${code} - ${slide.label}`}
                  className="product-slider-img"
                  loading={idx === 0 ? "eager" : "lazy"}
                  onError={slide.onError}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>

        {/* Hover-activated Navigation Buttons */}
        <button
          type="button"
          className="product-slider-btn prev"
          onClick={handlePrev}
          aria-label="Lihat tampak sebelumnya"
        >
          <svg
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
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          className="product-slider-btn next"
          onClick={handleNext}
          aria-label="Lihat tampak berikutnya"
        >
          <svg
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
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Pill Angle Indicator & Dots Toggle */}
      <div className="product-slider-controls">
        <div className="product-slider-tabs">
          <button
            type="button"
            className={`slider-tab-btn ${slideIndex === 0 ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setSlideIndex(0);
            }}
          >
            {t("catalog.viewTop", "Tampak Atas")}
          </button>
          <button
            type="button"
            className={`slider-tab-btn ${slideIndex === 1 ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setSlideIndex(1);
            }}
          >
            {t("catalog.viewBottom", "Tampak Bawah")}
          </button>
        </div>

        <div className="product-slider-dots">
          <button
            type="button"
            className={`slider-dot ${slideIndex === 0 ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setSlideIndex(0);
            }}
            aria-label={t("catalog.viewTop", "Tampak Atas")}
          />
          <button
            type="button"
            className={`slider-dot ${slideIndex === 1 ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setSlideIndex(1);
            }}
            aria-label={t("catalog.viewBottom", "Tampak Bawah")}
          />
        </div>
      </div>
    </div>
  );
}
