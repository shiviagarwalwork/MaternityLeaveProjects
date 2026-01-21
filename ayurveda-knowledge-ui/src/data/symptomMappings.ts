/**
 * Symptom to Sutra Mappings with Pre-computed Responses
 *
 * This file maps each symptom to relevant Charaka Samhita sutras
 * and provides pre-generated responses for zero API cost.
 */

import { charakaSutras, CharakaSutra } from './charakaSutras';

export interface SymptomResponse {
  symptomId: string;
  symptomName: string;
  ayurvedicName: string;
  doshaInvolvement: string[];
  sutraIds: string[];
  response: string;
  quickRemedies: string[];
  dietaryAdvice: string[];
  lifestyleAdvice: string[];
  herbs: { name: string; benefit: string }[];
  yogaAsanas: string[];
  warning?: string;
}

// Helper to get sutras by IDs
export const getSutrasForSymptom = (sutraIds: string[]): CharakaSutra[] => {
  return charakaSutras.filter(s => sutraIds.includes(s.id));
};

export const symptomMappings: SymptomResponse[] = [
  // 1. SCREEN TIME / DIGITAL EYE STRAIN
  {
    symptomId: 'screen-time',
    symptomName: 'Screen Time / Eye Strain',
    ayurvedicName: 'Netra Roga (Atiyoga of Chakshu Indriya)',
    doshaInvolvement: ['Vata', 'Pitta'],
    sutraIds: ['sutra-030', 'sutra-031'],
    response: `According to Charaka Samhita, eye strain from excessive screen use is a form of "Atiyoga" (overuse) of the visual sense organ. The ancient text warns that excessive exposure to bright lights and strain damages the eyes and disturbs both Vata and Pitta doshas.

The remedy lies in practicing "Samyak Yoga" (proper use) of the senses - taking regular breaks, reducing blue light exposure, and nourishing the eyes with cooling therapies.`,
    quickRemedies: [
      'Follow 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds',
      'Apply rose water drops to eyes before bed',
      'Place cucumber slices on closed eyes for 10 minutes',
      'Wash eyes with Triphala water in the morning'
    ],
    dietaryAdvice: [
      'Eat foods rich in Vitamin A: carrots, spinach, sweet potato',
      'Include ghee in diet - it nourishes eye tissues',
      'Drink amla (Indian gooseberry) juice',
      'Avoid excessive salty, sour, and spicy foods'
    ],
    lifestyleAdvice: [
      'Practice Trataka (candle gazing meditation) for 5 minutes daily',
      'Do Palming: Rub palms together, place over closed eyes',
      'Take a digital detox for 1 hour before sleep',
      'Ensure proper lighting while working'
    ],
    herbs: [
      { name: 'Triphala', benefit: 'Cleanses and strengthens eyes' },
      { name: 'Shatavari', benefit: 'Cools and nourishes eye tissues' },
      { name: 'Amla', benefit: 'Rich in Vitamin C, improves vision' }
    ],
    yogaAsanas: ['Palming', 'Eye rotations', 'Trataka', 'Shavasana']
  },

  // 2. STRESS & ANXIETY
  {
    symptomId: 'stress',
    symptomName: 'Stress & Anxiety',
    ayurvedicName: 'Chittodvega / Manovikara',
    doshaInvolvement: ['Vata', 'Pitta'],
    sutraIds: ['sutra-001', 'sutra-002', 'sutra-003'],
    response: `Charaka Samhita identifies stress as a disturbance of "Manas" (mind) caused by Rajas and Tamas qualities. The text states that mental afflictions like worry, fear, and anxiety disturb the equilibrium of all doshas.

The concept of "Prajnaparadha" (crimes against wisdom) explains why we continue harmful habits despite knowing better - this self-awareness is the first step to healing.

Building "Sattva" (mental strength) through proper diet, lifestyle, and spiritual practices is the Ayurvedic approach to stress management.`,
    quickRemedies: [
      'Practice slow, deep breathing (4-7-8 technique)',
      'Drink warm milk with a pinch of nutmeg before bed',
      'Apply Brahmi oil to scalp and soles of feet',
      'Take Ashwagandha with warm milk'
    ],
    dietaryAdvice: [
      'Eat warm, cooked, easily digestible foods',
      'Include ghee, almonds, and walnuts',
      'Avoid caffeine, alcohol, and processed foods',
      'Eat meals at regular times in a calm environment'
    ],
    lifestyleAdvice: [
      'Wake up before sunrise (Brahma Muhurta)',
      'Practice 15-20 minutes of meditation daily',
      'Do Abhyanga (self-massage) with warm sesame oil',
      'Maintain a consistent sleep schedule'
    ],
    herbs: [
      { name: 'Ashwagandha', benefit: 'Adaptogen that reduces cortisol' },
      { name: 'Brahmi', benefit: 'Calms the mind, improves clarity' },
      { name: 'Jatamansi', benefit: 'Natural sedative, reduces anxiety' }
    ],
    yogaAsanas: ['Shavasana', 'Balasana', 'Viparita Karani', 'Pranayama']
  },

  // 3. BURNOUT / FATIGUE
  {
    symptomId: 'burnout',
    symptomName: 'Burnout & Chronic Fatigue',
    ayurvedicName: 'Klama / Shrama',
    doshaInvolvement: ['Vata', 'Pitta'],
    sutraIds: ['sutra-010', 'sutra-011', 'sutra-012'],
    response: `Charaka Samhita warns that excessive exertion leads to "Klama" (fatigue) characterized by thirst, weakness, breathlessness, and mental exhaustion. The text advises exercising only to half of one's capacity.

Burnout is essentially depletion of "Ojas" (vital essence) - the subtle energy that gives us immunity, enthusiasm, and resilience. When Ojas is depleted, we experience weakness, worry, and loss of joy.

Recovery requires building Ojas through proper rest, nourishing foods, and gentle rejuvenation practices.`,
    quickRemedies: [
      'Take complete rest - sleep is medicine',
      'Drink warm milk with ghee and dates',
      'Practice Yoga Nidra (yogic sleep) for deep rest',
      'Apply warm sesame oil to feet before bed'
    ],
    dietaryAdvice: [
      'Eat Ojas-building foods: ghee, milk, almonds, dates, honey',
      'Include rice cooked with mung dal (khichdi)',
      'Drink warm water throughout the day',
      'Avoid fasting, skipping meals, or eating cold foods'
    ],
    lifestyleAdvice: [
      'Sleep by 10 PM - the Pitta time of healing',
      'Reduce workload and commitments temporarily',
      'Practice gentle walking in nature',
      'Avoid screens for 2 hours before bed'
    ],
    herbs: [
      { name: 'Ashwagandha', benefit: 'Restores energy, reduces fatigue' },
      { name: 'Shatavari', benefit: 'Nourishes tissues, builds strength' },
      { name: 'Amalaki', benefit: 'Rejuvenates all tissues, builds Ojas' }
    ],
    yogaAsanas: ['Yoga Nidra', 'Supported Supta Baddha Konasana', 'Viparita Karani']
  },

  // 4. SLEEP ISSUES / INSOMNIA
  {
    symptomId: 'sleep',
    symptomName: 'Sleep Problems / Insomnia',
    ayurvedicName: 'Anidra / Nidranasha',
    doshaInvolvement: ['Vata'],
    sutraIds: ['sutra-004', 'sutra-005', 'sutra-011'],
    response: `Charaka Samhita describes sleep as occurring when the mind, exhausted from activity, withdraws from the sense objects. Proper sleep at the right time brings happiness, nourishment, strength, and long life.

Insomnia (Anidra) is primarily a Vata disorder caused by worry, excessive physical activity, fasting, uncomfortable sleeping conditions, or mental disturbances.

The ancient remedies include oil massage, warm baths, nourishing soups, rice with curd, warm milk, and most importantly - mental peace.`,
    quickRemedies: [
      'Drink warm milk with nutmeg and cardamom',
      'Massage feet with warm sesame or Brahmi oil',
      'Take a warm bath with lavender oil before bed',
      'Practice left-nostril breathing (Chandra Nadi)'
    ],
    dietaryAdvice: [
      'Eat dinner by 7 PM - light and warm',
      'Include warm milk, ghee, and rice in evening meal',
      'Avoid caffeine after 2 PM',
      'No heavy, spicy, or cold foods at night'
    ],
    lifestyleAdvice: [
      'Sleep and wake at the same time daily',
      'No screens 1-2 hours before bed',
      'Keep bedroom cool, dark, and quiet',
      'Practice gentle stretching before bed'
    ],
    herbs: [
      { name: 'Ashwagandha', benefit: 'Promotes restful sleep' },
      { name: 'Tagara (Valerian)', benefit: 'Natural sleep inducer' },
      { name: 'Brahmi', benefit: 'Calms racing thoughts' }
    ],
    yogaAsanas: ['Viparita Karani', 'Supta Baddha Konasana', 'Shavasana', 'Yoga Nidra']
  },

  // 5. DIGESTION ISSUES
  {
    symptomId: 'digestion',
    symptomName: 'Digestive Problems',
    ayurvedicName: 'Agnimandya / Ajirna',
    doshaInvolvement: ['All three doshas'],
    sutraIds: ['sutra-006', 'sutra-007'],
    response: `Charaka Samhita declares "Agni (digestive fire) is the root of life." When Agni is strong, one lives long and healthy. When disturbed, disease follows. When extinguished, death occurs.

The text provides detailed rules for eating: food should be warm, unctuous, in proper quantity, eaten after the previous meal is digested, in a proper place, not too fast nor too slow, without talking or laughing, with full concentration, and considering one's own constitution.

Digestive problems arise when these principles are violated.`,
    quickRemedies: [
      'Drink ginger tea 30 minutes before meals',
      'Chew a small piece of fresh ginger with rock salt before eating',
      'Take a short walk after meals (100 steps)',
      'Drink warm water with meals, not cold'
    ],
    dietaryAdvice: [
      'Eat freshly cooked, warm foods',
      'Include all six tastes in main meal',
      'Avoid incompatible food combinations (milk with fruit, etc.)',
      'Eat largest meal at noon when Agni is strongest'
    ],
    lifestyleAdvice: [
      'Eat in a calm, seated position',
      'Do not eat when stressed or distracted',
      'Allow 3-4 hours between meals',
      'Practice Vajrasana after meals for better digestion'
    ],
    herbs: [
      { name: 'Trikatu', benefit: 'Kindles digestive fire' },
      { name: 'Hingvastak Churna', benefit: 'Relieves gas and bloating' },
      { name: 'Triphala', benefit: 'Regulates bowel movements' }
    ],
    yogaAsanas: ['Vajrasana', 'Pawanmuktasana', 'Ardha Matsyendrasana']
  },

  // 6. FOCUS / CONCENTRATION
  {
    symptomId: 'focus',
    symptomName: 'Poor Focus & Concentration',
    ayurvedicName: 'Smriti Bhramsha / Dhi Kshaya',
    doshaInvolvement: ['Vata', 'Kapha'],
    sutraIds: ['sutra-034', 'sutra-035'],
    response: `Charaka Samhita identifies Smriti (memory) and Dhi (intellect) as functions of the mind that can be enhanced through proper diet, lifestyle, and specific "Medhya" herbs.

The text lists four supreme Medhya Rasayanas (intellect tonics): Mandookaparni (Gotu Kola), Shankhapushpi, Guduchi, and Yashtimadhu. Brahmi is also celebrated for mental clarity.

Poor concentration often stems from Vata aggravation (scattered mind) or Kapha excess (mental dullness). Balance is achieved through calming Vata and stimulating mental clarity.`,
    quickRemedies: [
      'Take Brahmi ghee or Brahmi tea in the morning',
      'Practice 10 minutes of focused breathing',
      'Massage scalp with Brahmi oil',
      'Chew 5-6 soaked almonds in the morning'
    ],
    dietaryAdvice: [
      'Include ghee, almonds, and walnuts daily',
      'Eat Brahmi leaves or take Brahmi supplement',
      'Avoid heavy, fried, and processed foods',
      'Include fresh fruits and leafy greens'
    ],
    lifestyleAdvice: [
      'Practice single-tasking instead of multitasking',
      'Take breaks every 45-50 minutes',
      'Meditate for 15-20 minutes daily',
      'Sleep adequately - 7-8 hours'
    ],
    herbs: [
      { name: 'Brahmi', benefit: 'Enhances memory and focus' },
      { name: 'Shankhapushpi', benefit: 'Improves concentration' },
      { name: 'Ashwagandha', benefit: 'Reduces mental fatigue' }
    ],
    yogaAsanas: ['Padmasana', 'Sarvangasana', 'Halasana', 'Pranayama']
  },

  // 7. WEIGHT MANAGEMENT
  {
    symptomId: 'weight',
    symptomName: 'Weight Management',
    ayurvedicName: 'Sthaulya (Obesity) / Karshya (Underweight)',
    doshaInvolvement: ['Kapha', 'Vata'],
    sutraIds: ['sutra-036', 'sutra-037'],
    response: `Charaka Samhita describes Sthaulya (obesity) as resulting from excessive eating, daytime sleep, lack of exercise, and hereditary factors. It shortens lifespan and causes difficulty in movement.

The treatment includes: light diet, proper fasting, physical exercise, rough and dry foods, honey with warm water, and herbs like Guggulu and Trikatu.

Weight management in Ayurveda is not about restriction but about kindling Agni (digestive fire) and reducing Kapha accumulation through appropriate diet and lifestyle.`,
    quickRemedies: [
      'Drink warm water with honey and lemon in the morning',
      'Take Triphala at bedtime',
      'Practice brisk walking for 30-45 minutes daily',
      'Avoid daytime sleep'
    ],
    dietaryAdvice: [
      'Eat light, warm, and easily digestible foods',
      'Include bitter and astringent tastes',
      'Avoid sweets, fried foods, and dairy',
      'Eat largest meal at noon, light dinner by 7 PM'
    ],
    lifestyleAdvice: [
      'Exercise regularly - at least 30 minutes daily',
      'Wake up before sunrise',
      'Practice Surya Namaskar (Sun Salutations)',
      'Avoid sedentary lifestyle'
    ],
    herbs: [
      { name: 'Guggulu', benefit: 'Burns fat, improves metabolism' },
      { name: 'Trikatu', benefit: 'Kindles digestive fire' },
      { name: 'Triphala', benefit: 'Cleanses and detoxifies' }
    ],
    yogaAsanas: ['Surya Namaskar', 'Naukasana', 'Dhanurasana', 'Kapalbhati']
  },

  // 8. ANGER / IRRITABILITY
  {
    symptomId: 'anger',
    symptomName: 'Anger & Irritability',
    ayurvedicName: 'Krodha / Pitta Prakopa',
    doshaInvolvement: ['Pitta'],
    sutraIds: ['sutra-038', 'sutra-039'],
    response: `According to Charaka Samhita, Pitta individuals are naturally prone to anger, impatience, and irritability. When Pitta is aggravated through diet, lifestyle, or environment, these tendencies increase manifold.

To pacify Pitta and reduce anger, the text recommends: cooling foods, avoiding sour and salty tastes, moonlight walks, application of sandalwood paste, and maintaining calm company.

Anger is seen as internal heat that needs to be cooled through both physical and mental practices.`,
    quickRemedies: [
      'Apply sandalwood or rose water to forehead',
      'Drink coconut water or aloe vera juice',
      'Practice Sheetali Pranayama (cooling breath)',
      'Take a walk in moonlight or near water'
    ],
    dietaryAdvice: [
      'Favor sweet, bitter, and astringent tastes',
      'Include cooling foods: cucumber, melon, coconut',
      'Avoid sour, salty, spicy, and fermented foods',
      'Drink cool (not cold) water throughout the day'
    ],
    lifestyleAdvice: [
      'Avoid midday sun and excessive heat',
      'Practice swimming or water activities',
      'Maintain calm, peaceful company',
      'Practice meditation and deep breathing'
    ],
    herbs: [
      { name: 'Brahmi', benefit: 'Cools the mind, reduces anger' },
      { name: 'Amalaki', benefit: 'Cools Pitta, rejuvenates' },
      { name: 'Shatavari', benefit: 'Calms and nourishes' }
    ],
    yogaAsanas: ['Shavasana', 'Sitali Pranayama', 'Forward bends', 'Moon Salutation']
  }
];

