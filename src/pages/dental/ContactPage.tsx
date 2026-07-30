import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { useSitePage, useSiteSettings } from '@/hooks/useCmsContent';
import { useSEO } from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const { data: settings } = useSiteSettings();
  const { data: page } = useSitePage('contact');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const phone = '+90 539 101 11 13';
  const email = settings?.email || t.contactEmail;
  const address = settings?.address || t.contactAddress;
  const ui = {
    en: { seoTitle: 'Contact Temelci Dental Clinic in Kyrenia', seoDescription: 'Contact Temelci Dental Clinic in Kyrenia for treatment planning, dental tourism and appointment enquiries.', talk: 'Talk to our patient team', address: 'Clinic address', phone: 'WhatsApp & phone', email: 'Email', hours: 'Working hours', hoursValue: 'Monday–Saturday, 09:00–18:00', name: 'Name', phoneField: 'Phone', help: 'How can we help?', privacy: 'Do not include sensitive medical information. We will discuss clinical details through a suitable private channel.', sending: 'Sending…', send: 'Send message', error: 'We could not send your message. Please contact us on WhatsApp.', success: 'Thank you. Our patient team will contact you shortly.', map: 'Temelci Dental Clinic map' },
    de: { seoTitle: 'Kontakt zur Temelci Dental Clinic in Kyrenia', seoDescription: 'Kontaktieren Sie die Temelci Dental Clinic für Behandlungsplanung, Zahntourismus und Terminanfragen.', talk: 'Sprechen Sie mit unserem Patiententeam', address: 'Klinikadresse', phone: 'WhatsApp & Telefon', email: 'E-Mail', hours: 'Öffnungszeiten', hoursValue: 'Montag–Samstag, 09:00–18:00', name: 'Name', phoneField: 'Telefon', help: 'Wie können wir helfen?', privacy: 'Bitte senden Sie keine sensiblen medizinischen Informationen. Klinische Details besprechen wir über einen geeigneten privaten Kanal.', sending: 'Wird gesendet…', send: 'Nachricht senden', error: 'Die Nachricht konnte nicht gesendet werden. Bitte kontaktieren Sie uns per WhatsApp.', success: 'Vielen Dank. Unser Patiententeam meldet sich in Kürze.', map: 'Karte der Temelci Dental Clinic' },
    tr: { seoTitle: 'Temelci Dental Clinic Girne İletişim', seoDescription: 'Tedavi planlaması, diş turizmi ve randevu talepleri için Girne’deki Temelci Dental Clinic ile iletişime geçin.', talk: 'Hasta ekibimizle görüşün', address: 'Klinik adresi', phone: 'WhatsApp ve telefon', email: 'E-posta', hours: 'Çalışma saatleri', hoursValue: 'Pazartesi–Cumartesi, 09:00–18:00', name: 'Adınız', phoneField: 'Telefon', help: 'Size nasıl yardımcı olabiliriz?', privacy: 'Hassas tıbbi bilgileri bu forma yazmayın. Klinik ayrıntıları uygun ve özel bir kanaldan görüşeceğiz.', sending: 'Gönderiliyor…', send: 'Mesaj gönder', error: 'Mesajınız gönderilemedi. Lütfen WhatsApp üzerinden iletişime geçin.', success: 'Teşekkürler. Hasta ekibimiz kısa süre içinde sizinle iletişime geçecek.', map: 'Temelci Dental Clinic haritası' },
    he: { seoTitle: 'יצירת קשר עם Temelci Dental בקירניה', seoDescription: 'צרו קשר עם Temelci Dental לתכנון טיפול, תיירות שיניים ובקשות לתורים.', talk: 'דברו עם צוות המטופלים', address: 'כתובת המרפאה', phone: 'WhatsApp וטלפון', email: 'דוא״ל', hours: 'שעות פעילות', hoursValue: 'שני–שבת, 09:00–18:00', name: 'שם', phoneField: 'טלפון', help: 'כיצד נוכל לעזור?', privacy: 'אל תכתבו מידע רפואי רגיש בטופס. פרטים קליניים יידונו בערוץ פרטי מתאים.', sending: 'שולח…', send: 'שליחת הודעה', error: 'לא הצלחנו לשלוח את ההודעה. צרו קשר דרך WhatsApp.', success: 'תודה. צוות המטופלים יחזור אליכם בקרוב.', map: 'מפת Temelci Dental Clinic' },
    ru: { seoTitle: 'Контакты Temelci Dental Clinic в Кирении', seoDescription: 'Свяжитесь с Temelci Dental Clinic по вопросам планирования лечения, стоматологического туризма и записи на приём.', talk: 'Свяжитесь с командой пациентов', address: 'Адрес клиники', phone: 'WhatsApp и телефон', email: 'Электронная почта', hours: 'Часы работы', hoursValue: 'Понедельник–суббота, 09:00–18:00', name: 'Имя', phoneField: 'Телефон', help: 'Чем мы можем помочь?', privacy: 'Не указывайте в форме чувствительную медицинскую информацию. Клинические детали обсудим через подходящий приватный канал.', sending: 'Отправка…', send: 'Отправить сообщение', error: 'Не удалось отправить сообщение. Свяжитесь с нами в WhatsApp.', success: 'Спасибо. Наша команда свяжется с вами в ближайшее время.', map: 'Карта Temelci Dental Clinic' },
  }[lang];

  useSEO({ title: page?.seo_title || ui.seoTitle, description: page?.seo_description || ui.seoDescription, canonical: `https://temelcidentist.com/${lang}/${t.contactSlug}` });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    const { error } = await supabase.from('leads').insert({ ...form, source: 'contact', lang });
    setSending(false);
    if (error) toast.error(ui.error);
    else { toast.success(ui.success); setForm({ name: '', email: '', phone: '', message: '' }); }
  }

  return <>
    <section className="section-padding bg-secondary/30"><div className="container-dental text-center"><h1 className="heading-display mb-4">{page?.hero_title || t.contactTitle}</h1><p className="text-body max-w-2xl mx-auto">{page?.hero_description || t.contactSubtitle}</p></div></section>
    <section className="section-padding bg-background"><div className="container-dental max-w-5xl"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12"><motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><h2 className="heading-section mb-6">{ui.talk}</h2><div className="space-y-6 mb-8"><ContactItem icon={MapPin} title={ui.address} value={address} /><ContactItem icon={Phone} title={ui.phone} value={phone} href={`tel:${phone.replace(/\D/g, '')}`} /><ContactItem icon={Mail} title={ui.email} value={email} href={`mailto:${email}`} /><ContactItem icon={Clock} title={ui.hours} value={ui.hoursValue} /></div><WhatsAppButton text={t.bookWhatsApp} variant="hero" /></motion.div><motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><form className="bg-card rounded-2xl border border-border p-8 space-y-5" onSubmit={submit}><div><label className="block text-sm font-medium mb-2">{ui.name}</label><input value={form.name} onChange={e => setForm(current => ({ ...current, name: e.target.value }))} maxLength={200} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" required /></div><div className="grid sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-2">{ui.email}</label><input type="email" value={form.email} onChange={e => setForm(current => ({ ...current, email: e.target.value }))} maxLength={255} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" required /></div><div><label className="block text-sm font-medium mb-2">{ui.phoneField}</label><input type="tel" value={form.phone} onChange={e => setForm(current => ({ ...current, phone: e.target.value }))} maxLength={50} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div></div><div><label className="block text-sm font-medium mb-2">{ui.help}</label><textarea value={form.message} onChange={e => setForm(current => ({ ...current, message: e.target.value }))} maxLength={5000} rows={5} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" required /></div><p className="text-xs text-muted-foreground">{ui.privacy}</p><button type="submit" disabled={sending} className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">{sending ? ui.sending : ui.send}</button></form></motion.div></div></div></section>
    {settings?.maps_embed_url && <section className="bg-background pb-16"><div className="container-dental max-w-5xl"><div className="rounded-2xl overflow-hidden border border-border"><iframe src={settings.maps_embed_url} width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title={ui.map} /></div></div></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Dentist', '@id': 'https://temelcidentist.com/#clinic', name: settings?.brand_name || 'Temelci Dental Clinic', url: `https://temelcidentist.com/${lang}`, telephone: '+905391011113', email, address: { '@type': 'PostalAddress', streetAddress: address, addressLocality: 'Kyrenia', addressCountry: 'CY' }, openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '18:00' } }) }} />
  </>;
}
function ContactItem({ icon: Icon, title, value, href }: { icon: typeof MapPin; title: string; value: string; href?: string }) {
  const content = <><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Icon className="h-6 w-6 text-primary" /></div><div><h3 className="font-semibold mb-1">{title}</h3><p className="text-sm text-muted-foreground">{value}</p></div></>;
  return href ? <a href={href} className="flex items-start gap-4 hover:text-primary transition-colors">{content}</a> : <div className="flex items-start gap-4">{content}</div>;
}
