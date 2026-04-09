import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { QuoteModal } from "@/components/dental/QuoteModal";
import "./LandingPage.css";

const WA = "905338229445";
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const STATS = [
  { val: "2", label: "Visits total" },
  { val: "Save 65%", label: "vs UK prices" },
  { val: "45+ Ncm", label: "Primary stability" },
  { val: "92–100%", label: "5yr survival rate" },
];

const COMPARE = [
  { label: "Implants per arch", ao4: "4", ao6: "6" },
  { label: "Load distribution", ao4: "Good", ao6: "Superior" },
  { label: "Best for bone volume", ao4: "Moderate", ao6: "Limited / atrophied" },
  { label: "Cantilever length", ao4: "Longer", ao6: "Shorter = less stress" },
  { label: "Treatment time", ao4: "Same-day teeth", ao6: "Same-day teeth" },
  { label: "Ideal patient", ao4: "Sufficient bone", ao6: "Less bone, bruxism, heavier build" },
];

const WHYS = [
  { icon: "🔬", title: "3D CT Scan Planning", body: "Every case is planned with CBCT 3D imaging before any incision. Implant position, depth and angulation are mapped digitally." },
  { icon: "⚡", title: "Same-Day Teeth", body: "If primary stability ≥45 Ncm is achieved, temporary fixed teeth are placed the same day as surgery. No dentures in between." },
  { icon: "🏆", title: "Premium Implant Systems", body: "We use Straumann, Nobel Biocare or equivalent premium-grade titanium implants — the same brands used in UK or German clinics." },
  { icon: "🏥", title: "In-House Zirconia Lab", body: "Your permanent full-arch zirconia bridge is milled in our own lab — full quality control, no third-party delays." },
  { icon: "✈️", title: "Full Journey Coordination", body: "Two-visit travel planning, airport transfers, hotel assistance and a personal treatment coordinator throughout." },
  { icon: "📋", title: "Written Implant Guarantee", body: "All implant and prosthetic work carries a written guarantee. We stand behind every case we deliver." },
];

const STEPS = [
  { n: "01", title: "Send your X-ray + photos", body: "We assess your case for free. If CBCT is needed, we arrange it on arrival." },
  { n: "02", title: "Visit 1 (5–7 days) — Surgery & temporaries", body: "3D scan, implant placement under local anaesthesia, immediate temporary fixed prosthesis on the same day." },
  { n: "03", title: "Healing phase — 3–4 months at home", body: "Implants integrate with your jawbone. Your coordinator stays in touch throughout." },
  { n: "04", title: "Visit 2 (3–5 days) — Permanent prosthesis", body: "Final zirconia full-arch bridge fitted, bite adjusted, occlusal check. Handover with care guide." },
];

const REVIEWS = [
  { name: "David H.", country: "🇬🇧 UK", stars: 5, text: "I had dentures for 6 years. After All-on-6 at Temelci I have permanent teeth again. I can eat, laugh, speak without a second thought. Worth every penny and the saving vs the UK was enormous." },
  { name: "Klaus M.", country: "🇩🇪 Germany", stars: 5, text: "All-on-4 in 2 Besuchen — zum Bruchteil des deutschen Preises. Dr. Ali Temelci hat alles perfekt geplant. Ich bin überglücklich." },
  { name: "Olga S.", country: "🇷🇺 Russia", stars: 5, text: "Сделала All-on-6 у Темелджи. Два визита, три месяца — постоянные зубы. Огромное спасибо, результат превзошёл ожидания." },
  { name: "Mehmet A.", country: "🇦🇪 UAE", stars: 5, text: "Same-day teeth with All-on-4. Dr. Temelci used 3D imaging, placed 4 implants perfectly. I flew home with fixed teeth after just one visit." },
];

const FAQS = [
  { q: "What is the difference between All-on-4 and All-on-6?", a: "Both support a full fixed arch on implants. All-on-4 uses 4 strategically angled implants; All-on-6 uses 6. All-on-6 provides better load distribution and is preferred for patients with lower bone density, bruxism, or a heavier bite force. Dr. Ali Temelci assesses your CBCT and recommends the right option." },
  { q: "Will I be without teeth at any point?", a: "No. With immediate loading, temporary fixed teeth are placed on the day of surgery. You never leave the clinic without functional, presentable teeth." },
  { q: "How many trips to Cyprus do I need?", a: "Two visits: Visit 1 (5–7 days) for surgery and immediate temporaries. Visit 2 (3–5 days, 3–4 months later) for the permanent zirconia bridge. Many patients combine Visit 2 with a holiday." },
  { q: "How does the cost compare to the UK?", a: "Full-arch All-on-4 in the UK typically costs £15,000–£30,000+ per arch. Our prices in Cyprus are 60–65% lower. Even with flights and two hotels, the saving is significant." },
  { q: "What if I was told I don't have enough bone?", a: "All-on-4 was designed for patients with limited bone. The angled posterior implants often bypass areas of bone loss — avoiding grafts. We'll assess your CT scan and tell you exactly what's possible." },
  { q: "North Cyprus vs Turkey for All-on-4?", a: "Same price advantage, quieter clinic environment, no language barrier, EU-standard implants and materials. North Cyprus is also 40 minutes from mainland Turkey — many patients combine both destinations." },
];

