import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const WA = '905338229445';

const TREATMENTS = [
  { id: 'hollywood', en: 'Hollywood Smile', tr: 'Hollywood Smile', emoji: '✨', days: '5–7 days', save: '60–70%' },
  { id: 'implant', en: 'Dental Implants', tr: 'Diş İmplantı', emoji: '🦷', days: '2 visits', save: '50–65%' },
  { id: 'allon4', en: 'All-on-4', tr: 'All-on-4', emoji: '🏆', days: '2 visits', save: '65%' },
  { id: 'allon6', en: 'All-on-6', tr: 'All-on-6', emoji: '💎', days: '2 visits', save: '65%' },
  { id: 'veneers', en: 'Veneers', tr: 'Veneer', emoji: '🌟', days: '5–7 days', save: '60%' },
  { id: 'zirconia', en: 'Zirconia Crowns', tr: 'Zirkonyum Kron', emoji: '👑', days: '5–7 days', save: '55%' },
  { id: 'whitening', en: 'Teeth Whitening', tr: 'Diş Beyazlatma', emoji: '⚡', days: '1 day', save: '70%' },
  { id: 'notsure', en: 'Not sure yet', tr: 'Henüz bilmiyorum', emoji: '🔍', days: '', save: '' },
];

const COUNTRIES = ['United Kingdom','Germany','Norway','Sweden','Netherlands','Switzerland','Austria','Australia','United States','Canada','France','Ireland','Other'];

interface Props { isOpen: boolean; onClose: () => void; }

