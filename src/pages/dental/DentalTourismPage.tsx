import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import {
  Plane, Hotel, Car, Shield, Star, Clock, MapPin, Check,
  TrendingDown, Users, Award, HeartPulse, CalendarCheck, ChevronRight
} from 'lucide-react';
import heroImg from '@/assets/hero-clinic.jpg';
import hollywoodImg from '@/assets/hollywood-smile.jpg';
import implantImg from '@/assets/dental-implant.jpg';
import veneersImg from '@/assets/veneers.jpg';

// ── copy ──────────────────────────────────────────────────────────────────────
const copy = {
  en: {
    badge: 'Dental Tourism · North Cyprus',
    hero: 'World-Class Dentistry.\nHalf the Price.',
    heroSub: 'Join thousands of patients from the UK, Germany and across Europe who choose Temelci Dental for premium care — and keep more money in their pocket.',
    ctaMain: 'Get My Free Quote',
    ctaSecond: 'View Before & After',
    savingsTitle: 'How Much Can You Save?',
    savingsSub: 'Prices in Northern Cyprus are typically 60–70% lower than Western Europe — even after flights and accommodation.',
    journeyTitle: 'Your Journey, Step by Step',
    journeySub: 'From first contact to your new smile — we handle everything.',
    stayTitle: 'Where to Stay in Kyrenia',
    staySub: 'Kyrenia (Girne) is one of the Mediterranean\'s most beautiful coastal towns. We work with carefully selected hotels to ensure your stay is as comfortable as your treatment.',
    whyTitle: 'Why Patients Choose Us',
    whySub: '180 years of combined clinical experience. One clinic. Uncompromising standards.',
    faqTitle: 'Frequently Asked Questions',
    ctaFinalTitle: 'Ready to Transform Your Smile?',
    ctaFinalSub: 'Send us a photo of your smile on WhatsApp — we\'ll reply with a personalised quote within 24 hours. No obligation.',
  },
  tr: {
    badge: 'Diş Turizmi · Kuzey Kıbrıs',
    hero: 'Dünya Standartlarında Diş.\nYarı Fiyatına.',
    heroSub: 'İngiltere, Almanya ve tüm Avrupa\'dan binlerce hastaya katılın — birinci sınıf tedavi, cebinizde kalan para.',
    ctaMain: 'Ücretsiz Teklif Al',
    ctaSecond: 'Öncesi & Sonrası',
    savingsTitle: 'Ne Kadar Tasarruf Edersiniz?',
    savingsSub: 'Kuzey Kıbrıs\'taki fiyatlar Batı Avrupa\'ya kıyasla genellikle %60–70 daha düşük.',
    journeyTitle: 'Adım Adım Yolculuğunuz',
    journeySub: 'İlk iletişimden yeni gülüşünüze — her şeyi biz hallederiz.',
    stayTitle: 'Girne\'de Nerede Kalınır',
    staySub: 'Girne, Akdeniz\'in en güzel kıyı kasabalarından biridir.',
    whyTitle: 'Hastalar Neden Bizi Seçiyor',
    whySub: '180 yıllık toplam klinik deneyim. Tek klinik. Taviz verilmeyen standartlar.',
    faqTitle: 'Sık Sorulan Sorular',
    ctaFinalTitle: 'Gülüşünüzü Dönüştürmeye Hazır mısınız?',
    ctaFinalSub: 'WhatsApp\'ta gülüş fotoğrafınızı gönderin — 24 saat içinde kişisel teklifinizle yanıt verelim.',
  }
};

// ── savings data ───────────────────────────────────────────────────────────────
const SAVINGS = [
  {
    treatment: { en: 'Hollywood Smile (10 veneers)', tr: 'Hollywood Smile (10 veneer)' },
    uk: '£8,000–£15,000', cy: '£2,800–£4,200', save: '65%',
    img: hollywoodImg,
  },
  {
    treatment: { en: 'Single Dental Implant', tr: 'Tek Diş İmplantı' },
    uk: '£2,500–£3,500', cy: '£800–£1,200', save: '60%',
    img: implantImg,
  },
  {
    treatment: { en: 'Porcelain Veneers (6)', tr: 'Porselen Veneer (6 adet)' },
    uk: '£5,000–£9,000', cy: '£1,600–£2,400', save: '65%',
    img: veneersImg,
  },
];

