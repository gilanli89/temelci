import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { useBeforeAfterCases, useSitePage } from '@/hooks/useCmsContent';
import { useSEO } from '@/hooks/useSEO';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type DisplayCase = { id: string; title: string; description: string; before: string; after?: string; beforeAlt: string; afterAlt?: string };

export default function BeforeAfterPage() {
  const { t } = useLanguage();
  const { data: dbCases } = useBeforeAfterCases();
  const { data: page } = useSitePage('before-after');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useSEO({ title: page?.seo_title || 'Dental Before and After Results | Temelci Dental', description: page?.seo_description || 'View real dental transformations including veneers, implants, crowns and smile makeovers.', canonical: 'https://temelcidentist.com/en/before-after', ogImage: page?.og_image || undefined });

  const cases: DisplayCase[] = (dbCases || []).map(item => ({ id: item.id, title: item.title || 'Patient transformation', description: item.description || '', before: item.before_image, after: item.after_image, beforeAlt: item.before_alt || `Before ${item.title || 'dental treatment'}`, afterAlt: item.after_alt || `After ${item.title || 'dental treatment'}` }));

  const close = () => { setLightbox(null); document.body.style.overflow = ''; };
  const open = (index: number) => { setLightbox(index); document.body.style.overflow = 'hidden'; };
  const move = (offset: number) => setLightbox(current => current === null ? null : (current + offset + cases.length) % cases.length);

  return <>
    <section className="section-padding bg-secondary/30"><div className="container-dental text-center"><div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">Real patients · Published with consent</div><h1 className="heading-display mb-4">{page?.hero_title || t.beforeAfterTitle}</h1><p className="text-body max-w-2xl mx-auto">{page?.hero_description || t.beforeAfterSubtitle}</p>{cases.length > 0 && <p className="mt-5 text-sm text-muted-foreground"><strong className="text-primary">{cases.length}</strong> documented {cases.length === 1 ? 'transformation' : 'transformations'}</p>}</div></section>
    <section className="bg-primary py-5"><div className="container-dental px-4 flex flex-wrap items-center justify-center gap-4"><p className="text-primary-foreground font-medium text-sm">Ready to start your transformation?</p><WhatsAppButton text={t.sendSmilePhotos} variant="hero" /></div></section>
    <section className="section-padding bg-background"><div className="container-dental">{cases.length === 0 ? <div className="rounded-2xl border bg-card p-10 text-center"><h2 className="font-display text-2xl font-semibold">New clinical cases are being prepared</h2><p className="text-muted-foreground mt-2 max-w-xl mx-auto">Only cases with documented patient consent are published here. Contact our team to discuss results relevant to your treatment.</p></div> : <div className="ba-grid">{cases.map((item, index) => <motion.button type="button" key={item.id} className="ba-card text-left" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: (index % 4) * 0.06, duration: 0.4 }} onClick={() => open(index)}><div className="ba-img-wrap"><div className="grid grid-cols-2 h-full"><div className="relative"><img src={item.before} alt={item.beforeAlt} className="ba-img" loading="lazy" /><span className="absolute left-2 bottom-2 ba-badge ba-badge--before">Before</span></div><div className="relative"><img src={item.after} alt={item.afterAlt} className="ba-img" loading="lazy" /><span className="absolute right-2 bottom-2 ba-badge ba-badge--after">After</span></div></div><div className="ba-overlay"><span className="ba-zoom">View case</span></div></div><div className="ba-card-footer"><span className="ba-patient">{item.title}</span><span className="ba-cta-link">See transformation →</span></div></motion.button>)}</div>}</div></section>
    <AnimatePresence>{lightbox !== null && <motion.div className="ba-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}><button className="ba-lb-close" onClick={close} aria-label="Close"><X size={22} /></button><button className="ba-lb-prev" onClick={event => { event.stopPropagation(); move(-1); }} aria-label="Previous"><ChevronLeft size={28} /></button><motion.div key={lightbox} className="ba-lb-content" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={event => event.stopPropagation()}>{cases[lightbox].after ? <div className="grid grid-cols-2"><img src={cases[lightbox].before} alt={cases[lightbox].beforeAlt} className="ba-lb-img" /><img src={cases[lightbox].after} alt={cases[lightbox].afterAlt} className="ba-lb-img" /></div> : <img src={cases[lightbox].before} alt={cases[lightbox].beforeAlt} className="ba-lb-img" />}<div className="ba-lb-footer"><div><strong>{cases[lightbox].title}</strong>{cases[lightbox].description && <p className="text-sm opacity-70 mt-1">{cases[lightbox].description}</p>}</div><span className="ba-lb-counter">{lightbox + 1} / {cases.length}</span></div></motion.div><button className="ba-lb-next" onClick={event => { event.stopPropagation(); move(1); }} aria-label="Next"><ChevronRight size={28} /></button></motion.div>}</AnimatePresence>
    <section className="section-padding bg-primary text-center"><div className="container-dental"><h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">{t.footerCta}</h2><p className="text-primary-foreground/70 mb-6 text-sm">Send us your smile photos for a free personalised assessment.</p><WhatsAppButton text={t.freeConsultation} variant="hero" /></div></section>
  </>;
}