// 9. PROCRASTINATION
const procrastination: SymptomResponse = {
  symptomId: 'procrastination',
  symptomName: 'Procrastination',
  ayurvedicName: 'Alasya / Tandra',
  doshaInvolvement: ['Kapha', 'Tamas'],
  sutraIds: ['sutra-001', 'sutra-036'],
  response: `Charaka Samhita identifies Alasya (laziness) and Tandra (drowsiness) as manifestations of excess Kapha and Tamas (inertia). The mind becomes heavy, dull, and resistant to action.

Procrastination is a form of Prajnaparadha - knowing what needs to be done but failing to act. The remedy involves increasing Sattva (clarity) and reducing Tamas through diet, movement, and mental discipline.`,
  quickRemedies: [
    'Start with the smallest possible action',
    'Drink ginger tea to stimulate energy',
    'Do 10 jumping jacks or brisk walking',
    'Practice Kapalbhati Pranayama for 3 minutes'
  ],
  dietaryAdvice: [
    'Avoid heavy, oily, and sweet foods',
    'Eat light, warm, and spiced foods',
    'Include honey (never heated) for energy',
    'Reduce dairy and wheat'
  ],
  lifestyleAdvice: [
    'Wake up before sunrise (Brahma Muhurta)',
    'Exercise in the morning to kickstart energy',
    'Break tasks into small, manageable steps',
    'Use accountability partners'
  ],
  herbs: [
    { name: 'Trikatu', benefit: 'Stimulates metabolism and energy' },
    { name: 'Guggulu', benefit: 'Clears mental fog' },
    { name: 'Brahmi', benefit: 'Enhances mental clarity' }
  ],
  yogaAsanas: ['Surya Namaskar', 'Kapalbhati', 'Bhastrika Pranayama']
};

