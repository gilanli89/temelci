import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Star } from 'lucide-react';

const ReviewsPage = () => {
  const { t } = useLanguage();

  const reviews = [
    { name: 'Sarah M.', country: '🇬🇧 UK', text: 'Dr. Temelci transformed my smile completely. The Hollywood Smile treatment was painless and the results are stunning! I couldn\'t be happier with my new smile.', rating: 5 },
    { name: 'Ahmed K.', country: '🇸🇦 Saudi Arabia', text: 'I traveled from Riyadh for dental implants. Best decision ever. Professional clinic, amazing results, and the VIP treatment was incredible.', rating: 5 },
    { name: 'Hans W.', country: '🇩🇪 Germany', text: 'Incredible quality at a fraction of German prices. My zirconia crowns look perfectly natural. The whole team was professional and caring.', rating: 5 },
    { name: 'Elena P.', country: '🇷🇺 Russia', text: 'Полностью довольна результатом. Виниры выглядят потрясающе. Доктор Темельджи — настоящий профессионал. Рекомендую всем!', rating: 5 },
    { name: 'Maria G.', country: '🇬🇷 Greece', text: 'Εξαιρετική εμπειρία! Ο Δρ. Τεμελτζί είναι εξαιρετικός επαγγελματίας. Το αποτέλεσμα ξεπέρασε τις προσδοκίες μου.', rating: 5 },
    { name: 'David L.', country: '🇮🇱 Israel', text: 'הטיפול היה מצוין. ד"ר טמלג\'י הוא רופא שיניים מעולה. התוצאות מדהימות והמחירים הרבה יותר טובים מישראל.', rating: 5 },
    { name: 'Fatima A.', country: '🇦🇪 UAE', text: 'Amazing experience from start to finish. The clinic is modern, clean, and the staff speaks multiple languages. My smile has never looked better!', rating: 5 },
    { name: 'Michael B.', country: '🇬🇧 UK', text: 'Had 20 veneers done and the result is absolutely perfect. The digital smile design was spot on. Worth every penny of the flight!', rating: 5 },
    { name: 'Olga S.', country: '🇷🇺 Russia', text: 'Прилетела из Москвы специально для лечения. Клиника на высшем уровне, результат превзошёл все ожидания.', rating: 5 },
    { name: 'Mehmet Y.', country: '🇹🇷 Turkey', text: 'Kıbrıs\'ın en iyi diş hekimi. Hollywood Smile yaptırdım, sonuç mükemmel. Herkese tavsiye ederim.', rating: 5 },
  ];

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.reviewsTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.reviewsSubtitle}</p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-lg font-bold">4.9/5</span>
            <span className="text-muted-foreground text-sm">Google Reviews</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-dental">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={i} className="bg-card rounded-2xl p-6 border border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 mb-4 italic leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{r.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps Reviews Embed */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl text-center">
          <h2 className="heading-section mb-6">{t.findOnMaps}</h2>
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5!2d33.36!3d35.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDExJzI0LjAiTiAzM8KwMjEnMzYuMCJF!5e0!3m2!1sen!2s!4v1"
              width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title="Google Maps" />
          </div>
        </div>
      </section>

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
