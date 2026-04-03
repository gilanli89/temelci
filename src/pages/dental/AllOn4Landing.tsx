import { useState } from "react";
import "./LandingPage.css";

const WA = "https://wa.me/905391104212";
const WA_AO = `${WA}?text=Hi%2C%20I%27m%20interested%20in%20All-on-4%20%2F%20All-on-6%20implants%20at%20Temelci%20Dental.%20Can%20you%20send%20me%20information%20and%20pricing%3F`;

const reviews = [
  { name: "David H.", country: "🇬🇧 United Kingdom", stars: 5, text: "I had dentures for 6 years. After All-on-6 at Temelci I have permanent teeth again. I can eat, laugh, speak without a second thought. The team was exceptional throughout — before, during and after. Worth every penny and the saving vs the UK was enormous." },
  { name: "Klaus M.", country: "🇩🇪 Germany", stars: 5, text: "All-on-4 in 2 Besuchen — und das zum Bruchteil des deutschen Preises. Dr. Ali Temelci hat alles perfekt geplant. Ich bin überglücklich mit meinem neuen Lächeln und würde es jederzeit wieder tun." },
  { name: "Olga S.", country: "🇷🇺 Russia", stars: 5, text: "Сделала All-on-6 в клинике Temелджи. Два визита, три месяца — и у меня постоянные зубы. Команда сопроводила меня на каждом шагу. Огромное спасибо, результат превзошёл все ожидания." },
  { name: "Mehmet A.", country: "🇦🇪 UAE", stars: 5, text: "I came for immediate loading All-on-4 — same-day teeth. The precision of planning was remarkable. Dr. Temelci used 3D imaging to place 4 implants perfectly. I flew home with fixed teeth after just one visit." },
];

const faqs = [
  { q: "What is the difference between All-on-4 and All-on-6?", a: "Both replace a full arch of teeth on implants — but All-on-4 uses 4 implants to support a full fixed bridge, while All-on-6 uses 6. All-on-6 generally provides greater stability and load distribution, making it preferable for patients with lower bone density or who plan a full upper and lower restoration. Dr. Ali Temelci will assess your bone structure and recommend the right option for you." },
  { q: "What is Immediate Loading?", a: "Immediate loading (also called 'teeth in a day' or 'same-day implants') means that a temporary fixed prosthesis is attached to your implants on the same day they are placed. You leave the clinic with functional, aesthetically pleasing teeth — no waiting, no dentures in between. Final permanent prostheses are fitted during a second visit 3–4 months later once the implants have fully integrated." },
  { q: "How many visits do I need?", a: "For standard All-on-4/All-on-6: 2 visits. Visit 1 (typically 5–7 days): full assessment, 3D CT scan, implant placement surgery and immediate temporaries. Visit 2 (2.5–3 months later, approximately 3–5 days): final prosthesis fitting, bite adjustment and handover. Our coordinator manages everything between visits." },
  { q: "How does the cost compare to the UK?", a: "Full-arch All-on-4 in the UK typically costs £15,000–£30,000+ per arch. Our prices in Cyprus are significantly lower — without any compromise in implant brand, materials or surgical expertise. We use premium implant systems (Nobel, Straumann or equivalent). Contact us for a personalised quote." },
  { q: "Is All-on-4 suitable for me?", a: "Most patients with significant tooth loss or failing teeth are candidates. Key factors are bone volume and density, which we assess with a 3D CT scan. Even patients who have been told they lack bone may be candidates for All-on-4, as the angled implant placement often bypasses areas of bone loss. We'll evaluate your case with imaging before any commitment." },
  { q: "What are the implants made from?", a: "We use premium titanium implants from leading brands (Nobel Biocare, Straumann or equivalent). The prosthetic bridge is typically zirconia — the strongest, most aesthetic material available for full-arch restorations. Everything is produced in our in-house lab with full quality control." },
  { q: "What happens if there's a problem after I fly home?", a: "Our 24/7 WhatsApp aftercare line means you're never alone. Any urgent issues in Cyprus can be handled at our clinic; any issues at home are assessed remotely. We also work with a network of trusted partner clinics internationally for emergency situations." },
];

