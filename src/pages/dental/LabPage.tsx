import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, CheckCircle2, Crown, FlaskConical, Monitor, ScanLine } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useSitePage } from '@/hooks/useCmsContent';
import { useLanguage } from '@/i18n/LanguageContext';
import { QuoteButton } from '@/components/dental/QuoteButton';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { TreatmentIconPanel } from '@/components/dental/TreatmentIcon';

const LAB_COPY = {
  en: {
    seoTitle: 'In-House Dental Laboratory in Kyrenia | Temelci Dental', seoDescription: 'Discover Temelci Dental’s in-house laboratory and digital workflow for crowns, veneers, bridges and implant-supported restorations.',
    home: 'Home', lab: 'Dental Lab', eyebrow: 'Real in-house restorative work', title: 'In-House Dental Laboratory', description: 'Closer communication between dentist and dental technician for carefully planned crowns, veneers, bridges and implant-supported restorations.',
    heroAlt: 'Dental restoration created through Temelci Dental’s in-house laboratory workflow', workflowTitle: 'From clinical plan to final restoration', workflowIntro: 'An in-house workflow keeps restorative communication close to the clinical team. Treatment timing and material choice remain individual and are confirmed after examination.',
    workflow: [['Digital records', 'Clinical scans, photographs and treatment requirements are shared directly with the restorative team.'], ['Restoration design', 'Proportions, function, material and shade are reviewed alongside the dentist’s treatment plan.'], ['In-house coordination', 'Close communication supports efficient technical review and any clinically required adjustments.'], ['Clinical verification', 'Every restoration is assessed for fit, function and appearance before final placement.']],
    capabilityTitle: 'Restorative capabilities', capabilityIntro: 'Laboratory work is prescribed and clinically supervised by the treating dentist.', explore: 'Explore all treatments',
    capabilities: [['Ceramic crowns and bridges', 'Restorations planned for strength, fit and natural appearance.'], ['Zirconia restorations', 'Metal-free restorative options selected according to each clinical indication.'], ['Veneers and smile design', 'Dentist-led aesthetic planning with attention to facial proportions and natural tooth character.'], ['Implant-supported restorations', 'Prosthetic coordination for single implants and selected full-arch rehabilitation cases.']],
    ctaTitle: 'Discuss your restorative treatment', ctaText: 'Request a personal consultation to understand suitable options, clinical stages and expected timelines.', plan: 'Request a Treatment Plan', whatsapp: 'Contact on WhatsApp',
  },
  de: {
    seoTitle: 'Eigenes Dentallabor in Kyrenia | Temelci Dental', seoDescription: 'Entdecken Sie das hauseigene Dentallabor und den digitalen Ablauf für Kronen, Veneers, Brücken und implantatgetragenen Zahnersatz.',
    home: 'Startseite', lab: 'Dentallabor', eyebrow: 'Echte restaurative Arbeit im Haus', title: 'Hauseigenes Dentallabor', description: 'Direkte Abstimmung zwischen Zahnarzt und Zahntechniker für sorgfältig geplante Kronen, Veneers, Brücken und implantatgetragenen Zahnersatz.',
    heroAlt: 'Zahnersatz aus dem hauseigenen Labor von Temelci Dental', workflowTitle: 'Vom klinischen Plan zur fertigen Versorgung', workflowIntro: 'Der interne Ablauf ermöglicht kurze Abstimmungswege mit dem Behandlungsteam. Zeitplan und Materialwahl werden individuell nach der Untersuchung festgelegt.',
    workflow: [['Digitale Unterlagen', 'Scans, Fotos und klinische Anforderungen werden direkt mit dem restaurativen Team geteilt.'], ['Design der Versorgung', 'Proportionen, Funktion, Material und Farbe werden mit dem Behandlungsplan abgestimmt.'], ['Interne Koordination', 'Direkter Austausch erleichtert die technische Prüfung und klinisch notwendige Anpassungen.'], ['Klinische Kontrolle', 'Vor dem Einsetzen wird jede Versorgung auf Passung, Funktion und Ästhetik geprüft.']],
    capabilityTitle: 'Restaurative Möglichkeiten', capabilityIntro: 'Laborarbeiten werden vom behandelnden Zahnarzt verordnet und klinisch überwacht.', explore: 'Alle Behandlungen ansehen',
    capabilities: [['Keramikkronen und Brücken', 'Versorgungen mit Blick auf Stabilität, Passung und natürliche Ästhetik.'], ['Zirkonversorgungen', 'Metallfreie Optionen passend zur jeweiligen klinischen Indikation.'], ['Veneers und Smile Design', 'Zahnarztgeführte ästhetische Planung nach Gesichtsproportionen und natürlichem Zahncharakter.'], ['Implantatgetragener Zahnersatz', 'Prothetische Abstimmung bei Einzelimplantaten und ausgewählten Gesamtkieferfällen.']],
    ctaTitle: 'Besprechen Sie Ihre restaurative Behandlung', ctaText: 'Fragen Sie eine persönliche Beratung zu geeigneten Optionen, Behandlungsschritten und Zeitrahmen an.', plan: 'Behandlungsplan anfragen', whatsapp: 'Über WhatsApp kontaktieren',
  },
  tr: {
    seoTitle: 'Girne Klinik İçi Diş Laboratuvarı | Temelci Dental', seoDescription: 'Kron, veneer, köprü ve implant üstü restorasyonlar için Temelci Dental’in klinik içi laboratuvarını ve dijital iş akışını inceleyin.',
    home: 'Ana Sayfa', lab: 'Diş Laboratuvarı', eyebrow: 'Gerçek klinik içi restoratif çalışma', title: 'Klinik İçi Diş Laboratuvarı', description: 'Özenle planlanan kron, veneer, köprü ve implant üstü restorasyonlarda diş hekimi ile diş teknisyeni arasında yakın iletişim.',
    heroAlt: 'Temelci Dental klinik içi laboratuvar iş akışıyla üretilen diş restorasyonu', workflowTitle: 'Klinik plandan son restorasyona', workflowIntro: 'Klinik içi iş akışı, restoratif iletişimi tedavi ekibine yakın tutar. Tedavi süresi ve malzeme seçimi muayene sonrasında kişiye özel belirlenir.',
    workflow: [['Dijital kayıtlar', 'Klinik taramalar, fotoğraflar ve tedavi gereksinimleri restoratif ekiple doğrudan paylaşılır.'], ['Restorasyon tasarımı', 'Oranlar, fonksiyon, malzeme ve renk diş hekiminin tedavi planıyla birlikte değerlendirilir.'], ['Klinik içi koordinasyon', 'Yakın iletişim, teknik incelemeyi ve klinik olarak gerekli düzenlemeleri kolaylaştırır.'], ['Klinik doğrulama', 'Her restorasyon kalıcı uygulama öncesinde uyum, fonksiyon ve görünüm açısından değerlendirilir.']],
    capabilityTitle: 'Restoratif uygulamalar', capabilityIntro: 'Laboratuvar çalışmaları tedaviyi yürüten diş hekimi tarafından reçete edilir ve klinik olarak denetlenir.', explore: 'Tüm tedavileri incele',
    capabilities: [['Seramik kron ve köprüler', 'Dayanıklılık, uyum ve doğal görünüm gözetilerek planlanan restorasyonlar.'], ['Zirkonyum restorasyonlar', 'Her klinik endikasyona göre seçilen metalsiz restoratif seçenekler.'], ['Veneer ve gülüş tasarımı', 'Yüz oranları ve doğal diş karakteri gözetilerek hekim liderliğinde estetik planlama.'], ['İmplant üstü restorasyonlar', 'Tek implantlar ve seçilmiş tam çene rehabilitasyon vakaları için protetik koordinasyon.']],
    ctaTitle: 'Restoratif tedavinizi görüşün', ctaText: 'Uygun seçenekleri, klinik aşamaları ve tahmini süreyi öğrenmek için kişisel değerlendirme talep edin.', plan: 'Tedavi Planı İste', whatsapp: 'WhatsApp ile Ulaşın',
  },
  he: {
    seoTitle: 'מעבדת שיניים פנימית בקירניה | Temelci Dental', seoDescription: 'הכירו את המעבדה הפנימית ואת תהליך העבודה הדיגיטלי לכתרים, ציפויים, גשרים ושיקום על גבי שתלים.',
    home: 'דף הבית', lab: 'מעבדת שיניים', eyebrow: 'עבודת שיקום אמיתית במרפאה', title: 'מעבדת שיניים פנימית', description: 'תקשורת ישירה בין רופא השיניים לטכנאי לצורך תכנון מדויק של כתרים, ציפויים, גשרים ושיקום על גבי שתלים.',
    heroAlt: 'שיקום שיניים שיוצר בתהליך המעבדה הפנימית של Temelci Dental', workflowTitle: 'מהתכנון הקליני לשיקום הסופי', workflowIntro: 'תהליך פנימי שומר על תקשורת ישירה עם הצוות הקליני. לוח הזמנים ובחירת החומר נקבעים אישית לאחר בדיקה.',
    workflow: [['רישומים דיגיטליים', 'סריקות, צילומים ודרישות הטיפול מועברים ישירות לצוות השיקום.'], ['תכנון השיקום', 'פרופורציות, תפקוד, חומר וגוון נבדקים לצד תוכנית הטיפול של הרופא.'], ['תיאום פנימי', 'תקשורת קרובה מאפשרת בדיקה טכנית יעילה והתאמות קליניות נדרשות.'], ['בדיקה קלינית', 'כל שיקום נבדק מבחינת התאמה, תפקוד ומראה לפני ההתקנה הסופית.']],
    capabilityTitle: 'יכולות שיקומיות', capabilityIntro: 'עבודת המעבדה נקבעת ומפוקחת קלינית על ידי רופא השיניים המטפל.', explore: 'לכל הטיפולים',
    capabilities: [['כתרים וגשרים מקרמיקה', 'שחזורים המתוכננים לחוזק, התאמה ומראה טבעי.'], ['שחזורי זירקוניה', 'אפשרויות ללא מתכת הנבחרות לפי ההתוויה הקלינית.'], ['ציפויים ועיצוב חיוך', 'תכנון אסתטי בהובלת רופא תוך התייחסות לפרופורציות הפנים ולאופי השיניים הטבעיות.'], ['שיקום על גבי שתלים', 'תיאום פרותטי לשתל בודד ולמקרים נבחרים של שיקום לסת מלאה.']],
    ctaTitle: 'שוחחו איתנו על טיפול שיקומי', ctaText: 'בקשו ייעוץ אישי כדי להבין את האפשרויות, השלבים הקליניים ולוחות הזמנים.', plan: 'בקשת תוכנית טיפול', whatsapp: 'יצירת קשר ב-WhatsApp',
  },
  ru: {
    seoTitle: 'Собственная зуботехническая лаборатория в Кирении | Temelci Dental', seoDescription: 'Узнайте о собственной лаборатории и цифровом процессе изготовления коронок, виниров, мостов и конструкций на имплантах.',
    home: 'Главная', lab: 'Зуботехническая лаборатория', eyebrow: 'Реальная лабораторная работа в клинике', title: 'Собственная зуботехническая лаборатория', description: 'Прямое взаимодействие стоматолога и зубного техника при планировании коронок, виниров, мостов и конструкций на имплантах.',
    heroAlt: 'Зубная реставрация, изготовленная в собственной лаборатории Temelci Dental', workflowTitle: 'От клинического плана до готовой конструкции', workflowIntro: 'Собственная лаборатория обеспечивает прямую связь с клинической командой. Сроки и материалы подбираются индивидуально после осмотра.',
    workflow: [['Цифровые данные', 'Сканы, фотографии и клинические требования напрямую передаются реставрационной команде.'], ['Проектирование', 'Пропорции, функция, материал и оттенок оцениваются вместе с планом лечения.'], ['Внутренняя координация', 'Прямое общение упрощает техническую проверку и необходимые клинические корректировки.'], ['Клиническая проверка', 'Перед фиксацией каждая конструкция проверяется на посадку, функцию и внешний вид.']],
    capabilityTitle: 'Реставрационные возможности', capabilityIntro: 'Лабораторная работа назначается и клинически контролируется лечащим стоматологом.', explore: 'Все виды лечения',
    capabilities: [['Керамические коронки и мосты', 'Конструкции, спланированные с учётом прочности, точности и естественного вида.'], ['Циркониевые конструкции', 'Безметалловые варианты, выбранные по клиническим показаниям.'], ['Виниры и дизайн улыбки', 'Эстетическое планирование под руководством врача с учётом пропорций лица и естественного характера зубов.'], ['Конструкции на имплантах', 'Протетическая координация одиночных имплантов и отдельных случаев полной реабилитации.']],
    ctaTitle: 'Обсудите реставрационное лечение', ctaText: 'Запросите личную консультацию, чтобы узнать о подходящих вариантах, этапах и сроках.', plan: 'Запросить план лечения', whatsapp: 'Связаться в WhatsApp',
  },
} as const;

