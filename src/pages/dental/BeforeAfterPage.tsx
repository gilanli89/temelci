import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// All real patient transformation photos
const PHOTOS = [
  '0ad4ff41-7018-4a2f-ab46-3d2b3e03b0d3',
  '17b04872-8be2-4178-8c6b-3cdcc6a1d785',
  '186bdd23-e3f9-4bfe-964c-4f20ed3961cf',
  '57569988-b29f-42b5-89ae-3372ab70ca25',
  '726e0e62-0238-4818-ac8a-5fb8ca62307d',
  '7cf9114c-3299-4035-b697-319f71997db8',
  '7d99b736-e247-4ebb-a2de-0c2f592d7c77',
  '867582d9-d83f-474a-b870-e3408c6db19d',
  '9bd5abe9-6ad1-4405-be64-4ef8f48daa29',
  'a3d56cd6-1d6a-459e-8ae9-8a5902857555',
  'aa6358a7-b7f4-4632-b938-9b086da8c0da',
  'abd961a5-5e43-4de8-897f-b47c6af63c58',
  'b27a4664-9fb3-43b8-98ce-f4204cb3c276',
  'c787189d-6ab0-4c59-b98a-d24e855f8dab',
  'cb699295-5a79-4db8-8e81-e6b6bc7709b6',
  'ddfb7d08-56d0-4e1d-a20b-f123df75acf4',
  'e8ad5d1c-2ee3-45aa-8b7f-9f82f219c91d',
  '13fcb17b-404c-4734-b09a-566904226dca',
  '31d7a40c-aca0-44aa-8c8a-362ee7f34ce6',
  '6d0c1229-8828-4d4b-9ef9-dee1034daad8',
  'b095ae4e-2032-4ebe-8e97-2c1da87b17ac',
  'cf48e8dc-e7ef-4496-b3c0-0f7addeff932',
  '06257fd5-da93-48df-8f53-33c05c377f19',
  '88c7d9c6-4ccd-4f01-b51e-7e2cbba02441',
  'e07d6178-a35b-499e-a357-8ee30a7a6b8a',
  'e4e19a96-d290-4e3c-9220-4c0ca901c340',
  'a9dd8387-a41f-477c-bcb2-3eeccdf2bc19',
  'e2f32e9d-d634-4f12-a8db-af6d1abcc0ca',
  '472ae5f2-803e-4a45-b74d-8bb12d091b66',
  'a3d56cd6-1d6a-459e-8ae9-8a5902857555-1',
];

// Lazy import all images
const imageModules = import.meta.glob('../../assets/before-after/*.jpg', { eager: true, as: 'url' });

function getImg(id: string): string {
  const key = Object.keys(imageModules).find(k => k.includes(id));
  return key ? (imageModules[key] as string) : '';
}

const BeforeAfterPage = () => {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => {
    setLightbox(i);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };
  const prev = () => lightbox !== null && setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length);
  const next = () => lightbox !== null && setLightbox((lightbox + 1) % PHOTOS.length);

  return (
    <>
      {/* HERO */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
            ✦ Real Patients · Real Results
          </div>
          <h1 className="heading-display mb-4">{t.beforeAfterTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.beforeAfterSubtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">{PHOTOS.length}+</span> Transformations</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">35+</span> Years Experience</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">10,000+</span> Happy Patients</span>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-primary py-5">
        <div className="container-dental px-4 flex flex-wrap items-center justify-center gap-4">
          <p className="text-primary-foreground font-medium text-sm">Ready to start your transformation?</p>
          <WhatsAppButton text={t.sendSmilePhotos} variant="hero" />
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <div className="ba-grid">
            {PHOTOS.map((id, i) => (
              <motion.div
                key={id}
                className="ba-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.4 }}
                onClick={() => openLightbox(i)}
              >
                <div className="ba-img-wrap">
                  <img
                    src={getImg(id)}
                    alt={`Patient transformation ${i + 1}`}
                    className="ba-img"
                    loading="lazy"
                  />
                  <div className="ba-overlay">
                    <div className="ba-overlay-badges">
                      <span className="ba-badge ba-badge--before">{t.before}</span>
                      <span className="ba-arrow">→</span>
                      <span className="ba-badge ba-badge--after">{t.after}</span>
                    </div>
                    <span className="ba-zoom">🔍 View</span>
                  </div>
                </div>
                <div className="ba-card-footer">
                  <span className="ba-patient">Patient #{i + 1}</span>
                  <span className="ba-cta-link">See transformation →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="ba-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="ba-lb-close" onClick={closeLightbox}><X size={22} /></button>
            <button className="ba-lb-prev" onClick={e => { e.stopPropagation(); prev(); }}><ChevronLeft size={28} /></button>
            <motion.div
              key={lightbox}
              className="ba-lb-content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={getImg(PHOTOS[lightbox])}
                alt={`Transformation ${lightbox + 1}`}
                className="ba-lb-img"
              />
              <div className="ba-lb-footer">
                <div className="ba-lb-badges">
                  <span className="ba-badge ba-badge--before">{t.before}</span>
                  <span className="ba-arrow">→</span>
                  <span className="ba-badge ba-badge--after">{t.after}</span>
                </div>
                <span className="ba-lb-counter">{lightbox + 1} / {PHOTOS.length}</span>
              </div>
            </motion.div>
            <button className="ba-lb-next" onClick={e => { e.stopPropagation(); next(); }}><ChevronRight size={28} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">{t.footerCta}</h2>
          <p className="text-primary-foreground/70 mb-6 text-sm">Send us your smile photos for a free personalised assessment</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <WhatsAppButton text={t.freeConsultation} variant="hero" />
            <WhatsAppButton text={t.sendSmilePhotos} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BeforeAfterPage;
