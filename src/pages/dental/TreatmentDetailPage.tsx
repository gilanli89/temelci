import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { ChevronRight, Check } from 'lucide-react';
import implantImg from '@/assets/dental-implant.jpg';
import veneersImg from '@/assets/veneers.jpg';
import crownsImg from '@/assets/crowns.jpg';
import hollywoodSmileImg from '@/assets/hollywood-smile.jpg';
import zirconiaCrownsImg from '@/assets/zirconia-crowns.jpg';
import teethWhiteningImg from '@/assets/teeth-whitening.jpg';
import smileMakeoverImg from '@/assets/smile-makeover.jpg';
import fullMouthImg from '@/assets/full-mouth-restoration.jpg';

type TreatmentData = {
  titleKey: string;
  descKey: string;
  img: string;
  benefits: string[];
  forWhom: string[];
  process: string[];
  results: string[];
  faq: { q: string; a: string }[];
};

const getTreatmentData = (slug: string, t: any): TreatmentData | null => {
  const data: Record<string, TreatmentData> = {
    [t.hollywoodSmileSlug]: {
      titleKey: 'hollywoodSmile',
      descKey: 'hollywoodSmileDesc',
      img: hollywoodSmileImg,
      benefits: [
        'Complete smile transformation in just 5-7 days',
        'Custom-designed porcelain veneers — matched to your face shape',
        'Brilliant white, perfectly aligned teeth',
        'Ultra-thin veneers — minimal tooth reduction required',
        'Save 60-70% compared to UK or German prices',
        'In-house dental lab — faster turnaround, tighter quality control',
        'Results last 15-20 years with routine care',
        'VIP airport transfer and hotel coordination included',
      ],
      forWhom: [
        'Patients unhappy with stained or discoloured teeth that don't respond to whitening',
        'Those with gaps, chips, or slightly uneven teeth',
        'Anyone seeking a full smile makeover in a single short trip',
        'UK, German, and European patients looking to save significantly on cosmetic dentistry',
        'People who have been quoted high prices at home and want a trusted alternative',
      ],
      process: [
        'Send your smile photos via WhatsApp — free assessment within 24 hours',
        'Digital smile design: preview your result before any treatment begins',
        'Arrive in Kyrenia — VIP transfer from Ercan or Larnaca airport',
        'Day 1–2: Shade selection, tooth preparation, temporary veneers placed',
        'Day 3–5: Our in-house lab crafts your custom porcelain veneers',
        'Day 6–7: Final bonding, bite adjustment, and your reveal appointment',
        'Return home with your new smile — WhatsApp aftercare support included',
      ],
      results: [
        'A completely transformed, celebrity-quality smile',
        'Veneers indistinguishable from natural teeth in colour and texture',
        '15-20 years durability with proper brushing and check-ups',
        'Stain-resistant porcelain — your smile stays white for years',
        'Immediate confidence boost — patients consistently report life-changing results',
      ],
      faq: [
        { q: 'How many days do I need to stay in Cyprus?', a: 'Most Hollywood Smile treatments are completed in 5-7 days. We recommend planning a 7-night stay to allow for a comfortable experience without rushing.' },
        { q: 'Will it look natural or obviously fake?', a: 'Our specialist uses digital smile design and a colour-matching process calibrated to your skin tone and face shape. The results look entirely natural — your friends will notice your smile, not your veneers.' },
        { q: 'Is the treatment painful?', a: 'All preparation is done under local anaesthesia. Mild sensitivity in the first 2-3 days is common but manageable. Most patients are pleasantly surprised by how comfortable the process is.' },
        { q: 'How much can I save compared to the UK?', a: 'A full Hollywood Smile in the UK typically costs £8,000–£15,000. At Temelci Dental, the same quality treatment costs a fraction of that — even including flights and accommodation, you save significantly.' },
        { q: 'What if something goes wrong after I return home?', a: 'We provide a written guarantee on all veneer work. For minor adjustments, we can coordinate with a dentist in your home country. For anything significant, return visits are prioritised and fast-tracked.' },
      ]
    },
    [t.implantsSlug]: {
      titleKey: 'dentalImplants',
      descKey: 'dentalImplantsDesc',
      img: implantImg,
      benefits: [
        'Permanent, lifetime tooth replacement — not a temporary fix',
        'Looks, feels, and functions exactly like a natural tooth',
        'Titanium root stimulates and preserves your jawbone',
        'No impact on adjacent healthy teeth (unlike bridges)',
        '98%+ success rate — among the highest in modern dentistry',
        'Straumann implants used — the gold standard in implantology',
        'Save 50-65% compared to UK or EU implant prices',
        'Our specialists have placed thousands of implants over 30+ years',
      ],
      forWhom: [
        'Patients with one or more missing teeth seeking a permanent solution',
        'Those struggling with loose, painful, or ill-fitting dentures',
        'People who have been told they need a bridge but want to preserve healthy teeth',
        'Patients with adequate bone density (or who qualify for bone grafting)',
        'UK and European patients comparing implant costs abroad',
      ],
      process: [
        'Share your X-ray via WhatsApp — free suitability assessment within 24 hours',
        'Arrival in Kyrenia — full 3D CBCT scan and treatment planning',
        'Implant placement under local anaesthesia — typically 45-60 minutes per implant',
        'Temporary restoration fitted the same day in most cases',
        'Healing phase: 3-6 months for osseointegration (bone bonding)',
        'Second visit: abutment placement and custom porcelain crown fitting',
        'Final check and bite adjustment — your implant is complete',
      ],
      results: [
        'A fully functional, permanent replacement tooth — for life',
        'Preserved jawbone and facial structure — no sunken appearance',
        'Eat, speak, and smile with complete confidence',
        'No removal, no adhesives, no maintenance beyond normal brushing',
        'A long-term investment that saves money compared to repeated bridge or denture repairs',
      ],
      faq: [
        { q: 'Can I get an implant in one trip?', a: 'The implant screw is placed on your first visit. Full completion (crown fitting) requires a second visit 3-6 months later once the implant has integrated. Many patients use this as an opportunity for a return holiday.' },
        { q: 'Is the surgery painful?', a: 'The procedure is performed under local anaesthesia and is well-tolerated. Post-operative discomfort is typically mild and managed with standard painkillers for 2-3 days.' },
        { q: 'What brand of implants do you use?', a: 'We primarily use Straumann implants — the global benchmark for quality, with the most extensive clinical evidence base. We also use other premium European-certified systems depending on the case.' },
        { q: 'How much does an implant cost in Cyprus vs the UK?', a: 'A single implant in the UK typically costs £2,000–£3,500. At Temelci Dental, the same Straumann implant with crown is available at a fraction of that price, often saving patients enough to cover their flights and accommodation.' },
        { q: 'What if my implant fails?', a: 'Implant failure is rare at under 2%. In the unlikely event of failure, we will replace the implant at no additional charge during the guarantee period.' },
      ]
    },
    [t.veneersSlug]: {
      titleKey: 'veneers',
      descKey: 'veneersDesc',
      img: veneersImg,
      benefits: [
        'Ultra-thin porcelain shells — as thin as a contact lens',
        'Minimal tooth preparation — preserves most of your natural enamel',
        'Covers stains, chips, gaps, and minor misalignment in one treatment',
        'Highly stain-resistant — your teeth stay bright for years',
        'Custom colour-matched for a perfectly natural result',
        'Completed in a single 5-7 day trip',
        'In-house lab fabrication for precise fit and faster delivery',
        'Save 60%+ compared to veneer prices in the UK or Germany',
      ],
      forWhom: [
        'Patients with stubborn staining that doesn't respond to whitening',
        'Those with minor chips, cracks, or worn edges on front teeth',
        'Anyone with small gaps or slightly uneven teeth',
        'People who want targeted improvement on specific teeth rather than a full makeover',
        'Patients looking for a conservative cosmetic solution with long-lasting results',
      ],
      process: [
        'Send close-up smile photos via WhatsApp — free consultation within 24 hours',
        'Arrival in Kyrenia — shade consultation and digital smile preview',
        'Minimal tooth preparation under local anaesthesia',
        'Precise impressions taken — temporary veneers placed immediately',
        'In-house lab fabricates your custom porcelain veneers (2-3 days)',
        'Final bonding: veneers are checked for fit, colour, and bite',
        'Polish and adjustments — your new smile is complete',
      ],
      results: [
        'A noticeably improved smile — brighter, more even, and more youthful',
        '10-15 year lifespan with normal care',
        'Completely stain-resistant porcelain surface',
        'Natural translucency that mimics real tooth enamel',
        'Results are immediate — you leave Cyprus with your new smile',
      ],
      faq: [
        { q: 'What is the difference between veneers and a Hollywood Smile?', a: 'A Hollywood Smile is a complete smile makeover using a full set of veneers across all visible teeth. Individual veneers address specific teeth that need attention. Our specialist will recommend the right approach during your consultation.' },
        { q: 'Will veneers damage my natural teeth?', a: 'A small amount of enamel (typically 0.3–0.5mm) is removed to ensure a flush fit. This is minimal and irreversible, but it preserves the vast majority of your natural tooth structure.' },
        { q: 'Can I choose the shade?', a: 'Absolutely. We use the Vita shade system and digital preview tools so you can see and approve your final shade before any work begins.' },
        { q: 'How do I care for veneers?', a: 'Brush and floss normally. Avoid biting hard objects directly (ice, hard sweets). Use a night guard if you grind your teeth. With these precautions, your veneers will last well over a decade.' },
      ]
    },
    [t.crownsSlug]: {
      titleKey: 'crowns',
      descKey: 'crownsDesc',
      img: crownsImg,
      benefits: [
        'Full 360° tooth coverage — protects and strengthens a compromised tooth',
        'Restores teeth that are cracked, heavily filled, or root-canal treated',
        'Porcelain matched to your natural tooth colour — virtually invisible',
        'Durable and long-lasting — 10-15 years with proper care',
        'Restores full chewing function and bite comfort',
        'In-house lab: faster turnaround and precise colour matching',
        'Save 50-65% compared to crown prices in the UK or EU',
        'Same-day temporaries so you're never without a tooth',
      ],
      forWhom: [
        'Patients with severely decayed or broken teeth that cannot be filled',
        'Those who have had a root canal treatment (crown protects the treated tooth)',
        'People with large old fillings that have cracked or weakened the tooth',
        'Anyone needing to restore a tooth's shape, function, or appearance',
        'Patients who have been quoted expensive crown work at home',
      ],
      process: [
        'Clinical examination and digital X-rays — full assessment of the tooth',
        'Tooth preparation: shaped under local anaesthesia for crown placement',
        'Precise impressions taken — temporary crown fitted the same day',
        'In-house lab fabricates your custom porcelain crown (2-3 working days)',
        'Crown try-in: colour, fit, and bite checked and adjusted',
        'Permanent cementation — crown bonded securely in place',
        'Final polish and bite alignment — your restored tooth is complete',
      ],
      results: [
        'A fully restored tooth that looks and functions like natural',
        'Complete protection against further cracking or decay',
        'A comfortable, balanced bite restored',
        '10-15 year lifespan — often longer with good oral hygiene',
        'No more sensitivity or pain from the compromised tooth',
      ],
      faq: [
        { q: 'Is a crown better than a filling for a damaged tooth?', a: 'For teeth with significant damage, large fillings, or after root canal treatment, a crown provides superior protection. A filling only replaces lost tooth material; a crown encases the entire tooth and prevents further fracture.' },
        { q: 'Will the crown match my other teeth?', a: 'Yes. We use the Vita shade guide and natural light assessment to match your crown precisely to adjacent teeth. Our in-house lab allows us to refine the shade with greater accuracy than clinics that outsource lab work.' },
        { q: 'Does it hurt to have a crown prepared?', a: 'Tooth preparation is performed under local anaesthesia. A temporary crown is placed immediately, so the tooth is always protected. Any sensitivity after the anaesthesia wears off is typically mild and short-lived.' },
        { q: 'Can I get a crown fitted in one trip?', a: 'Yes. Because we have an in-house dental laboratory, most crowns are completed within 5-7 days — well within a single trip.' },
      ]
    },
    [t.zirconiaCrownsSlug]: {
      titleKey: 'zirconiaCrowns',
      descKey: 'zirconiaCrownsDesc',
      img: zirconiaCrownsImg,
      benefits: [
        'The strongest crown material available — ideal for back teeth',
        'Exceptional aesthetics — translucent, indistinguishable from natural enamel',
        '100% metal-free — no dark gum lines, ever',
        'Biocompatible — safe for patients with metal sensitivities or allergies',
        'CAD/CAM precision milling for a perfect fit every time',
        'Highly resistant to chipping and fracture',
        'Save 55-65% compared to UK or German zirconia crown prices',
        'Fabricated in our in-house lab for colour consistency and fast turnaround',
      ],
      forWhom: [
        'Patients who want the highest-quality crown material available',
        'Those with metal allergies or sensitivity to traditional porcelain-fused-to-metal crowns',
        'Anyone who has experienced dark lines at the gum line with old metal-based crowns',
        'Patients needing crowns on back teeth where maximum strength is required',
        'People seeking a premium, long-term restoration that blends seamlessly',
      ],
      process: [
        'Consultation and shade assessment — using digital tools for accurate colour matching',
        'Tooth preparation under local anaesthesia — precise shaping for zirconia placement',
        'Intraoral digital scan — no messy impressions required',
        'CAD/CAM design: your crown is digitally engineered for perfect anatomy',
        'CNC precision milling from a solid zirconia block',
        'Staining, glazing, and firing — final aesthetic refinement in our lab',
        'Try-in, bite check, and permanent bonding — complete in 5-7 days',
      ],
      results: [
        'A crown stronger than natural tooth enamel — built to last 15-20 years',
        'Perfect colour harmony with adjacent teeth — no artificial white or dark lines',
        'Zero metal components — safer, cleaner, and more biocompatible',
        'Comfortable bite with natural chewing feel restored',
        'A premium restoration that requires no compromise between strength and beauty',
      ],
      faq: [
        { q: 'Why choose zirconia over porcelain-fused-to-metal?', a: 'Porcelain-fused-to-metal (PFM) crowns have a metal substructure that can show as a dark line at the gum line over time. Zirconia is entirely metal-free, offers superior aesthetics, and is stronger than PFM. It is now the gold standard for dental restorations.' },
        { q: 'Is zirconia suitable for front teeth?', a: 'Yes. Modern high-translucency zirconia mimics the natural light transmission of real enamel, making it ideal for front teeth where aesthetics are critical.' },
        { q: 'How long do zirconia crowns last?', a: 'With proper oral hygiene and regular check-ups, zirconia crowns routinely last 15-20 years. Their fracture resistance is significantly higher than porcelain alternatives.' },
        { q: 'Can I get zirconia crowns in one trip?', a: 'Yes. Our in-house CAD/CAM lab allows us to complete zirconia crowns within a single 5-7 day visit in most cases.' },
      ]
    },
    [t.teethWhiteningSlug]: {
      titleKey: 'teethWhitening',
      descKey: 'teethWhiteningDesc',
      img: teethWhiteningImg,
      benefits: [
        'Up to 8 shades brighter in a single session',
        'Professional-grade whitening gel — far stronger than over-the-counter products',
        'LED light activation for accelerated, even results',
        'Safe gum protection applied before treatment begins',
        'Immediate, visible results — walk out with a noticeably brighter smile',
        'Add-on take-home trays available for ongoing maintenance',
        'Often combined with veneers or Hollywood Smile for dramatic transformation',
        'Affordable — a fraction of UK whitening clinic prices',
      ],
      forWhom: [
        'Patients with yellowing or staining from coffee, tea, red wine, or tobacco',
        'Those preparing for a wedding, special event, or important occasion',
        'Anyone wanting a quick, visible improvement without extensive treatment',
        'Dental tourists combining whitening with another procedure during their trip',
        'People who have tried over-the-counter whitening with disappointing results',
      ],
      process: [
        'Pre-treatment check to assess suitability — whitening is not suitable for all cases',
        'Teeth cleaning to remove surface deposits for even whitening',
        'Custom gum shield applied to protect soft tissue',
        'Professional whitening gel applied to tooth surfaces',
        'LED light activation — 3 rounds of 15-20 minutes each',
        'Gel removed and final shade evaluation — compared against starting shade',
        'Take-home tray and maintenance gel provided if selected',
      ],
      results: [
        'Teeth that are up to 8 shades whiter after a single appointment',
        'Visibly brighter smile — noticeable in photos and in person',
        'Results last 6-12 months depending on diet and lifestyle',
        'A fast, cost-effective enhancement that makes a significant visual difference',
        'An ideal complement to veneers, crowns, or any cosmetic dental work',
      ],
      faq: [
        { q: 'Is professional whitening safe?', a: 'Yes. Clinical whitening uses peroxide concentrations that are regulated and applied by trained dental professionals with proper gum protection. It is significantly safer and more effective than unsupervised home kits.' },
        { q: 'Will whitening work on crowns or veneers?', a: 'No. Whitening only works on natural tooth enamel. If you have visible crowns or veneers, we recommend whitening before any restorations are placed so that we can match the new shade.' },
        { q: 'How long do results last?', a: 'Typically 6-12 months. Avoiding heavy staining foods and drinks, and maintaining good oral hygiene, will extend the results. Take-home trays allow for periodic touch-ups.' },
        { q: 'Is it painful?', a: 'Some patients experience mild sensitivity during or after the procedure. This is normal and temporary, resolving within 24-48 hours. We use a desensitising gel to minimise discomfort.' },
      ]
    },
    [t.smileMakeoverSlug]: {
      titleKey: 'smileMakeover',
      descKey: 'smileMakeoverDesc',
      img: smileMakeoverImg,
      benefits: [
        'Multiple concerns addressed in a single coordinated treatment plan',
        'Digital smile design — see your result before treatment begins',
        'Completely personalised: no two smile makeovers are the same',
        'Combines veneers, crowns, whitening, and implants as needed',
        'In-house lab ensures consistency across all restorations',
        'Dramatic transformation achievable within a single 7-10 day trip',
        'Save 55-70% compared to smile makeover costs in the UK or EU',
        'Holistic approach: function, health, and aesthetics all considered together',
      ],
      forWhom: [
        'Patients who have multiple cosmetic and functional concerns they want addressed at once',
        'Those who have always wanted to transform their smile but have been put off by the cost at home',
        'People combining dental treatment with a holiday in the Eastern Mediterranean',
        'Patients who have had previous dental work that now looks outdated or inconsistent',
        'Anyone who wants a single, cohesive result rather than piecemeal treatments over several years',
      ],
      process: [
        'Submit your smile photos and concerns via WhatsApp — free initial assessment',
        'Arrival consultation: full examination, 3D scan, and in-depth goals discussion',
        'Digital smile design: a visual preview of your proposed outcome',
        'Treatment plan presented with timeline, stages, and clear pricing',
        'Phase 1: foundational work — any necessary extractions, implants, or gum treatment',
        'Phase 2: restorations — veneers, crowns, whitening as designed',
        'Final reveal: adjustments, polishing, and professional photography of your result',
      ],
      results: [
        'A completely transformed smile — consistent, harmonious, and natural-looking',
        'Improved facial proportions — a smile designed to complement your features',
        'Restored function: comfortable bite, easy chewing, clear speech',
        'Long-lasting results with proper maintenance — most restorations last 10-20 years',
        'A life-changing outcome that patients consistently describe as among the best decisions they have made',
      ],
      faq: [
        { q: 'What treatments might be included in a smile makeover?', a: 'A smile makeover is entirely tailored to you. It might include teeth whitening, porcelain veneers, zirconia crowns, dental implants, gum contouring, or any combination. Our specialist will recommend only what is genuinely needed to achieve your goal.' },
        { q: 'Can a smile makeover be completed in one trip?', a: 'For most patients, the aesthetic component can be completed in 7-10 days. If implants are part of the plan, a second visit 3-6 months later is required for the final crown fitting.' },
        { q: 'How do I know what I will look like beforehand?', a: 'We use digital smile design software to produce a realistic preview before any treatment begins. You approve the design — including tooth shape, size, and shade — before we proceed.' },
        { q: 'What is the cost of a smile makeover in North Cyprus vs the UK?', a: 'In the UK, a comprehensive smile makeover can cost £10,000–£25,000 or more. At Temelci Dental, our patients typically achieve the same clinical outcome for considerably less — even after accounting for travel and accommodation.' },
      ]
    },
    [t.fullMouthRestorationSlug]: {
      titleKey: 'fullMouthRestoration',
      descKey: 'fullMouthRestorationDesc',
      img: fullMouthImg,
      benefits: [
        'Complete rehabilitation of all teeth — aesthetic and functional',
        'Addresses decades of damage, wear, decay, or tooth loss in one coordinated plan',
        'Multi-specialist team: implantology, prosthodontics, and aesthetic dentistry',
        '3D CBCT scanning for precise surgical and prosthetic planning',
        'In-house dental lab for seamless, consistent restorations across all teeth',
        'Save 55-70% compared to full mouth restoration costs in the UK or Germany',
        'Treatments phased and scheduled to minimise time in Cyprus',
        'Comprehensive aftercare plan and written guarantees on all work',
      ],
      forWhom: [
        'Patients who have neglected dental care for many years and need extensive rehabilitation',
        'Those with severe tooth wear caused by grinding (bruxism) or acid erosion',
        'People with multiple missing teeth or failing existing restorations',
        'Patients who have been quoted very high prices for comprehensive work at home',
        'Anyone seeking a complete reset of their dental health in one planned process',
      ],
      process: [
        'Comprehensive initial consultation: photographs, X-rays, and full 3D CBCT scan',
        'Detailed treatment plan presented with phased timeline and fixed pricing',
        'Phase 1: extractions, bone grafting, and implant placement where required',
        'Healing phase: temporary restorations worn during osseointegration',
        'Phase 2: all permanent crowns, bridges, and veneers fabricated and fitted',
        'Occlusal (bite) balancing and full-arch adjustment',
        'Final review, professional clean, and long-term maintenance plan issued',
      ],
      results: [
        'A fully restored, functional, and beautiful dentition — from comprehensive damage to complete health',
        'Stable bite, comfortable chewing, and confident speech fully restored',
        'A consistent, natural-looking aesthetic across all visible teeth',
        'Long-term oral health — properly restored teeth are easier to maintain',
        'A profound improvement in quality of life — patients consistently report transformative outcomes',
      ],
      faq: [
        { q: 'How long does full mouth restoration take?', a: 'The timeline depends on complexity. For cases involving implants, the process spans 2 visits over 4-8 months (implant placement, then crown fitting). For restoration-only cases without implants, treatment can be completed within 10-14 days.' },
        { q: 'How much does full mouth restoration cost?', a: 'In the UK or Germany, full mouth restoration can cost £20,000–£50,000 or more depending on the extent of treatment. Our patients consistently achieve equivalent clinical outcomes in North Cyprus at a fraction of that cost.' },
        { q: 'Will I be without teeth during treatment?', a: 'No. We always provide temporary restorations so you are never without functional, presentable teeth during the process — even between visits.' },
        { q: 'Is full mouth restoration suitable for elderly patients?', a: 'Yes. Many of our full mouth restoration patients are over 60. Age is not a barrier. We assess overall health and take a conservative, considered approach to ensure the plan is appropriate and well-tolerated.' },
      ]
    },
  };

  return data[slug] || null;
};