const workflowIcons = [ScanLine, Monitor, FlaskConical, CheckCircle2];
const capabilitySlugs = ['ceramic-crowns', 'zirconia-crowns', 'veneers', 'dental-implants'];

export default function LabPage() {
  const { lang, localePath } = useLanguage();
  const copy = LAB_COPY[lang as keyof typeof LAB_COPY] || LAB_COPY.en;
  const { data: page } = useSitePage('lab');
  const heroImage = '/lab/in-house-restoration.webp';
  const title = lang === 'en' && page?.hero_title ? page.hero_title : copy.title;
  const description = lang === 'en' && page?.hero_description ? page.hero_description : copy.description;

  useSEO({
    title: lang === 'en' && page?.seo_title ? page.seo_title : copy.seoTitle,
    description: lang === 'en' && page?.seo_description ? page.seo_description : copy.seoDescription,
    canonical: `https://temelcidentist.com${localePath('/lab')}`,
    ogImage: page?.og_image || heroImage,
    ogImageAlt: copy.heroAlt,
  });

  return (
    <>
      <section className="overflow-hidden bg-foreground text-background">
        <div className="container-dental grid min-h-[560px] items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-background/70"><Link to={localePath('/')} className="hover:text-background">{copy.home}</Link><span className="mx-2">/</span><span>{copy.lab}</span></nav>
            <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur-sm"><FlaskConical className="h-4 w-4" /> {lang === 'en' && page?.eyebrow ? page.eyebrow : copy.eyebrow}</div>
            <h1 className="heading-display mt-5 text-background">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/80">{description}</p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-background/15 bg-black shadow-2xl"><img src={heroImage} alt={copy.heroAlt} className="max-h-[520px] w-full object-contain" /></div>
        </div>
      </section>

      <section className="section-padding bg-background"><div className="container-dental">
        <div className="mx-auto mb-12 max-w-3xl text-center"><h2 className="heading-section">{copy.workflowTitle}</h2><p className="text-body mt-4">{copy.workflowIntro}</p></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{copy.workflow.map((step, index) => { const Icon = workflowIcons[index]; return <motion.article key={step[0]} className="rounded-2xl border bg-card p-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div><h3 className="font-display text-lg font-semibold">{step[0]}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step[1]}</p></motion.article>; })}</div>
      </div></section>

      <section className="section-padding bg-secondary/30"><div className="container-dental">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div className="max-w-2xl"><h2 className="heading-section">{copy.capabilityTitle}</h2><p className="text-body mt-3">{copy.capabilityIntro}</p></div><Link to={localePath('/treatments')} className="font-semibold text-primary hover:underline">{copy.explore} →</Link></div>
        <div className="grid gap-6 sm:grid-cols-2">{copy.capabilities.map((item, index) => <article key={item[0]} className="group overflow-hidden rounded-2xl border bg-card"><TreatmentIconPanel slug={capabilitySlugs[index]} title={item[0]} compact /><div className="p-6"><div className="flex items-center gap-2"><Crown className="h-5 w-5 text-primary" /><h3 className="font-display text-xl font-semibold">{item[0]}</h3></div><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item[1]}</p></div></article>)}</div>
      </div></section>

      <section className="section-padding bg-primary text-center"><div className="container-dental"><Box className="mx-auto h-10 w-10 text-primary-foreground/80" /><h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground">{copy.ctaTitle}</h2><p className="mx-auto mt-3 max-w-xl text-primary-foreground/75">{copy.ctaText}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><QuoteButton text={copy.plan} variant="hero" /><WhatsAppButton text={copy.whatsapp} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" /></div></div></section>
    </>
  );
}
