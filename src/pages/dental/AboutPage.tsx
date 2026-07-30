import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { QuoteButton } from '@/components/dental/QuoteButton';
import { Award, GraduationCap, Globe, Heart, MapPin, Smile, Clock, Users } from 'lucide-react';
import { useDoctorsFromDb } from '@/hooks/useDoctorsHybrid';
import { useSitePage } from '@/hooks/useCmsContent';
import { useSEO } from '@/hooks/useSEO';
import heroImg from '@/assets/clinic/clinic_room3.jpg';
import photoNural from '@/assets/doctors/nural_temelci.jpg';
import photoAli from '@/assets/doctors/ali_temelci.jpg';
import photoRasih from '@/assets/doctors/rasih_denktash.jpg';

import photoSerife from '@/assets/doctors/serife_kole.jpg';
import photoAnna from '@/assets/doctors/anna_zubtcovskaia.jpg';

const doctors = [
  {
    slug: 'nural-temelci',
    name: 'DT. Nural Temelci',
    title: { en: 'Founder & Aesthetic Dentist', tr: 'Kurucu & Estetik Diş Hekimi', el: 'Ιδρυτής & Αισθητικός Οδοντίατρος', ru: 'Основатель и Эстетический Стоматолог', ar: 'المؤسس وطبيب أسنان تجميلي', he: 'מייסד ורופא שיניים אסתטי', fa: 'بنیانگذار و دندانپزشک زیبایی', de: 'Gründer & Ästhetischer Zahnarzt' },
    experience: '36+',
    university: { en: 'Istanbul University, 1990', tr: 'İstanbul Üniversitesi, 1990', el: 'Πανεπιστήμιο Κωνσταντινούπολης, 1990', ru: 'Стамбульский Университет, 1990', ar: 'جامعة إسطنبول، 1990', he: 'אוניברסיטת איסטנבול, 1990', fa: 'دانشگاه استانبول، ۱۹۹۰', de: 'Universität Istanbul, 1990' },
    specialization: { en: 'Aesthetic Smile Design & Implants', tr: 'Estetik Gülüş Tasarımı & İmplant', el: 'Αισθητικός Σχεδιασμός Χαμόγελου & Εμφυτεύματα', ru: 'Эстетический Дизайн Улыбки & Имплантаты', ar: 'تصميم الابتسامة التجميلي وزراعة الأسنان', he: 'עיצוב חיוך אסתטי ושתלים', fa: 'طراحی لبخند زیبایی و ایمپلنت', de: 'Ästhetisches Smile Design & Implantate' },
    bio: { en: 'With 36+ years in aesthetic smile design and implantology, Dt. Temelci is one of the field\'s most established figures. Her minimally invasive philosophy preserves as much natural tooth structure as possible while delivering aesthetic and functional outcomes. Every smile design is individually planned around the patient\'s facial anatomy, lip structure and personal expectations.', tr: '36 yılı aşkın klinik deneyimiyle estetik gülüş tasarımı ve implant uygulamalarında alanın en köklü isimlerinden biridir. Minimal invaziv felsefesiyle diş dokusunu koruyarak estetik ve fonksiyonel sonuçlara ulaşır. Her gülüş tasarımını hastanın yüz anatomisi, dudak yapısı ve beklentileri doğrultusunda özenle planlar.', el: 'Με 36+ χρόνια στον αισθητικό σχεδιασμό χαμόγελου και εμφυτευματολογία, είναι μία από τις πλέον καθιερωμένες φυσιογνωμίες του κλάδου. Η ελάχιστα επεμβατική φιλοσοφία της διαφυλάσσει τη φυσική δομή του δοντιού. Κάθε σχεδιασμός χαμόγελου σχεδιάζεται γύρω από την ανατομία και τις προσδοκίες του ασθενούς.', ru: 'Имея 36+ лет опыта в эстетическом дизайне улыбки и имплантологии, является одной из самых авторитетных фигур в области. Минимально инвазивная философия позволяет сохранить естественную структуру зуба, достигая эстетических результатов. Каждый дизайн улыбки планируется с учётом анатомии лица и ожиданий пациента.', ar: 'مع أكثر من 36 عاماً في تصميم الابتسامة التجميلية وزراعة الأسنان، تُعدّ من أبرز الأسماء في المجال. فلسفتها الجراحية الطفيفة التوغل تحافظ على بنية السن الطبيعية مع تحقيق نتائج جمالية ووظيفية. كل تصميم ابتسامة يُخطط وفق تشريح وجه المريض وتوقعاته.', he: 'עם 36+ שנות ניסיון בעיצוב חיוך אסתטי ושתלנות, היא אחת הדמויות המבוססות ביותר בתחום. הגישה המינימלית פולשנית שלה שומרת על מירב המבנה הטבעי של השן. כל עיצוב חיוך מתוכנן בהתאם לאנטומיית הפנים וציפיות המטופל.', fa: 'با بیش از ۳۶ سال تجربه در طراحی لبخند زیبایی و ایمپلنتولوژی، از معتبرترین چهره‌های این حوزه است. فلسفه حداقل تهاجمی او ساختار طبیعی دندان را حفظ کرده، نتایج زیبایی و عملکردی را محقق می‌کند. هر طراحی لبخند بر اساس آناتومی صورت و انتظارات بیمار برنامه‌ریزی می‌شود.', de: 'Mit 36+ Jahren in ästhetischem Smile-Design und Implantologie gehört sie zu den renommiertesten Persönlichkeiten ihres Faches. Ihre minimal-invasive Philosophie erhält die natürliche Zahnstruktur bei maximaler Ästhetik. Jedes Smile-Design wird individuell auf die Gesichtsanatomie und Erwartungen des Patienten abgestimmt.' },
    initials: 'NT',
    photo: photoNural,
    universityUrl: 'https://www.istanbul.edu.tr',
    universityLogo: 'istanbul',
  },
  {
    slug: 'ali-temelci',
    name: 'DR. Ali Temelci',
    title: { en: 'Oral & Maxillofacial Surgeon', tr: 'Ağız, Diş ve Çene Cerrahisi Uzmanı', el: 'Στοματο-Γναθοπροσωπικός Χειρουργός', ru: 'Челюстно-Лицевой Хирург', ar: 'جراح الوجه والفكين', he: 'מנתח פה ולסת', fa: 'جراح دهان، فک و صورت', de: 'Mund-Kiefer-Gesichtschirurg' },
    experience: '8',
    university: { en: 'Near East University, 2018', tr: 'Yakın Doğu Üniversitesi, 2018', el: 'Πανεπιστήμιο Εγγύς Ανατολής, 2018', ru: 'Университет Ближнего Востока, 2018', ar: 'جامعة الشرق الأدنى، 2018', he: 'אוניברסיטת המזרח הקרוב, 2018', fa: 'دانشگاه خاور نزدیک، ۲۰۱۸', de: 'Nahost-Universität, 2018' },
    specialization: { en: 'Implants, Surgical Extractions & Facial Aesthetics', tr: 'İmplant, Cerrahi Çekim & Yüz Estetiği', el: 'Εμφυτεύματα, Χειρουργικές Εξαγωγές & Αισθητική Προσώπου', ru: 'Имплантаты, Хирургические Удаления & Эстетика Лица', ar: 'زراعة الأسنان، الخلع الجراحي وتجميل الوجه', he: 'שתלים, עקירות כירורגיות ואסתטיקת פנים', fa: 'ایمپلنت، کشیدن جراحی و زیبایی صورت', de: 'Implantate, Chirurgische Extraktionen & Gesichtsästhetik' },
    bio: { en: 'An oral and maxillofacial surgery specialist with extensive experience in dental implants, impacted wisdom tooth extractions, cyst operations and jaw infections. He uses 3D imaging and bone quality analysis to build individualised surgical protocols for each patient. He also performs facial aesthetic procedures including Botox and bichectomy, always prioritising long-term, sustainable results.', tr: 'Dental implant, gömülü yirmi yaş dişi çekimi, kist operasyonları ve ağız kaynaklı enfeksiyonların cerrahi tedavisinde geniş deneyime sahip ağız, diş ve çene cerrahisi uzmanıdır. Her vakada 3 boyutlu görüntüleme ve kemik kalitesi analizi ile bireyselleştirilmiş cerrahi protokoller oluşturur. Botoks ve bişektomi dahil yüz estetiği uygulamalarında da hizmet vermekte, uzun vadeli kalıcı çözümlere odaklanmaktadır.', el: 'Ειδικός στοματο-γναθοπροσωπικής χειρουργικής με εκτεταμένη εμπειρία σε εμφυτεύματα, εξαγωγές φρονιμιτών, κύστες και λοιμώξεις. Χρησιμοποιεί 3D απεικόνιση και ανάλυση ποιότητας οστού για εξατομικευμένα χειρουργικά πρωτόκολλα. Εκτελεί επίσης αισθητικές επεμβάσεις προσώπου όπως Botox και bichectomy.', ru: 'Специалист по челюстно-лицевой хирургии с обширным опытом в имплантатах, удалении ретинированных зубов, кистах и инфекциях. Использует 3D-визуализацию и анализ плотности кости для индивидуальных хирургических протоколов. Также проводит эстетические процедуры лица, включая Ботокс и бикэктомию.', ar: 'أخصائي جراحة الفم والفك والوجه بخبرة واسعة في الزراعات وخلع ضروس العقل المنطمرة والكيسات والالتهابات. يستخدم التصوير ثلاثي الأبعاد وتحليل جودة العظم لبناء بروتوكولات جراحية فردية. يجري أيضاً إجراءات تجميل الوجه بما فيها البوتوكس والبيشكتومي.', he: 'מנתח פה ולסת עם ניסיון נרחב בשתלים, עקירות שיני בינה נשכבות, ציסטות וזיהומים. משתמש בדימות תלת-ממדי וניתוח איכות עצם לבניית פרוטוקולים כירורגיים אישיים. מבצע גם הליכי אסתטיקת פנים כולל בוטוקס וביקקטומי.', fa: 'متخصص جراحی دهان، فک و صورت با تجربه گسترده در ایمپلنت، کشیدن دندان عقل نهفته، عملیات کیست و عفونت‌های دهانی. از تصویربرداری سه‌بعدی و آنالیز کیفیت استخوان برای پروتکل‌های جراحی فردی استفاده می‌کند. اقدامات زیبایی صورت شامل بوتاکس و بیشکتومی نیز انجام می‌دهد.', de: 'Mund-Kiefer-Gesichtschirurg mit umfangreicher Erfahrung in Implantaten, Weisheitszahnentfernungen, Zysten und Kieferinfektionen. Nutzt 3D-Bildgebung und Knochenqualitätsanalyse für individuelle Operationsprotokolle. Führt auch Gesichtsästhetik-Eingriffe durch, darunter Botox und Bichektomie.' },
    initials: 'AT',
    photo: photoAli,
    universityUrl: 'https://www.neu.edu.tr',
    universityLogo: 'neu',
  },
  {
    slug: 'rasih-denktas-celebi',
    name: 'DT. Rasih Denktaş Çelebi',
    title: { en: 'Senior Endodontist', tr: 'Kıdemli Endodonti Uzmanı', el: 'Ανώτερος Ενδοδοντολόγος', ru: 'Старший Эндодонтист', ar: 'أخصائي علاج جذور أقدم', he: 'אנדודונטיסט בכיר', fa: 'متخصص ارشد اندودنتی', de: 'Senior Endodontologe' },
    experience: '42',
    university: { en: 'Hacettepe University, 1984', tr: 'Hacettepe Üniversitesi, 1984', el: 'Πανεπιστήμιο Hacettepe, 1984', ru: 'Университет Хаджеттепе, 1984', ar: 'جامعة حجة تبة، 1984', he: 'אוניברסיטת האצ\'טפה, 1984', fa: 'دانشگاه حاجت‌تپه، ۱۹۸۴', de: 'Hacettepe Universität, 1984' },
    specialization: { en: 'Endodontics & Restorative Dentistry', tr: 'Endodonti & Restoratif Diş Hekimliği', el: 'Ενδοδοντία & Αποκαταστατική Οδοντιατρική', ru: 'Эндодонтия & Реставрационная Стоматология', ar: 'علاج الجذور وطب الأسنان الترميمي', he: 'אנדודונטיה ורפואת שיניים משקמת', fa: 'اندودنتی و دندانپزشکی ترمیمی', de: 'Endodontie & Restaurative Zahnmedizin' },
    bio: { en: 'The clinic\'s most experienced practitioner with 42 years of uninterrupted practice since graduating from Hacettepe University in 1984. He has witnessed and integrated every major technological shift in endodontics — from rotary instrumentation to digital radiology. Expert in anatomically complex canals, calcified cases and revisions of previously failed treatments; his deep diagnostic rigour underpins the clinic\'s consistently high endodontic success rates.', tr: '1984\'te Hacettepe Üniversitesi\'nden mezun olduğundan bu yana 42 yıllık kesintisiz pratiğiyle kliniğin en deneyimli hekimidir. Endodontideki her teknolojik dönüşümü yakından izleyerek klinik pratiğine entegre etmiştir. Anatomik açıdan karmaşık kanallar, kalsifiye vakalar ve başarısız tedavi revizyonlarında uzmandır; derin tanısal titizliği, kliniğin yüksek endodontik başarı oranlarının temelini oluşturmaktadır.', el: 'Ο πλέον έμπειρος κλινικός ιατρός με 42 συνεχή χρόνια πράξης από το 1984. Έχει ενσωματώσει κάθε τεχνολογική εξέλιξη στην ενδοδοντία. Ειδικός σε ανατομικά σύνθετα κανάλια, ασβεστοποιημένες περιπτώσεις και αποτυχημένες θεραπείες.', ru: 'Самый опытный клиницист с 42 годами практики с 1984 года. Интегрировал все технологические достижения эндодонтии. Специализируется на анатомически сложных каналах, кальцифицированных случаях и ревизии неудачных лечений.', ar: 'الطبيب الأكثر خبرة في العيادة بـ 42 عاماً من الممارسة المتواصلة منذ 1984. استوعب كل تطور تكنولوجي في علاج الجذور. متخصص في القنوات المعقدة تشريحياً والحالات المتكلسة ومراجعة العلاجات الفاشلة.', he: 'הרופא המנוסה ביותר עם 42 שנות עבודה מאז 1984. שילב כל התפתחות טכנולוגית באנדודונטיה. מומחה בתעלות מורכבות אנטומית, מקרים מסוידים ותיקון טיפולים כושלים.', fa: 'باتجربه‌ترین پزشک کلینیک با ۴۲ سال فعالیت مداوم از سال ۱۹۸۴. هر تحول فناورانه در اندودنتی را در عمل کلینیکی خود ادغام کرده است. متخصص در کانال‌های پیچیده از نظر آناتومیک، موارد کلسیفیه و بازبینی درمان‌های ناموفق.', de: 'Der erfahrenste Kliniker mit 42 Jahren ununterbrochener Praxis seit 1984. Hat jeden technologischen Wandel in der Endodontie integriert. Spezialist für anatomisch komplexe Kanäle, kalzifizierte Fälle und Revision fehlgeschlagener Behandlungen.' },
    initials: 'RD',
    photo: photoRasih,
    universityUrl: 'https://www.hacettepe.edu.tr',
    universityLogo: 'hacettepe',
  },
  {
    slug: 'serife-kole',
    name: 'DR. DT. Şerife Köle',
    title: { en: 'Prosthodontist', tr: 'Protetik Diş Tedavisi Uzmanı', el: 'Προσθετολόγος', ru: 'Стоматолог-Ортопед', ar: 'أخصائية تركيبات الأسنان', he: 'פרוסתודונטית', fa: 'متخصص پروتز دندان', de: 'Prothetik-Spezialistin' },
    experience: '8',
    university: { en: 'Near East University & Gazi University, 2022', tr: 'Yakın Doğu Üniversitesi & Gazi Üniversitesi, 2022', el: 'Πανεπιστήμιο Εγγύς Ανατολής & Πανεπιστήμιο Gazi, 2022', ru: 'Университет Ближнего Востока & Университет Гази, 2022', ar: 'جامعة الشرق الأدنى وجامعة غازي، 2022', he: 'אוניברסיטת המזרח הקרוב ואוניברסיטת גאזי, 2022', fa: 'دانشگاه خاور نزدیک و دانشگاه غازی، ۲۰۲۲', de: 'Nahost-Universität & Gazi-Universität, 2022' },
    specialization: { en: 'Implant Prosthetics, Laminate Veneers & Zirconia Crowns', tr: 'İmplant Protez, Laminate Veneer & Zirkonyum Kron', el: 'Προσθετική Εμφυτευμάτων, Πορσελάνινα Laminates & Κορώνες Ζιρκονίας', ru: 'Протезирование на Имплантатах, Виниры & Циркониевые Коронки', ar: 'تركيبات على الزرعات، قشور اللامينيت وتيجان الزركونيا', he: 'תותבות על שתלים, למינייט ציפוי וכתרי זירקוניה', fa: 'پروتز روی ایمپلنت، ونیر لامینیت و روکش زیرکونیا', de: 'Implantatprothetik, Laminate Veneers & Zirkonkronen' },
    bio: { en: 'Graduated top of her class at Near East University, then completed her doctoral specialisation in Prosthodontics at Gazi University (2022). Her multi-parametric approach to implant-supported prosthetics balances aesthetic harmony, bite force distribution and tissue compatibility. She applies the same scientific rigour to laminate veneers and zirconia crowns, calibrating colour, form and surface texture to match each patient\'s natural dentition.', tr: 'Yakın Doğu Üniversitesi\'nden dönem birincisi olarak mezun olmuş; ardından Gazi Üniversitesi\'nde Protetik Diş Tedavisi alanında doktorasını 2022\'de tamamlamıştır. İmplant üstü protez planlamasında estetik uyum, ısırma kuvvetlerinin dengeli dağılımı ve doku uyumunu bir arada değerlendirir. Aynı bilimsel titizliği lamine veneer ve zirkonyum kron uygulamalarına taşır; renk, form ve yüzey dokusunu hastanın doğal dişlerine göre kalibre eder.', el: 'Αποφοίτησε πρώτη από το Πανεπιστήμιο Εγγύς Ανατολής, στη συνέχεια ολοκλήρωσε διδακτορικό στην Προσθετική στο Πανεπιστήμιο Gazi (2022). Εξισορροπεί αισθητική, δύναμη δαγκώματος και συμβατότητα ιστών στις εμφυτευματικές προσθέσεις.', ru: 'Окончила с отличием Университет Ближнего Востока, затем — докторантуру по протезированию в Университете Гази (2022). В имплантационном протезировании балансирует эстетику, распределение жевательной нагрузки и тканевую совместимость.', ar: 'تخرجت الأولى من جامعة الشرق الأدنى ثم أكملت دكتوراه في التركيبات بجامعة غازي (2022). توازن في تركيبات الزرعات بين الجماليات وتوزيع قوة العض وتوافق الأنسجة.', he: 'סיימה ראשונה מאוניברסיטת המזרח הקרוב, לאחר מכן השלימה דוקטורט בפרוסתודונטיה באוניברסיטת גאזי (2022). מאזנת אסתטיקה, חלוקת כוחות לעיסה ותאימות רקמות בתותבות על שתלים.', fa: 'نفر اول از دانشگاه خاور نزدیک فارغ‌التحصیل شد، سپس دکترای تخصصی پروتز دندان را در دانشگاه غازی (۲۰۲۲) تکمیل کرد. در پروتزهای روی ایمپلنت بین هارمونی زیبایی، توزیع نیروی گاز و سازگاری بافتی تعادل برقرار می‌کند.', de: 'Schloss als Klassenbeste an der Nahost-Universität ab, dann Promotion in Prothetik an der Gazi-Universität (2022). Balanciert Ästhetik, Kaudruckverteilung und Gewebeverträglichkeit bei implantatgetragenem Zahnersatz.' },
    initials: 'SK',
    photo: photoSerife,
    universityUrl: 'https://www.gazi.edu.tr',
    universityLogo: 'gazi',
  },
  {
    slug: 'anna-zubtcovskaia-derya',
    name: 'DT. Anna Zubtcovskaia-Derya',
    title: { en: 'Endodontist & Preventive Dentist', tr: 'Endodonti & Koruyucu Diş Hekimi', el: 'Ενδοδοντολόγος & Προληπτική Οδοντιατρική', ru: 'Эндодонтист & Превентивный Стоматолог', ar: 'أخصائية علاج جذور وطب أسنان وقائي', he: 'אנדודונטיסטית ורפואת שיניים מונעת', fa: 'متخصص اندودنتی و دندانپزشکی پیشگیری', de: 'Endodontologin & Präventive Zahnärztin' },
    experience: '27+',
    university: { en: 'Izhevsk State Medical Academy (Russia), 1994', tr: 'Izhevsk Devlet Tıp Akademisi (Rusya), 1994', el: 'Κρατική Ιατρική Ακαδημία Ιζέβσκ (Ρωσία), 1994', ru: 'Ижевская Государственная Медицинская Академия, 1994', ar: 'أكاديمية إيجيفسك الطبية الحكومية (روسيا)، 1994', he: 'האקדמיה הרפואית הממלכתית של איז\'בסק (רוסיה), 1994', fa: 'آکادمی پزشکی دولتی ایژوسک (روسیه)، ۱۹۹۴', de: 'Staatliche Medizinische Akademie Ischewsk (Russland), 1994' },
    specialization: { en: 'Endodontics, Aesthetic Composites & Preventive Care', tr: 'Endodonti, Estetik Kompozit & Koruyucu Bakım', el: 'Ενδοδοντία, Αισθητικά Σύνθετα & Προληπτική Φροντίδα', ru: 'Эндодонтия, Эстетические Композиты & Профилактика', ar: 'علاج الجذور والحشوات التجميلية والرعاية الوقائية', he: 'אנדודונטיה, קומפוזיט אסתטי וטיפול מונע', fa: 'اندودنتی، کامپوزیت زیبایی و مراقبت پیشگیرانه', de: 'Endodontie, Ästhetische Komposite & Vorsorge' },
    bio: { en: 'A graduate of Izhevsk State Medical Academy, Russia (1994), Dt. Zubtcovskaia-Derya brings 27+ years of specialisation in endodontic treatment, aesthetic composite restorations and professional oral hygiene. Her international background gives her a natural ability to connect with patients from diverse cultures — an asset highly valued in the clinic\'s international patient environment. She is a strong advocate of preventive dentistry and guides every patient toward six-monthly check-ups.', tr: '1994\'te Rusya\'nın Izhevsk Devlet Tıp Akademisi\'nden mezun olan Dt. Zubtcovskaia-Derya, 27 yılı aşkın pratiğini endodontik tedavi, estetik kompozit restorasyon ve profesyonel ağız hijyeni üzerine yoğunlaştırmıştır. Uluslararası mesleki geçmişi, farklı kültürlerden hastalara etkin iletişim kurmasını kolaylaştırmakta; kliniğimizin uluslararası hasta ortamında büyük değer taşımaktadır. Önleyici diş hekimliğini güçlü savunan hekim, her hastasını altı aylık periyodik kontrole yönlendirir.', el: 'Απόφοιτος της Κρατικής Ιατρικής Ακαδημίας Ιζέβσκ (1994) με 27+ χρόνια εξειδίκευσης σε ενδοδοντεία, αισθητικές αποκαταστάσεις και ένα πλούσιο υπόβαθρο για πολυπολιτισμικούς ασθενείς. Ισχυρός υποστηρικτής προληπτικής οδοντιατρικής.', ru: 'Выпускница Ижевской государственной медицинской академии (1994) с 27+ годами специализации в эндодонтии, эстетических реставрациях и профилактике. Международный опыт помогает эффективно общаться с пациентами разных культур.', ar: 'خريجة أكاديمية إيجيفسك الطبية (1994) بخبرة 27+ سنة في علاج الجذور والترميم التجميلي وصحة الفم. خلفيتها الدولية تُمكّنها من التواصل مع مرضى من ثقافات متعددة.', he: 'בוגרת האקדמיה הרפואית של איז\'בסק (1994) עם 27+ שנות התמחות באנדודונטיה, שיחזורים אסתטיים ואנטיסגה מקצועית. רקעה הבינלאומי מעניק לה יכולת טבעית להתחבר למטופלים ממגוון תרבויות.', fa: 'فارغ‌التحصیل آکادمی پزشکی دولتی ایژوسک (۱۹۹۴) با بیش از ۲۷ سال تخصص در اندودنتی، ترمیم زیبایی و بهداشت دهان. پیشینه بین‌المللی‌اش ارتباط طبیعی با بیماران از فرهنگ‌های مختلف را ممکن می‌سازد.', de: 'Absolventin der Staatlichen Medizinischen Akademie Ischewsk (1994) mit 27+ Jahren Spezialisierung in Endodontie, ästhetischen Restaurationen und professioneller Mundhygiene. Ihr internationaler Hintergrund erleichtert die Kommunikation mit Patienten aus verschiedenen Kulturen.' },
    initials: 'AZ',
    photo: photoAnna,
    universityUrl: 'https://igma.izhevsk.ru',
    universityLogo: 'izhevsk',
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

// University logo badges
const UNIVERSITY_LOGOS: Record<string, { abbr: string; full: string; color: string; bg: string }> = {
  istanbul:  { abbr: 'İÜ',  full: 'İstanbul Üniversitesi',         color: '#c0392b', bg: '#fdf0ef' },
  neu:       { abbr: 'NEU', full: 'Near East University',           color: '#003087', bg: '#eef2fb' },
  hacettepe: { abbr: 'HÜ',  full: 'Hacettepe Üniversitesi',         color: '#B5121B', bg: '#fdf0ef' },
  gazi:      { abbr: 'GÜ',  full: 'Gazi Üniversitesi',             color: '#cc0000', bg: '#fdf0ef' },
  izhevsk:   { abbr: 'IGMA',full: 'Izhevsk State Medical Academy', color: '#1a4f8a', bg: '#eef2fb' },
};

const ABOUT_COPY = {
  en: {
    seoTitle: 'Dentists and Clinical Team in Kyrenia | Temelci Dental',
    seoDescription: 'Meet the dentists and clinical team at Temelci Dental Clinic in Kyrenia, North Cyprus.',
    intro: 'Temelci Dental is a family clinic in Kyrenia focused on clear diagnosis, personal treatment planning and coordinated follow-up. Our clinicians work across restorative, cosmetic, surgical and preventive dentistry.',
    established: 'Established in 1990', clinicians: 'clinicians', support: 'Multilingual patient support',
    planning: 'Personal care planning', team: 'Collaborative clinical team', education: 'Education',
    visit: 'Visit', profile: 'View academic profile & publications', clinician: 'Dental clinician',
  },
  de: {
    seoTitle: 'Zahnärzte und Praxisteam in Kyrenia | Temelci Dental',
    seoDescription: 'Lernen Sie die Zahnärzte und das klinische Team der Temelci Dental Clinic in Kyrenia, Nordzypern, kennen.',
    intro: 'Temelci Dental ist eine familiengeführte Klinik in Kyrenia mit Schwerpunkt auf klarer Diagnostik, persönlicher Behandlungsplanung und koordinierter Nachsorge. Unser Team deckt restaurative, ästhetische, chirurgische und präventive Zahnmedizin ab.',
    established: 'Seit 1990', clinicians: 'Behandler', support: 'Mehrsprachige Patientenbetreuung',
    planning: 'Persönliche Behandlungsplanung', team: 'Interdisziplinäres Behandlungsteam', education: 'Ausbildung',
    visit: 'Website besuchen', profile: 'Akademisches Profil und Publikationen', clinician: 'Zahnärztliche Fachkraft',
  },
  tr: {
    seoTitle: 'Girne Diş Hekimleri ve Klinik Ekibi | Temelci Dental',
    seoDescription: 'Girne, Kuzey Kıbrıs’taki Temelci Dental Clinic’in diş hekimleri ve klinik ekibiyle tanışın.',
    intro: 'Temelci Dental; doğru tanı, kişiye özel tedavi planlaması ve koordineli takibe odaklanan, Girne’deki bir aile kliniğidir. Hekimlerimiz restoratif, estetik, cerrahi ve koruyucu diş hekimliği alanlarında birlikte çalışır.',
    established: '1990’dan beri', clinicians: 'klinik hekimi', support: 'Çok dilli hasta desteği',
    planning: 'Kişiye özel tedavi planı', team: 'Birlikte çalışan klinik ekip', education: 'Eğitim',
    visit: 'Ziyaret et', profile: 'Akademik profil ve yayınları görüntüle', clinician: 'Diş hekimi',
  },
  he: {
    seoTitle: 'רופאי שיניים והצוות הקליני בקירניה | Temelci Dental',
    seoDescription: 'הכירו את רופאי השיניים והצוות הקליני של Temelci Dental בקירניה, צפון קפריסין.',
    intro: 'Temelci Dental היא מרפאה משפחתית בקירניה המתמקדת באבחון ברור, תכנון טיפול אישי ומעקב מתואם. הצוות שלנו עוסק ברפואת שיניים משקמת, אסתטית, כירורגית ומונעת.',
    established: 'פועלים מאז 1990', clinicians: 'אנשי צוות קליני', support: 'תמיכה רב-לשונית למטופלים',
    planning: 'תכנון טיפול אישי', team: 'צוות קליני רב-תחומי', education: 'השכלה',
    visit: 'לביקור באתר', profile: 'לפרופיל האקדמי ולפרסומים', clinician: 'רופא שיניים',
  },
  ru: {
    seoTitle: 'Стоматологи и команда клиники в Кирении | Temelci Dental',
    seoDescription: 'Познакомьтесь со стоматологами и клинической командой Temelci Dental Clinic в Кирении, Северный Кипр.',
    intro: 'Temelci Dental — семейная клиника в Кирении, где особое внимание уделяется точной диагностике, индивидуальному планированию и согласованному наблюдению. Наша команда работает в восстановительной, эстетической, хирургической и профилактической стоматологии.',
    established: 'Работаем с 1990 года', clinicians: 'специалистов', support: 'Многоязычная поддержка пациентов',
    planning: 'Индивидуальный план лечения', team: 'Слаженная клиническая команда', education: 'Образование',
    visit: 'Перейти на сайт', profile: 'Академический профиль и публикации', clinician: 'Стоматолог',
  },
} as const;

const AboutPage = () => {
  const { t, lang, localePath } = useLanguage();
  const copy = ABOUT_COPY[lang as keyof typeof ABOUT_COPY] || ABOUT_COPY.en;
  const { data: dbDoctors, isError: doctorsError } = useDoctorsFromDb();
  const { data: page } = useSitePage('about');
  useSEO({ title: lang === 'en' && page?.seo_title ? page.seo_title : copy.seoTitle, description: lang === 'en' && page?.seo_description ? page.seo_description : copy.seoDescription, canonical: `https://temelcidentist.com${localePath('/about')}`, ogImage: page?.og_image || page?.hero_image || undefined });

  // The CMS is authoritative when available. Known clinicians retain their
  // existing education details, while newly added clinicians appear too.
  const staticBySlug = new Map(doctors.map(doctor => [doctor.slug, doctor]));
  const visibleDbDoctors = (dbDoctors || []).filter(db => db.slug !== 'yaskan-ugurlu' && !db.name.toLocaleLowerCase('tr-TR').includes('yaşkan uğurlu'));
  const doctorsToRender = (visibleDbDoctors.length && !doctorsError)
    ? visibleDbDoctors.map((db) => {
          const existing = staticBySlug.get(db.slug);
          return {
            slug: db.slug,
            name: db.name,
            photo: db.photo || existing?.photo || null,
            title: existing?.title[lang] || db.title || existing?.title.en || copy.clinician,
            bio: existing?.bio[lang] || db.bio || existing?.bio.en || '',
            university: existing?.university[lang] || existing?.university.en || '',
            specialization: existing?.specialization[lang] || db.specialties?.join(' · ') || existing?.specialization.en || '',
            experience: existing?.experience || '',
            initials: existing?.initials || db.name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase(),
            universityUrl: existing?.universityUrl,
            universityLogo: existing?.universityLogo,
          };
        })
    : doctors.map(doctor => ({ ...doctor, title: doctor.title[lang], bio: doctor.bio[lang], university: doctor.university[lang], specialization: doctor.specialization[lang] }));


  return (
    <>
      {/* Header */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <h1 className="heading-display mb-4">{lang === 'en' && page?.hero_title ? page.hero_title : t.aboutTitle}</h1>
          <p className="text-body max-w-2xl mx-auto">{lang === 'en' && page?.hero_description ? page.hero_description : t.aboutSubtitle}</p>
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
              <p className="text-body mb-6">{copy.intro}</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">{copy.established}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">{doctorsToRender.length} {copy.clinicians}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">{copy.support}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">{copy.planning}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl mb-6">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{copy.team}</span>
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
      <section id="doctors" className="section-padding bg-secondary/30">
        <div className="container-dental">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="heading-section mb-3">{t.ourDoctors}</h2>
            <p className="text-body max-w-2xl mx-auto">{t.ourDoctorsSubtitle.replace(/\b6\b/, String(doctorsToRender.length)).replace('127+', '100+')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctorsToRender.map((doc, i) => (
              <motion.div
                key={i}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Full-width square photo */}
                <div className="aspect-square w-full overflow-hidden bg-primary/5">
                  {doc.photo ? <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" /> : <div className="flex h-full w-full items-center justify-center text-5xl font-display font-bold text-primary/60" aria-label={doc.name}>{doc.initials}</div>}
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-display font-semibold text-foreground text-lg">{doc.name}</h3>
                    <p className="text-sm text-primary font-medium mt-0.5">{doc.title}</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    {doc.university && <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{doc.university}</span>
                    </div>}
                    {doc.specialization && <div className="flex items-center gap-2">
                      <Smile className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{doc.specialization}</span>
                    </div>}
                    {doc.experience && <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{doc.experience} {t.yearsExperience}</span>
                    </div>}
                  </div>

                  {doc.bio && <p className="text-sm text-foreground/70 leading-relaxed">{doc.bio}</p>}

                  {/* University logo + link */}
                  {doc.universityLogo && UNIVERSITY_LOGOS[doc.universityLogo] && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        {copy.education}
                      </p>
                      <a
                        href={doc.universityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 group"
                      >
                        {/* Logo badge */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-black text-xs transition-transform group-hover:scale-105"
                          style={{
                            backgroundColor: UNIVERSITY_LOGOS[doc.universityLogo].bg,
                            color: UNIVERSITY_LOGOS[doc.universityLogo].color,
                            border: `1.5px solid ${UNIVERSITY_LOGOS[doc.universityLogo].color}30`,
                          }}
                        >
                          {UNIVERSITY_LOGOS[doc.universityLogo].abbr}
                        </div>
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors leading-tight">
                          {UNIVERSITY_LOGOS[doc.universityLogo].full}
                          <span className="block text-[10px] opacity-60">↗ {copy.visit}</span>
                        </span>
                      </a>
                    </div>
                  )}

                  {doc.initials === 'SK' && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link
                        to={localePath('/dr-serife-kole')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        📚 {copy.profile} →
                      </Link>
                    </div>
                  )}
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
          <QuoteButton text={t.bookWhatsApp} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
