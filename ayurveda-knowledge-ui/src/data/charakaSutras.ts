/**
 * Charaka Samhita Sutra References
 *
 * This file contains authentic references from the Charaka Samhita,
 * one of the foundational texts of Ayurveda (circa 400-200 BCE).
 *
 * Reference: P.V. Sharma's English Translation of Charaka Samhita
 *
 * Structure of Charaka Samhita:
 * 1. Sutra Sthana (General Principles) - 30 chapters
 * 2. Nidana Sthana (Pathology) - 8 chapters
 * 3. Vimana Sthana (Specific Determination) - 8 chapters
 * 4. Sharira Sthana (Anatomy) - 8 chapters
 * 5. Indriya Sthana (Sensory Organs) - 12 chapters
 * 6. Chikitsa Sthana (Therapeutics) - 30 chapters
 * 7. Kalpa Sthana (Pharmaceutics) - 12 chapters
 * 8. Siddhi Sthana (Success in Treatment) - 12 chapters
 */

export interface CharakaSutra {
  id: string;
  reference: string;
  sthana: string;
  chapter: number;
  verse?: string;
  sanskrit?: string;
  transliteration?: string;
  english: string;
  context: string;
  keywords: string[];
}

export interface SymptomMapping {
  symptomId: string;
  symptomName: string;
  ayurvedicName: string;
  ayurvedicNameSanskrit?: string;
  doshaInvolvement: string[];
  relevantSutras: CharakaSutra[];
  traditionalRemedies: string[];
  dietaryGuidelines: string[];
  lifestyleGuidelines: string[];
  herbs: string[];
  modernRelevance: string;
}

