import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Scan, ShieldCheck, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useOptionalLanguage, type ActiveLanguage } from '@/i18n/LanguageContext';
import { uploadToBucket } from '@/lib/mediaUpload';
import { formatLocalDateInputValue, isVisitDateValid } from '@/lib/dateInput';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Copy = {
  eyebrow: string; title: string; subtitle: string; firstName: string; lastName: string;
  phone: string; date: string; xray: string; upload: string; replace: string; note: string;
  notePlaceholder: string; consent: string; submit: string; sending: string; privacy: string;
  successTitle: string; successBody: string; close: string; missing: string; invalidPhone: string;
  invalidDate: string; missingXray: string; missingConsent: string;
};

const COPY: Record<ActiveLanguage, Copy> = {
  en: {
    eyebrow: 'Free dentist review', title: 'Get your treatment plan', subtitle: 'Upload your X-ray. A dentist will review it and contact you on WhatsApp.',
    firstName: 'First name', lastName: 'Last name', phone: 'WhatsApp number', date: 'When can you visit?', xray: 'Dental X-ray', upload: 'Upload X-ray', replace: 'Replace X-ray', note: 'Anything we should know? (optional)', notePlaceholder: 'Pain, missing teeth or your main concern…',
    consent: 'I consent to the secure processing of my X-ray and contact details for a preliminary clinical review. I understand this does not replace an in-person examination.',
    submit: 'Send for free review', sending: 'Uploading securely…', privacy: 'Private and visible only to the clinical team.', successTitle: 'X-ray received', successBody: 'A dentist will review your X-ray and contact you on WhatsApp.', close: 'Done',
    missing: 'Please enter your first and last name.', invalidPhone: 'Please enter a valid WhatsApp number.', invalidDate: 'Please select a future visit date.', missingXray: 'Please upload your dental X-ray.', missingConsent: 'Please confirm the clinical data consent.',
  },
  tr: {
    eyebrow: 'Ücretsiz doktor değerlendirmesi', title: 'Tedavi planınızı alın', subtitle: 'Röntgeninizi yükleyin. Doktor inceleyip WhatsApp’tan size ulaşsın.',
    firstName: 'Ad', lastName: 'Soyad', phone: 'WhatsApp numarası', date: 'Ne zaman gelebilirsiniz?', xray: 'Diş röntgeni', upload: 'Röntgen yükle', replace: 'Röntgeni değiştir', note: 'Bilmemiz gereken bir şey var mı? (isteğe bağlı)', notePlaceholder: 'Ağrı, eksik diş veya temel şikâyetiniz…',
    consent: 'Röntgenimin ve iletişim bilgilerimin ön klinik değerlendirme için güvenli şekilde işlenmesini kabul ediyorum. Bunun yüz yüze muayenenin yerini tutmadığını anlıyorum.',
    submit: 'Ücretsiz incelemeye gönder', sending: 'Güvenli şekilde yükleniyor…', privacy: 'Gizlidir; yalnızca klinik ekip görebilir.', successTitle: 'Röntgeniniz alındı', successBody: 'Doktor röntgeninizi inceleyip WhatsApp’tan size ulaşacak.', close: 'Tamam',
    missing: 'Lütfen adınızı ve soyadınızı girin.', invalidPhone: 'Lütfen geçerli bir WhatsApp numarası girin.', invalidDate: 'Lütfen gelecekte bir ziyaret tarihi seçin.', missingXray: 'Lütfen diş röntgeninizi yükleyin.', missingConsent: 'Lütfen klinik veri onayını kabul edin.',
  },
  de: {
    eyebrow: 'Kostenlose Zahnarztprüfung', title: 'Behandlungsplan erhalten', subtitle: 'Röntgenbild hochladen. Ein Zahnarzt prüft es und meldet sich per WhatsApp.',
    firstName: 'Vorname', lastName: 'Nachname', phone: 'WhatsApp-Nummer', date: 'Wann können Sie anreisen?', xray: 'Zahnröntgen', upload: 'Röntgenbild hochladen', replace: 'Röntgenbild ersetzen', note: 'Möchten Sie uns noch etwas mitteilen? (optional)', notePlaceholder: 'Schmerzen, fehlende Zähne oder Ihr Hauptanliegen…',
    consent: 'Ich stimme der sicheren Verarbeitung meines Röntgenbildes und meiner Kontaktdaten für eine vorläufige klinische Beurteilung zu. Dies ersetzt keine persönliche Untersuchung.',
    submit: 'Kostenlos prüfen lassen', sending: 'Sicherer Upload…', privacy: 'Privat und nur für das klinische Team sichtbar.', successTitle: 'Röntgenbild erhalten', successBody: 'Ein Zahnarzt prüft Ihr Röntgenbild und kontaktiert Sie per WhatsApp.', close: 'Fertig',
    missing: 'Bitte geben Sie Vor- und Nachnamen ein.', invalidPhone: 'Bitte geben Sie eine gültige WhatsApp-Nummer ein.', invalidDate: 'Bitte wählen Sie ein zukünftiges Reisedatum.', missingXray: 'Bitte laden Sie Ihr Zahnröntgen hoch.', missingConsent: 'Bitte bestätigen Sie die Einwilligung.',
  },
  ru: {
    eyebrow: 'Бесплатная оценка врача', title: 'Получите план лечения', subtitle: 'Загрузите снимок. Врач изучит его и свяжется с вами в WhatsApp.',
    firstName: 'Имя', lastName: 'Фамилия', phone: 'Номер WhatsApp', date: 'Когда вы сможете приехать?', xray: 'Рентгеновский снимок', upload: 'Загрузить снимок', replace: 'Заменить снимок', note: 'Что ещё нам следует знать? (необязательно)', notePlaceholder: 'Боль, отсутствующие зубы или основная проблема…',
    consent: 'Я согласен на безопасную обработку снимка и контактных данных для предварительной клинической оценки. Я понимаю, что она не заменяет очный осмотр.',
    submit: 'Отправить на бесплатную оценку', sending: 'Безопасная загрузка…', privacy: 'Конфиденциально и доступно только клинической команде.', successTitle: 'Снимок получен', successBody: 'Врач изучит снимок и свяжется с вами в WhatsApp.', close: 'Готово',
    missing: 'Введите имя и фамилию.', invalidPhone: 'Введите действующий номер WhatsApp.', invalidDate: 'Выберите будущую дату визита.', missingXray: 'Загрузите рентгеновский снимок.', missingConsent: 'Подтвердите согласие на обработку данных.',
  },
  he: {
    eyebrow: 'בדיקת רופא ללא עלות', title: 'קבלו תוכנית טיפול', subtitle: 'העלו צילום רנטגן. רופא שיניים יבדוק אותו ויחזור אליכם ב‑WhatsApp.',
    firstName: 'שם פרטי', lastName: 'שם משפחה', phone: 'מספר WhatsApp', date: 'מתי תוכלו להגיע?', xray: 'צילום רנטגן דנטלי', upload: 'העלאת צילום', replace: 'החלפת צילום', note: 'יש משהו נוסף שחשוב שנדע? (לא חובה)', notePlaceholder: 'כאב, שיניים חסרות או הבעיה המרכזית…',
    consent: 'אני מסכים לעיבוד מאובטח של צילום הרנטגן ופרטי הקשר לצורך הערכה קלינית ראשונית. ברור לי שהערכה זו אינה מחליפה בדיקה במרפאה.',
    submit: 'שליחה לבדיקה ללא עלות', sending: 'העלאה מאובטחת…', privacy: 'פרטי וגלוי לצוות הקליני בלבד.', successTitle: 'הצילום התקבל', successBody: 'רופא שיניים יבדוק את הצילום ויחזור אליכם ב‑WhatsApp.', close: 'סיום',
    missing: 'נא להזין שם פרטי ושם משפחה.', invalidPhone: 'נא להזין מספר WhatsApp תקין.', invalidDate: 'נא לבחור תאריך ביקור עתידי.', missingXray: 'נא להעלות צילום רנטגן.', missingConsent: 'נא לאשר את ההסכמה לעיבוד הנתונים.',
  },
};

