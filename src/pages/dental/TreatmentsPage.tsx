import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSitePage, useTreatments } from "@/hooks/useCmsContent";
import { useSEO } from "@/hooks/useSEO";
import { WhatsAppButton } from "@/components/dental/WhatsAppButton";
import {
  Activity,
  Award,
  CheckCircle,
  ChevronRight,
  Crown,
  Heart,
  Layers,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import implantImg from "@/assets/dental-implant.jpg";
import veneersImg from "@/assets/veneers.jpg";
import crownsImg from "@/assets/crowns.jpg";
import hollywoodSmileImg from "@/assets/hollywood-smile.jpg";
import teethWhiteningImg from "@/assets/teeth-whitening.jpg";
import zirconiaCrownsImg from "@/assets/zirconia-crowns.jpg";
import smileMakeoverImg from "@/assets/smile-makeover.jpg";
import fullMouthImg from "@/assets/full-mouth-restoration.jpg";

const iconMap = {
  sparkle: Sparkles,
  star: Star,
  shield: Shield,
  award: Award,
  crown: Crown,
  heart: Heart,
  zap: Zap,
  layers: Layers,
  activity: Activity,
  check: CheckCircle,
};

const TreatmentsPage = () => {
  const { t, localePath } = useLanguage();
  const { data: dbTreatments, isError: treatmentsError } = useTreatments();
  const { data: page } = useSitePage("treatments");

  useSEO({
    title: page?.seo_title || `${t.treatmentsTitle} | Temelci Dental`,
    description: page?.seo_description || t.treatmentsSubtitle,
    canonical: "https://temelcidentist.com/en/treatments",
    ogImage: page?.og_image || page?.hero_image || undefined,
  });

  const fallback = [
    {
      slug: t.hollywoodSmileSlug,
      title: t.hollywoodSmile,
      description: t.hollywoodSmileDesc,
      featured_image: hollywoodSmileImg,
      category: "Aesthetic & Smile Design",
      category_slug: "aesthetic",
      icon: "sparkle",
    },
    {
      slug: t.veneersSlug,
      title: t.veneers,
      description: t.veneersDesc,
      featured_image: veneersImg,
      category: "Aesthetic & Smile Design",
      category_slug: "aesthetic",
      icon: "star",
    },
    {
      slug: t.teethWhiteningSlug,
      title: t.teethWhitening,
      description: t.teethWhiteningDesc,
      featured_image: teethWhiteningImg,
      category: "Aesthetic & Smile Design",
      category_slug: "aesthetic",
      icon: "zap",
    },
    {
      slug: t.smileMakeoverSlug,
      title: t.smileMakeover,
      description: t.smileMakeoverDesc,
      featured_image: smileMakeoverImg,
      category: "Aesthetic & Smile Design",
      category_slug: "aesthetic",
      icon: "heart",
    },
    {
      slug: t.implantsSlug,
      title: t.dentalImplants,
      description: t.dentalImplantsDesc,
      featured_image: implantImg,
      category: "Implants & Restorations",
      category_slug: "implants",
      icon: "shield",
    },
    {
      slug: t.allOn4Slug,
      title: t.allOn4,
      description: t.allOn4Desc,
      featured_image: fullMouthImg,
      category: "Implants & Restorations",
      category_slug: "implants",
      icon: "award",
    },
    {
      slug: t.crownsSlug,
      title: t.crowns,
      description: t.crownsDesc,
      featured_image: crownsImg,
      category: "Implants & Restorations",
      category_slug: "implants",
      icon: "crown",
    },
    {
      slug: t.zirconiaCrownsSlug,
      title: t.zirconiaCrowns,
      description: t.zirconiaCrownsDesc,
      featured_image: zirconiaCrownsImg,
      category: "Implants & Restorations",
      category_slug: "implants",
      icon: "award",
    },
    {
      slug: t.fullMouthRestorationSlug,
      title: t.fullMouthRestoration,
      description: t.fullMouthRestorationDesc,
      featured_image: fullMouthImg,
      category: "Implants & Restorations",
      category_slug: "implants",
      icon: "shield",
    },
    {
      slug: t.rootCanalSlug,
      title: t.rootCanal,
      description: t.rootCanalDesc,
      featured_image: implantImg,
      category: "Specialist Treatments",
      category_slug: "specialist",
      icon: "activity",
    },
    {
      slug: t.clearAlignersSlug,
      title: t.clearAligners,
      description: t.clearAlignersDesc,
      featured_image: veneersImg,
      category: "Orthodontics & Prevention",
      category_slug: "orthodontics",
      icon: "check",
    },
  ];

  const treatments = dbTreatments && !treatmentsError ? dbTreatments : fallback;
  const groups = treatments.reduce<Record<string, typeof treatments>>(
    (result, treatment) => {
      const label =
        treatment.category || treatment.category_slug || "Other Treatments";
      (result[label] ||= []).push(treatment);
      return result;
    },
    {},
  );

  return (
    <>
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">
            {page?.hero_title || t.treatmentsTitle}
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            {page?.hero_description || t.treatmentsSubtitle}
          </p>
        </div>
      </section>
      {Object.entries(groups).map(([label, items], groupIndex) => (
        <section
          key={label}
          className={`section-padding ${groupIndex % 2 === 0 ? "bg-background" : "bg-secondary/20"}`}
        >
          <div className="container-dental">
            <motion.h2
              className="text-xl font-display font-bold text-foreground mb-8 pb-3 border-b border-border flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              {label}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((treatment, index) => {
                const Icon =
                  iconMap[
                    (treatment.icon || "sparkle") as keyof typeof iconMap
                  ] || Sparkles;
                return (
                  <motion.div
                    key={treatment.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={localePath(`/${treatment.slug}`)}
                      className="card-treatment block group"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-secondary">
                        {treatment.featured_image && (
                          <img
                            src={treatment.featured_image}
                            alt={treatment.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <h3 className="font-display text-lg font-semibold">
                            {treatment.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {treatment.description}
                        </p>
                        {"tags" in treatment && Array.isArray((treatment as any).tags) && (treatment as any).tags.length ? (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {((treatment as any).tags as string[]).slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] px-2 py-1 rounded-full bg-secondary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          {t.learnMore} <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl font-display font-bold text-primary-foreground mb-6">
            {t.footerCta}
          </h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default TreatmentsPage;
