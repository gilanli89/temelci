import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { QuoteModal } from "@/components/dental/QuoteModal";
import "./LandingPage.css";

const WA = "905338229445";
const waLink = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const STATS = [
  { val: "5–7", label: "Days treatment" },
  { val: "Save 60–70%", label: "vs UK prices" },
  { val: "15–20yr", label: "Veneer lifespan" },
  { val: "1990", label: "Est. Kyrenia" },
];

const WHYS = [
  { icon: "🏥", title: "In-House Lab", body: "We mill your veneers on-site — no outsourcing, tighter quality control, faster turnaround." },
  { icon: "🎨", title: "Digital Smile Design", body: "See your projected result before any preparation begins. You approve the shape and shade." },
  { icon: "✈️", title: "VIP Transfer & Hotel", body: "Airport pickup, hotel recommendations, and a dedicated coordinator from arrival to departure." },
  { icon: "🇬🇧", title: "EU-Grade Materials", body: "Premium European porcelain laminates and zirconia — same materials as London or Munich." },
  { icon: "💬", title: "24/7 Aftercare", body: "WhatsApp support after you fly home. Any concern answered within hours, not days." },
  { icon: "📋", title: "Written Guarantee", body: "All veneer and crown work carries a written clinical guarantee from Temelci Dental." },
];

const STEPS = [
  { n: "01", title: "Send your smile photos", body: "Via WhatsApp or our quote form — free, no obligation, response within 24h." },
  { n: "02", title: "Receive your digital smile preview", body: "Our prosthodontist designs your result digitally. You see it before you fly." },
  { n: "03", title: "Fly to Kyrenia", body: "VIP transfer from Ercan or Larnaca airport. Your coordinator meets you on arrival." },
  { n: "04", title: "Days 1–2: Consultation & prep", body: "Full examination, shade selection, minimal tooth preparation, temporaries placed." },
  { n: "05", title: "Days 3–5: Lab fabrication", body: "Our in-house lab mills your custom porcelain or zirconia restorations." },
  { n: "06", title: "Day 6–7: Final fitting & reveal", body: "Permanent bonding, bite check, photographs. You leave with your new smile." },
];

const REVIEWS = [
  { name: "Sarah M.", country: "🇬🇧 UK", stars: 5, text: "I flew from London for 10 veneers. Saved over £9,000 vs quotes at home. The result is stunning — completely natural. I wish I'd done it sooner." },
  { name: "Anastasia K.", country: "🇩🇪 Germany", stars: 5, text: "Ich hatte Angst, aber das Team hat mich sofort beruhigt. Natürliches, strahlendes Ergebnis — ich bekomme ständig Komplimente." },
  { name: "Marina V.", country: "🇷🇺 Russia", stars: 5, text: "Голливудская улыбка за 6 дней. Профессиональная команда, внимательное отношение. Уже рекомендую всем." },
  { name: "Yiannis P.", country: "🇬🇷 Greece", stars: 5, text: "Εκπληκτική δουλειά σε εξαιρετική τιμή. Επέστρεψα με νέα αυτοπεποίθηση. Η ομάδα ήταν καταπληκτική." },
];

const FAQS = [
  { q: "How long does Hollywood Smile take?", a: "Most treatments are completed in 5–7 days: consultation, digital design, preparation, lab fabrication and final fitting — all at our Kyrenia clinic." },
  { q: "How much can I save vs the UK?", a: "Typical Hollywood Smile prices in the UK are £8,000–£20,000+. Our prices are 60–70% lower, with the same premium European materials and expertise." },
  { q: "Does it hurt?", a: "Hollywood Smile is minimally invasive. Local anaesthesia is used for preparation. Most patients report little to no discomfort. The whole experience surprises people by how comfortable it is." },
  { q: "How long do the veneers last?", a: "With proper care — normal brushing, avoiding biting hard objects, and regular check-ups — porcelain laminates and zirconia crowns last 15–20 years or more." },
  { q: "Can I see results before flying?", a: "Yes. Send us your photos and we'll create a digital smile simulation — completely free, no commitment required." },
  { q: "North Cyprus vs Turkey — what's the difference?", a: "North Cyprus offers the same price advantage as Turkey, but with a smaller-scale, more personal clinic environment, no language barrier, EU-standard materials, and a more relaxed recovery setting. Kyrenia is also a beautiful Mediterranean destination in its own right." },
];

