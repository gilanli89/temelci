import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { BookOpen, GraduationCap, ChevronRight, Tag, Calendar, User } from 'lucide-react';
import { publications } from './ResearchPage';
import hollywoodSmileImg from '@/assets/hollywood-smile.jpg';
import implantImg from '@/assets/dental-implant.jpg';
import veneersImg from '@/assets/veneers.jpg';
import fullMouthImg from '@/assets/full-mouth-restoration.jpg';
import teethWhiteningImg from '@/assets/teeth-whitening.jpg';
import crownsImg from '@/assets/crowns.jpg';

// ── Blog articles ────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    slug: 'hollywood-smile-cyprus-guide',
    category: { en: 'Smile Design', tr: 'Gülüş Tasarımı' },
    img: hollywoodSmileImg,
    date: '2025-03-10',
    readTime: { en: '5 min read', tr: '5 dk okuma' },
    author: 'DT. Nural Temelci',
    title: { en: 'Hollywood Smile in Cyprus: What to Expect, How to Prepare', tr: 'Kıbrıs\'ta Hollywood Smile: Ne Beklenmeli, Nasıl Hazırlanılır' },
    excerpt: { en: 'Everything patients from the UK, Germany and beyond need to know before travelling to Kyrenia for their smile transformation.', tr: 'İngiltere, Almanya ve dünyanın dört bir yanından gelen hastaların Girne\'ye gülüş dönüşümü için seyahat etmeden önce bilmeleri gereken her şey.' },
  },
  {
    slug: 'dental-implants-vs-bridges',
    category: { en: 'Implants', tr: 'İmplant' },
    img: implantImg,
    date: '2025-02-18',
    readTime: { en: '6 min read', tr: '6 dk okuma' },
    author: 'DR. Ali Temelci',
    title: { en: 'Dental Implants vs Bridges: Which Is Right for You?', tr: 'Diş İmplantı mı, Köprü mü: Hangisi Size Uygun?' },
    excerpt: { en: 'Our oral surgeon explains the clinical and financial differences between the two most common options for replacing a missing tooth.', tr: 'Ağız cerrahımız eksik diş yerine koymanın en yaygın iki seçeneği arasındaki klinik ve finansal farkları açıklıyor.' },
  },
  {
    slug: 'veneers-vs-composite-bonding',
    category: { en: 'Aesthetics', tr: 'Estetik' },
    img: veneersImg,
    date: '2025-01-25',
    readTime: { en: '4 min read', tr: '4 dk okuma' },
    author: 'DR. DT. Şerife Köle',
    title: { en: 'Veneers vs Composite Bonding: Which Cosmetic Option is Better?', tr: 'Veneer mi, Kompozit Bonding mi: Hangi Estetik Seçenek Daha İyi?' },
    excerpt: { en: 'A clear, honest comparison from our prosthodontist to help you choose between porcelain veneers and composite bonding for your smile goals.', tr: 'Protetik uzmanımızdan gülüş hedefleriniz için porselen veneer ile kompozit bonding arasında seçim yapmanıza yardımcı olacak net, dürüst bir karşılaştırma.' },
  },
  {
    slug: 'all-on-4-complete-guide',
    category: { en: 'Implants', tr: 'İmplant' },
    img: fullMouthImg,
    date: '2025-01-08',
    readTime: { en: '7 min read', tr: '7 dk okuma' },
    author: 'DR. Ali Temelci',
    title: { en: 'All-on-4 Dental Implants: The Complete Patient Guide for 2025', tr: 'All-on-4 Diş İmplantları: 2025 İçin Kapsamlı Hasta Rehberi' },
    excerpt: { en: 'From candidacy assessment and surgery day to the final permanent bridge — what every All-on-4 patient needs to know before committing.', tr: 'Uygunluk değerlendirmesinden ameliyat gününe ve kalıcı köprüye kadar — her All-on-4 hastasının karar vermeden önce bilmesi gerekenler.' },
  },
  {
    slug: 'teeth-whitening-methods-compared',
    category: { en: 'Aesthetics', tr: 'Estetik' },
    img: teethWhiteningImg,
    date: '2024-12-15',
    readTime: { en: '4 min read', tr: '4 dk okuma' },
    author: 'DT. Yaşkan Uğurlu',
    title: { en: 'Professional Teeth Whitening vs Home Kits: What the Evidence Shows', tr: 'Profesyonel Diş Beyazlatma vs Evde Kullanılan Kitler: Kanıtlar Ne Gösteriyor' },
    excerpt: { en: 'Why professional in-clinic whitening achieves results that no over-the-counter product can match — and when home kits are a reasonable option.', tr: 'Profesyonel klinik içi beyazlatmanın neden hiçbir reçetesiz ürünün eşleşemeyeceği sonuçlar elde ettiği — ve evde kullanılan kitlerin ne zaman makul bir seçenek olduğu.' },
  },
  {
    slug: 'dental-tourism-north-cyprus-guide',
    category: { en: 'Dental Tourism', tr: 'Diş Turizmi' },
    img: crownsImg,
    date: '2024-11-20',
    readTime: { en: '8 min read', tr: '8 dk okuma' },
    author: 'Temelci Dental',
    title: { en: 'Dental Tourism in North Cyprus: Your Complete 2025 Guide', tr: 'Kuzey Kıbrıs\'ta Diş Turizmi: 2025 Kapsamlı Rehberiniz' },
    excerpt: { en: 'Everything about getting to Kyrenia, how to prepare for treatment, accommodation, what to expect clinically, and how to save 60–70% on dental work.', tr: 'Girne\'ye ulaşmaktan tedaviye hazırlanmaya, konaklamadan klinik sürecine ve diş hekimliğinde %60-70 tasarruf etmeye kadar her şey.' },
  },
];

