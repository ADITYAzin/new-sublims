import { useEffect, useState } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1620388640785-892616248ec8?auto=format&fit=crop&w=2200&q=88";

const products = [
  {
    code: "SNS1111-12W",
    size: "110 × 110 × 12 cm",
    load: "3.000 kg",
    type: "Light Duty",
    tone: "light",
  },
  {
    code: "SNS1111-15W",
    size: "110 × 110 × 15 cm",
    load: "4.000 kg",
    type: "Racking",
    tone: "dark",
  },
  {
    code: "SNS1210-16W",
    size: "120 × 100 × 16 cm",
    load: "6.000 kg",
    type: "Heavy Duty",
    tone: "light",
  },
  {
    code: "SFF1210-16W",
    size: "120 × 100 × 16 cm",
    load: "6.000 kg",
    type: "Flat Deck",
    tone: "dark",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function PalletGraphic({ dark }: { dark?: boolean }) {
  const stroke = dark ? "#a2c4c9" : "#000000";
  return (
    <svg className="pallet-graphic" viewBox="0 0 320 190" fill="none" aria-hidden="true">
      <path d="m34 93 126-62 127 62-127 63L34 93Z" stroke={stroke} strokeWidth="2" />
      <path d="M34 93v18l126 63 127-63V93" stroke={stroke} strokeWidth="2" />
      <path d="m64 79 126 63M96 62l127 63M128 46l127 63" stroke={stroke} />
      <path d="m65 108 126-62M98 125l126-63M130 141l126-62" stroke={stroke} />
      <path d="M75 128v21M246 128v21M146 160v20" stroke={stroke} strokeWidth="5" />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="logo" href="#beranda" onClick={closeMenu} aria-label="SUBLiMS">
          SUBLiMS<span>.</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#tentang" onClick={closeMenu}>
            Tentang
          </a>
          <a href="#katalog" onClick={closeMenu}>
            Katalog
          </a>
          <a href="#kontak" onClick={closeMenu}>
            Kontak
          </a>
        </nav>

        <a
          className="header-cta"
          href="https://wa.me/6285113668629"
          target="_blank"
          rel="noreferrer"
        >
          Hubungi kami <ArrowIcon />
        </a>
      </header>

      <main>
        <section className="hero" id="beranda">
          <img
            className="hero-image"
            src={heroImage}
            alt="Operasional forklift di dalam gudang logistik"
          />
          <div className="hero-overlay" />

        <div className="hero-content">
          <div className="eyebrow light">
            <span />
            Distributor pallet plastik
          </div>
          <h1>
            Pallet tangguh.
            <br />
            Alur kerja <em>lancar.</em>
          </h1>
          <div className="hero-bottom">
            <p>Pallet plastik terukur untuk pergudangan, manufaktur, dan distribusi industri.</p>
            <a className="circle-link" href="#katalog" aria-label="Lihat katalog">
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero-index">
          <span>01</span>
          <span>SUBLiMS / SIDOARJO</span>
        </div>
      </section>

      <section className="about section-pad" id="tentang">
        <div className="section-heading">
          <div className="eyebrow">
            <span />
            Tentang
          </div>
          <span className="section-number">02</span>
        </div>

        <div className="about-grid">
          <h2>
            Kemasan industri
            <br />
            yang <em>masuk akal.</em>
          </h2>
          <div className="about-copy">
            <p>
              Subur Berlimpah Sejahtera berdiri pada tahun 2025 dan berlokasi di Sidoarjo - Jawa
              Timur. Kami melayani pemesanan berbagai macam jenis dan ukuran pallet plastik. Baik
              dari bahan plastik murni maupun daur ulang.
            </p>
            <a className="text-link" href="#kontak">
              Kenali cara kami bekerja <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="principles">
          <div className="principle">
            <span>01</span>
            <h3>Tepat guna</h3>
            <p>Spesifikasi disesuaikan dengan konteks penggunaan.</p>
          </div>
          <div className="principle">
            <span>02</span>
            <h3>Terukur</h3>
            <p>Data beban jelas untuk keputusan yang lebih aman.</p>
          </div>
          <div className="principle">
            <span>03</span>
            <h3>Responsif</h3>
            <p>Konsultasi produk dan distribusi tanpa proses panjang.</p>
          </div>
        </div>
      </section>

      <section className="catalog section-pad" id="katalog">
        <div className="section-heading catalog-heading">
          <div className="eyebrow">
            <span />
            Katalog
          </div>
          <span className="section-number">03</span>
        </div>

        <div className="catalog-title">
          <h2>
            Pilih berdasarkan
            <br />
            <em>kebutuhan beban.</em>
          </h2>
          <p>Tersedia material virgin dan recycled untuk berbagai kebutuhan rantai pasok.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className={`product-card ${product.tone === "dark" ? "dark" : ""}`}
              key={product.code}
            >
              <div className="product-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="product-type">{product.type}</span>
              </div>
              <PalletGraphic dark={product.tone === "dark"} />
              <div className="product-info">
                <h3>{product.code}</h3>
                <dl>
                  <div>
                    <dt>Dimensi</dt>
                    <dd>{product.size}</dd>
                  </div>
                  <div>
                    <dt>Beban statis</dt>
                    <dd>{product.load}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        <a
          className="catalog-cta"
          href="mailto:office@sublims.id?subject=Permintaan%20Katalog%20SUBLiMS"
        >
          Minta katalog lengkap <ArrowIcon />
        </a>
      </section>

      <section className="contact section-pad" id="kontak">
        <div className="section-heading">
          <div className="eyebrow">
            <span />
            Kontak
          </div>
          <span className="section-number">04</span>
        </div>

        <div className="contact-main">
          <h2>
            Punya kebutuhan
            <br />
            pallet <em>spesifik?</em>
          </h2>
          <a
            className="contact-button"
            href="https://wa.me/6285113668629?text=Halo%20SUBLiMS%2C%20saya%20ingin%20berkonsultasi%20mengenai%20pallet%20plastik."
            target="_blank"
            rel="noreferrer"
          >
            Konsultasikan sekarang <ArrowIcon />
          </a>
        </div>

        <div className="contact-details">
          <div>
            <span>Email</span>
            <a href="mailto:office@sublims.id">office@sublims.id</a>
          </div>
          <div>
            <span>WhatsApp</span>
            <a href="tel:+6285113668629">+62 851 1366 8629</a>
          </div>
          <div>
            <span>Operasional</span>
            <p>Sen–Jum / 08.00–16.00 WIB</p>
          </div>
          <div className="address">
            <span>Lokasi</span>
            <p>Wonoayu, Sidoarjo, Jawa Timur</p>
          </div>
        </div>

        <footer>
          <a className="logo footer-logo" href="#beranda">
            SUBLiMS<span>.</span>
          </a>
          <p>© {new Date().getFullYear()} Subur Berlimpah Sejahtera</p>
          <a href="#beranda" className="back-top">
            Kembali ke atas ↑
          </a>
        </footer>
      </section>
    </main>
  </>
  );
}
