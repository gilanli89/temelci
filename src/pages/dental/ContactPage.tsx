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
  const { t } = useLanguage();
  const { data: settings } = useSiteSettings();
  const { data: page } = useSitePage('contact');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const phone = settings?.phone || t.contactPhone;
  const email = settings?.email || t.contactEmail;
  const address = settings?.address || t.contactAddress;

  useSEO({ title: page?.seo_title || 'Contact Temelci Dental Clinic', description: page?.seo_description || 'Contact Temelci Dental Clinic in Kyrenia for treatment planning, dental tourism and appointment enquiries.', canonical: 'https://temelcidentist.com/en/contact' });

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    const { error } = await supabase.from('leads').insert({ ...form, source: 'contact', lang: 'en' });
    setSending(false);
    if (error) toast.error('We could not send your message. Please contact us on WhatsApp.');
    else { toast.success('Thank you. Our patient team will contact you shortly.'); setForm({ name: '', email: '', phone: '', message: '' }); }
  }

  return <>
    <section className="section-padding bg-secondary/30"><div className="container-dental text-center"><h1 className="heading-display mb-4">{page?.hero_title || t.contactTitle}</h1><p className="text-body max-w-2xl mx-auto">{page?.hero_description || t.contactSubtitle}</p></div></section>
    <section className="section-padding bg-background"><div className="container-dental max-w-5xl"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12"><motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><h2 className="heading-section mb-6">Talk to our patient team</h2><div className="space-y-6 mb-8"><ContactItem icon={MapPin} title="Clinic address" value={address} /><ContactItem icon={Phone} title="WhatsApp & phone" value={phone} href={`tel:${phone.replace(/\D/g, '')}`} /><ContactItem icon={Mail} title="Email" value={email} href={`mailto:${email}`} /><ContactItem icon={Clock} title="Working hours" value="Monday–Saturday, 09:00–18:00" /></div><WhatsAppButton text={t.bookWhatsApp} variant="hero" /></motion.div><motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><form className="bg-card rounded-2xl border border-border p-8 space-y-5" onSubmit={submit}><div><label className="block text-sm font-medium mb-2">Name</label><input value={form.name} onChange={e => setForm(current => ({ ...current, name: e.target.value }))} maxLength={200} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" required /></div><div className="grid sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium mb-2">Email</label><input type="email" value={form.email} onChange={e => setForm(current => ({ ...current, email: e.target.value }))} maxLength={255} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" required /></div><div><label className="block text-sm font-medium mb-2">Phone</label><input type="tel" value={form.phone} onChange={e => setForm(current => ({ ...current, phone: e.target.value }))} maxLength={50} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" /></div></div><div><label className="block text-sm font-medium mb-2">How can we help?</label><textarea value={form.message} onChange={e => setForm(current => ({ ...current, message: e.target.value }))} maxLength={5000} rows={5} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" required /></div><p className="text-xs text-muted-foreground">Do not include sensitive medical information. We will discuss clinical details through a suitable private channel.</p><button type="submit" disabled={sending} className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">{sending ? 'Sending…' : 'Send message'}</button></form></motion.div></div></div></section>
    {settings?.maps_embed_url && <section className="bg-background pb-16"><div className="container-dental max-w-5xl"><div className="rounded-2xl overflow-hidden border border-border"><iframe src={settings.maps_embed_url} width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title="Temelci Dental Clinic map" /></div></div></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Dentist', name: settings?.brand_name || 'Temelci Dental Clinic', url: 'https://temelcidentist.com/en', telephone: phone, email, address: { '@type': 'PostalAddress', streetAddress: address, addressLocality: 'Kyrenia', addressCountry: 'CY' } }) }} />
  </>;
}
function ContactItem({ icon: Icon, title, value, href }: { icon: typeof MapPin; title: string; value: string; href?: string }) {
  const content = <><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Icon className="h-6 w-6 text-primary" /></div><div><h3 className="font-semibold mb-1">{title}</h3><p className="text-sm text-muted-foreground">{value}</p></div></>;
  return href ? <a href={href} className="flex items-start gap-4 hover:text-primary transition-colors">{content}</a> : <div className="flex items-start gap-4">{content}</div>;
}