const CATS_EN = ['All', 'Smile Design', 'Implants', 'Aesthetics', 'Dental Tourism'];
const CATS_TR = ['Tümü', 'Gülüş Tasarımı', 'İmplant', 'Estetik', 'Diş Turizmi'];

// ── component ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const { lang, t, localePath } = useLanguage();
  const l = lang === 'tr' ? 'tr' : 'en';
  const [activeTab, setActiveTab] = useState<'articles' | 'research'>('articles');
  const [activeCat, setActiveCat] = useState(0);

  const cats = l === 'tr' ? CATS_TR : CATS_EN;
  const filteredArticles = activeCat === 0
    ? ARTICLES
    : ARTICLES.filter(a => a.category[l] === cats[activeCat]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  });

  return (
    <>
      {/* HERO */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <motion.div {...fadeUp()}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              {l === 'tr' ? 'Bilgi & Araştırma' : 'Knowledge & Research'}
            </div>
            <h1 className="heading-display mb-4">
              {l === 'tr' ? 'Blog & Akademik Yayınlar' : 'Blog & Academic Publications'}
            </h1>
            <p className="text-body max-w-2xl mx-auto">
              {l === 'tr'
                ? 'Diş hekimliği hakkında uzman içerikleri, hasta rehberleri ve bilimsel araştırmalar'
                : 'Expert dental guides, patient articles and peer-reviewed research from our clinical team'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* TAB SWITCHER */}
      <section className="bg-card border-b border-border sticky top-16 md:top-20 z-30">
        <div className="container-dental px-4">
          <div className="flex gap-0">
            {[
              { key: 'articles', icon: BookOpen, en: 'Patient Articles', tr: 'Hasta Rehberleri' },
              { key: 'research', icon: GraduationCap, en: 'Academic Research', tr: 'Akademik Araştırmalar' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'articles' | 'research')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {l === 'tr' ? tab.tr : tab.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES TAB */}
      {activeTab === 'articles' && (
        <section className="section-padding bg-background">
          <div className="container-dental">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {cats.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCat(i)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCat === i
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, i) => (
                <motion.article key={article.slug} {...fadeUp(i * 0.07)}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={article.img} alt={article.title[l]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        <Tag className="h-3 w-3" />{article.category[l]}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.readTime[l]}</span>
                    </div>
                    <h2 className="font-display font-semibold text-foreground text-base mb-2 leading-snug line-clamp-2">
                      {article.title[l]}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt[l]}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.date).toLocaleDateString(l === 'tr' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* CTA after articles */}
            <motion.div {...fadeUp(0.3)} className="mt-14 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <h3 className="font-display font-bold text-foreground text-xl mb-2">
                {l === 'tr' ? 'Tedavi hakkında sorunuz mu var?' : 'Have a question about your treatment?'}
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                {l === 'tr'
                  ? 'WhatsApp üzerinden ücretsiz konsültasyon alın — 24 saat içinde yanıt garantisi.'
                  : 'Get a free consultation on WhatsApp — we reply within 24 hours.'}
              </p>
              <WhatsAppButton text={l === 'tr' ? 'Ücretsiz Konsültasyon Al' : 'Get Free Consultation'} variant="hero" />
            </motion.div>
          </div>
        </section>
      )}

      {/* RESEARCH TAB */}
      {activeTab === 'research' && (
        <section className="section-padding bg-background">
          <div className="container-dental">
            <motion.div {...fadeUp()} className="mb-10 bg-secondary/50 border border-border rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-foreground mb-1">
                  {l === 'tr' ? 'Akademik Yayınlar ve Araştırmalar' : 'Peer-Reviewed Academic Publications'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {l === 'tr'
                    ? 'Temelci Dental ekibinin SCI endeksli dergilerde ve uluslararası tıp yayınlarında yayımlanmış akademik çalışmaları.'
                    : 'Peer-reviewed research published by the Temelci Dental clinical team in SCI-indexed journals and international medical publications.'}
                </p>
              </div>
            </motion.div>

            <div className="space-y-5">
              {publications.map((pub, i) => (
                <motion.div key={pub.slug} {...fadeUp(i * 0.07)}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        pub.indexing === 'SCI'
                          ? 'bg-primary/15 text-primary'
                          : pub.type === 'book_chapter'
                          ? 'bg-amber-500/15 text-amber-700'
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {pub.indexing === 'SCI' ? '⭐ SCI Indexed' : pub.type === 'book_chapter' ? '📖 Book Chapter' : pub.type === 'conference' ? '🎤 Conference' : '📄 Publication'}
                      </span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">{pub.year}</span>
                    </div>
                    <Link
                      to={`/en/research/${pub.slug}`}
                      className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                    >
                      {l === 'tr' ? 'Detaylar →' : 'View Details →'}
                    </Link>
                  </div>

                  <h3 className="font-display font-semibold text-foreground mb-1 leading-snug">
                    {l === 'tr' && pub.titleTr ? pub.titleTr : pub.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    <span className="font-medium">{pub.authors}</span> · {pub.journal}
                    {pub.volume && <span> · {pub.volume}</span>}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {pub.abstract.substring(0, 220)}...
                  </p>

                  {pub.keywords && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {pub.keywords.slice(0, 5).map(kw => (
                        <span key={kw} className="text-xs bg-secondary/70 text-muted-foreground px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.3)} className="mt-10 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                {l === 'tr' ? 'Daha fazla akademik bilgi için hekimimizin profilini inceleyin' : 'For more academic detail, view our specialist\'s full profile'}
              </p>
              <Link to="/en/dr-serife-kole"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                Dr. Şerife Köle — Academic Profile <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
