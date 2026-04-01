import { useState } from "react";
import "./LandingPage.css";

export default function LandingPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files) {
      setUploadedFiles(Array.from(files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "var(--teal)";
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.currentTarget.style.borderColor = "rgba(26,184,168,0.35)";
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "rgba(26,184,168,0.35)";
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // In production, send form data + files to backend
    setTimeout(() => {
      alert("✓ Sent! We'll be in touch within 24 hours.");
    }, 500);
  };

  return (
    <div className="landing-page">
      {/* NAV */}
      <nav className="landing-nav">
        <a className="nav-logo" href="/">
          Temelci<span>.</span>Dental
        </a>
        <a className="nav-cta" href="#assessment">
          Free Assessment →
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="badge-top fade-up">
          <span></span>
          North Cyprus · Since 1990 · 127+ Years Combined Experience
        </div>
        <h1 className="fade-up delay-1">
          Your Dream Smile
          <br />
          Starts with a <em>Free</em> Assessment
        </h1>
        <p className="hero-sub fade-up delay-2">
          Send us your smile photo & X-ray. Our specialist team will evaluate
          your case and send you a personalised treatment plan — completely
          free, within 24 hours.
        </p>

        <div className="trust-bar fade-up delay-3">
          <div className="trust-item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              <strong>Free</strong> case evaluation
            </span>
          </div>
          <div className="trust-item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              Reply within <strong>24 hours</strong>
            </span>
          </div>
          <div className="trust-item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              <strong>VIP transfer</strong> + hotel included
            </span>
          </div>
          <div className="trust-item">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>
              <strong>24/7</strong> aftercare support
            </span>
          </div>
        </div>

        {/* FORM */}
        <div className="hero-card fade-up delay-4" id="assessment">
          <h3>Get Your Free Smile Assessment</h3>
          <p>No commitment. No waiting room. Just answers.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                className="inp"
                type="text"
                placeholder="First name"
                required
              />
              <input
                className="inp"
                type="text"
                placeholder="Last name"
                required
              />
            </div>
            <div className="form-row">
              <input
                className="inp"
                type="email"
                placeholder="Email address"
                required
              />
              <input
                className="inp"
                type="tel"
                placeholder="WhatsApp / Phone"
                required
              />
            </div>
            <div className="form-row full" style={{ marginBottom: "12px" }}>
              <select className="inp" required>
                <option value="" disabled selected>
                  Country of residence
                </option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>Norway</option>
                <option>Sweden</option>
                <option>Netherlands</option>
                <option>Australia</option>
                <option>United States</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-row full" style={{ marginBottom: "12px" }}>
              <select className="inp" required>
                <option value="" disabled selected>
                  Treatment I'm interested in
                </option>
                <option>Hollywood Smile / Smile Design</option>
                <option>Dental Implants</option>
                <option>Zirconia Crowns</option>
                <option>All-on-4 / All-on-6</option>
                <option>Immediate Loading</option>
                <option>Veneers / Laminates</option>
                <option>Root Canal Treatment</option>
                <option>Not sure — need advice</option>
              </select>
            </div>

            <label
              className="upload-zone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                style={{ display: "none" }}
              />
              <div className="upload-icon">📷</div>
              <p>
                <strong>Upload your smile photo & X-ray</strong>
                <br />
                Drag & drop or click to browse
                <br />
                <span style={{ fontSize: "11px", opacity: 0.6 }}>
                  JPG, PNG, PDF · Max 10MB each
                </span>
              </p>
              {uploadedFiles.length > 0 && (
                <div className="upload-status">
                  ✓ {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} selected:{" "}
                  {uploadedFiles.map((f) => f.name).join(", ")}
                </div>
              )}
            </label>

            <button
              type="submit"
              className="btn-cta"
              disabled={formSubmitted}
              style={
                formSubmitted
                  ? {
                      background:
                        "linear-gradient(135deg,#1a9b6b,#157a56)",
                      cursor: "not-allowed",
                    }
                  : {}
              }
            >
              {formSubmitted
                ? "✓ Sent! We'll be in touch within 24 hours."
                : "Send My Smile — Get Free Plan →"}
            </button>
            <p className="form-note">
              🔒 Your information is 100% private and secure.
              <br />
              We'll never share your data.{" "}
              <a href="/privacy">Privacy Policy</a>
            </p>
          </form>
        </div>
      </section>

      <div className="divider"></div>

      {/* STATS */}
      <div className="stats-band">
        <div className="stats-grid">
          <div>
            <div className="stat-num">1990</div>
            <div className="stat-label">Established in Kyrenia</div>
          </div>
          <div>
            <div className="stat-num">127+</div>
            <div className="stat-label">Years combined expertise</div>
          </div>
          <div>
            <div className="stat-num">6</div>
            <div className="stat-label">Specialist dentists</div>
          </div>
          <div>
            <div className="stat-num">5–7</div>
            <div className="stat-label">Days for smile design</div>
          </div>
          <div>
            <div className="stat-num">24/7</div>
            <div className="stat-label">Aftercare support</div>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div style={{ padding: "80px 24px", background: "var(--black)" }}>
        <div className="section" style={{ padding: "0" }}>
          <div className="section-label">Why Temelci Dental</div>
          <h2 className="section-title">
            Not just a clinic.
            <br />
            An <em>integrated</em> dental solution.
          </h2>
          <p className="section-desc">
            We design, produce and deliver your treatment in-house — faster,
            with full quality control, and at a standard very few clinics in
            the world can match.
          </p>

          <div className="features">
            <div className="feat">
              <div className="feat-icon">🔬</div>
              <h4>In-House Digital Laboratory</h4>
              <p>
                We produce your crowns, veneers and prosthetics in our own lab
                — no outsourcing, no delays, no quality compromise.
              </p>
            </div>
            <div className="feat">
              <div className="feat-icon">🦷</div>
              <h4>6 Specialist Dentists</h4>
              <p>
                From oral surgeons to prosthodontists and endodontists — every
                specialist under one roof, collaborating on your case.
              </p>
            </div>
            <div className="feat">
              <div className="feat-icon">💻</div>
              <h4>Advanced Digital Planning</h4>
              <p>
                3D imaging, digital smile simulation and precision diagnostics
                ensure your result is planned before a single tool is used.
              </p>
            </div>
            <div className="feat">
              <div className="feat-icon">🌿</div>
              <h4>Minimally Invasive First</h4>
              <p>
                We preserve your natural teeth wherever possible — delivering
                maximum aesthetics with minimum intervention.
              </p>
            </div>
            <div className="feat">
              <div className="feat-icon">✈️</div>
              <h4>VIP Travel Package</h4>
              <p>
                Airport pickup, hotel recommendations and full itinerary
                coordination — your trip is seamless from takeoff to final
                check-up.
              </p>
            </div>
            <div className="feat">
              <div className="feat-icon">📞</div>
              <h4>24/7 Aftercare Support</h4>
              <p>
                Questions after you fly home? Our team is always available —
                WhatsApp, call or email. You are never alone in your recovery.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* TREATMENTS */}
      <div
        style={{
          padding: "80px 24px",
          background:
            "linear-gradient(180deg,#0a0a0f,#0d1826)",
        }}
      >
        <div className="section" style={{ padding: "0" }}>
          <div className="section-label">Treatments</div>
          <h2 className="section-title">
            Everything you need.
            <br />
            <em>One</em> destination.
          </h2>
          <p className="section-desc">
            From Hollywood Smiles to full-arch implants — all available in North
            Cyprus, at world-class quality.
          </p>

          <div className="treatments-grid">
            <div className="treat-card">
              <div className="treat-badge">POPULAR</div>
              <div className="treat-price">
                5–7 <span>days</span>
              </div>
              <div className="treat-name">Hollywood Smile</div>
              <div className="treat-desc">
                Full smile transformation with premium porcelain laminates or
                zirconia crowns. Digitally designed for your face.
              </div>
            </div>
            <div className="treat-card">
              <div className="treat-badge">DURABLE</div>
              <div className="treat-price">
                3–5 <span>days</span>
              </div>
              <div className="treat-name">Zirconia Crowns</div>
              <div className="treat-desc">
                Metal-free, lifelike crowns crafted in our in-house lab.
                Colour-matched, precision-fitted, built to last decades.
              </div>
            </div>
            <div className="treat-card">
              <div className="treat-badge">LIFE CHANGING</div>
              <div className="treat-price">
                2 <span>visits</span>
              </div>
              <div className="treat-name">All-on-4 / All-on-6</div>
              <div className="treat-desc">
                Full arch restoration on just 4 or 6 implants. Fixed, permanent
                teeth. No more dentures — ever.
              </div>
            </div>
            <div className="treat-card">
              <div className="treat-badge">FAST</div>
              <div className="treat-price">
                1 <span>day</span>
              </div>
              <div className="treat-name">Immediate Loading</div>
              <div className="treat-desc">
                Implants placed and teeth loaded in a single session. Walk in,
                walk out with your new smile the same day.
              </div>
            </div>
            <div className="treat-card">
              <div className="treat-price">
                1–2 <span>sessions</span>
              </div>
              <div className="treat-name">Porcelain Laminates</div>
              <div className="treat-desc">
                Ultra-thin veneers for minimal-prep smile transformations.
                Maximum aesthetics, minimum tooth reduction.
              </div>
            </div>
            <div className="treat-card">
              <div className="treat-price">
                1–2 <span>sessions</span>
              </div>
              <div className="treat-name">Root Canal + Restore</div>
              <div className="treat-desc">
                Save your natural tooth. Expert endodontic treatment followed by
                a permanent, aesthetic restoration.
              </div>
            </div>
          </div>

          {/* INCLUSIONS */}
          <div className="inclusions">
            <h3>Everything Is Included</h3>
            <p className="sub">
              Your treatment package — not just the dental work.
            </p>
            <div className="inc-grid">
              <div className="inc-item">
                <div className="inc-check">✓</div>
                <div>
                  <h5>VIP Airport Transfer</h5>
                  <p>Private pickup & drop-off, both ways.</p>
                </div>
              </div>
              <div className="inc-item">
                <div className="inc-check">✓</div>
                <div>
                  <h5>Hotel Assistance</h5>
                  <p>Partner hotels near the clinic. We handle the booking.</p>
                </div>
              </div>
              <div className="inc-item">
                <div className="inc-check">✓</div>
                <div>
                  <h5>Free Initial Consultation</h5>
                  <p>Full assessment before any commitment.</p>
                </div>
              </div>
              <div className="inc-item">
                <div className="inc-check">✓</div>
                <div>
                  <h5>Treatment Coordinator</h5>
                  <p>Your personal guide from first contact to final result.</p>
                </div>
              </div>
              <div className="inc-item">
                <div className="inc-check">✓</div>
                <div>
                  <h5>24/7 Aftercare</h5>
                  <p>
                    WhatsApp, phone or email — always available post-treatment.
                  </p>
                </div>
              </div>
              <div className="inc-item">
                <div className="inc-check">✓</div>
                <div>
                  <h5>Written Guarantee</h5>
                  <p>On all lab work produced in our in-house laboratory.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* JOURNEY */}
      <div className="journey-wrap">
        <div className="section" style={{ padding: "0" }}>
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            Your journey
            <br />
            from <em>photo to smile.</em>
          </h2>

          <div className="journey">
            <div className="journey-step">
              <div className="step-num">1</div>
              <div className="step-body">
                <div className="step-tag">TODAY · FREE</div>
                <h4>Send Your Smile & X-ray</h4>
                <p>
                  Upload a clear photo of your smile and your most recent X-ray.
                  Takes 60 seconds. No payment, no obligation.
                </p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">2</div>
              <div className="step-body">
                <div className="step-tag">WITHIN 24 HOURS</div>
                <h4>Receive Your Personal Treatment Plan</h4>
                <p>
                  Our specialists review your case and send a detailed written
                  plan including recommended treatments, timeline and pricing.
                </p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">3</div>
              <div className="step-body">
                <div className="step-tag">YOUR SCHEDULE</div>
                <h4>Book Your Dates</h4>
                <p>
                  Choose your travel dates. We coordinate your VIP transfer,
                  hotel and all clinic appointments around your schedule.
                </p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">4</div>
              <div className="step-body">
                <div className="step-tag">IN KYRENIA</div>
                <h4>Arrive & Transform</h4>
                <p>
                  Your driver meets you at the airport. Your treatment begins.
                  Hollywood Smile in 5–7 days. Full-arch implants in 2 visits.
                </p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-num">5</div>
              <div className="step-body">
                <div className="step-tag">FOREVER</div>
                <h4>Fly Home with 24/7 Support</h4>
                <p>
                  Your aftercare team stays with you. Questions, concerns,
                  follow-up — we're always one message away. Long after you
                  land.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* BOTTOM CTA */}
      <section className="bottom-cta">
        <h2>
          Your new smile is
          <br />
          <em>one message away.</em>
        </h2>
        <p>
          Send your photo and X-ray now. Free assessment. Personalised plan. No
          waiting rooms, no pressure — just clarity.
        </p>
        <div className="cta-buttons">
          <a href="#assessment" className="btn-primary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M23 7l-7 5 7 5V7z" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            Send My Smile — Free
          </a>
          <a
            href="https://wa.me/905391234567"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* STICKY WA */}
      <a
        className="sticky-wa"
        href="https://wa.me/905391234567"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="wa-tooltip">Chat with us now →</div>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
