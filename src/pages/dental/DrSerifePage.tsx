import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { BookOpen, Award, GraduationCap, Globe, ExternalLink, FlaskConical } from 'lucide-react';

const publications = [
  {
    type: 'journal',
    year: '2023',
    title: 'Bond strength of various post-core restorations with different lengths and diameters following cycle loading',
    journal: 'Journal of the Mechanical Behavior of Biomedical Materials',
    publisher: 'Elsevier',
    indexing: 'SCI',
    coauthors: 'Gulfem Ergun',
    doi: '',
    note_en: 'Peer-reviewed experimental study on post-core restorations under cyclic loading conditions.',
    note_tr: 'Döngüsel yükleme koşullarında post-kor restorasyonları üzerine hakemli deneysel çalışma.',
  },
  {
    type: 'book_chapter',
    year: '2024',
    title: 'The Use of High-Performance Polymers in Dentistry (PEEK & PEKK)',
    journal: 'Paris Medical Books',
    publisher: 'International Medical Publication',
    indexing: '',
    coauthors: 'Gulfem Ergun',
    doi: '',
    note_en: 'Comprehensive review of PEEK and PEKK materials as alternative framework materials in prosthetic dentistry.',
    note_tr: 'Protetik diş hekimliğinde alternatif iskelet materyali olarak PEEK ve PEKK malzemelerinin kapsamlı incelemesi.',
  },
  {
    type: 'book_chapter',
    year: '2024',
    title: 'Ti-Base Implant Components in Prosthetic Rehabilitation',
    journal: 'Multidisciplinary Approach in Medical Science V',
    publisher: 'Academic Publication',
    indexing: '',
    coauthors: '',
    doi: '',
    note_en: 'Book chapter on Ti-Base implant abutment systems and their clinical applications.',
    note_tr: 'Ti-Base implant dayanak sistemleri ve klinik uygulamaları üzerine kitap bölümü.',
  },
  {
    type: 'book_chapter',
    year: '2025',
    title: 'Modern Sağlık Bilimlerinde Protetik Diş Tedavisi',
    journal: 'Modern Sağlık Bilimleri: Teori, Metodoloji ve Uygulama',
    publisher: 'Zenodo (DOI: 10.5281/zenodo.17419778)',
    indexing: '',
    coauthors: '',
    doi: 'https://zenodo.org/record/17419778',
    note_en: 'Book chapter on prosthodontic treatment in modern health sciences.',
    note_tr: 'Modern sağlık bilimlerinde protetik diş tedavisi üzerine kitap bölümü.',
  },
  {
    type: 'congress',
    year: '2024',
    title: '3-Year Follow-Up of Fixed Implant-Supported Prosthesis Applications to Maxilla and Mandible with All-on-Four Treatment Option',
    journal: 'Latin America 4th International Conference on Scientific Researches',
    publisher: 'Proceedings Book',
    indexing: '',
    coauthors: 'Gülfem Ergün',
    doi: '',
    note_en: 'Three-year clinical follow-up of All-on-Four implant prosthetic rehabilitation in both jaws.',
    note_tr: 'Üst ve alt çenede All-on-Four implant destekli sabit protez uygulamalarının 3 yıllık klinik takibi.',
  },
  {
    type: 'congress',
    year: '2024',
    title: 'Evaluation of Different Attachments Used for Mandibular Two Implant-Supported Overdenture Prosthesis',
    journal: 'Latin America 4th International Conference on Scientific Researches',
    publisher: 'Proceedings Book',
    indexing: '',
    coauthors: 'Gülfem Ergün',
    doi: '',
    note_en: 'Comparative evaluation of attachment systems for two-implant overdenture rehabilitation.',
    note_tr: 'İki implant destekli overdenture rehabilitasyonunda ataşman sistemlerinin karşılaştırmalı değerlendirmesi.',
  },
  {
    type: 'congress',
    year: '2024',
    title: 'Provisional Prosthesis Options and Fabrication Techniques in All-on-Four Implant Applications',
    journal: 'Protetik Diş Tedavisi — Special Issue',
    publisher: 'Turkish Dental Journal',
    indexing: '',
    coauthors: 'Gülfem Ergün',
    doi: '',
    note_en: 'Clinical review of temporary prosthesis choices and fabrication methods for All-on-Four implant cases.',
    note_tr: 'All-on-Four implant vakalarında geçici protez seçenekleri ve yapım tekniklerinin klinik incelemesi.',
  },
  {
    type: 'congress',
    year: '2024',
    title: 'Current Developments in Post Materials',
    journal: '6th International World Health Congress',
    publisher: 'Proceedings Book — Bayburt, Turkey',
    indexing: '',
    coauthors: 'Gülfem Ergün',
    doi: '',
    note_en: 'Review of current evidence on post and core material selection for endodontically treated teeth.',
    note_tr: 'Endodontik tedavili dişlerde güncel post ve kor materyali seçimine ilişkin kanıt derlemesi.',
  },
  {
    type: 'case_report',
    year: '2024',
    title: 'Rehabilitation of a Patient with Marginal Mandibulectomy Using Implant-Supported Prosthetic Restoration',
    journal: 'Congress Poster Presentation',
    publisher: 'Temelci Dental Clinic & Cyprus Health and Social Sciences University',
    indexing: '',
    coauthors: 'Dr. Ali Temelci',
    doi: '',
    note_en: 'Case report on implant-supported prosthetic rehabilitation following oral cancer surgery and mandibular reconstruction.',
    note_tr: 'Ağız kanseri ameliyatı ve mandibular rekonstrüksiyon sonrası implant destekli protetik rehabilitasyon vaka raporu.',
  },
];