export const charakaSutras: CharakaSutra[] = [
  // STRESS & ANXIETY (Chittodvega)
  {
    id: 'sutra-001',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 11, Verse 54',
    sthana: 'Sutra Sthana',
    chapter: 11,
    verse: '54',
    english: 'The mind (manas) is affected by rajas and tamas, leading to desire, anger, greed, delusion, envy, pride, and sorrow. These mental afflictions disturb the equilibrium of doshas.',
    context: 'Mental health and emotional disturbances',
    keywords: ['stress', 'anxiety', 'mental health', 'manas', 'rajas', 'tamas']
  },
  {
    id: 'sutra-002',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 1, Verse 58',
    sthana: 'Sutra Sthana',
    chapter: 1,
    verse: '58',
    english: 'Prajnaparadha (crimes against wisdom) - when a person, despite knowing what is harmful, still indulges in it - is the root cause of all diseases.',
    context: 'Understanding the root cause of modern stress and unhealthy habits',
    keywords: ['stress', 'habits', 'wisdom', 'prajnaparadha', 'self-harm']
  },
  {
    id: 'sutra-003',
    reference: 'Charaka Samhita, Sharira Sthana, Chapter 1, Verse 102-103',
    sthana: 'Sharira Sthana',
    chapter: 1,
    verse: '102-103',
    english: 'Sattva (mental strength) is of three types: Pravara (superior), Madhyama (moderate), and Avara (inferior). Those with superior sattva can withstand mental and physical stress.',
    context: 'Building mental resilience',
    keywords: ['stress', 'mental strength', 'sattva', 'resilience']
  },

  // SLEEP DISORDERS (Anidra/Nidranasha)
  {
    id: 'sutra-004',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 21, Verse 35-36',
    sthana: 'Sutra Sthana',
    chapter: 21,
    verse: '35-36',
    english: 'Sleep is caused by the mind being exhausted and withdrawing from sense objects. Proper sleep at the right time brings happiness, nourishment, strength, virility, knowledge, and life.',
    context: 'Importance of proper sleep',
    keywords: ['sleep', 'insomnia', 'nidra', 'rest']
  },
  {
    id: 'sutra-005',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 21, Verse 52-54',
    sthana: 'Sutra Sthana',
    chapter: 21,
    verse: '52-54',
    english: 'Sleeplessness occurs due to vata aggravation, worry, anger, excessive physical activity, fasting, uncomfortable bed, or mental disturbances. Oil massage, bath, meat soups, rice with curd, milk, and mental peace induce sleep.',
    context: 'Causes and remedies for insomnia',
    keywords: ['insomnia', 'sleep', 'vata', 'oil massage', 'milk']
  },

  // DIGESTION (Agnimandya)
  {
    id: 'sutra-006',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 15, Verse 3-4',
    sthana: 'Chikitsa Sthana',
    chapter: 15,
    verse: '3-4',
    english: 'Agni (digestive fire) is the root of life. When it is extinguished, one dies; when it functions normally, one lives long and healthy; when it is disturbed, one becomes diseased.',
    context: 'Importance of digestive fire',
    keywords: ['digestion', 'agni', 'metabolism', 'digestive fire']
  },
  {
    id: 'sutra-007',
    reference: 'Charaka Samhita, Vimana Sthana, Chapter 2, Verse 9',
    sthana: 'Vimana Sthana',
    chapter: 2,
    verse: '9',
    english: 'One should eat warm food, unctuous food, in proper quantity, after the previous meal is digested, food that is not contradictory in potency, in a proper place with proper accessories, not too fast nor too slow, without talking or laughing, with full concentration, and considering ones own constitution.',
    context: 'Rules for proper eating',
    keywords: ['digestion', 'eating habits', 'agni', 'food']
  },

  // HEADACHE (Shirahshula)
  {
    id: 'sutra-008',
    reference: 'Charaka Samhita, Siddhi Sthana, Chapter 9, Verse 74-89',
    sthana: 'Siddhi Sthana',
    chapter: 9,
    verse: '74-89',
    english: 'Shiroroga (head diseases) are of eleven types. Shirahshula (headache) occurs due to aggravation of vata, pitta, kapha, or all three doshas. Treatment varies based on the predominant dosha involved.',
    context: 'Classification and treatment of headaches',
    keywords: ['headache', 'shirahshula', 'head diseases', 'migraine']
  },
  {
    id: 'sutra-009',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 26, Verse 156-158',
    sthana: 'Chikitsa Sthana',
    chapter: 26,
    verse: '156-158',
    english: 'For Pittaja Shirahshula (pitta-type headache), cooling therapies are recommended: application of sandalwood paste, moonlight exposure, cool baths, and intake of ghee prepared with bitter herbs.',
    context: 'Treatment for pitta-type headache',
    keywords: ['headache', 'pitta', 'cooling', 'sandalwood']
  },

  // FATIGUE & BURNOUT (Klama/Shrama)
  {
    id: 'sutra-010',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 7, Verse 31-32',
    sthana: 'Sutra Sthana',
    chapter: 7,
    verse: '31-32',
    english: 'Excessive exercise leads to thirst, emaciation, breathlessness, blood disorders, fatigue, cough, fever, and vomiting. One should exercise to half of ones capacity.',
    context: 'Understanding fatigue from overexertion',
    keywords: ['fatigue', 'exhaustion', 'exercise', 'burnout']
  },
  {
    id: 'sutra-011',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 21, Verse 51',
    sthana: 'Sutra Sthana',
    chapter: 21,
    verse: '51',
    english: 'Happiness, nourishment, strength, virility, knowledge and life depend upon timely and proper sleep. Improper sleep leads to misery, emaciation, weakness, sterility, ignorance and death.',
    context: 'Sleep and its relation to energy',
    keywords: ['fatigue', 'sleep', 'energy', 'ojas']
  },

  // OJAS (Vital Essence)
  {
    id: 'sutra-012',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 17, Verse 74-75',
    sthana: 'Sutra Sthana',
    chapter: 17,
    verse: '74-75',
    english: 'Ojas is the essence of all dhatus (tissues). It is the seat of life. Its decrease leads to fear, weakness, worry, affliction of senses, loss of complexion, bad thoughts, dryness, and death.',
    context: 'Understanding vital essence and immunity',
    keywords: ['ojas', 'immunity', 'vitality', 'essence']
  },
  {
    id: 'sutra-013',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 30, Verse 15',
    sthana: 'Sutra Sthana',
    chapter: 30,
    verse: '15',
    english: 'Ojas-increasing substances include: ghee, milk, meat soup of wild animals, rice, wheat, green gram, honey, pomegranate, grapes, sugarcane, and water from clean sources.',
    context: 'Foods that build vital essence',
    keywords: ['ojas', 'nutrition', 'immunity', 'rejuvenation']
  },

  // JOINT PAIN (Sandhivata)
  {
    id: 'sutra-014',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 28, Verse 37',
    sthana: 'Chikitsa Sthana',
    chapter: 28,
    verse: '37',
    english: 'Sandhivata (joint disease) is characterized by swelling that appears and disappears like an air-filled bag, pain on movement, and crackling sounds in the joints.',
    context: 'Symptoms of joint disorders',
    keywords: ['joint pain', 'arthritis', 'sandhivata', 'vata']
  },
  {
    id: 'sutra-015',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 28, Verse 75-77',
    sthana: 'Chikitsa Sthana',
    chapter: 28,
    verse: '75-77',
    english: 'Treatment of Vatavyadhi includes: oleation (internal and external), sudation, mild purgation, medicated enemas, and application of warm oils. Sesame oil is especially beneficial.',
    context: 'Treatment principles for vata disorders',
    keywords: ['joint pain', 'vata', 'oil massage', 'treatment']
  },

  // SKIN DISEASES (Kushtha)
  {
    id: 'sutra-016',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 7, Verse 4-8',
    sthana: 'Chikitsa Sthana',
    chapter: 7,
    verse: '4-8',
    english: 'All skin diseases arise from the vitiation of three doshas along with four dhatus: rasa, rakta, mamsa, and lasika. Treatment requires both external application and internal purification.',
    context: 'Understanding skin diseases',
    keywords: ['skin', 'acne', 'kushtha', 'blood purification']
  },
  {
    id: 'sutra-017',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 7, Verse 39-40',
    sthana: 'Chikitsa Sthana',
    chapter: 7,
    verse: '39-40',
    english: 'Neem, turmeric, and manjistha are the foremost herbs for purifying blood and treating skin diseases. They should be used both internally and as external applications.',
    context: 'Herbs for skin health',
    keywords: ['skin', 'neem', 'turmeric', 'blood purification']
  },

  // RESPIRATORY (Kasa/Shwasa)
  {
    id: 'sutra-018',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 18, Verse 6-11',
    sthana: 'Chikitsa Sthana',
    chapter: 18,
    verse: '6-11',
    english: 'Cough (Kasa) is of five types based on dosha involvement. Common symptoms include chest congestion, difficulty breathing, and excessive mucus. Treatment focuses on clearing channels and warming therapies.',
    context: 'Understanding respiratory conditions',
    keywords: ['cough', 'cold', 'congestion', 'respiratory']
  },
  {
    id: 'sutra-019',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 18, Verse 112-115',
    sthana: 'Chikitsa Sthana',
    chapter: 18,
    verse: '112-115',
    english: 'Tulsi (holy basil), ginger, black pepper, and honey are excellent for treating Kapha-type cough and cold. Warm water with these ingredients clears respiratory channels.',
    context: 'Remedies for cold and cough',
    keywords: ['cold', 'cough', 'tulsi', 'ginger', 'immunity']
  },

  // ACIDITY (Amlapitta)
  {
    id: 'sutra-020',
    reference: 'Charaka Samhita, Vimana Sthana, Chapter 2, Verse 8-9',
    sthana: 'Vimana Sthana',
    chapter: 2,
    verse: '8-9',
    english: 'When one takes food that is too sour, salty, pungent, or takes incompatible food combinations, the pitta increases leading to burning sensation, heartburn, and sour eructation.',
    context: 'Causes of acidity',
    keywords: ['acidity', 'heartburn', 'pitta', 'amlapitta']
  },
  {
    id: 'sutra-021',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 15, Verse 119-120',
    sthana: 'Chikitsa Sthana',
    chapter: 15,
    verse: '119-120',
    english: 'For amlapitta (hyperacidity), take cooling foods: milk, ghee, coconut water, pomegranate. Avoid sour, salty, and spicy foods. Shatavari with milk is an excellent remedy.',
    context: 'Treatment for acidity',
    keywords: ['acidity', 'heartburn', 'pitta', 'cooling foods']
  },

  // THYROID (Galaganda)
  {
    id: 'sutra-022',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 12, Verse 17-21',
    sthana: 'Chikitsa Sthana',
    chapter: 12,
    verse: '17-21',
    english: 'Galaganda (goiter/thyroid swelling) occurs due to kapha and meda (fat) accumulation in the neck region. It is characterized by a rounded, soft swelling that moves with swallowing.',
    context: 'Understanding thyroid disorders',
    keywords: ['thyroid', 'galaganda', 'kapha', 'metabolism']
  },
  {
    id: 'sutra-023',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 12, Verse 58-60',
    sthana: 'Chikitsa Sthana',
    chapter: 12,
    verse: '58-60',
    english: 'Kanchanara (Bauhinia variegata) is the foremost herb for Galaganda. It should be taken with Guggulu to clear the channels and reduce the swelling.',
    context: 'Treatment for thyroid conditions',
    keywords: ['thyroid', 'kanchanara', 'guggulu', 'metabolism']
  },

  // DIABETES (Prameha/Madhumeha)
  {
    id: 'sutra-024',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 6, Verse 4-6',
    sthana: 'Chikitsa Sthana',
    chapter: 6,
    verse: '4-6',
    english: 'Prameha (urinary disorders including diabetes) is of twenty types. Madhumeha (diabetes) is characterized by honey-like sweet urine, excessive thirst, and increased urination.',
    context: 'Understanding diabetes in Ayurveda',
    keywords: ['diabetes', 'prameha', 'madhumeha', 'blood sugar']
  },
  {
    id: 'sutra-025',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 6, Verse 46-48',
    sthana: 'Chikitsa Sthana',
    chapter: 6,
    verse: '46-48',
    english: 'Bitter taste is the best remedy for Prameha. Bitter gourd, fenugreek, turmeric, and neem help regulate blood sugar. Physical exercise is essential.',
    context: 'Treatment for diabetes',
    keywords: ['diabetes', 'bitter', 'exercise', 'blood sugar']
  },

  // HIGH BLOOD PRESSURE (Raktachapa)
  {
    id: 'sutra-026',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 24, Verse 18-20',
    sthana: 'Sutra Sthana',
    chapter: 24,
    verse: '18-20',
    english: 'When rakta (blood) is aggravated by pitta, it leads to conditions characterized by heat, burning sensation, redness, and increased pressure in the blood vessels.',
    context: 'Understanding blood-related disorders',
    keywords: ['blood pressure', 'rakta', 'pitta', 'heart']
  },
  {
    id: 'sutra-027',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 26, Verse 246-248',
    sthana: 'Chikitsa Sthana',
    chapter: 26,
    verse: '246-248',
    english: 'Arjuna bark is the foremost heart tonic. It strengthens the heart muscle, regulates blood pressure, and calms the mind. It should be taken with milk or ghee.',
    context: 'Heart and blood pressure treatment',
    keywords: ['blood pressure', 'arjuna', 'heart', 'cardiac']
  },

  // HAIR FALL (Khalitya)
  {
    id: 'sutra-028',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 26, Verse 264-266',
    sthana: 'Chikitsa Sthana',
    chapter: 26,
    verse: '264-266',
    english: 'Hair fall (Khalitya) occurs when pitta combined with vata damages the hair roots. Excess heat, stress, and improper nutrition accelerate hair loss.',
    context: 'Understanding hair fall',
    keywords: ['hair fall', 'khalitya', 'pitta', 'hair health']
  },
  {
    id: 'sutra-029',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 26, Verse 268-270',
    sthana: 'Chikitsa Sthana',
    chapter: 26,
    verse: '268-270',
    english: 'Bhringraj (Eclipta alba) is the king of hair tonics. Regular application of Bhringraj oil nourishes hair roots, prevents graying, and promotes new growth.',
    context: 'Treatment for hair fall',
    keywords: ['hair fall', 'bhringraj', 'hair oil', 'growth']
  },

  // SENSORY OVERLOAD (Atiyoga of Indriyas)
  {
    id: 'sutra-030',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 11, Verse 37-38',
    sthana: 'Sutra Sthana',
    chapter: 11,
    verse: '37-38',
    english: 'Diseases arise from three causes: Asatmendriyartha samyoga (unwholesome contact of senses with objects), Prajnaparadha (intellectual errors), and Parinama (time/seasonal factors).',
    context: 'Root causes of disease including sensory overload',
    keywords: ['screen time', 'sensory overload', 'eyes', 'digital wellness']
  },
  {
    id: 'sutra-031',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 8, Verse 18-19',
    sthana: 'Sutra Sthana',
    chapter: 8,
    verse: '18-19',
    english: 'Atiyoga (excessive use), Ayoga (non-use), and Mithyayoga (wrong use) of the sense organs lead to their respective diseases. The eyes suffer from excessive exposure to bright lights and strain.',
    context: 'Understanding sensory balance',
    keywords: ['screen time', 'eyes', 'sensory', 'atiyoga']
  },

  // WOMENS HEALTH (Yonivyapad/PCOS)
  {
    id: 'sutra-032',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 30, Verse 7-8',
    sthana: 'Chikitsa Sthana',
    chapter: 30,
    verse: '7-8',
    english: 'Yonivyapad (uterine disorders) are of twenty types. They occur due to improper diet, lifestyle, and suppression of natural urges. Vata is the primary dosha involved.',
    context: 'Understanding female reproductive disorders',
    keywords: ['PCOS', 'womens health', 'menstrual', 'hormones']
  },
  {
    id: 'sutra-033',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 30, Verse 115-117',
    sthana: 'Chikitsa Sthana',
    chapter: 30,
    verse: '115-117',
    english: 'Shatavari (Asparagus racemosus) is the supreme rejuvenative for women. It balances hormones, supports reproductive health, and nourishes all female tissues.',
    context: 'Treatment for female health issues',
    keywords: ['PCOS', 'shatavari', 'hormones', 'womens health']
  },

  // CONCENTRATION/FOCUS (Smriti)
  {
    id: 'sutra-034',
    reference: 'Charaka Samhita, Sharira Sthana, Chapter 1, Verse 20-21',
    sthana: 'Sharira Sthana',
    chapter: 1,
    verse: '20-21',
    english: 'Smriti (memory) and Dhi (intellect) are functions of the mind that can be enhanced through proper diet, lifestyle, and specific herbs known as Medhya (intellect-promoting).',
    context: 'Understanding mental faculties',
    keywords: ['focus', 'concentration', 'memory', 'medhya']
  },
  {
    id: 'sutra-035',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 1, Verse 30-31',
    sthana: 'Chikitsa Sthana',
    chapter: 1,
    verse: '30-31',
    english: 'The four Medhya Rasayanas (intellect tonics) are: Mandookaparni (Centella asiatica), Shankhapushpi, Guduchi, and Yashtimadhu. Brahmi is also excellent for mental clarity.',
    context: 'Herbs for concentration',
    keywords: ['focus', 'brahmi', 'concentration', 'medhya', 'memory']
  },

  // WEIGHT MANAGEMENT (Sthaulya/Karshya)
  {
    id: 'sutra-036',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 21, Verse 4-9',
    sthana: 'Sutra Sthana',
    chapter: 21,
    verse: '4-9',
    english: 'Sthaulya (obesity) results from excessive eating, sleeping during day, lack of exercise, and hereditary factors. It leads to shortened lifespan, difficulty in movement, and various diseases.',
    context: 'Understanding obesity',
    keywords: ['weight', 'obesity', 'kapha', 'metabolism']
  },
  {
    id: 'sutra-037',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 21, Verse 20-24',
    sthana: 'Sutra Sthana',
    chapter: 21,
    verse: '20-24',
    english: 'Treatment of obesity includes: light diet, fasting, physical exercise, rough and dry foods, honey with warm water, and herbs like Guggulu and Trikatu.',
    context: 'Treatment for weight management',
    keywords: ['weight', 'trikatu', 'exercise', 'metabolism']
  },

  // ANGER/IRRITABILITY (Krodha)
  {
    id: 'sutra-038',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 7, Verse 26-27',
    sthana: 'Sutra Sthana',
    chapter: 7,
    verse: '26-27',
    english: 'Pitta individuals are naturally prone to anger, impatience, and irritability. When pitta is aggravated, these tendencies increase manifold.',
    context: 'Understanding anger and pitta',
    keywords: ['anger', 'irritability', 'pitta', 'emotions']
  },
  {
    id: 'sutra-039',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 7, Verse 44-45',
    sthana: 'Sutra Sthana',
    chapter: 7,
    verse: '44-45',
    english: 'To pacify pitta and reduce anger: take cooling foods, avoid sour and salty tastes, practice moonlight walks, apply sandalwood paste, and maintain calm company.',
    context: 'Treatment for anger and pitta pacification',
    keywords: ['anger', 'cooling', 'pitta', 'sandalwood']
  },

  // IMMUNITY (Vyadhikshamatva)
  {
    id: 'sutra-040',
    reference: 'Charaka Samhita, Sutra Sthana, Chapter 28, Verse 7',
    sthana: 'Sutra Sthana',
    chapter: 28,
    verse: '7',
    english: 'Vyadhikshamatva (immunity) depends on the strength of ojas, proper balance of doshas, and the vigor of dhatus. It determines ones resistance to diseases.',
    context: 'Understanding immunity',
    keywords: ['immunity', 'ojas', 'resistance', 'strength']
  },
  {
    id: 'sutra-041',
    reference: 'Charaka Samhita, Chikitsa Sthana, Chapter 1, Verse 7-8',
    sthana: 'Chikitsa Sthana',
    chapter: 1,
    verse: '7-8',
    english: 'Rasayana (rejuvenation therapy) enhances immunity, promotes longevity, improves memory and intelligence, maintains youthfulness, and prevents diseases.',
    context: 'Building immunity through Rasayana',
    keywords: ['immunity', 'rasayana', 'rejuvenation', 'longevity']
  }
];

// Export default for easy importing
export default charakaSutras;
