import { useState } from "react";
import "./LandingPage.css";

const WA = "https://wa.me/905391104212";
const WA_HS = `${WA}?text=Hi%2C%20I%27m%20interested%20in%20Hollywood%20Smile%20at%20Temelci%20Dental.%20Can%20you%20send%20me%20more%20information%3F`;

const reviews = [
  { name: "Sarah M.", country: "🇬🇧 United Kingdom", stars: 5, text: "I flew from London for my Hollywood Smile. Dt. Temelci and the team were incredible — 10 veneers in 6 days and I saved over £8,000 compared to quotes back home. Absolutely life-changing." },
  { name: "Anastasia K.", country: "🇩🇪 Germany", stars: 5, text: "Ich hatte Angst, aber das Team hat mich sofort beruhigt. Das Ergebnis ist perfekt — natürlich, strahlend weiß. Ich empfehle Temelci Dental jedem weiter." },
  { name: "Marina V.", country: "🇷🇺 Russia", stars: 5, text: "Прекрасный результат! Голливудская улыбка за 6 дней. Команда профессиональная и очень заботливая. Уже рекомендую всем своим друзьям." },
  { name: "Yiannis P.", country: "🇬🇷 Greece", stars: 5, text: "Πήγα για Hollywood Smile και επέστρεψα με νέα αυτοπεποίθηση. Εκπληκτική δουλειά, εξαιρετική τιμή. Η ομάδα ήταν καταπληκτική." },
];

const faqs = [
  { q: "How long does Hollywood Smile take?", a: "Most Hollywood Smile treatments are completed in 5–7 days. This includes your initial consultation, digital smile design, preparation and final fitting of your porcelain laminates or zirconia crowns — all at our clinic in Kyrenia." },
  { q: "How much does it cost compared to the UK?", a: "Typical Hollywood Smile prices in the UK range from £8,000 to £20,000+. Our prices in Cyprus are 60–70% lower, with no compromise on materials or expertise. We use premium European-grade porcelain." },
  { q: "Does it hurt? Will I need anaesthesia?", a: "Hollywood Smile (laminates/veneers) is a minimally invasive procedure. Most patients report little to no discomfort. Local anaesthesia is used for preparation, and our team is experienced at keeping you comfortable throughout." },
  { q: "How long do the results last?", a: "With proper care, porcelain laminates and zirconia crowns last 10–20 years. We provide a written guarantee on all lab work produced in our in-house laboratory, and give you a full aftercare guide." },
  { q: "Can I see results before I fly to Cyprus?", a: "Yes. Send us your photos and we'll create a digital smile simulation — you'll see your projected result before any treatment begins. This is completely free and has no obligation." },
  { q: "What's included in the package?", a: "Your treatment, VIP airport transfer, hotel assistance, your personal treatment coordinator, digital smile design, and 24/7 WhatsApp aftercare once you're back home." },
];