// 10. OVERTHINKING
const overthinking: SymptomResponse = {
  symptomId: 'overthinking',
  symptomName: 'Overthinking & Racing Thoughts',
  ayurvedicName: 'Chinta / Vata Vikara',
  doshaInvolvement: ['Vata'],
  sutraIds: ['sutra-001', 'sutra-003', 'sutra-004'],
  response: `Charaka Samhita describes excessive thinking (Chinta) as a Vata imbalance. Vata governs movement, including the movement of thoughts. When aggravated, thoughts become scattered, repetitive, and uncontrollable.

The remedy involves grounding Vata through warm, heavy, and oily qualities in food and lifestyle. Regular routine, warm oil massage, and calming practices bring the mind back to stillness.`,
  quickRemedies: [
    'Practice grounding: feel your feet on the earth',
    'Apply warm sesame oil to scalp and feet',
    'Drink warm milk with ghee and nutmeg',
    'Practice slow, deep belly breathing'
  ],
  dietaryAdvice: [
    'Eat warm, cooked, slightly oily foods',
    'Include ghee, root vegetables, and grains',
    'Avoid dry, cold, and raw foods',
    'Eat meals at regular times'
  ],
  lifestyleAdvice: [
    'Maintain a strict daily routine',
    'Practice Abhyanga (oil massage) daily',
    'Limit information intake and social media',
    'Journal thoughts to externalize them'
  ],
  herbs: [
    { name: 'Ashwagandha', benefit: 'Calms Vata, grounds the mind' },
    { name: 'Jatamansi', benefit: 'Natural sedative for racing thoughts' },
    { name: 'Brahmi', benefit: 'Cools and calms mental activity' }
  ],
  yogaAsanas: ['Balasana', 'Viparita Karani', 'Shavasana', 'Nadi Shodhana']
};