// ── journey steps ─────────────────────────────────────────────────────────────
const JOURNEY = [
  {
    icon: HeartPulse,
    en: { title: 'Free Consultation', desc: 'Send photos on WhatsApp. We review and reply with a personalised treatment plan within 24 hours.' },
    tr: { title: 'Ücretsiz Konsültasyon', desc: 'WhatsApp\'tan fotoğraf gönderin. 24 saat içinde kişisel plan hazırlıyoruz.' },
  },
  {
    icon: Plane,
    en: { title: 'Fly to Kyrenia', desc: 'Direct flights from the UK, Germany and Russia. Ercan Airport is 40 minutes from the clinic. We arrange your VIP transfer.' },
    tr: { title: 'Girne\'ye Uçun', desc: 'İngiltere, Almanya ve Rusya\'dan direkt uçuşlar. Ercan Havalimanı klinikten 40 dakika.' },
  },
  {
    icon: Hotel,
    en: { title: 'Check In & Relax', desc: 'Stay in one of our partner hotels steps from the Mediterranean. Kyrenia old harbour, Castle, beaches — all within walking distance.' },
    tr: { title: 'Otele Yerleşin', desc: 'Akdeniz manzaralı partner otellerimizde konaklayın. Girne eski liman, Kale, plajlar — hepsi yürüme mesafesinde.' },
  },
  {
    icon: CalendarCheck,
    en: { title: 'Treatment Begins', desc: 'Digital smile design consultation on day one. Most treatments completed in 5–10 days by our team of 6 specialists.' },
    tr: { title: 'Tedavi Başlar', desc: 'İlk gün dijital gülüş tasarımı. Çoğu tedavi 5–10 günde 6 uzman hekimimizle tamamlanır.' },
  },
  {
    icon: Star,
    en: { title: 'New Smile, Happy Journey Home', desc: 'Full aftercare instructions, WhatsApp follow-up for 12 months, and a written treatment guarantee.' },
    tr: { title: 'Yeni Gülüşle Eve Dönüş', desc: 'Tam bakım talimatları, 12 ay WhatsApp takibi ve yazılı tedavi garantisi.' },
  },
];

// ── hotels ────────────────────────────────────────────────────────────────────
const HOTELS = [
  {
    name: 'The Colony Hotel Kyrenia',
    stars: 5,
    dist: { en: '8 min from clinic', tr: 'Klinikten 8 dk' },
    tag: { en: 'Old Harbour · Sea View', tr: 'Eski Liman · Deniz Manzarası' },
    highlight: { en: 'Historic 5★ right on the harbour. Rooftop pool, concierge, private beach access.', tr: 'Limana sıfır tarihi 5★ otel. Çatı havuzu, konsiyerj, özel plaj.' },
    price: { en: 'From £95/night', tr: '£95\'den başlayan fiyatlar' },
    badge: '⭐ Premium',
    color: 'border-gold/40 bg-gold/5',
  },
  {
    name: 'Dome Hotel',
    stars: 4,
    dist: { en: '10 min from clinic', tr: 'Klinikten 10 dk' },
    tag: { en: 'Central · Pool · Beach', tr: 'Merkezi · Havuz · Plaj' },
    highlight: { en: 'Iconic seafront hotel. Sea-view rooms, outdoor pool, spa, easy city access.', tr: 'İkonik deniz kenarı oteli. Deniz manzaralı odalar, açık havuz, spa.' },
    price: { en: 'From £65/night', tr: '£65\'den başlayan fiyatlar' },
    badge: '🏊 Pool & Spa',
    color: 'border-primary/30 bg-primary/5',
  },
  {
    name: 'Nostalgia Hotel',
    stars: 4,
    dist: { en: '5 min from clinic', tr: 'Klinikten 5 dk' },
    tag: { en: 'Boutique · City Centre', tr: 'Butik · Şehir Merkezi' },
    highlight: { en: 'Charming boutique hotel in the heart of Kyrenia. Walking distance to the clinic, restaurants and the castle.', tr: 'Girne\'nin kalbindeki butik otel. Kliniğe, restoranlara ve kaleye yürüme mesafesi.' },
    price: { en: 'From £45/night', tr: '£45\'den başlayan fiyatlar' },
    badge: '📍 Closest',
    color: 'border-border',
  },
  {
    name: 'Acapulco Resort',
    stars: 5,
    dist: { en: '15 min from clinic', tr: 'Klinikten 15 dk' },
    tag: { en: 'Resort · Beach · All-Inclusive', tr: 'Resort · Plaj · Her Şey Dahil' },
    highlight: { en: 'Large all-inclusive resort. Private beach, multiple pools, entertainment. Perfect if travelling with family.', tr: 'Büyük her şey dahil resort. Özel plaj, birden fazla havuz. Aileyle seyahat edenler için ideal.' },
    price: { en: 'From £85/night', tr: '£85\'den başlayan fiyatlar' },
    badge: '🌊 All-Inclusive',
    color: 'border-border',
  },
];

