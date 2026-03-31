import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Award, GraduationCap, Globe, Heart, MapPin, Stethoscope, Clock, Users } from 'lucide-react';
import heroImg from '@/assets/hero-clinic.jpg';

const doctors = [
  {
    name: 'DT. Nural Temelci',
    title: { en: 'Founder & Aesthetic Dentist', tr: 'Kurucu & Estetik Diş Hekimi', gr: 'Ιδρυτής & Αισθητικός Οδοντίατρος', ru: 'Основатель и Эстетический Стоматолог', ar: 'المؤسس وطبيب أسنان تجميلي', he: 'מייסד ורופא שיניים אסתטי', de: 'Gründer & Ästhetischer Zahnarzt' },
    experience: '36+',
    university: { en: 'Istanbul University, 1990', tr: 'İstanbul Üniversitesi, 1990', gr: 'Πανεπιστήμιο Κωνσταντινούπολης, 1990', ru: 'Стамбульский Университет, 1990', ar: 'جامعة إسطنبول، 1990', he: 'אוניברסיטת איסטנבול, 1990', de: 'Universität Istanbul, 1990' },
    specialization: { en: 'Aesthetic Smile Design & Implants', tr: 'Estetik Gülüş Tasarımı & İmplant', gr: 'Αισθητικός Σχεδιασμός Χαμόγελου & Εμφυτεύματα', ru: 'Эстетический Дизайн Улыбки & Имплантаты', ar: 'تصميم الابتسامة التجميلي وزراعة الأسنان', he: 'עיצוב חיוך אסתטי ושתלים', de: 'Ästhetisches Smile Design & Implantate' },
    bio: { en: 'One of the field\'s most established figures with a minimal invasive approach. Focuses on preserving tooth structure while achieving aesthetic and functional results.', tr: 'Alanın en köklü isimlerinden biri. Minimal invaziv yaklaşımla diş yapısını koruyarak estetik ve fonksiyonel sonuçlar elde eder.', gr: 'Μία από τις πιο καθιερωμένες φυσιογνωμίες του κλάδου με ελάχιστα επεμβατική προσέγγιση.', ru: 'Один из самых признанных специалистов в области с минимально инвазивным подходом.', ar: 'أحد أبرز الأسماء في المجال مع نهج جراحي طفيف التوغل.', he: 'אחת הדמויות המבוססות ביותר בתחום עם גישה מינימלית פולשנית.', de: 'Eine der etabliertesten Persönlichkeiten mit minimal-invasivem Ansatz.' },
    initials: 'NT',
  },
  {
    name: 'DR. Ali Temelci',
    title: { en: 'Oral & Maxillofacial Surgeon', tr: 'Ağız, Diş ve Çene Cerrahisi Uzmanı', gr: 'Στοματο-Γναθοπροσωπικός Χειρουργός', ru: 'Челюстно-Лицевой Хирург', ar: 'جراح الوجه والفكين', he: 'מנתח פה ולסת', de: 'Mund-Kiefer-Gesichtschirurg' },
    experience: '8',
    university: { en: 'Near East University, 2018', tr: 'Yakın Doğu Üniversitesi, 2018', gr: 'Πανεπιστήμιο Εγγύς Ανατολής, 2018', ru: 'Университет Ближнего Востока, 2018', ar: 'جامعة الشرق الأدنى، 2018', he: 'אוניברסיטת המזרח הקרוב, 2018', de: 'Nahost-Universität, 2018' },
    specialization: { en: 'Implants, Surgical Extractions & Facial Aesthetics', tr: 'İmplant, Cerrahi Çekim & Yüz Estetiği', gr: 'Εμφυτεύματα, Χειρουργικές Εξαγωγές & Αισθητική Προσώπου', ru: 'Имплантаты, Хирургические Удаления & Эстетика Лица', ar: 'زراعة الأسنان، الخلع الجراحي وتجميل الوجه', he: 'שתלים, עקירות כירורגיות ואסתטיקת פנים', de: 'Implantate, Chirurgische Extraktionen & Gesichtsästhetik' },
    bio: { en: 'Specialist in dental implants, impacted tooth extractions, cyst operations, and facial aesthetics including Botox and bichectomy.', tr: 'Diş implantı, gömülü diş çekimi, kist operasyonları ve Botox, bişektomi dahil yüz estetiği uzmanı.', gr: 'Ειδικός σε εμφυτεύματα, εξαγωγές φρονιμιτών, κύστες και αισθητική προσώπου.', ru: 'Специалист по имплантатам, удалению ретинированных зубов, кистам и эстетике лица.', ar: 'متخصص في زراعة الأسنان وخلع الأسنان المنطمرة والكيسات وتجميل الوجه.', he: 'מומחה בשתלים, עקירות שיני בינה, ציסטות ואסתטיקת פנים.', de: 'Spezialist für Implantate, Weisheitszahnentfernung, Zysten und Gesichtsästhetik.' },
    initials: 'AT',
  },
  {
    name: 'DT. Rasih Denktaş Çelebi',
    title: { en: 'Senior Endodontist', tr: 'Kıdemli Endodonti Uzmanı', gr: 'Ανώτερος Ενδοδοντολόγος', ru: 'Старший Эндодонтист', ar: 'أخصائي علاج جذور أقدم', he: 'אנדודונטיסט בכיר', de: 'Senior Endodontologe' },
    experience: '42',
    university: { en: 'Hacettepe University, 1984', tr: 'Hacettepe Üniversitesi, 1984', gr: 'Πανεπιστήμιο Hacettepe, 1984', ru: 'Университет Хаджеттепе, 1984', ar: 'جامعة حجة تبة، 1984', he: 'אוניברסיטת האצ\'טפה, 1984', de: 'Hacettepe Universität, 1984' },
    specialization: { en: 'Endodontics & Restorative Dentistry', tr: 'Endodonti & Restoratif Diş Hekimliği', gr: 'Ενδοδοντία & Αποκαταστατική Οδοντιατρική', ru: 'Эндодонтия & Реставрационная Стоматология', ar: 'علاج الجذور وطب الأسنان الترميمي', he: 'אנדודונטיה ורפואת שיניים משקמת', de: 'Endodontie & Restaurative Zahnmedizin' },
    bio: { en: 'The clinic\'s most experienced practitioner with 42 years of uninterrupted practice. Expert in complex canal cases and previously failed treatments.', tr: 'Kliniğin en deneyimli hekimi, 42 yıllık kesintisiz klinik pratik. Kompleks kanal vakaları ve başarısız tedavi revizyonlarında uzman.', gr: 'Ο πιο έμπειρος κλινικός ιατρός της κλινικής με 42 χρόνια αδιάκοπης πρακτικής.', ru: 'Самый опытный врач клиники с 42 годами непрерывной практики.', ar: 'الطبيب الأكثر خبرة في العيادة مع 42 عاماً من الممارسة المتواصلة.', he: 'הרופא המנוסה ביותר במרפאה עם 42 שנות עבודה רצופות.', de: 'Der erfahrenste Arzt der Klinik mit 42 Jahren ununterbrochener Praxis.' },
    initials: 'RD',
  },
  {
    name: 'DT. Yaşkan Uğurlu',
    title: { en: 'General Dentist', tr: 'Diş Hekimi', gr: 'Γενικός Οδοντίατρος', ru: 'Стоматолог', ar: 'طبيب أسنان عام', he: 'רופא שיניים כללי', de: 'Zahnarzt' },
    experience: '5',
    university: { en: 'Near East University, 2021', tr: 'Yakın Doğu Üniversitesi, 2021', gr: 'Πανεπιστήμιο Εγγύς Ανατολής, 2021', ru: 'Университет Ближнего Востока, 2021', ar: 'جامعة الشرق الأدنى، 2021', he: 'אוניברסיטת המזרח הקרוב, 2021', de: 'Nahost-Universität, 2021' },
    specialization: { en: 'Endodontics, Aesthetic Composites & Periodontics', tr: 'Endodonti, Estetik Kompozit & Periodonti', gr: 'Ενδοδοντία, Αισθητικά Σύνθετα & Περιοδοντία', ru: 'Эндодонтия, Эстетические Композиты & Пародонтология', ar: 'علاج الجذور والحشوات التجميلية وعلاج اللثة', he: 'אנדודונטיה, קומפוזיט אסתטי ופריודונטיה', de: 'Endodontie, Ästhetische Komposite & Parodontologie' },
    bio: { en: 'Combines modern dentistry competencies with patient-centered communication. Known for empathetic approach and reducing dental anxiety.', tr: 'Modern diş hekimliği yetkinliklerini hasta odaklı iletişimle birleştirir. Empatik yaklaşımı ve diş kaygısını azaltma becerisiyle tanınır.', gr: 'Συνδυάζει σύγχρονες οδοντιατρικές ικανότητες με ασθενοκεντρική επικοινωνία.', ru: 'Сочетает современные стоматологические компетенции с пациентоориентированным подходом.', ar: 'يجمع بين كفاءات طب الأسنان الحديثة والتواصل المتمحور حول المريض.', he: 'משלב מיומנויות רפואת שיניים מודרניות עם תקשורת ממוקדת מטופל.', de: 'Verbindet moderne Zahnmedizin mit patientenzentrierter Kommunikation.' },
    initials: 'YU',
  },
  {
    name: 'DR. DT. Şerife Köle',
    title: { en: 'Prosthodontist', tr: 'Protetik Diş Tedavisi Uzmanı', gr: 'Προσθετολόγος', ru: 'Стоматолог-Ортопед', ar: 'أخصائية تركيبات الأسنان', he: 'פרוסתודונטית', de: 'Prothetik-Spezialistin' },
    experience: '8',
    university: { en: 'Near East University & Gazi University, 2022', tr: 'Yakın Doğu Üniversitesi & Gazi Üniversitesi, 2022', gr: 'Πανεπιστήμιο Εγγύς Ανατολής & Πανεπιστήμιο Gazi, 2022', ru: 'Университет Ближнего Востока & Университет Гази, 2022', ar: 'جامعة الشرق الأدنى وجامعة غازي، 2022', he: 'אוניברסיטת המזרח הקרוב ואוניברסיטת גאזי, 2022', de: 'Nahost-Universität & Gazi-Universität, 2022' },
    specialization: { en: 'Implant Prosthetics, Laminate Veneers & Zirconia Crowns', tr: 'İmplant Protez, Laminate Veneer & Zirkonyum Kron', gr: 'Προσθετική Εμφυτευμάτων, Πορσελάνινα Laminates & Κορώνες Ζιρκονίας', ru: 'Протезирование на Имплантатах, Виниры & Циркониевые Коронки', ar: 'تركيبات على الزرعات، قشور اللامينيت وتيجان الزركونيا', he: 'תותבות על שתלים, למינייט ציפוי וכתרי זירקוניה', de: 'Implantatprothetik, Laminate Veneers & Zirkonkronen' },
    bio: { en: 'Graduated top of class. Combines scientific knowledge with aesthetic sensitivity for long-lasting, natural-appearing results.', tr: 'Sınıf birincisi olarak mezun olmuştur. Bilimsel bilgiyi estetik duyarlılıkla birleştirerek uzun ömürlü, doğal görünümlü sonuçlar sunar.', gr: 'Αποφοίτησε πρώτη στην τάξη. Συνδυάζει επιστημονική γνώση με αισθητική ευαισθησία.', ru: 'Окончила с отличием. Сочетает научные знания с эстетической чувствительностью.', ar: 'تخرجت الأولى على دفعتها. تجمع بين المعرفة العلمية والحس الجمالي.', he: 'סיימה בהצטיינות. משלבת ידע מדעי עם רגישות אסתטית.', de: 'Schloss als Klassenbeste ab. Verbindet Wissenschaft mit ästhetischem Gespür.' },
    initials: 'SK',
  },
  {
    name: 'DT. Anna Zubtcovskaia-Derya',
    title: { en: 'Endodontist & Preventive Dentist', tr: 'Endodonti & Koruyucu Diş Hekimi', gr: 'Ενδοδοντολόγος & Προληπτική Οδοντιατρική', ru: 'Эндодонтист & Превентивный Стоматолог', ar: 'أخصائية علاج جذور وطب أسنان وقائي', he: 'אנדודונטיסטית ורפואת שיניים מונעת', de: 'Endodontologin & Präventive Zahnärztin' },
    experience: '27+',
    university: { en: 'Izhevsk State Medical Academy (Russia), 1994', tr: 'Izhevsk Devlet Tıp Akademisi (Rusya), 1994', gr: 'Κρατική Ιατρική Ακαδημία Ιζέβσκ (Ρωσία), 1994', ru: 'Ижевская Государственная Медицинская Академия, 1994', ar: 'أكاديمية إيجيفسك الطبية الحكومية (روسيا)، 1994', he: 'האקדמיה הרפואית הממלכתית של איז\'בסק (רוסיה), 1994', de: 'Staatliche Medizinische Akademie Ischewsk (Russland), 1994' },
    specialization: { en: 'Endodontics, Aesthetic Composites & Preventive Care', tr: 'Endodonti, Estetik Kompozit & Koruyucu Bakım', gr: 'Ενδοδοντία, Αισθητικά Σύνθετα & Προληπτική Φροντίδα', ru: 'Эндодонтия, Эстетические Композиты & Профилактика', ar: 'علاج الجذور والحشوات التجميلية والرعاية الوقائية', he: 'אנדודונטיה, קומפוזיט אסתטי וטיפול מונע', de: 'Endodontie, Ästhetische Komposite & Vorsorge' },
    bio: { en: 'International background provides advantage in understanding multicultural patients. Strong advocate of preventive dentistry with regular six-monthly check-ups.', tr: 'Uluslararası geçmişi, farklı kültürlerden hastaları anlama konusunda önemli avantaj sağlar. Altı aylık periyodik kontrolleri savunan koruyucu diş hekimliği yaklaşımı.', gr: 'Το διεθνές υπόβαθρο προσφέρει πλεονέκτημα στην κατανόηση πολυπολιτισμικών ασθενών.', ru: 'Международный опыт даёт преимущество в работе с пациентами разных культур.', ar: 'الخلفية الدولية تمنح ميزة في فهم المرضى من ثقافات مختلفة.', he: 'הרקע הבינלאומי מעניק יתרון בהבנת מטופלים מתרבויות שונות.', de: 'Internationaler Hintergrund bietet Vorteil im Umgang mit multikulturellen Patienten.' },
    initials: 'AZ',
  },
];

