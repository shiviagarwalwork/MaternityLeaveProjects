'use client';

import { useState, useEffect } from 'react';
import { DoshaResult } from '@/types';
import { Calendar, Clock, Coffee, Sun, Moon, Utensils, Activity, Droplets, CheckCircle2, Download, Lightbulb, FileText, Leaf, Ban, Pill, User, Apple, XCircle, Sparkles } from 'lucide-react';

interface PersonalizedPlanProps {
  doshaResult?: DoshaResult;
  symptoms?: string[];
}

interface DailyScheduleItem {
  time: string;
  activity: string;
  description: string;
  icon: any;
  category: 'morning' | 'afternoon' | 'evening' | 'night';
}

export default function PersonalizedPlan({ doshaResult: propDoshaResult, symptoms = [] }: PersonalizedPlanProps) {
  const [doshaResult, setDoshaResult] = useState<DoshaResult | null>(propDoshaResult || null);
  const [selectedDosha, setSelectedDosha] = useState<string>(propDoshaResult?.dominant || 'vata');
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  // Load dosha result and symptoms from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDoshaResult = localStorage.getItem('doshaResult');
      if (savedDoshaResult) {
        const parsed = JSON.parse(savedDoshaResult);
        setDoshaResult(parsed);
        setSelectedDosha(parsed.dominant);
        setHasCompletedQuiz(true);
      }

      const savedSymptoms = localStorage.getItem('userSymptoms');
      if (savedSymptoms) {
        setUserSymptoms(JSON.parse(savedSymptoms));
      }
    }
  }, []);

  // Get secondary dosha (second highest percentage)
  const getSecondaryDosha = (): string | null => {
    if (!doshaResult) return null;
    const doshas = [
      { name: 'vata', value: doshaResult.vata },
      { name: 'pitta', value: doshaResult.pitta },
      { name: 'kapha', value: doshaResult.kapha }
    ].sort((a, b) => b.value - a.value);

    // If secondary is significant (>25%), return it
    if (doshas[1].value >= 25) {
      return doshas[1].name;
    }
    return null;
  };

  // Get constitution type description
  const getConstitutionType = (): string => {
    if (!doshaResult) return selectedDosha.charAt(0).toUpperCase() + selectedDosha.slice(1);

    const secondary = getSecondaryDosha();
    const dominant = doshaResult.dominant.charAt(0).toUpperCase() + doshaResult.dominant.slice(1);

    if (secondary) {
      const sec = secondary.charAt(0).toUpperCase() + secondary.slice(1);
      return `${dominant}-${sec}`;
    }
    return dominant;
  };

  // Get personalized recommendations based on symptoms
  const getSymptomRecommendations = (symptoms: string[]): Array<{text: string}> => {
    const recommendations: Array<{text: string}> = [];

    if (symptoms.includes('Anxiety')) {
      recommendations.push({text: 'Add 10 min meditation or deep breathing before bed (calms vata)'});
      recommendations.push({text: 'Avoid caffeine after 2 PM (aggravates anxiety)'});
    }

    if (symptoms.includes('Insomnia')) {
      recommendations.push({text: 'No screens 1 hour before bed - blue light disrupts sleep'});
      recommendations.push({text: 'Warm milk with nutmeg 30 min before sleep'});
    }

    if (symptoms.includes('Indigestion') || symptoms.includes('Acidity')) {
      recommendations.push({text: 'Lunch should be your largest meal (when digestion is strongest)'});
      recommendations.push({text: 'Avoid eating after 7 PM'});
      recommendations.push({text: 'Drink ginger tea 20 min before meals'});
    }

    if (symptoms.includes('Fatigue') || symptoms.includes('Low Immunity')) {
      recommendations.push({text: 'Consider Ashwagandha (300mg) in warm milk before bed'});
      recommendations.push({text: 'Prioritize 7-8 hours sleep - this rebuilds ojas (vitality)'});
    }

    if (symptoms.includes('Constipation')) {
      recommendations.push({text: '1 tbsp ghee in warm water first thing in morning'});
      recommendations.push({text: 'Add more fiber: cooked vegetables, prunes, flaxseeds'});
    }

    if (symptoms.includes('Headache')) {
      recommendations.push({text: 'Check hydration - drink warm water throughout day'});
      recommendations.push({text: 'Reduce screen time - take 5 min break every hour'});
    }

    if (symptoms.includes('Skin Rash') || symptoms.includes('Acne')) {
      recommendations.push({text: 'Avoid spicy, oily, fried foods (aggravates pitta)'});
      recommendations.push({text: 'Apply aloe vera gel topically for cooling'});
    }

    if (symptoms.includes('Joint Pain')) {
      recommendations.push({text: 'Daily oil massage focuses on joints (reduces vata/ama)'});
      recommendations.push({text: 'Drink turmeric milk (half tsp turmeric in warm milk)'});
    }

    return recommendations;
  };

  const getDoshaSchedule = (dosha: string): DailyScheduleItem[] => {
    const baseSchedule: Record<string, DailyScheduleItem[]> = {
      vata: [
        {
          time: '5:30 AM',
          activity: 'Wake up during Brahma Muhurta',
          description: 'Your anxious mind needs the calm morning energy. Wake up gently, avoid checking your phone.',
          icon: Sun,
          category: 'morning'
        },
        {
          time: '5:45 AM',
          activity: 'Warm water with ginger',
          description: 'Drink 1 cup of warm water with fresh grated ginger (½ tsp) to ignite your digestive fire.',
          icon: Coffee,
          category: 'morning'
        },
        {
          time: '6:00 AM',
          activity: 'Oil massage (Abhyanga)',
          description: 'Use warm sesame oil for 10-15 minutes. Focus on feet and scalp. This grounds your scattered energy.',
          icon: Activity,
          category: 'morning'
        },
        {
          time: '6:30 AM',
          activity: 'Gentle yoga or walking',
          description: '20-30 minutes of slow, grounding movement. Avoid high-intensity workouts - they increase Vata.',
          icon: Activity,
          category: 'morning'
        },
        {
          time: '7:30 AM',
          activity: 'Warm, nourishing breakfast',
          description: 'Eat warm oatmeal with ghee, cinnamon, and dates OR kitchari. Avoid cold smoothies and raw foods.',
          icon: Utensils,
          category: 'morning'
        },
        {
          time: '12:30 PM',
          activity: 'Largest meal of the day',
          description: 'Eat warm, cooked foods: rice, dal, cooked vegetables with ghee. Include all 6 tastes. Sit down, no screens.',
          icon: Utensils,
          category: 'afternoon'
        },
        {
          time: '3:00 PM',
          activity: 'Hydration check',
          description: 'Drink warm water or herbal tea (ginger, cinnamon). Vata types need 6-8 glasses daily. Room temperature minimum.',
          icon: Droplets,
          category: 'afternoon'
        },
        {
          time: '6:30 PM',
          activity: 'Light dinner',
          description: 'Eat by 7 PM latest. Soup, stew, or kitchari. Keep it warm, oily, and grounding. Avoid salads.',
          icon: Utensils,
          category: 'evening'
        },
        {
          time: '8:00 PM',
          activity: 'Evening wind-down',
          description: 'Warm bath, gentle stretching, or meditation. Avoid screens, news, or stimulating content.',
          icon: Moon,
          category: 'evening'
        },
        {
          time: '9:30 PM',
          activity: 'Bedtime routine',
          description: 'Foot massage with sesame oil. Ashwagandha with warm milk. Read a physical book. Lights out by 10 PM.',
          icon: Moon,
          category: 'night'
        }
      ],
      pitta: [
        {
          time: '6:00 AM',
          activity: 'Wake up naturally',
          description: 'Your driven nature wants to wake earlier, but 6 AM is perfect. Start slow - rushing increases Pitta.',
          icon: Sun,
          category: 'morning'
        },
        {
          time: '6:15 AM',
          activity: 'Cool water with lime',
          description: 'Drink 1 cup of room temperature water with fresh lime juice. Cools your internal fire.',
          icon: Coffee,
          category: 'morning'
        },
        {
          time: '6:30 AM',
          activity: 'Coconut oil massage',
          description: 'Use coconut oil for self-massage. Focus on cooling your head and feet. 10-15 minutes.',
          icon: Activity,
          category: 'morning'
        },
        {
          time: '7:00 AM',
          activity: 'Moderate exercise',
          description: 'Swimming, yoga, or brisk walk. Avoid competitive sports and hot yoga - they inflame you.',
          icon: Activity,
          category: 'morning'
        },
        {
          time: '8:00 AM',
          activity: 'Cooling breakfast',
          description: 'Fresh fruit, oatmeal with coconut, or whole grain toast. Avoid coffee - switch to green tea or skip caffeine.',
          icon: Utensils,
          category: 'morning'
        },
        {
          time: '12:00 PM',
          activity: 'Substantial lunch',
          description: 'This is your main meal. Include cooling foods: cucumber, cilantro, coconut. Avoid spicy, sour, and fried foods.',
          icon: Utensils,
          category: 'afternoon'
        },
        {
          time: '3:00 PM',
          activity: 'Cool down break',
          description: 'Drink cool (not ice cold) water or mint tea. Take a walk outside. Avoid pushing through - Pitta burns out.',
          icon: Droplets,
          category: 'afternoon'
        },
        {
          time: '7:00 PM',
          activity: 'Light, early dinner',
          description: 'Eat before sunset if possible. Include sweet, bitter, astringent tastes. Rice, steamed veggies, mung dal.',
          icon: Utensils,
          category: 'evening'
        },
        {
          time: '8:30 PM',
          activity: 'Relaxation time',
          description: 'No work emails! Cool shower, gentle music, or light reading. Your intense mind needs to decompress.',
          icon: Moon,
          category: 'evening'
        },
        {
          time: '10:00 PM',
          activity: 'Sleep routine',
          description: 'Brahmi tea or cool milk with cardamom. Keep room cool. Avoid screens 1 hour before bed.',
          icon: Moon,
          category: 'night'
        }
      ],
      kapha: [
        {
          time: '5:00 AM',
          activity: 'Early wake up (hardest for you!)',
          description: 'Set multiple alarms. Get up immediately - don\'t snooze! Morning sluggishness is Kapha speaking.',
          icon: Sun,
          category: 'morning'
        },
        {
          time: '5:15 AM',
          activity: 'Hot water with honey & lemon',
          description: 'Drink 1 cup hot water with 1 tsp honey + lemon juice. Kickstarts your slow metabolism.',
          icon: Coffee,
          category: 'morning'
        },
        {
          time: '5:30 AM',
          activity: 'Vigorous dry brushing',
          description: 'Dry brush your whole body toward your heart. Then do self-massage with almond/sunflower oil (less oil than other doshas).',
          icon: Activity,
          category: 'morning'
        },
        {
          time: '6:00 AM',
          activity: 'Intense exercise',
          description: '45-60 minutes cardio, running, HIIT, or power yoga. You NEED to sweat and get your heart rate up.',
          icon: Activity,
          category: 'morning'
        },
        {
          time: '7:30 AM',
          activity: 'Light breakfast (or skip)',
          description: 'Fruit, spiced tea, or light whole grains. You can skip breakfast - Kapha does well with intermittent fasting.',
          icon: Utensils,
          category: 'morning'
        },
        {
          time: '12:00 PM',
          activity: 'Main meal with spices',
          description: 'This is your biggest meal. Include ginger, black pepper, turmeric, cayenne. Avoid dairy, fried, and heavy foods.',
          icon: Utensils,
          category: 'afternoon'
        },
        {
          time: '2:30 PM',
          activity: 'Movement break',
          description: 'No napping! Walk, stretch, or do jumping jacks. Kapha wants to rest - resist it.',
          icon: Activity,
          category: 'afternoon'
        },
        {
          time: '6:00 PM',
          activity: 'Light, early dinner',
          description: 'Soup or steamed veggies with minimal oil. Pungent, bitter, astringent tastes. Small portions.',
          icon: Utensils,
          category: 'evening'
        },
        {
          time: '7:30 PM',
          activity: 'Stimulating activities',
          description: 'Social time, creative projects, or learning something new. Avoid TV binging - it increases lethargy.',
          icon: Activity,
          category: 'evening'
        },
        {
          time: '10:00 PM',
          activity: 'Bedtime',
          description: 'You don\'t need 10+ hours of sleep - 6-7 is enough. Trikatu or ginger tea. Keep room warm but not stuffy.',
          icon: Moon,
          category: 'night'
        }
      ]
    };

    return baseSchedule[dosha] || baseSchedule.vata;
  };

  // Comprehensive food recommendations for each dosha
  const getDoshaFoods = (dosha: string) => {
    const foods: Record<string, { eat: string[]; avoid: string[]; spices: string[] }> = {
      vata: {
        eat: [
          'Warm soups and stews',
          'Cooked grains: rice, oats, wheat',
          'Root vegetables: carrots, beets, sweet potatoes',
          'Ripe fruits: bananas, mangoes, papayas',
          'Warm milk with ghee',
          'Nuts and seeds (soaked)',
          'Mung dal and red lentils',
          'Healthy oils: ghee, sesame oil'
        ],
        avoid: [
          'Raw vegetables and salads',
          'Cold drinks and ice cream',
          'Dried fruits (unless soaked)',
          'Beans (except mung dal)',
          'Caffeine and stimulants',
          'Crackers, chips, dry snacks',
          'Bitter greens in excess',
          'Skipping meals'
        ],
        spices: ['Ginger', 'Cumin', 'Cinnamon', 'Cardamom', 'Fennel', 'Turmeric', 'Asafoetida (hing)']
      },
      pitta: {
        eat: [
          'Cooling foods: cucumber, melon, coconut',
          'Sweet fruits: grapes, pomegranate, pears',
          'Leafy greens and bitter vegetables',
          'Basmati rice, barley, oats',
          'Mung beans, tofu',
          'Ghee and coconut oil',
          'Fresh dairy: milk, butter',
          'Mint, cilantro, fennel'
        ],
        avoid: [
          'Spicy foods: chilies, hot peppers',
          'Sour foods: tomatoes, citrus, vinegar',
          'Fermented foods: alcohol, pickles',
          'Red meat and eggs',
          'Excess salt',
          'Coffee and caffeinated drinks',
          'Fried and oily foods',
          'Onion, garlic (in excess)'
        ],
        spices: ['Coriander', 'Fennel', 'Cardamom', 'Turmeric', 'Mint', 'Saffron', 'Cumin (in moderation)']
      },
      kapha: {
        eat: [
          'Light, warm foods',
          'Leafy greens and vegetables',
          'Legumes: lentils, chickpeas',
          'Astringent fruits: apples, pears, berries',
          'Light grains: millet, barley, buckwheat',
          'Honey (raw, unheated)',
          'Ginger tea',
          'Spicy foods in moderation'
        ],
        avoid: [
          'Dairy: milk, cheese, ice cream',
          'Heavy, fried foods',
          'Excess sweets and sugar',
          'Wheat and white rice',
          'Cold foods and drinks',
          'Red meat',
          'Excess oils and fats',
          'Bananas, avocados, coconut'
        ],
        spices: ['Black pepper', 'Ginger', 'Turmeric', 'Cayenne', 'Mustard seeds', 'Cloves', 'Fenugreek']
      }
    };
    return foods[dosha];
  };

  const getDoshaGuidelines = (dosha: string) => {
    const guidelines: Record<string, any> = {
      vata: {
        water: '6-8 glasses of warm or room temperature water',
        flour: 'Whole wheat, oat flour, rice flour (cooked, not raw)',
        avoid: 'Cold foods, raw foods, excess caffeine, skipping meals',
        supplements: 'Ashwagandha (500mg 2x/day), Triphala at night, sesame oil',
        lifestyle: 'Regular routine, warm environments, oil massage, adequate sleep (7-8 hours)',
        exercise: 'Gentle yoga, walking, swimming, tai chi - avoid intense cardio',
        oilType: 'Warm sesame oil for massage',
        bestTime: 'Eat meals at regular times, biggest meal at lunch',
        season: 'Most vulnerable in fall/early winter - stay extra warm and grounded'
      },
      pitta: {
        water: '8-10 glasses of cool (not ice cold) water throughout the day',
        flour: 'Whole wheat, barley flour, oat flour, avoid excess refined grains',
        avoid: 'Spicy foods, alcohol, sour foods, hot yoga, competitive sports',
        supplements: 'Brahmi (300mg daily), Aloe vera juice, coconut oil',
        lifestyle: 'Moderate exercise, cooling practices, avoid overworking, take breaks',
        exercise: 'Swimming, cycling, moderate yoga - avoid hot yoga and midday exercise',
        oilType: 'Coconut oil for cooling massage',
        bestTime: 'Avoid eating when angry or stressed, lunch is most important',
        season: 'Most vulnerable in summer - stay cool, avoid sun during 10am-2pm'
      },
      kapha: {
        water: '4-6 glasses of warm/hot water (less than other doshas)',
        flour: 'Buckwheat, millet, rye, corn flour - lighter grains only',
        avoid: 'Dairy, fried foods, excess sweets, heavy foods, oversleeping',
        supplements: 'Trikatu, Guggulu, dry ginger powder, honey (unheated)',
        lifestyle: 'Vigorous daily exercise, avoid daytime naps, wake early, stay active',
        exercise: 'Running, HIIT, power yoga, aerobics - need to sweat daily',
        oilType: 'Light oils: sunflower, almond - use sparingly or dry brush',
        bestTime: 'Light breakfast or skip, main meal at noon, light early dinner',
        season: 'Most vulnerable in spring - increase activity, reduce heavy foods'
      }
    };
    return guidelines[dosha];
  };

  // Dual-dosha specific recommendations
  const getDualDoshaRecommendations = (primary: string, secondary: string | null): string[] => {
    if (!secondary) return [];

    const dualRecommendations: Record<string, string[]> = {
      'vata-pitta': [
        'Balance warmth with cooling - avoid extremes of temperature',
        'Regular meals are crucial - never skip meals but avoid overeating',
        'Moderate exercise: yoga, walking, swimming - not too intense',
        'Focus on sweet, nourishing foods that are neither too hot nor too cold',
        'Ghee is your best friend - use generously'
      ],
      'vata-kapha': [
        'Stay warm but keep moving - avoid cold AND stagnation',
        'Light, warm meals - not too heavy, not too dry',
        'Morning routine is essential - wake early and exercise',
        'Ginger tea throughout the day helps both doshas',
        'Avoid dairy and cold foods, but include healthy oils'
      ],
      'pitta-vata': [
        'Balance warmth with cooling - avoid extremes of temperature',
        'Regular meals are crucial - never skip meals but avoid overeating',
        'Moderate exercise: yoga, walking, swimming - not too intense',
        'Focus on sweet, nourishing foods that are neither too hot nor too cold',
        'Ghee is your best friend - use generously'
      ],
      'pitta-kapha': [
        'Avoid excess oil but don\'t go completely dry',
        'Bitter and astringent tastes benefit both doshas',
        'Moderate, cooling exercise - swimming is ideal',
        'Reduce dairy, sweets, and sour foods',
        'Light meals with plenty of vegetables'
      ],
      'kapha-vata': [
        'Stay warm but keep moving - avoid cold AND stagnation',
        'Light, warm meals - not too heavy, not too dry',
        'Morning routine is essential - wake early and exercise',
        'Ginger tea throughout the day helps both doshas',
        'Avoid dairy and cold foods, but include healthy oils'
      ],
      'kapha-pitta': [
        'Avoid excess oil but don\'t go completely dry',
        'Bitter and astringent tastes benefit both doshas',
        'Moderate, cooling exercise - swimming is ideal',
        'Reduce dairy, sweets, and sour foods',
        'Light meals with plenty of vegetables'
      ]
    };

    const key = `${primary}-${secondary}`;
    return dualRecommendations[key] || [];
  };

  const schedule = getDoshaSchedule(selectedDosha);
  const guidelines = getDoshaGuidelines(selectedDosha);
  const foods = getDoshaFoods(selectedDosha);
  const secondaryDosha = getSecondaryDosha();
  const dualDoshaRecs = getDualDoshaRecommendations(selectedDosha, secondaryDosha);

  const downloadPlan = () => {
    const planText = `
MY PERSONALIZED AYURVEDIC DAILY PLAN
Dosha Type: ${selectedDosha.toUpperCase()}
Generated: ${new Date().toLocaleDateString()}

DAILY SCHEDULE:
${schedule.map(item => `
${item.time} - ${item.activity}
${item.description}
`).join('\n')}

DAILY GUIDELINES:
* Water: ${guidelines.water}
* Grains/Flour: ${guidelines.flour}
* Avoid: ${guidelines.avoid}
* Supplements: ${guidelines.supplements}
* Lifestyle: ${guidelines.lifestyle}

Remember: This is a guideline, not a strict rule. Listen to your body and adjust as needed.
Start with 2-3 changes and build from there. Consistency > Perfection.

---
Generated by NayaVed AI - Ancient Wisdom, Modern Wellness
    `;

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ayurveda-daily-plan-${selectedDosha}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-[var(--parchment-light)] to-[var(--parchment)] rounded-xl shadow-lg p-6 border-2 border-[var(--palm-leaf)]">
      {/* Corner ornaments */}
      <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-2xl">❧</div>
      <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-x-[-1]">❧</div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-8 h-8 text-[var(--copper-brown)]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--ink-black)]" style={{fontFamily: 'Georgia, serif'}}>
              Your Personalized Daily Plan
            </h2>
          </div>
          <p className="text-[var(--ink-brown)]">
            A complete roadmap for living in balance with your dosha
          </p>
        </div>
        <button
          onClick={downloadPlan}
          className="flex items-center bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-4 py-2 rounded-lg hover:opacity-90 font-medium shadow-md"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Plan
        </button>
      </div>

      {/* Personalized Dosha Profile */}
      {hasCompletedQuiz && doshaResult ? (
        <div className="mb-8 bg-gradient-to-br from-white to-[var(--parchment-light)] p-6 rounded-xl border-2 border-[var(--gold-leaf)]">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-[var(--copper-brown)]" />
            <h3 className="text-lg font-bold text-[var(--ink-black)]">Your Prakriti (Constitution)</h3>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold text-[var(--copper-brown)]" style={{fontFamily: 'Georgia, serif'}}>
              {getConstitutionType()}
            </div>
            {secondaryDosha && (
              <span className="text-sm bg-[var(--parchment-dark)] text-[var(--ink-brown)] px-3 py-1 rounded-full">
                Dual Dosha Type
              </span>
            )}
          </div>

          {/* Dosha Percentages */}
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium text-[var(--ink-black)]">Vata (Air & Space)</span>
                <span className="text-[var(--copper-brown)] font-bold">{doshaResult.vata}%</span>
              </div>
              <div className="w-full bg-[var(--parchment-dark)] rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{ width: `${doshaResult.vata}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium text-[var(--ink-black)]">Pitta (Fire & Water)</span>
                <span className="text-[var(--copper-brown)] font-bold">{doshaResult.pitta}%</span>
              </div>
              <div className="w-full bg-[var(--parchment-dark)] rounded-full h-3">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full" style={{ width: `${doshaResult.pitta}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium text-[var(--ink-black)]">Kapha (Earth & Water)</span>
                <span className="text-[var(--copper-brown)] font-bold">{doshaResult.kapha}%</span>
              </div>
              <div className="w-full bg-[var(--parchment-dark)] rounded-full h-3">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{ width: `${doshaResult.kapha}%` }}></div>
              </div>
            </div>
          </div>

          <p className="text-sm text-[var(--ink-brown)]">
            Your plan below is customized for your <strong>{getConstitutionType()}</strong> constitution.
            {userSymptoms.length > 0 && ` It also addresses your specific symptoms.`}
          </p>
        </div>
      ) : (
        /* Dosha Selector for users who haven't taken quiz */
        <div className="mb-8">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-4">
            <p className="text-sm text-amber-800">
              <strong>💡 Tip:</strong> Take the <strong>Dosha Quiz</strong> for a personalized plan based on your unique constitution!
            </p>
          </div>
          <h3 className="text-sm font-bold text-[var(--ink-black)] mb-3">Select Your Dosha Type:</h3>
          <div className="flex gap-3">
            {['vata', 'pitta', 'kapha'].map(dosha => (
              <button
                key={dosha}
                onClick={() => setSelectedDosha(dosha)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedDosha === dosha
                    ? 'bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white shadow-lg scale-105'
                    : 'bg-white text-[var(--ink-black)] border-2 border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)]'
                }`}
              >
                {dosha.charAt(0).toUpperCase() + dosha.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dual Dosha Recommendations */}
      {dualDoshaRecs.length > 0 && (
        <div className="mb-8 bg-purple-50 rounded-xl p-5 border border-purple-200">
          <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Special Recommendations for {getConstitutionType()} Types
          </h3>
          <p className="text-sm text-purple-700 mb-4">
            As a dual-dosha type, you need to balance both energies. Here's what works best for you:
          </p>
          <div className="space-y-2">
            {dualDoshaRecs.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-purple-800">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Guidelines */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-colors">
          <div className="flex items-center mb-3">
            <Droplets className="w-5 h-5 text-[var(--copper-brown)] mr-2" />
            <h4 className="font-bold text-[var(--ink-black)]">Water Intake</h4>
          </div>
          <p className="text-[var(--ink-brown)] text-sm">{guidelines.water}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-colors">
          <div className="flex items-center mb-3">
            <Leaf className="w-5 h-5 text-[var(--copper-brown)] mr-2" />
            <h4 className="font-bold text-[var(--ink-black)]">Grains & Flour</h4>
          </div>
          <p className="text-[var(--ink-brown)] text-sm">{guidelines.flour}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-colors">
          <div className="flex items-center mb-3">
            <Activity className="w-5 h-5 text-[var(--copper-brown)] mr-2" />
            <h4 className="font-bold text-[var(--ink-black)]">Lifestyle</h4>
          </div>
          <p className="text-[var(--ink-brown)] text-sm">{guidelines.lifestyle}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-colors">
          <div className="flex items-center mb-3">
            <Pill className="w-5 h-5 text-[var(--copper-brown)] mr-2" />
            <h4 className="font-bold text-[var(--ink-black)]">Supplements</h4>
          </div>
          <p className="text-[var(--ink-brown)] text-sm">{guidelines.supplements}</p>
        </div>
      </div>

      {/* Food Recommendations */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[var(--ink-black)] mb-4 flex items-center" style={{fontFamily: 'Georgia, serif'}}>
          <Utensils className="w-6 h-6 mr-2 text-[var(--copper-brown)]" />
          Food Guide for {selectedDosha.charAt(0).toUpperCase() + selectedDosha.slice(1)}
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Foods to Eat */}
          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <div className="flex items-center mb-3">
              <Apple className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-bold text-green-800">Foods to Favor</h4>
            </div>
            <ul className="space-y-2">
              {foods.eat.map((food, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {food}
                </li>
              ))}
            </ul>
          </div>

          {/* Foods to Avoid */}
          <div className="bg-red-50 p-5 rounded-xl border border-red-200">
            <div className="flex items-center mb-3">
              <XCircle className="w-5 h-5 text-red-600 mr-2" />
              <h4 className="font-bold text-red-800">Foods to Reduce</h4>
            </div>
            <ul className="space-y-2">
              {foods.avoid.map((food, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                  <Ban className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {food}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Beneficial Spices */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Best Spices for {selectedDosha.charAt(0).toUpperCase() + selectedDosha.slice(1)}
          </h4>
          <div className="flex flex-wrap gap-2">
            {foods.spices.map((spice, idx) => (
              <span key={idx} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                {spice}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Symptom-Specific Recommendations */}
      {userSymptoms.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[var(--ink-black)] mb-4 flex items-center" style={{fontFamily: 'Georgia, serif'}}>
            <CheckCircle2 className="w-6 h-6 mr-2 text-[var(--gold-leaf)]" />
            Personalized for Your Symptoms
          </h3>
          <div className="bg-white rounded-xl p-6 border-2 border-[var(--gold-leaf)]">
            <p className="text-sm text-[var(--ink-brown)] mb-4">
              Based on symptoms you reported: <strong className="text-[var(--copper-brown)]">{userSymptoms.join(', ')}</strong>
            </p>
            <div className="space-y-3">
              {getSymptomRecommendations(userSymptoms).map((rec, idx) => (
                <div key={idx} className="bg-[var(--parchment-light)] p-4 rounded-lg border border-[var(--palm-leaf)]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--copper-brown)] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[var(--ink-black)] flex-1">{rec.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 mt-4 text-xs text-[var(--faded-ink)] italic">
              <Lightbulb className="w-4 h-4 text-[var(--gold-leaf)] flex-shrink-0" />
              <span>These recommendations are integrated into your daily schedule below. Focus on these first for fastest relief.</span>
            </div>
          </div>
        </div>
      )}

      {/* Daily Schedule */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--ink-black)] mb-4 flex items-center" style={{fontFamily: 'Georgia, serif'}}>
          <Calendar className="w-6 h-6 mr-2 text-[var(--copper-brown)]" />
          Your Ideal Daily Schedule
        </h3>

        <div className="space-y-6">
          {/* Morning */}
          <div>
            <h4 className="text-lg font-bold text-[var(--copper-brown)] mb-3 flex items-center">
              <Sun className="w-5 h-5 mr-2 text-[var(--gold-leaf)]" />
              Morning Routine
            </h4>
            <div className="space-y-3">
              {schedule.filter(item => item.category === 'morning').map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border-l-4 border-[var(--gold-leaf)] shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--copper-brown)] mr-3 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--copper-brown)]">{item.time}</span>
                      </div>
                      <h5 className="font-semibold text-[var(--ink-black)] mb-1">{item.activity}</h5>
                      <p className="text-sm text-[var(--ink-brown)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div>
            <h4 className="text-lg font-bold text-[var(--copper-brown)] mb-3 flex items-center">
              <Sun className="w-5 h-5 mr-2 text-[var(--gold-leaf)]" />
              Afternoon
            </h4>
            <div className="space-y-3">
              {schedule.filter(item => item.category === 'afternoon').map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border-l-4 border-[var(--copper-brown)] shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--copper-brown)] mr-3 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--copper-brown)]">{item.time}</span>
                      </div>
                      <h5 className="font-semibold text-[var(--ink-black)] mb-1">{item.activity}</h5>
                      <p className="text-sm text-[var(--ink-brown)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div>
            <h4 className="text-lg font-bold text-[var(--copper-brown)] mb-3 flex items-center">
              <Moon className="w-5 h-5 mr-2 text-[var(--gold-leaf)]" />
              Evening & Night
            </h4>
            <div className="space-y-3">
              {schedule.filter(item => item.category === 'evening' || item.category === 'night').map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border-l-4 border-[#5B5EA6] shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--copper-brown)] mr-3 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--copper-brown)]">{item.time}</span>
                      </div>
                      <h5 className="font-semibold text-[var(--ink-black)] mb-1">{item.activity}</h5>
                      <p className="text-sm text-[var(--ink-brown)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-[var(--parchment-light)] rounded-xl p-6 border-l-4 border-[var(--gold-leaf)]">
        <h4 className="font-bold text-[var(--copper-brown)] mb-3 flex items-center gap-2" style={{fontFamily: 'Georgia, serif'}}>
          <Lightbulb className="w-5 h-5 text-[var(--gold-leaf)]" />
          Start Small, Build Big
        </h4>
        <ul className="space-y-2 text-sm text-[var(--ink-brown)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--gold-leaf)]">✦</span>
            Don't try to implement everything at once - that's overwhelming and unsustainable
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--gold-leaf)]">✦</span>
            Pick 2-3 practices that resonate with you and start there
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--gold-leaf)]">✦</span>
            Give each practice 2-3 weeks before adding more
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--gold-leaf)]">✦</span>
            Consistency beats perfection - even 70% compliance is better than 0%
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--gold-leaf)]">✦</span>
            Listen to your body - Ayurveda is about YOU, not rigid rules
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--gold-leaf)]">✦</span>
            Track how you feel - energy, digestion, mood, sleep quality
          </li>
        </ul>
      </div>
    </div>
  );
}
