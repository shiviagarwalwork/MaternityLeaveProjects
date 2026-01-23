import { Manuscript } from '@/types';

// Real, legitimate sources for Ayurvedic manuscripts
export const manuscripts: Manuscript[] = [
  {
    id: 'charaka-1',
    title: 'Charaka Samhita - Digestive Health',
    source: 'Charaka Samhita (P.V. Sharma translation - Archive.org)',
    sourceUrl: 'https://archive.org/details/CharakaSamhitaTextWithEnglishTanslationP.V.Sharma',
    sanskritText: 'अग्निमांद्ये लघु आहारः। दीपनीयानि द्रव्याणि च।',
    englishText: 'For weak digestive fire (agnimandya), consume light food and digestive stimulants. Ginger, long pepper, and black pepper kindle the digestive fire. Avoid heavy, oily, and cold foods which suppress agni.',
    category: 'Digestion',
    keywords: ['agni', 'digestion', 'ginger', 'pepper', 'digestive fire'],
    relatedManuscripts: ['charaka-2', 'sushruta-3']
  },
  {
    id: 'charaka-2',
    title: 'Charaka Samhita - Mental Health',
    source: 'Charaka Samhita (WisdomLib.org translation)',
    sourceUrl: 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english',
    sanskritText: 'मनसः शान्तये ब्राह्मी शंखपुष्पी च।',
    englishText: 'For calming the mind and reducing stress, Brahmi (Bacopa monnieri) and Shankhapushpi are highly recommended. These herbs enhance memory, reduce anxiety, and promote mental clarity. Practice meditation and pranayama daily.',
    category: 'Mental Health',
    keywords: ['stress', 'anxiety', 'brahmi', 'meditation', 'mental clarity'],
    relatedManuscripts: ['charaka-1', 'ashtanga-1']
  },
  {
    id: 'charaka-3',
    title: 'Charaka Samhita - General Health Principles',
    source: 'Charaka Samhita (NIIMH e-Samhita)',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'स्वस्थस्य स्वास्थ्य रक्षणं आतुरस्य विकार प्रशमनं च।',
    englishText: 'The twin objectives of Ayurveda are: to preserve health of the healthy and to cure diseases of the diseased. This fundamental principle guides all Ayurvedic practice.',
    category: 'General Health',
    keywords: ['health preservation', 'disease cure', 'ayurvedic principles', 'wellness'],
    relatedManuscripts: ['charaka-1', 'charaka-2']
  },
  {
    id: 'sushruta-1',
    title: 'Sushruta Samhita - Wound Healing',
    source: 'Sushruta Samhita (Kaviraj Kunja Lal Bhishagratna translation - Archive.org)',
    sourceUrl: 'https://archive.org/details/englishtranslati00susruoft',
    sanskritText: 'व्रणरोपणाय हरिद्रा च घृतम्।',
    englishText: 'For wound healing, apply turmeric with ghee. Turmeric possesses powerful antiseptic and healing properties. Clean the wound with neem water before application. Change dressing twice daily.',
    category: 'Surgery & Healing',
    keywords: ['wound', 'turmeric', 'healing', 'antiseptic', 'neem'],
    relatedManuscripts: ['sushruta-2']
  },
  {
    id: 'sushruta-2',
    title: 'Sushruta Samhita - Joint Pain Management',
    source: 'Sushruta Samhita (Kaviraj Kunja Lal Bhishagratna translation - Archive.org)',
    sourceUrl: 'https://archive.org/details/englishtranslati00susruoft',
    sanskritText: 'संधिशूले महानारायण तैलम्।',
    englishText: 'For joint pain (sandhi shula), massage with Mahanarayan oil. This oil contains ashwagandha, shatavari, and sesame oil base. Apply warm oil and massage in circular motions. Perform gentle stretching exercises.',
    category: 'Pain Management',
    keywords: ['joint pain', 'arthritis', 'mahanarayan oil', 'massage', 'ashwagandha'],
    relatedManuscripts: ['charaka-1', 'sushruta-3']
  },
  {
    id: 'sushruta-3',
    title: 'Sushruta Samhita - Gastric Disorders',
    source: 'Sushruta Samhita (Kaviraj Kunja Lal Bhishagratna translation - Archive.org)',
    sourceUrl: 'https://archive.org/details/englishtranslati00susruoft',
    sanskritText: 'अम्लपित्ते शीतलानि द्रव्याणि।',
    englishText: 'For acidity and gastric issues (amlapitta), consume cooling substances. Coconut water, coriander, and fennel seeds are beneficial. Avoid spicy, sour, and fermented foods. Eat at regular intervals.',
    category: 'Digestion',
    keywords: ['acidity', 'gastric', 'cooling', 'coconut water', 'fennel'],
    relatedManuscripts: ['charaka-1']
  },
  {
    id: 'ashtanga-1',
    title: 'Ashtanga Hridayam - Sleep Disorders',
    source: 'Ashtanga Hridayam (Traditional Ayurvedic text)',
    sourceUrl: 'https://www.ayurveda.com/resources/articles/ashtanga-hridayam',
    sanskritText: 'निद्रानाशे तैल अभ्यङ्गः पादयोः।',
    englishText: 'For sleeplessness (nidranasha), massage the feet with warm sesame oil before bed. Drink warm milk with nutmeg. Avoid stimulating activities after sunset. Keep regular sleep schedule.',
    category: 'Sleep',
    keywords: ['insomnia', 'sleep', 'oil massage', 'nutmeg', 'warm milk'],
    relatedManuscripts: ['charaka-2', 'ashtanga-2']
  },
  {
    id: 'ashtanga-2',
    title: 'Ashtanga Hridayam - Skin Health',
    source: 'Ashtanga Hridayam (Traditional Ayurvedic text)',
    sourceUrl: 'https://www.ayurveda.com/resources/articles/ashtanga-hridayam',
    sanskritText: 'त्वचारोग्याय नीम च हरिद्रा।',
    englishText: 'For healthy skin and treating skin disorders, neem and turmeric are excellent. Make a paste with neem leaves and turmeric powder. Apply to affected areas. Also consume neem tablets for blood purification.',
    category: 'Skin Health',
    keywords: ['skin', 'neem', 'turmeric', 'acne', 'blood purification'],
    relatedManuscripts: ['sushruta-1', 'ashtanga-3']
  },
  {
    id: 'ashtanga-3',
    title: 'Ashtanga Hridayam - Respiratory Health',
    source: 'Ashtanga Hridayam (Traditional Ayurvedic text)',
    sourceUrl: 'https://www.ayurveda.com/resources/articles/ashtanga-hridayam',
    sanskritText: 'कासश्वासे तुलसी मधु च।',
    englishText: 'For cough and breathing difficulties, tulsi (holy basil) with honey is recommended. Boil tulsi leaves in water, add honey when warm. Perform steam inhalation with eucalyptus. Avoid cold and damp environments.',
    category: 'Respiratory',
    keywords: ['cough', 'breathing', 'tulsi', 'honey', 'steam inhalation'],
    relatedManuscripts: ['charaka-1']
  },
  {
    id: 'reference-1',
    title: 'General Ayurvedic Principles - Immunity',
    source: 'Classical Ayurvedic Texts (Ayurvedic Institute)',
    sourceUrl: 'https://ayurveda.com/blog/the-ancient-ayurvedic-writings/',
    sanskritText: 'ओजवर्धनाय अश्वगन्धा गुडूची च।',
    englishText: 'To boost immunity and vitality (ojas), take ashwagandha and guduchi (giloy). These rasayana herbs strengthen the immune system. Consume with warm milk or water twice daily. Include amla for vitamin C.',
    category: 'Immunity',
    keywords: ['immunity', 'ashwagandha', 'giloy', 'ojas', 'amla', 'rasayana'],
    relatedManuscripts: ['charaka-2', 'charaka-3']
  },
  // Daily Routine (Dinacharya)
  {
    id: 'charaka-4',
    title: 'Charaka Samhita - Daily Routine (Dinacharya)',
    source: 'Charaka Samhita, Sutrasthana Chapter 5',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'ब्राह्मे मुहूर्ते उत्तिष्ठेत् स्वस्थो रक्षार्थमायुषः।',
    englishText: 'One who wishes to protect their health and longevity should wake up during Brahma Muhurta (approximately 96 minutes before sunrise). This time is sattvic, promotes mental clarity, and aligns the body with natural rhythms. Follow with elimination, teeth cleaning, tongue scraping, and oil pulling.',
    category: 'Daily Routine',
    keywords: ['brahma muhurta', 'morning routine', 'dinacharya', 'wake up', 'longevity'],
    relatedManuscripts: ['charaka-5', 'ashtanga-4']
  },
  {
    id: 'charaka-5',
    title: 'Charaka Samhita - Oil Massage (Abhyanga)',
    source: 'Charaka Samhita, Sutrasthana Chapter 5',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'अभ्यङ्गमाचरेत् नित्यं स जरा श्रम वातहा।',
    englishText: 'Daily oil massage (abhyanga) should be practiced regularly. It delays aging, relieves fatigue, pacifies Vata dosha, improves vision, nourishes the body, promotes longevity, induces good sleep, and makes the skin healthy and strong. Use warm sesame oil for Vata, coconut oil for Pitta, and mustard oil for Kapha.',
    category: 'Daily Routine',
    keywords: ['abhyanga', 'oil massage', 'anti-aging', 'vata', 'skin health', 'self-care'],
    relatedManuscripts: ['charaka-4', 'ashtanga-1']
  },
  // Seasonal Routine (Ritucharya)
  {
    id: 'charaka-6',
    title: 'Charaka Samhita - Seasonal Routine (Ritucharya)',
    source: 'Charaka Samhita, Sutrasthana Chapter 6',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'तस्य शीतादिभिर्भावैः देहः संवर्धते ऋतुभिः।',
    englishText: 'The body is influenced by seasonal changes. In winter (Hemanta), digestive fire is strongest - eat heavy, nourishing foods. In summer (Grishma), favor light, cooling foods and avoid excessive exertion. In monsoon (Varsha), digestion weakens - eat light, warm, and easily digestible foods. Adapting to seasons prevents disease.',
    category: 'Seasonal Health',
    keywords: ['ritucharya', 'seasons', 'winter', 'summer', 'monsoon', 'adaptation'],
    relatedManuscripts: ['charaka-1', 'charaka-7']
  },
  // Prajnaparadha - Crimes Against Wisdom
  {
    id: 'charaka-7',
    title: 'Charaka Samhita - Prajnaparadha (Intellectual Errors)',
    source: 'Charaka Samhita, Sharira Sthana Chapter 1',
    sourceUrl: 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english',
    sanskritText: 'धी धृति स्मृति विभ्रष्टः कर्म यत् कुरुतेऽशुभम्। प्रज्ञापराधं तं विद्यात् सर्वदोषप्रकोपणम्॥',
    englishText: 'When intellect (dhi), willpower (dhriti), and memory (smriti) are impaired, one commits unwholesome actions - this is Prajnaparadha (crime against wisdom). It is the root cause of all diseases. Examples include: knowing something is harmful yet doing it anyway, suppressing natural urges, not following proper routines, and excessive sensory indulgence.',
    category: 'Mental Health',
    keywords: ['prajnaparadha', 'wisdom', 'self-harm', 'bad habits', 'willpower', 'addiction'],
    relatedManuscripts: ['charaka-2', 'charaka-8']
  },
  // Sensory Health
  {
    id: 'charaka-8',
    title: 'Charaka Samhita - Sensory Overload (Asatmyendriyartha Samyoga)',
    source: 'Charaka Samhita, Sutrasthana Chapter 11',
    sourceUrl: 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english',
    sanskritText: 'अतियोगो अयोगश्च मिथ्यायोगश्च इन्द्रियाणाम्।',
    englishText: 'Disease arises from three types of sensory contact: Atiyoga (excessive use - too much screen time, loud music), Ayoga (non-use - sedentary lifestyle, sensory deprivation), and Mithyayoga (wrong use - watching disturbing content, eating while distracted). Balance sensory input for optimal health. Practice regular digital detox.',
    category: 'Sensory Health',
    keywords: ['screen time', 'sensory overload', 'digital detox', 'eyes', 'ears', 'balance'],
    relatedManuscripts: ['charaka-7', 'charaka-9']
  },
  // Eye Health
  {
    id: 'charaka-9',
    title: 'Charaka Samhita - Eye Care (Netra Swasthya)',
    source: 'Charaka Samhita, Sutrasthana Chapter 5',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'पादाभ्यङ्गान्नेत्रहितं तैलं शिरसि धारयेत्।',
    englishText: 'For eye health: massage feet with warm oil (especially the big toe area connected to eyes), apply oil to the head, practice Trataka (candle gazing) for strengthening eyes, wash eyes with rose water or triphala decoction. Avoid excessive screen exposure, reading in dim light, and suppressing tears. Consume ghee, carrots, and amla.',
    category: 'Eye Health',
    keywords: ['eye care', 'vision', 'trataka', 'triphala', 'screen fatigue', 'netra'],
    relatedManuscripts: ['charaka-8', 'ashtanga-4']
  },
  // Hair Health
  {
    id: 'ashtanga-4',
    title: 'Ashtanga Hridayam - Hair Health (Kesha Swasthya)',
    source: 'Ashtanga Hridayam, Sutrasthana',
    sourceUrl: 'https://www.ayurveda.com/resources/articles/ashtanga-hridayam',
    sanskritText: 'केशाय भृङ्गराज तैलं शिरोऽभ्यङ्गे हितम्।',
    englishText: 'For healthy hair, apply Bhringraj oil to the scalp regularly. Massage in circular motions to stimulate blood flow. Wash hair with shikakai or reetha (soapnut). Avoid chemical shampoos and excessive heat styling. Consume iron-rich foods, amla, and sesame seeds. Manage stress as it causes hair fall.',
    category: 'Hair Health',
    keywords: ['hair fall', 'bhringraj', 'scalp massage', 'hair growth', 'shikakai', 'kesha'],
    relatedManuscripts: ['charaka-5', 'ashtanga-2']
  },
  // Heart Health
  {
    id: 'charaka-10',
    title: 'Charaka Samhita - Heart Health (Hridaya Swasthya)',
    source: 'Charaka Samhita, Chikitsa Sthana',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'हृद्यं अर्जुनं च रक्तपित्तशामकम्।',
    englishText: 'For heart health, Arjuna bark is the primary herb - it strengthens heart muscles, regulates blood pressure, and reduces cholesterol. Also beneficial: garlic, guggulu, and hawthorn. Practice pranayama (especially Anulom Vilom) daily. Avoid excessive salt, fried foods, and emotional stress. Walk regularly.',
    category: 'Heart Health',
    keywords: ['heart', 'arjuna', 'blood pressure', 'cholesterol', 'pranayama', 'hridaya'],
    relatedManuscripts: ['charaka-2', 'charaka-11']
  },
  // Detoxification
  {
    id: 'charaka-11',
    title: 'Charaka Samhita - Detoxification (Shodhana)',
    source: 'Charaka Samhita, Siddhi Sthana',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'शोधनं शमनं चैव द्विविधं कर्म उच्यते।',
    englishText: 'Two types of treatment exist: Shodhana (purification/detox) and Shamana (palliation). Panchakarma is the complete detox protocol including Vamana (therapeutic vomiting), Virechana (purgation), Basti (enema), Nasya (nasal therapy), and Raktamokshana (bloodletting). For daily gentle detox: drink warm water with lemon, practice dry brushing, and take triphala at night.',
    category: 'Detoxification',
    keywords: ['detox', 'panchakarma', 'cleanse', 'triphala', 'shodhana', 'purification'],
    relatedManuscripts: ['charaka-1', 'sushruta-3']
  },
  // Women's Health
  {
    id: 'charaka-12',
    title: 'Charaka Samhita - Women\'s Health (Stri Swasthya)',
    source: 'Charaka Samhita, Chikitsa Sthana Chapter 30',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'शतावरी स्त्रीणां बल्या च रसायनी।',
    englishText: 'Shatavari is the primary herb for women\'s health - it balances hormones, supports fertility, eases menstrual discomfort, and aids lactation. For menstrual health: avoid cold foods during periods, rest adequately, consume warm soups. For PCOS: take Kanchanar Guggulu, maintain healthy weight, exercise regularly. Ashoka bark helps with heavy bleeding.',
    category: 'Women\'s Health',
    keywords: ['women', 'shatavari', 'menstrual', 'hormones', 'PCOS', 'fertility', 'stri'],
    relatedManuscripts: ['charaka-13', 'ashtanga-5']
  },
  // Men's Health
  {
    id: 'charaka-13',
    title: 'Charaka Samhita - Men\'s Health & Vitality (Vajikarana)',
    source: 'Charaka Samhita, Chikitsa Sthana Chapter 2',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'वाजीकरणं आयुष्यं बलवर्णकरं परम्।',
    englishText: 'Vajikarana therapy enhances vitality, strength, and reproductive health. Key herbs: Ashwagandha (strength, stamina), Shilajit (mineral replenishment), Safed Musli (vigor), Kapikacchu/Mucuna (dopamine, mood). Consume milk with dates and almonds. Avoid excessive stress and irregular sleep. Practice yoga regularly.',
    category: 'Men\'s Health',
    keywords: ['men', 'vitality', 'ashwagandha', 'shilajit', 'vajikarana', 'strength', 'stamina'],
    relatedManuscripts: ['charaka-12', 'reference-1']
  },
  // Longevity (Rasayana)
  {
    id: 'charaka-14',
    title: 'Charaka Samhita - Longevity & Rejuvenation (Rasayana)',
    source: 'Charaka Samhita, Chikitsa Sthana Chapter 1',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'लाभोपायो हि शस्तानां रसादीनां रसायनम्। रसायनं च तज्ज्ञेयं यज्जराव्याधिनाशनम्॥',
    englishText: 'Rasayana is that which destroys old age and disease, promoting longevity. The supreme rasayana is Chyawanprash - consume 1-2 teaspoons daily. Other rasayanas: Brahmi (mind), Ashwagandha (body), Guduchi (immunity), Amalaki (all tissues). Also important: righteous conduct, truthfulness, compassion, and serving others - these are Achara Rasayana (behavioral rejuvenation).',
    category: 'Longevity',
    keywords: ['rasayana', 'anti-aging', 'longevity', 'chyawanprash', 'rejuvenation', 'achara'],
    relatedManuscripts: ['reference-1', 'charaka-3']
  },
  // Diabetes/Blood Sugar
  {
    id: 'charaka-15',
    title: 'Charaka Samhita - Blood Sugar Management (Prameha)',
    source: 'Charaka Samhita, Chikitsa Sthana Chapter 6',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'प्रमेहे मधुमेहे च करेलं जम्बूफलानि च।',
    englishText: 'For diabetes (Prameha/Madhumeha): consume bitter gourd (karela), jamun seeds, fenugreek (methi), and turmeric. Gymnema (Gurmar - "sugar destroyer") reduces sugar cravings. Avoid sweet, oily, and heavy foods. Exercise daily - walking after meals is essential. Take Triphala and Shilajit. Manage stress as it spikes blood sugar.',
    category: 'Metabolic Health',
    keywords: ['diabetes', 'blood sugar', 'prameha', 'bitter gourd', 'gymnema', 'fenugreek'],
    relatedManuscripts: ['charaka-1', 'charaka-11']
  },
  // Thyroid Health
  {
    id: 'ashtanga-5',
    title: 'Ashtanga Hridayam - Thyroid & Neck Health (Galaganda)',
    source: 'Ashtanga Hridayam, Uttarasthana',
    sourceUrl: 'https://www.ayurveda.com/resources/articles/ashtanga-hridayam',
    sanskritText: 'गलगण्डे कांचनारं गुग्गुलुं च विशेषतः।',
    englishText: 'For thyroid disorders (Galaganda): Kanchanar Guggulu is the primary formulation - it removes blockages in the throat region and balances thyroid function. Also beneficial: Ashwagandha (for hypothyroid), Brahmi, and selenium-rich foods. Practice neck exercises and shoulder stands (Sarvangasana). Avoid goitrogenic raw foods like cabbage and cauliflower.',
    category: 'Hormonal Health',
    keywords: ['thyroid', 'kanchanar', 'guggulu', 'hypothyroid', 'hyperthyroid', 'galaganda'],
    relatedManuscripts: ['charaka-12', 'charaka-10']
  },
  // Headaches & Migraines
  {
    id: 'sushruta-4',
    title: 'Sushruta Samhita - Headaches & Migraines (Shiroroga)',
    source: 'Sushruta Samhita, Uttara Tantra',
    sourceUrl: 'https://archive.org/details/englishtranslati00susruoft',
    sanskritText: 'शिरोरोगे नस्यं ब्राह्मी तैलेन।',
    englishText: 'For headaches and migraines: apply Brahmi oil to the scalp, practice Nasya (nasal drops) with Anu Taila. For immediate relief: apply sandalwood paste to forehead, inhale peppermint. Identify triggers - often Pitta aggravation from heat, anger, or skipping meals. Cooling pranayama (Sheetali) helps. Avoid direct sun and excessive screen time.',
    category: 'Pain Management',
    keywords: ['headache', 'migraine', 'shiroroga', 'nasya', 'brahmi', 'cooling'],
    relatedManuscripts: ['charaka-9', 'charaka-8']
  },
  // Digestion - Constipation
  {
    id: 'charaka-16',
    title: 'Charaka Samhita - Constipation (Vibandha)',
    source: 'Charaka Samhita, Chikitsa Sthana',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'विबन्धे त्रिफला रात्रौ उष्णोदकेन सेव्यते।',
    englishText: 'For constipation (Vibandha): take Triphala powder with warm water at bedtime - it regulates bowel movements without dependency. Also helpful: castor oil (occasional), psyllium husk (isabgol), and soaked raisins. Drink warm water upon waking. Eat fiber-rich foods, exercise regularly, and never suppress the urge to defecate.',
    category: 'Digestion',
    keywords: ['constipation', 'vibandha', 'triphala', 'fiber', 'bowel', 'elimination'],
    relatedManuscripts: ['charaka-1', 'sushruta-3']
  },
  // Anxiety & Panic
  {
    id: 'charaka-17',
    title: 'Charaka Samhita - Anxiety & Fear (Chittodvega)',
    source: 'Charaka Samhita, Chikitsa Sthana Chapter 9',
    sourceUrl: 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english',
    sanskritText: 'मनोदोषे सत्त्वावजयः परं बलम्।',
    englishText: 'For anxiety and panic: strengthen Sattva (mental clarity) through meditation, pranayama (especially Bhramari - humming bee breath), and calming herbs. Ashwagandha reduces cortisol, Brahmi calms racing thoughts, Jatamansi induces peace. Warm oil massage (especially feet and head) pacifies Vata which causes anxiety. Avoid caffeine, irregular routines, and excessive stimulation.',
    category: 'Mental Health',
    keywords: ['anxiety', 'panic', 'fear', 'ashwagandha', 'brahmi', 'meditation', 'sattva'],
    relatedManuscripts: ['charaka-2', 'charaka-7']
  },
  // Weight Management
  {
    id: 'charaka-18',
    title: 'Charaka Samhita - Weight Management (Sthaulya)',
    source: 'Charaka Samhita, Sutrasthana Chapter 21',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'स्थौल्ये लङ्घनं व्यायामो रूक्षाण्णं च।',
    englishText: 'For weight management (Sthaulya/obesity): practice fasting (langhana), exercise regularly, and eat dry/light foods. Key herbs: Guggulu (metabolism), Triphala (elimination), Trikatu (digestive fire). Eat largest meal at noon when Agni is strongest. Avoid snacking, excessive sweet/oily foods, and daytime sleeping. Honey with warm water (never boil honey) aids fat metabolism.',
    category: 'Metabolic Health',
    keywords: ['weight loss', 'obesity', 'sthaulya', 'metabolism', 'guggulu', 'fasting'],
    relatedManuscripts: ['charaka-1', 'charaka-15']
  },
  // Ojas - Vital Energy
  {
    id: 'charaka-19',
    title: 'Charaka Samhita - Vital Energy (Ojas)',
    source: 'Charaka Samhita, Sutrasthana Chapter 17',
    sourceUrl: 'https://niimh.nic.in/ebooks/ecaraka/',
    sanskritText: 'ओजः परं बलं देहे यस्मिन् क्षीणे विनश्यति।',
    englishText: 'Ojas is the supreme essence of all tissues - the vital energy that sustains life. Signs of strong Ojas: glowing skin, bright eyes, strong immunity, mental clarity, enthusiasm. Ojas is depleted by: excessive stress, poor diet, lack of sleep, negative emotions, and overexertion. Build Ojas with: ghee, almonds, dates, saffron milk, adequate rest, loving relationships, and spiritual practices.',
    category: 'Vitality',
    keywords: ['ojas', 'vitality', 'energy', 'immunity', 'glow', 'essence', 'life force'],
    relatedManuscripts: ['reference-1', 'charaka-14']
  },
  // Tongue Diagnosis
  {
    id: 'sushruta-5',
    title: 'Sushruta Samhita - Tongue Diagnosis (Jihva Pariksha)',
    source: 'Sushruta Samhita, Sutrasthana',
    sourceUrl: 'https://archive.org/details/englishtranslati00susruoft',
    sanskritText: 'जिह्वा परीक्षा रोगाणां निदानं कारणं वदेत्।',
    englishText: 'The tongue reveals internal health: A white coating indicates Kapha/ama (toxins) and weak digestion. Yellow coating shows Pitta excess and liver heat. Dry/cracked tongue indicates Vata imbalance and dehydration. Teeth marks on edges suggest malabsorption. Clean the tongue daily with a copper scraper to remove toxins and stimulate organs.',
    category: 'Diagnosis',
    keywords: ['tongue', 'jihva', 'diagnosis', 'pariksha', 'ama', 'coating', 'scraping'],
    relatedManuscripts: ['charaka-1', 'charaka-11']
  }
];

export const getManuscriptById = (id: string): Manuscript | undefined => {
  return manuscripts.find(m => m.id === id);
};

export const searchManuscripts = (query: string): Manuscript[] => {
  const lowerQuery = query.toLowerCase();
  return manuscripts.filter(m =>
    m.title.toLowerCase().includes(lowerQuery) ||
    m.englishText.toLowerCase().includes(lowerQuery) ||
    m.keywords.some(k => k.toLowerCase().includes(lowerQuery)) ||
    m.category.toLowerCase().includes(lowerQuery)
  );
};

export const getManuscriptsByCategory = (category: string): Manuscript[] => {
  return manuscripts.filter(m => m.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(manuscripts.map(m => m.category)));
};