// 11. HIGH BLOOD PRESSURE
const highBP: SymptomResponse = {
  symptomId: 'high-bp',
  symptomName: 'High Blood Pressure',
  ayurvedicName: 'Rakta Chapa Vriddhi',
  doshaInvolvement: ['Pitta', 'Vata'],
  sutraIds: ['sutra-026', 'sutra-027'],
  response: `According to Charaka Samhita, when Rakta (blood) is aggravated by Pitta, it leads to conditions with increased heat, pressure, and tension in blood vessels.

Arjuna bark is identified as the foremost heart tonic - it strengthens the heart muscle, regulates blood pressure, and calms the mind. The holistic approach includes stress reduction, cooling foods, and lifestyle modification.`,
  quickRemedies: [
    'Practice slow deep breathing for 10 minutes',
    'Drink coconut water daily',
    'Take Arjuna bark powder with warm water',
    'Apply sandalwood paste to forehead'
  ],
  dietaryAdvice: [
    'Reduce salt intake significantly',
    'Avoid spicy, sour, and fermented foods',
    'Include garlic, pomegranate, and leafy greens',
    'Avoid alcohol and caffeine'
  ],
  lifestyleAdvice: [
    'Practice meditation and Pranayama daily',
    'Walk for 30-45 minutes in cool hours',
    'Avoid stress, anger, and confrontation',
    'Sleep adequately and on time'
  ],
  herbs: [
    { name: 'Arjuna', benefit: 'Strengthens heart, regulates BP' },
    { name: 'Sarpagandha', benefit: 'Traditional BP regulator' },
    { name: 'Brahmi', benefit: 'Calms stress-induced hypertension' }
  ],
  yogaAsanas: ['Shavasana', 'Sukhasana', 'Pranayama', 'Slow walking'],
  warning: 'High blood pressure requires medical monitoring. Use Ayurvedic remedies as complementary support, not replacement for medication.'
};

