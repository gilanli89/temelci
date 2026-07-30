import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarCheck, ClipboardCheck, HeartHandshake, MapPin, MessageCircle, Plane, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { QuoteButton } from '@/components/dental/QuoteButton';
import { useSEO } from '@/hooks/useSEO';
import heroImg from '@/assets/hero-clinic.jpg';

const pageCopy = {
  en: {
    seoTitle: 'Dental Tourism in North Cyprus | Temelci Dental',
    seoDescription: 'Plan dental treatment in Kyrenia with clear clinical stages, travel guidance and personal patient coordination.',
    badge: 'Dental treatment planning in North Cyprus',
    title: 'Plan Your Dental Visit to Kyrenia with Confidence',
    intro: 'Our patient team helps international visitors understand the clinical stages, likely visit schedule and practical travel details before they make a decision.',
    plan: 'Request a Personal Treatment Plan',
    cases: 'View Documented Results',
    heading: 'How international treatment planning works',
    subheading: 'Every plan starts with clinical information. Timing and suitability are confirmed by a dentist after examination.',
    steps: [
      ['Share your information', 'Tell us your goals and securely send the dental images or X-rays you already have. Avoid sending sensitive clinical details through public channels.'],
      ['Receive an initial assessment', 'A dentist reviews the available information. We explain possible options, limitations and which records may still be required.'],
      ['Confirm visits and travel', 'After clinical review, our team outlines the expected visit schedule and can share practical guidance for travelling to Kyrenia.'],
      ['Treatment and follow-up', 'Your final plan is confirmed after examination. You receive written aftercare information and a direct contact channel for follow-up.'],
    ],
    whyTitle: 'Clear coordination, clinically led',
    reasons: [
      ['Dentist-led planning', 'Treatment recommendations are based on diagnosis, not a package selected before examination.'],
      ['5-clinician team', 'Our team works across restorative, surgical, endodontic, preventive and prosthetic care.'],
      ['In-house laboratory', 'Close communication between dentist and laboratory supports restorative quality control.'],
      ['Personal coordination', 'One patient contact helps organise records, appointments and practical visit information.'],
    ],
    locationTitle: 'Treatment in central Kyrenia',
    locationText: 'Temelci Dental Clinic is located in Kyrenia (Girne), North Cyprus. Travel routes and accommodation remain the patient’s choice; our team can provide practical information when requested.',
    finalTitle: 'Start with a clinical conversation',
    finalText: 'Send the information you already have and tell us what you would like to improve. We will explain the appropriate next step without obligation.',
    whatsapp: 'Ask on WhatsApp',
  },
  de: {
    seoTitle: 'Zahntourismus in Nordzypern | Temelci Dental',
    seoDescription: 'Planen Sie Ihre Zahnbehandlung in Kyrenia mit klaren Behandlungsschritten, Reisehinweisen und persönlicher Patientenkoordination.',
    badge: 'Zahnbehandlungsplanung in Nordzypern',
    title: 'Planen Sie Ihren Zahnarztbesuch in Kyrenia mit Sicherheit',
    intro: 'Unser Patiententeam hilft internationalen Besuchern, klinische Schritte, voraussichtliche Termine und praktische Reiseinformationen vor einer Entscheidung zu verstehen.',
    plan: 'Persönlichen Behandlungsplan anfragen',
    cases: 'Dokumentierte Ergebnisse ansehen',
    heading: 'So funktioniert die internationale Behandlungsplanung',
    subheading: 'Jede Planung beginnt mit klinischen Informationen. Dauer und Eignung bestätigt der Zahnarzt nach der Untersuchung.',
    steps: [
      ['Informationen übermitteln', 'Beschreiben Sie Ihre Ziele und senden Sie vorhandene Zahnbilder oder Röntgenaufnahmen sicher. Senden Sie sensible Daten nicht über öffentliche Kanäle.'],
      ['Erste Einschätzung erhalten', 'Ein Zahnarzt prüft die verfügbaren Angaben und erklärt mögliche Optionen, Grenzen und eventuell benötigte Unterlagen.'],
      ['Termine und Reise abstimmen', 'Nach der klinischen Prüfung skizziert unser Team den voraussichtlichen Besuchsplan und gibt praktische Hinweise für die Reise nach Kyrenia.'],
      ['Behandlung und Nachsorge', 'Der endgültige Plan wird nach der Untersuchung bestätigt. Sie erhalten schriftliche Nachsorgehinweise und einen direkten Kontakt für Rückfragen.'],
    ],
    whyTitle: 'Klare Koordination, klinisch geführt',
    reasons: [
      ['Zahnarztgeführte Planung', 'Empfehlungen beruhen auf der Diagnose und nicht auf einem vor der Untersuchung gewählten Paket.'],
      ['Team aus 5 Behandlern', 'Unser Team deckt restaurative, chirurgische, endodontische, präventive und prothetische Versorgung ab.'],
      ['Hauseigenes Labor', 'Die enge Abstimmung zwischen Zahnarzt und Labor unterstützt die Qualitätskontrolle.'],
      ['Persönliche Koordination', 'Eine feste Kontaktperson unterstützt bei Unterlagen, Terminen und praktischen Besuchsinformationen.'],
    ],
    locationTitle: 'Behandlung im Zentrum von Kyrenia',
    locationText: 'Die Temelci Dental Clinic befindet sich in Kyrenia (Girne), Nordzypern. Reise und Unterkunft wählen Patienten selbst; auf Wunsch geben wir praktische Hinweise.',
    finalTitle: 'Beginnen Sie mit einem klinischen Gespräch',
    finalText: 'Senden Sie vorhandene Informationen und beschreiben Sie Ihr Anliegen. Wir erklären Ihnen unverbindlich den passenden nächsten Schritt.',
    whatsapp: 'Über WhatsApp fragen',
  },
  tr: {
    seoTitle: 'Kuzey Kıbrıs Diş Turizmi | Temelci Dental',
    seoDescription: 'Girne’de diş tedavinizi net klinik aşamalar, seyahat bilgileri ve kişisel hasta koordinasyonuyla planlayın.',
    badge: 'Kuzey Kıbrıs’ta diş tedavisi planlaması',
    title: 'Girne’deki Diş Tedavisi Ziyaretinizi Güvenle Planlayın',
    intro: 'Hasta ekibimiz, uluslararası ziyaretçilerin karar vermeden önce klinik aşamaları, olası ziyaret takvimini ve pratik seyahat bilgilerini anlamasına yardımcı olur.',
    plan: 'Kişisel Tedavi Planı İsteyin',
    cases: 'Belgelenmiş Sonuçları Görün',
    heading: 'Uluslararası tedavi planlaması nasıl ilerler?',
    subheading: 'Her plan klinik bilgilerle başlar. Süre ve uygunluk, muayeneden sonra diş hekimi tarafından kesinleştirilir.',
    steps: [
      ['Bilgilerinizi paylaşın', 'Hedeflerinizi anlatın; mevcut diş fotoğraflarınızı veya röntgenlerinizi güvenli şekilde gönderin. Hassas klinik bilgileri herkese açık kanallardan paylaşmayın.'],
      ['İlk değerlendirmeyi alın', 'Diş hekimi mevcut bilgileri inceler; olası seçenekleri, sınırlamaları ve gerekebilecek ek kayıtları açıklar.'],
      ['Ziyaretleri ve seyahati netleştirin', 'Klinik incelemeden sonra ekibimiz öngörülen ziyaret planını paylaşır ve Girne seyahati için pratik bilgiler sunabilir.'],
      ['Tedavi ve takip', 'Kesin plan muayeneden sonra onaylanır. Yazılı bakım bilgileri ve takip için doğrudan iletişim kanalı sağlanır.'],
    ],
    whyTitle: 'Net koordinasyon, klinik liderlik',
    reasons: [
      ['Hekim liderliğinde planlama', 'Tedavi önerileri, muayene öncesi seçilen bir pakete değil tanıya dayanır.'],
      ['5 klinisyenlik ekip', 'Ekibimiz restoratif, cerrahi, endodontik, koruyucu ve protetik bakım alanlarında çalışır.'],
      ['Klinik içi laboratuvar', 'Diş hekimi ve laboratuvar arasındaki yakın iletişim restoratif kalite kontrolünü destekler.'],
      ['Kişisel koordinasyon', 'Tek bir hasta iletişim sorumlusu kayıtları, randevuları ve pratik ziyaret bilgilerini organize etmeye yardımcı olur.'],
    ],
    locationTitle: 'Girne merkezinde tedavi',
    locationText: 'Temelci Dental Clinic, Girne’de yer alır. Seyahat güzergâhı ve konaklama hastanın tercihidir; ekibimiz talep halinde pratik bilgi paylaşabilir.',
    finalTitle: 'Klinik bir görüşmeyle başlayın',
    finalText: 'Elinizdeki bilgileri gönderin ve neyi iyileştirmek istediğinizi anlatın. Uygun sonraki adımı yükümlülük oluşturmadan açıklayalım.',
    whatsapp: 'WhatsApp’tan Sorun',
  },
  he: {
    seoTitle: 'תיירות שיניים בצפון קפריסין | Temelci Dental',
    seoDescription: 'תכננו טיפול שיניים בקירניה עם שלבים קליניים ברורים, מידע מעשי ותיאום אישי למטופלים.',
    badge: 'תכנון טיפול שיניים בצפון קפריסין',
    title: 'תכננו את הביקור הדנטלי בקירניה בביטחון',
    intro: 'צוות המטופלים שלנו מסייע למבקרים מחו״ל להבין את שלבי הטיפול, מספר הביקורים המשוער ומידע מעשי לפני קבלת החלטה.',
    plan: 'בקשת תוכנית טיפול אישית',
    cases: 'צפייה בתוצאות מתועדות',
    heading: 'כיצד פועל תכנון טיפול בינלאומי',
    subheading: 'כל תוכנית מתחילה במידע קליני. ההתאמה והזמנים מאושרים על ידי רופא שיניים לאחר בדיקה.',
    steps: [
      ['שיתוף מידע', 'ספרו לנו מה תרצו לשפר ושלחו באופן מאובטח צילומי שיניים או רנטגן קיימים. אל תשלחו מידע רפואי רגיש בערוצים ציבוריים.'],
      ['קבלת הערכה ראשונית', 'רופא שיניים בודק את המידע ומסביר אפשרויות, מגבלות ואילו מסמכים נוספים עשויים להידרש.'],
      ['תיאום ביקורים ונסיעה', 'לאחר הבדיקה הקלינית הצוות מסביר את לוח הביקורים המשוער ויכול לספק מידע מעשי על הגעה לקירניה.'],
      ['טיפול ומעקב', 'התוכנית הסופית מאושרת לאחר בדיקה. תקבלו הוראות כתובות וערוץ קשר ישיר למעקב.'],
    ],
    whyTitle: 'תיאום ברור בהובלה קלינית',
    reasons: [
      ['תכנון בהובלת רופא', 'ההמלצות מבוססות על אבחון ולא על חבילה שנבחרה לפני בדיקה.'],
      ['צוות של 5 רופאים', 'הצוות מטפל בתחומי שיקום, כירורגיה, אנדודונטיה, מניעה ושיקום הפה.'],
      ['מעבדה פנימית', 'התקשורת הצמודה בין הרופא למעבדה תומכת בבקרת איכות.'],
      ['תיאום אישי', 'איש קשר אחד מסייע בארגון מסמכים, תורים ומידע מעשי לביקור.'],
    ],
    locationTitle: 'טיפול במרכז קירניה',
    locationText: 'מרפאת Temelci Dental נמצאת בקירניה (גירנה), צפון קפריסין. מסלול הנסיעה והלינה הם לבחירת המטופל; נשמח לספק מידע מעשי לפי בקשה.',
    finalTitle: 'התחילו בשיחה קלינית',
    finalText: 'שלחו את המידע הקיים וספרו לנו מה תרצו לשפר. נסביר את הצעד הבא המתאים ללא התחייבות.',
    whatsapp: 'שאלה ב-WhatsApp',
  },
  ru: {
    seoTitle: 'Стоматологический туризм на Северном Кипре | Temelci Dental',
    seoDescription: 'Планируйте стоматологическое лечение в Кирении с понятными этапами, практической информацией и личной координацией.',
    badge: 'Планирование лечения на Северном Кипре',
    title: 'Спланируйте визит в клинику Кирении уверенно',
    intro: 'Наша команда помогает иностранным пациентам заранее понять клинические этапы, предполагаемое число визитов и практические детали поездки.',
    plan: 'Запросить персональный план',
    cases: 'Посмотреть документированные результаты',
    heading: 'Как проходит планирование лечения для иностранных пациентов',
    subheading: 'Планирование начинается с клинической информации. Сроки и показания подтверждает врач после осмотра.',
    steps: [
      ['Поделитесь информацией', 'Опишите свои цели и безопасно отправьте имеющиеся фотографии зубов или рентгеновские снимки. Не отправляйте чувствительные данные через открытые каналы.'],
      ['Получите первичную оценку', 'Врач изучит информацию, объяснит возможные варианты, ограничения и необходимые дополнительные материалы.'],
      ['Согласуйте визиты и поездку', 'После клинической оценки команда обозначит предполагаемый график визитов и при необходимости предоставит практическую информацию о поездке в Кирению.'],
      ['Лечение и наблюдение', 'Окончательный план утверждается после осмотра. Вы получите письменные рекомендации и прямой канал связи для наблюдения.'],
    ],
    whyTitle: 'Понятная координация под руководством врача',
    reasons: [
      ['Планирование врачом', 'Рекомендации основаны на диагнозе, а не на пакете, выбранном до осмотра.'],
      ['Команда из 5 врачей', 'Команда работает в области реставрационной, хирургической, эндодонтической, профилактической и ортопедической стоматологии.'],
      ['Собственная лаборатория', 'Тесная связь врача и лаборатории поддерживает контроль качества реставраций.'],
      ['Личная координация', 'Один контакт помогает организовать документы, приёмы и практическую информацию о визите.'],
    ],
    locationTitle: 'Лечение в центре Кирении',
    locationText: 'Клиника Temelci Dental находится в Кирении (Гирне), Северный Кипр. Маршрут и размещение пациент выбирает самостоятельно; по запросу мы предоставим практическую информацию.',
    finalTitle: 'Начните с клинической консультации',
    finalText: 'Отправьте имеющуюся информацию и расскажите, что хотите улучшить. Мы без обязательств объясним подходящий следующий шаг.',
    whatsapp: 'Спросить в WhatsApp',
  },
} as const;

