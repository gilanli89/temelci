import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { QuoteButton } from '@/components/dental/QuoteButton';
import { Star } from 'lucide-react';
import { useReviews, useSitePage, useSiteSettings } from '@/hooks/useCmsContent';
import { useSEO } from '@/hooks/useSEO';

const ReviewsPage = () => {
  const { t, lang } = useLanguage();
  const { data: dbReviews } = useReviews();
  const { data: page } = useSitePage('reviews');
  const { data: settings } = useSiteSettings();

  const ui = {
    en: { title: 'Patient Reviews | Temelci Dental North Cyprus', description: 'Read published patient reviews about dental treatment and follow-up at Temelci Dental.', from: 'from', published: 'published', singular: 'review', plural: 'reviews', emptyTitle: 'Verified reviews are being prepared', emptyText: 'Reviews will appear here after their source and publication permission have been checked.' },
    de: { title: 'Patientenbewertungen | Temelci Dental Nordzypern', description: 'Lesen Sie veröffentlichte Patientenbewertungen über Zahnbehandlungen und Nachsorge bei Temelci Dental.', from: 'aus', published: 'veröffentlichten', singular: 'Bewertung', plural: 'Bewertungen', emptyTitle: 'Geprüfte Bewertungen werden vorbereitet', emptyText: 'Bewertungen erscheinen hier, nachdem Quelle und Veröffentlichungserlaubnis geprüft wurden.' },
    tr: { title: 'Hasta Yorumları | Temelci Dental Kuzey Kıbrıs', description: 'Temelci Dental’daki diş tedavisi ve takip süreci hakkında yayımlanmış hasta yorumlarını okuyun.', from: 'toplam', published: 'yayımlanmış', singular: 'yorum', plural: 'yorum', emptyTitle: 'Doğrulanmış yorumlar hazırlanıyor', emptyText: 'Kaynağı ve yayın izni kontrol edilen yorumlar burada yer alacaktır.' },
    he: { title: 'חוות דעת מטופלים | Temelci Dental', description: 'קראו חוות דעת שפורסמו על טיפולי שיניים ומעקב ב-Temelci Dental.', from: 'מתוך', published: 'שפורסמו', singular: 'חוות דעת', plural: 'חוות דעת', emptyTitle: 'חוות דעת מאומתות בהכנה', emptyText: 'חוות דעת יופיעו כאן לאחר בדיקת המקור והרשאת הפרסום.' },
    ru: { title: 'Отзывы пациентов | Temelci Dental Северный Кипр', description: 'Читайте опубликованные отзывы пациентов о лечении и наблюдении в Temelci Dental.', from: 'из', published: 'опубликованных', singular: 'отзыва', plural: 'отзывов', emptyTitle: 'Проверенные отзывы готовятся', emptyText: 'Отзывы появятся после проверки источника и разрешения на публикацию.' },
  }[lang];

  useSEO({
    title: lang === 'en' && page?.seo_title ? page.seo_title : ui.title,
    description: lang === 'en' && page?.seo_description ? page.seo_description : ui.description,
    canonical: `https://temelcidentist.com/${lang}/${t.reviewsSlug}`,
    ogImage: page?.og_image || undefined,
  });

  const reviews = (dbReviews || []).map(review => ({ name: review.patient_name, country: `${review.country_flag || ''} ${review.country || ''}`.trim(), text: review.content, rating: review.rating }));
  const averageRating = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : null;

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{lang === 'en' && page?.hero_title ? page.hero_title : t.reviewsTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{lang === 'en' && page?.hero_description ? page.hero_description : t.reviewsSubtitle}</p>
          {averageRating !== null && <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-lg font-bold">{averageRating.toFixed(1)}/5</span>
            <span className="text-muted-foreground text-sm">{ui.from} {reviews.length} {ui.published} {reviews.length === 1 ? ui.singular : ui.plural}</span>
          </div>}
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-dental">
          {reviews.length === 0 ? <div className="rounded-2xl border bg-card p-10 text-center"><h2 className="font-display text-2xl font-semibold">{ui.emptyTitle}</h2><p className="text-muted-foreground mt-2">{ui.emptyText}</p></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p lang="en" className="text-sm text-foreground/80 mb-4 italic leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{r.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>}
        </div>
      </section>

      {/* Optional location/review profile configured by the clinic owner. */}
      {settings?.maps_embed_url && <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl text-center">
          <h2 className="heading-section mb-6">{t.findOnMaps}</h2>
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src={settings.maps_embed_url}
              width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title="Google Maps" />
          </div>
        </div>
      </section>}

      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">{t.footerCta}</h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default ReviewsPage;
