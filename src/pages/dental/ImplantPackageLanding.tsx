import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { QuoteModal } from "@/components/dental/QuoteModal";
import "./LandingPage.css";

const WA = "905338229445";
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const PACKAGES = [
  {
    name: "Single Implant Package",
    emoji: "🦷",
    includes: ["Straumann / Nobel Biocare implant", "Custom zirconia crown", "CT scan & planning", "VIP transfer", "Free aftercare consultation"],
    note: "Per tooth. Complete in 2 visits.",
    highlight: false,
  },
  {
    name: "Multiple Implants Package",
    emoji: "✨",
    includes: ["2–6 implants same session", "Full zirconia crown suite", "3D CT surgical planning", "VIP transfer (both visits)", "Dedicated coordinator"],
    note: "Best value for 2+ missing teeth.",
    highlight: true,
  },
  {
    name: "Full Arch Package",
    emoji: "🏆",
    includes: ["All-on-4 or All-on-6", "Immediate loading (same-day teeth)", "Full zirconia arch bridge", "Two complete visit packages", "Written guarantee"],
    note: "Complete teeth-in-a-day solution.",
    highlight: false,
  },
];

const WHATS_INCLUDED = [
  { icon: "🔬", label: "3D CT scan & digital surgical planning" },
  { icon: "🦷", label: "Straumann or Nobel Biocare premium implants" },
  { icon: "👑", label: "Custom CAD/CAM zirconia or porcelain crown" },
  { icon: "✈️", label: "VIP airport transfer (Ercan or Larnaca)" },
  { icon: "🏨", label: "Hotel recommendations & assistance" },
  { icon: "👤", label: "Dedicated treatment coordinator" },
  { icon: "💬", label: "24/7 WhatsApp aftercare support" },
  { icon: "📋", label: "Written implant & prosthetic guarantee" },
];

const COMPARE = [
  { country: "🇬🇧 UK", single: "£2,000–£3,500", full: "£15,000–£30,000+" },
  { country: "🇩🇪 Germany", single: "€1,800–€3,000", full: "€14,000–€25,000+" },
  { country: "🇳🇴 Norway", single: "kr 25,000–40,000", full: "kr 150,000+" },
  { country: "🇨🇾 Temelci Dental", single: "Contact us", full: "Contact us", highlight: true },
];

const REVIEWS = [
  { name: "James T.", country: "🇬🇧 UK", stars: 5, text: "Three implants at Temelci. I'd been quoted £9,000 in London. The saving, even with flights and hotel, was extraordinary. The quality is indistinguishable — my own dentist couldn't tell the difference." },
  { name: "Brigitte F.", country: "🇩🇪 Germany", stars: 5, text: "Zwei Implantate mit Zirkonkronen. Alles reibungslos — Transfer, Koordination, Ergebnis. Ich habe Deutschland empfohlen und niemand glaubt, wie viel billiger es war." },
  { name: "Alexandros N.", country: "🇬🇷 Greece", stars: 5, text: "Τέσσερα εμφυτεύματα σε δύο επισκέψεις. Άψογη εξυπηρέτηση, αποτέλεσμα υπέροχο. Οι τιμές στην Κύπρο είναι πολύ καλύτερες από την Ελλάδα." },
  { name: "Irina M.", country: "🇷🇺 Russia", stars: 5, text: "Один имплант + коронка. Всё включено — трансфер, гостиница, координатор. Очень профессиональная команда и отличный результат." },
];

const FAQS = [
  { q: "What's included in the package price?", a: "Our implant packages include the implant itself (Straumann, Nobel Biocare or equivalent), the custom zirconia crown, 3D CT scanning and surgical planning, VIP airport transfer and hotel coordination, a dedicated treatment coordinator, and 24/7 WhatsApp aftercare. Contact us for a full itemised quote." },
  { q: "How many visits do I need?", a: "Typically 2 visits. Visit 1 (3–5 days): CT scan, implant placement surgery, temporary restoration. Visit 2 (3–4 months later, 2–3 days): final zirconia crown fitting, bite check. For immediate-loading cases, temporary fixed teeth are placed the same day as surgery." },
  { q: "Which implant brands do you use?", a: "We primarily use Straumann and Nobel Biocare — the two most widely trusted implant systems worldwide, with the strongest long-term clinical evidence. We also work with other premium CE-marked European systems. We do not use low-cost 'generic' implant brands." },
  { q: "What if there's a problem after I return home?", a: "24/7 WhatsApp aftercare means you're never alone. We assess remotely and, if needed, can coordinate with local dental professionals in your home country. For anything requiring attention in Cyprus, we fast-track you. All implant work carries a written guarantee." },
  { q: "Is North Cyprus safe for dental tourism?", a: "North Cyprus has a well-established dental tourism industry and is a safe, stable destination. Kyrenia is a popular European holiday destination. Temelci Dental has served international patients from the UK, Germany, Russia, Greece and the Middle East since 1990." },
  { q: "How do I get a price?", a: "Send us your X-ray and/or photos via WhatsApp or our quote form. We'll provide a personalised itemised quote within 24 hours — completely free, no commitment." },
];

