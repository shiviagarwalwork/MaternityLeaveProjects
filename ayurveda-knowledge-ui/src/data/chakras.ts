export interface Chakra {
  id: string;
  number: number;
  name: string;
  sanskrit: string;
  translation: string;
  location: string;
  color: string;
  element: string;
  symbol: string;

  // Modern Translation
  westernConcept: string;
  modernIssue: string;

  // Physical Connections
  physicalLink: {
    glands: string;
    organs: string[];
    bodyParts: string[];
  };

  // When Balanced
  balanced: {
    physical: string[];
    emotional: string[];
    mental: string[];
    spiritual: string[];
  };

  // When Imbalanced
  imbalanced: {
    excessive: string[];
    deficient: string[];
    physical_symptoms: string[];
  };

  // Balance Practices
  practices: {
    yoga_poses: string[];
    breathwork: string;
    meditation: string;
    affirmations: string[];
    foods: string[];
    colors: string;
    sounds: string;
    crystals: string[];
  };

  // Modern Life Application
  modernApplication: {
    challenge: string;
    solution: string;
    daily_practice: string;
    quick_fix: string;
  };
}

export const chakras: Chakra[] = [
  {
    id: 'root',
    number: 1,
    name: 'Root Chakra',
    sanskrit: 'Muladhara',
    translation: 'Root Support',
    location: 'Base of spine',
    color: '#DC2626',
    element: 'Earth',
    symbol: '🔴',

    westernConcept: 'Safety, Security & Survival',
    modernIssue: 'Financial anxiety, job insecurity, housing stress, lack of safety',

    physicalLink: {
      glands: 'Adrenal glands',
      organs: ['Large intestine', 'Kidneys', 'Bladder'],
      bodyParts: ['Legs', 'Feet', 'Bones', 'Spine base']
    },

    balanced: {
      physical: ['Strong immunity', 'Good physical stamina', 'Stable weight', 'Healthy elimination'],
      emotional: ['Feel safe and secure', 'Financially stable', 'Grounded', 'Present in body'],
      mental: ['Clear thinking', 'Good focus', 'Practical', 'Organized'],
      spiritual: ['Connected to Earth', 'Trust in life', 'Sense of belonging']
    },

    imbalanced: {
      excessive: ['Greed', 'Hoarding', 'Materialism', 'Resistance to change', 'Rigid thinking'],
      deficient: ['Anxiety', 'Fear', 'Feeling ungrounded', 'Lack of focus', 'Financial instability'],
      physical_symptoms: ['Constipation', 'Lower back pain', 'Fatigue', 'Weak immunity', 'Cold hands/feet']
    },

    practices: {
      yoga_poses: ['Mountain Pose', 'Warrior I', 'Tree Pose', 'Squats', 'Standing Forward Fold'],
      breathwork: 'Square breathing (4-4-4-4)',
      meditation: 'Grounding meditation - Visualize roots growing from feet into Earth',
      affirmations: [
        'I am safe and secure',
        'I have everything I need',
        'I trust the process of life',
        'I am grounded and stable'
      ],
      foods: ['Root vegetables (beets, carrots, potatoes)', 'Protein', 'Red foods'],
      colors: 'Wear red, surround yourself with earth tones',
      sounds: 'LAM mantra, drums, grounding music',
      crystals: ['Red jasper', 'Hematite', 'Black tourmaline']
    },

    modernApplication: {
      challenge: 'Living paycheck to paycheck, unstable housing, constant financial stress',
      solution: 'Create financial plan, build emergency fund, establish routine, connect with nature',
      daily_practice: 'Barefoot walking on earth 10 min, grounding meditation, budgeting',
      quick_fix: 'Stand barefoot on ground, deep breaths into belly, visualize red light at spine base'
    }
  },

  {
    id: 'sacral',
    number: 2,
    name: 'Sacral Chakra',
    sanskrit: 'Svadhisthana',
    translation: 'One\'s Own Place',
    location: 'Lower abdomen, below navel',
    color: '#F97316',
    element: 'Water',
    symbol: '🟠',

    westernConcept: 'Creativity, Pleasure & Emotions',
    modernIssue: 'Creative blocks, lack of joy, unhealthy relationships, emotional numbness',

    physicalLink: {
      glands: 'Reproductive organs (ovaries, testes)',
      organs: ['Reproductive organs', 'Bladder', 'Kidneys'],
      bodyParts: ['Hips', 'Lower back', 'Sexual organs']
    },

    balanced: {
      physical: ['Healthy sexuality', 'Regular periods', 'Flexible hips', 'Good fluid balance'],
      emotional: ['Emotionally balanced', 'Comfortable with pleasure', 'Creative flow', 'Healthy boundaries'],
      mental: ['Creative thinking', 'Able to adapt', 'Open to new experiences'],
      spiritual: ['Connected to pleasure', 'In flow with life', 'Emotionally expressive']
    },

    imbalanced: {
      excessive: ['Addiction', 'Emotional dependency', 'Sexual obsession', 'Drama seeking'],
      deficient: ['Creative blocks', 'Lack of desire', 'Emotional numbness', 'Rigid thinking', 'Fear of pleasure'],
      physical_symptoms: ['Reproductive issues', 'Lower back pain', 'Urinary problems', 'Hip stiffness']
    },

    practices: {
      yoga_poses: ['Hip openers', 'Goddess Pose', 'Pigeon Pose', 'Bound Angle', 'Pelvic circles'],
      breathwork: 'Breath of fire (rapid belly breathing)',
      meditation: 'Water visualization - Imagine orange light flowing like water',
      affirmations: [
        'I embrace pleasure and creativity',
        'I feel my emotions fully',
        'I am creative and passionate',
        'I deserve joy and pleasure'
      ],
      foods: ['Orange foods (oranges, carrots, mango)', 'Water', 'Healthy fats'],
      colors: 'Wear orange, surround yourself with water elements',
      sounds: 'VAM mantra, flowing water sounds',
      crystals: ['Carnelian', 'Orange calcite', 'Moonstone']
    },

    modernApplication: {
      challenge: 'Stuck in routine, no time for creativity, pleasure guilt, emotional suppression',
      solution: 'Schedule creative time, allow healthy pleasure, express emotions, dance',
      daily_practice: 'Creative activity (art, music, writing), hip stretches, pleasurable ritual',
      quick_fix: 'Pelvic circles, dance to favorite song, journal emotions, take a bath'
    }
  },

  {
    id: 'solar-plexus',
    number: 3,
    name: 'Solar Plexus Chakra',
    sanskrit: 'Manipura',
    translation: 'Lustrous Gem',
    location: 'Upper abdomen, above navel',
    color: '#EAB308',
    element: 'Fire',
    symbol: '🟡',

    westernConcept: 'Personal Power & Confidence',
    modernIssue: 'Low self-esteem, people-pleasing, lack of boundaries, digestive issues',

    physicalLink: {
      glands: 'Pancreas',
      organs: ['Stomach', 'Liver', 'Gallbladder', 'Spleen'],
      bodyParts: ['Digestive system', 'Abdomen', 'Middle back']
    },

    balanced: {
      physical: ['Strong digestion', 'Good metabolism', 'Healthy weight', 'Core strength'],
      emotional: ['Confident', 'Self-assured', 'Motivated', 'Healthy boundaries'],
      mental: ['Clear goals', 'Good decision-making', 'Self-discipline', 'Focus'],
      spiritual: ['Sense of purpose', 'Personal power', 'Will to act']
    },

    imbalanced: {
      excessive: ['Controlling', 'Aggressive', 'Dominating', 'Workaholic', 'Perfectionism'],
      deficient: ['Passive', 'People-pleasing', 'Lack of direction', 'Low self-esteem', 'Victim mentality'],
      physical_symptoms: ['Digestive issues', 'Ulcers', 'Diabetes', 'Eating disorders', 'Fatigue']
    },

    practices: {
      yoga_poses: ['Boat Pose', 'Warrior III', 'Plank', 'Twists', 'Core strengthening'],
      breathwork: 'Breath of fire (builds inner fire)',
      meditation: 'Inner fire meditation - Visualize yellow sun in belly',
      affirmations: [
        'I am powerful and confident',
        'I honor my personal power',
        'I am worthy of respect',
        'I stand in my truth'
      ],
      foods: ['Yellow foods (bananas, corn, yellow peppers)', 'Whole grains', 'Digestive spices'],
      colors: 'Wear yellow, bright warm colors',
      sounds: 'RAM mantra, empowering music',
      crystals: ['Citrine', 'Tiger\'s eye', 'Yellow jasper']
    },

    modernApplication: {
      challenge: 'Saying yes when you mean no, fear of conflict, imposter syndrome, weak boundaries',
      solution: 'Practice saying no, set boundaries, assertiveness training, own your achievements',
      daily_practice: 'Core exercises, power pose 2 min, boundary check, celebrate wins',
      quick_fix: 'Stand tall, deep belly breaths, affirmation, imagine yellow light in solar plexus'
    }
  },

  {
    id: 'heart',
    number: 4,
    name: 'Heart Chakra',
    sanskrit: 'Anahata',
    translation: 'Unstruck',
    location: 'Center of chest',
    color: '#10B981',
    element: 'Air',
    symbol: '🟢',

    westernConcept: 'Love, Compassion & Connection',
    modernIssue: 'Loneliness despite social media, difficulty with intimacy, heart disease',

    physicalLink: {
      glands: 'Thymus gland',
      organs: ['Heart', 'Lungs', 'Circulatory system'],
      bodyParts: ['Chest', 'Arms', 'Hands', 'Upper back']
    },

    balanced: {
      physical: ['Healthy heart', 'Good circulation', 'Strong immune system', 'Easy breathing'],
      emotional: ['Loving and compassionate', 'Able to give and receive', 'Forgiving', 'Connected to others'],
      mental: ['Balanced relationships', 'Empathetic', 'Open-minded'],
      spiritual: ['Unconditional love', 'Unity consciousness', 'Deep connection']
    },

    imbalanced: {
      excessive: ['Codependency', 'Jealousy', 'Giving too much', 'Possessiveness', 'Martyrdom'],
      deficient: ['Loneliness', 'Isolation', 'Difficulty loving', 'Cold-hearted', 'Critical'],
      physical_symptoms: ['Heart problems', 'Asthma', 'Lung issues', 'High/low blood pressure', 'Shoulder tension']
    },

    practices: {
      yoga_poses: ['Camel Pose', 'Bridge', 'Cobra', 'Chest openers', 'Backbends'],
      breathwork: 'Heart-opening breath (equal inhale/exhale)',
      meditation: 'Loving-kindness meditation - Send love to self and others',
      affirmations: [
        'I am love, I give and receive love freely',
        'My heart is open',
        'I forgive myself and others',
        'I am connected to all beings'
      ],
      foods: ['Green foods (leafy greens, broccoli)', 'Green tea', 'Heart-healthy fats'],
      colors: 'Wear green and pink, surround with plants',
      sounds: 'YAM mantra, heart-opening music',
      crystals: ['Rose quartz', 'Green aventurine', 'Jade']
    },

    modernApplication: {
      challenge: '1000 Facebook friends but feel alone, fear of vulnerability, past heartbreak',
      solution: 'Real face-to-face connection, therapy, self-compassion, forgiveness work',
      daily_practice: 'Loving-kindness meditation, reach out to real friend, heart-opening yoga, gratitude',
      quick_fix: 'Hand on heart, deep breath, send yourself love, call a real friend'
    }
  },

  {
    id: 'throat',
    number: 5,
    name: 'Throat Chakra',
    sanskrit: 'Vishuddha',
    translation: 'Purification',
    location: 'Throat',
    color: '#3B82F6',
    element: 'Sound/Ether',
    symbol: '🔵',

    westernConcept: 'Expression & Authentic Truth',
    modernIssue: 'Fear of speaking up, people-pleasing, not living authentically',

    physicalLink: {
      glands: 'Thyroid and parathyroid',
      organs: ['Throat', 'Mouth', 'Ears', 'Neck'],
      bodyParts: ['Jaw', 'Neck', 'Shoulders', 'Voice']
    },

    balanced: {
      physical: ['Clear voice', 'Healthy thyroid', 'Good hearing', 'Relaxed neck'],
      emotional: ['Authentic expression', 'Good communication', 'Active listening', 'Speaking truth'],
      mental: ['Clear thoughts', 'Honest', 'Creative expression', 'Good timing'],
      spiritual: ['Living authentically', 'Speaking your truth', 'Telepathic']
    },

    imbalanced: {
      excessive: ['Talking too much', 'Not listening', 'Gossiping', 'Interrupting', 'Loud'],
      deficient: ['Fear of speaking', 'Shyness', 'Difficulty expressing', 'Swallowing words', 'Lying'],
      physical_symptoms: ['Sore throat', 'Thyroid issues', 'Jaw tension', 'Neck stiffness', 'Voice problems']
    },

    practices: {
      yoga_poses: ['Shoulder Stand', 'Fish Pose', 'Plow Pose', 'Neck stretches', 'Lion\'s Breath'],
      breathwork: 'Ujjayi breath (ocean breath)',
      meditation: 'Chanting meditation - OM or HAM',
      affirmations: [
        'I speak my truth clearly',
        'My voice matters',
        'I express myself authentically',
        'I am heard'
      ],
      foods: ['Blue foods (blueberries)', 'Liquids (water, herbal tea)', 'Fruits'],
      colors: 'Wear blue, turquoise',
      sounds: 'HAM mantra, singing, chanting',
      crystals: ['Blue lace agate', 'Turquoise', 'Aquamarine']
    },

    modernApplication: {
      challenge: 'Staying quiet in meetings, not expressing needs, living for others, swallowing anger',
      solution: 'Practice speaking up, journaling, singing, saying no, authentic living',
      daily_practice: 'Speak truth once today, journal, sing in shower, neck rolls, practice saying no',
      quick_fix: 'Lion\'s breath, hum, speak one truth, release jaw tension, express what you really think'
    }
  },

  {
    id: 'third-eye',
    number: 6,
    name: 'Third Eye Chakra',
    sanskrit: 'Ajna',
    translation: 'Command',
    location: 'Between eyebrows',
    color: '#6366F1',
    element: 'Light',
    symbol: '🟣',

    westernConcept: 'Intuition & Inner Wisdom',
    modernIssue: 'Information overload, can\'t trust gut feelings, confusion',

    physicalLink: {
      glands: 'Pineal gland',
      organs: ['Eyes', 'Brain', 'Nervous system'],
      bodyParts: ['Forehead', 'Sinuses', 'Eyes']
    },

    balanced: {
      physical: ['Clear vision', 'Good sleep cycles', 'Healthy brain function'],
      emotional: ['Intuitive', 'Insightful', 'Clear perception', 'Trust inner guidance'],
      mental: ['Clarity', 'Vision', 'Imagination', 'Wisdom', 'Learning'],
      spiritual: ['Psychic abilities', 'Inner vision', 'Connection to higher mind']
    },

    imbalanced: {
      excessive: ['Delusional', 'Hallucinations', 'Obsessed with psychic', 'Nightmares', 'Difficulty concentrating'],
      deficient: ['Lack of intuition', 'Poor memory', 'Can\'t visualize', 'Denial', 'Confusion'],
      physical_symptoms: ['Headaches', 'Vision problems', 'Sinusitis', 'Insomnia', 'Hormonal imbalance']
    },

    practices: {
      yoga_poses: ['Child\'s Pose', 'Forward Fold', 'Downward Dog', 'Eye exercises'],
      breathwork: 'Alternate nostril breathing (balances hemispheres)',
      meditation: 'Visualization - Focus on third eye, imagine indigo light',
      affirmations: [
        'I trust my intuition',
        'I see clearly',
        'I am connected to my inner wisdom',
        'I trust my inner voice'
      ],
      foods: ['Purple foods (eggplant, purple cabbage, grapes)', 'Omega-3s', 'Dark chocolate'],
      colors: 'Wear indigo, purple',
      sounds: 'OM mantra, binaural beats',
      crystals: ['Amethyst', 'Lapis lazuli', 'Purple fluorite']
    },

    modernApplication: {
      challenge: 'Too much data, can\'t make decisions, ignoring gut feelings, screen overload',
      solution: 'Digital detox, meditation, journaling, trust your gut, quiet contemplation',
      daily_practice: 'Morning meditation, limit news, journal insights, practice intuition, screen-free time',
      quick_fix: 'Close eyes, focus on third eye, ask your gut, sit in darkness, unplug'
    }
  },

  {
    id: 'crown',
    number: 7,
    name: 'Crown Chakra',
    sanskrit: 'Sahasrara',
    translation: 'Thousand Petaled',
    location: 'Top of head',
    color: '#A855F7',
    element: 'Thought/Consciousness',
    symbol: '🟪',

    westernConcept: 'Connection & Higher Purpose',
    modernIssue: 'Existential crisis, feeling lost, no sense of meaning',

    physicalLink: {
      glands: 'Pituitary gland (master gland)',
      organs: ['Brain', 'Nervous system'],
      bodyParts: ['Top of head', 'Cerebral cortex']
    },

    balanced: {
      physical: ['Healthy nervous system', 'Good sleep', 'Balanced hormones'],
      emotional: ['Peace', 'Joy', 'Serenity', 'Connected to something greater'],
      mental: ['Clear purpose', 'Understanding', 'Wisdom', 'Open-minded'],
      spiritual: ['Connected to divine', 'Unity consciousness', 'Enlightenment', 'Bliss']
    },

    imbalanced: {
      excessive: ['Spiritual bypass', 'Disconnected from body', 'Confusion', 'Dissociation'],
      deficient: ['Cynicism', 'Closed-minded', 'Materialism only', 'No spiritual connection', 'Apathy'],
      physical_symptoms: ['Migraines', 'Neurological disorders', 'Sensitivity to light', 'Chronic exhaustion']
    },

    practices: {
      yoga_poses: ['Headstand', 'Corpse Pose', 'Meditation poses', 'Inversions'],
      breathwork: 'Silent breath observation',
      meditation: 'Silent meditation - Witness consciousness',
      affirmations: [
        'I am connected to all that is',
        'I am divine consciousness',
        'I trust the universe',
        'I am one with everything'
      ],
      foods: ['Fasting (occasionally)', 'Pure water', 'Light foods', 'Mindful eating'],
      colors: 'Wear violet, white, gold',
      sounds: 'Silence, OM, sacred chanting',
      crystals: ['Clear quartz', 'Selenite', 'Diamond']
    },

    modernApplication: {
      challenge: 'Life feels meaningless, just going through motions, no purpose, disconnected',
      solution: 'Spiritual practice, nature connection, meditation, finding purpose, service',
      daily_practice: 'Morning meditation, gratitude, nature time, contemplate purpose, service to others',
      quick_fix: 'Stop everything, breathe, connect to sky, remember you\'re part of something greater'
    }
  }
];

export const getChakra = (chakraId: string): Chakra | undefined => {
  return chakras.find(c => c.id === chakraId);
};
