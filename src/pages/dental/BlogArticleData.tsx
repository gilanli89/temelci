import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { WhatsAppButton } from '@/components/dental/WhatsAppButton';
import { ChevronLeft, Clock, User, Calendar, Tag, Check, MapPin, Hotel, Plane, Star } from 'lucide-react';
import implantImg from '@/assets/dental-implant.jpg';
import hollywoodSmileImg from '@/assets/hollywood-smile.jpg';
import fullMouthImg from '@/assets/full-mouth-restoration.jpg';
import clinicRoom1 from '@/assets/clinic/clinic_room1.jpg';
import clinicRoom2 from '@/assets/clinic/clinic_room2.jpg';

// ── Article content database ──────────────────────────────────────────────────
export const ARTICLE_CONTENT: Record<string, any> = {

  'north-cyprus-implants-vs-turkey': {
    slug: 'north-cyprus-implants-vs-turkey',
    seoTitle: 'Dental Implants in North Cyprus vs Turkey: Why Kyrenia Wins Every Time',
    seoDescription: 'Thinking of getting dental implants in Turkey? Read why North Cyprus — just minutes from Larnaka Airport — offers better access, lower prices, and superior aftercare.',
    category: { en: 'Dental Tourism', tr: 'Diş Turizmi' },
    img: implantImg,
    date: '2026-04-12',
    readTime: { en: '9 min read', tr: '9 dk okuma' },
    author: 'DR. Ali Temelci',
    authorTitle: 'Oral & Maxillofacial Surgeon',
    title: {
      en: 'Dental Implants in North Cyprus vs Turkey: Why More Patients Are Choosing Kyrenia',
      tr: 'Kuzey Kıbrıs\'ta Diş İmplantı mı, Türkiye mi: Hastalar Neden Girne\'yi Tercih Ediyor?'
    },
    excerpt: {
      en: 'Turkey has long dominated the dental tourism conversation. But a growing number of UK, German and European patients are discovering that North Cyprus — just a short journey from Larnaka Airport — offers everything Turkey does and more, with none of the inconveniences.',
      tr: 'Türkiye uzun süredir diş turizmi söylemlerine hâkimdi. Ancak giderek daha fazla İngiliz, Alman ve Avrupalı hasta, Larnaka Havalimanı\'ndan kısa bir yolculukla ulaşılabilen Kuzey Kıbrıs\'ın her şeyi daha iyi sunduğunu keşfediyor.'
    },
    sections: [
      {
        heading: { en: 'The Turkey Dental Tourism Problem Nobody Talks About', tr: 'Kimsenin Konuşmadığı Türkiye Diş Turizmi Sorunu' },
        body: {
          en: `Turkey — Istanbul, Antalya, Izmir — gets most of the marketing budget in dental tourism. Glossy Instagram clinics, celebrity endorsements, and aggressive Google Ads have made it the default answer when patients Google "cheap dental implants abroad."

But speak to patients who have actually been, and a more complicated picture emerges. Flights from London to Istanbul take over 3.5 hours. Antalya is further. Transfer times within Turkey add another hour. The language barrier is real outside of high-end clinics. And when something goes wrong — a poorly placed implant, a crown that doesn't fit — the follow-up becomes a logistical and financial nightmare.

Quality in Turkey varies enormously. The same country that has world-class prosthodontists has clinics that hire inexperienced graduates to handle implant cases for foreign patients at high volume. The patient bears all the risk.

North Cyprus is different. And the reason is simple: it has everything Turkey has, but it's dramatically easier to get to, safer to navigate, and more accountable when things go wrong.`,
          tr: `Türkiye — İstanbul, Antalya, İzmir — diş turizminde pazarlama bütçesinin büyük bölümünü alıyor. Renkli Instagram klinikleri, ünlü onayları ve agresif Google Reklamları, "yurt dışında ucuz diş implantı" arayanlar için varsayılan yanıt haline geldi.

Ancak gerçekten gidenlerle konuşunca daha karmaşık bir tablo ortaya çıkıyor. Londra'dan İstanbul'a uçuşlar 3,5 saatten fazla süruyor. Antalya daha da uzak. Türkiye içi transfer süreleri bir saat daha ekliyor. Üst düzey klinikler dışında dil engeli gerçek bir sorun. Ve bir şeyler ters gittiğinde — yanlış yerleştirilmiş bir implant, uymayan bir kron — takip süreci lojistik ve finansal bir kabus haline geliyor.

Türkiye'deki kalite büyük farklılıklar gösteriyor. Dünya standartlarında protetik uzmanları olan ülke, aynı zamanda yabancı hastaların yüksek hacimli implant vakalarını deneyimsiz mezunlara bırakıyor. Tüm riski hasta üstleniyor.

Kuzey Kıbrıs farklı. Sebebi basit: Türkiye'nin sunduğu her şeye sahip, ama ulaşımı çok daha kolay, gezinmesi daha güvenli ve sorun çıktığında daha hesap verebilir.`
        }
      },
      {
        heading: { en: 'Getting to North Cyprus: The Larnaka Route That Changes Everything', tr: 'Kuzey Kıbrıs\'a Ulaşmak: Her Şeyi Değiştiren Larnaka Güzergahı' },
        body: {
          en: `Here is something that surprises most patients when they first hear it: you can fly to Larnaka Airport in the Republic of Cyprus — served by EasyJet, Ryanair, British Airways, Wizz Air and dozens of other carriers from hundreds of European cities — and be sitting in our clinic in Kyrenia within 90 minutes of landing.

The process is straightforward. You land at Larnaka. You take a taxi (approximately 45 minutes, €40–50) to the Metehan / Ledra Palace border crossing. Crossing takes 5–10 minutes with a valid passport or EU ID. You're now in North Cyprus. Kyrenia is 25 minutes from the crossing. The journey from plane door to clinic door: under 90 minutes.

Compare that to flying to Istanbul, spending 2 hours in Atatürk traffic getting to your clinic in Şişli, and you begin to understand why patients who've done both say they'll never go back to Turkey.

Direct flights to Ercan Airport (North Cyprus) also exist from London Stansted, Birmingham, Manchester, and Frankfurt — typically operated by Pegasus, AtlasGlobal, and charter services. For patients who prefer to fly direct, this is an option. But for those with maximum flexibility on fares and airlines, the Larnaka route is often the smarter choice.

At Temelci Dental, we include a VIP transfer service for every international patient. From either Larnaka or Ercan, your driver meets you at arrivals and brings you directly to your hotel or to the clinic. No navigation, no language stress, no waiting for a taxi rank.`,
          tr: `Çoğu hastanın ilk duyduğunda şaşırdığı bir şey var: EasyJet, Ryanair, British Airways, Wizz Air ve yüzlerce Avrupa şehrinden onlarca havayolu şirketinin uçtuğu Kıbrıs Cumhuriyeti'ndeki Larnaka Havalimanı'na uçabilir ve iniş yapmanızın üzerinden 90 dakika geçmeden Girne'deki kliniğimizde oturabilirsiniz.

Süreç basit. Larnaka'ya iniyorsunuz. Metehan / Ledra Palace sınır kapısına taksiyle gidiyorsunuz (yaklaşık 45 dakika, 40-50€). Geçiş geçerli pasaport veya AB kimliğiyle 5-10 dakika sürüyor. Artık Kuzey Kıbrıs'tasınız. Girne kapıdan 25 dakika. Uçak kapısından klinik kapısına: 90 dakikanın altında.

Bunu İstanbul'a uçmak, Şişli'deki kliniğinize ulaşmak için Atatürk trafiğinde 2 saat harcamakla karşılaştırdığınızda, her ikisini de yapmış hastaların neden Türkiye'ye bir daha gitmeyeceğini söylediğini anlarsınız.`
        }
      },
      {
        heading: { en: 'Price Comparison: North Cyprus vs Turkey', tr: 'Fiyat Karşılaştırması: Kuzey Kıbrıs - Türkiye' },
        body: {
          en: `Let's address price directly, because this is usually the first thing patients ask about.

Turkish clinics market themselves aggressively on price. And for simple treatments — single veneers, basic composites — Turkey can be cheap. But for implant cases, the gap is smaller than the marketing suggests. When you add flights, internal transfers, hotel costs in Istanbul or Antalya, and the price premium at the quality clinics (the ones you actually want doing your implants), the total cost difference between Turkey and North Cyprus is often 10–15%. That's not nothing, but it's not the 50% gap the ads imply.

And in North Cyprus, you are saving 50–65% against UK or German prices regardless. A single Straumann implant with crown at Temelci Dental costs a fraction of what you'd pay in London. All-on-4 treatment — full arch on 4 implants — which costs £18,000–£24,000 in the UK, is available here at a price that makes a week in Cyprus feel like a bonus rather than a cost.`,
          tr: `Fiyata doğrudan değinelim, çünkü bu genellikle hastaların ilk sorduğu şey.

Türk klinikleri kendilerini fiyat konusunda agresif biçimde pazarlıyor. Ve basit tedaviler — tek veneer, temel kompozitler — için Türkiye ucuz olabilir. Ancak implant vakalarında fark, pazarlamanın ima ettiğinden küçük. Uçuşları, Türkiye içi transferleri, İstanbul veya Antalya'daki otel masraflarını ve kaliteli kliniklerdeki fiyat primini (gerçekten implantınızı yaptırmak istediğiniz yerler) eklediğinizde, Türkiye ile Kuzey Kıbrıs arasındaki toplam maliyet farkı genellikle %10-15 oluyor. Bu yok sayılamaz, ama reklamların ima ettiği %50'lik fark değil.

Ve Kuzey Kıbrıs'ta İngiltere veya Almanya fiyatlarına kıyasla her durumda %50-65 tasarruf ediyorsunuz.`
        }
      },
      {
        heading: { en: 'Quality and Accountability: The Temelci Difference', tr: 'Kalite ve Hesap Verebilirlik: Temelci Farkı' },
        body: {
          en: `Temelci Dental has been operating in Kyrenia since 1990. That's 35 years serving local, expatriate, and international patients — long before "dental tourism" was a marketing category.

Our implant work is performed by Dr. Ali Temelci, an oral and maxillofacial surgery specialist trained at Near East University and with 8 years of specialist practice. We use Straumann implants — the global benchmark for implant quality, with the most extensive long-term clinical evidence of any implant brand. Our 3D CBCT scanner (NewTom 3G) allows us to plan every implant case with precision before a single incision is made.

We offer written guarantees on all implant work. We provide WhatsApp follow-up for 12 months after treatment. If you have a concern 3 months after returning home, you message us and you get a real clinical response — not an automated ticket system.

That accountability is possible because we are a long-established clinic with a reputation in this community, not a high-turnover dental factory processing 20 foreign patients a day.`,
          tr: `Temelci Dental, 1990'dan beri Girne'de faaliyet gösteriyor. Bu, "diş turizmi" bir pazarlama kategorisi olmadan çok önce yerel, expatriate ve uluslararası hastalara 35 yıldır hizmet vermek demek.

İmplant çalışmalarımız, Yakın Doğu Üniversitesi mezunu ve 8 yıllık uzman pratiğe sahip ağız, diş ve çene cerrahisi uzmanı Dr. Ali Temelci tarafından yapılıyor. Straumann implantlar kullanıyoruz — implant kalitesinin küresel standardı, en kapsamlı uzun vadeli klinik kanıtına sahip implant markası. 3D CBCT tarayıcımız (NewTom 3G) her implant vakasını tek kesi yapılmadan önce hassasiyetle planlamanızı sağlıyor.

Tüm implant çalışmaları için yazılı garanti veriyoruz. Tedaviden sonra 12 ay WhatsApp takibi sunuyoruz.`
        }
      },
      {
        heading: { en: 'The Bottom Line: Why North Cyprus Wins', tr: 'Sonuç: Neden Kuzey Kıbrıs Kazanıyor' },
        body: {
          en: `If you are a UK, German, Dutch, or Scandinavian patient considering implants abroad, here is the honest comparison:

Turkey offers cheap volume dentistry in some clinics and world-class care in others, in a country that takes 3+ hours to reach and where aftercare logistics are challenging.

North Cyprus offers the same clinical quality, the same price bracket, a 90-minute journey from European flights via Larnaka, a Mediterranean resort destination for your recovery, and a 35-year established clinic that knows your name when you walk back in 6 months later.

The choice, for most patients who think it through, is straightforward. We'd love to show you what we can do. Send us your X-ray on WhatsApp — we'll have a treatment plan ready within 24 hours.`,
          tr: `Yurt dışında implant düşünen bir İngiliz, Alman, Hollandalı veya İskandinav hastaysanız, işte dürüst karşılaştırma:

Türkiye, bazı kliniklerde ucuz hacim diş hekimliği, diğerlerinde dünya standartlarında bakım sunuyor; ulaşılması 3+ saat süren ve takip lojistiğinin zor olduğu bir ülkede.

Kuzey Kıbrıs aynı klinik kaliteyi, aynı fiyat dilimini, Larnaka üzerinden Avrupa uçuşlarından 90 dakika yolculuğu, iyileşmeniz için Akdeniz tatil beldesi ve 6 ay sonra geri döndüğünüzde adınızı bilen 35 yıllık köklü kliniği sunuyor.

Düşündükten sonra çoğu hasta için seçim basit. Size neler yapabileceğimizi göstermek isteriz.`
        }
      }
    ]
  },

  'best-hotels-kyrenia-dental-patients': {
    slug: 'best-hotels-kyrenia-dental-patients',
    seoTitle: 'Best Hotels & Accommodation in Kyrenia for Dental Patients 2025',
    seoDescription: 'Planning dental treatment in North Cyprus? Here are the best hotels and Airbnb options in Kyrenia (Girne) — chosen for comfort, location, and proximity to our clinic.',
    category: { en: 'Dental Tourism', tr: 'Diş Turizmi' },
    img: clinicRoom2,
    date: '2026-04-12',
    readTime: { en: '7 min read', tr: '7 dk okuma' },
    author: 'Temelci Dental',
    authorTitle: 'Patient Care Team',
    title: {
      en: 'Best Hotels & Accommodation in Kyrenia for Dental Patients (2025 Guide)',
      tr: 'Diş Hastası Hastaları İçin Girne\'de En İyi Oteller ve Konaklama (2025 Rehberi)'
    },
    excerpt: {
      en: 'Choosing the right accommodation is a bigger part of your dental trip than most patients realise. Where you stay affects your comfort during recovery, your ability to get to appointments on time, and how much you enjoy the experience overall.',
      tr: 'Doğru konaklama seçimi, çoğu hastanın fark ettiğinden daha büyük bir rol oynar. Nerede kaldığınız, iyileşme sürecindeki konforunuzu, randevularınıza zamanında ulaşabilmenizi ve genel deneyiminizi etkiliyor.'
    },
    sections: [
      {
        heading: { en: 'Kyrenia: A World-Class Destination for Recovery', tr: 'Girne: İyileşme İçin Dünya Standartlarında Bir Destinasyon' },
        body: {
          en: `Most dental tourists flying to Istanbul or Warsaw land in a city. They check into a business hotel near the clinic, have their treatment, and then have nothing to do in a grey urban environment while their gums heal. The experience is functional but joyless.

Kyrenia is completely different. It is one of the most beautiful small harbour towns in the entire Mediterranean. The 12th-century castle overlooking the old harbour, the mountain backdrop of the Five Finger range, the clear warm sea, the restaurants along the waterfront serving fresh mezze and grilled fish — all of this is your backdrop while you recover from treatment.

Patients consistently tell us that their week in Kyrenia was a holiday first, dental treatment second. That's exactly how it should be. You save on dental treatment, and you have a genuine Mediterranean experience as part of the deal.`,
          tr: `İstanbul veya Varşova'ya uçan çoğu diş turisti bir şehre iniyor. Kliniğin yakınındaki bir iş oteline yerleşiyor, tedavisini oluyor ve ardından diş etleri iyileşirken kasvetli bir kentsel ortamda yapacak hiçbir şey buluyor. Deneyim işlevsel ama neşesiz.

Girne tamamen farklı. Tüm Akdeniz'in en güzel küçük liman kasabalarından biri. Eski limana bakan 12. yüzyıl kalesi, Beş Parmak dağlarının arka planı, berrak ve ılık deniz, sahil boyunca taze meze ve ızgara balık sunan restoranlar — tüm bunlar tedaviden iyileşirken arka planınız oluyor.

Hastalar sürekli bize Girne'deki haftalarının önce tatil, sonra diş tedavisi olduğunu söylüyor. Tam da böyle olmalı.`
        }
      },
      {
        heading: { en: 'Our Top Hotel Recommendations for Dental Patients', tr: 'Diş Hastaları İçin Önerilen En İyi Oteller' },
        body: {
          en: `**The Colony Hotel Kyrenia — 5★ (8 min from clinic)**

The Colony is the most iconic hotel on the old harbour. A historic building with sea-facing rooms, rooftop pool, and one of Kyrenia's best restaurants on the terrace. Ideal for patients who want to treat themselves after going through treatment — the view from a sea-view room is genuinely spectacular. Rooms from £95/night.

Best for: Patients wanting a premium experience; couples; patients having complex work done who want maximum comfort during recovery.

---

**Dome Hotel — 4★ (10 min from clinic)**

A Kyrenia institution. The Dome sits right on the seafront with a private beach and outdoor pool. Rooms are spacious and comfortable. The hotel has a slightly older, traditional feel — not the trendiest option but reliably comfortable and well-run. Rooms from £65/night.

Best for: Families; longer stays of 7–10 days; patients who want beach access during recovery.

---

**Nostalgia Hotel — 4★ (5 min from clinic — closest)**

A boutique hotel in the centre of Kyrenia's old town. The closest hotel to our clinic — within walking distance. Charming rooms, excellent breakfast, and right next to the castle and harbour restaurants. For patients who don't want to think about transport, this is the pick. Rooms from £45/night.

Best for: Solo travellers; patients on a budget; anyone who wants to walk everywhere and be immersed in the old town atmosphere.

---

**Acapulco Resort — 5★ (15 min from clinic)**

A large all-inclusive resort east of Kyrenia on the coast. Multiple pools, private beach, entertainment, full board. If you're travelling with family — children, a partner who isn't having treatment — this is the obvious choice. The size means there's always something to do. Rooms from £85/night.

Best for: Families; couples where only one partner is having treatment; patients who want to minimise out-of-pocket costs during their stay.`,
          tr: `**The Colony Hotel Kyrenia — 5★ (Klinikten 8 dk)**

Colony, eski limanın en ikonik oteli. Denize bakan odaları, çatı havuzu ve terastaki Girne'nin en iyi restoranlarından biriyle tarihi bir bina. Tedaviden sonra kendini şımartmak isteyen hastalar için ideal — deniz manzaralı odadan manzara gerçekten muhteşem. Odalar 95£/geceden başlıyor.

**Dome Hotel — 4★ (Klinikten 10 dk)**

Bir Girne kurumu. Dome, özel plajı ve açık havuzu ile deniz kıyısında yer alıyor. Odalar geniş ve konforlu. Biraz daha geleneksel bir hissi var — en trend seçenek değil ama güvenilir biçimde rahat ve iyi yönetilen bir otel. Odalar 65£/geceden başlıyor.

**Nostalgia Hotel — 4★ (Klinikten 5 dk — en yakın)**

Girne'nin eski şehir merkezinde butik bir otel. Kliniğimize en yakın otel — yürüme mesafesinde. Şık odalar, mükemmel kahvaltı ve kale ile liman restoranlarının hemen yanı başında. Ulaşım düşünmek istemeyenler için en iyi seçim. Odalar 45£/geceden başlıyor.

**Acapulco Resort — 5★ (Klinikten 15 dk)**

Girne'nin doğusunda sahilde büyük bir her şey dahil tatil köyü. Çocuklarla veya tedavi olmayan bir partnerle seyahat ediyorsanız açık seçim bu. Odalar 85£/geceden başlıyor.`
        }
      },
      {
        heading: { en: 'Airbnb in Kyrenia: When It Makes Sense', tr: 'Girne\'de Airbnb: Ne Zaman Mantıklı' },
        body: {
          en: `For longer stays — particularly All-on-4 patients who need to stay for 7–10 days — Airbnb can be a very cost-effective option. Kyrenia has a growing supply of well-maintained apartments and villas, many within walking distance of the old town.

What to look for in a dental-patient Airbnb:

**Proximity to a pharmacy.** You'll need pain relief and possibly antibiotics for the first few days. Central Kyrenia has pharmacies open 7 days; rural areas don't.

**A full kitchen.** The first 3–4 days after implant surgery you'll be eating soft food: soup, yoghurt, scrambled eggs, mashed potato. Having a kitchen means you can prepare food easily rather than navigating restaurant menus.

**Air conditioning.** Cyprus is warm — even in spring and autumn. Comfortable temperature during recovery matters.

**A ground-floor or lift-access property.** If you're having extensive work done, you'll want to avoid stairs for the first day or two.

Our patient team can recommend specific Airbnb properties based on your dates and requirements — just ask when you contact us.`,
          tr: `Daha uzun konaklamalar için — özellikle 7-10 gün kalması gereken All-on-4 hastaları için — Airbnb çok maliyet etkin bir seçenek olabilir. Girne'de, çoğu eski şehre yürüme mesafesinde, giderek artan sayıda iyi bakımlı daire ve villa var.

Diş hastası Airbnb'sinde dikkat edilecekler: Eczaneye yakınlık, tam donanımlı mutfak (ilk 3-4 gün yumuşak yiyecekler: çorba, yoğurt, yumurta, püre), klima ve asansör erişimi.`
        }
      },
      {
        heading: { en: 'What\'s Included in Your Temelci Dental Package', tr: 'Temelci Dental Paketinize Ne Dahil' },
        body: {
          en: `When you book treatment with us, your VIP airport transfer is included as standard — from either Larnaka or Ercan Airport to your hotel or directly to the clinic. We'll also advise on hotel availability and can make recommendations or assist with bookings for your specific dates.

We do not add a commission to hotel bookings or partner with hotels financially. Our recommendations are genuinely based on patient feedback and our knowledge of which properties offer the best recovery environment.

To find out more, send us a WhatsApp message with your treatment interest and approximate travel dates — we'll put together a complete picture of what your trip would look like.`,
          tr: `Bizimle tedavi rezervasyonu yaptırdığınızda, VIP havalimanı transferi standart olarak dahildir — Larnaka veya Ercan'dan otelinize veya doğrudan kliniğe. Ayrıca otel müsaitliği konusunda tavsiyelerde bulunur ve belirli tarihleriniz için rezervasyon yapılmasına yardımcı olabiliriz.

Otel rezervasyonlarına komisyon almıyor veya oteller ile finansal ortaklık yapmıyoruz. Önerilerimiz gerçekten hasta geri bildirimlerine ve hangi mülklerin en iyi iyileşme ortamını sunduğuna dair bilgimize dayanıyor.`
        }
      }
    ]
  },

  'first-days-after-dental-implant': {
    slug: 'first-days-after-dental-implant',
    seoTitle: 'What to Expect the First Week After a Dental Implant: A Complete Guide',
    seoDescription: 'Worried about recovery after your implant? Our oral surgeon walks you through days 1–7 after dental implant surgery — what\'s normal, what to eat, and when to call us.',
    category: { en: 'Patient Guide', tr: 'Hasta Rehberi' },
    img: implantImg,
    date: '2026-04-12',
    readTime: { en: '8 min read', tr: '8 dk okuma' },
    author: 'DR. Ali Temelci',
    authorTitle: 'Oral & Maxillofacial Surgeon',
    title: {
      en: 'What to Expect the First Week After a Dental Implant: Your Day-by-Day Recovery Guide',
      tr: 'Diş İmplantından Sonra İlk Hafta: Günlük İyileşme Rehberiniz'
    },
    excerpt: {
      en: 'For most patients, the fear of implant surgery is much worse than the reality. The first 3–4 days involve some discomfort and dietary restrictions — but by day 5 or 6, most patients are out exploring Kyrenia\'s old harbour and eating at waterfront restaurants.',
      tr: 'Çoğu hasta için implant ameliyatı korkusu gerçeklikten çok daha kötüdür. İlk 3-4 gün bazı rahatsızlık ve diyet kısıtlamaları içeriyor — ancak 5 veya 6. günde, hastaların büyük çoğunluğu Girne\'nin eski limanını keşfedip sahil restoranlarında yemek yiyor.'
    },
    sections: [
      {
        heading: { en: 'Surgery Day: What Happens in the Clinic', tr: 'Ameliyat Günü: Klinikte Neler Oluyor' },
        body: {
          en: `Before anything begins, we complete a full 3D CBCT scan and review your bone structure, nerve positions, and sinus proximity. This takes 20 minutes and removes guesswork from the procedure entirely.

Local anaesthesia is administered. Most patients describe the injection as the only mildly uncomfortable moment of the whole procedure. Once the area is numb — which takes 5–10 minutes — you will feel pressure and movement but no pain. The implant screw placement typically takes 45–60 minutes per implant.

In most cases, a temporary restoration is placed the same day so you are not left with a visible gap. You will be given a prescription for antibiotics (typically amoxicillin for 5 days) and an anti-inflammatory (such as ibuprofen), along with a chlorhexidine mouthwash.

You'll be in the recovery room for 30 minutes, and then your VIP transfer takes you back to your hotel.`,
          tr: `Her şey başlamadan önce tam bir 3D CBCT tarama yapıyor ve kemik yapınızı, sinir konumlarını ve sinüse yakınlığı inceliyoruz. Bu 20 dakika süruyor ve prosedürden tahmini tümüyle kaldırıyor.

Lokal anestezi uygulanıyor. Hastaların çoğu enjeksiyonu tüm işlemin tek hafif rahatsız edici anı olarak tanımlıyor. Bölge uyuştuğunda — 5-10 dakika süruyor — basınç ve hareket hissedeceksiniz ama ağrı yok. İmplant vidası yerleştirme genellikle implant başına 45-60 dakika sürüyor.

Çoğu durumda, aynı gün geçici restorasyon yerleştiriliyor. Antibiyotik (genellikle 5 gün amoksisilin) ve anti-enflamatuar ile klorheksidin gargara reçetesi verilecek.`
        }
      },
      {
        heading: { en: 'Day 1: The Anaesthesia Wears Off', tr: '1. Gün: Anestezi Geçiyor' },
        body: {
          en: `The anaesthesia wears off 3–4 hours after you leave the clinic. This is when discomfort — not pain, in most cases, but genuine discomfort — begins. Take your ibuprofen before it wears off completely rather than waiting until you're uncomfortable.

**What's normal on Day 1:**
- Mild to moderate swelling around the jaw — this is normal and expected
- Some oozing of blood from the implant site for the first few hours — normal
- Soreness in the surrounding gum tissue
- Feeling tired and wanting to rest

**What to eat:** Soft, cold food. Ice cream is genuinely good on Day 1 — the cold reduces swelling. Yoghurt, soup (not too hot), smoothies, mashed potato. Avoid anything that requires biting. Eat on the opposite side of your mouth from the implant.

**What to avoid:** Smoking (significantly impairs healing), alcohol, vigorous rinsing or spitting, hot food or drinks, exercise, touching or probing the implant site with your tongue.

Sleep with your head slightly elevated. Use an extra pillow. This reduces blood pooling and helps with swelling.`,
          tr: `Anestezi klinikten ayrıldıktan 3-4 saat sonra geçiyor. Bu, çoğu vakada ağrı değil ama gerçek bir rahatsızlık olan hissin başladığı an. İbuprofenizi tamamen geçmeden önce, rahatsız hissettikten sonra beklemek yerine önceden alın.

**1. Günde normal olan:** Çene çevresinde hafif-orta şişlik, implant bölgesinden ilk birkaç saat kanama, etraf diş eti dokusunda hassasiyet, dinlenmek isteme hissi.

**Ne yemeli:** Yumuşak, soğuk yiyecekler. Dondurma gerçekten iyi — soğuk şişliği azaltıyor. Yoğurt, çorba (çok sıcak değil), smoothie, püre. İmplantın karşı tarafından yiyin.

**Ne kaçınmalı:** Sigara, alkol, güçlü gargara veya tükürme, sıcak yiyecek/içecek, egzersiz, implant bölgesine dokunmak veya dille yoklamak.`
        }
      },
      {
        heading: { en: 'Days 2–3: Peak Swelling', tr: '2-3. Günler: Maksimum Şişlik' },
        body: {
          en: `Swelling typically peaks on Day 2 and Day 3. This surprises many patients — they feel better on Day 1 and then wake up on Day 2 to find they look like they've been in a minor boxing match. This is entirely normal. It is the body's inflammatory response to the surgery, and it is actually a sign that healing is proceeding correctly.

Apply an ice pack (wrapped in a cloth — never directly on skin) to the outside of your jaw for 20 minutes on, 20 minutes off during Day 1 and Day 2. After 48 hours, switch to warm compresses, which help the body reabsorb the swelling.

**Your routine for Days 2–3:**
- Continue antibiotics and anti-inflammatories as prescribed
- Rinse gently with chlorhexidine mouthwash twice daily, starting 24 hours after surgery
- Maintain soft food diet
- Rest. Kyrenia is beautiful — you'll have time to explore. These days, let your body heal.
- You can shower normally. Avoid submerging your head (swimming, baths) for the first week.`,
          tr: `Şişlik genellikle 2. ve 3. günde zirveye ulaşıyor. Bu birçok hastayı şaşırtıyor — 1. günde daha iyi hissediyorlar, sonra 2. günde sanki küçük bir boks maçından çıkmış gibi görünerek uyanıyorlar. Bu tamamen normal. Vücudun ameliyata karşı enflamatuar yanıtı ve aslında iyileşmenin doğru seyrinde gittiğinin bir işareti.

İlk 2 günde buz paketi uygulayın (bez içine sarılı — asla direkt deri üzerine değil), 20 dakika açık, 20 dakika kapalı. 48 saatten sonra şişliğin emilmesine yardımcı olan ılık kompresöre geçin.

**2-3. Gün rutini:** Antibiyotik ve anti-enflamatuarı devam ettirin. Ameliyattan 24 saat sonra başlayarak klorheksidin gargara ile gentle gargara yapın. Yumuşak gıda diyetini sürdürün. Dinlenin.`
        }
      },
      {
        heading: { en: 'Days 4–5: The Turn', tr: '4-5. Günler: Dönüş Noktası' },
        body: {
          en: `By Day 4, the majority of patients report a significant improvement. The swelling begins to subside, the pain becomes minimal, and energy returns. Most patients on Day 4 or Day 5 are able to get out and walk around Kyrenia's old harbour, visit the castle, or sit at a waterfront café — carefully choosing soft foods from the menu.

You can now introduce slightly more varied soft foods: scrambled eggs, well-cooked pasta, soft fish, tender chicken. Still nothing that requires forceful biting or chewing on the implant side.

**What to watch for — when to contact us:**
- Temperature above 38.5°C (101.3°F)
- Pus or unusual discharge from the implant site
- Pain that is getting worse rather than better after Day 3
- The implant feeling loose or mobile

These are uncommon, but if any occur, contact us immediately on WhatsApp and we will see you the same day.`,
          tr: `4. günde hastaların büyük çoğunluğu önemli bir iyileşme bildiriyor. Şişlik azalmaya başlıyor, ağrı minimal hale geliyor, enerji geri dönüyor. 4. veya 5. günde çoğu hasta Girne'nin eski limanını yürüyerek gezip, kaleyi ziyaret edebilir veya bir sahil kafede oturabilir.

Artık biraz daha çeşitli yumuşak gıdalar ekleyebilirsiniz: omlet, iyi pişmiş makarna, yumuşak balık, yumuşak tavuk.

**Ne zaman bizi aramalısınız:** 38.5°C üzeri ateş, implant bölgesinden irin veya anormal akıntı, 3. günden sonra iyileşmek yerine kötüleşen ağrı, gevşek veya hareketli hissettiren implant. Bunlar nadir ama herhangi biri oluşursa hemen WhatsApp'tan iletişime geçin — aynı gün sizi görürüz.`
        }
      },
      {
        heading: { en: 'Days 6–7: Back to Normal (Almost)', tr: '6-7. Günler: Neredeyse Normale Dönüş' },
        body: {
          en: `By the end of your first week, most single implant patients feel close to normal. There may be some residual tenderness and mild sensitivity, but daily activities are unrestricted. If your treatment included sutures, these will be removed at your Day 7 review appointment.

**Flying home:** Single implant patients can typically fly home 7 days after surgery with no concerns. Flying does not affect osseointegration (the process by which the implant fuses to your jaw bone). Pressure changes are not a risk factor for implant healing.

**The 3–6 month healing phase:** Your implant is now in place, but it is not yet complete. Over the next 3–6 months, your jaw bone grows around and fuses to the implant in a process called osseointegration. During this time, the implant site is protected by your temporary restoration. When you return for your second visit, we fit your permanent crown — and your implant is complete for life.

We are with you every step of that journey. Questions at any point: WhatsApp us.`,
          tr: `İlk haftanın sonunda, tek implant hastalarının çoğu normale yakın hissediyor. Bazı kalıntı hassasiyet olabilir, ancak günlük aktiviteler kısıtlanmıyor. Tedavinizde dikiş varsa, bunlar 7. gün kontrol randevusunda çıkarılacak.

**Eve uçmak:** Tek implant hastaları genellikle ameliyattan 7 gün sonra endişesizce eve uçabilir. Uçmak osseointegrasyon sürecini etkilemez. Basınç değişiklikleri implant iyileşmesi için risk faktörü değil.

**3-6 aylık iyileşme süreci:** İmplantınız artık yerinde, ancak henüz tamamlanmadı. Önümüzdeki 3-6 ay boyunca çene kemiğiniz osseointegrasyon adı verilen süreçte implantın etrafına büyüyüp onu saracak. İkinci ziyaretinizde kalıcı kronunuzu takıyoruz — ve implantınız ömür boyu tamamlanmış oluyor.`
        }
      }
    ]
  }
};