export default function AllOn4Landing() {
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
        <a className="nav-cta" href={WA_AO} target="_blank" rel="noopener noreferrer">
          Free Consultation →
        </a>
      </nav>

      {/* URGENT BADGE */}
      <div style={{ background: "linear-gradient(90deg,#0d9488,#0f766e)", padding: "10px 24px", textAlign: "center", fontSize: "13px", fontWeight: 600, color: "white", letterSpacing: "0.02em" }}>
        🦷 Same-Day Teeth Available — Immediate Loading All-on-4 &amp; All-on-6 · Kyrenia, North Cyprus
      </div>

      {/* HERO */}
      <section className="hero" style={{ paddingBottom: "60px" }}>
        <div className="badge-top fade-up">
          <span>🔬</span> Dr. Ali Temelci · Oral &amp; Maxillofacial Surgeon · 3D-Guided Implants
        </div>

        <h1 className="fade-up delay-1" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
          Walk In With Dentures.
          <br />
          <em>Walk Out With Real Teeth.</em>
        </h1>

        <p className="hero-sub fade-up delay-2" style={{ maxWidth: "640px", margin: "0 auto 24px" }}>
          All-on-4 and All-on-6 full-arch implants in Cyprus — completed in just <strong>2 visits over 2.5–3 months</strong>. Immediate loading available: leave with fixed teeth the <strong>same day as surgery.</strong> Save 60–70% vs UK &amp; EU prices.
        </p>

        {/* Comparison pills */}
        <div className="fade-up delay-2" style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
          <div style={{ background: "rgba(255,80,80,0.12)", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "50px", padding: "10px 22px", fontSize: "14px", color: "#ff8080" }}>
            <s>UK: £15,000–£30,000+ per arch</s>
          </div>
          <div style={{ background: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.5)", borderRadius: "50px", padding: "10px 22px", fontSize: "14px", color: "#2dd4bf", fontWeight: 700 }}>
            ✓ Cyprus: Up to 70% Savings
          </div>
        </div>

        <div className="trust-bar fade-up delay-3">
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Same-day teeth option</span></div>
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>3D CT guided surgery</span></div>
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>Premium implant brands</span></div>
          <div className="trust-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>VIP transfer included</span></div>
        </div>

        <div className="fade-up delay-4" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "36px" }}>
          <a href={WA_AO} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", width: "auto", padding: "16px 36px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Get Free Quote — WhatsApp
          </a>
          <a href="#assessment" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            📋 Free Assessment Form
          </a>
        </div>
      </section>

      <div className="divider" />

      {/* STATS */}
      <div className="stats-band">
        <div className="stats-grid">
          <div><div className="stat-num">2</div><div className="stat-label">Visits to complete</div></div>
          <div><div className="stat-num">1 Day</div><div className="stat-label">Immediate loading option</div></div>
          <div><div className="stat-num">70%</div><div className="stat-label">Savings vs UK / EU</div></div>
          <div><div className="stat-num">3D</div><div className="stat-label">CT-guided surgery</div></div>
          <div><div className="stat-num">127+</div><div className="stat-label">Years combined team experience</div></div>
        </div>
      </div>

      {/* COMPARISON: All-on-4 vs All-on-6 vs Immediate */}
      <div style={{ padding: "80px 24px", background: "var(--black)" }}>
        <div className="section" style={{ padding: 0 }}>
          <div className="section-label">Choose Your Treatment</div>
          <h2 className="section-title">All-on-4, All-on-6<br />&amp; <em>Immediate Loading</em></h2>
          <p className="section-desc">Three powerful options for full-arch restoration. Dr. Ali Temelci will recommend the right approach after a 3D CT assessment.</p>

          <div className="treatments-grid" style={{ marginTop: "48px" }}>
            <div className="treat-card">
              <div className="treat-badge">POPULAR</div>
              <div className="treat-price">4 <span>implants</span></div>
              <div className="treat-name">All-on-4</div>
              <div className="treat-desc">
                A full arch of fixed teeth supported by just 4 strategically angled implants. Suitable for most patients — even those with some bone loss. 2 visits, 2.5–3 months.
              </div>
            </div>
            <div className="treat-card">
              <div className="treat-badge">STRONGER</div>
              <div className="treat-price">6 <span>implants</span></div>
              <div className="treat-name">All-on-6</div>
              <div className="treat-desc">
                6 implants for greater stability and load distribution. Ideal for patients who want maximum security, or for full upper &amp; lower restoration. Premium durability.
              </div>
            </div>
            <div className="treat-card" style={{ borderColor: "rgba(13,148,136,0.4)", background: "rgba(13,148,136,0.04)" }}>
              <div className="treat-badge" style={{ background: "#0d9488" }}>SAME DAY</div>
              <div className="treat-price" style={{ color: "#2dd4bf" }}>1 <span>visit</span></div>
              <div className="treat-name">Immediate Loading</div>
              <div className="treat-desc">
                Implants placed and temporary teeth loaded in a single session. You leave with fixed, functional teeth the same day as surgery — no gap, no dentures.
              </div>
            </div>
          </div>

          {/* Immediate loading detail */}
          <div style={{ background: "rgba(13,148,136,0.06)", border: "1px solid rgba(13,148,136,0.2)", borderRadius: "20px", padding: "40px", marginTop: "40px" }}>
            <h3 style={{ color: "#2dd4bf", marginBottom: "12px", fontSize: "20px" }}>⚡ How Immediate Loading Works</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginTop: "24px" }}>
              {[
                { step: "1", title: "Morning: 3D CT Scan & Planning", desc: "Digital implant positioning planned with full CT data. Surgical guide printed or prepared." },
                { step: "2", title: "Midday: Implant Surgery", desc: "Dr. Ali Temelci places 4–6 titanium implants under local anaesthesia. Procedure: 2–3 hours." },
                { step: "3", title: "Same Afternoon: Teeth Attached", desc: "A precision-fitted temporary fixed bridge is attached directly to the implants." },
                { step: "4", title: "You Leave with Fixed Teeth", desc: "Eat, speak, smile — all before you fly home. Final zirconia bridge fitted 3 months later." },
              ].map((s) => (
                <div key={s.step} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#0d9488", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", color: "white", flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: "white", fontSize: "14px", marginBottom: "4px" }}>{s.title}</div>
                    <div style={{ color: "#64748b", fontSize: "13px", lineHeight: "1.6" }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* PROCESS: 2 VISITS */}
      <div className="journey-wrap">
        <div className="section" style={{ padding: 0 }}>
          <div className="section-label">The Process</div>
          <h2 className="section-title">Complete in<br /><em>2 Visits.</em></h2>
          <div className="journey">
            <div className="journey-step">
              <div className="step-num">①</div>
              <div className="step-body">
                <div className="step-tag">VISIT 1 · 5–7 DAYS IN KYRENIA</div>
                <h4>Assessment, Surgery &amp; Temporaries</h4>
                <p>Day 1: Full clinical exam, 3D CT scan, blood tests, treatment planning with Dr. Ali Temelci. Days 2–3: Implant placement surgery under local anaesthesia + sedation if requested. Same day or next day: Temporary fixed teeth attached. Days 4–7: Healing check, bite adjustment, final pre-departure review.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">⟳</div>
              <div className="step-body">
                <div className="step-tag">2.5–3 MONTHS LATER</div>
                <h4>Osseointegration at Home</h4>
                <p>Your implants fuse to your jawbone over 10–12 weeks. You live normally with your temporary teeth. Our aftercare team checks in regularly via WhatsApp.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">②</div>
              <div className="step-body">
                <div className="step-tag">VISIT 2 · 3–5 DAYS IN KYRENIA</div>
                <h4>Final Zirconia Bridge &amp; Handover</h4>
                <p>Impressions or digital scan of integrated implants. Our lab crafts your permanent full-arch zirconia bridge. Final fitting, bite verification, aftercare kit, written guarantee — and you fly home with your permanent new teeth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* DOCTOR */}
      <div style={{ padding: "80px 24px", background: "var(--black)" }}>
        <div className="section" style={{ padding: 0, maxWidth: "800px" }}>
          <div className="section-label">Your Surgeon</div>
          <h2 className="section-title">Dr. Ali Temelci</h2>
          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#1e40af)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 700, color: "white", flexShrink: 0 }}>AT</div>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <p style={{ color: "#94a3b8", lineHeight: "1.8", marginBottom: "16px" }}>
                <strong style={{ color: "white" }}>Oral &amp; Maxillofacial Surgery Specialist, Near East University (2018).</strong> Dr. Ali Temelci has built comprehensive expertise in dental implantology, including All-on-4, All-on-6, immediate loading protocols, impacted wisdom tooth extractions and facial aesthetics.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: "1.8" }}>
                His approach is built on rigorous 3D pre-surgical planning: CT bone analysis, bone density assessment and patient-specific surgical guides. This precision underpins his consistently high implant success rates and minimises post-operative discomfort.
              </p>
              <div style={{ display: "flex", gap: "24px", marginTop: "24px", flexWrap: "wrap" }}>
                {[
                  { val: "3D", label: "CT-Guided Surgery" },
                  { val: "All-on-4/6", label: "Implant Specialist" },
                  { val: "1 Day", label: "Immediate Loading" },
                ].map((s) => (
                  <div key={s.val} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#60a5fa" }}>{s.val}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* INCLUSIONS */}
      <div style={{ padding: "80px 24px", background: "linear-gradient(180deg,#0a0a0f,#0d1826)" }}>
        <div className="section" style={{ padding: 0 }}>
          <div className="inclusions">
            <h3>Everything Included in Your Package</h3>
            <p className="sub">Your implant journey — fully coordinated, start to finish.</p>
            <div className="inc-grid">
              {[
                { title: "3D CT Scan & Analysis", desc: "Bone volume, density and implant positioning — fully planned before surgery." },
                { title: "Implant Surgery", desc: "All-on-4 or All-on-6 with premium titanium implants under local anaesthesia." },
                { title: "Immediate Temporaries", desc: "Fixed temporary teeth placed on the day of or day after surgery." },
                { title: "Final Zirconia Bridge", desc: "Permanent full-arch prosthesis made in our in-house lab. Written guarantee." },
                { title: "VIP Airport Transfer", desc: "Both arrivals and departures — private driver, no hassle." },
                { title: "24/7 Aftercare Support", desc: "WhatsApp access to our team throughout osseointegration and beyond." },
              ].map((item, i) => (
                <div key={i} className="inc-item">
                  <div className="inc-check">✓</div>
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* REVIEWS */}
      <div style={{ padding: "80px 24px", background: "var(--black)" }}>
        <div className="section" style={{ padding: 0 }}>
          <div className="section-label">Patient Stories</div>
          <h2 className="section-title">Real Patients.<br /><em>Permanent Results.</em></h2>
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
      <div style={{ padding: "80px 24px", background: "linear-gradient(180deg,#0a0a0f,#0d1826)" }}>
        <div className="section" style={{ padding: 0, maxWidth: "760px" }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Your Questions Answered</h2>
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
          <h3>Free All-on-4 / All-on-6 Consultation</h3>
          <p>Tell us about your case — we'll review it and send you treatment options, timeline and pricing within 24 hours. No obligation.</p>
          {formSubmitted ? (
            <div style={{ background: "rgba(13,148,136,0.15)", border: "1px solid #0d9488", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>✓</div>
              <h4 style={{ color: "#2dd4bf", marginBottom: "8px" }}>Request received!</h4>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>Our team will be in touch within 24 hours with your personalised plan. For an instant response:</p>
              <a href={WA_AO} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", marginTop: "16px", width: "auto", padding: "14px 28px" }}>
                WhatsApp Us Now
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
                  <option>Norway / Sweden</option>
                  <option>Netherlands</option>
                  <option>UAE / Saudi Arabia</option>
                  <option>Israel</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-row full" style={{ marginBottom: "12px" }}>
                <select className="inp" required defaultValue="">
                  <option value="" disabled>Treatment I'm considering</option>
                  <option>All-on-4 (upper jaw)</option>
                  <option>All-on-4 (lower jaw)</option>
                  <option>All-on-4 (upper + lower)</option>
                  <option>All-on-6 (upper jaw)</option>
                  <option>All-on-6 (lower jaw)</option>
                  <option>All-on-6 (upper + lower)</option>
                  <option>Immediate loading (same-day teeth)</option>
                  <option>Not sure — need expert advice</option>
                </select>
              </div>
              <div className="form-row full" style={{ marginBottom: "12px" }}>
                <select className="inp" defaultValue="">
                  <option value="" disabled>Current situation (optional)</option>
                  <option>Most / all teeth missing</option>
                  <option>Failing teeth that need extraction</option>
                  <option>Wearing full dentures</option>
                  <option>Wearing partial dentures</option>
                  <option>Had implants before that failed</option>
                  <option>Other / not sure</option>
                </select>
              </div>
              <button type="submit" className="btn-cta">
                Send Request — Get My Free Plan →
              </button>
              <p className="form-note">🔒 100% private. We never share your information.</p>
            </form>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta">
        <h2>Permanent teeth.<br /><em>2 visits. Life-changing.</em></h2>
        <p>All-on-4 &amp; All-on-6 in Cyprus — same-day option available. Premium implants, zirconia bridge, full package. 60–70% less than UK prices.<br />Message us now — we respond fast.</p>
        <div className="cta-buttons">
          <a href={WA_AO} className="btn-primary" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Get Free Quote — WhatsApp
          </a>
          <a href="#assessment" className="btn-secondary">📋 Free Consultation Form</a>
        </div>
      </section>

      {/* STICKY WA */}
      <a className="sticky-wa" href={WA_AO} target="_blank" rel="noopener noreferrer">
        <div className="wa-tooltip">All-on-4 / All-on-6 — Chat Now →</div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
