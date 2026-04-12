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

const getTreatmentData = (slug: string, t: any, lang: string = "en"): TreatmentData | null => {
  const data: Record<string, TreatmentData> = {
    [t.hollywoodSmileSlug]: {
      titleKey: 'hollywoodSmile',
      descKey: 'hollywoodSmileDesc',
      img: hollywoodSmileImg,
      benefits: [
        "Complete smile transformation in just 5-7 days",
        "Custom-designed porcelain veneers — matched to your face shape",
        "Brilliant white, perfectly aligned teeth",
        "Ultra-thin veneers — minimal tooth reduction required",
        "Save 60-70% compared to UK or German prices",
        "In-house dental lab — faster turnaround, tighter quality control",
        "Results last 15-20 years with routine care",
        "VIP airport transfer and hotel coordination included",
      ],
      forWhom: [
        "Patients unhappy with stained or discoloured teeth that don\'t respond to whitening",
        "Those with gaps, chips, or slightly uneven teeth",
        "Anyone seeking a full smile makeover in a single short trip",
        "UK, German, and European patients looking to save significantly on cosmetic dentistry",
        "People who have been quoted high prices at home and want a trusted alternative",
      ],
      process: [
        "Send your smile photos via WhatsApp — free assessment within 24 hours",
        "Digital smile design: preview your result before any treatment begins",
        "Arrive in Kyrenia — VIP transfer from Ercan or Larnaca airport",
        "Day 1–2: Shade selection, tooth preparation, temporary veneers placed",
        "Day 3–5: Our in-house lab crafts your custom porcelain veneers",
        "Day 6–7: Final bonding, bite adjustment, and your reveal appointment",
        "Return home with your new smile — WhatsApp aftercare support included",
      ],
      results: [
        "A completely transformed, celebrity-quality smile",
        "Veneers indistinguishable from natural teeth in colour and texture",
        "15-20 years durability with proper brushing and check-ups",
        "Stain-resistant porcelain — your smile stays white for years",
        "Immediate confidence boost — patients consistently report life-changing results",
      ],
      faq: [
        { q: "How many days do I need to stay in Cyprus?", a: "Most Hollywood Smile treatments are completed in 5-7 days. We recommend planning a 7-night stay to allow for a comfortable experience without rushing." },
        { q: "Will it look natural or obviously fake?", a: "Our specialist uses digital smile design and a colour-matching process calibrated to your skin tone and face shape. The results look entirely natural — your friends will notice your smile, not your veneers." },
        { q: "Is the treatment painful?", a: "All preparation is done under local anaesthesia. Mild sensitivity in the first 2-3 days is common but manageable. Most patients are pleasantly surprised by how comfortable the process is." },
        { q: "How much can I save compared to the UK?", a: "A full Hollywood Smile in the UK typically costs £8,000–£15,000. At Temelci Dental, the same quality treatment costs a fraction of that — even including flights and accommodation, you save significantly." },
        { q: "What if something goes wrong after I return home?", a: "We provide a written guarantee on all veneer work. For minor adjustments, we can coordinate with a dentist in your home country. For anything significant, return visits are prioritised and fast-tracked." },
      ]
    },
    [t.implantsSlug]: {
      titleKey: 'dentalImplants',
      descKey: 'dentalImplantsDesc',
      img: implantImg,
      benefits: [
        "Permanent, lifetime tooth replacement — not a temporary fix",
        "Looks, feels, and functions exactly like a natural tooth",
        "Titanium root stimulates and preserves your jawbone",
        "No impact on adjacent healthy teeth (unlike bridges)",
        "98%+ success rate — among the highest in modern dentistry",
        "Straumann implants used — the gold standard in implantology",
        "Save 50-65% compared to UK or EU implant prices",
        "Our specialists have placed thousands of implants over 35+ years",
      ],
      forWhom: [
        "Patients with one or more missing teeth seeking a permanent solution",
        "Those struggling with loose, painful, or ill-fitting dentures",
        "People who have been told they need a bridge but want to preserve healthy teeth",
        "Patients with adequate bone density (or who qualify for bone grafting)",
        "UK and European patients comparing implant costs abroad",
      ],
      process: [
        "Share your X-ray via WhatsApp — free suitability assessment within 24 hours",
        "Arrival in Kyrenia — full 3D CBCT scan and treatment planning",
        "Implant placement under local anaesthesia — typically 45-60 minutes per implant",
        "Temporary restoration fitted the same day in most cases",
        "Healing phase: 3-6 months for osseointegration (bone bonding)",
        "Second visit: abutment placement and custom porcelain crown fitting",
        "Final check and bite adjustment — your implant is complete",
      ],
      results: [
        "A fully functional, permanent replacement tooth — for life",
        "Preserved jawbone and facial structure — no sunken appearance",
        "Eat, speak, and smile with complete confidence",
        "No removal, no adhesives, no maintenance beyond normal brushing",
        "A long-term investment that saves money compared to repeated bridge or denture repairs",
      ],
      faq: [
        { q: "Can I get an implant in one trip?", a: "The implant screw is placed on your first visit. Full completion (crown fitting) requires a second visit 3-6 months later once the implant has integrated. Many patients use this as an opportunity for a return holiday." },
        { q: "Is the surgery painful?", a: "The procedure is performed under local anaesthesia and is well-tolerated. Post-operative discomfort is typically mild and managed with standard painkillers for 2-3 days." },
        { q: "What brand of implants do you use?", a: "We primarily use Straumann implants — the global benchmark for quality, with the most extensive clinical evidence base. We also use other premium European-certified systems depending on the case." },
        { q: "How much does an implant cost in Cyprus vs the UK?", a: "A single implant in the UK typically costs £2,000–£3,500. At Temelci Dental, the same Straumann implant with crown is available at a fraction of that price, often saving patients enough to cover their flights and accommodation." },
        { q: "What if my implant fails?", a: "Implant failure is rare at under 2%. In the unlikely event of failure, we will replace the implant at no additional charge during the guarantee period." },
      ]
    },
    [t.veneersSlug]: {
      titleKey: 'veneers',
      descKey: 'veneersDesc',
      img: veneersImg,
      benefits: [
        "Ultra-thin porcelain shells — as thin as a contact lens",
        "Minimal tooth preparation — preserves most of your natural enamel",
        "Covers stains, chips, gaps, and minor misalignment in one treatment",
        "Highly stain-resistant — your teeth stay bright for years",
        "Custom colour-matched for a perfectly natural result",
        "Completed in a single 5-7 day trip",
        "In-house lab fabrication for precise fit and faster delivery",
        "Save 60%+ compared to veneer prices in the UK or Germany",
      ],
      forWhom: [
        "Patients with stubborn staining that doesn\'t respond to whitening",
        "Those with minor chips, cracks, or worn edges on front teeth",
        "Anyone with small gaps or slightly uneven teeth",
        "People who want targeted improvement on specific teeth rather than a full makeover",
        "Patients looking for a conservative cosmetic solution with long-lasting results",
      ],
      process: [
        "Send close-up smile photos via WhatsApp — free consultation within 24 hours",
        "Arrival in Kyrenia — shade consultation and digital smile preview",
        "Minimal tooth preparation under local anaesthesia",
        "Precise impressions taken — temporary veneers placed immediately",
        "In-house lab fabricates your custom porcelain veneers (2-3 days)",
        "Final bonding: veneers are checked for fit, colour, and bite",
        "Polish and adjustments — your new smile is complete",
      ],
      results: [
        "A noticeably improved smile — brighter, more even, and more youthful",
        "10-15 year lifespan with normal care",
        "Completely stain-resistant porcelain surface",
        "Natural translucency that mimics real tooth enamel",
        "Results are immediate — you leave Cyprus with your new smile",
      ],
      faq: [
        { q: "What is the difference between veneers and a Hollywood Smile?", a: "A Hollywood Smile is a complete smile makeover using a full set of veneers across all visible teeth. Individual veneers address specific teeth that need attention. Our specialist will recommend the right approach during your consultation." },
        { q: "Will veneers damage my natural teeth?", a: "A small amount of enamel (typically 0.3–0.5mm) is removed to ensure a flush fit. This is minimal and irreversible, but it preserves the vast majority of your natural tooth structure." },
        { q: "Can I choose the shade?", a: "Absolutely. We use the Vita shade system and digital preview tools so you can see and approve your final shade before any work begins." },
        { q: "How do I care for veneers?", a: "Brush and floss normally. Avoid biting hard objects directly (ice, hard sweets). Use a night guard if you grind your teeth. With these precautions, your veneers will last well over a decade." },
      ]
    },
    [t.crownsSlug]: {
      titleKey: 'crowns',
      descKey: 'crownsDesc',
      img: crownsImg,
      benefits: [
        "Full 360° tooth coverage — protects and strengthens a compromised tooth",
        "Restores teeth that are cracked, heavily filled, or root-canal treated",
        "Porcelain matched to your natural tooth colour — virtually invisible",
        "Durable and long-lasting — 10-15 years with proper care",
        "Restores full chewing function and bite comfort",
        "In-house lab: faster turnaround and precise colour matching",
        "Save 50-65% compared to crown prices in the UK or EU",
        "Same-day temporaries so you\'re never without a tooth",
      ],
      forWhom: [
        "Patients with severely decayed or broken teeth that cannot be filled",
        "Those who have had a root canal treatment (crown protects the treated tooth)",
        "People with large old fillings that have cracked or weakened the tooth",
        "Anyone needing to restore a tooth's shape, function, or appearance",
        "Patients who have been quoted expensive crown work at home",
      ],
      process: [
        "Clinical examination and digital X-rays — full assessment of the tooth",
        "Tooth preparation: shaped under local anaesthesia for crown placement",
        "Precise impressions taken — temporary crown fitted the same day",
        "In-house lab fabricates your custom porcelain crown (2-3 working days)",
        "Crown try-in: colour, fit, and bite checked and adjusted",
        "Permanent cementation — crown bonded securely in place",
        "Final polish and bite alignment — your restored tooth is complete",
      ],
      results: [
        "A fully restored tooth that looks and functions like natural",
        "Complete protection against further cracking or decay",
        "A comfortable, balanced bite restored",
        "10-15 year lifespan — often longer with good oral hygiene",
        "No more sensitivity or pain from the compromised tooth",
      ],
      faq: [
        { q: "Is a crown better than a filling for a damaged tooth?", a: "For teeth with significant damage, large fillings, or after root canal treatment, a crown provides superior protection. A filling only replaces lost tooth material; a crown encases the entire tooth and prevents further fracture." },
        { q: "Will the crown match my other teeth?", a: "Yes. We use the Vita shade guide and natural light assessment to match your crown precisely to adjacent teeth. Our in-house lab allows us to refine the shade with greater accuracy than clinics that outsource lab work." },
        { q: "Does it hurt to have a crown prepared?", a: "Tooth preparation is performed under local anaesthesia. A temporary crown is placed immediately, so the tooth is always protected. Any sensitivity after the anaesthesia wears off is typically mild and short-lived." },
        { q: "Can I get a crown fitted in one trip?", a: "Yes. Because we have an in-house dental laboratory, most crowns are completed within 5-7 days — well within a single trip." },
      ]
    },
    [t.zirconiaCrownsSlug]: {
      titleKey: 'zirconiaCrowns',
      descKey: 'zirconiaCrownsDesc',
      img: zirconiaCrownsImg,
      benefits: [
        "The strongest crown material available — ideal for back teeth",
        "Exceptional aesthetics — translucent, indistinguishable from natural enamel",
        "100% metal-free — no dark gum lines, ever",
        "Biocompatible — safe for patients with metal sensitivities or allergies",
        "CAD/CAM precision milling for a perfect fit every time",
        "Highly resistant to chipping and fracture",
        "Save 55-65% compared to UK or German zirconia crown prices",
        "Fabricated in our in-house lab for colour consistency and fast turnaround",
      ],
      forWhom: [
        "Patients who want the highest-quality crown material available",
        "Those with metal allergies or sensitivity to traditional porcelain-fused-to-metal crowns",
        "Anyone who has experienced dark lines at the gum line with old metal-based crowns",
        "Patients needing crowns on back teeth where maximum strength is required",
        "People seeking a premium, long-term restoration that blends seamlessly",
      ],
      process: [
        "Consultation and shade assessment — using digital tools for accurate colour matching",
        "Tooth preparation under local anaesthesia — precise shaping for zirconia placement",
        "Intraoral digital scan — no messy impressions required",
        "CAD/CAM design: your crown is digitally engineered for perfect anatomy",
        "CNC precision milling from a solid zirconia block",
        "Staining, glazing, and firing — final aesthetic refinement in our lab",
        "Try-in, bite check, and permanent bonding — complete in 5-7 days",
      ],
      results: [
        "A crown stronger than natural tooth enamel — built to last 15-20 years",
        "Perfect colour harmony with adjacent teeth — no artificial white or dark lines",
        "Zero metal components — safer, cleaner, and more biocompatible",
        "Comfortable bite with natural chewing feel restored",
        "A premium restoration that requires no compromise between strength and beauty",
      ],
      faq: [
        { q: "Why choose zirconia over porcelain-fused-to-metal?", a: "Porcelain-fused-to-metal (PFM) crowns have a metal substructure that can show as a dark line at the gum line over time. Zirconia is entirely metal-free, offers superior aesthetics, and is stronger than PFM. It is now the gold standard for dental restorations." },
        { q: "Is zirconia suitable for front teeth?", a: "Yes. Modern high-translucency zirconia mimics the natural light transmission of real enamel, making it ideal for front teeth where aesthetics are critical." },
        { q: "How long do zirconia crowns last?", a: "With proper oral hygiene and regular check-ups, zirconia crowns routinely last 15-20 years. Their fracture resistance is significantly higher than porcelain alternatives." },
        { q: "Can I get zirconia crowns in one trip?", a: "Yes. Our in-house CAD/CAM lab allows us to complete zirconia crowns within a single 5-7 day visit in most cases." },
      ]
    },
    [t.teethWhiteningSlug]: {
      titleKey: 'teethWhitening',
      descKey: 'teethWhiteningDesc',
      img: teethWhiteningImg,
      benefits: [
        "Up to 8 shades brighter in a single session",
        "Professional-grade whitening gel — far stronger than over-the-counter products",
        "LED light activation for accelerated, even results",
        "Safe gum protection applied before treatment begins",
        "Immediate, visible results — walk out with a noticeably brighter smile",
        "Add-on take-home trays available for ongoing maintenance",
        "Often combined with veneers or Hollywood Smile for dramatic transformation",
        "Affordable — a fraction of UK whitening clinic prices",
      ],
      forWhom: [
        "Patients with yellowing or staining from coffee, tea, red wine, or tobacco",
        "Those preparing for a wedding, special event, or important occasion",
        "Anyone wanting a quick, visible improvement without extensive treatment",
        "Dental tourists combining whitening with another procedure during their trip",
        "People who have tried over-the-counter whitening with disappointing results",
      ],
      process: [
        "Pre-treatment check to assess suitability — whitening is not suitable for all cases",
        "Teeth cleaning to remove surface deposits for even whitening",
        "Custom gum shield applied to protect soft tissue",
        "Professional whitening gel applied to tooth surfaces",
        "LED light activation — 3 rounds of 15-20 minutes each",
        "Gel removed and final shade evaluation — compared against starting shade",
        "Take-home tray and maintenance gel provided if selected",
      ],
      results: [
        "Teeth that are up to 8 shades whiter after a single appointment",
        "Visibly brighter smile — noticeable in photos and in person",
        "Results last 6-12 months depending on diet and lifestyle",
        "A fast, cost-effective enhancement that makes a significant visual difference",
        "An ideal complement to veneers, crowns, or any cosmetic dental work",
      ],
      faq: [
        { q: "Is professional whitening safe?", a: "Yes. Clinical whitening uses peroxide concentrations that are regulated and applied by trained dental professionals with proper gum protection. It is significantly safer and more effective than unsupervised home kits." },
        { q: "Will whitening work on crowns or veneers?", a: "No. Whitening only works on natural tooth enamel. If you have visible crowns or veneers, we recommend whitening before any restorations are placed so that we can match the new shade." },
        { q: "How long do results last?", a: "Typically 6-12 months. Avoiding heavy staining foods and drinks, and maintaining good oral hygiene, will extend the results. Take-home trays allow for periodic touch-ups." },
        { q: "Is it painful?", a: "Some patients experience mild sensitivity during or after the procedure. This is normal and temporary, resolving within 24-48 hours. We use a desensitising gel to minimise discomfort." },
      ]
    },
    [t.smileMakeoverSlug]: {
      titleKey: 'smileMakeover',
      descKey: 'smileMakeoverDesc',
      img: smileMakeoverImg,
      benefits: [
        "Multiple concerns addressed in a single coordinated treatment plan",
        "Digital smile design — see your result before treatment begins",
        "Completely personalised: no two smile makeovers are the same",
        "Combines veneers, crowns, whitening, and implants as needed",
        "In-house lab ensures consistency across all restorations",
        "Dramatic transformation achievable within a single 7-10 day trip",
        "Save 55-70% compared to smile makeover costs in the UK or EU",
        "Holistic approach: function, health, and aesthetics all considered together",
      ],
      forWhom: [
        "Patients who have multiple cosmetic and functional concerns they want addressed at once",
        "Those who have always wanted to transform their smile but have been put off by the cost at home",
        "People combining dental treatment with a holiday in the Eastern Mediterranean",
        "Patients who have had previous dental work that now looks outdated or inconsistent",
        "Anyone who wants a single, cohesive result rather than piecemeal treatments over several years",
      ],
      process: [
        "Submit your smile photos and concerns via WhatsApp — free initial assessment",
        "Arrival consultation: full examination, 3D scan, and in-depth goals discussion",
        "Digital smile design: a visual preview of your proposed outcome",
        "Treatment plan presented with timeline, stages, and clear pricing",
        "Phase 1: foundational work — any necessary extractions, implants, or gum treatment",
        "Phase 2: restorations — veneers, crowns, whitening as designed",
        "Final reveal: adjustments, polishing, and professional photography of your result",
      ],
      results: [
        "A completely transformed smile — consistent, harmonious, and natural-looking",
        "Improved facial proportions — a smile designed to complement your features",
        "Restored function: comfortable bite, easy chewing, clear speech",
        "Long-lasting results with proper maintenance — most restorations last 10-20 years",
        "A life-changing outcome that patients consistently describe as among the best decisions they have made",
      ],
      faq: [
        { q: "What treatments might be included in a smile makeover?", a: "A smile makeover is entirely tailored to you. It might include teeth whitening, porcelain veneers, zirconia crowns, dental implants, gum contouring, or any combination. Our specialist will recommend only what is genuinely needed to achieve your goal." },
        { q: "Can a smile makeover be completed in one trip?", a: "For most patients, the aesthetic component can be completed in 7-10 days. If implants are part of the plan, a second visit 3-6 months later is required for the final crown fitting." },
        { q: "How do I know what I will look like beforehand?", a: "We use digital smile design software to produce a realistic preview before any treatment begins. You approve the design — including tooth shape, size, and shade — before we proceed." },
        { q: "What is the cost of a smile makeover in North Cyprus vs the UK?", a: "In the UK, a comprehensive smile makeover can cost £10,000–£25,000 or more. At Temelci Dental, our patients typically achieve the same clinical outcome for considerably less — even after accounting for travel and accommodation." },
      ]
    },
    [t.fullMouthRestorationSlug]: {
      titleKey: 'fullMouthRestoration',
      descKey: 'fullMouthRestorationDesc',
      img: fullMouthImg,
      benefits: [
        "Complete rehabilitation of all teeth — aesthetic and functional",
        "Addresses decades of damage, wear, decay, or tooth loss in one coordinated plan",
        "Multi-specialist team: implantology, prosthodontics, and aesthetic dentistry",
        "3D CBCT scanning for precise surgical and prosthetic planning",
        "In-house dental lab for seamless, consistent restorations across all teeth",
        "Save 55-70% compared to full mouth restoration costs in the UK or Germany",
        "Treatments phased and scheduled to minimise time in Cyprus",
        "Comprehensive aftercare plan and written guarantees on all work",
      ],
      forWhom: [
        "Patients who have neglected dental care for many years and need extensive rehabilitation",
        "Those with severe tooth wear caused by grinding (bruxism) or acid erosion",
        "People with multiple missing teeth or failing existing restorations",
        "Patients who have been quoted very high prices for comprehensive work at home",
        "Anyone seeking a complete reset of their dental health in one planned process",
      ],
      process: [
        "Comprehensive initial consultation: photographs, X-rays, and full 3D CBCT scan",
        "Detailed treatment plan presented with phased timeline and fixed pricing",
        "Phase 1: extractions, bone grafting, and implant placement where required",
        "Healing phase: temporary restorations worn during osseointegration",
        "Phase 2: all permanent crowns, bridges, and veneers fabricated and fitted",
        "Occlusal (bite) balancing and full-arch adjustment",
        "Final review, professional clean, and long-term maintenance plan issued",
      ],
      results: [
        "A fully restored, functional, and beautiful dentition — from comprehensive damage to complete health",
        "Stable bite, comfortable chewing, and confident speech fully restored",
        "A consistent, natural-looking aesthetic across all visible teeth",
        "Long-term oral health — properly restored teeth are easier to maintain",
        "A profound improvement in quality of life — patients consistently report transformative outcomes",
      ],
      faq: [
        { q: "How long does full mouth restoration take?", a: "The timeline depends on complexity. For cases involving implants, the process spans 2 visits over 4-8 months (implant placement, then crown fitting). For restoration-only cases without implants, treatment can be completed within 10-14 days." },
        { q: "How much does full mouth restoration cost?", a: "In the UK or Germany, full mouth restoration can cost £20,000–£50,000 or more depending on the extent of treatment. Our patients consistently achieve equivalent clinical outcomes in North Cyprus at a fraction of that cost." },
        { q: "Will I be without teeth during treatment?", a: "No. We always provide temporary restorations so you are never without functional, presentable teeth during the process — even between visits." },
        { q: "Is full mouth restoration suitable for elderly patients?", a: "Yes. Many of our full mouth restoration patients are over 60. Age is not a barrier. We assess overall health and take a conservative, considered approach to ensure the plan is appropriate and well-tolerated." },
      ]
    },
    [t.rootCanalSlug]: {
      titleKey: 'rootCanal',
      descKey: 'rootCanalDesc',
      img: implantImg,
      benefits: [
        "Saves your natural tooth — no extraction necessary",
        "Modern rotary instrumentation: faster, more precise and more comfortable",
        "Performed under local anaesthesia — most patients feel no discomfort during treatment",
        "42+ years of endodontic expertise in our team",
        "Digital X-ray and 3D CBCT scanning for precise canal mapping",
        "Same-day treatment in most cases — no long waiting lists",
        "Significantly lower cost than equivalent UK or European dental fees",
        "Crown fitting included in the overall treatment plan when required",
      ],
      forWhom: [
        "Patients with severe toothache, prolonged sensitivity to heat or cold, or spontaneous pain",
        "Those with a tooth that is darkening or has visible swelling around the root",
        "Anyone who has been told they need a root canal but wants a second opinion or a cost-effective option",
        "Patients with a cracked tooth or deep decay reaching the pulp",
        "Those who have had previous root canal treatment that has failed and requires revision",
      ],
      process: [
        "Digital X-ray and clinical examination to assess the infection and canal anatomy",
        "Local anaesthesia administered — the area is fully numb before treatment begins",
        "Infected pulp tissue removed using modern rotary endodontic instruments",
        "Canals cleaned, shaped, and disinfected with antibacterial irrigation",
        "Canals sealed with biocompatible gutta-percha filling material",
        "Temporary or permanent restoration placed to protect the tooth",
        "Crown fitted over the treated tooth where structural support is needed",
      ],
      results: [
        "Complete elimination of infection and pain",
        "Your natural tooth preserved for years, often for life",
        "Normal biting and chewing function fully restored",
        "Adjacent teeth and jawbone protected from spreading infection",
        "Significant cost saving versus extraction and implant replacement",
      ],
      faq: [
        { q: "Is root canal treatment painful?", a: "With modern local anaesthesia and rotary instrumentation, the procedure itself is no more uncomfortable than a routine filling. Most patients are surprised by how manageable it is. Any post-treatment sensitivity typically resolves within 2–3 days." },
        { q: "How many appointments does it take?", a: "Most root canals are completed in one or two appointments. Complex multi-canal teeth or cases with significant infection may require an additional visit for irrigation and medication." },
        { q: "Can a root canal tooth last a lifetime?", a: "Yes. A properly treated and restored root canal tooth can last as long as a natural tooth. The key is fitting an appropriate crown to protect the tooth from fracture." },
        { q: "What happens if I don't have the root canal?", a: "Untreated pulp infection will not resolve on its own. It will spread to the jawbone, potentially causing an abscess, bone loss, and eventually tooth loss. Early treatment is always preferable." },
      ]
    },
    [t.compositeFillingSlug]: {
      titleKey: 'compositeFilling',
      descKey: 'compositeFillingDesc',
      img: hollywoodSmileImg,
      benefits: [
        "Tooth-coloured material — completely invisible once placed",
        "Bonds directly to the tooth — less drilling needed than with amalgam",
        "Completed in a single appointment in most cases",
        "Restores full biting strength and function",
        "Mercury-free and biocompatible — safe for all patients",
        "Can be used to repair chips, close small gaps, and reshape teeth",
        "Durable results lasting 7–10 years with proper care",
        "Affordable pricing — significantly lower than European dental fees",
      ],
      forWhom: [
        "Patients with cavities needing a natural-looking, durable restoration",
        "Those wanting to replace old amalgam (silver) fillings with tooth-coloured ones",
        "Anyone with minor chips, cracks, or worn tooth edges",
        "Patients seeking same-day, pain-free dental restoration",
        "Children and adults — composite fillings suit all age groups",
      ],
      process: [
        "Examination and X-ray to identify the extent of decay or damage",
        "Local anaesthesia applied if required — the area is numbed before treatment",
        "Decay removed and the tooth surface prepared and etched",
        "Composite resin applied in layers and sculpted to match the tooth shape",
        "Each layer cured (hardened) with a specialised light",
        "Final polish and bite check to ensure natural comfort",
      ],
      results: [
        "A natural-looking tooth that is indistinguishable from adjacent teeth",
        "Full restoration of chewing function and comfort",
        "Decay stopped in its tracks — no further spread",
        "A smooth, polished surface that resists future staining",
        "Long-lasting results with routine brushing and check-ups",
      ],
      faq: [
        { q: "How long does a composite filling last?", a: "Composite fillings typically last 7–10 years, sometimes longer. Longevity depends on the size and location of the filling and your oral hygiene routine." },
        { q: "Is it better to get composite or amalgam?", a: "Composite fillings are now the preferred choice for most patients. They are tooth-coloured, mercury-free, require less drilling, and bond directly to the tooth. Amalgam may still be recommended in very specific clinical situations." },
        { q: "Will I need an injection?", a: "For fillings that involve removing decay, local anaesthesia is used to ensure complete comfort. Very small, superficial fillings may not require an injection." },
      ]
    },
    [t.allOn4Slug]: {
      titleKey: 'allOn4',
      descKey: 'allOn4Desc',
      img: fullMouthImg,
      benefits: [
        "A full arch of fixed teeth on just 4 or 6 implants — no removable dentures",
        "Permanent, non-removable bridge fitted in days, not months",
        "Preserves jawbone and facial structure — prevents the sunken look of denture wearers",
        "Implants strategically angled to maximise use of available bone — often no grafting needed",
        "Straumann implants used — global benchmark for long-term success",
        "Full team approach: oral surgeon, prosthodontist, and ceramic technician in-house",
        "Save 60–70% compared to All-on-4 costs in the UK or Germany",
        "Eat, speak, and smile with complete confidence from day one",
      ],
      forWhom: [
        "Patients who have lost all or most of their teeth in one or both arches",
        "Those with failing teeth that need extraction and full replacement",
        "Denture wearers who want a permanent, non-removable alternative",
        "Patients who have been told they have insufficient bone for conventional implants",
        "UK and European patients seeking the highest-quality full arch solution at a fraction of home prices",
      ],
      process: [
        "Full 3D CBCT scan and digital treatment planning — bone volume and implant position mapped precisely",
        "Consultation with our surgical and prosthodontic team to confirm the treatment plan",
        "Day of surgery: extractions (if required), implant placement under sedation or local anaesthesia",
        "Temporary fixed bridge attached the same day — you leave with teeth",
        "Healing phase: 3–6 months for osseointegration",
        "Return visit: final zirconia or ceramic bridge fabricated in our in-house lab and fitted",
        "Bite adjustment, polish, and long-term maintenance plan issued",
      ],
      results: [
        "A full set of fixed, natural-looking teeth — permanently in place",
        "Restored ability to eat all foods, including hard and crunchy ones",
        "Preserved jawbone density and natural facial profile",
        "Freedom from denture adhesives, loose plates, and social anxiety",
        "A long-term investment — All-on-4 implants can last a lifetime with proper care",
      ],
      faq: [
        { q: "How many days do I need to stay in Cyprus?", a: "The surgical placement and temporary bridge fitting takes 3–5 days. You then return 3–6 months later for your permanent bridge, which takes another 3–5 days. Many patients enjoy both visits as short holidays." },
        { q: "Is All-on-4 painful?", a: "Surgery is performed under local anaesthesia, often with sedation available. Post-operative discomfort is typically manageable with standard pain relief for the first 2–3 days." },
        { q: "What is the difference between All-on-4 and All-on-6?", a: "All-on-6 uses 6 implants for additional stability and is preferred when bone volume allows. It provides a slightly more robust long-term foundation. Our surgeon will recommend the right option after reviewing your CBCT scan." },
        { q: "Can I get All-on-4 on both arches at once?", a: "Yes. Many patients complete both upper and lower arches in the same surgical session. This reduces overall recovery time and total cost." },
      ]
    },
    [t.clearAlignersSlug]: {
      titleKey: 'clearAligners',
      descKey: 'clearAlignersDesc',
      img: veneersImg,
      benefits: [
        "Nearly invisible — most people won't notice you're wearing them",
        "Removable: eat, drink, and clean your teeth normally",
        "No metal brackets, wires, or irritation to gums and cheeks",
        "Custom-manufactured to your precise dental measurements",
        "Digital treatment preview — see your projected result before you begin",
        "Fewer in-clinic appointments compared to traditional braces",
        "Suitable for mild to moderate crowding, spacing, and bite issues",
        "Comfortable and low-maintenance throughout treatment",
      ],
      forWhom: [
        "Adults and teens with mild to moderate crowding or spacing",
        "Those who want discreet orthodontic treatment without metal braces",
        "Patients with minor relapse after previous orthodontic treatment",
        "Anyone self-conscious about the appearance of traditional braces",
        "Patients with good compliance — aligners must be worn 20–22 hours per day",
      ],
      process: [
        "Clinical examination and digital dental scan to assess suitability",
        "3D treatment simulation produced — you approve your expected result",
        "Custom aligner series manufactured and delivered",
        "Aligners changed every 1–2 weeks, each moving teeth incrementally",
        "Progress check appointments at intervals throughout treatment",
        "Refinement aligners issued if minor adjustments are needed",
        "Retainer fitted at the end of treatment to hold the result",
      ],
      results: [
        "Straighter, better-aligned teeth without the discomfort of fixed braces",
        "Improved bite and easier long-term oral hygiene",
        "A natural-looking smile achieved discreetly",
        "Maintained results with consistent retainer wear",
        "Boost in confidence — many patients notice the change within weeks",
      ],
      faq: [
        { q: "How long does clear aligner treatment take?", a: "Treatment duration ranges from 3 months for minor corrections to 18 months for more complex cases. Your clinician will give an accurate estimate after assessing your scan." },
        { q: "Can I eat normally with clear aligners?", a: "Yes. Unlike fixed braces, aligners are removed for eating and drinking (anything other than cold water). This means no dietary restrictions." },
        { q: "Are clear aligners as effective as braces?", a: "For mild to moderate cases, clear aligners achieve excellent results. For complex bite corrections or severe crowding, traditional fixed braces or a combination approach may be more appropriate." },
      ]
    },
    [t.dentalBondingSlug]: {
      titleKey: 'dentalBonding',
      descKey: 'dentalBondingDesc',
      img: hollywoodSmileImg,
      benefits: [
        "Completed in a single appointment — no lab work required",
        "No drilling or removal of healthy tooth structure in most cases",
        "Tooth-coloured composite matched precisely to your natural shade",
        "Repairs chips, cracks, gaps, and surface discolouration",
        "Reversible and adjustable — can be removed or modified if needed",
        "Cost-effective alternative to veneers for minor cosmetic concerns",
        "Immediate result — walk in with an imperfection, leave with a repaired smile",
        "No anaesthesia required in most cases",
      ],
      forWhom: [
        "Patients with a chipped or cracked front tooth",
        "Those with small gaps between teeth that don't warrant orthodontic treatment",
        "Anyone with minor discolouration that whitening hasn't resolved",
        "Patients wanting a quick, affordable cosmetic improvement",
        "Those not ready to commit to permanent veneers but wanting an improvement now",
      ],
      process: [
        "Shade selection: composite colour matched to your surrounding teeth",
        "Tooth surface lightly etched to create a bonding surface",
        "Composite resin applied and carefully sculpted by hand",
        "Resin hardened with a curing light",
        "Shape refined, adjusted, and polished to a natural finish",
        "Bite checked to ensure even contact",
      ],
      results: [
        "A repaired, natural-looking tooth in under an hour",
        "Seamless blending with surrounding teeth in colour and texture",
        "Restored confidence to smile without self-consciousness",
        "Results that last 5–7 years with normal care",
        "A reversible option — upgrade to veneers later if desired",
      ],
      faq: [
        { q: "How long does dental bonding last?", a: "Composite bonding typically lasts 5–7 years before it may need touching up or replacing. It's less durable than porcelain veneers but far less invasive and much more affordable." },
        { q: "Does dental bonding stain?", a: "Composite resin is more susceptible to staining than porcelain. Limiting coffee, tea, and red wine, and maintaining good oral hygiene will significantly extend the result." },
        { q: "Is it painful?", a: "No. Dental bonding rarely requires any anaesthesia. The process is entirely comfortable for the vast majority of patients." },
      ]
    },
    [t.orthodonticsSlug]: {
      titleKey: 'orthodontics',
      descKey: 'orthodonticsDesc',
      img: veneersImg,
      benefits: [
        "Correct crowding, spacing, crossbite, overbite, and underbite",
        "Improved oral hygiene — straighter teeth are easier to clean",
        "Reduced risk of gum disease and tooth wear from misalignment",
        "Options to suit every patient: traditional braces or clear aligners",
        "Experienced orthodontic team — precise, personalised treatment plans",
        "Digital treatment planning with projected outcome modelling",
        "Fixed and removable appliance options available",
        "Significant cost saving versus orthodontic fees in the UK or Germany",
      ],
      forWhom: [
        "Children and teenagers with developing dentition requiring early correction",
        "Adults with crowding, spacing, or bite issues causing discomfort or aesthetic concerns",
        "Patients experiencing jaw pain or headaches related to bite misalignment",
        "Those who had orthodontic treatment years ago and have experienced relapse",
        "Anyone referred by their dentist for orthodontic assessment",
      ],
      process: [
        "Full clinical examination, digital X-rays, and photographs",
        "Orthodontic assessment: bite analysis, crowding index, jaw relationship",
        "Treatment plan presented with expected duration and appliance options",
        "Appliances fitted (brackets bonded, or aligners delivered)",
        "Regular adjustment appointments to progress tooth movement",
        "Debonding (removal of braces) once treatment objectives are achieved",
        "Retainer fitted to maintain the result long-term",
      ],
      results: [
        "Straighter, well-aligned teeth and a balanced smile",
        "Improved bite function — less strain on jaw muscles and joints",
        "Easier oral hygiene and lower long-term risk of decay and gum disease",
        "Enhanced facial balance and profile in selected cases",
        "A lasting result maintained with consistent retainer use",
      ],
      faq: [
        { q: "What is the minimum age for orthodontic treatment?", a: "Early orthodontic assessment can begin from age 7–8, though most treatment starts in the early teenage years when the permanent teeth have erupted. Adult orthodontics has no upper age limit." },
        { q: "How long does orthodontic treatment take?", a: "Duration varies from 6 months for minor corrections to 2 years for complex cases. Your orthodontist will give an accurate estimate after examination." },
        { q: "Are braces painful?", a: "There is typically some tenderness for the first few days after fitting or adjustment. This is normal and manageable with over-the-counter pain relief. Clear aligners tend to cause less discomfort than fixed braces." },
      ]
    },
    [t.wisdomToothSlug]: {
      titleKey: 'wisdomTooth',
      descKey: 'wisdomToothDesc',
      img: implantImg,
      benefits: [
        "Experienced oral and maxillofacial surgeon — Dr. Ali Temelci, specialist in surgical extractions",
        "3D CBCT imaging used for complex cases — precise nerve and root mapping",
        "Local anaesthesia with sedation available for anxious patients",
        "Most extractions completed in a single appointment",
        "Eliminates pain, infection, and damage to adjacent teeth",
        "Prevents future crowding caused by impacted wisdom teeth",
        "Post-operative care instructions and follow-up included",
        "Significantly more affordable than UK surgical extraction fees",
      ],
      forWhom: [
        "Patients with painful, swollen, or infected wisdom teeth",
        "Those with partially erupted wisdom teeth causing food trapping and decay",
        "Patients where wisdom teeth are impacted (trapped under the gum or bone)",
        "Anyone experiencing repeated infections (pericoronitis) around a wisdom tooth",
        "Those whose wisdom teeth are damaging or crowding adjacent teeth",
      ],
      process: [
        "Clinical examination and digital X-ray or 3D CBCT scan to assess position and root anatomy",
        "Treatment plan confirmed — simple versus surgical extraction determined",
        "Local anaesthesia administered to fully numb the area",
        "Surgical flap raised if required; tooth sectioned if impacted",
        "Tooth removed and socket cleaned and irrigated",
        "Sutures placed where necessary — typically dissolvable",
        "Post-operative care instructions provided; follow-up arranged",
      ],
      results: [
        "Complete resolution of pain, swelling, and infection",
        "Protection of adjacent teeth from further damage or decay",
        "Prevention of future dental complications from the impacted tooth",
        "Fast healing — most patients return to normal activities within 48–72 hours",
        "Long-term oral health improved by removing a problematic tooth",
      ],
      faq: [
        { q: "How painful is wisdom tooth removal?", a: "The procedure is performed under local anaesthesia — you will feel pressure but not pain. Post-operative discomfort varies depending on complexity; most patients manage well with standard painkillers for 2–3 days." },
        { q: "Do all wisdom teeth need to be removed?", a: "No. Wisdom teeth that are fully erupted, properly aligned, and healthy do not need removal. Extraction is recommended when they are impacted, causing recurrent infection, damaging adjacent teeth, or are structurally compromised." },
        { q: "How long is the recovery?", a: "Most patients recover within 3–5 days for straightforward extractions. Surgical removal of deeply impacted teeth may require 5–7 days before discomfort fully resolves. Swelling typically peaks at 48 hours and then subsides." },
      ]
    },
    [t.gumDiseaseSlug]: {
      titleKey: 'gumDisease',
      descKey: 'gumDiseaseDesc',
      img: implantImg,
      benefits: [
        "Early intervention stops gum disease before it causes irreversible bone loss",
        "Advanced periodontal therapy for established gum disease",
        "Professional deep cleaning (scaling and root planing) removes hidden bacterial deposits",
        "Laser-assisted periodontal therapy available for enhanced results",
        "Personalised oral hygiene coaching — long-term prevention at home",
        "Links to systemic health addressed: gum disease and diabetes, heart disease, and pregnancy complications",
        "Comprehensive monitoring with periodontal charting",
        "Significant cost saving versus UK periodontal specialist fees",
      ],
      forWhom: [
        "Patients with bleeding gums, bad breath, or gum recession",
        "Those with red, swollen, or tender gum tissue",
        "Patients who have been diagnosed with gingivitis or periodontitis",
        "Implant patients needing peri-implant disease treatment",
        "Smokers and diabetics who are at elevated risk of gum disease",
      ],
      process: [
        "Full periodontal examination: probing depths, bleeding scores, and radiographic bone assessment",
        "Oral hygiene instruction tailored to your specific needs",
        "Professional scale and polish to remove surface tartar",
        "Deep cleaning (scaling and root planing) under local anaesthesia for advanced disease",
        "Laser-assisted decontamination of deep pockets where indicated",
        "Review appointment: re-assessment of pocket depths and treatment response",
        "Maintenance programme established — ongoing 3–6 monthly supportive care",
      ],
      results: [
        "Reduced pocket depths, stopped bleeding, and firmer gum tissue",
        "Halted bone loss — further destruction prevented with ongoing care",
        "Fresher breath and a cleaner, healthier mouth",
        "Retained natural teeth that might otherwise have been lost",
        "A solid foundation for any future cosmetic or restorative treatment",
      ],
      faq: [
        { q: "Can gum disease be cured?", a: "Gingivitis (early gum disease) is fully reversible with professional cleaning and improved home care. Periodontitis (advanced gum disease with bone loss) cannot be 'cured' but it can be effectively managed and stabilised with treatment and ongoing maintenance." },
        { q: "Is gum disease treatment painful?", a: "Deep cleaning is performed under local anaesthesia. Some post-treatment sensitivity and mild gum soreness is normal for a few days but is manageable." },
        { q: "How does smoking affect gum disease?", a: "Smoking is the single biggest risk factor for gum disease. It impairs blood flow to the gums, masking symptoms and significantly reducing the response to treatment. Stopping smoking is the most impactful step a patient can take." },
      ]
    },
    [t.laserGumSlug]: {
      titleKey: 'laserGum',
      descKey: 'laserGumDesc',
      img: hollywoodSmileImg,
      benefits: [
        "Minimally invasive — no scalpel, no stitches in most cases",
        "Gummy smile correction: excess gum tissue removed precisely",
        "Laser sterilises the treatment area — lower infection risk than conventional surgery",
        "Faster healing compared to traditional gum surgery",
        "Crown lengthening for teeth that appear short due to excess gum",
        "Reduces deep periodontal pockets — used alongside scaling and root planing",
        "Highly accurate: targets only diseased tissue, preserving healthy gum",
        "Comfortable treatment with local anaesthesia",
      ],
      forWhom: [
        "Patients with a 'gummy smile' who show too much gum when smiling",
        "Those with teeth that appear short due to excess gum coverage",
        "Patients with deep periodontal pockets not responding to conventional cleaning",
        "Anyone with uneven or asymmetric gum line affecting their smile aesthetics",
        "Patients requiring crown lengthening before a restoration",
      ],
      process: [
        "Clinical assessment and digital smile analysis to plan the precise gum contour",
        "Local anaesthesia applied to ensure complete comfort",
        "Laser used to sculpt and remove excess gum tissue with pinpoint accuracy",
        "Gum line shaped to achieve symmetry and the desired aesthetic",
        "Treatment area sealed by the laser — no sutures needed in most cases",
        "Post-treatment care instructions provided; healing assessed at follow-up",
      ],
      results: [
        "A more balanced, proportionate smile with less visible gum",
        "Teeth that appear longer and more prominent",
        "Symmetric, natural-looking gum contour",
        "Healthier gum tissue — laser treatment reduces bacterial load",
        "Results visible immediately, with full healing within 1–2 weeks",
      ],
      faq: [
        { q: "Is laser gum treatment painful?", a: "The procedure is performed under local anaesthesia. Post-treatment discomfort is generally mild — most patients manage with over-the-counter pain relief for 1–2 days." },
        { q: "How long does the result last?", a: "Gum reshaping results are permanent in the sense that removed tissue does not regrow. Maintaining good oral hygiene and attending regular check-ups ensures the result stays stable." },
        { q: "Can laser gum treatment fix a gummy smile?", a: "Yes. For many patients with a gummy smile caused by excess gum tissue (rather than skeletal or lip factors), laser gum reshaping produces a dramatic and lasting improvement in a single short appointment." },
      ]
    },
    [t.bruxismSlug]: {
      titleKey: 'bruxism',
      descKey: 'bruxismDesc',
      img: crownsImg,
      benefits: [
        "Accurate diagnosis of grinding and clenching patterns",
        "Custom-fitted occlusal splints (night guards) protect teeth during sleep",
        "Prevents further tooth wear, fractures, and enamel loss",
        "Relieves jaw pain, headaches, and temporomandibular joint (TMJ) discomfort",
        "Botox injections for severe bruxism — relaxes overactive jaw muscles",
        "Bite adjustment (occlusal equilibration) to remove grinding triggers",
        "Long-term monitoring and splint adjustment included",
        "Comprehensive approach addressing both physical and lifestyle factors",
      ],
      forWhom: [
        "Patients experiencing jaw pain, clicking, or locking of the jaw",
        "Those with morning headaches or facial muscle soreness on waking",
        "Anyone told by a dentist that their teeth are showing signs of grinding",
        "Patients with worn, flattened, or sensitive teeth",
        "Those with stress-related clenching habits that are damaging their dentition",
      ],
      process: [
        "Comprehensive assessment: examination of teeth, jaw muscles, and TMJ",
        "Digital study models and photographs to document wear patterns",
        "Occlusal analysis to identify bite interferences triggering grinding",
        "Custom night guard fabricated in our in-house lab — fitted and adjusted",
        "Bite adjustment carried out if specific occlusal contacts are identified",
        "Botox jaw muscle injection discussed and administered where appropriate",
        "Follow-up review: symptom assessment and splint adjustment",
      ],
      results: [
        "Significant reduction in jaw pain, headaches, and morning stiffness",
        "Teeth protected from further wear and fracture",
        "Improved sleep quality — without the noise and physical damage of grinding",
        "TMJ symptoms improved or resolved in most cases",
        "Long-term tooth preservation — bruxism left untreated is one of the most destructive dental habits",
      ],
      faq: [
        { q: "Can bruxism be cured?", a: "Bruxism cannot always be permanently eliminated, but it can be effectively managed. Night guards protect the teeth. Stress management, posture correction, and in some cases Botox can significantly reduce the grinding behaviour." },
        { q: "Is a night guard enough?", a: "A night guard is the cornerstone of bruxism management — it absorbs the forces of grinding and protects the teeth. For patients with significant jaw pain or muscle hypertrophy, Botox injections are a highly effective adjunct." },
        { q: "What is Botox for bruxism?", a: "Injecting small amounts of botulinum toxin into the masseter (jaw) muscles relaxes them, significantly reducing the force and frequency of grinding. The effect lasts 4–6 months and can be repeated. It is a safe and well-established treatment." },
      ]
    },
    [t.preventiveDentistrySlug]: {
      titleKey: 'preventiveDentistry',
      descKey: 'preventiveDentistryDesc',
      img: hollywoodSmileImg,
      benefits: [
        "Catch problems early — small cavities cost far less to treat than large ones",
        "Professional cleaning removes tartar that brushing alone cannot reach",
        "Fissure sealants protect vulnerable back teeth from decay",
        "Fluoride treatments strengthen enamel and reduce cavity risk",
        "Personalised oral hygiene advice — technique, products, and routine",
        "Oral cancer screening included at every check-up",
        "Gum health assessment and early intervention where needed",
        "A long-term investment: prevention is dramatically cheaper than treatment",
      ],
      forWhom: [
        "Everyone — adults, children, and elderly patients",
        "Patients who haven't seen a dentist for several years and want a fresh start",
        "Those with a history of cavities or gum disease wanting to break the cycle",
        "Patients with fixed restorations (implants, crowns, veneers) needing professional maintenance",
        "Children and teenagers building good dental habits for life",
      ],
      process: [
        "Full clinical examination: teeth, gums, soft tissues, and jaw",
        "Digital X-rays to detect decay, bone levels, and hidden pathology",
        "Professional scale and polish: removal of tartar above and below the gumline",
        "Fissure sealants applied to vulnerable molars where appropriate",
        "Fluoride varnish applied to strengthen enamel",
        "Personalised oral hygiene coaching: brushing, flossing, and interdental cleaning",
        "Recall appointment scheduled — typically every 6 months",
      ],
      results: [
        "A clean, healthy mouth with a measurably reduced risk of future problems",
        "Early detection and treatment of any developing issues before they become costly",
        "Healthier gums, fresher breath, and a brighter smile",
        "A personalised prevention plan that keeps your teeth for life",
        "Confidence — knowing your dental health is actively monitored and maintained",
      ],
      faq: [
        { q: "How often should I have a check-up?", a: "Most adults benefit from a check-up every 6 months. Patients with a history of gum disease or high cavity risk may be advised to attend every 3–4 months. Your dentist will recommend the right interval for you." },
        { q: "What is a fissure sealant?", a: "A fissure sealant is a thin coating of protective material applied to the chewing surfaces of back teeth. It fills the natural grooves where bacteria accumulate and is particularly effective for children and teenagers." },
        { q: "Is fluoride treatment safe for adults?", a: "Yes. Professional fluoride varnish is safe, effective, and recommended for patients of all ages who have a risk of tooth decay. The fluoride concentration is much higher than in toothpaste and provides a direct protective benefit to the enamel." },
      ]
    },
  };


  // Turkish translations for treatment detail pages
  const trData: Record<string, TreatmentData> = {
    [t.hollywoodSmileSlug]: {
      titleKey: "hollywoodSmile",
      descKey: "hollywoodSmileDesc",
      img: hollywoodSmileImg,
      benefits: [
        "5-7 günde tamamlanan tam gülüş dönüşümü",
        "Yüz şeklinize özel tasarlanmış porselen veneerler",
        "Parlak beyaz, kusursuz hizalanmış dişler",
        "Ultra ince veneerler — minimum diş törpüleme",
        "İngiltere fiyatlarına kıyasla %60-70 tasarruf",
        "Bünyemizdeki laboratuvar — daha hızlı, daha kaliteli",
        "Düzenli bakımla 15-20 yıl dayanıklılık",
        "VIP havalimanı transferi ve otel koordinasyonu dahil",
      ],
      forWhom: [
        "Beyazlatmaya yanıt vermeyen lekeli veya renklenmiş dişleri olanlar",
        "Aralıklı, kırık veya hafif düzensiz dişleri olanlar",
        "Tek kısa seyahatle tam gülüş dönüşümü isteyenler",
        "İngiltere, Almanya ve Avrupa\'dan uygun fiyatlı alternatif arayanlar",
        "Yurt içinde yüksek fiyat teklifi alanlar",
      ],
      process: [
        "WhatsApp\'tan gülüş fotoğrafınızı gönderin — 24 saat içinde ücretsiz değerlendirme",
        "Dijital gülüş tasarımı: tedaviye başlamadan önce sonucu önizleyin",
        "Ercan veya Larnaca havalimanından VIP transfer ile Girne\'ye varış",
        "1-2. Gün: renk seçimi, diş hazırlığı, geçici veneer takımı",
        "3-5. Gün: in-house laboratuvarımızda özel porselen veneer üretimi",
        "6-7. Gün: kalıcı yapıştırma, kapanış ayarı ve gülüş tanıtımı",
        "Yeni gülüşünüzle ülkenize dönün — WhatsApp sonrası bakım desteği dahil",
      ],
      results: [
        "Tamamen dönüştürülmüş, ünlü kalitesinde bir gülüş",
        "Doğal dişlerden ayırt edilemeyen veneerler",
        "Düzenli bakımla 15-20 yıl dayanıklılık",
        "Lekeye dayanıklı porselen — gülüşünüz yıllarca beyaz kalır",
        "Anında özgüven artışı — hastalar sürekli hayat değiştirici sonuçlar bildiriyor",
      ],
      faq: [
        { q: "Kıbrıs\'ta kaç gün kalmam gerekir?", a: "Çoğu Hollywood Smile tedavisi 5-7 günde tamamlanır. Rahat bir deneyim için 7 gecelik konaklama öneriyoruz." },
        { q: "Sonuç doğal mı görünecek?", a: "Dijital gülüş tasarımı ve ten renginize göre renk eşleştirme ile tamamen doğal görünen sonuçlar elde edilir. Arkadaşlarınız gülüşünüzü fark eder, veneerlerinizi değil." },
        { q: "İşlem ağrılı mı?", a: "Tüm hazırlık lokal anestezi altında yapılır. İlk 2-3 günde hafif hassasiyet normaldir ve yönetilebilir. Çoğu hasta sürecin ne kadar rahat olduğuna şaşırır." },
        { q: "İngiltere\'ye kıyasla ne kadar tasarruf ederim?", a: "İngiltere\'de tam Hollywood Smile genellikle £8.000-£15.000 arasındadır. Temelci Dental\'de uçak ve konaklama dahil bile ciddi tasarruf sağlarsınız." },
        { q: "Döndükten sonra bir sorun çıkarsa ne olur?", a: "Tüm veneer çalışmalarımız yazılı garanti kapsamındadır. Küçük düzeltmeler için bulunduğunuz ülkedeki diş hekimiyle koordinasyon sağlarız." },
      ],
    },
    [t.implantsSlug]: {
      titleKey: "dentalImplants",
      descKey: "dentalImplantsDesc",
      img: implantImg,
      benefits: [
        "Ömür boyu süren kalıcı diş çözümü",
        "Doğal diş gibi görünen, hissettiren ve işlev gören implant",
        "Titanyum kök çene kemiğini korur ve uyarır",
        "Komşu sağlıklı dişlere zarar vermez",
        "%98+ başarı oranı — modern diş hekimliğinin altın standardı",
        "Straumann implant kullanılır — implantolojinin dünya standardı",
        "İngiltere fiyatlarına kıyasla %50-65 tasarruf",
        "30+ yıllık uzmanlarımız binlerce implant uyguladı",
      ],
      forWhom: [
        "Bir veya daha fazla eksik dişi kalıcı olarak tamamlamak isteyenler",
        "Gevşek, ağrılı veya rahatsız protezlerden kurtulmak isteyenler",
        "Köprü yerine sağlıklı dişlerini koruyacak çözüm arayanlar",
        "Yeterli kemik yoğunluğuna sahip hastalar (veya kemik grefti adayları)",
        "İmplant maliyetini yurt dışında karşılaştıran İngiliz ve Avrupalı hastalar",
      ],
      process: [
        "X-ray\'ınızı WhatsApp\'tan gönderin — 24 saat içinde ücretsiz uygunluk değerlendirmesi",
        "Girne\'ye varış — tam 3D CBCT tarama ve tedavi planlaması",
        "Lokal anestezi altında implant yerleştirme — genellikle implant başına 45-60 dakika",
        "Çoğu vakada aynı gün geçici restorasyon takımı",
        "İyileşme süreci: osseointegrasyon (kemik kaynaşması) için 3-6 ay",
        "2. ziyaret: dayanak yerleştirme ve özel porselen kron takımı",
        "Son kontrol ve kapanış ayarı — implantınız tamamlandı",
      ],
      results: [
        "Ömür boyu süren tam işlevsel kalıcı diş",
        "Korunmuş çene kemiği ve yüz yapısı",
        "Tam özgüvenle yeme, konuşma ve gülme",
        "Çıkarma, yapıştırıcı veya normal fırçalamanın ötesinde bakım gerektirmez",
        "Tekrarlayan köprü veya protez onarımlarına kıyasla uzun vadeli tasarruf",
      ],
      faq: [
        { q: "İmplantı tek seyahatte tamamlayabilir miyim?", a: "İmplant vidası ilk ziyarette yerleştirilir. Tam tamamlanma (kron takımı) implant kemikle kaynaştıktan sonra 3-6 ay içinde 2. ziyarette gerçekleşir. Pek çok hastamız bunu tekrar tatil fırsatı olarak değerlendiriyor." },
        { q: "Ameliyat ağrılı mı?", a: "İşlem lokal anestezi altında yapılır ve iyi tolere edilir. Ameliyat sonrası rahatsızlık genellikle hafiftir ve 2-3 gün ağrı kesici ile yönetilir." },
        { q: "Hangi marka implant kullanıyorsunuz?", a: "Ağırlıklı olarak Straumann implant kullanıyoruz — en kapsamlı klinik kanıt tabanına sahip küresel kalite standardı. Vakaya göre diğer premium Avrupa sertifikalı sistemler de tercih edilir." },
        { q: "Kıbrıs ile İngiltere\'deki implant maliyeti arasındaki fark nedir?", a: "İngiltere\'de tek implant genellikle £2.000-£3.500 arasındadır. Temelci Dental\'de aynı Straumann implant ve kron, çok daha uygun fiyatla sunulur — uçak ve konaklama dahil bile net tasarruf sağlanır." },
        { q: "İmplant başarısız olursa ne olur?", a: "İmplant başarısızlığı %2\'nin altında nadir bir durumdur. Böyle bir durumda garanti süresi içinde implantı ücretsiz olarak yenileriz." },
      ],
    },
    [t.veneersSlug]: {
      titleKey: "veneers",
      descKey: "veneersDesc",
      img: veneersImg,
      benefits: [
        "Ultra ince porselen laminatlar — kontakt lens kadar ince",
        "Minimum diş törpüleme — doğal minenizin büyük kısmı korunur",
        "Leke, kırık, aralık ve hafif düzensizlikleri tek tedavide kapatır",
        "Yüksek lekeye dayanıklılık — dişleriniz yıllarca parlak kalır",
        "Mükemmel doğal görünüm için özel renk eşleştirme",
        "Tek 5-7 günlük seyahatte tamamlanır",
        "In-house laboratuvar üretimi — hassas uyum ve hızlı teslimat",
        "İngiltere ve Almanya veneer fiyatlarına kıyasla %60+ tasarruf",
      ],
      forWhom: [
        "Beyazlatmaya yanıt vermeyen inatçı lekeleri olanlar",
        "Ön dişlerinde küçük kırık, çatlak veya aşınma olanlar",
        "Küçük aralık veya hafif düzensizlik bulunanlar",
        "Tam dönüşüm yerine belirli dişlerde hedefli iyileştirme isteyenler",
        "Uzun ömürlü sonuçlarla koruyucu kozmetik çözüm arayanlar",
      ],
      process: [
        "WhatsApp\'tan gülüş fotoğrafı gönderin — 24 saat içinde ücretsiz konsültasyon",
        "Girne\'ye varış — renk konsültasyonu ve dijital gülüş önizlemesi",
        "Lokal anestezi altında minimum diş hazırlığı",
        "Hassas ölçü alımı — geçici veneerler hemen takılır",
        "In-house laboratuvarda özel porselen veneer üretimi (2-3 gün)",
        "Son yapıştırma: uyum, renk ve kapanış kontrolü",
        "Cila ve son ayarlar — yeni gülüşünüz tamamlandı",
      ],
      results: [
        "Belirgin şekilde iyileştirilmiş gülüş — daha parlak, düzenli ve genç görünüm",
        "10-15 yıl ömür, normal bakımla",
        "Tamamen lekeye dayanıklı porselen yüzey",
        "Gerçek mine dokusunu taklit eden doğal ışık geçirgenliği",
        "Sonuçlar anlık — Kıbrıs\'tan yeni gülüşünüzle dönersiniz",
      ],
      faq: [
        { q: "Veneer ile Hollywood Smile arasındaki fark nedir?", a: "Hollywood Smile, görünür tüm dişleri kapsayan tam bir veneer setidir. Bireysel veneerler ise yalnızca ihtiyaç duyulan dişlere uygulanır. Uzmanımız konsültasyonda en uygun yaklaşımı önerir." },
        { q: "Veneerler doğal dişlerime zarar verir mi?", a: "Düzgün oturma için çok az mine (genellikle 0.3-0.5 mm) törpülenir. Bu minimal ve geri alınamaz olmakla birlikte, doğal diş yapısının büyük bölümü korunur." },
        { q: "Rengi seçebilir miyim?", a: "Kesinlikle. Vita renk sistemi ve dijital önizleme araçlarıyla, herhangi bir işlem başlamadan önce nihai rengi görüp onaylarsınız." },
        { q: "Veneerlere nasıl bakılır?", a: "Normal fırçalama ve diş ipi kullanımı yeterlidir. Sert nesneleri (buz, sert şeker) doğrudan ısırmaktan kaçının. Diş gıcırdatıyorsanız gece plağı kullanın. Bu önlemlerle veneerleriniz on yılı aşkın süre dayanır." },
      ],
    },
    [t.crownsSlug]: {
      titleKey: "crowns",
      descKey: "crownsDesc",
      img: crownsImg,
      benefits: [
        "360° tam diş kapsama — hasar görmüş dişi korur ve güçlendirir",
        "Çatlamış, büyük dolgulu veya kanal tedavisi görmüş dişleri restore eder",
        "Doğal diş renginizle eşleştirilen porselen — neredeyse görünmez",
        "Dayanıklı ve uzun ömürlü — düzenli bakımla 10-15 yıl",
        "Tam çiğneme işlevi ve kapanış konforu sağlar",
        "In-house laboratuvar: daha hızlı teslimat ve hassas renk eşleştirme",
        "İngiltere ve AB fiyatlarına kıyasla %50-65 tasarruf",
        "Aynı gün geçici kron — diş hiçbir zaman açık kalmaz",
      ],
      forWhom: [
        "Dolgu yapılamayacak kadar hasar görmüş veya kırık dişleri olanlar",
        "Kanal tedavisi geçirmiş hastalar (kron tedavi edilen dişi korur)",
        "Çatlamış veya dişi zayıflatan büyük eski dolguları olanlar",
        "Diş şeklini, işlevini veya görünümünü restore etmesi gerekenler",
        "Yurt içinde pahalı kron teklifi alanlar",
      ],
      process: [
        "Klinik muayene ve dijital röntgen — dişin tam değerlendirmesi",
        "Lokal anestezi altında diş hazırlığı: kron yerleşimi için şekillendirilir",
        "Hassas ölçü alımı — aynı gün geçici kron takılır",
        "In-house laboratuvar özel porselen kron üretir (2-3 iş günü)",
        "Kron denemesi: renk, uyum ve kapanış kontrol ve ayarlanır",
        "Kalıcı yapıştırma — kron güvenli şekilde sabitlenir",
        "Son cila ve kapanış hizalaması — restore edilmiş dişiniz tamamlandı",
      ],
      results: [
        "Doğal görünen ve işlev gören tam restore edilmiş diş",
        "Daha fazla çatlama veya çürümeye karşı tam koruma",
        "Rahat, dengeli kapanış yeniden sağlandı",
        "İyi ağız hijyeniyle 10-15 yıl veya daha fazla ömür",
        "Zarar görmüş dişten kaynaklanan hassasiyet veya ağrı ortadan kalkar",
      ],
      faq: [
        { q: "Hasar görmüş diş için dolgu mu kron mu daha iyi?", a: "Büyük hasar, geniş dolgu veya kanal tedavisi görmüş dişler için kron üstün koruma sağlar. Dolgu yalnızca kaybedilen diş dokusunun yerini alır; kron tüm dişi sarar ve kırığı önler." },
        { q: "Kron diğer dişlerimle uyumlu görünür mü?", a: "Evet. Vita renk rehberi ve doğal ışık değerlendirmesiyle kronunuzu komşu dişlere hassas şekilde eşleştiriyoruz. In-house laboratuvarımız, işi dışarıya veren kliniklere kıyasla daha yüksek renk doğruluğu sağlar." },
        { q: "Kron hazırlığı ağrılı mı?", a: "Diş hazırlığı lokal anestezi altında yapılır. Geçici kron hemen takılır. Anestezi geçtikten sonra oluşabilecek hassasiyet genellikle hafif ve kısa sürelidir." },
        { q: "Tek seyahatte kron yaptırabilir miyim?", a: "Evet. In-house dental laboratuvarımız sayesinde çoğu kron 5-7 gün içinde tamamlanır — tek seyahate sığar." },
      ],
    },
    [t.zirconiaCrownsSlug]: {
      titleKey: "zirconiaCrowns",
      descKey: "zirconiaCrownsDesc",
      img: zirconiaCrownsImg,
      benefits: [
        "Mevcut en güçlü kron malzemesi — arka dişler için ideal",
        "Olağanüstü estetik — doğal mine gibi ışık geçirenlik",
        "Tamamen metal içermez — diş eti sınırında siyah çizgi asla oluşmaz",
        "Biyouyumlu — metal hassasiyeti veya alerjisi olanlara güvenli",
        "CAD/CAM hassas freze ile mükemmel uyum",
        "Kırılma ve çatlamaya karşı yüksek direnç",
        "İngiltere veya Almanya zirkonyum kron fiyatlarına kıyasla %55-65 tasarruf",
        "In-house laboratuvarda üretim — renk tutarlılığı ve hızlı teslimat",
      ],
      forWhom: [
        "En kaliteli kron malzemesini isteyenler",
        "Metal alaşımlı kronlarda diş eti sınırında siyah çizgi yaşayanlar",
        "Metal alerjisi veya hassasiyeti olanlar",
        "Maksimum güç gerektiren arka dişlere kron yaptırmak isteyenler",
        "Kusursuz estetik bütünlük arayan hastalar",
      ],
      process: [
        "Konsültasyon ve renk değerlendirmesi — dijital araçlarla hassas renk eşleştirme",
        "Lokal anestezi altında diş hazırlığı — zirkonyum yerleşimi için hassas şekillendirme",
        "Ağız içi dijital tarama — geleneksel ölçü gerekmez",
        "CAD/CAM tasarım: kronunuz dijital olarak mükemmel anatomiye göre mühendislenir",
        "Katı zirkonyum bloktan CNC hassas freze",
        "Renklendirme, sırlama ve pişirme — laboratuvarda son estetik rötuş",
        "Deneme, kapanış kontrolü ve kalıcı yapıştırma — 5-7 günde tamamlanır",
      ],
      results: [
        "Doğal diş minosinden daha güçlü kron — 15-20 yıl dayanıklılık",
        "Komşu dişlerle mükemmel renk uyumu — yapay beyazlık veya siyah çizgi yok",
        "Sıfır metal bileşen — daha güvenli, daha temiz, daha biyouyumlu",
        "Doğal çiğneme hissiyle rahat kapanış",
        "Güç ve estetik arasında sıfır ödün gerektiren premium restorasyon",
      ],
      faq: [
        { q: "Zirkonyum neden metal destekli porselen krondan üstün?", a: "Metal destekli porselen (PFM) kronların metal altyapısı zamanla diş eti sınırında siyah çizgi olarak görünebilir. Zirkonyum tamamen metal içermez, üstün estetik sunar ve PFM\'den daha güçlüdür. Artık dental restorasyonların altın standardıdır." },
        { q: "Zirkonyum ön dişler için uygun mu?", a: "Evet. Modern yüksek şeffaflıklı zirkonyum, gerçek minenin ışık geçirgenliğini taklit eder ve estetiğin kritik olduğu ön dişler için idealdir." },
        { q: "Zirkonyum kronlar ne kadar dayanır?", a: "Düzenli ağız bakımı ve kontroller ile zirkonyum kronlar genellikle 15-20 yıl dayanır. Kırılma direnci porselen alternatiflere göre önemli ölçüde yüksektir." },
        { q: "Tek seyahatte zirkonyum kron yaptırabilir miyim?", a: "Evet. In-house CAD/CAM laboratuvarımız çoğu vakada zirkonyum kronları tek 5-7 günlük ziyarette tamamlamamızı sağlar." },
      ],
    },
    [t.teethWhiteningSlug]: {
      titleKey: "teethWhitening",
      descKey: "teethWhiteningDesc",
      img: teethWhiteningImg,
      benefits: [
        "Tek seansta 8 tona kadar beyazlama",
        "Profesyonel jel — eczane ürünlerinden çok daha etkili",
        "LED ışık aktivasyonu ile hızlandırılmış, eşit sonuç",
        "İşlem öncesi diş eti koruyucu uygulanır",
        "Anında görünür sonuç — kliniği parlak gülüşle terk edersiniz",
        "İsteğe bağlı eve götürme tepsisi ile bakım kolaylaştırılır",
        "Genellikle veneer veya Hollywood Smile ile kombine edilir",
        "İngiltere beyazlatma kliniği fiyatlarının çok altında",
      ],
      forWhom: [
        "Kahve, çay, kırmızı şarap veya sigaradan kaynaklanan sararmış dişleri olanlar",
        "Düğün, özel etkinlik veya önemli bir olay öncesinde hızlı iyileştirme isteyenler",
        "Kapsamlı tedavi olmadan hızlı ve görünür sonuç isteyenler",
        "Başka bir işlemle birlikte beyazlatma yaptırmak isteyen dental turistler",
        "Eczane ürünleriyle hayal kırıklığı yaşayanlar",
      ],
      process: [
        "Uygunluk ön değerlendirmesi — beyazlatma her duruma uygun değildir",
        "Eşit beyazlatma için yüzey birikintilerini gidermek amacıyla diş temizliği",
        "Yumuşak dokuyu korumak için özel diş eti kalkanı uygulaması",
        "Diş yüzeylerine profesyonel beyazlatma jeli uygulaması",
        "LED ışık aktivasyonu — 3 tur, her biri 15-20 dakika",
        "Jel temizleme ve başlangıç rengiyle karşılaştırmalı final değerlendirmesi",
        "İstenirse eve götürme tepsisi ve bakım jeli teslimi",
      ],
      results: [
        "Tek randevuda 8 tona kadar beyazlayan dişler",
        "Fotoğraflarda ve yüz yüze görünür belirgin gülüş parlaklığı",
        "Yaşam tarzına bağlı olarak 6-12 ay süre",
        "Görsel fark yaratan hızlı ve uygun maliyetli iyileştirme",
        "Veneer, kron veya herhangi bir kozmetik diş işleminin ideal tamamlayıcısı",
      ],
      faq: [
        { q: "Profesyonel beyazlatma güvenli mi?", a: "Evet. Klinik beyazlatma, eğitimli diş hekimleri tarafından uygun diş eti korumasıyla uygulanan düzenlenmiş peroksit konsantrasyonları kullanır. Denetim dışı ev kitlerinden çok daha güvenli ve etkilidir." },
        { q: "Beyazlatma kron veya veneerlere işe yarar mı?", a: "Hayır. Beyazlatma yalnızca doğal diş minesi üzerinde etkilidir. Görünür kron veya veneeriniz varsa, yeni gölgeyle eşleştirme yapabilmek için restorasyon öncesinde beyazlatma yapılmasını öneririz." },
        { q: "Sonuçlar ne kadar sürer?", a: "Genellikle 6-12 ay. Yoğun leke yapan yiyecek ve içeceklerden kaçınmak ve ağız hijyenini korumak sonuçları uzatır. Eve götürme tepsisi ile periyodik rötuş yapılabilir." },
        { q: "Ağrılı mı?", a: "Bazı hastalar işlem sırasında veya sonrasında hafif hassasiyet yaşar. Bu normal ve geçicidir, 24-48 saat içinde geçer. Rahatsızlığı en aza indirmek için duyarsızlaştırıcı jel uyguluyoruz." },
      ],
    },
    [t.smileMakeoverSlug]: {
      titleKey: "smileMakeover",
      descKey: "smileMakeoverDesc",
      img: smileMakeoverImg,
      benefits: [
        "Birden fazla sorun tek koordineli tedavi planıyla çözülür",
        "Dijital gülüş tasarımı — tedaviye başlamadan önce sonucu görün",
        "Tamamen kişiselleştirilmiş: hiçbir gülüş tasarımı birbirine benzemez",
        "Veneer, kron, beyazlatma ve implantı gerektiği gibi birleştirir",
        "In-house laboratuvar tüm restorasyonlarda tutarlılık sağlar",
        "Çarpıcı dönüşüm tek 7-10 günlük seyahatte mümkün",
        "İngiltere veya AB maliyetlerine kıyasla %55-70 tasarruf",
        "Bütünsel yaklaşım: işlev, sağlık ve estetik birlikte ele alınır",
      ],
      forWhom: [
        "Birden fazla kozmetik ve işlevsel sorunu aynı anda çözmek isteyenler",
        "Yurt içi yüksek maliyetler nedeniyle gülüş dönüşümünü erteleyenler",
        "Doğu Akdeniz\'de tatil ile diş tedavisini birleştirmek isteyenler",
        "Artık eskimiş veya tutarsız görünen önceki diş çalışmaları olanlar",
        "Yıllar içinde parça parça tedavi yerine tek bir uyumlu sonuç isteyenler",
      ],
      process: [
        "WhatsApp\'tan gülüş fotoğraflarınızı ve endişelerinizi gönderin — ücretsiz ilk değerlendirme",
        "Varış konsültasyonu: tam muayene, 3D tarama ve ayrıntılı hedef görüşmesi",
        "Dijital gülüş tasarımı: önerilen sonucun görsel önizlemesi",
        "Zaman çizelgesi, aşamalar ve net fiyatlandırmayla tedavi planı sunumu",
        "1. Aşama: temel çalışmalar — gerekli çekimler, implantlar veya diş eti tedavisi",
        "2. Aşama: restorasyonlar — tasarıma göre veneer, kron, beyazlatma",
        "Final tanıtımı: ayarlamalar, cila ve sonucun profesyonel fotoğraflaması",
      ],
      results: [
        "Tamamen dönüştürülmüş gülüş — tutarlı, uyumlu ve doğal görünümlü",
        "İyileştirilmiş yüz oranları — özelliklerinizi tamamlayan gülüş tasarımı",
        "Restore edilmiş işlev: rahat kapanış, kolay çiğneme, net konuşma",
        "Bakımla uzun ömürlü sonuçlar — çoğu restorasyon 10-20 yıl dayanır",
        "Hastaların sürekli aldıkları en iyi kararlardan biri olarak nitelendirdiği hayat değiştirici sonuç",
      ],
      faq: [
        { q: "Gülüş tasarımına hangi tedaviler dahil olabilir?", a: "Gülüş tasarımı tamamen size özeldir. Diş beyazlatma, porselen veneer, zirkonyum kron, diş implantı, diş eti şekillendirme veya bunların kombinasyonu içerebilir. Uzmanımız yalnızca hedefinize ulaşmak için gerçekten gerekli olanları önerir." },
        { q: "Gülüş tasarımı tek seyahatte tamamlanabilir mi?", a: "Çoğu hasta için estetik kısım 7-10 günde tamamlanır. Plana implant dahilse, final kron takımı için 3-6 ay sonra 2. ziyaret gerekir." },
        { q: "Nasıl görüneceğimi önceden bilebilir miyim?", a: "Dijital gülüş tasarımı yazılımıyla tedaviye başlamadan önce gerçekçi bir önizleme hazırlıyoruz. Diş şekli, boyutu ve rengi siz onayladıktan sonra işleme geçiyoruz." },
        { q: "Kıbrıs ile İngiltere\'deki gülüş tasarımı maliyeti ne kadar farklı?", a: "İngiltere\'de kapsamlı gülüş tasarımı £10.000-£25.000 veya daha fazla tutabilir. Temelci Dental hastalarımız, seyahat ve konaklama dahil bile İngiltere\'deki maliyetin çok altında aynı klinik sonucu elde ediyor." },
      ],
    },
    [t.fullMouthRestorationSlug]: {
      titleKey: "fullMouthRestoration",
      descKey: "fullMouthRestorationDesc",
      img: fullMouthImg,
      benefits: [
        "Tüm dişlerin estetik ve işlevsel olarak eksiksiz rehabilitasyonu",
        "Onlarca yıllık hasar, aşınma, çürük veya diş kaybı tek koordineli planla çözülür",
        "Çok uzmanla ekip: implantoloji, protez ve estetik diş hekimliği",
        "Hassas cerrahi ve protetik planlama için 3D CBCT tarama",
        "Tüm dişlerde uyumlu restorasyonlar için in-house dental laboratuvar",
        "İngiltere veya Almanya tam ağız restorasyonu maliyetlerine kıyasla %55-70 tasarruf",
        "Kıbrıs\'ta geçirilen süreyi minimumda tutmak için aşamalı planlama",
        "Tüm çalışmalarda kapsamlı sonrası bakım planı ve yazılı garanti",
      ],
      forWhom: [
        "Yıllarca diş bakımını ihmal edip kapsamlı rehabilitasyona ihtiyaç duyanlar",
        "Gıcırdatma (bruksizm) veya asit erozyonundan kaynaklanan ciddi diş aşınması yaşayanlar",
        "Birden fazla eksik dişi veya başarısız restorasyonları olanlar",
        "Yurt içinde kapsamlı tedavi için çok yüksek fiyat teklifi alanlar",
        "Planlı bir süreçte tüm diş sağlığını sıfırdan yenilemek isteyenler",
      ],
      process: [
        "Kapsamlı ilk konsültasyon: fotoğraflar, röntgenler ve tam 3D CBCT tarama",
        "Aşamalı zaman çizelgesi ve sabit fiyatlandırmayla ayrıntılı tedavi planı sunumu",
        "1. Aşama: gerekli çekimler, kemik grefti ve implant yerleştirme",
        "İyileşme aşaması: osseointegrasyon süresince geçici restorasyon kullanımı",
        "2. Aşama: tüm kalıcı kronlar, köprüler ve veneerler yapılır ve takılır",
        "Oklüzal (kapanış) dengeleme ve tam ark ayarı",
        "Final kontrolü, profesyonel temizlik ve uzun vadeli bakım planı sunumu",
      ],
      results: [
        "Kapsamlı hasardan eksiksiz sağlığa: tam restore edilmiş, işlevsel ve güzel dentisyon",
        "Stabil kapanış, rahat çiğneme ve özgüvenli konuşma yeniden kazanılır",
        "Tüm görünür dişlerde tutarlı, doğal görünümlü estetik",
        "Uzun vadeli ağız sağlığı — düzgün restore edilmiş dişler daha kolay bakım gerektirir",
        "Hastaların sürekli dönüştürücü olarak nitelendirdiği yaşam kalitesinde derin iyileşme",
      ],
      faq: [
        { q: "Tam ağız restorasyonu ne kadar sürer?", a: "Süre karmaşıklığa bağlıdır. İmplant içeren vakalarda süreç, 4-8 ay içinde 2 ziyareti kapsar (implant yerleştirme, ardından kron takımı). Yalnızca restorasyon gerektiren vakalarda tedavi 10-14 günde tamamlanabilir." },
        { q: "Tam ağız restorasyonu ne kadar tutar?", a: "İngiltere veya Almanya\'da tam ağız restorasyonu tedavi kapsamına göre £20.000-£50.000 veya daha fazla tutabilir. Hastalarımız Kuzey Kıbrıs\'ta eşdeğer klinik sonucu bunun çok altında bir maliyetle elde ediyor." },
        { q: "Tedavi süresince dişsiz kalır mıyım?", a: "Hayır. Her zaman geçici restorasyon sağlıyoruz; süreç boyunca — ziyaretler arasında bile — asla işlevsel ve sunulabilir dişsiz kalmıyorsunuz." },
        { q: "Tam ağız restorasyonu yaşlı hastalar için uygun mu?", a: "Evet. Tam ağız restorasyonu hastalarımızın pek çoğu 60 yaş üzerindedir. Yaş bir engel değildir. Genel sağlık değerlendirilerek tedavinin uygun ve iyi tolere edildiğinden emin olmak için muhafazakâr ve dikkatli bir yaklaşım benimsiyoruz." },
      ],
    },
    [t.rootCanalSlug]: {
      titleKey: 'rootCanal', descKey: 'rootCanalDesc', img: implantImg,
      benefits: [
        "Doğal dişinizi kurtarır — çekim gerekmez",
        "Modern rotary enstrümantasyon: daha hızlı, daha hassas ve daha konforlu",
        "Lokal anestezi altında uygulanır — işlem sırasında ağrı hissedilmez",
        "Ekibimizde 42+ yıllık endodonti uzmanlığı",
        "Dijital röntgen ve 3D CBCT ile hassas kanal haritalama",
        "Çoğu vakada aynı gün tedavi — uzun bekleme listeleri yok",
        "Eşdeğer İngiltere veya Avrupa diş hekimi ücretlerine kıyasla önemli tasarruf",
        "Gerektiğinde kron takımı genel tedavi planına dahil edilir",
      ],
      forWhom: [
        "Şiddetli diş ağrısı, uzun süreli sıcak-soğuk hassasiyeti veya spontan ağrısı olan hastalar",
        "Kararan dişi veya kök çevresinde görünür şişliği olanlar",
        "Kanal tedavisine ihtiyaç duyduğu söylenen ancak maliyet etkin seçenek arayanlar",
        "Çatlamış diş veya pulpa'ya ulaşan derin çürüğü olan hastalar",
        "Daha önce yapılan kanal tedavisi başarısız olmuş ve revizyon gerektirenler",
      ],
      process: [
        "Enfeksiyonu ve kanal anatomisini değerlendirmek için dijital röntgen ve klinik muayene",
        "Lokal anestezi uygulanır — tedaviye başlamadan önce bölge tamamen uyuşturulur",
        "Enfekte pulpa dokusu modern rotary endodontik aletlerle uzaklaştırılır",
        "Kanallar temizlenir, şekillendirilir ve antibakteriyel irrigasyonla dezenfekte edilir",
        "Kanallar biyouyumlu guta-perka dolgu maddesiyle kapatılır",
        "Dişi korumak için geçici veya kalıcı restorasyon yerleştirilir",
        "Yapısal destek gerektiğinde tedavi edilen dişe kron uygulanır",
      ],
      results: [
        "Enfeksiyon ve ağrının tamamen ortadan kaldırılması",
        "Yıllarca, çoğunlukla ömür boyu korunan doğal diş",
        "Normal çiğneme işlevi ve konforun tam olarak yeniden kazanılması",
        "Komşu dişlerin ve çene kemiğinin yayılan enfeksiyondan korunması",
        "Çekim ve implant yedekleme yerine önemli maliyet avantajı",
      ],
      faq: [
        { q: "Kanal tedavisi ağrılı mı?", a: "Modern lokal anestezi ve rotary enstrümantasyon ile işlemin kendisi rutin bir dolgudan daha rahatsız edici değildir. Çoğu hasta ne kadar yönetilebilir olduğuna şaşırır. İşlem sonrası hassasiyet genellikle 2-3 günde geçer." },
        { q: "Kaç randevu gerekiyor?", a: "Kanal tedavilerinin çoğu bir veya iki randevuda tamamlanır. Karmaşık çok kanallı dişler veya önemli enfeksiyonlu vakalar ilave bir ziyaret gerektirebilir." },
        { q: "Kanal tedavisi görmüş bir diş ömür boyu dayanabilir mi?", a: "Evet. Düzgün tedavi edilmiş ve restore edilmiş bir kanal dişi doğal diş kadar uzun süre dayanabilir. Anahtar, dişi kırılmadan korumak için uygun bir kron takmaktır." },
      ]
    },
    [t.compositeFillingSlug]: {
      titleKey: 'compositeFilling', descKey: 'compositeFillingDesc', img: hollywoodSmileImg,
      benefits: [
        "Diş renkli malzeme — yerleştirildikten sonra tamamen görünmez",
        "Dişe doğrudan bağlanır — amalgamdan daha az frez gerektirir",
        "Çoğu vakada tek seansta tamamlanır",
        "Tam çiğneme gücü ve işlevini yeniden kazandırır",
        "Cıva içermez ve biyouyumludur — tüm hastalar için güvenli",
        "Küçük boşlukları kapatmak ve dişleri yeniden şekillendirmek için kullanılabilir",
        "Doğru bakımla 7-10 yıl dayanıklı sonuçlar",
        "Uygun fiyatlandırma — Avrupa diş hekimi ücretlerine göre önemli tasarruf",
      ],
      forWhom: [
        "Doğal görünümlü, dayanıklı restorasyon gerektiren çürüklü dişleri olan hastalar",
        "Eski amalgam (gümüş) dolguları diş rengi olanlarla değiştirmek isteyenler",
        "Küçük kırık, çatlak veya aşınmış diş kenarları olanlar",
        "Aynı gün, ağrısız diş restorasyonu arayanlar",
        "Çocuklar ve yetişkinler — kompozit dolgular her yaşa uygundur",
      ],
      process: [
        "Çürük veya hasarın boyutunu tespit etmek için muayene ve röntgen",
        "Gerekirse lokal anestezi uygulanır — tedaviye başlamadan önce bölge uyuşturulur",
        "Çürük uzaklaştırılır ve diş yüzeyi hazırlanıp pürüzlendirilir",
        "Kompozit reçine katmanlar halinde uygulanır ve diş şekline göre şekillendirilir",
        "Her katman özel bir ışıkla sertleştirilir",
        "Son polisaj ve doğal konfor için ısırma kontrolü yapılır",
      ],
      results: [
        "Komşu dişlerden ayırt edilemeyen doğal görünümlü diş",
        "Çiğneme işlevi ve konforun tam olarak yeniden kazanılması",
        "Çürük durdurulur — daha fazla yayılma olmaz",
        "Gelecekteki lekelere direnen pürüzsüz, cilalanmış yüzey",
        "Rutin fırçalama ve kontrol randevularıyla uzun ömürlü sonuçlar",
      ],
      faq: [
        { q: "Kompozit dolgu ne kadar sürer?", a: "Kompozit dolgular genellikle dolgunun boyutuna ve konumuna bağlı olarak 7-10 yıl, bazen daha uzun sürer." },
        { q: "Kompozit mi yoksa amalgam mı daha iyi?", a: "Kompozit dolgular artık çoğu hasta için tercih edilen seçenektir. Diş renkleri, cıva içermezler, daha az freze gerektirirler ve dişe doğrudan bağlanırlar." },
        { q: "Enjeksiyon gerekecek mi?", a: "Çürük uzaklaştırmayı içeren dolgularda tam konfor sağlamak için lokal anestezi kullanılır. Çok küçük, yüzeysel dolgular enjeksiyon gerektirmeyebilir." },
      ]
    },
    [t.allOn4Slug]: {
      titleKey: 'allOn4', descKey: 'allOn4Desc', img: fullMouthImg,
      benefits: [
        "Sadece 4 veya 6 implantla tam bir diş sırası — hareketli protez yok",
        "Günler içinde takılan kalıcı, çıkarılamaz köprü",
        "Çene kemiğini ve yüz yapısını korur — protez kullananların çökmüş görünümünü önler",
        "Stratejik açılı implantlar mevcut kemiği maksimize eder — çoğunlukla greft gerekmez",
        "Straumann implantlar kullanılır — uzun vadeli başarının küresel standardı",
        "Tam ekip yaklaşımı: ağız cerrahı, protetik uzmanı ve seramik teknisyeni bünyemizde",
        "İngiltere veya Almanya'daki All-on-4 maliyetlerine kıyasla %60-70 tasarruf",
        "İlk günden itibaren güvenle yiyin, konuşun ve gülümseyin",
      ],
      forWhom: [
        "Bir veya her iki çenede tüm veya çoğu dişini kaybetmiş hastalar",
        "Çekimi ve tam restorasyonu gereken başarısız dişleri olanlar",
        "Kalıcı, çıkarılamaz bir alternatif isteyen protez kullananlar",
        "Geleneksel implantlar için yetersiz kemikleri olduğu söylenenler",
        "Yurt içi fiyatların çok altında en yüksek kaliteli tam ark çözümü arayanlar",
      ],
      process: [
        "Tam 3D CBCT tarama ve dijital tedavi planlaması — kemik hacmi ve implant pozisyonu hassas biçimde haritalanır",
        "Cerrahi ve protetik ekibimizle tedavi planını onaylamak için konsültasyon",
        "Cerrahi günü: gerekirse çekimler, sedasyonlu veya lokal anestezi altında implant yerleştirme",
        "Aynı gün geçici sabit köprü takılır — dişlerle ayrılırsınız",
        "İyileşme süreci: osseointegrasyon için 3-6 ay",
        "Geri dönüş ziyareti: bünyemizden çıkan zirkonyum veya seramik köprü takılır",
        "Isırma ayarı, cila ve uzun vadeli bakım planı verilir",
      ],
      results: [
        "Kalıcı olarak yerinde duran, doğal görünümlü tam diş seti",
        "Sert ve çıtırdayan gıdalar dahil tüm yiyecekleri yeme kapasitesinin yeniden kazanılması",
        "Korunan çene kemiği yoğunluğu ve doğal yüz profili",
        "Protez yapıştırıcılarından, gevşek plaklardan ve sosyal kaygılardan kurtulma",
        "Uzun vadeli yatırım — All-on-4 implantlar düzgün bakımla ömür boyu sürebilir",
      ],
      faq: [
        { q: "Kıbrıs'ta kaç gün kalmam gerekiyor?", a: "Cerrahi yerleştirme ve geçici köprü takımı 3-5 gün sürer. Ardından kalıcı köprünüz için 3-6 ay sonra dönersiniz; bu da 3-5 gün sürer. Pek çok hasta her iki ziyareti kısa tatil olarak değerlendirir." },
        { q: "All-on-4 ağrılı mı?", a: "Ameliyat lokal anestezi altında, gerektiğinde sedasyon da uygulanarak gerçekleştirilir. İşlem sonrası rahatsızlık genellikle ilk 2-3 gün standart ağrı kesicilerle yönetilebilir." },
        { q: "All-on-4 ve All-on-6 arasındaki fark nedir?", a: "All-on-6, ek stabilite için 6 implant kullanır ve kemik hacmi yeterli olduğunda tercih edilir. Cerrahımız CBCT taramanızı inceledikten sonra doğru seçeneği önerecektir." },
      ]
    },
    [t.clearAlignersSlug]: {
      titleKey: 'clearAligners', descKey: 'clearAlignersDesc', img: veneersImg,
      benefits: [
        "Neredeyse görünmez — çoğu kişi taktığınızı fark etmez",
        "Çıkarılabilir: normalde yiyin, için ve dişlerinizi fırçalayın",
        "Metal braket, tel veya diş eti/yanak tahrişi yok",
        "Hassas diş ölçümlerinize göre özel üretilir",
        "Dijital tedavi önizlemesi — başlamadan önce projeksiyonunuzu görün",
        "Geleneksel braketlere kıyasla daha az klinik randevu",
        "Hafif ila orta şiddetteki kalabalık, boşluk ve ısırma sorunlarına uygun",
        "Tedavi boyunca konforlu ve düşük bakımlı",
      ],
      forWhom: [
        "Hafif ila orta şiddetteki kalabalıklık veya aralığı olan yetişkinler ve gençler",
        "Metal braket olmadan gizli ortodontik tedavi isteyenler",
        "Önceki ortodontik tedavinin ardından küçük nüks yaşayanlar",
        "Geleneksel braketlerin görünümünden çekinen herkes",
        "İyi uyumu olan hastalar — plakların günde 20-22 saat takılması gerekir",
      ],
      process: [
        "Uygunluğu değerlendirmek için klinik muayene ve dijital diş taraması",
        "3D tedavi simülasyonu üretilir — beklenen sonucunuzu onaylarsınız",
        "Özel plak serisi üretilir ve teslim edilir",
        "Plaklar her 1-2 haftada bir değiştirilir; her biri dişleri kademeli olarak hareket ettirir",
        "Tedavi boyunca belirli aralıklarla kontrol randevuları",
        "Gerekirse küçük ayarlamalar için iyileştirme plakları verilir",
        "Tedavi sonunda sonucu korumak için retainer takılır",
      ],
      results: [
        "Sabit braketlerin rahatsızlığı olmadan daha düz, daha iyi hizalanmış dişler",
        "Gelişmiş ısırma ve daha kolay uzun vadeli ağız hijyeni",
        "Gizlice elde edilen doğal görünümlü gülüş",
        "Tutarlı retainer kullanımıyla korunan sonuçlar",
        "Özgüven artışı — pek çok hasta haftalarca değişimi fark eder",
      ],
      faq: [
        { q: "Şeffaf plak tedavisi ne kadar sürer?", a: "Tedavi süresi küçük düzeltmeler için 3 aydan karmaşık vakalar için 18 aya kadar uzanır. Klinisyeniniz taramanızı değerlendirdikten sonra doğru tahmin verecektir." },
        { q: "Şeffaf plaklarla normal beslene bilir miyim?", a: "Evet. Sabit braketlerin aksine, plaklar yemek yerken çıkarılır. Bu, herhangi bir diyet kısıtlaması olmadığı anlamına gelir." },
        { q: "Şeffaf plaklar braket kadar etkili mi?", a: "Hafif ila orta şiddetteki vakalar için şeffaf plaklar mükemmel sonuçlar verir. Karmaşık ısırma düzeltmeleri veya ciddi kalabalıklık için geleneksel sabit braketler veya kombinasyon yaklaşımı daha uygun olabilir." },
      ]
    },
    [t.dentalBondingSlug]: {
      titleKey: 'dentalBonding', descKey: 'dentalBondingDesc', img: hollywoodSmileImg,
      benefits: [
        "Tek randevuda tamamlanır — laboratuvar işlemi gerekmez",
        "Çoğu vakada sağlıklı diş dokusunun frezlenmesi veya çıkarılması yok",
        "Doğal tonunuza hassas biçimde eşleştirilen diş rengi kompozit",
        "Kırık, çatlak, boşluk ve yüzey renkleşmelerini onarır",
        "Geri alınabilir ve ayarlanabilir — gerekirse kaldırılabilir veya değiştirilebilir",
        "Küçük estetik endişeler için veneerlere kıyasla maliyet etkin alternatif",
        "Anlık sonuç — bir kusurla girersiniz, onarılmış bir gülüşle çıkarsınız",
        "Çoğu vakada anestezi gerekmez",
      ],
      forWhom: [
        "Kırık veya çatlak ön dişi olan hastalar",
        "Ortodontik tedaviyi haklı kılmayan küçük diastemaları (boşlukları) olanlar",
        "Beyazlatmanın çözmediği küçük renk değişikliği yaşayanlar",
        "Hızlı, uygun fiyatlı estetik iyileştirme arayanlar",
        "Kalıcı veneer için henüz hazır olmayan ancak şimdi iyileştirme isteyenler",
      ],
      process: [
        "Renk seçimi: kompozit rengi komşu dişlerinize eşleştirilir",
        "Diş yüzeyi hafifçe pürüzlendirilerek bağlanma yüzeyi oluşturulur",
        "Kompozit reçine uygulanır ve elle dikkatlice şekillendirilir",
        "Reçine sertleştirme ışığıyla sertleştirilir",
        "Şekil iyileştirilir, ayarlanır ve doğal bir son kat ile cilalanır",
        "Eşit temas sağlamak için ısırma kontrolü yapılır",
      ],
      results: [
        "Bir saatten kısa sürede onarılmış, doğal görünümlü diş",
        "Komşu dişlerle renk ve doku açısından kusursuz uyum",
        "Özgürce gülme özgüveni yeniden kazanılır",
        "Normal bakımla 5-7 yıl süren sonuçlar",
        "İsterlerse veneere geçiş yapılabilecek geri alınabilir seçenek",
      ],
      faq: [
        { q: "Dental bonding ne kadar sürer?", a: "Kompozit bonding genellikle 5-7 yıl dayanır. Porselen veneerlere göre daha az dayanıklıdır ancak çok daha az invazif ve çok daha uygun fiyatlıdır." },
        { q: "Dental bonding leke tutar mı?", a: "Kompozit reçine porselen kadar leke direncine sahip değildir. Kahve, çay ve kırmızı şarabı sınırlamak ve iyi ağız hijyeni korumak sonucu önemli ölçüde uzatır." },
        { q: "Ağrılı mı?", a: "Hayır. Dental bonding nadiren anestezi gerektirir. Hastaların büyük çoğunluğu için süreç tamamen konforludur." },
      ]
    },
    [t.orthodonticsSlug]: {
      titleKey: 'orthodontics', descKey: 'orthodonticsDesc', img: veneersImg,
      benefits: [
        "Kalabalık, aralık, çapraz ısırma, üst çene çıkıntısı ve alt çene çıkıntısını düzeltir",
        "İyileştirilmiş ağız hijyeni — düz dişlerin temizlenmesi daha kolaydır",
        "Hizasızlıktan kaynaklanan diş eti hastalığı ve diş aşınması riskini azaltır",
        "Her hastaya uygun seçenekler: geleneksel braketler veya şeffaf plaklar",
        "Deneyimli ortodonti ekibi — hassas, kişiselleştirilmiş tedavi planları",
        "Projeksiyonlu sonuç modellemeli dijital tedavi planlaması",
        "Sabit ve hareketli aparat seçenekleri mevcuttur",
        "İngiltere veya Almanya'daki ortodonti ücretlerine kıyasla önemli tasarruf",
      ],
      forWhom: [
        "Erken düzeltme gerektiren gelişmekte olan dişleşmesi olan çocuklar ve gençler",
        "Rahatsızlığa veya estetik endişelere yol açan kalabalıklık, boşluk veya ısırma sorunları olan yetişkinler",
        "Hizasızlıkla ilgili çene ağrısı veya baş ağrısı yaşayan hastalar",
        "Yıllar önce ortodontik tedavi gören ve nüks yaşayanlar",
        "Ortodontik değerlendirme için diş hekimi tarafından yönlendirilenler",
      ],
      process: [
        "Tam klinik muayene, dijital röntgenler ve fotoğraflar",
        "Ortodontik değerlendirme: ısırma analizi, kalabalık indeksi, çene ilişkisi",
        "Beklenen süre ve aparat seçenekleriyle sunulan tedavi planı",
        "Aparatlar takılır (braketler yapıştırılır veya plaklar teslim edilir)",
        "Diş hareketini ilerletmek için düzenli ayar randevuları",
        "Tedavi hedefleri gerçekleştiğinde braket çıkarımı",
        "Uzun vadeli sonucu korumak için retainer takılır",
      ],
      results: [
        "Dengeli bir gülüşle düz, iyi hizalanmış dişler",
        "İyileştirilmiş ısırma işlevi — çene kasları ve eklemler üzerinde daha az gerilim",
        "Daha kolay ağız hijyeni ve daha düşük uzun vadeli çürük ve diş eti hastalığı riski",
        "Seçili vakalarda gelişmiş yüz dengesi ve profil",
        "Tutarlı retainer kullanımıyla korunan kalıcı sonuç",
      ],
      faq: [
        { q: "Ortodontik tedavi için minimum yaş nedir?", a: "Erken ortodontik değerlendirme 7-8 yaşından başlayabilir; ancak çoğu tedavi, kalıcı dişlerin sürdüğü erken gençlik yıllarında başlar. Yetişkin ortodontisinde üst yaş sınırı yoktur." },
        { q: "Ortodontik tedavi ne kadar sürer?", a: "Süre küçük düzeltmeler için 6 aydan karmaşık vakalar için 2 yıla kadar uzanır. Ortodontistin muayeneden sonra size doğru tahmini vereceğini belirtin." },
        { q: "Braketler ağrılı mı?", a: "Takım veya ayarlamanın ardından ilk birkaç günde genellikle hassasiyet olur. Bu normaldir ve reçetesiz ağrı kesicilerle yönetilebilir. Şeffaf plaklar sabit braketlere kıyasla daha az rahatsızlığa neden olur." },
      ]
    },
    [t.wisdomToothSlug]: {
      titleKey: 'wisdomTooth', descKey: 'wisdomToothDesc', img: implantImg,
      benefits: [
        "Deneyimli ağız, diş ve çene cerrahı — Dr. Ali Temelci, cerrahi çekim uzmanı",
        "Karmaşık vakalar için 3D CBCT görüntüleme — hassas sinir ve kök haritalama",
        "Endişeli hastalar için sedasyon seçeneğiyle lokal anestezi",
        "Çoğu çekim tek randevuda tamamlanır",
        "Komşu dişlerdeki ağrı, enfeksiyon ve hasarı ortadan kaldırır",
        "Gömülü yirmilik dişlerin neden olduğu ilerleyen kalabalıklığı önler",
        "Ameliyat sonrası bakım talimatları ve takip dahildir",
        "İngiltere'deki cerrahi çekim ücretlerine kıyasla önemli ölçüde daha uygun fiyat",
      ],
      forWhom: [
        "Ağrılı, şiş veya enfekte yirmilik dişleri olan hastalar",
        "Besin tutulmasına ve çürüğe yol açan yarı sürmüş yirmilik dişleri olanlar",
        "Gömülü (diş eti veya kemik altında sıkışmış) yirmilik dişleri olan hastalar",
        "Yirmilik diş çevresinde tekrarlayan enfeksiyon (perikoronitis) yaşayanlar",
        "Yirmilik dişleri komşu dişlere zarar veren veya onları sıkıştıranlar",
      ],
      process: [
        "Pozisyon ve kök anatomisini değerlendirmek için klinik muayene ve dijital röntgen veya 3D CBCT",
        "Tedavi planı onaylanır — basit ya da cerrahi çekim belirlenir",
        "Bölgeyi tamamen uyuşturmak için lokal anestezi uygulanır",
        "Gerekirse cerrahi fleap kaldırılır; gömülüyse diş parçalanır",
        "Diş çıkarılır, soket temizlenir ve irigasyon yapılır",
        "Gerektiğinde sütür yerleştirilir — genellikle eriyen türde",
        "Ameliyat sonrası bakım talimatları verilir; takip randevusu ayarlanır",
      ],
      results: [
        "Ağrı, şişlik ve enfeksiyonun tamamen ortadan kalkması",
        "Komşu dişlerin daha fazla hasar veya çürükten korunması",
        "Gömülü dişten gelecekteki diş komplikasyonlarının önlenmesi",
        "Hızlı iyileşme — çoğu hasta 48-72 saat içinde normal faaliyetlerine geri döner",
        "Sorunlu diş uzaklaştırılarak uzun vadeli ağız sağlığı iyileştirilir",
      ],
      faq: [
        { q: "Yirmilik diş çekimi ne kadar ağrılı?", a: "İşlem lokal anestezi altında gerçekleştirilir — baskı hissedersiniz ancak ağrı hissetmezsiniz. Karmaşıklığa bağlı olarak ameliyat sonrası rahatsızlık değişir; çoğu hasta 2-3 gün standart ağrı kesicilerle idare eder." },
        { q: "Tüm yirmilik dişlerin çekilmesi gerekiyor mu?", a: "Hayır. Tamamen sürmüş, düzgün hizalanmış ve sağlıklı yirmilik dişlerin çekilmesine gerek yoktur. Çekim; gömülü olduğunda, tekrarlayan enfeksiyona neden olduğunda, komşu dişlere zarar verdiğinde veya yapısal olarak bozulduğunda önerilir." },
        { q: "İyileşme ne kadar sürer?", a: "Çoğu hasta basit çekimlerde 3-5 günde iyileşir. Derin gömülü dişlerin cerrahi çıkarımı, rahatsızlık tamamen geçmeden önce 5-7 gün gerektirebilir. Şişlik genellikle 48. saatte zirveye ulaşır ve sonra azalır." },
      ]
    },
    [t.gumDiseaseSlug]: {
      titleKey: 'gumDisease', descKey: 'gumDiseaseDesc', img: implantImg,
      benefits: [
        "Erken müdahale, geri dönüşü olmayan kemik kaybı olmadan diş eti hastalığını durdurur",
        "Yerleşik diş eti hastalığı için ileri periodontal tedavi",
        "Profesyonel derin temizlik (skalaj ve kök yüzeyi düzleştirme) gizli bakteri birikintilerini kaldırır",
        "Geliştirilmiş sonuçlar için lazer destekli periodontal tedavi mevcuttur",
        "Kişiselleştirilmiş ağız hijyeni koçluğu — uzun vadeli ev önlemi",
        "Sistemik sağlıkla bağlantılar ele alınır: diş eti hastalığı, diyabet, kalp hastalığı",
        "Periodontal şartlama ile kapsamlı izleme",
        "İngiltere periodontal uzman ücretlerine kıyasla önemli tasarruf",
      ],
      forWhom: [
        "Kanayan diş etleri, ağız kokusu veya diş eti çekilmesi olan hastalar",
        "Kırmızı, şiş veya hassas diş eti dokusu olanlar",
        "Gingivitis veya periodontitis tanısı alan hastalar",
        "Periimplant hastalığı tedavisi gerektiren implant hastaları",
        "Diş eti hastalığı riski yüksek sigara içenler ve diyabetikler",
      ],
      process: [
        "Tam periodontal muayene: prob derinlikleri, kanama skorları ve radyografik kemik değerlendirmesi",
        "Özel ihtiyaçlarınıza göre uyarlanmış ağız hijyeni talimatı",
        "Yüzey tartar kalıntılarını uzaklaştırmak için profesyonel skalaj ve cila",
        "İlerlemiş hastalık için lokal anestezi altında derin temizlik (skalaj ve kök yüzeyi düzleştirme)",
        "Endike olduğu yerde derin ceplerin lazer destekli dekontaminasyonu",
        "Kontrol randevusu: cep derinliklerinin ve tedavi yanıtının yeniden değerlendirilmesi",
        "Bakım programı oluşturulur — süregelen 3-6 aylık destekleyici bakım",
      ],
      results: [
        "Azaltılmış cep derinlikleri, durdurulan kanama ve daha sağlam diş eti dokusu",
        "Durdurulan kemik kaybı — süregelen bakımla ileri yıkım önlenir",
        "Daha taze nefes ve daha temiz, sağlıklı bir ağız",
        "Başka türlü kaybedilecek doğal dişler korunur",
        "Gelecekteki herhangi bir estetik veya restoratif tedavi için sağlam temel",
      ],
      faq: [
        { q: "Diş eti hastalığı tedavi edilebilir mi?", a: "Gingivitis (erken diş eti hastalığı) profesyonel temizlik ve iyileştirilmiş ev bakımıyla tamamen geri döndürülebilir. Periodontitis (kemik kaybıyla ilerlemiş diş eti hastalığı) 'iyileştirilemez' ancak tedavi ve süregelen bakımla etkin biçimde yönetilebilir ve stabilize edilebilir." },
        { q: "Diş eti hastalığı tedavisi ağrılı mı?", a: "Derin temizlik lokal anestezi altında yapılır. Birkaç günlük bazı tedavi sonrası hassasiyet ve hafif diş eti ağrısı normaldir ancak yönetilebilir." },
        { q: "Sigara diş eti hastalığını nasıl etkiler?", a: "Sigara, diş eti hastalığının en büyük tek risk faktörüdür. Diş etlerine kan akışını bozar, belirtileri maskeleyerek tedaviye yanıtı önemli ölçüde azaltır. Sigarayı bırakmak en etkili adımdır." },
      ]
    },
    [t.laserGumSlug]: {
      titleKey: 'laserGum', descKey: 'laserGumDesc', img: hollywoodSmileImg,
      benefits: [
        "Minimal invazif — çoğu vakada neşter veya dikiş yok",
        "Gummy smile düzeltmesi: fazla diş eti dokusu hassasiyetle kaldırılır",
        "Lazer tedavi alanını sterilize eder — geleneksel ameliyata kıyasla daha düşük enfeksiyon riski",
        "Geleneksel diş eti ameliyatına kıyasla daha hızlı iyileşme",
        "Fazla diş eti örtüsü nedeniyle kısa görünen dişler için kron uzatma",
        "Derin periodontal cepleri azaltır — skalaj ve kök yüzeyi düzleştirmeye eşlik eder",
        "Son derece hassas: yalnızca hastalıklı dokuyu hedef alır, sağlıklı diş etini korur",
        "Lokal anestezi ile konforlu tedavi",
      ],
      forWhom: [
        "Gülümsediklerinde çok fazla diş eti gösteren 'gummy smile'lı hastalar",
        "Fazla diş eti örtüsü nedeniyle kısa görünen dişleri olanlar",
        "Geleneksel temizliğe yanıt vermeyen derin periodontal cepleri olan hastalar",
        "Gülüşlerini etkileyen düzensiz veya asimetrik diş eti hattı olanlar",
        "Restorasyon öncesi kron uzatma gerektiren hastalar",
      ],
      process: [
        "Hassas diş eti konturunu planlamak için klinik değerlendirme ve dijital gülüş analizi",
        "Tam konfor sağlamak için lokal anestezi uygulanır",
        "Lazer, fazla diş eti dokusunu hassas biçimde şekillendirmek ve uzaklaştırmak için kullanılır",
        "Diş eti hattı simetri ve istenen estetik elde etmek için şekillendirilir",
        "Tedavi alanı lazer tarafından kapatılır — çoğu vakada dikiş gerekmez",
        "Tedavi sonrası bakım talimatları verilir; iyileşme takip randevusunda değerlendirilir",
      ],
      results: [
        "Daha az görünür diş etiyle daha dengeli, orantılı bir gülüş",
        "Daha uzun ve daha belirgin görünen dişler",
        "Simetrik, doğal görünümlü diş eti konturu",
        "Daha sağlıklı diş eti dokusu — lazer tedavisi bakteri yükünü azaltır",
        "Sonuçlar hemen görünür; tam iyileşme 1-2 hafta içinde gerçekleşir",
      ],
      faq: [
        { q: "Lazer diş eti tedavisi ağrılı mı?", a: "İşlem lokal anestezi altında gerçekleştirilir. Tedavi sonrası rahatsızlık genellikle hafiftir — çoğu hasta 1-2 gün reçetesiz ağrı kesicilerle idare eder." },
        { q: "Sonuç ne kadar sürer?", a: "Diş eti yeniden şekillendirme sonuçları kalıcıdır; uzaklaştırılan doku yeniden büyümez. İyi ağız hijyeni korumak ve düzenli kontrollere gitmek sonucun stabil kalmasını sağlar." },
        { q: "Lazer diş eti tedavisi gummy smile'ı düzeltebilir mi?", a: "Evet. Fazla diş eti dokusundan kaynaklanan gummy smile'lı pek çok hasta için lazer diş eti yeniden şekillendirme, tek kısa randevuda dramatik ve kalıcı bir iyileşme sağlar." },
      ]
    },
    [t.bruxismSlug]: {
      titleKey: 'bruxism', descKey: 'bruxismDesc', img: crownsImg,
      benefits: [
        "Gıcırdatma ve sıkıştırma düzenlerinin doğru tanısı",
        "Özel yapım okluzal ateller (gece plakları) uyku sırasında dişleri korur",
        "Daha fazla diş aşınmasını, kırıkları ve mine kaybını önler",
        "Çene ağrısı, baş ağrısı ve temporomandibular eklem (TME) rahatsızlığını giderir",
        "Şiddetli bruksizm için botoks enjeksiyonları — aşırı aktif çene kaslarını gevşetir",
        "Gıcırdatma tetikleyicilerini ortadan kaldırmak için ısırma ayarı (okluzal denge)",
        "Uzun vadeli izleme ve atel ayarı dahildir",
        "Hem fiziksel hem de yaşam tarzı faktörlerini ele alan kapsamlı yaklaşım",
      ],
      forWhom: [
        "Çene ağrısı, tıklama veya çenenin kilitlenmesi yaşayan hastalar",
        "Sabah baş ağrısı veya uyanışta yüz kası ağrısı olanlar",
        "Dişlerinin gıcırdatma belirtileri gösterdiği söylenenler",
        "Aşınmış, düzleşmiş veya hassas dişleri olan hastalar",
        "Dişlerine zarar veren stresle ilgili sıkıştırma alışkanlıkları olanlar",
      ],
      process: [
        "Kapsamlı değerlendirme: diş, çene kasları ve TME muayenesi",
        "Aşınma düzenlerini belgelemek için dijital çalışma modelleri ve fotoğraflar",
        "Gıcırdatmayı tetikleyen ısırma müdahalelerini belirlemek için okluzal analiz",
        "Bünyemizde üretilen özel gece plağı — takılır ve ayarlanır",
        "Belirli okluzal temas noktaları tespit edilirse ısırma ayarı yapılır",
        "Uygun görüldüğünde botoks çene kası enjeksiyonu tartışılır ve uygulanır",
        "Takip değerlendirmesi: semptom değerlendirmesi ve atel ayarı",
      ],
      results: [
        "Çene ağrısı, baş ağrısı ve sabah tutukluğunda önemli azalma",
        "Dişler daha fazla aşınma ve kırıktan korunur",
        "İyileştirilmiş uyku kalitesi — gıcırdatmanın gürültüsü ve fiziksel hasarı olmadan",
        "Çoğu vakada TME semptomları iyileşir veya çözüme kavuşur",
        "Uzun vadeli diş koruması — tedavi edilmemiş bruksizm en yıkıcı diş alışkanlıklarından biridir",
      ],
      faq: [
        { q: "Bruksizm iyileştirilebilir mi?", a: "Bruksizm her zaman kalıcı olarak ortadan kaldırılamaz ancak etkin biçimde yönetilebilir. Gece plakları dişleri korur. Stres yönetimi, duruş düzeltmesi ve bazı vakalarda botoks gıcırdatma davranışını önemli ölçüde azaltabilir." },
        { q: "Gece plağı yeterli mi?", a: "Gece plağı bruksizm yönetiminin temel taşıdır — gıcırdatma kuvvetlerini absorbe eder ve dişleri korur. Önemli çene ağrısı veya kas hipertrofisi olan hastalar için botoks enjeksiyonları oldukça etkili bir destektir." },
        { q: "Bruksizm için botoks nedir?", a: "Masseter (çene) kaslarına küçük miktarlarda botulinum toksini enjekte etmek onları gevşetir, gıcırdatmanın kuvvetini ve sıklığını önemli ölçüde azaltır. Etki 4-6 ay sürer ve tekrarlanabilir. Güvenli ve iyi kanıtlanmış bir tedavidir." },
      ]
    },
    [t.preventiveDentistrySlug]: {
      titleKey: 'preventiveDentistry', descKey: 'preventiveDentistryDesc', img: hollywoodSmileImg,
      benefits: [
        "Sorunları erken yakalayın — küçük çürükler büyüklerden çok daha az maliyetli",
        "Profesyonel temizlik, yalnızca fırçalamanın ulaşamayacağı tartarı uzaklaştırır",
        "Fissür örtücüler arka dişleri çürükten korur",
        "Florür uygulamaları mineyi güçlendirir ve çürük riskini azaltır",
        "Kişiselleştirilmiş ağız hijyeni tavsiyesi — teknik, ürünler ve rutin",
        "Her kontrolde ağız kanseri taraması dahildir",
        "Diş eti sağlığı değerlendirmesi ve gerektiğinde erken müdahale",
        "Uzun vadeli yatırım: önleme tedaviden çok daha ucuz",
      ],
      forWhom: [
        "Herkes — yetişkinler, çocuklar ve yaşlı hastalar",
        "Yıllardır diş hekimine gitmeyen ve yeni bir başlangıç yapmak isteyen hastalar",
        "Çürük veya diş eti hastalığı geçmişi olan ve döngüyü kırmak isteyenler",
        "Sabit restorasyon (implant, kron, veneer) olan ve profesyonel bakım gerektiren hastalar",
        "Hayat boyu iyi diş alışkanlıkları edinen çocuklar ve gençler",
      ],
      process: [
        "Tam klinik muayene: dişler, diş etleri, yumuşak dokular ve çene",
        "Çürük, kemik seviyeleri ve gizli patolojiyi tespit etmek için dijital röntgenler",
        "Profesyonel skalaj ve cila: diş eti hattının üstünde ve altındaki tartarın kaldırılması",
        "Uygun yerlerde hassas azı dişlerine fissür örtücü uygulaması",
        "Mineyi güçlendirmek için florür verniği uygulanır",
        "Kişiselleştirilmiş ağız hijyeni koçluğu: fırçalama, diş ipi ve arayüz temizliği",
        "Takip randevusu planlanır — genellikle her 6 ayda bir",
      ],
      results: [
        "Ölçülebilir biçimde azaltılmış gelecekteki sorun riskiyle temiz, sağlıklı bir ağız",
        "Maliyetli hale gelmeden gelişen sorunların erken tespiti ve tedavisi",
        "Daha sağlıklı diş etleri, daha taze nefes ve daha parlak bir gülüş",
        "Dişlerinizi hayat boyu tutmanızı sağlayan kişiselleştirilmiş önleme planı",
        "Güven — diş sağlığınızın etkin biçimde izlendiğini ve korunduğunu bilmek",
      ],
      faq: [
        { q: "Ne sıklıkla kontrol randevusuna gitmeliyim?", a: "Yetişkinlerin çoğu 6 ayda bir kontrolden yarar görür. Diş eti hastalığı veya yüksek çürük riski geçmişi olan hastalara 3-4 ayda bir gitmeleri önerilebilir." },
        { q: "Fissür örtücü nedir?", a: "Fissür örtücü, arka dişlerin çiğneme yüzeylerine uygulanan ince bir koruyucu malzeme katmanıdır. Bakterilerin biriktiği doğal oluklara dolar ve özellikle çocuklar ile gençler için etkilidir." },
        { q: "Yetişkinler için florür tedavisi güvenli mi?", a: "Evet. Profesyonel florür verniği, çürük riski taşıyan tüm yaşlardan hastalar için güvenli, etkili ve önerilir. Florür konsantrasyonu diş macunundan çok daha yüksektir ve mine için doğrudan koruyucu fayda sağlar." },
      ]
    },
  };

  if (lang === "tr") return trData[slug] || null;
    return data[slug] || null;
};

const TreatmentDetailPage = () => {
  const { t, localePath, lang } = useLanguage();
  const { treatmentSlug } = useParams<{ treatmentSlug: string }>();
  
  const treatment = getTreatmentData(treatmentSlug || '', t, lang);

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
