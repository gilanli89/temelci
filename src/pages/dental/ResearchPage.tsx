import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { Download, ExternalLink, BookOpen, FlaskConical, GraduationCap } from 'lucide-react';

export const publications = [
  {
    slug: 'bond-strength-post-core-peek-pekk-zirconia',
    year: '2023',
    type: 'journal',
    indexing: 'SCI',
    title: 'Bond Strength of Various Post-Core Restorations with Different Lengths and Diameters Following Cycle Loading',
    titleTr: 'Farklı Uzunluk ve Çaplara Sahip Post-Kor Restorasyonlarının Döngüsel Yükleme Sonrası Bağlanma Dayanımı',
    journal: 'Journal of the Mechanical Behavior of Biomedical Materials',
    publisher: 'Elsevier',
    volume: '142 (2023) 105804',
    authors: 'Şerife Köle, Gülfem Ergün',
    affiliation: 'Department of Prosthodontics, Faculty of Dentistry, Gazi University, Ankara, Turkey',
    pdf: '/research/bond-strength-post-core-peek-pekk-zirconia-2023.pdf',
    keywords: ['PEEK', 'PEKK', 'zirconia post', 'fiber post', 'push-out bond strength', 'cyclic loading', 'CAD/CAM', 'post-core restoration', 'endodontically treated teeth'],
    abstract: 'This in vitro study evaluated the bonding strengths of Polyether ether ketone (PEEK), Polyether ketone ketone (PEKK), fiber, and zirconia (ZrO₂) post-core restorations with posts in different diameters and lengths following chewing simulation. Endodontic treatment was performed on 256 intact maxillary central teeth. Test specimens were divided into four groups: Glass fiber post-composite core (FB, n=64), Zirconia post-core (Zr, n=64), PEEK post-core (PE, n=64), and PEKK post-core (PK, n=64). Each group was further divided into four subgroups based on diameter and length (n=16). Custom PEKK, PEEK, and Zirconia post-cores were milled using CAD/CAM technology. After cementation with dual-cure resin cement, specimens were subjected to 250,000 cycles at 50 N in a chewing simulator. Push-out bond strength was assessed across cervical, middle, and apical root sections.',
    findings: [
      'Cyclic loading significantly reduced bond strength across all post-core materials (p<0.05)',
      'Zirconia post-cores showed the highest initial bond strength values in the cervical section (14.80 MPa)',
      'PEEK post-cores demonstrated the lowest bond strength values overall under cyclic loading conditions',
      'Failure mode analysis revealed that adhesive failures (Type 1 and 2) were most prevalent across all groups',
      'Post diameter and length significantly influenced bond strength distribution across cervical, middle, and apical sections',
      'PEKK showed superior performance compared to PEEK due to its higher ketone/ether ratio providing better mechanical properties',
    ],
    clinicalRelevance: 'This study provides critical biomechanical data for clinicians selecting post-core materials in endodontically treated teeth. The finding that zirconia and fiber posts maintain superior bond strength under simulated masticatory loading supports their use in posterior teeth subjected to high occlusal forces. PEEK and PEKK represent viable alternatives particularly in aesthetic zones where metal-free restorations are required.',
    methodology: '256 extracted maxillary central incisors were randomly allocated to four post-core material groups. CAD/CAM milling (Redon Hybrid CAD/CAM system) was used to fabricate custom PEEK, PEKK, and Zirconia post-cores. All specimens were cemented with dual-cure resin cement following standardised surface treatment protocols. Cyclic loading was performed at 250,000 cycles with 50 N force. Push-out testing was conducted on 1.5 mm root sections using a universal testing machine. Scanning electron microscopy (SEM) was used to characterise failure modes.',
  },
  {
    slug: 'high-performance-polymers-peek-pekk-dentistry',
    year: '2024',
    type: 'book_chapter',
    indexing: '',
    title: 'The Use of High-Performance Polymers (PEEK & PEKK) in Dentistry',
    titleTr: 'Yüksek Performanslı Polimerlerin (PEEK & PEKK) Diş Hekimliğinde Kullanımı',
    journal: 'Paris Medical Books',
    publisher: 'International Medical Publication (pp. 321–329)',
    volume: '',
    authors: 'Şerife Köle, Gülfem Ergün',
    affiliation: 'Cyprus Health and Social Sciences University, Department of Prosthodontics; Gazi University, Faculty of Dentistry',
    pdf: '/research/high-performance-polymers-peek-pekk-dentistry.pdf',
    keywords: ['PEEK', 'PEKK', 'high-performance polymers', 'polyaryletherketone', 'dental framework material', 'prosthetic dentistry', 'implant abutment', 'CAD/CAM', 'biocompatibility'],
    abstract: 'This comprehensive review examines the usage areas of polyether ether ketone (PEEK) and polyether ketone ketone (PEKK) materials in dentistry. Published between 2010 and 2023, relevant literature from PubMed/MEDLINE, Web of Science, Google Scholar, Cochrane Library, and Scopus was systematically reviewed. PEEK and PEKK belong to the polyaryletherketone (PAEK) family of semi-crystalline thermoplastic polymers. Their high fracture resistance, biocompatibility, lightweight nature, and shock absorption properties have positioned them as alternative framework materials in prosthetic dental treatments, challenging traditional materials such as zirconia, ceramics, titanium, and cobalt-chromium alloys.',
    findings: [
      'PEKK exhibits superior mechanical properties to PEEK: higher compressive strength (206 vs 117 MPa), flexural strength (193 vs 170 MPa), and glass transition temperature (165°C vs 143°C)',
      'PEEK has an elastic modulus (3–4 GPa) close to cortical bone, making it advantageous for stress distribution in implant applications',
      'PEKK compressive strength (246 MPa) is comparable to dentin (297 MPa), supporting its use as post-core material',
      'CAD/CAM-milled three-unit fixed prostheses with PEEK frameworks demonstrate fracture strength exceeding 2055 N',
      'Both PEEK and PEKK show excellent biocompatibility and low plaque affinity compared to metal alloys',
      'Primary limitation: low translucency and greyish colour restrict monolithic use in anterior aesthetic zones',
    ],
    clinicalRelevance: 'PEEK and PEKK offer clinicians metal-free alternatives with bone-like elastic moduli, potentially reducing stress shielding in implant-supported prostheses. Their CAD/CAM processability enables precise fit, and their shock-absorbing properties make them particularly suitable for implant abutments, post-cores, and removable partial denture frameworks in patients with bruxism or parafunctional habits.',
    methodology: 'Systematic literature review of publications from 2010–2023 in PubMed/MEDLINE, Web of Science, Google Scholar, Cochrane Library, and Scopus. Search terms: "PEEK dentistry", "PEKK dental", "polyaryletherketone prosthodontics". Studies evaluated material properties, clinical performance, CAD/CAM fabrication, and comparative outcomes against zirconia, titanium, and conventional polymers.',
  },
  {
    slug: 'ti-base-abutments-implant-prosthetics',
    year: '2024',
    type: 'book_chapter',
    indexing: 'Zenodo DOI',
    title: 'The Success of Titanium-Based Abutments (Ti-Base) Used in Implant-Supported Prosthetic Restorations',
    titleTr: 'İmplant Destekli Protetik Restorasyonlarda Kullanılan Titanyum Bazlı Dayanak (Ti-Base) Başarısı',
    journal: 'Multidisciplinary Approach in Medical Science V',
    publisher: 'IKSAD Publishing House, ISBN: 978-625-378-013-5',
    volume: 'Chapter 6, pp. 79–102',
    authors: 'Şerife Köle Kocadal',
    affiliation: 'Cyprus Health and Social Sciences University, Department of Prosthodontics. ORCID: 0000-0002-2479-6643',
    doi: 'https://dx.doi.org/10.5281/zenodo.14423681',
    pdf: '/research/ti-base-abutments-implant-prosthetics.pdf',
    keywords: ['Ti-Base abutment', 'implant-supported prosthetics', 'titanium abutment', 'zirconia crown on implant', 'digital dentistry', 'CAD/CAM implant prosthetics', 'hybrid abutment', 'screw-retained crown'],
    abstract: 'This comprehensive chapter reviews the clinical success of titanium-based (Ti-Base) abutments in implant-supported prosthetic restorations. Ti-Base abutments represent a significant advancement in implant prosthodontics, enabling the fabrication of high-quality ceramic crowns bonded to a titanium insert, combining the biological advantages of titanium at the implant interface with the aesthetic superiority of all-ceramic superstructures. The review covers indications, contraindications, cementation protocols, CAD/CAM fabrication techniques, and long-term clinical outcomes.',
    findings: [
      'Ti-Base abutments provide superior soft tissue response compared to fully ceramic abutments due to titanium\'s proven osseointegration biocompatibility',
      'Screw-retained Ti-Base crowns eliminate cement-related peri-implant complications, a significant advantage over cement-retained restorations',
      'CAD/CAM fabrication of zirconia or lithium disilicate crowns bonded to Ti-Base inserts achieves excellent marginal accuracy',
      'Bond strength between ceramic crown and Ti-Base insert is optimised by surface treatment protocols including sandblasting and adhesive cementation',
      'Clinical success rates for Ti-Base supported restorations exceed 95% at 5-year follow-up in the literature reviewed',
      'Digital workflow integration (intraoral scanning → CAD design → milling) significantly reduces chair time and laboratory costs',
    ],
    clinicalRelevance: 'Ti-Base abutments have become the standard of care for single-tooth implant restorations in aesthetic zones. The hybrid design — titanium at the implant connection, ceramic at the visible crown — resolves the longstanding trade-off between biological compatibility and aesthetic outcome. Clinicians at Temelci Dental routinely use this protocol for anterior and premolar implant restorations.',
    methodology: 'Comprehensive literature review covering Ti-Base abutment systems available in the implant market (Nobel Biocare, Straumann, Dentsply Sirona, Osstem). Evaluation criteria: marginal fit, retention, fracture resistance, peri-implant tissue response, and patient satisfaction outcomes from randomised controlled trials and prospective clinical studies.',
  },
  {
    slug: 'all-on-four-implants-3year-followup',
    year: '2024',
    type: 'congress',
    indexing: '',
    title: '3-Year Follow-Up of Fixed Implant-Supported Prosthesis Applications to Maxilla and Mandible with All-on-Four Treatment Option: A Case Report',
    titleTr: 'All-on-Four Tedavi Seçeneği ile Maksilla ve Mandibulaya Sabit İmplant Destekli Protez Uygulamalarının 3 Yıl Takibi: Olgu Sunumu',
    journal: 'Latin America 4th International Conference on Scientific Researches',
    publisher: 'Conference Proceedings Book',
    volume: 'pp. 46–56',
    authors: 'Gülfem Ergün, Şerife Köle',
    affiliation: 'Gazi University, Faculty of Dentistry, Department of Prosthodontics',
    pdf: '/research/all-on-four-3year-followup-case-report.pdf',
    keywords: ['All-on-Four', 'All-on-4', 'full arch implant', 'aggressive periodontitis', 'immediate loading', 'Nobel Biocare', 'fixed full arch prosthesis', 'edentulous rehabilitation', 'implant-supported bridge'],
    abstract: 'This case report presents a 3-year clinical follow-up of All-on-Four implant treatment in a 30-year-old female patient with aggressive periodontitis resulting in complete maxillary edentulism. The patient presented with teeth 33 and 43 remaining in the mandible, both with lost periodontal support. Following extraction of remaining mandibular teeth, four Nobel Biocare implants (4.3×11.5 mm anterior, 4.3×13 mm posterior at 30° tilt) were placed in each jaw using the All-on-Four concept. Immediate loading with temporary fixed full-arch prostheses was performed on the day of surgery. After successful osseointegration, definitive screw-retained fixed prostheses were delivered. Three-year follow-up revealed no prosthetic complications or implant failures in either jaw.',
    findings: [
      'All-on-Four treatment successfully rehabilitated both jaws in a single surgical procedure with immediate loading',
      'Four Nobel Biocare implants per arch provided sufficient support: anterior implants placed vertically (4.3×11.5 mm), posterior implants tilted 30° distally (4.3×13 mm)',
      'Primary stability exceeding 45 Ncm was achieved in all eight implants, enabling immediate fixed temporary loading',
      'At 3-year follow-up: no implant failures, no prosthetic fractures, stable peri-implant bone levels',
      'Patient reported significant improvement in quality of life, masticatory function, and aesthetics',
      'Literature-reported survival rate for All-on-Four treatment: 92–100% at 5-year follow-up',
    ],
    clinicalRelevance: 'This case demonstrates that All-on-Four implant rehabilitation can achieve stable, aesthetically satisfying results in young patients with aggressive periodontitis. The immediate loading protocol eliminates the edentulous waiting period and significantly improves patient acceptance. Temelci Dental provides All-on-Four rehabilitation as a core service, with Dr. Ali Temelci performing the surgical component and Dr. Şerife Köle managing prosthetic planning and delivery.',
    methodology: 'Single-patient prospective case report with 3-year clinical follow-up. Diagnostic model analysis, intraoral photographs, panoramic radiographs, and CBCT were used for treatment planning. Bone reduction was performed to ensure consistent implant/abutment levels. Conventional removable prosthesis was adapted as the immediate temporary fixed prosthesis. Follow-up included clinical and radiographic assessment at 10 days, 3 months, 6 months, 1 year, 2 years, and 3 years.',
  },
  {
    slug: 'overdenture-attachment-systems-mandible',
    year: '2024',
    type: 'congress',
    indexing: '',
    title: 'Evaluation of Different Attachment Systems Used for Mandibular Two Implant-Supported Overdenture Prosthesis',
    titleTr: 'Mandibulada İki İmplant Destekli Overdenture Protezlerde Kullanılan Farklı Bağlantıların Değerlendirilmesi',
    journal: 'Latin America 4th International Conference on Scientific Researches',
    publisher: 'Conference Proceedings Book',
    volume: 'pp. 32–45',
    authors: 'Şerife Köle, Gülfem Ergün',
    affiliation: 'Gazi University, Faculty of Dentistry, Department of Prosthodontics',
    pdf: '/research/overdenture-attachment-systems-review.pdf',
    keywords: ['overdenture', 'implant overdenture', 'ball attachment', 'bar attachment', 'locator attachment', 'telescopic attachment', 'magnetic attachment', 'mandibular prosthesis', 'two-implant overdenture', 'edentulous mandible'],
    abstract: 'This systematic review evaluates the different attachment systems used for two implant-supported mandibular overdenture prostheses, comparing their clinical performance across retention, stability, patient satisfaction, tissue response, biomechanical characteristics, and maintenance requirements. Electronic searches were conducted in PubMed/MEDLINE, Scopus, Cochrane, and Google Scholar for articles published up to October 2022. From an initial 12,817 results for "mandible," sequential keyword addition reduced the pool to 116 relevant articles, of which 36 met full inclusion criteria.',
    findings: [
      'Ball/stud attachments provide excellent retention in limited inter-arch space cases; simple to maintain; high patient satisfaction',
      'Bar attachments offer superior retention in severely resorbed ridges but require more inter-arch space; risk of gingival hyperplasia under bar',
      'Locator attachments demonstrate good retention outcomes in vitro but show highest wear and maintenance requirements in clinical use',
      'Magnetic attachments show favourable patient acceptance but limited lateral stability; more bone resorption under functional load',
      'Telescopic attachments provide best retention and stability; most technique-sensitive; highest long-term success in RCT data',
      'No single attachment system is universally superior; selection should be guided by inter-arch space, bone quantity, patient dexterity, and cost',
    ],
    clinicalRelevance: 'Two-implant mandibular overdenture is the evidence-based minimum standard of care for edentulous mandible rehabilitation. This review provides a practical clinical decision framework for attachment selection. In patients with restricted inter-arch space or parallel implant placement challenges, ball attachments are recommended. Bar systems are preferred in V-shaped ridges with excessive resorption. Understanding the maintenance profile of each system is essential for long-term patient management.',
    methodology: 'Systematic literature review following PRISMA guidelines. Inclusion criteria: minimum 10 participants, minimum 6-month follow-up, randomised or controlled clinical design. Exclusion: case reports, animal studies, in vitro studies, non-mandibular overdentures. Outcome measures: implant survival, marginal bone loss, attachment wear/replacement, patient-reported outcomes (chewing, comfort, aesthetics), and complication rates.',
  },
  {
    slug: 'all-on-four-provisional-prosthesis-techniques',
    year: '2023',
    type: 'journal',
    indexing: 'National Peer-Reviewed',
    title: 'Provisional Prosthesis Options and Fabrication Techniques in All-on-Four Implant Applications',
    titleTr: 'All-on-Four İmplant Uygulamalarında Geçici Protez Seçenekleri ve Yapım Teknikleri',
    journal: 'Protetik Diş Tedavisi — Special Issue',
    publisher: 'Turkish Society of Prosthodontics',
    volume: 'Vol. 8, No. 2, pp. 6–',
    authors: 'Gülfem Ergün, Şerife Köle',
    affiliation: 'Gazi University, Faculty of Dentistry, Department of Prosthodontics, Ankara, Turkey',
    pdf: '/research/all-on-four-provisional-prosthesis-techniques.pdf',
    keywords: ['All-on-Four', 'provisional prosthesis', 'immediate loading', 'temporary prosthesis', 'All-on-Four complications', 'multiunit abutment', 'screw-retained temporary', 'full arch immediate restoration', 'cantilever bridge'],
    abstract: 'This clinical review examines provisional prosthesis options and fabrication techniques in All-on-Four implant applications. Immediate loading with a fixed provisional prosthesis is an integral component of All-on-Four treatment, eliminating the edentulous period and allowing functional and aesthetic assessment during osseointegration. The review covers patient selection criteria, pre-surgical diagnostic prosthesis fabrication, immediate post-surgical conversion techniques, laboratory-fabricated immediate temporaries, and the transition to definitive prostheses.',
    findings: [
      'All-on-Four requires minimum primary stability of 35 Ncm for immediate loading; 45 Ncm or above is preferred',
      'Cantilever extension beyond two teeth increases fracture risk and should be avoided in provisional restorations',
      'Pre-fabricated diagnostic denture converted to provisional fixed prosthesis offers the most predictable immediate loading outcome',
      'Rubber-dam isolation is essential during intraoral pick-up of temporary abutments to prevent material contamination',
      'Palatal coverage should be removed in maxillary provisional prostheses to reduce bulk and improve patient comfort',
      'CAD/CAM-fabricated provisional prostheses offer superior accuracy and strength compared to conventional acrylic temporaries',
    ],
    clinicalRelevance: 'Provisional prosthesis quality directly impacts the final aesthetic and functional outcome of All-on-Four rehabilitation. A well-fabricated immediate temporary allows real-time evaluation of occlusion, phonetics, and smile aesthetics before committing to the definitive restoration. This review provides a step-by-step protocol applicable to clinical practice, including the management of bone reduction, multiunit abutment selection, and immediate prosthesis adaptation.',
    methodology: 'Narrative clinical review integrating current evidence with detailed procedural descriptions. Covers conventional immediate loading protocols, pre-surgical template fabrication, post-surgical conversion techniques, and CAD/CAM digital workflow for provisional prosthesis in full-arch implant rehabilitation.',
  },
  {
    slug: 'post-core-materials-current-advances',
    year: '2022',
    type: 'congress',
    indexing: '',
    title: 'Current Advances in Post Materials for Endodontically Treated Teeth',
    titleTr: 'Post Materyallerinde Güncel Gelişmeler',
    journal: 'Cyprus Congress Proceedings Book',
    publisher: 'Cyprus Dental Congress',
    volume: 'pp. 64–80',
    authors: 'Gülfem Ergün, Şerife Köle',
    affiliation: 'Gazi University, Faculty of Dentistry, Department of Prosthodontics. ORCID: 0000-0002-2479-6643',
    pdf: '/research/post-core-materials-current-advances.pdf',
    keywords: ['post and core', 'fiber post', 'zirconia post', 'PEEK post', 'PEKK post', 'CAD/CAM post', 'endodontically treated teeth', 'root canal post', 'cast post', 'prefabricated post'],
    abstract: 'This review presents current advances in post and core materials for the restoration of severely damaged endodontically treated teeth. The post term refers to a device extending up to 2/3 of the root canal to provide support and retention for the coronal restoration. The review traces the historical development of post systems from early cast metal posts through prefabricated systems to the current generation of CAD/CAM-milled PEEK, PEKK, and zirconia posts. Classification by fabrication technique (cast, prefabricated, milled) and material (metal alloys, fiber-reinforced, ceramic, high-performance polymers) is presented with evidence-based clinical recommendations.',
    findings: [
      'CAD/CAM-milled one-piece post-cores in PEEK, PEKK, and ZrO₂ have emerged as the contemporary standard, offering precise anatomical adaptation',
      'PEEK and PEKK post-cores prevent root fractures due to their dentin-like elastic modulus, reducing the stress concentration at the root/post interface',
      'ZrO₂ posts demonstrate excellent retention and fracture strength but their high elastic modulus (200 GPa vs dentin 15–18 GPa) can concentrate stress',
      'Fiber posts remain clinically reliable for anterior teeth but show limited customisability in irregular canals',
      'Post length optimally extends to 2/3 of root canal length; diameter should not exceed 1/3 of root diameter to preserve dentin',
      'PEEK was first tested as a post-core material in 2017; growing in vitro and in vivo evidence supports its clinical viability',
    ],
    clinicalRelevance: 'The selection of post material fundamentally determines the long-term survival of endodontically treated teeth. This evidence synthesis helps clinicians navigate the expanding material options. PEKK and PEEK posts are now indicated where dentin preservation and fracture resistance are the primary concerns, while zirconia posts excel in high-load posterior applications requiring maximum strength.',
    methodology: 'Comprehensive review of post-core classification systems and material science. Literature synthesised from international dental journals covering in vitro bond strength studies, push-out tests, finite element analyses, and clinical outcome data. Historical timeline from early 18th century post concepts through 2022 developments.',
  },
  {
    slug: 'occlusion-virtual-articulators-prosthodontics',
    year: '2024',
    type: 'congress',
    indexing: '',
    title: 'Methods of Recording Occlusion: Functional Occlusal Analysis and Virtual Articulators in Prosthodontics',
    titleTr: 'Oklüzyon Kayıt Yöntemleri: Fonksiyonel Oklüzal Analiz ve Protetik Diş Tedavisinde Sanal Artikülatörler',
    journal: '6th International World Health Congress',
    publisher: 'IKSAD Publications, ISBN: 978-625-8254-61-7',
    volume: 'Proceedings Book, November 22–23, 2024, Bayburt, Turkey',
    authors: 'Rameez Ata Ouda Al-masrti, Şerife Köle',
    affiliation: 'Cyprus Health and Social Sciences University, Department of Prosthodontics. ORCID: 0000-0002-2479-6643',
    pdf: '/research/occlusion-virtual-articulators-prosthodontics.pdf',
    keywords: ['occlusion recording', 'virtual articulator', 'digital dentistry', 'intraoral scanner', 'wax bite registration', 'articulating paper', 'TMJ', 'digital occlusal analysis', 'T-Scan', 'prosthodontics digital workflow'],
    abstract: 'This seminar reviews the evolution and methodologies for recording occlusion and utilising virtual articulators in prosthodontics. Traditional methods — wax bite registration and articulating paper — remain foundational but have limitations in capturing dynamic occlusion and occlusal force distribution. Digital dentistry has introduced intraoral scanners and virtual articulators that are revolutionising the precision of dental restorations. The seminar compares conventional and digital approaches, emphasising clinical accuracy, patient comfort, and workflow efficiency.',
    findings: [
      'Traditional wax bite registration captures static occlusion only; articulating paper shows contact areas but not force distribution',
      'Intraoral scanners combined with virtual articulator software enable dynamic occlusal simulation without physical jaw motion',
      'T-Scan digital occlusal analysis quantifies force distribution and timing, allowing real-time occlusal adjustment',
      'Virtual articulators accept CBCT data and intraoral scan data for patient-specific condylar programming',
      'Digital workflow reduces errors from wax distortion, model trimming inaccuracies, and articulator transfer errors',
      'Integration of digital records (scan + CBCT + face bow data) enables fully digital prosthetic design without physical models',
    ],
    clinicalRelevance: 'Accurate occlusal recording is foundational to the success of all prosthodontic restorations — from single crowns to full-arch implant prostheses. This review demonstrates how digital occlusal tools reduce the risk of premature contacts, iatrogenic TMJ complications, and restoration failures. At Temelci Dental, digital occlusal analysis is incorporated into complex prosthetic cases to ensure precision outcomes.',
    methodology: 'Seminar-based review integrating current evidence on conventional and digital occlusal recording techniques. Comparison of clinical accuracy, reproducibility, and workflow efficiency across wax bite, articulating paper, digital intraoral scanning, and T-Scan systems.',
  },
  {
    slug: 'endocrown-endodontically-treated-molars',
    year: '2025',
    type: 'book_chapter',
    indexing: 'Zenodo DOI: 10.5281/zenodo.17419778',
    title: 'Endocrown Restoration for Severely Damaged Endodontically Treated Molar Teeth: Indications, Contraindications, Preparation Techniques, Material Selection and Case Report',
    titleTr: 'Aşırı Kron Harabiyetine Uğramış Endodontik Tedavili Molar Dişlerin Endokron ile Protetik Restorasyonu',
    journal: 'Modern Sağlık Bilimleri: Teori, Metodoloji ve Uygulama',
    publisher: 'Platanus Publishing, ISBN: 978-625-6454-85-9 (Chapter 71, pp. 1201–)',
    volume: 'DOI: 10.5281/zenodo.17419778',
    authors: 'Şerife Köle Kocadal',
    affiliation: 'Cyprus Health and Social Sciences University, Department of Prosthodontics',
    doi: 'https://zenodo.org/record/17419778',
    pdf: '/research/endocrown-endodontically-treated-molars.pdf',
    keywords: ['endocrown', 'endodontically treated tooth', 'molar restoration', 'monolithic restoration', 'lithium disilicate', 'minimally invasive dentistry', 'butt-joint margin', 'adhesive cementation', 'post-free restoration', 'CAD/CAM endocrown'],
    abstract: 'This chapter provides a comprehensive review of endocrown restorations for severely damaged endodontically treated molar teeth. Endocrowns are monolithic restorations that derive retention from the pulp chamber rather than a post extending into the root canal, combining the crown margin with an intracanal extension. First described by Pissis in 1995, they represent a minimally invasive alternative to conventional post-core-crown sequences. The chapter covers indications, contraindications, preparation technique (butt-joint margin design, pulp chamber depth requirements), material selection (lithium disilicate, zirconia, PEKK), adhesive cementation protocols, and comparative long-term outcomes against post-core restorations.',
    findings: [
      'Endocrowns eliminate post placement, removing the risk of root perforation and root fracture associated with post canal preparation',
      'Butt-joint margin at the cemento-enamel junction combined with 3–4 mm pulp chamber depth provides adequate retention without ferrule',
      'Lithium disilicate (IPS e.max) is the preferred endocrown material: adequate fracture resistance, excellent aesthetics, and optimal adhesion with HF etching/silane protocol',
      'Zirconia endocrowns offer superior strength for patients with bruxism but require 10-MDP adhesive protocol for durable bonding',
      'PEKK endocrowns show promising shock absorption and biomechanical compatibility with dentin',
      'Long-term clinical success rates comparable to post-core-crown restorations at 5-year follow-up in systematic reviews',
    ],
    clinicalRelevance: 'Endocrowns represent the current minimally invasive gold standard for molar teeth with extensive coronal destruction and adequate pulp chamber depth. By preserving maximum remaining tooth structure and eliminating post-related risks, they align with modern conservative dentistry principles. This chapter equips clinicians with a decision algorithm covering patient and tooth selection, step-by-step preparation, cementation, and clinical monitoring protocols.',
    methodology: 'Chapter-length literature review integrating current evidence from randomised controlled trials, systematic reviews, and prospective clinical studies on endocrown restorations. Clinical decision algorithm developed for case selection, material choice, and cementation protocol. Original case presentation illustrating technique.',
  },
  {
    slug: 'mandibulectomy-implant-rehabilitation',
    year: '2024',
    type: 'case_report',
    indexing: '',
    title: 'Rehabilitation of a Patient with Marginal Mandibulectomy Using Implant-Supported Prosthetic Restoration: A Case Report',
    titleTr: 'Marjinal Mandibulektomili Hastanın İmplant Destekli Protetik Restorasyon ile Rehabilitasyonu: Vaka Raporu',
    journal: 'Congress Poster Presentation',
    publisher: 'Temelci Dental Clinic & Cyprus Health and Social Sciences University',
    volume: '2024',
    authors: 'Ali Temelci, Şerife Köle Kocadal',
    affiliation: 'Temelci Dental Clinic, Oral & Maxillofacial Surgery, TRNC; Cyprus Health and Social Sciences University, Department of Prosthodontics, TRNC',
    pdf: '/research/mandibulectomy-implant-rehabilitation-case-report.pdf',
    keywords: ['mandibulectomy', 'oral cancer rehabilitation', 'implant-supported prosthetics', 'head and neck cancer', 'orofacial reconstruction', 'mandibular reconstruction', 'free flap prosthetics', 'oral cancer prosthesis', 'maxillofacial prosthodontics'],
    abstract: 'This case report presents the implant-supported prosthetic rehabilitation of a 47-year-old male patient following squamous cell carcinoma of the floor of mouth and subsequent marginal mandibulectomy. The patient underwent mandibular crest resection with selective neck dissection 9 years prior and presented with significant challenges to conventional prosthetic rehabilitation due to compromised tissue support. A multidisciplinary team approach including oral surgery, glossoplasty, and implant prosthodontics was employed to restore anterior mandibular form, function, and aesthetics.',
    findings: [
      'Marginal mandibulectomy results in insufficient tissue support that renders conventional dentures unstable and dysfunctional',
      'Multidisciplinary team approach — oral surgery + prosthodontics — is essential for post-oncological dental rehabilitation',
      'Glossoplasty was performed to optimise soft tissue conditions prior to implant placement',
      'Mid-crestal skin incision technique was used to access remaining mandibular bone for implant placement',
      'Dental implants significantly improved prosthesis stability, occlusal function, and patient quality of life in post-cancer patients',
      'This case demonstrates Temelci Dental\'s capability to manage complex maxillofacial prosthetic cases',
    ],
    clinicalRelevance: 'Post-oncological prosthetic rehabilitation represents one of the most challenging areas of clinical prosthodontics. Tissue changes from surgery and radiotherapy, altered anatomy, and reduced bone volume demand individualised treatment planning. This case, authored by Dr. Ali Temelci (oral surgery) and Dr. Şerife Köle (prosthodontics), illustrates the collaborative approach at Temelci Dental for managing complex maxillofacial rehabilitation cases.',
    methodology: 'Single-patient case report with clinical documentation including intraoral photographs at baseline (Photograph 1), diagnostic tooth arrangement (Photograph 2), glossoplasty procedure (Photograph 3), mid-crestal incision (Photograph 4), and implant placement/restoration stages. Multidisciplinary treatment planning involving oncology team, oral surgery, and prosthetic planning.',
  },
];