export function XrayIntakeForm({ compact = false, onComplete }: { compact?: boolean; onComplete?: () => void }) {
  const language = useOptionalLanguage();
  const lang = language?.lang || 'en';
  const copy = COPY[lang];
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', preferredVisitDate: '', message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const minDate = useMemo(formatLocalDateInputValue, []);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function pickFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (selected.size > 15 * 1024 * 1024) { toast.error('Maximum file size is 15 MB.'); return; }
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(selected.type)) { toast.error('Use a JPG, PNG, WebP or AVIF image.'); return; }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    if (!firstName || !lastName) return toast.error(copy.missing);
    if (form.phone.replace(/\D/g, '').length < 7) return toast.error(copy.invalidPhone);
    if (!isVisitDateValid(form.preferredVisitDate, minDate)) return toast.error(copy.invalidDate);
    if (!file) return toast.error(copy.missingXray);
    if (!consent) return toast.error(copy.missingConsent);

    setSubmitting(true);
    try {
      const { path } = await uploadToBucket('xrays', file, 'requests');
      const { error } = await supabase.from('xray_requests').insert({
        patient_name: `${firstName} ${lastName}`,
        phone: form.phone.trim(),
        preferred_visit_date: form.preferredVisitDate,
        message: form.message.trim() || null,
        xray_image_url: path,
        status: 'new',
        lang,
        patient_consent_at: new Date().toISOString(),
      });
      if (error) throw error;
      setDone(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) return (
    <div className={`text-center ${compact ? 'px-6 py-12' : 'py-8'}`}>
      <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-600" />
      <h2 className="font-display text-2xl font-bold">{copy.successTitle}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{copy.successBody}</p>
      {onComplete && <Button type="button" className="mt-6 w-full" onClick={onComplete}>{copy.close}</Button>}
    </div>
  );

  return (
    <div className={compact ? 'px-5 pb-6 pt-7 sm:px-7' : ''}>
      <div className={compact ? 'pe-10' : 'text-center'}>
        <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ${compact ? '' : 'mx-auto'}`}><Scan className="h-5 w-5" /></div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{copy.eyebrow}</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-foreground">{copy.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.subtitle}</p>
      </div>

      <form onSubmit={submit} className="mt-5 space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div><Label htmlFor="quote-first-name">{copy.firstName} *</Label><Input id="quote-first-name" required autoComplete="given-name" maxLength={100} value={form.firstName} onChange={event => setForm(current => ({ ...current, firstName: event.target.value }))} /></div>
          <div><Label htmlFor="quote-last-name">{copy.lastName} *</Label><Input id="quote-last-name" required autoComplete="family-name" maxLength={100} value={form.lastName} onChange={event => setForm(current => ({ ...current, lastName: event.target.value }))} /></div>
        </div>
        <div><Label htmlFor="quote-phone">{copy.phone} *</Label><Input id="quote-phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 7700 000000" maxLength={50} value={form.phone} onChange={event => setForm(current => ({ ...current, phone: event.target.value }))} /></div>
        <div><Label htmlFor="quote-date">{copy.date} *</Label><div className="relative"><CalendarDays className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input id="quote-date" required type="date" min={minDate} className="ps-10" value={form.preferredVisitDate} onChange={event => setForm(current => ({ ...current, preferredVisitDate: event.target.value }))} /></div></div>
        <div>
          <Label>{copy.xray} *</Label>
          <label className="mt-1 flex min-h-24 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary/35 bg-primary/[0.03] px-4 py-3 transition hover:border-primary hover:bg-primary/[0.06]">
            {preview ? <div className="flex w-full items-center gap-3"><img src={preview} alt="Selected dental X-ray" className="h-16 w-20 rounded-lg bg-slate-950 object-contain" /><div><p className="max-w-[220px] truncate text-sm font-semibold">{file?.name}</p><p className="mt-1 text-xs text-primary">{copy.replace}</p></div></div> : <div className="text-center"><Upload className="mx-auto mb-1.5 h-5 w-5 text-primary" /><p className="text-sm font-semibold">{copy.upload}</p><p className="mt-0.5 text-[11px] text-muted-foreground">JPG, PNG or WebP · max 15 MB</p></div>}
            <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={pickFile} />
          </label>
        </div>
        <div><Label htmlFor="quote-note">{copy.note}</Label><Textarea id="quote-note" rows={2} maxLength={1000} placeholder={copy.notePlaceholder} value={form.message} onChange={event => setForm(current => ({ ...current, message: event.target.value }))} /></div>
        <label className="flex cursor-pointer items-start gap-2.5 rounded-xl bg-secondary/60 p-3 text-[11px] leading-relaxed text-muted-foreground"><Checkbox checked={consent} onCheckedChange={value => setConsent(value === true)} aria-label="Clinical data consent" className="mt-0.5" /><span>{copy.consent}</span></label>
        <Button type="submit" size="lg" className="w-full rounded-xl font-bold" disabled={submitting}>{submitting ? copy.sending : copy.submit}</Button>
        <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />{copy.privacy}</p>
      </form>
    </div>
  );
}
