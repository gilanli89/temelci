import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { ChevronLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { ARTICLE_CONTENT } from './BlogArticleData';
import implantImg from '@/assets/dental-implant.jpg';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, localePath, t } = useLanguage();
  const l = lang === 'tr' ? 'tr' : 'en';

  const article = slug ? ARTICLE_CONTENT[slug] : null;

  if (!article) {
    return (
      <div className="section-padding container-dental text-center">
        <h1 className="heading-display mb-4">Article Not Found</h1>
        <Link to={localePath('/blog')} className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  // Render markdown-style bold text
  const renderBody = (text: string) => {
    const paragraphs = text.split('\n\n').filter(Boolean);
    return paragraphs.map((para, i) => {
      if (para.startsWith('**') && para.includes('**\n')) {
        // Section with bold heading
        const bold = para.match(/\*\*(.*?)\*\*/)?.[1];
        const rest = para.replace(/\*\*.*?\*\*\n?/, '').trim();
        return (
          <div key={i} className="mb-4">
            {bold && <p className="font-bold text-foreground mb-1">{bold}</p>}
            {rest && <p className="text-muted-foreground leading-relaxed">{rest}</p>}
          </div>
        );
      }
      if (para.startsWith('---')) {
        return <hr key={i} className="my-6 border-border" />;
      }
      // Handle bold inline
      const parts = para.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img src={article.img} alt={article.title[l]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-8">
          <div className="container-dental max-w-3xl">
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full mb-3">
              <Tag className="h-3 w-3" />{article.category[l]}
            </span>
            <h1 className="text-2xl md:text-4xl font-display font-black text-white leading-tight">
              {article.title[l]}
            </h1>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="bg-secondary/30 border-b border-border">
        <div className="container-dental max-w-3xl px-4 py-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <Link to={localePath('/blog')} className="flex items-center gap-1 hover:text-primary transition-colors font-medium">
              <ChevronLeft className="h-3.5 w-3.5" />
              {l === 'tr' ? 'Blog\'a Dön' : 'Back to Blog'}
            </Link>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{article.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />
              {new Date(article.date).toLocaleDateString(l === 'tr' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime[l]}</span>
          </div>
        </div>
      </section>

      {/* Article content */}
      <article className="section-padding bg-background">
        <div className="container-dental max-w-3xl">

          {/* Intro / excerpt */}
          <motion.p
            className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-10 font-medium border-l-4 border-primary pl-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          >
            {article.excerpt[l]}
          </motion.p>

          {/* Sections */}
          {article.sections.map((section: any, i: number) => (
            <motion.section
              key={i}
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4 pb-2 border-b border-border">
                {section.heading[l]}
              </h2>
              <div className="prose-like">
                {renderBody(section.body[l])}
              </div>
            </motion.section>
          ))}

          {/* Author card */}
          <div className="mt-12 p-6 bg-secondary/30 border border-border rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
              {article.author.split(' ').map((w: string) => w[0]).slice(-2).join('')}
            </div>
            <div>
              <p className="font-display font-bold text-foreground">{article.author}</p>
              <p className="text-sm text-muted-foreground">{article.authorTitle} · Temelci Dental, Kyrenia</p>
            </div>
          </div>

        </div>
      </article>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-display font-black text-primary-foreground mb-3">
              {l === 'tr' ? 'Tedavinizi Planlamaya Hazır Mısınız?' : 'Ready to Plan Your Treatment?'}
            </h2>
            <p className="text-primary-foreground/75 mb-6 max-w-lg mx-auto">
              {l === 'tr'
                ? 'WhatsApp\'ta gülüş fotoğrafınızı veya röntgeninizi gönderin — 24 saat içinde kişisel plan hazırlayalım.'
                : 'Send your smile photo or X-ray on WhatsApp — we\'ll have your personalised plan ready within 24 hours.'}
            </p>
            <WhatsAppButton
              text={l === 'tr' ? 'WhatsApp\'tan Yazın' : 'Message Us on WhatsApp'}
              variant="hero"
              message={`Hi, I read your article "${article.title.en}" and I'd like to find out more about treatment at Temelci Dental.`}
            />
          </motion.div>
        </div>
      </section>

      {/* Related articles suggestion */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-3xl">
          <h3 className="font-display font-bold text-foreground mb-6">
            {l === 'tr' ? 'Diğer Makaleler' : 'More Articles'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.values(ARTICLE_CONTENT)
              .filter((a: any) => a.slug !== slug)
              .slice(0, 3)
              .map((a: any) => (
                <Link key={a.slug} to={localePath(`/blog/${a.slug}`)}
                  className="bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all group">
                  <span className="text-xs font-bold text-primary block mb-1">{a.category[l]}</span>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {a.title[l]}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