// ── why us ────────────────────────────────────────────────────────────────────
const WHY = [
  { icon: Award,      en: '180 Years Combined Experience', tr: '180 Yıl Toplam Deneyim',  sub: { en: '6 specialists, each a leader in their field', tr: '6 uzman, her biri alanının lideri' } },
  { icon: Shield,     en: 'Written Treatment Guarantee',  tr: 'Yazılı Tedavi Garantisi',  sub: { en: 'Your results are guaranteed in writing', tr: 'Sonuçlarınız yazılı olarak garanti edilir' } },
  { icon: TrendingDown,en:'Save 60–70% vs UK Prices',    tr: 'İngiltere\'ye Göre %60–70 Tasarruf', sub: { en: 'Premium care, fraction of Western prices', tr: 'Premium bakım, Batı fiyatlarının çok altında' } },
  { icon: Users,      en: '10,000+ Happy Patients',       tr: '10.000+ Mutlu Hasta',       sub: { en: 'Patients from UK, Germany, Russia, UAE', tr: 'İngiltere, Almanya, Rusya, BAE\'den hastalar' } },
  { icon: Car,        en: 'VIP Airport Transfer',         tr: 'VIP Havalimanı Transferi',  sub: { en: 'Picked up from Ercan or Larnaca Airport', tr: 'Ercan veya Larnaca havalimanından alım' } },
  { icon: Clock,      en: 'Smile in 5–10 Days',           tr: '5–10 Günde Gülüşünüze Kavuşun', sub: { en: 'Most treatments completed in one visit', tr: 'Çoğu tedavi tek ziyarette tamamlanır' } },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    en: { q: 'Is it safe to have dental treatment abroad?', a: 'Absolutely. Temelci Dental has been operating since 1990 and has treated thousands of international patients. Our team are trained at top European universities and use the same materials — Straumann implants, Vita ceramics — as clinics in London or Munich.' },
    tr: { q: 'Yurt dışında diş tedavisi yaptırmak güvenli mi?', a: '1990\'dan beri hizmet veren Temelci Dental, binlerce uluslararası hastayı ağırlamıştır. Ekibimiz Avrupa\'nın önde gelen üniversitelerinde eğitim almış ve Londra veya Münih kliniklerinde kullanılan aynı malzemeleri — Straumann implant, Vita seramik — kullanmaktadır.' },
  },
  {
    en: { q: 'How do I get to North Cyprus?', a: 'Fly to Ercan Airport (ECN) — direct from London Stansted, Birmingham, Manchester, Frankfurt and many other cities. Alternatively fly to Larnaca (LCA) in South Cyprus and cross the border by taxi (1 hour). We arrange your transfer from either airport.' },
    tr: { q: 'Kuzey Kıbrıs\'a nasıl gelinir?', a: 'Ercan Havalimanı\'na (ECN) uçun — Londra Stansted, Birmingham, Manchester, Frankfurt ve pek çok şehirden direkt bağlantı var. Alternatif olarak Larnaca\'ya (LCA) uçup taksiyle sınırı geçebilirsiniz (1 saat). Her iki havalimanından transferinizi biz ayarlıyoruz.' },
  },
  {
    en: { q: 'What is included in the treatment price?', a: 'All consultations, X-rays (including 3D CBCT where needed), the treatment itself, follow-up appointments during your stay, and 12-month remote aftercare via WhatsApp. Hotel and flights are arranged separately; we can recommend and assist with bookings.' },
    tr: { q: 'Tedavi fiyatına ne dahil?', a: 'Tüm konsültasyonlar, röntgenler (gerektiğinde 3D CBCT dahil), tedavinin kendisi, konaklama süresindeki kontrol randevuları ve WhatsApp üzerinden 12 aylık uzaktan bakım. Otel ve uçuşlar ayrı ayarlanır; rezervasyon konusunda yardımcı oluruz.' },
  },
  {
    en: { q: 'What if I need follow-up treatment after returning home?', a: 'We provide written aftercare instructions and stay in touch via WhatsApp for 12 months. In the rare event of an issue, we work with partner dental practices in the UK and Germany. Your treatment also comes with a written guarantee.' },
    tr: { q: 'Eve döndükten sonra takip tedavisi gerekirse ne olur?', a: 'Yazılı bakım talimatları veriyoruz ve 12 ay boyunca WhatsApp\'tan iletişim kuruyoruz. Nadir sorunlarda İngiltere ve Almanya\'daki partner kliniklerle iş birliği yapıyoruz. Tedaviniz ayrıca yazılı garanti kapsamındadır.' },
  },
];