export const QuoteModal = ({ isOpen, onClose }: Props) => {
  const { lang } = useLanguage();
  const isTr = lang === 'tr';
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', travel: '', budget: '', message: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; setStep(1); setSelected([]); setError(''); }
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setError('');
  };

  const next = () => {
    if (step === 1 && selected.length === 0) { setError(isTr ? 'Lütfen en az bir tedavi seçin' : 'Please select at least one treatment'); return; }
    if (step === 2 && (!form.name || !form.phone || !form.country)) { setError(isTr ? 'Ad, telefon ve ülke zorunludur' : 'Name, phone and country are required'); return; }
    setError(''); setStep(s => s + 1);
  };

  const sendToWA = () => {
    const treatments = selected.map(id => TREATMENTS.find(t => t.id === id)?.[isTr ? 'tr' : 'en']).join(', ');
    const msg = isTr
      ? `Merhaba Temelci Dental! Ücretsiz konsültasyon talep ediyorum.\n\n👤 Ad: ${form.name}\n📱 Tel: ${form.phone}\n🌍 Ülke: ${form.country}\n✈️ Seyahat: ${form.travel || 'Esnek'}\n🦷 Tedaviler: ${treatments}\n💬 Not: ${form.message || 'Yok'}`
      : `Hello Temelci Dental! I'd like a free consultation.\n\n👤 Name: ${form.name}\n📱 Phone: ${form.phone}\n🌍 Country: ${form.country}\n✈️ Travel: ${form.travel || 'Flexible'}\n🦷 Treatments: ${treatments}\n💬 Notes: ${form.message || 'None'}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  const progress = ((step - 1) / 2) * 100;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-lg bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl border border-border overflow-hidden"
        style={{ maxHeight: '92vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {isTr ? `Adım ${step} / 3` : `Step ${step} of 3`}
            </p>
            <h2 className="font-display text-lg font-bold text-foreground mt-0.5">
              {step === 1 && (isTr ? 'Hangi tedaviyle ilgileniyorsunuz?' : 'Which treatment are you interested in?')}
              {step === 2 && (isTr ? 'İletişim bilgileriniz' : 'Your contact details')}
              {step === 3 && (isTr ? 'Hazır — WhatsApp\'ta gönderin' : 'Ready — Send on WhatsApp')}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
            <X size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 bg-border mx-5 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 pb-5" style={{ maxHeight: 'calc(92vh - 120px)' }}>

          {/* STEP 1 — Treatment select */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-2">
              {TREATMENTS.map(t => (
                <button key={t.id}
                  onClick={() => toggle(t.id)}
                  className={`flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-all ${
                    selected.includes(t.id)
                      ? 'border-primary bg-primary/8 shadow-sm'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl">{t.emoji}</span>
                    {selected.includes(t.id) && (
                      <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={11} className="text-white" />
                      </span>
                    )}
                    {t.save && !selected.includes(t.id) && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                        -{t.save}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-foreground leading-tight">{isTr ? t.tr : t.en}</p>
                  {t.days && <p className="text-[10px] text-primary font-medium">⏱ {t.days}</p>}
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — Contact */}
          {step === 2 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                    {isTr ? 'Ad Soyad *' : 'Full Name *'}
                  </label>
                  <input className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                    placeholder={isTr ? 'Adınız' : 'Your name'}
                    value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                    {isTr ? 'WhatsApp *' : 'WhatsApp *'}
                  </label>
                  <input className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
                    placeholder="+44 7700..."
                    value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                  {isTr ? 'Ülke *' : 'Country *'}
                </label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-primary focus:outline-none"
                  value={form.country} onChange={e => setForm(p => ({...p, country: e.target.value}))}>
                  <option value="">{isTr ? 'Ülkenizi seçin' : 'Select country'}</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                  {isTr ? 'Seyahat tarihi (isteğe bağlı)' : 'Travel date (optional)'}
                </label>
                <input className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-primary focus:outline-none"
                  placeholder={isTr ? 'örn. Temmuz 2026 veya esnek' : 'e.g. July 2026 or flexible'}
                  value={form.travel} onChange={e => setForm(p => ({...p, travel: e.target.value}))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                  {isTr ? 'Notlar (isteğe bağlı)' : 'Notes (optional)'}
                </label>
                <textarea className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-primary focus:outline-none resize-none"
                  rows={2} placeholder={isTr ? 'Sorularınız veya notlarınız...' : 'Any questions or notes...'}
                  value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} />
              </div>
            </div>
          )}

          {/* STEP 3 — Summary + WA */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-xl p-4 border border-border space-y-2.5">
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-muted-foreground min-w-[80px] text-xs uppercase tracking-wide pt-0.5">
                    {isTr ? 'Tedaviler' : 'Treatments'}
                  </span>
                  <span className="text-foreground text-xs leading-relaxed">
                    {selected.map(id => {
                      const t = TREATMENTS.find(t => t.id === id);
                      return `${t?.emoji} ${isTr ? t?.tr : t?.en}`;
                    }).join(' · ')}
                  </span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-muted-foreground min-w-[80px] text-xs uppercase tracking-wide pt-0.5">{isTr ? 'Ad' : 'Name'}</span>
                  <span className="text-foreground text-xs">{form.name}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-muted-foreground min-w-[80px] text-xs uppercase tracking-wide pt-0.5">{isTr ? 'Tel' : 'Phone'}</span>
                  <span className="text-foreground text-xs">{form.phone}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="font-semibold text-muted-foreground min-w-[80px] text-xs uppercase tracking-wide pt-0.5">{isTr ? 'Ülke' : 'Country'}</span>
                  <span className="text-foreground text-xs">{form.country}</span>
                </div>
                {form.travel && (
                  <div className="flex gap-2 text-sm">
                    <span className="font-semibold text-muted-foreground min-w-[80px] text-xs uppercase tracking-wide pt-0.5">{isTr ? 'Seyahat' : 'Travel'}</span>
                    <span className="text-foreground text-xs">{form.travel}</span>
                  </div>
                )}
              </div>

              <button onClick={sendToWA}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: 'linear-gradient(135deg, #25d366, #128c4a)', boxShadow: '0 6px 24px rgba(37,211,102,0.35)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.116 1.529 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.375l-.359-.214-3.724.886.919-3.619-.234-.372A9.796 9.796 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
                </svg>
                {isTr ? 'WhatsApp\'ta Gönder — Ücretsiz' : 'Send on WhatsApp — Free'}
              </button>

              <div className="flex flex-wrap justify-center gap-3">
                {['No obligation', 'Reply within 2h', 'Free assessment'].map(b => (
                  <span key={b} className="text-xs text-muted-foreground flex items-center gap-1">
                    <Check size={11} className="text-primary" /> {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="mt-3 text-xs text-red-600 font-semibold text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">{error}</p>
          )}

          {/* Nav buttons */}
          {step < 3 && (
            <div className="flex gap-2 mt-4">
              {step > 1 && (
                <button onClick={() => { setStep(s => s - 1); setError(''); }}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft size={15} /> {isTr ? 'Geri' : 'Back'}
                </button>
              )}
              <button onClick={next}
                className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                {isTr ? 'Devam' : 'Continue'} <ChevronRight size={15} />
              </button>
            </div>
          )}
          {step === 3 && (
            <button onClick={() => { setStep(s => s - 1); }}
              className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={12} /> {isTr ? 'Geri dön' : 'Go back'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