// 12. THYROID
const thyroid: SymptomResponse = {
  symptomId: 'thyroid',
  symptomName: 'Thyroid Imbalance',
  ayurvedicName: 'Galaganda',
  doshaInvolvement: ['Kapha', 'Vata'],
  sutraIds: ['sutra-022', 'sutra-023'],
  response: `Charaka Samhita describes Galaganda (goiter/thyroid swelling) as occurring due to Kapha and Meda (fat) accumulation in the neck region.

Kanchanara (Bauhinia variegata) is identified as the foremost herb for thyroid conditions. Combined with Guggulu, it clears the channels and supports healthy thyroid function. Treatment also involves Kapha-reducing diet and lifestyle.`,
  quickRemedies: [
    'Take Kanchanara Guggulu as directed',
    'Apply warm castor oil pack to throat area',
    'Practice neck exercises and Jalandhara Bandha',
    'Drink warm water with ginger throughout day'
  ],
  dietaryAdvice: [
    'Avoid goitrogenic foods: raw cruciferous vegetables',
    'Include iodine-rich foods: sea vegetables, fish',
    'Reduce dairy, wheat, and sugar',
    'Eat light, warm, and spiced foods'
  ],
  lifestyleAdvice: [
    'Exercise daily - especially cardio',
    'Practice Sarvangasana (Shoulder Stand) if appropriate',
    'Avoid daytime sleep',
    'Reduce stress through meditation'
  ],
  herbs: [
    { name: 'Kanchanara', benefit: 'Primary thyroid support herb' },
    { name: 'Guggulu', benefit: 'Clears channels, supports metabolism' },
    { name: 'Ashwagandha', benefit: 'Balances thyroid hormones' }
  ],
  yogaAsanas: ['Sarvangasana', 'Halasana', 'Matsyasana', 'Ujjayi Pranayama'],
  warning: 'Thyroid conditions require proper diagnosis and monitoring. Work with healthcare providers alongside Ayurvedic support.'
};

// 13. BACK PAIN
const backPain: SymptomResponse = {
  symptomId: 'back-pain',
  symptomName: 'Back Pain',
  ayurvedicName: 'Kati Shula / Gridhrasi',
  doshaInvolvement: ['Vata'],
  sutraIds: ['sutra-014', 'sutra-015'],
  response: `Charaka Samhita classifies back pain under Vatavyadhi (Vata disorders). The treatment principles include oleation (internal and external), sudation (sweating therapy), mild purgation, and application of warm medicated oils.

Sesame oil is especially beneficial for all Vata conditions. Regular warm oil massage, proper posture, and strengthening exercises form the foundation of treatment.`,
  quickRemedies: [
    'Apply warm sesame or Mahanarayan oil to lower back',
    'Use a hot water bottle or heating pad',
    'Practice Cat-Cow stretches gently',
    'Take Dashamoola decoction'
  ],
  dietaryAdvice: [
    'Eat warm, nourishing, and slightly oily foods',
    'Include ghee, sesame, and warming spices',
    'Avoid cold, dry, and raw foods',
    'Stay well-hydrated with warm water'
  ],
  lifestyleAdvice: [
    'Practice daily Abhyanga with warm oil',
    'Maintain good posture while sitting',
    'Do gentle stretching and yoga',
    'Avoid heavy lifting and sudden movements'
  ],
  herbs: [
    { name: 'Dashamoola', benefit: 'Classic Vata-pacifying formula' },
    { name: 'Guggulu', benefit: 'Anti-inflammatory, supports joints' },
    { name: 'Ashwagandha', benefit: 'Strengthens muscles and nerves' }
  ],
  yogaAsanas: ['Bhujangasana', 'Marjariasana', 'Setu Bandhasana', 'Shavasana']
};

// 14. NECK PAIN
const neckPain: SymptomResponse = {
  symptomId: 'neck-pain',
  symptomName: 'Neck Pain & Stiffness',
  ayurvedicName: 'Manya Stambha',
  doshaInvolvement: ['Vata', 'Kapha'],
  sutraIds: ['sutra-014', 'sutra-015'],
  response: `Neck pain (Manya Stambha) is described in Charaka Samhita as a condition where Vata gets lodged in the neck region, causing stiffness and pain. Modern screen use and poor posture exacerbate this condition.

Treatment focuses on local oleation, gentle heat application, and specific exercises to release tension and restore mobility.`,
  quickRemedies: [
    'Apply warm Mahanarayan oil and massage gently',
    'Use a warm towel compress for 15 minutes',
    'Practice slow neck rotations and stretches',
    'Avoid looking down at phone for extended periods'
  ],
  dietaryAdvice: [
    'Eat warm, easily digestible foods',
    'Include ghee and warm milk',
    'Avoid cold drinks and foods',
    'Include anti-inflammatory spices: turmeric, ginger'
  ],
  lifestyleAdvice: [
    'Keep phone at eye level when using',
    'Take breaks every 30 minutes from screen work',
    'Practice good sleeping posture with proper pillow',
    'Do daily neck exercises and stretches'
  ],
  herbs: [
    { name: 'Mahanarayan Oil', benefit: 'External application for pain relief' },
    { name: 'Dashamoola', benefit: 'Internal Vata pacification' },
    { name: 'Nirgundi', benefit: 'Reduces pain and inflammation' }
  ],
  yogaAsanas: ['Neck rotations', 'Bhujangasana', 'Matsyasana', 'Shavasana']
};