const typeConfig: Record<string, { label: string; color: string }> = {
  journal:      { label: 'Peer-Reviewed Journal',  color: 'bg-blue-50 text-blue-700 border-blue-200' },
  book_chapter: { label: 'Book Chapter',            color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  congress:     { label: 'Congress Publication',    color: 'bg-purple-50 text-purple-700 border-purple-200' },
  case_report:  { label: 'Case Report',             color: 'bg-amber-50 text-amber-700 border-amber-200' },
};

const ResearchPage = () => {
  const { lang, localePath } = useLanguage();
  const isTr = lang === 'tr';

  return (
    <>
      {/* HERO */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
            <FlaskConical size={12} /> {isTr ? 'Akademik Araştırmalar' : 'Academic Research'}
          </div>
          <h1 className="heading-display mb-4">
            {isTr ? 'Yayınlar & Araştırmalar' : 'Publications & Research'}
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            {isTr
              ? 'Dr. Şerife Köle\'nin hakemli dergiler, uluslararası kitaplar ve kongre bildirilerindeki akademik çalışmaları. Her yayına tam metin erişim ve PDF indirme imkânı.'
              : "Dr. Şerife Köle's academic contributions spanning peer-reviewed journals, international books and congress proceedings. Full-text access and PDF download available for each publication."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <span><span className="text-primary font-bold">{publications.length}</span> {isTr ? 'Yayın' : 'Publications'}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span><span className="text-primary font-bold">1</span> {isTr ? 'SCI Makale (Elsevier)' : 'SCI Article (Elsevier)'}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span><span className="text-primary font-bold">3</span> {isTr ? 'Kitap Bölümü' : 'Book Chapters'}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>ORCID: <a href="https://orcid.org/0000-0002-2479-6643" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono">0000-0002-2479-6643</a></span>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS LIST */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <div className="space-y-6">
            {publications.map((pub, i) => {
              const cfg = typeConfig[pub.type];
              return (
                <motion.article
                  key={pub.slug}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">{pub.year}</span>
                      {pub.indexing && (
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                          {pub.indexing}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-semibold text-foreground text-base leading-snug mb-1">
                      <Link to={localePath(`/research/${pub.slug}`)} className="hover:text-primary transition-colors">
                        {isTr ? pub.titleTr : pub.title}
                      </Link>
                    </h2>

                    {/* Meta */}
                    <p className="text-xs text-muted-foreground mb-3">
                      <span className="font-semibold text-foreground/70">{pub.journal}</span>
                      {pub.publisher && ` · ${pub.publisher}`}
                      {pub.volume && ` · ${pub.volume}`}
                      {' · '}{pub.authors}
                    </p>

                    {/* Abstract preview */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{pub.abstract.slice(0, 240)}…</p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pub.keywords.slice(0, 5).map(kw => (
                        <span key={kw} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">{kw}</span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={localePath(`/research/${pub.slug}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <BookOpen size={12} /> {isTr ? 'Tam metni oku' : 'Read full text'}
                      </Link>
                      <a
                        href={pub.pdf}
                        download
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        <Download size={12} /> {isTr ? 'PDF indir' : 'Download PDF'}
                      </a>
                      {pub.doi && (
                        <a href={pub.doi} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
                          <ExternalLink size={11} /> DOI
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">
            {isTr ? 'Dr. Şerife ile Konsültasyon' : 'Consult with Dr. Şerife'}
          </h2>
          <p className="text-primary-foreground/70 mb-6 text-sm max-w-xl mx-auto">
            {isTr
              ? 'Araştırmalarıyla desteklenen klinik uzmanlık — implant protezi, veneer ve tam çene rehabilitasyonu için'
              : 'Research-backed clinical expertise — for implant prosthetics, veneers and full-arch rehabilitation'}
          </p>
          <WhatsAppButton text={isTr ? 'Ücretsiz Konsültasyon' : 'Free Consultation'} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default ResearchPage;
