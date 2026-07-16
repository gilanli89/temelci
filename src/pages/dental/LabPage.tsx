import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, CheckCircle2, Crown, FlaskConical, Monitor, ScanLine } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useSitePage } from '@/hooks/useCmsContent';
import { QuoteButton } from '@/components/dental/QuoteButton';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';

const workflow = [
  { icon: ScanLine, title: 'Digital records', text: 'Clinical scans, photographs and treatment requirements are shared directly with the restorative team.' },
  { icon: Monitor, title: 'Restoration design', text: 'Proportions, function, material and shade are reviewed alongside the dentist’s treatment plan.' },
  { icon: FlaskConical, title: 'In-house coordination', text: 'Close communication supports efficient technical review and any clinically required adjustments.' },
  { icon: CheckCircle2, title: 'Clinical verification', text: 'Every restoration is assessed for fit, function and appearance before final placement.' },
];

const capabilities = [
  { title: 'Ceramic crowns and bridges', text: 'Restorations planned for strength, fit and natural appearance.', image: '/treatments/crowns.webp' },
  { title: 'Zirconia restorations', text: 'Metal-free restorative options selected according to each clinical indication.', image: '/treatments/zirconia-crowns.webp' },
  { title: 'Veneers and smile design', text: 'Dentist-led aesthetic planning with attention to facial proportions and natural tooth character.', image: '/treatments/veneers.webp' },
  { title: 'Implant-supported restorations', text: 'Prosthetic coordination for single implants and selected full-arch rehabilitation cases.', image: '/treatments/all-on-4.webp' },
];

export default function LabPage() {
  const { data: page } = useSitePage('lab');
  const heroImage = page?.hero_image || '/treatments/zirconia-crowns.webp';
  const title = page?.hero_title || 'In-House Dental Laboratory';
  const description = page?.hero_description || 'Closer communication between dentist and dental technician for carefully planned crowns, veneers, bridges and implant-supported restorations.';

  useSEO({
    title: page?.seo_title || 'In-House Dental Laboratory in Kyrenia | Temelci Dental',
    description: page?.seo_description || 'Discover Temelci Dental’s in-house dental laboratory and digital restorative workflow for crowns, veneers, bridges and implant-supported restorations.',
    canonical: 'https://temelcidentist.com/en/lab',
    ogImage: page?.og_image || heroImage,
    ogImageAlt: 'Temelci Dental in-house dental laboratory in Kyrenia',
  });

  return (
    <>
      <section className="relative min-h-[520px] flex items-end overflow-hidden">
        <img src={heroImage} alt="Dental restoration created through Temelci Dental's in-house laboratory workflow" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/65 to-foreground/15" />
        <div className="relative container-dental section-padding text-background">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-background/70">
            <Link to="/en" className="hover:text-background">Home</Link><span className="mx-2">/</span><span>Dental Lab</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <FlaskConical className="h-4 w-4" /> {page?.eyebrow || 'On-site restorative coordination'}
            </div>
            <h1 className="heading-display mt-5 text-background">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/80">{description}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-dental">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="heading-section">From clinical plan to final restoration</h2>
            <p className="text-body mt-4">An in-house workflow keeps restorative communication close to the clinical team. Treatment timing and material choice remain individual and are confirmed after examination.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflow.map((step, index) => {
              const Icon = step.icon;
              return <motion.article key={step.title} className="rounded-2xl border bg-card p-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </motion.article>;
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl"><h2 className="heading-section">Restorative capabilities</h2><p className="text-body mt-3">Laboratory work is prescribed and clinically supervised by the treating dentist.</p></div>
            <Link to="/en/treatments" className="font-semibold text-primary hover:underline">Explore all treatments →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {capabilities.map(item => <article key={item.title} className="group overflow-hidden rounded-2xl border bg-card">
              <div className="aspect-[16/8] overflow-hidden"><img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" /></div>
              <div className="p-6"><div className="flex items-center gap-2"><Crown className="h-5 w-5 text-primary" /><h3 className="font-display text-xl font-semibold">{item.title}</h3></div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <Box className="mx-auto h-10 w-10 text-primary-foreground/80" />
          <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground">Discuss your restorative treatment</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/75">Request a personal consultation to understand suitable options, clinical stages and expected timelines.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3"><QuoteButton text="Request a Treatment Plan" variant="hero" /><WhatsAppButton text="Contact on WhatsApp" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" /></div>
        </div>
      </section>
    </>
  );
}