// 15. HEADACHE / MIGRAINE
const headache: SymptomResponse = {
  symptomId: 'headache',
  symptomName: 'Headache & Migraine',
  ayurvedicName: 'Shirahshula / Ardhavabhedaka',
  doshaInvolvement: ['Vata', 'Pitta', 'Kapha'],
  sutraIds: ['sutra-008', 'sutra-009'],
  response: `Charaka Samhita describes eleven types of head diseases. Shirahshula (headache) occurs due to aggravation of Vata, Pitta, Kapha, or all three doshas. Treatment varies based on the predominant dosha.

For Pitta-type headache (burning, light sensitivity): cooling therapies, sandalwood paste, and ghee with bitter herbs.
For Vata-type (throbbing, variable): warm oil massage, regularity.
For Kapha-type (dull, heavy): dry massage, stimulating herbs.`,
  quickRemedies: [
    'Apply sandalwood paste to forehead (for Pitta type)',
    'Massage scalp with warm sesame oil (for Vata type)',
    'Inhale eucalyptus or peppermint (for Kapha type)',
    'Rest in a dark, quiet room'
  ],
  dietaryAdvice: [
    'Identify and avoid trigger foods',
    'Eat regular meals - never skip meals',
    'Stay well-hydrated',
    'Avoid aged cheese, alcohol, caffeine, MSG'
  ],
  lifestyleAdvice: [
    'Maintain regular sleep schedule',
    'Practice stress management techniques',
    'Take regular breaks from screens',
    'Avoid bright lights and loud noises during headache'
  ],
  herbs: [
    { name: 'Brahmi', benefit: 'Cools and calms the head' },
    { name: 'Shirashuladi Vajra Rasa', benefit: 'Traditional headache remedy' },
    { name: 'Pathyadi Kwath', benefit: 'Classical formula for migraines' }
  ],
  yogaAsanas: ['Shavasana', 'Balasana', 'Anulom Vilom Pranayama']
};

// 16. HAIR FALL
const hairFall: SymptomResponse = {
  symptomId: 'hair-fall',
  symptomName: 'Hair Fall & Hair Health',
  ayurvedicName: 'Khalitya / Palitya',
  doshaInvolvement: ['Pitta', 'Vata'],
  sutraIds: ['sutra-028', 'sutra-029'],
  response: `Charaka Samhita states that hair fall (Khalitya) occurs when Pitta combined with Vata damages the hair roots. Excess heat, stress, and improper nutrition accelerate hair loss.

Bhringraj (Eclipta alba) is celebrated as the "king of hair tonics." Regular application of Bhringraj oil nourishes hair roots, prevents premature graying, and promotes new growth.`,
  quickRemedies: [
    'Massage scalp with warm Bhringraj or coconut oil',
    'Apply Amla paste to hair weekly',
    'Drink Amla juice daily',
    'Avoid hot water on hair'
  ],
  dietaryAdvice: [
    'Include protein-rich foods: dal, nuts, seeds',
    'Eat iron-rich foods: spinach, pomegranate',
    'Include ghee and healthy fats',
    'Avoid excess spicy, salty, and sour foods'
  ],
  lifestyleAdvice: [
    'Oil your hair 2-3 times per week',
    'Avoid chemical treatments and excessive heat styling',
    'Manage stress through meditation',
    'Sleep adequately'
  ],
  herbs: [
    { name: 'Bhringraj', benefit: 'King of hair tonics, promotes growth' },
    { name: 'Amla', benefit: 'Strengthens hair, prevents graying' },
    { name: 'Brahmi', benefit: 'Cools scalp, reduces hair fall' }
  ],
  yogaAsanas: ['Adho Mukha Svanasana', 'Uttanasana', 'Sarvangasana']
};

// 17. ACIDITY
const acidity: SymptomResponse = {
  symptomId: 'acidity',
  symptomName: 'Acidity & Heartburn',
  ayurvedicName: 'Amlapitta',
  doshaInvolvement: ['Pitta'],
  sutraIds: ['sutra-020', 'sutra-021'],
  response: `Charaka Samhita explains that when one takes food that is too sour, salty, pungent, or incompatible combinations, Pitta increases leading to burning sensation, heartburn, and sour eructation.

For Amlapitta, cooling foods are recommended: milk, ghee, coconut water, and pomegranate. Shatavari with milk is an excellent remedy.`,
  quickRemedies: [
    'Drink cold milk or coconut water',
    'Chew fennel seeds after meals',
    'Take 1 tsp of Shatavari with cold milk',
    'Eat a ripe banana'
  ],
  dietaryAdvice: [
    'Avoid sour, salty, and spicy foods',
    'No fried foods, tomatoes, or citrus',
    'Include cooling foods: cucumber, melon, coconut',
    'Eat dinner early and keep it light'
  ],
  lifestyleAdvice: [
    'Do not lie down immediately after eating',
    'Avoid eating when angry or stressed',
    'Practice stress management',
    'Do not skip meals or fast excessively'
  ],
  herbs: [
    { name: 'Shatavari', benefit: 'Cools and soothes digestive tract' },
    { name: 'Yashtimadhu', benefit: 'Heals stomach lining' },
    { name: 'Amalaki', benefit: 'Balances stomach acid' }
  ],
  yogaAsanas: ['Vajrasana', 'Pawanmuktasana', 'Shavasana']
};