export default function HollywoodSmileLanding() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="landing-page">

      {/* NAV */}
      <nav className="landing-nav">
        <a className="nav-logo" href="/">Temelci<span>.</span>Dental</a>
        <a className="nav-cta" href={WA_HS} target="_blank" rel="noopener noreferrer">
          WhatsApp Us →
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" style={{ paddingBottom: "60px" }}>
        <div className="badge-top fade-up">
          <span>⭐</span> 36 Years of Smile Design · North Cyprus Since 1990
        </div>

        <h1 className="fade-up delay-1" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
          Hollywood Smile in Cyprus —
          <br />
          <em>Ready in 5–7 Days.</em>
        </h1>

        <p className="hero-sub fade-up delay-2" style={{ maxWidth: "620px", margin: "0 auto 24px" }}>
          Premium porcelain laminates & zirconia crowns crafted in our in-house lab by Dt. Nural Temelci — 36 years of smile design experience.
          Save <strong>60–70% vs UK & European prices.</strong>
        </p>

        {/* Price pill */}
        <div className="fade-up delay-2" style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
          <div style={{ background: "rgba(255,80,80,0.12)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "50px", padding: "10px 22px", fontSize: "14px", color: "#ff8080" }}>
            <s>UK Price: £8,000–£20,000+</s>
          </div>
          <div style={{ background: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.5)", borderRadius: "50px", padding: "10px 22px", fontSize: "14px", color: "#2dd4bf", fontWeight: 700 }}>
            ✓ Cyprus: Save Up to 70%
          </div>
        </div>

        <div className="trust-bar fade-up delay-3">
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>5–7 day turnaround</span></div>
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>In-house digital lab</span></div>
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>VIP airport transfer</span></div>
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Free digital preview</span></div>
        </div>

        <div className="fade-up delay-4" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "36px" }}>
          <a href={WA_HS} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", width: "auto", padding: "16px 36px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Get Free Quote on WhatsApp
          </a>
          <a href="#assessment" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            📋 Send Photos for Free Assessment
          </a>
        </div>
      </section>

      <div className="divider" />

      {/* STATS */}
      <div className="stats-band">
        <div className="stats-grid">
          <div><div className="stat-num">36+</div><div className="stat-label">Years smile design experience</div></div>
          <div><div className="stat-num">5–7</div><div className="stat-label">Days to complete</div></div>
          <div><div className="stat-num">70%</div><div className="stat-label">Savings vs UK / Europe</div></div>
          <div><div className="stat-num">100%</div><div className="stat-label">In-house lab production</div></div>
          <div><div className="stat-num">10K+</div><div className="stat-label">Happy patients</div></div>
        </div>
      </div>

      {/* WHAT IS HOLLYWOOD SMILE */}
      <div style={{ padding: "80px 24px", background: "var(--black)" }}>
        <div className="section" style={{ padding: 0 }}>
          <div className="section-label">The Treatment</div>
          <h2 className="section-title">What Is a Hollywood Smile?</h2>
          <p className="section-desc" style={{ maxWidth: "700px" }}>
            A Hollywood Smile is a full smile transformation using ultra-thin porcelain laminates or zirconia crowns — custom-crafted for your face, colour-matched to your skin tone, and designed to look completely natural. The result? The smile you've always wanted, ready in less than a week.
          </p>

          <div className="features" style={{ marginTop: "48px" }}>
            <div className="feat">
              <div className="feat-icon">💻</div>
              <h4>Digital Smile Design First</h4>
              <p>We design your new smile digitally before anything begins. You approve the look — then we build it. No surprises.</p>
            </div>
            <div className="feat">
              <div className="feat-icon">🏭</div>
              <h4>Made in Our Lab — in 48h</h4>
              <p>Our in-house laboratory produces your veneers or crowns on-site, eliminating delays and ensuring tight quality control.</p>
            </div>
            <div className="feat">
              <div className="feat-icon">🌿</div>
              <h4>Minimally Invasive</h4>
              <p>Dt. Temelci's signature approach: maximum aesthetics with minimum tooth reduction. Your natural structure is preserved wherever possible.</p>
            </div>
            <div className="feat">
              <div className="feat-icon">🇪🇺</div>
              <h4>Premium European Materials</h4>
              <p>We use top-grade Ivoclar and VITA porcelain — the same materials as leading UK and German clinics, at a fraction of the cost.</p>
            </div>
            <div className="feat">
              <div className="feat-icon">✈️</div>
              <h4>VIP Travel Package</h4>
              <p>Airport pickup, hotel assistance, personal coordinator — your entire trip is taken care of from arrival to departure.</p>
            </div>
            <div className="feat">
              <div className="feat-icon">📞</div>
              <h4>Lifetime Aftercare Support</h4>
              <p>Questions once you're home? WhatsApp us anytime. Our aftercare team is available 24/7, long after your treatment ends.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* PROCESS */}
      <div className="journey-wrap">
        <div className="section" style={{ padding: 0 }}>
          <div className="section-label">Your Journey</div>
          <h2 className="section-title">From Photo to<br /><em>Perfect Smile</em> in 5–7 Days</h2>
          <div className="journey">
            <div className="journey-step">
              <div className="step-num">1</div>
              <div className="step-body">
                <div className="step-tag">TODAY · FREE</div>
                <h4>Send Your Photos</h4>
                <p>A clear photo of your smile + any X-rays. We evaluate your case and send a personalised plan with pricing within 24 hours.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">2</div>
              <div className="step-body">
                <div className="step-tag">DAY 1 — MORNING</div>
                <h4>Digital Smile Design & Consultation</h4>
                <p>Full clinical examination, digital photos, 3D imaging. We simulate your new smile and you approve the final design.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">3</div>
              <div className="step-body">
                <div className="step-tag">DAY 1–2</div>
                <h4>Tooth Preparation + Temporaries</h4>
                <p>Minimal preparation under local anaesthesia. Beautiful temporary restorations fitted so you look great while your finals are made.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">4</div>
              <div className="step-body">
                <div className="step-tag">DAY 2–3 · IN OUR LAB</div>
                <h4>Your Restorations Are Crafted</h4>
                <p>Master technicians in our on-site lab hand-craft your final porcelain laminates or zirconia crowns to the approved design.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">5</div>
              <div className="step-body">
                <div className="step-tag">DAY 5–7</div>
                <h4>Bonding + Final Polish</h4>
                <p>Your Hollywood Smile is permanently bonded. Final adjustments, bite check, aftercare kit — and you fly home transformed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* DOCTOR */}
      <div style={{ padding: "80px 24px", background: "var(--black)" }}>
        <div className="section" style={{ padding: 0, maxWidth: "800px" }}>
          <div className="section-label">Your Specialist</div>
          <h2 className="section-title">Dt. Nural Temelci</h2>
          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg,#0d9488,#0f766e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 700, color: "white", flexShrink: 0 }}>NT</div>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <p style={{ color: "#94a3b8", lineHeight: "1.8", marginBottom: "16px" }}>
                <strong style={{ color: "white" }}>Founder of Temelci Dental, Istanbul University graduate (1990).</strong> With over 36 years dedicated to aesthetic smile design and implantology, Dt. Temelci is one of the most established figures in cosmetic dentistry in Northern Cyprus.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: "1.8" }}>
                Her minimally invasive philosophy preserves as much natural tooth structure as possible while delivering results that are indistinguishable from nature. Every smile is designed around your individual facial anatomy — never generic, always personal.
              </p>
              <div style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#2dd4bf" }}>36+</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Years Experience</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#2dd4bf" }}>1990</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Istanbul University</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: "#2dd4bf" }}>10K+</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Smiles Transformed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* REVIEWS */}
      <div style={{ padding: "80px 24px", background: "linear-gradient(180deg,#0a0a0f,#0d1826)" }}>
        <div className="section" style={{ padding: 0 }}>
          <div className="section-label">Patient Reviews</div>
          <h2 className="section-title">Real Smiles.<br /><em>Real People.</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "40px" }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ color: "#fbbf24", fontSize: "16px", marginBottom: "12px" }}>{"★".repeat(r.stars)}</div>
                <p style={{ color: "#cbd5e1", lineHeight: "1.7", marginBottom: "16px", fontSize: "14px" }}>"{r.text}"</p>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>{r.name}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>{r.country}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* FAQ */}
      <div style={{ padding: "80px 24px", background: "var(--black)" }}>
        <div className="section" style={{ padding: 0, maxWidth: "760px" }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Common Questions</h2>
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((f, i) => (
              <details key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px 24px" }}>
                <summary style={{ fontWeight: 600, color: "white", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {f.q}
                  <span style={{ color: "#2dd4bf", fontSize: "20px", flexShrink: 0, marginLeft: "16px" }}>+</span>
                </summary>
                <p style={{ color: "#94a3b8", marginTop: "12px", lineHeight: "1.7", fontSize: "14px" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ASSESSMENT FORM */}
      <section className="hero" id="assessment" style={{ paddingTop: "80px" }}>
        <div className="hero-card fade-up" style={{ maxWidth: "580px" }}>
          <h3>Get Your Free Hollywood Smile Assessment</h3>
          <p>Send your photo — receive a personalised treatment plan & quote within 24 hours. No obligation.</p>
          {formSubmitted ? (
            <div style={{ background: "rgba(13,148,136,0.15)", border: "1px solid #0d9488", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>✓</div>
              <h4 style={{ color: "#2dd4bf", marginBottom: "8px" }}>We've received your request!</h4>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>Our team will send your personalised plan within 24 hours. For faster response, message us directly:</p>
              <a href={WA_HS} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginTop: "16px", width: "auto", padding: "14px 28px" }}>
                Chat on WhatsApp Now
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input className="inp" type="text" placeholder="First name" required />
                <input className="inp" type="text" placeholder="Last name" required />
              </div>
              <div className="form-row">
                <input className="inp" type="email" placeholder="Email address" required />
                <input className="inp" type="tel" placeholder="WhatsApp / Phone" required />
              </div>
              <div className="form-row full" style={{ marginBottom: "12px" }}>
                <select className="inp" required defaultValue="">
                  <option value="" disabled>Country of residence</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>Greece</option>
                  <option>Russia</option>
                  <option>Norway</option>
                  <option>Sweden</option>
                  <option>Netherlands</option>
                  <option>Israel</option>
                  <option>UAE / Saudi Arabia</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-row full" style={{ marginBottom: "12px" }}>
                <select className="inp" required defaultValue="">
                  <option value="" disabled>Number of teeth / veneers</option>
                  <option>4–6 front teeth</option>
                  <option>8 teeth (upper arch)</option>
                  <option>10 teeth (upper arch)</option>
                  <option>Full upper + lower (16–20)</option>
                  <option>Not sure — need advice</option>
                </select>
              </div>
              <button type="submit" className="btn-cta">
                Send Request — Get My Free Quote →
              </button>
              <p className="form-note">🔒 100% private. We never share your information.</p>
            </form>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta">
        <h2>Your Hollywood Smile is<br /><em>closer than you think.</em></h2>
        <p>5–7 days. 60–70% less than UK prices. Premium materials. 36 years of expertise.<br />WhatsApp us now — zero obligation, instant response.</p>
        <div className="cta-buttons">
          <a href={WA_HS} className="btn-primary" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp Us Now
          </a>
          <a href="#assessment" className="btn-secondary">📋 Free Assessment Form</a>
        </div>
      </section>

      {/* STICKY WA */}
      <a className="sticky-wa" href={WA_HS} target="_blank" rel="noopener noreferrer">
        <div className="wa-tooltip">Hollywood Smile — Chat Now →</div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
