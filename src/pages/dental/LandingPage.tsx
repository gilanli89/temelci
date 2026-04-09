import { useState, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import "./LandingPage.css";

const WHATSAPP_NUMBER = "905338229445";

const TREATMENTS = [
  { id: "hollywood", emoji: "✨", en: "Hollywood Smile", tr: "Hollywood Smile", desc_en: "Complete smile makeover with porcelain veneers", desc_tr: "Porselen veneerlerle tam gülüş dönüşümü", days_en: "5–7 days", days_tr: "5–7 gün", save: "60–70%" },
  { id: "implants", emoji: "🦷", en: "Dental Implants", tr: "Diş İmplantı", desc_en: "Permanent tooth replacement with Straumann", desc_tr: "Straumann ile kalıcı diş çözümü", days_en: "2 visits", days_tr: "2 ziyaret", save: "50–65%" },
  { id: "veneers", emoji: "💎", en: "Veneers", tr: "Veneer", desc_en: "Ultra-thin porcelain shells for a perfect smile", desc_tr: "Mükemmel gülüş için ultra ince porselen", days_en: "5–7 days", days_tr: "5–7 gün", save: "60%" },
  { id: "crowns", emoji: "👑", en: "Zirconia Crowns", tr: "Zirkonyum Kron", desc_en: "Metal-free, strongest crown material available", desc_tr: "Metal içermeyen en güçlü kron malzemesi", days_en: "5–7 days", days_tr: "5–7 gün", save: "55–65%" },
  { id: "allon4", emoji: "🏆", en: "All-on-4 / All-on-6", tr: "All-on-4 / All-on-6", desc_en: "Full arch restoration on just 4 or 6 implants", desc_tr: "4 veya 6 implanta tam kemer restorasyonu", days_en: "7–10 days", days_tr: "7–10 gün", save: "65–70%" },
  { id: "whitening", emoji: "⚡", en: "Teeth Whitening", tr: "Diş Beyazlatma", desc_en: "Up to 8 shades brighter in one session", desc_tr: "Tek seansta 8 tona kadar beyazlama", days_en: "1 day", days_tr: "1 gün", save: "70%" },
  { id: "makeover", emoji: "🌟", en: "Smile Makeover", tr: "Gülüş Tasarımı", desc_en: "Combined treatments, one cohesive plan", desc_tr: "Kombine tedaviler, tek uyumlu plan", days_en: "7–10 days", days_tr: "7–10 gün", save: "55–70%" },
  { id: "notsure", emoji: "🔍", en: "Not sure yet", tr: "Henüz bilmiyorum", desc_en: "Send photos — we'll recommend the best option", desc_tr: "Fotoğraf gönderin, en iyisini önereceğiz", days_en: "Free advice", days_tr: "Ücretsiz tavsiye", save: "" },
];

const COUNTRIES = [
  "United Kingdom", "Germany", "Norway", "Sweden", "Netherlands",
  "Switzerland", "Austria", "Australia", "United States", "Canada",
  "France", "Ireland", "Denmark", "Belgium", "Other"
];

const copy = {
  en: {
    step1Title: "What treatment are you interested in?",
    step1Sub: "Select all that apply — we'll create a personalised plan",
    step2Title: "Tell us about yourself",
    step2Sub: "So we can prepare your personalised treatment plan",
    step3Title: "Upload your smile photos",
    step3Sub: "Our specialist will review and prepare your quote within 24 hours",
    step4Title: "Your treatment plan is ready",
    step4Sub: "Send it to us on WhatsApp — we'll confirm everything within 2 hours",
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    phone: "WhatsApp / Phone",
    country: "Country of residence",
    selectCountry: "Select your country",
    travelDate: "Approximate travel date",
    travelDatePlaceholder: "e.g. July 2026 or flexible",
    budget: "Budget range (optional)",
    budgetPlaceholder: "e.g. £3,000–£5,000",
    message: "Any specific concerns or questions?",
    messagePlaceholder: "e.g. I have a bridge on my front teeth, I grind my teeth at night...",
    uploadTitle: "Upload your smile photo",
    uploadSub: "Clear photo in good light — front facing",
    uploadXray: "Upload X-ray (optional but speeds up your quote)",
    uploadDrag: "Drag & drop or tap to browse",
    uploadFormats: "JPG, PNG, PDF · Max 10MB each",
    filesSelected: "files selected",
    next: "Next →",
    back: "← Back",
    getMyPlan: "Get My Treatment Plan on WhatsApp →",
    planSummary: "Your plan summary",
    treatments: "Treatments selected",
    name: "Name",
    contactDetails: "Contact",
    travelWindow: "Travel window",
    trustBadge1: "No obligation",
    trustBadge2: "Free assessment",
    trustBadge3: "Reply within 24h",
    trustBadge4: "1990 — 35 years of excellence",
    stepOf: "Step",
    of: "of",
    statsYears: "35+ Years",
    statsYearsLabel: "Serving Kyrenia",
    statsPatients: "10,000+",
    statsPatientsLabel: "Happy patients",
    statsSave: "Save 60–70%",
    statsSaveLabel: "vs UK prices",
    statsSpec: "6 Specialists",
    statsSpecLabel: "Under one roof",
    required: "Please fill in all required fields",
    selectTreatment: "Please select at least one treatment",
  },
  tr: {
    step1Title: "Hangi tedaviyle ilgileniyorsunuz?",
    step1Sub: "Birden fazla seçebilirsiniz — kişisel planınızı oluşturalım",
    step2Title: "Sizi tanıyalım",
    step2Sub: "Kişiselleştirilmiş tedavi planınızı hazırlayabilmek için",
    step3Title: "Gülüş fotoğraflarınızı yükleyin",
    step3Sub: "Uzmanımız 24 saat içinde inceleyip teklifinizi hazırlayacak",
    step4Title: "Tedavi planınız hazır",
    step4Sub: "WhatsApp'ta gönderin — 2 saat içinde her şeyi onaylıyoruz",
    firstName: "Ad",
    lastName: "Soyad",
    email: "E-posta",
    phone: "WhatsApp / Telefon",
    country: "Yaşadığınız ülke",
    selectCountry: "Ülkenizi seçin",
    travelDate: "Tahmini seyahat tarihi",
    travelDatePlaceholder: "örn. Temmuz 2026 veya esnek",
    budget: "Bütçe aralığı (isteğe bağlı)",
    budgetPlaceholder: "örn. £3.000–£5.000",
    message: "Özel endişe veya sorularınız?",
    messagePlaceholder: "örn. Ön dişlerimde köprü var, geceleri diş gıcırdatıyorum...",
    uploadTitle: "Gülüş fotoğrafınızı yükleyin",
    uploadSub: "İyi ışıkta, cepheden net bir fotoğraf",
    uploadXray: "X-ray yükleyin (isteğe bağlı, teklifinizi hızlandırır)",
    uploadDrag: "Sürükle & bırak veya tıklayarak seçin",
    uploadFormats: "JPG, PNG, PDF · Maks. 10MB",
    filesSelected: "dosya seçildi",
    next: "İleri →",
    back: "← Geri",
    getMyPlan: "Tedavi Planımı WhatsApp'ta Al →",
    planSummary: "Plan özeti",
    treatments: "Seçilen tedaviler",
    name: "Ad Soyad",
    contactDetails: "İletişim",
    travelWindow: "Seyahat tarihi",
    trustBadge1: "Yükümlülük yok",
    trustBadge2: "Ücretsiz değerlendirme",
    trustBadge3: "24s içinde yanıt",
    trustBadge4: "1990 — 35 yıllık uzmanlık",
    stepOf: "Adım",
    of: "/",
    statsYears: "35+ Yıl",
    statsYearsLabel: "Girne'de hizmet",
    statsPatients: "10.000+",
    statsPatientsLabel: "Mutlu hasta",
    statsSave: "%60–70 Tasarruf",
    statsSaveLabel: "İngiltere fiyatlarına kıyasla",
    statsSpec: "6 Uzman",
    statsSpecLabel: "Tek çatı altında",
    required: "Lütfen tüm zorunlu alanları doldurun",
    selectTreatment: "Lütfen en az bir tedavi seçin",
  }
};

export default function LandingPage() {
  const { lang, setLang, languages } = useLanguage();
  const isEn = lang !== "tr";
  const c = isEn ? copy.en : copy.tr;

  const [step, setStep] = useState(1);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    country: "", travelDate: "", budget: "", message: ""
  });
  const [smileFiles, setSmileFiles] = useState<File[]>([]);
  const [xrayFiles, setXrayFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const smileRef = useRef<HTMLInputElement>(null);
  const xrayRef = useRef<HTMLInputElement>(null);

  const toggleTreatment = (id: string) => {
    setSelectedTreatments(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
    setError("");
  };

  const goNext = () => {
    if (step === 1 && selectedTreatments.length === 0) {
      setError(c.selectTreatment); return;
    }
    if (step === 2) {
      if (!formData.firstName || !formData.email || !formData.phone || !formData.country) {
        setError(c.required); return;
      }
    }
    setError("");
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    const selectedLabels = selectedTreatments.map(id => {
      const t = TREATMENTS.find(t => t.id === id);
      return isEn ? t?.en : t?.tr;
    }).join(", ");

    const msg = isEn
      ? `Hello Temelci Dental! I'd like to get a treatment plan.\n\n` +
        `👤 Name: ${formData.firstName} ${formData.lastName}\n` +
        `📧 Email: ${formData.email}\n` +
        `📱 Phone: ${formData.phone}\n` +
        `🌍 Country: ${formData.country}\n` +
        `✈️ Travel: ${formData.travelDate || "Flexible"}\n` +
        `💰 Budget: ${formData.budget || "Not specified"}\n` +
        `🦷 Treatments: ${selectedLabels}\n` +
        `💬 Notes: ${formData.message || "None"}\n\n` +
        `Please send me a personalised quote. Thank you!`
      : `Merhaba Temelci Dental! Tedavi planı almak istiyorum.\n\n` +
        `👤 Ad: ${formData.firstName} ${formData.lastName}\n` +
        `📧 E-posta: ${formData.email}\n` +
        `📱 Telefon: ${formData.phone}\n` +
        `🌍 Ülke: ${formData.country}\n` +
        `✈️ Seyahat: ${formData.travelDate || "Esnek"}\n` +
        `💰 Bütçe: ${formData.budget || "Belirtilmedi"}\n` +
        `🦷 Tedaviler: ${selectedLabels}\n` +
        `💬 Notlar: ${formData.message || "Yok"}\n\n` +
        `Kişiselleştirilmiş teklif gönderin lütfen. Teşekkürler!`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const progressPct = ((step - 1) / 3) * 100;

  return (
    <div className="lp2">
      {/* LANG BAR */}
      <div className="lp2-lang-bar">
        <div className="lp2-lang-switch">
          <button className={`lp2-lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>🇬🇧 EN</button>
          <button className={`lp2-lang-btn ${lang === "tr" ? "active" : ""}`} onClick={() => setLang("tr")}>🇹🇷 TR</button>
          <button className={`lp2-lang-btn ${lang === "de" ? "active" : ""}`} onClick={() => setLang("de")}>🇩🇪 DE</button>
          <button className={`lp2-lang-btn ${lang === "ru" ? "active" : ""}`} onClick={() => setLang("ru")}>🇷🇺 RU</button>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="lp2-progress-bar">
        <div className="lp2-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="lp2-step-indicator">
        {c.stepOf} {step} {c.of} 4
      </div>

      <main className="lp2-main">
        {/* STEP 1 — TREATMENT SELECT */}
        {step === 1 && (
          <div className="lp2-step">
            <div className="lp2-step-header">
              <div className="lp2-trust-pill">🏥 Temelci Dental · Kyrenia, North Cyprus · Since 1990</div>
              <h1 className="lp2-h1">{c.step1Title}</h1>
              <p className="lp2-sub">{c.step1Sub}</p>
            </div>

            <div className="lp2-treatments-grid">
              {TREATMENTS.map(t => (
                <button
                  key={t.id}
                  className={`lp2-treatment-card ${selectedTreatments.includes(t.id) ? "selected" : ""}`}
                  onClick={() => toggleTreatment(t.id)}
                >
                  <div className="lp2-tc-top">
                    <span className="lp2-tc-emoji">{t.emoji}</span>
                    {t.save && <span className="lp2-tc-save">Save {t.save}</span>}
                    {selectedTreatments.includes(t.id) && (
                      <span className="lp2-tc-check">✓</span>
                    )}
                  </div>
                  <div className="lp2-tc-name">{isEn ? t.en : t.tr}</div>
                  <div className="lp2-tc-desc">{isEn ? t.desc_en : t.desc_tr}</div>
                  <div className="lp2-tc-days">⏱ {isEn ? t.days_en : t.days_tr}</div>
                </button>
              ))}
            </div>

            {error && <div className="lp2-error">{error}</div>}

            <div className="lp2-cta-row">
              <button className="lp2-btn-primary" onClick={goNext}>{c.next}</button>
            </div>

            {/* STATS */}
            <div className="lp2-stats">
              {[
                { v: c.statsYears, l: c.statsYearsLabel },
                { v: c.statsPatients, l: c.statsPatientsLabel },
                { v: c.statsSave, l: c.statsSaveLabel },
                { v: c.statsSpec, l: c.statsSpecLabel },
              ].map((s, i) => (
                <div key={i} className="lp2-stat">
                  <div className="lp2-stat-val">{s.v}</div>
                  <div className="lp2-stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — PERSONAL INFO */}
        {step === 2 && (
          <div className="lp2-step">
            <div className="lp2-step-header">
              <h1 className="lp2-h1">{c.step2Title}</h1>
              <p className="lp2-sub">{c.step2Sub}</p>
            </div>

            <div className="lp2-selected-summary">
              {selectedTreatments.map(id => {
                const t = TREATMENTS.find(t => t.id === id)!;
                return (
                  <span key={id} className="lp2-selected-tag">
                    {t.emoji} {isEn ? t.en : t.tr}
                  </span>
                );
              })}
            </div>

            <div className="lp2-form">
              <div className="lp2-form-row">
                <div className="lp2-field">
                  <label>{c.firstName} *</label>
                  <input className="lp2-inp" type="text" placeholder={c.firstName}
                    value={formData.firstName} onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))} />
                </div>
                <div className="lp2-field">
                  <label>{c.lastName}</label>
                  <input className="lp2-inp" type="text" placeholder={c.lastName}
                    value={formData.lastName} onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))} />
                </div>
              </div>
              <div className="lp2-form-row">
                <div className="lp2-field">
                  <label>{c.email} *</label>
                  <input className="lp2-inp" type="email" placeholder="you@email.com"
                    value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div className="lp2-field">
                  <label>{c.phone} *</label>
                  <input className="lp2-inp" type="tel" placeholder="+44 7700 000000"
                    value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
              <div className="lp2-field">
                <label>{c.country} *</label>
                <select className="lp2-inp" value={formData.country}
                  onChange={e => setFormData(p => ({ ...p, country: e.target.value }))}>
                  <option value="">{c.selectCountry}</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="lp2-form-row">
                <div className="lp2-field">
                  <label>{c.travelDate}</label>
                  <input className="lp2-inp" type="text" placeholder={c.travelDatePlaceholder}
                    value={formData.travelDate} onChange={e => setFormData(p => ({ ...p, travelDate: e.target.value }))} />
                </div>
                <div className="lp2-field">
                  <label>{c.budget}</label>
                  <input className="lp2-inp" type="text" placeholder={c.budgetPlaceholder}
                    value={formData.budget} onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))} />
                </div>
              </div>
              <div className="lp2-field">
                <label>{c.message}</label>
                <textarea className="lp2-inp lp2-textarea" placeholder={c.messagePlaceholder} rows={3}
                  value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
              </div>
            </div>

            {error && <div className="lp2-error">{error}</div>}

            <div className="lp2-cta-row">
              <button className="lp2-btn-ghost" onClick={() => setStep(1)}>{c.back}</button>
              <button className="lp2-btn-primary" onClick={goNext}>{c.next}</button>
            </div>

            <div className="lp2-trust-row">
              {[c.trustBadge1, c.trustBadge2, c.trustBadge3].map((b, i) => (
                <span key={i} className="lp2-trust-tag">✓ {b}</span>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — PHOTO UPLOAD */}
        {step === 3 && (
          <div className="lp2-step">
            <div className="lp2-step-header">
              <h1 className="lp2-h1">{c.step3Title}</h1>
              <p className="lp2-sub">{c.step3Sub}</p>
            </div>

            {/* Smile upload */}
            <div className="lp2-upload-zone" onClick={() => smileRef.current?.click()}>
              <input ref={smileRef} type="file" accept="image/*,.pdf" multiple style={{ display: "none" }}
                onChange={e => setSmileFiles(Array.from(e.target.files || []))} />
              <div className="lp2-upload-icon">📷</div>
              <div className="lp2-upload-title">{c.uploadTitle}</div>
              <div className="lp2-upload-sub">{c.uploadSub}</div>
              <div className="lp2-upload-hint">{c.uploadDrag}</div>
              <div className="lp2-upload-formats">{c.uploadFormats}</div>
              {smileFiles.length > 0 && (
                <div className="lp2-upload-status">
                  ✓ {smileFiles.length} {c.filesSelected}: {smileFiles.map(f => f.name).join(", ")}
                </div>
              )}
            </div>

            {/* X-ray upload */}
            <div className="lp2-upload-zone lp2-upload-zone--secondary" onClick={() => xrayRef.current?.click()}>
              <input ref={xrayRef} type="file" accept="image/*,.pdf" multiple style={{ display: "none" }}
                onChange={e => setXrayFiles(Array.from(e.target.files || []))} />
              <div className="lp2-upload-icon">🩻</div>
              <div className="lp2-upload-title">{c.uploadXray}</div>
              <div className="lp2-upload-hint">{c.uploadDrag}</div>
              <div className="lp2-upload-formats">{c.uploadFormats}</div>
              {xrayFiles.length > 0 && (
                <div className="lp2-upload-status">
                  ✓ {xrayFiles.length} {c.filesSelected}: {xrayFiles.map(f => f.name).join(", ")}
                </div>
              )}
            </div>

            <div className="lp2-cta-row">
              <button className="lp2-btn-ghost" onClick={() => setStep(2)}>{c.back}</button>
              <button className="lp2-btn-primary" onClick={goNext}>{c.next}</button>
            </div>
          </div>
        )}

        {/* STEP 4 — SUMMARY + WHATSAPP */}
        {step === 4 && (
          <div className="lp2-step">
            <div className="lp2-step-header">
              <div className="lp2-success-icon">✅</div>
              <h1 className="lp2-h1">{c.step4Title}</h1>
              <p className="lp2-sub">{c.step4Sub}</p>
            </div>

            <div className="lp2-summary-card">
              <div className="lp2-summary-row">
                <span className="lp2-summary-label">{c.treatments}</span>
                <span className="lp2-summary-val">
                  {selectedTreatments.map(id => {
                    const t = TREATMENTS.find(t => t.id === id)!;
                    return `${t.emoji} ${isEn ? t.en : t.tr}`;
                  }).join(" · ")}
                </span>
              </div>
              <div className="lp2-summary-row">
                <span className="lp2-summary-label">{c.name}</span>
                <span className="lp2-summary-val">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="lp2-summary-row">
                <span className="lp2-summary-label">{c.contactDetails}</span>
                <span className="lp2-summary-val">{formData.email} · {formData.phone}</span>
              </div>
              <div className="lp2-summary-row">
                <span className="lp2-summary-label">{c.country}</span>
                <span className="lp2-summary-val">{formData.country}</span>
              </div>
              {formData.travelDate && (
                <div className="lp2-summary-row">
                  <span className="lp2-summary-label">{c.travelWindow}</span>
                  <span className="lp2-summary-val">{formData.travelDate}</span>
                </div>
              )}
              {(smileFiles.length > 0 || xrayFiles.length > 0) && (
                <div className="lp2-summary-row">
                  <span className="lp2-summary-label">📎 Files</span>
                  <span className="lp2-summary-val">
                    {smileFiles.length > 0 && `${smileFiles.length} smile photo${smileFiles.length > 1 ? "s" : ""}`}
                    {smileFiles.length > 0 && xrayFiles.length > 0 && " · "}
                    {xrayFiles.length > 0 && `${xrayFiles.length} X-ray${xrayFiles.length > 1 ? "s" : ""}`}
                  </span>
                </div>
              )}
            </div>

            <button className="lp2-btn-whatsapp" onClick={handleWhatsApp}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.116 1.529 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.375l-.359-.214-3.724.886.919-3.619-.234-.372A9.796 9.796 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
              </svg>
              {c.getMyPlan}
            </button>

            <div className="lp2-trust-row">
              {[c.trustBadge1, c.trustBadge2, c.trustBadge3, c.trustBadge4].map((b, i) => (
                <span key={i} className="lp2-trust-tag">✓ {b}</span>
              ))}
            </div>

            <div className="lp2-social-proof">
              <div className="lp2-reviews">
                {"⭐".repeat(5)}
                <span> 4.9/5 · 200+ verified reviews</span>
              </div>
            </div>
          </div>
        )}
      </main>


    </div>
  );
}