// 18. JOINT PAIN
const jointPain: SymptomResponse = {
  symptomId: 'joint-pain',
  symptomName: 'Joint Pain & Arthritis',
  ayurvedicName: 'Sandhivata / Amavata',
  doshaInvolvement: ['Vata'],
  sutraIds: ['sutra-014', 'sutra-015'],
  response: `Charaka Samhita describes Sandhivata (joint disease) as characterized by swelling, pain on movement, and crackling sounds in the joints. It is primarily a Vata disorder.

Treatment includes oleation (internal and external), sudation, and application of warm medicated oils. Sesame oil is especially beneficial for all joint conditions.`,
  quickRemedies: [
    'Apply warm sesame or Mahanarayan oil to joints',
    'Use hot water bottle or warm compress',
    'Take Dashamoola decoction',
    'Drink warm water with ginger'
  ],
  dietaryAdvice: [
    'Eat warm, nourishing, easily digestible foods',
    'Include ghee, turmeric, and ginger',
    'Avoid cold, dry, and raw foods',
    'Reduce nightshades: tomato, potato, eggplant'
  ],
  lifestyleAdvice: [
    'Practice daily warm oil massage',
    'Do gentle exercise - swimming, walking',
    'Avoid cold and damp environments',
    'Keep joints warm, especially in winter'
  ],
  herbs: [
    { name: 'Guggulu', benefit: 'Anti-inflammatory, supports joints' },
    { name: 'Ashwagandha', benefit: 'Strengthens muscles and joints' },
    { name: 'Shallaki (Boswellia)', benefit: 'Reduces joint inflammation' }
  ],
  yogaAsanas: ['Gentle joint rotations', 'Tadasana', 'Vrikshasana', 'Swimming']
};

// 19. DIABETES
const diabetes: SymptomResponse = {
  symptomId: 'diabetes',
  symptomName: 'Diabetes & Blood Sugar',
  ayurvedicName: 'Prameha / Madhumeha',
  doshaInvolvement: ['Kapha', 'Pitta'],
  sutraIds: ['sutra-024', 'sutra-025'],
  response: `Charaka Samhita describes twenty types of Prameha (urinary disorders including diabetes). Madhumeha is characterized by honey-like sweet urine, excessive thirst, and increased urination.

Bitter taste is the best remedy for Prameha. Bitter gourd, fenugreek, turmeric, and neem help regulate blood sugar. Physical exercise is essential.`,
  quickRemedies: [
    'Drink bitter gourd juice in the morning',
    'Soak fenugreek seeds overnight and drink water',
    'Take Gudmar (sugar destroyer) as directed',
    'Walk for 30-45 minutes after meals'
  ],
  dietaryAdvice: [
    'Include bitter vegetables: karela, methi, neem',
    'Eat whole grains instead of refined carbs',
    'Avoid sweets, sugar, and processed foods',
    'Include protein with every meal'
  ],
  lifestyleAdvice: [
    'Exercise daily - essential for blood sugar control',
    'Avoid daytime sleep',
    'Manage stress levels',
    'Monitor blood sugar regularly'
  ],
  herbs: [
    { name: 'Gudmar (Gymnema)', benefit: 'Reduces sugar cravings, supports pancreas' },
    { name: 'Vijaysar', benefit: 'Traditional diabetes management' },
    { name: 'Karela (Bitter Gourd)', benefit: 'Lowers blood sugar naturally' }
  ],
  yogaAsanas: ['Walking', 'Mandukasana', 'Ardha Matsyendrasana', 'Surya Namaskar'],
  warning: 'Diabetes requires medical monitoring. Use Ayurvedic remedies as complementary support alongside medical treatment.'
};

// 20. COLD & COUGH
const coldCough: SymptomResponse = {
  symptomId: 'cold-cough',
  symptomName: 'Cold, Cough & Congestion',
  ayurvedicName: 'Pratishyaya / Kasa',
  doshaInvolvement: ['Kapha', 'Vata'],
  sutraIds: ['sutra-018', 'sutra-019'],
  response: `Charaka Samhita describes Kasa (cough) as five types based on dosha involvement. Common symptoms include chest congestion, difficulty breathing, and excessive mucus.

Tulsi (holy basil), ginger, black pepper, and honey are excellent for treating Kapha-type cough and cold. Warm water with these ingredients clears respiratory channels.`,
  quickRemedies: [
    'Drink Tulsi-ginger tea with honey',
    'Steam inhalation with eucalyptus oil',
    'Take Trikatu with honey',
    'Gargle with warm salt water'
  ],
  dietaryAdvice: [
    'Drink warm fluids throughout the day',
    'Include warming spices: ginger, pepper, turmeric',
    'Avoid cold drinks, ice cream, dairy',
    'Eat light, warm, easily digestible foods'
  ],
  lifestyleAdvice: [
    'Rest adequately',
    'Keep chest and throat warm',
    'Do steam inhalation 2-3 times daily',
    'Avoid cold and damp environments'
  ],
  herbs: [
    { name: 'Tulsi', benefit: 'Clears respiratory tract, boosts immunity' },
    { name: 'Sitopaladi Churna', benefit: 'Classical cold and cough remedy' },
    { name: 'Trikatu', benefit: 'Clears congestion, kindles Agni' }
  ],
  yogaAsanas: ['Bhastrika Pranayama', 'Kapalbhati', 'Simhasana']
};