const stepIcons = [MessageCircle, ClipboardCheck, Plane, CalendarCheck];
const reasonIcons = [ShieldCheck, HeartHandshake, ClipboardCheck, MapPin];
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function DentalTourismPage() {
  const { lang, t, localePath } = useLanguage();
  const c = pageCopy[lang];

  useSEO({
    title: c.seoTitle,
    description: c.seoDescription,
    canonical: `https://temelcidentist.com/${lang}/${t.dentalTourismSlug}`,
    ogImage: heroImg,
    ogImageAlt: c.title,
  });

  return (
    <>
      <section className="relative flex min-h-[72vh] items-center overflow-hidden">
        <img src={heroImg} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/30" />
        <div className="container-dental relative z-10 px-6 py-24">
          <motion.div {...fadeUp} className="max-w-3xl">
            <span className="trust-badge mb-6 inline-flex items-center gap-2"><Plane className="h-4 w-4" />{c.badge}</span>
            <h1 className="heading-display max-w-3xl text-background">{c.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80">{c.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <QuoteButton text={c.plan} variant="hero" />
              <Link to={localePath(`/${t.beforeAfterSlug}`)} className="inline-flex items-center rounded-full border-2 border-background/40 px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-background/10">{c.cases}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-dental">
          <motion.div {...fadeUp} className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="heading-section">{c.heading}</h2>
            <p className="text-body mt-4">{c.subheading}</p>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2">
            {c.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return <motion.article key={step[0]} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.06 }} className="rounded-2xl border bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">0{index + 1}</p>
                <h3 className="font-display text-xl font-semibold">{step[0]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step[1]}</p>
              </motion.article>;
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/40">
        <div className="container-dental">
          <motion.h2 {...fadeUp} className="heading-section mb-12 text-center">{c.whyTitle}</motion.h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.reasons.map((reason, index) => {
              const Icon = reasonIcons[index];
              return <motion.article key={reason[0]} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.06 }} className="rounded-2xl border bg-card p-6">
                <Icon className="mb-4 h-7 w-7 text-primary" />
                <h3 className="font-display text-lg font-semibold">{reason[0]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason[1]}</p>
              </motion.article>;
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <motion.div {...fadeUp} className="container-dental grid items-center gap-8 rounded-3xl border bg-card p-8 md:grid-cols-[auto_1fr] md:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"><MapPin className="h-8 w-8 text-primary" /></div>
          <div>
            <h2 className="heading-section">{c.locationTitle}</h2>
            <p className="text-body mt-3 max-w-3xl">{c.locationText}</p>
          </div>
        </motion.div>
      </section>

      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">{c.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/75">{c.finalText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <QuoteButton text={c.plan} variant="hero" />
            <WhatsAppButton text={c.whatsapp} variant="outline" className="border-primary-foreground/35 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
          </div>
        </div>
      </section>
    </>
  );
}