export default function ImplantPackageLanding() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const waMsg = "Hi! I'm interested in dental implant packages at Temelci Dental. Can you send me pricing and information?";

  return (
    <div className="landing-page">
      {/* HERO */}
      <section className="hero" id="top">
        <div className="badge-top fade-up"><span />Dental Implants · Kyrenia, North Cyprus</div>
        <h1 className="fade-up delay-1">
          Dental Implant<br />
          <span style={{ color: "var(--teal)" }}>Package Deals</span>
        </h1>
        <p className="fade-up delay-2" style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.75)", maxWidth: 540, marginBottom: 8, lineHeight: 1.65 }}>
          Premium Straumann &amp; Nobel Biocare implants. Complete packages including transfer, hotel &amp; aftercare.
          <strong style={{ color: "var(--gold2)" }}> Save 50–65% vs UK prices.</strong>
        </p>
        <p className="fade-up delay-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>
          ✓ 3D CT surgical planning &nbsp;·&nbsp; ✓ Same-day teeth available &nbsp;·&nbsp; ✓ Written guarantee
        </p>
        <div className="fade-up delay-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-cta" onClick={() => setQuoteOpen(true)}>✦ Get Package Quote</button>
          <a className="btn-cta" style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.25)", color: "#fff" }}
            href={waLink(waMsg)} target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-white">
        <div className="section-inner">
          <h2 className="section-heading">Choose your implant package</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PACKAGES.map((p, i) => (
              <div key={i} style={{
                border: p.highlight ? "2px solid var(--teal)" : "1px solid #e2e8f0",
                borderRadius: 20, padding: "28px 24px", position: "relative",
                boxShadow: p.highlight ? "0 8px 32px rgba(26,184,168,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                background: p.highlight ? "linear-gradient(135deg, rgba(26,184,168,0.04), #fff)" : "#fff"
              }}>
                {p.highlight && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--teal)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 100, whiteSpace: "nowrap" }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: "#1a1a2e" }}>{p.name}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", space: 8 }}>
                  {p.includes.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, fontSize: 13, color: "#555" }}>
                      <span style={{ color: "var(--teal)", fontWeight: 700, marginTop: 1 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>{p.note}</p>
                <button className="btn-cta" style={{ width: "100%", padding: "12px", fontSize: 13 }} onClick={() => setQuoteOpen(true)}>
                  Get Price →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section-dark">
        <div className="section-inner" style={{ maxWidth: 720 }}>
          <h2 className="section-heading" style={{ color: "#fff" }}>What's included in every package</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {WHATS_INCLUDED.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "rgba(255,255,255,0.06)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE COMPARISON */}
      <section className="section-white">
        <div className="section-inner" style={{ maxWidth: 640 }}>
          <h2 className="section-heading">Implant cost comparison by country</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "2px solid #e2e8f0" }}>Country</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666", borderBottom: "2px solid #e2e8f0" }}>Single implant</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#666", borderBottom: "2px solid #e2e8f0" }}>Full arch</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: "1px solid #f1f5f9",
                    background: row.highlight ? "rgba(26,184,168,0.06)" : i % 2 === 0 ? "#fff" : "#fafcff",
                    fontWeight: row.highlight ? 700 : 400,
                  }}>
                    <td style={{ padding: "12px 16px", color: row.highlight ? "var(--teal2)" : "#444" }}>{row.country}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: row.highlight ? "var(--teal2)" : "#555" }}>{row.single}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: row.highlight ? "var(--teal2)" : "#555" }}>{row.full}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "#aaa" }}>Contact us for a personalised quote — prices vary by case complexity.</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-grey">
        <div className="section-inner">
          <h2 className="section-heading">What our implant patients say</h2>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div style={{ color: "var(--gold)", fontSize: 16, marginBottom: 10 }}>{"★".repeat(r.stars)}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12, color: "#444" }}>"{r.text}"</p>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{r.name} <span style={{ opacity: 0.5, fontWeight: 400 }}>{r.country}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-white">
        <div className="section-inner" style={{ maxWidth: 700 }}>
          <h2 className="section-heading">Dental implant package FAQ</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q"><span>{f.q}</span><span className="faq-icon">{openFaq === i ? "−" : "+"}</span></div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hero" style={{ minHeight: "auto", padding: "64px 24px" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,4vw,34px)", color: "#fff", marginBottom: 12, fontWeight: 700 }}>
          Get your personalised implant package quote
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 28, maxWidth: 480, textAlign: "center" }}>
          Send your X-ray or photos — we'll assess your case and send a full itemised quote within 24 hours.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-cta" onClick={() => setQuoteOpen(true)}>✦ Get My Package Quote</button>
          <a className="btn-cta" href={waLink(waMsg)} target="_blank" rel="noopener noreferrer"
            style={{ background: "#25d366", border: "none" }}>💬 WhatsApp Direct</a>
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