export default function HollywoodSmileLanding() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { lang } = useLanguage();

  const waMsg = "Hi! I'm interested in Hollywood Smile at Temelci Dental. Can you send me information and pricing?";

  return (
    <div className="landing-page">
      {/* HERO */}
      <section className="hero" id="top">
        <div className="badge-top fade-up">
          <span /><span>Hollywood Smile · Kyrenia, North Cyprus · Since 1990</span>
        </div>
        <h1 className="fade-up delay-1">
          Hollywood Smile in<br />
          <span style={{ color: "var(--teal)" }}>North Cyprus</span>
        </h1>
        <p className="fade-up delay-2" style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.75)", maxWidth: 540, marginBottom: 8, lineHeight: 1.65 }}>
          Premium porcelain veneers & zirconia crowns. Same quality as the UK — <strong style={{ color: "var(--gold2)" }}>60–70% lower cost</strong>.
          Completed in 5–7 days. In-house lab. Written guarantee.
        </p>
        <p className="fade-up delay-3" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>
          ✓ No obligation &nbsp;·&nbsp; ✓ Digital smile preview free &nbsp;·&nbsp; ✓ VIP transfer included
        </p>
        <div className="fade-up delay-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-cta" onClick={() => setQuoteOpen(true)}>
            ✦ Get My Free Quote
          </button>
          <a className="btn-cta" style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.25)", color: "#fff" }}
            href={waLink(waMsg)} target="_blank" rel="noopener noreferrer">
            💬 WhatsApp Us
          </a>
        </div>

        {/* Stats */}
        <div className="fade-up delay-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 48, width: "100%", maxWidth: 560 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "14px 8px", background: "rgba(255,255,255,0.05)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "clamp(14px,2vw,18px)", fontWeight: 800, color: "var(--teal)", lineHeight: 1.2 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VS TURKEY BANNER */}
      <section style={{ background: "var(--gold)", padding: "16px 24px", textAlign: "center" }}>
        <p style={{ color: "#1a1200", fontSize: 13, fontWeight: 700, margin: 0 }}>
          🌍 Searching for <em>Hollywood Smile Turkey</em>? &nbsp;North Cyprus is 40 min away — with quieter clinics, EU-grade materials, and the same savings.
          <a href={waLink("Hi, I was searching for Hollywood Smile Turkey and found Temelci Dental in North Cyprus. Can you tell me more?")}
            target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: 10, textDecoration: "underline", fontWeight: 800 }}>
            Ask us why →
          </a>
        </p>
      </section>

      {/* WHY TEMELCI */}
      <section className="section-white">
        <div className="section-inner">
          <h2 className="section-heading">Why patients choose Temelci Dental</h2>
          <div className="why-grid">
            {WHYS.map((w, i) => (
              <div key={i} className="why-card">
                <span style={{ fontSize: 28 }}>{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-dark">
        <div className="section-inner">
          <h2 className="section-heading" style={{ color: "#fff" }}>How your Hollywood Smile journey works</h2>
          <div className="steps-list">
            {STEPS.map((s, i) => (
              <div key={i} className="step-item">
                <div className="step-num">{s.n}</div>
                <div>
                  <h3 style={{ color: "#fff", marginBottom: 4 }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER CTA */}
      <section style={{ background: "var(--teal)", padding: "48px 24px", textAlign: "center" }}>
        <p style={{ color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8, marginBottom: 8 }}>Real patients · Real results</p>
        <h2 style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,4vw,32px)", marginBottom: 20, fontWeight: 700 }}>See before &amp; after transformations</h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-cta" style={{ background: "#fff", color: "var(--teal2)", fontWeight: 800 }} onClick={() => setQuoteOpen(true)}>
            Get My Free Preview
          </button>
          <a className="btn-cta" href={waLink("Hi! I'd like to see before/after photos for Hollywood Smile at Temelci Dental.")}
            target="_blank" rel="noopener noreferrer"
            style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.4)", color: "#fff" }}>
            📸 See Photos on WhatsApp
          </a>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section-white">
        <div className="section-inner">
          <h2 className="section-heading">What our patients say</h2>
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
      <section className="section-grey">
        <div className="section-inner" style={{ maxWidth: 700 }}>
          <h2 className="section-heading">Frequently asked questions</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <span className="faq-icon">{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hero" style={{ minHeight: "auto", padding: "64px 24px" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,4vw,36px)", color: "#fff", marginBottom: 12, fontWeight: 700 }}>
          Ready to see your new smile?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 28, maxWidth: 480, textAlign: "center" }}>
          Send your photos — we'll design your smile digitally and send you a personalised quote. Free, fast, no commitment.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-cta" onClick={() => setQuoteOpen(true)}>✦ Get Free Quote Now</button>
          <a className="btn-cta" href={waLink(waMsg)} target="_blank" rel="noopener noreferrer"
            style={{ background: "#25d366", border: "none" }}>💬 WhatsApp Direct</a>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 20 }}>
          Temelci Dental · Salih Miroğlu Cad. No:14, Kyrenia, North Cyprus · +90 533 822 9445
        </p>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