const bgColors = [
  'bg-blue-500/10 text-blue-600',
  'bg-emerald-500/10 text-emerald-600',
  'bg-purple-500/10 text-purple-600',
  'bg-amber-500/10 text-amber-600',
  'bg-rose-500/10 text-rose-600',
  'bg-cyan-500/10 text-cyan-600',
];

const AboutPage = () => {
  const { t, lang } = useLanguage();

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{t.aboutTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{t.aboutSubtitle}</p>
        </div>
      </section>

      {/* Clinic Overview */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={heroImg} alt="Temelci Dental Clinic" className="rounded-2xl shadow-lg w-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="heading-section mb-4">{t.aboutDoctorName}</h2>
              <p className="text-body mb-6">{t.aboutDoctorBio}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">30+ {t.yearsExperience}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">6 {t.specialists}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">30+ {t.countriesServed}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">10,000+ {t.happyPatients}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl mb-6">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium">127+ {t.combinedExperience}</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl mb-6">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">{t.ourLocation}</p>
                  <p className="text-sm text-muted-foreground">{t.clinicLocation}</p>
                </div>
              </div>
              <WhatsAppButton text={t.freeConsultation} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Doctors */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-section mb-3">{t.ourDoctors}</h2>
            <p className="text-body max-w-2xl mx-auto">{t.ourDoctorsSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doc, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${bgColors[i]}`}>
                      {doc.initials}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{doc.name}</h3>
                      <p className="text-sm text-primary font-medium">{doc.title[lang]}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{doc.university[lang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{doc.specialization[lang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{doc.experience} {t.yearsExperience}</span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/70 leading-relaxed">{doc.bio[lang]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">{t.footerCta}</h2>
          <WhatsAppButton text={t.bookWhatsApp} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