// ── component ──────────────────────────────────────────────────────────────────
export default function DentalTourismPage() {
  const { lang, t, localePath } = useLanguage();
  const l = lang === 'tr' ? 'tr' : 'en';
  const c = copy[l];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay },
  });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Temelci Dental Kyrenia" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />

        {/* floating trust pill */}
        <motion.div
          className="absolute top-28 right-6 md:right-16 hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4"
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
        >
          <div className="text-3xl font-bold text-white">180</div>
          <div className="text-white/80 text-xs leading-tight">
            {l === 'tr' ? 'Yıl Toplam\nKlinik Deneyim' : 'Years Combined\nClinical Experience'}
          </div>
        </motion.div>

        <div className="relative z-10 container-dental px-6 md:px-8 py-24">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              <Plane className="h-3.5 w-3.5" /> {c.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-[1.05] whitespace-pre-line">
              {c.hero}
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              {c.heroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <WhatsAppButton text={c.ctaMain} variant="hero" message="Hi, I'm interested in dental tourism at Temelci Dental. Could you send me a quote?" />
              <a href={localePath(`/${t.beforeAfterSlug}`)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                {c.ctaSecond} <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* quick stats row */}
            <div className="flex flex-wrap gap-6 mt-12">
              {[
                { v: '60–70%', l: { en: 'Average Savings', tr: 'Ortalama Tasarruf' } },
                { v: '5–10', l: { en: 'Days Treatment', tr: 'Gün Tedavi' } },
                { v: '34+', l: { en: 'Years Established', tr: 'Yıllık Klinik' } },
              ].map((s, i) => (
                <motion.div key={i} {...fadeUp(0.3 + i * 0.1)} className="text-white">
                  <div className="text-2xl font-display font-black text-primary">{s.v}</div>
                  <div className="text-white/60 text-xs mt-0.5">{s.l[l]}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SAVINGS COMPARISON ───────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
              <TrendingDown className="h-3.5 w-3.5" /> {l === 'tr' ? 'Fiyat Karşılaştırması' : 'Price Comparison'}
            </div>
            <h2 className="heading-section mb-3">{c.savingsTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{c.savingsSub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAVINGS.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-44 overflow-hidden">
                  <img src={item.img} alt={item.treatment[l]} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-4">{item.treatment[l]}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">🇬🇧 UK / Germany</span>
                      <span className="line-through text-muted-foreground/60">{item.uk}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground font-medium">🇨🇾 North Cyprus</span>
                      <span className="text-primary font-bold">{item.cy}</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                    <span className="text-primary font-black text-xl">Save {item.save}</span>
                    <span className="text-primary/70 text-xs block">{l === 'tr' ? 'Tipik tasarruf' : 'typical saving'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp(0.3)} className="text-center text-xs text-muted-foreground mt-6 max-w-xl mx-auto">
            {l === 'tr'
              ? '* Fiyatlar örnek niteliğindedir. Kişisel tedavi planınız için WhatsApp\'tan iletişime geçin.'
              : '* Prices are indicative. Contact us on WhatsApp for your personalised treatment plan.'}
          </motion.p>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ─────────────────────────────────────── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="heading-section mb-3">{c.journeyTitle}</h2>
            <p className="text-body max-w-xl mx-auto">{c.journeySub}</p>
          </motion.div>

          <div className="relative">
            {/* connecting line */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-border -translate-x-1/2" />

            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-1 md:gap-0">
              {JOURNEY.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    {...fadeUp(i * 0.1)}
                    className={`md:flex md:items-center md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} py-4`}
                  >
                    {/* content */}
                    <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow ${isLeft ? 'md:ml-auto' : ''} max-w-md ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
                        <div className="flex items-start gap-3 md:block">
                          <div className="md:hidden w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                              <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">Step {i + 1}</span>
                            </div>
                            <h3 className="font-display font-semibold text-foreground mb-1">{step[l].title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step[l].desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* center icon */}
                    <div className="hidden md:flex w-14 h-14 rounded-full bg-primary flex-shrink-0 items-center justify-center shadow-lg z-10 mx-auto">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>

                    {/* spacer */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCOMMODATION ────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-dental">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
              <Hotel className="h-3.5 w-3.5" /> {l === 'tr' ? 'Konaklama' : 'Accommodation'}
            </div>
            <h2 className="heading-section mb-3">{c.stayTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{c.staySub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOTELS.map((hotel, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className={`bg-card border-2 ${hotel.color} rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{hotel.badge}</span>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg">{hotel.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: hotel.stars }).map((_, s) => (
                        <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-bold text-sm">{hotel.price[l]}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{hotel.dist[l]}</span>
                  <span>{hotel.tag[l]}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{hotel.highlight[l]}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.3)} className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="text-foreground font-medium mb-2">
              {l === 'tr' ? '🏨 Otel rezervasyonunda yardım ister misiniz?' : '🏨 Need help booking your hotel?'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {l === 'tr'
                ? 'WhatsApp\'tan bize yazın — size en uygun seçeneği bulmakta yardımcı olalım.'
                : 'Message us on WhatsApp — we\'ll help you find the best option for your dates and budget.'}
            </p>
            <WhatsAppButton
              text={l === 'tr' ? 'Otel Önerisi İste' : 'Ask for Hotel Recommendation'}
              variant="outline"
              message="Hi, I'm planning dental treatment at Temelci. Could you help me with hotel recommendations?"
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="heading-section mb-3">{c.whyTitle}</h2>
            <p className="text-body max-w-2xl mx-auto">{c.whySub}</p>
          </motion.div>

          {/* 180 years hero stat */}
          <motion.div {...fadeUp(0.1)}
            className="bg-primary rounded-3xl p-10 text-center mb-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative z-10">
              <div className="text-8xl md:text-9xl font-display font-black text-primary-foreground leading-none mb-3">180</div>
              <div className="text-primary-foreground/80 text-xl md:text-2xl font-display font-semibold mb-2">
                {l === 'tr' ? 'Yıl Toplam Klinik Deneyim' : 'Years of Combined Clinical Experience'}
              </div>
              <p className="text-primary-foreground/60 text-sm max-w-lg mx-auto">
                {l === 'tr'
                  ? '6 uzman hekim · Her biri alanının liderliğini yapmış isimler · Tek bir klinik altında'
                  : '6 specialist doctors · Each a recognised leader in their field · Under one roof'}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} {...fadeUp(i * 0.08)}
                  className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm mb-1">{item[l]}</h3>
                    <p className="text-xs text-muted-foreground">{item.sub[l]}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-3xl">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="heading-section mb-3">{c.faqTitle}</h2>
          </motion.div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <motion.details key={i} {...fadeUp(i * 0.07)}
                className="bg-card border border-border rounded-2xl overflow-hidden group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-display font-semibold text-foreground text-sm md:text-base hover:text-primary transition-colors">
                  {faq[l].q}
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {faq[l].a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section className="section-padding bg-primary">
        <div className="container-dental px-4 text-center">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              <Check className="h-3.5 w-3.5" /> {l === 'tr' ? 'Ücretsiz · Bağlayıcı Değil' : 'Free · No Obligation'}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-primary-foreground mb-4">
              {c.ctaFinalTitle}
            </h2>
            <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto mb-8">
              {c.ctaFinalSub}
            </p>
            <WhatsAppButton
              text={l === 'tr' ? 'WhatsApp\'ta Fotoğraf Gönder →' : 'Send Your Smile Photo on WhatsApp →'}
              variant="hero"
              message="Hi! I'm interested in dental treatment in North Cyprus. Here are my smile photos for a quote."
            />
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-primary-foreground/60 text-xs">
              {['Reply within 24h', 'No hidden fees', 'Personalised plan', 'Trusted since 1990'].map(t2 => (
                <span key={t2} className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-primary-foreground/40" /> {t2}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
