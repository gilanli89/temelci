import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Download, ExternalLink, ArrowLeft, Check, FlaskConical, BookOpen } from 'lucide-react';
import { publications } from './ResearchPage';

const ResearchDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, localePath } = useLanguage();
  const isTr = lang === 'tr';

  const pub = publications.find(p => p.slug === slug);

  if (!pub) {
    return (
      <div className="section-padding container-dental text-center">
        <h1 className="heading-display">Publication not found</h1>
        <Link to={localePath('/research')} className="text-primary hover:underline">← Back to research</Link>
      </div>
    );
  }

  const typeLabels: Record<string, { en: string; tr: string; color: string }> = {
    journal:      { en: 'Peer-Reviewed Journal Article', tr: 'Hakemli Dergi Makalesi', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    book_chapter: { en: 'Book Chapter',                  tr: 'Kitap Bölümü',           color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    congress:     { en: 'Congress Publication',          tr: 'Kongre Bildirisi',        color: 'bg-purple-50 text-purple-700 border-purple-200' },
    case_report:  { en: 'Case Report',                   tr: 'Vaka Raporu',             color: 'bg-amber-50 text-amber-700 border-amber-200' },
  };

  const typeCfg = typeLabels[pub.type];

  // Schema.org JSON-LD for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": pub.title,
    "author": {
      "@type": "Person",
      "name": "Şerife Köle",
      "sameAs": "https://orcid.org/0000-0002-2479-6643",
      "affiliation": pub.affiliation
    },
    "datePublished": pub.year,
    "publisher": { "@type": "Organization", "name": pub.publisher },
    "isPartOf": { "@type": "Periodical", "name": pub.journal },
    "keywords": pub.keywords.join(', '),
    "abstract": pub.abstract,
  };

  return (
    <>
      {/* Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* BREADCRUMB */}
      <section className="bg-secondary/30 py-4">
        <div className="container-dental max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={localePath('/dr-serife-kole')} className="hover:text-primary transition-colors">Dr. Şerife Köle</Link>
            <span>/</span>
            <Link to={localePath('/research')} className="hover:text-primary transition-colors">{isTr ? 'Yayınlar' : 'Research'}</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{isTr ? pub.titleTr.slice(0, 60) : pub.title.slice(0, 60)}…</span>
          </div>
        </div>
      </section>

      {/* ARTICLE HEADER */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <Link to={localePath('/research')} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft size={14} /> {isTr ? 'Tüm yayınlar' : 'All publications'}
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${typeCfg.color}`}>
              {isTr ? typeCfg.tr : typeCfg.en}
            </span>
            <span className="text-xs font-bold text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-full">{pub.year}</span>
            {pub.indexing && (
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
                <FlaskConical size={10} className="inline mr-1" />{pub.indexing}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug mb-3">
            {isTr ? pub.titleTr : pub.title}
          </h1>

          {/* Citation block */}
          <div className="bg-secondary/50 border border-border rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{isTr ? 'Yazarlar' : 'Authors'}</p>
                <p className="font-medium">{pub.authors}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{isTr ? 'Dergi / Yayın' : 'Journal / Publisher'}</p>
                <p className="font-medium">{pub.journal}</p>
                {pub.publisher && <p className="text-xs text-muted-foreground">{pub.publisher}</p>}
                {pub.volume && <p className="text-xs text-muted-foreground">{pub.volume}</p>}
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{isTr ? 'Kurum' : 'Affiliation'}</p>
                <p className="text-sm text-muted-foreground">{pub.affiliation}</p>
              </div>
            </div>
          </div>

          {/* Download / DOI */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a href={pub.pdf} download
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
              <Download size={15} /> {isTr ? 'PDF İndir' : 'Download PDF'}
            </a>
            {pub.doi && (
              <a href={pub.doi} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
                <ExternalLink size={14} /> {isTr ? 'DOI Linki' : 'View DOI'}
              </a>
            )}
            <a href="https://orcid.org/0000-0002-2479-6643" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <ExternalLink size={14} /> ORCID
            </a>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-8">
            {pub.keywords.map(kw => (
              <span key={kw} className="text-xs bg-secondary text-muted-foreground border border-border px-2.5 py-1 rounded-full">{kw}</span>
            ))}
          </div>

          <div className="space-y-10">
            {/* Abstract */}
            <div>
              <h2 className="heading-section mb-4">{isTr ? 'Özet' : 'Abstract'}</h2>
              <p className="text-body leading-relaxed">{pub.abstract}</p>
            </div>

            {/* Methodology */}
            <div>
              <h2 className="heading-section mb-4">{isTr ? 'Metodoloji' : 'Methodology'}</h2>
              <p className="text-body leading-relaxed">{pub.methodology}</p>
            </div>

            {/* Key Findings */}
            <div>
              <h2 className="heading-section mb-4">{isTr ? 'Temel Bulgular' : 'Key Findings'}</h2>
              <div className="space-y-3">
                {pub.findings.map((finding, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-secondary/40 rounded-xl border border-border"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-foreground leading-relaxed">{finding}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Clinical Relevance */}
            <div>
              <h2 className="heading-section mb-4">{isTr ? 'Klinik Önemi' : 'Clinical Relevance'}</h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-body leading-relaxed">{pub.clinicalRelevance}</p>
              </div>
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-10 pt-8 border-t border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-lg font-bold text-rose-600 border border-rose-200 shrink-0">SK</div>
              <div>
                <p className="font-semibold text-foreground">DR. DT. Şerife Köle</p>
                <p className="text-sm text-primary">{isTr ? 'Protetik Diş Tedavisi Uzmanı' : 'Prosthodontist'}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isTr
                    ? 'Kıbrıs Sağlık ve Toplum Bilimleri Üniversitesi · Temelci Diş Kliniği, Girne · ORCID: 0000-0002-2479-6643'
                    : 'Cyprus Health and Social Sciences University · Temelci Dental, Kyrenia · ORCID: 0000-0002-2479-6643'}
                </p>
                <div className="flex gap-3 mt-2">
                  <Link to={localePath('/dr-serife-kole')} className="text-xs text-primary hover:underline font-semibold">
                    {isTr ? 'Tam akademik profil →' : 'Full academic profile →'}
                  </Link>
                  <Link to={localePath('/research')} className="text-xs text-muted-foreground hover:text-foreground font-semibold">
                    {isTr ? 'Diğer yayınlar →' : 'Other publications →'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related publications */}
      <section className="section-padding bg-secondary/20">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-6">{isTr ? 'İlgili Yayınlar' : 'Related Publications'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publications.filter(p => p.slug !== slug).slice(0, 4).map(p => (
              <Link key={p.slug} to={localePath(`/research/${p.slug}`)}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all">
                <div className="flex gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${typeLabels[p.type]?.color}`}>
                    {p.year}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{isTr ? p.titleTr : p.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.journal}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-xl md:text-2xl font-display font-bold text-primary-foreground mb-3">
            {isTr ? 'Bu Konuda Uzman Görüş Alın' : 'Get Expert Consultation on This Topic'}
          </h2>
          <p className="text-primary-foreground/70 mb-5 text-sm">
            {isTr ? 'Dr. Şerife Köle ile ücretsiz değerlendirme için WhatsApp\'tan ulaşın' : 'Reach out on WhatsApp for a free assessment with Dr. Şerife Köle'}
          </p>
          <WhatsAppButton text={isTr ? 'Ücretsiz Konsültasyon' : 'Free Consultation'} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default ResearchDetailPage;