// 21. SKIN ISSUES
const skinIssues: SymptomResponse = {
  symptomId: 'skin-issues',
  symptomName: 'Skin Problems & Acne',
  ayurvedicName: 'Twak Roga / Kushtha',
  doshaInvolvement: ['Pitta', 'Kapha'],
  sutraIds: ['sutra-016', 'sutra-017'],
  response: `Charaka Samhita states that all skin diseases arise from vitiation of three doshas along with Rasa, Rakta, Mamsa, and Lasika dhatus. Treatment requires both external application and internal purification.

Neem, turmeric, and Manjistha are the foremost herbs for purifying blood and treating skin diseases. They should be used both internally and externally.`,
  quickRemedies: [
    'Apply neem and turmeric paste to affected areas',
    'Drink neem water or Aloe vera juice',
    'Apply fresh Aloe vera gel to skin',
    'Take Manjistha powder with water'
  ],
  dietaryAdvice: [
    'Avoid spicy, sour, salty, and fried foods',
    'Include bitter vegetables and leafy greens',
    'Drink plenty of water',
    'Avoid dairy, sugar, and processed foods'
  ],
  lifestyleAdvice: [
    'Keep skin clean with natural cleansers',
    'Avoid harsh chemicals on skin',
    'Manage stress (affects skin)',
    'Get adequate sleep'
  ],
  herbs: [
    { name: 'Neem', benefit: 'Blood purifier, antibacterial' },
    { name: 'Manjistha', benefit: 'Clears blood toxins, improves complexion' },
    { name: 'Khadira', benefit: 'Classical skin purifier' }
  ],
  yogaAsanas: ['Pranayama', 'Sarvangasana', 'Matsyasana', 'Shavasana']
};

// 22. LOW IMMUNITY
const lowImmunity: SymptomResponse = {
  symptomId: 'low-immunity',
  symptomName: 'Low Immunity & Frequent Illness',
  ayurvedicName: 'Vyadhikshamatva Hrasa / Ojas Kshaya',
  doshaInvolvement: ['All doshas'],
  sutraIds: ['sutra-012', 'sutra-013', 'sutra-040', 'sutra-041'],
  response: `Charaka Samhita describes Vyadhikshamatva (immunity) as depending on the strength of Ojas, proper balance of doshas, and vigor of dhatus.

Rasayana (rejuvenation therapy) enhances immunity, promotes longevity, improves memory, maintains youthfulness, and prevents diseases. Ojas-building foods include ghee, milk, almonds, honey, and rejuvenative herbs.`,
  quickRemedies: [
    'Take Chyawanprash daily (1-2 tsp)',
    'Drink warm milk with turmeric (golden milk)',
    'Take Ashwagandha with milk',
    'Eat 5-6 soaked almonds daily'
  ],
  dietaryAdvice: [
    'Eat fresh, seasonal, wholesome foods',
    'Include ghee, milk, honey, dates',
    'Eat freshly cooked meals',
    'Avoid processed, stale, and junk foods'
  ],
  lifestyleAdvice: [
    'Sleep adequately and on time',
    'Exercise moderately and regularly',
    'Practice stress management',
    'Follow daily routine (Dinacharya)'
  ],
  herbs: [
    { name: 'Chyawanprash', benefit: 'Classical immunity builder' },
    { name: 'Ashwagandha', benefit: 'Adaptogen, builds strength' },
    { name: 'Amalaki', benefit: 'Rich in Vitamin C, builds Ojas' }
  ],
  yogaAsanas: ['Surya Namaskar', 'Pranayama', 'Meditation', 'Walking']
};

// 23. PCOS/PCOD
const pcos: SymptomResponse = {
  symptomId: 'pcos',
  symptomName: 'PCOS/PCOD',
  ayurvedicName: 'Yonivyapad / Aartava Dushti',
  doshaInvolvement: ['Kapha', 'Vata'],
  sutraIds: ['sutra-032', 'sutra-033'],
  response: `Charaka Samhita describes Yonivyapad (uterine disorders) as twenty types, occurring due to improper diet, lifestyle, and suppression of natural urges.

Shatavari (Asparagus racemosus) is the supreme rejuvenative for women. It balances hormones, supports reproductive health, and nourishes all female tissues. Treatment involves Kapha-reducing measures and hormonal balance.`,
  quickRemedies: [
    'Take Shatavari powder with warm milk',
    'Drink spearmint tea (2 cups daily)',
    'Take Triphala at bedtime',
    'Apply castor oil pack to lower abdomen'
  ],
  dietaryAdvice: [
    'Avoid dairy, sugar, and refined carbs',
    'Include whole grains and vegetables',
    'Add cinnamon, fenugreek, flaxseeds',
    'Eat anti-inflammatory foods'
  ],
  lifestyleAdvice: [
    'Exercise regularly - essential for PCOS',
    'Manage stress through yoga and meditation',
    'Maintain healthy weight',
    'Sleep adequately and regularly'
  ],
  herbs: [
    { name: 'Shatavari', benefit: 'Balances female hormones' },
    { name: 'Ashoka', benefit: 'Supports uterine health' },
    { name: 'Lodhra', benefit: 'Regulates menstrual cycle' }
  ],
  yogaAsanas: ['Baddha Konasana', 'Supta Baddha Konasana', 'Bhujangasana', 'Pranayama'],
  warning: 'PCOS requires proper diagnosis. Work with healthcare providers for comprehensive management.'
};

// Add all remaining symptoms to the array
symptomMappings.push(
  procrastination,
  overthinking,
  highBP,
  thyroid,
  backPain,
  neckPain,
  headache,
  hairFall,
  acidity,
  jointPain,
  diabetes,
  coldCough,
  skinIssues,
  lowImmunity,
  pcos
);

export default symptomMappings;