export default function AllOn4Landing() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const waMsg = "Hi! I'm interested in All-on-4 / All-on-6 implants at Temelci Dental. Can you send me information and pricing?";

  return (
    <div className="landing-page">
      {/* HERO */}
      <section className="hero" id="top">
        <div className="badge-top fade-up"><span />All-on-4 &amp; All-on-6 · Kyrenia, North Cyprus</div>
        <h1 className="fade-up delay-1">
          All-on-4 / All-on-6<br />
          <span style={{ color: "var(--teal)" }}>Full Arch Implants</span>
        </h1>
        <p className="fade-up delay-2" style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.75)", maxWidth: 540, marginBottom: 8, lineHeight: 1.65 }}>
          Permanent fixed teeth on 4 or 6 implants. Same-day temporaries. Zirconia bridge.
          <strong style={{ color: "var(--gold2)" }}> Save 60–65% vs UK or Turkey.</strong>
        </p>
        <p className="fade-up delay-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>
          ✓ 3D CT planning &nbsp;·&nbsp; ✓ Nobel / Straumann implants &nbsp;·&nbsp; ✓ Same-day teeth
        </p>
        <div className="fade-up delay-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-cta" onClick={() => setQuoteOpen(true)}>✦ Get My Free Quote</button>
          <a className="btn-cta" style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.25)", color: "#fff" }}
            href={waLink(waMsg)} target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
        </div>
        <div className="fade-up delay-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 48, width: "100%", maxWidth: 560 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "14px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "clamp(13px,2vw,17px)", fontWeight: 800, color: "var(--teal)", lineHeight: 1.2 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TURKEY BANNER */}
      <section style={{ background: "var(--gold)", padding: "16px 24px", textAlign: "center" }}>
        <p style={{ color: "#1a1200", fontSize: 13, fontWeight: 700, margin: 0 }}>
          🌍 Searching for <em>All-on-4 Turkey</em>? North Cyprus offers the same savings with a quieter, more personal clinic — just 40 min from Turkey.
          <a href={waLink("Hi, I was searching for All-on-4 Turkey and found Temelci Dental. Can you tell me more?")}
            target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: 10, textDecoration: "underline", fontWeight: 800 }}>Compare now →</a>
        </p>
      </section>

      {/* ALL-ON-4 vs ALL-ON-6 */}
      <section className="section-white">
        <div className="section-inner" style={{ maxWidth: 700 }}>
          <h2 className="section-heading">All-on-4 vs All-on-6 — which is right for you?</h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 28, fontSize: 14, maxWidth: 560, margin: "0 auto 28px" }}>
            Both options give you a fixed full-arch prosthesis with same-day temporaries. The difference is in implant number, stability, and bone requirements.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "2px solid #e2e8f0" }}></th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "var(--teal)", borderBottom: "2px solid #e2e8f0" }}>All-on-4</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "var(--navy)", borderBottom: "2px solid #e2e8f0" }}>All-on-6</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafcff" }}>
                    <td style={{ padding: "11px 16px", fontWeight: 600, color: "#444" }}>{row.label}</td>
                    <td style={{ padding: "11px 16px", textAlign: "center", color: "#555" }}>{row.ao4}</td>
                    <td style={{ padding: "11px 16px", textAlign: "center", color: "#555" }}>{row.ao6}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#888" }}>
            Not sure which is right for you? Send your X-ray — our team will advise for free.
          </p>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button className="btn-cta" onClick={() => setQuoteOpen(true)}>✦ Get personalised recommendation</button>
          </div>
        </div>
      </section>

      {/* WHY TEMELCI */}
      <section className="section-dark">
        <div className="section-inner">
          <h2 className="section-heading" style={{ color: "#fff" }}>Why patients choose Temelci Dental for full-arch implants</h2>
          <div className="why-grid">
            {WHYS.map((w, i) => (
              <div key={i} className="why-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ fontSize: 28 }}>{w.icon}</span>
                <h3 style={{ color: "#fff" }}>{w.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)" }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-white">
        <div className="section-inner">
          <h2 className="section-heading">Your All-on-4 / All-on-6 journey</h2>
          <div className="steps-list">
            {STEPS.map((s, i) => (
              <div key={i} className="step-item">
                <div className="step-num">{s.n}</div>
                <div>
                  <h3 style={{ marginBottom: 4 }}>{s.title}</h3>
                  <p style={{ color: "#666", fontSize: 14 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-grey">
        <div className="section-inner">
          <h2 className="section-heading">Patient stories</h2>
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
          <h2 className="section-heading">Questions about All-on-4 &amp; All-on-6</h2>
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
          Find out if All-on-4 or All-on-6 is right for you
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 28, maxWidth: 480, textAlign: "center" }}>
          Send your X-ray or photos — free assessment, personalised recommendation, no commitment required.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-cta" onClick={() => setQuoteOpen(true)}>✦ Get Free Assessment</button>
          <a className="btn-cta" href={waLink(waMsg)} target="_blank" rel="noopener noreferrer"
            style={{ background: "#25d366", border: "none" }}>💬 WhatsApp Direct</a>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 20 }}>
          Temelci Dental · Kyrenia, North Cyprus · +90 533 822 9445
        </p>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
