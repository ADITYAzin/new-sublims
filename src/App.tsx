import { useEffect, useState } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1620388640785-892616248ec8?auto=format&fit=crop&w=2200&q=88";

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
    tone: "dark",
    category: "flat",
  },
  {
    code: "SPP16",
    size: "120 × 100 × 15 cm",
    weight: "16 kg",
    staticLoad: "2.000 kg",
    dynamicLoad: "1.000 kg",
    rackingLoad: "—",
    forklift: "4 Arah",
    handPallet: "4 Arah",
    stacker: "4 Arah",
    type: "Multi-Way",
    tone: "light",
    category: "spp",
  },
  {
    code: "SPP25",
    size: "120 × 100 × 15 cm",
    weight: "25 kg",
    staticLoad: "3.000 kg",
    dynamicLoad: "1.500 kg",
    rackingLoad: "750 kg",
    forklift: "2 Arah",
    handPallet: "2 Arah",
    stacker: "2 Arah",
    type: "Solid Heavy",
    tone: "dark",
    category: "spp",
  },
];

const categories = [
  { id: "all", label: "Semua Produk (12)" },
  { id: "110", label: "Ukuran 110 × 110 cm" },
  { id: "120", label: "Ukuran 120 × 100 cm" },
  { id: "racking", label: "Mendukung Racking" },
  { id: "flat", label: "Seri Flat Deck" },
  { id: "spp", label: "Seri SPP" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "racking") return p.rackingLoad !== "—";
    return p.category === selectedCategory;
  });

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
            <em>Subur Berlimpah Sejahtera</em>
          </h2>
          <div className="about-copy">
            <p>
              Kami berdiri pada tahun 2025 dan berlokasi di Sidoarjo - Jawa
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

        <div className="catalog-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <article className="product-card" key={product.code}>
              <div className="product-top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="product-type">{product.type}</span>
              </div>
              <PalletGraphic />
              <div className="product-info">
                <div className="product-code-row">
                  <h3>{product.code}</h3>
                  <span className="product-weight">Berat {product.weight}</span>
                </div>
                <dl className="product-spec-grid">
                  <div>
                    <dt>Dimensi</dt>
                    <dd>{product.size}</dd>
                  </div>
                  <div>
                    <dt>Beban Statis</dt>
                    <dd>{product.staticLoad}</dd>
                  </div>
                  <div>
                    <dt>Beban Dinamis</dt>
                    <dd>{product.dynamicLoad}</dd>
                  </div>
                  <div>
                    <dt>Beban Racking</dt>
                    <dd>{product.rackingLoad}</dd>
                  </div>
                  <div>
                    <dt>Forklift</dt>
                    <dd>{product.forklift}</dd>
                  </div>
                  <div>
                    <dt>Hand Pallet</dt>
                    <dd>{product.handPallet}</dd>
                  </div>
                </dl>
                <a
                  className="product-card-action"
                  href={`https://wa.me/6285113668629?text=Halo%20SUBLiMS%2C%20saya%20tertarik%20dengan%20pallet%20tipe%20${product.code}%20(${product.size}).%20Mohon%20info%20ketersediaan%20dan%20penawaran%20harga.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Pesan / Tanya Produk <ArrowIcon />
                </a>
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
            <p>Ds. Pilang, RT 24 / RW 12, Wonoayu, Sidoarjo, Jawa Timur 61261</p>
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