const TreatmentDetailPage = () => {
  const { t, localePath } = useLanguage();
  const { treatmentSlug } = useParams<{ treatmentSlug: string }>();
  
  const treatment = getTreatmentData(treatmentSlug || '', t);

  if (!treatment) {
    return (
      <div className="section-padding container-dental text-center">
        <h1 className="heading-display">Treatment Not Found</h1>
      </div>
    );
  }

  const title = (t as any)[treatment.titleKey] || treatment.titleKey;
  const desc = (t as any)[treatment.descKey] || treatment.descKey;

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[21/9] max-h-[400px] overflow-hidden">
          <img src={treatment.img} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-padding pb-8">
          <div className="container-dental">
            <h1 className="heading-display text-background">{title}</h1>
            <p className="text-background/80 mt-2 max-w-2xl">{desc}</p>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-primary py-6">
        <div className="container-dental px-4 flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton text={t.bookWhatsApp} variant="hero" />
          <WhatsAppButton text={t.sendSmilePhotos} variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.benefits}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {treatment.benefits.map((b, i) => (
              <motion.div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Check className="h-5 w-5 text-trust mt-0.5 shrink-0" />
                <span className="text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.whoIsItFor}</h2>
          <div className="space-y-3">
            {treatment.forWhom.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.treatmentProcess}</h2>
          <div className="space-y-4">
            {treatment.process.map((step, i) => (
              <motion.div key={i} className="flex items-start gap-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                <div className="pt-2 text-sm">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section className="section-padding bg-secondary/30">
        <div className="container-dental max-w-4xl">
          <h2 className="heading-section mb-8">{t.expectedResults}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {treatment.results.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-dental max-w-3xl">
          <h2 className="heading-section text-center mb-8">{t.faqTitle}</h2>
          <div className="space-y-4">
            {treatment.faq.map((faq, i) => (
              <details key={i} className="bg-card rounded-xl border border-border group">
                <summary className="p-5 cursor-pointer font-medium text-foreground flex items-center justify-between">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-dental">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-6">{t.readyToStart}</h2>
          <WhatsAppButton text={t.freeConsultation} variant="hero" />
        </div>
      </section>
    </>
  );
};

export default TreatmentDetailPage;