const typeConfig: Record<string, { label: string; labelTr: string; color: string; icon: string }> = {
  journal:      { label: 'Peer-Reviewed Journal',  labelTr: 'Hakemli Dergi Makalesi', color: 'bg-blue-500/10 text-blue-700 border-blue-200',    icon: '📄' },
  book_chapter: { label: 'Book Chapter',            labelTr: 'Kitap Bölümü',           color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200', icon: '📚' },
  congress:     { label: 'Congress Publication',    labelTr: 'Kongre Bildirisi',        color: 'bg-purple-500/10 text-purple-700 border-purple-200', icon: '🎓' },
  case_report:  { label: 'Case Report',             labelTr: 'Vaka Raporu',             color: 'bg-amber-500/10 text-amber-700 border-amber-200',   icon: '🏥' },
};

const DrSerifePage = () => {
  const { t, lang } = useLanguage();
  const isTr = lang === 'tr';

  return (
    <>
      {/* HERO */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-28 h-28 rounded-2xl bg-rose-500/10 flex items-center justify-center text-4xl font-display font-bold text-rose-600 border border-rose-200">
                  SK
                </div>
              </div>
              {/* Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                    <FlaskConical size={11} /> {isTr ? 'Akademisyen & Klinisyen' : 'Academic & Clinician'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                    SCI {isTr ? 'Yayın Sahibi' : 'Published'}
                  </span>
                </div>
                <h1 className="heading-display mb-1">DR. DT. Şerife Köle</h1>
                <p className="text-primary font-semibold mb-1">
                  {isTr ? 'Protetik Diş Tedavisi Uzmanı' : 'Prosthodontist'}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {isTr
                    ? 'Kıbrıs Sağlık ve Toplum Bilimleri Üniversitesi · Temelci Diş Kliniği, Girne'
                    : 'Cyprus Health and Social Sciences University · Temelci Dental, Kyrenia'}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  ORCID: <a href="https://orcid.org/0000-0002-2479-6643" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono">0000-0002-2479-6643</a>
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <WhatsAppButton text={isTr ? 'Randevu Al' : 'Book Appointment'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="space-y-4">
              {[
                { icon: GraduationCap, label: isTr ? 'Eğitim' : 'Education', value: isTr ? 'YDÜ + Gazi Üniversitesi (Doktora 2022)' : 'Near East Univ. + Gazi Univ. (PhD 2022)' },
                { icon: Award, label: isTr ? 'Uzmanlık' : 'Specialisation', value: isTr ? 'Protetik Diş Tedavisi' : 'Prosthodontics' },
                { icon: BookOpen, label: isTr ? 'Yayın' : 'Publications', value: `${publications.length} ${isTr ? 'Akademik Eser' : 'Academic Works'}` },
                { icon: Globe, label: isTr ? 'Akademik Kurum' : 'Academic Affiliation', value: isTr ? 'KTSÜ Diş Hekimliği Fakültesi' : 'CHSSU Faculty of Dentistry' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                  <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio text */}
            <div className="md:col-span-2">
              <h2 className="heading-section mb-4">{isTr ? 'Hakkında' : 'About'}</h2>
              <div className="space-y-4 text-body text-sm leading-relaxed">
                {isTr ? (
                  <>
                    <p>Dr. Şerife Köle, Yakın Doğu Üniversitesi Diş Hekimliği Fakültesi'nden dönem birincisi olarak mezun olmuş; ardından Gazi Üniversitesi Protetik Diş Tedavisi Anabilim Dalı'nda doktorasını 2022 yılında tamamlamıştır. Kıbrıs Sağlık ve Toplum Bilimleri Üniversitesi Diş Hekimliği Fakültesi'nde öğretim üyesi olarak görev yapmakta, Temelci Diş Kliniği'nde ise uzman hekim olarak hizmet vermektedir.</p>
                    <p>Klinik pratiği; implant destekli sabit ve hareketli protezler, lamine veneer, zirkonyum kron ve All-on-Four tam çene rehabilitasyonu üzerine yoğunlaşmaktadır. Protetik planlama sürecinde estetik uyum, oklüzal denge ve uzun vadeli doku sağlığını bir arada değerlendiren bütünleşik bir yaklaşım benimsemektedir.</p>
                    <p>Aktif bir araştırmacı olarak implant biyomekaniği, ileri restoratif materyaller ve tam çene rehabilitasyonu alanlarında çalışmalarını sürdürmektedir. Elsevier'ın SCI endeksli Journal of the Mechanical Behavior of Biomedical Materials dergisinde yayımlanan makalesi ve uluslararası kitap bölümleri, akademik katkılarının öne çıkan örnekleridir.</p>
                  </>
                ) : (
                  <>
                    <p>Dr. Şerife Köle graduated top of her class from Near East University Faculty of Dentistry and subsequently completed her doctoral specialisation in Prosthodontics at Gazi University (2022). She serves as a faculty member at Cyprus Health and Social Sciences University Faculty of Dentistry and as a specialist at Temelci Dental Clinic, Kyrenia.</p>
                    <p>Her clinical practice focuses on implant-supported fixed and removable prosthetics, laminate veneers, zirconia crowns and All-on-Four full-arch rehabilitation. Her treatment planning integrates aesthetic harmony, occlusal balance and long-term tissue health into a unified clinical approach.</p>
                    <p>As an active researcher, her work spans implant biomechanics, advanced restorative materials and full-arch rehabilitation. Her SCI-indexed publication in Elsevier's Journal of the Mechanical Behavior of Biomedical Materials and multiple international book chapters represent the breadth of her academic contributions.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="section-padding bg-secondary/20">
        <div className="container-dental max-w-4xl">
          <div className="text-center mb-10">
            <Link to={localePath("/research")} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-4 block">
              📄 View all publications with full text & PDF download →
            </Link>
            <h2 className="heading-section mb-3">
              {isTr ? 'Akademik Yayınlar & Araştırmalar' : 'Academic Publications & Research'}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              {isTr
                ? 'Dr. Köle\'nin hakemli dergiler, uluslararası kitaplar ve kongre bildirilerindeki akademik katkıları'
                : "Dr. Köle's academic contributions in peer-reviewed journals, international books and congress proceedings"}
            </p>
          </div>

          <div className="space-y-4">
            {publications.map((pub, i) => {
              const cfg = typeConfig[pub.type];
              return (
                <motion.div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-sm transition-all"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
                      <span>{cfg.icon}</span>
                      {isTr ? cfg.labelTr : cfg.label}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {pub.year}
                    </span>
                    {pub.indexing && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                        {pub.indexing} Indexed
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-foreground text-sm leading-snug mb-2">
                    {pub.title}
                  </h3>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
                    <span className="font-medium text-foreground/70">{pub.journal}</span>
                    {pub.publisher && <span>· {pub.publisher}</span>}
                    {pub.coauthors && <span>· {isTr ? 'Ortak yazar:' : 'With:'} {pub.coauthors}</span>}
                  </div>

                  <p className="text-xs text-muted-foreground italic">
                    {isTr ? pub.note_tr : pub.note_en}
                  </p>

                  {pub.doi && (
                    <a href={pub.doi} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline font-medium">
                      <ExternalLink size={11} /> {isTr ? 'Yayına eriş' : 'View publication'}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AREAS OF EXPERTISE */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8 text-center">
            {isTr ? 'Uzmanlık Alanları' : 'Areas of Expertise'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(isTr ? [
              'Diş İmplantı Protezi',
              'All-on-Four / All-on-Six',
              'Overdenture Sistemleri',
              'Lamine Veneer',
              'Zirkonyum Kron',
              'Hollywood Smile Tasarımı',
              'Ti-Base İmplant Sistemleri',
              'PEEK / PEKK Materyaller',
              'Post-Kor Restorasyonlar',
              'Tam Çene Rehabilitasyonu',
              'Oklüzal Denge & Temporomandibular',
              'Dijital Protetik Planlama',
            ] : [
              'Implant Prosthetics',
              'All-on-Four / All-on-Six',
              'Overdenture Systems',
              'Laminate Veneers',
              'Zirconia Crowns',
              'Hollywood Smile Design',
              'Ti-Base Implant Systems',
              'PEEK / PEKK Materials',
              'Post-Core Restorations',
              'Full-Arch Rehabilitation',
              'Occlusion & TMJ',
              'Digital Prosthetic Planning',
            ]).map((area, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-xl text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">
            {isTr ? 'Dr. Şerife ile Konsültasyon Alın' : 'Book a Consultation with Dr. Şerife'}
          </h2>
          <p className="text-primary-foreground/70 mb-6 text-sm max-w-xl mx-auto">
            {isTr
              ? 'İmplant protezi, veneer veya tam çene rehabilitasyonu için akademik uzmanlıkla desteklenmiş klinik değerlendirme'
              : 'Clinical assessment backed by academic expertise — for implant prosthetics, veneers or full-arch rehabilitation'}
          </p>
          <WhatsAppButton text={isTr ? 'Ücretsiz Konsültasyon' : 'Free Consultation'} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default DrSerifePage;
