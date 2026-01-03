'use client';

import { useState } from 'react';
import { DoshaResult } from '@/types';
import { Calendar, Clock, Coffee, Sun, Moon, Utensils, Activity, Droplets, CheckCircle2, Download } from 'lucide-react';

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

export default function PersonalizedPlan({ doshaResult, symptoms = [] }: PersonalizedPlanProps) {
  const [selectedDosha, setSelectedDosha] = useState<string>(doshaResult?.dominant || 'vata');
  const [userSymptoms, setUserSymptoms] = useState<string[]>([]);

  // Load user symptoms from localStorage
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedSymptoms = localStorage.getItem('userSymptoms');
      if (savedSymptoms) {
        setUserSymptoms(JSON.parse(savedSymptoms));
      }
    }
  });

  // Get personalized recommendations based on symptoms
  const getSymptomRecommendations = (symptoms: string[]): string[] => {
    const recommendations: string[] = [];

    if (symptoms.includes('Anxiety')) {
      recommendations.push('Add 10 min meditation or deep breathing before bed (calms vata)');
      recommendations.push('Avoid caffeine after 2 PM (aggravates anxiety)');
    }

    if (symptoms.includes('Insomnia')) {
      recommendations.push('No screens 1 hour before bed - blue light disrupts sleep');
      recommendations.push('Warm milk with nutmeg 30 min before sleep');
    }

    if (symptoms.includes('Indigestion') || symptoms.includes('Acidity')) {
      recommendations.push('Lunch should be your largest meal (when digestion is strongest)');
      recommendations.push('Avoid eating after 7 PM');
      recommendations.push('Drink ginger tea 20 min before meals');
    }

    if (symptoms.includes('Fatigue') || symptoms.includes('Low Immunity')) {
      recommendations.push('Consider Ashwagandha (300mg) in warm milk before bed');
      recommendations.push('Prioritize 7-8 hours sleep - this rebuilds ojas (vitality)');
    }

    if (symptoms.includes('Constipation')) {
      recommendations.push('1 tbsp ghee in warm water first thing in morning');
      recommendations.push('Add more fiber: cooked vegetables, prunes, flaxseeds');
    }

    if (symptoms.includes('Headache')) {
      recommendations.push('Check hydration - drink warm water throughout day');
      recommendations.push('Reduce screen time - take 5 min break every hour');
    }

    if (symptoms.includes('Skin Rash') || symptoms.includes('Acne')) {
      recommendations.push('Avoid spicy, oily, fried foods (aggravates pitta)');
      recommendations.push('Apply aloe vera gel topically for cooling');
    }

    if (symptoms.includes('Joint Pain')) {
      recommendations.push('Daily oil massage focuses on joints (reduces vata/ama)');
      recommendations.push('Drink turmeric milk (½ tsp turmeric in warm milk)');
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

  const getDoshaGuidelines = (dosha: string) => {
    const guidelines: Record<string, any> = {
      vata: {
        water: '6-8 glasses of warm or room temperature water',
        flour: 'Whole wheat, oat flour, rice flour (cooked, not raw)',
        avoid: 'Cold foods, raw foods, excess caffeine, skipping meals',
        supplements: 'Ashwagandha (500mg 2x/day), Triphala at night, sesame oil',
        lifestyle: 'Regular routine, warm environments, oil massage, adequate sleep (7-8 hours)'
      },
      pitta: {
        water: '8-10 glasses of cool (not ice cold) water throughout the day',
        flour: 'Whole wheat, barley flour, oat flour, avoid excess refined grains',
        avoid: 'Spicy foods, alcohol, sour foods, hot yoga, competitive sports',
        supplements: 'Brahmi (300mg daily), Aloe vera juice, coconut oil',
        lifestyle: 'Moderate exercise, cooling practices, avoid overworking, take breaks'
      },
      kapha: {
        water: '4-6 glasses of warm/hot water (less than other doshas)',
        flour: 'Buckwheat, millet, rye, corn flour - lighter grains only',
        avoid: 'Dairy, fried foods, excess sweets, heavy foods, oversleeping',
        supplements: 'Trikatu, Guggulu, dry ginger powder, honey (unheated)',
        lifestyle: 'Vigorous daily exercise, avoid daytime naps, wake early, stay active'
      }
    };
    return guidelines[dosha];
  };

  const schedule = getDoshaSchedule(selectedDosha);
  const guidelines = getDoshaGuidelines(selectedDosha);

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
💧 Water: ${guidelines.water}
🌾 Grains/Flour: ${guidelines.flour}
🚫 Avoid: ${guidelines.avoid}
💊 Supplements: ${guidelines.supplements}
🧘 Lifestyle: ${guidelines.lifestyle}

Remember: This is a guideline, not a strict rule. Listen to your body and adjust as needed.
Start with 2-3 changes and build from there. Consistency > Perfection.

---
Generated by Ayurveda for Real Life ✨
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
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Your Personalized Daily Plan 📋
          </h2>
          <p className="text-[var(--text-muted)]">
            A complete roadmap for living in balance with your dosha
          </p>
        </div>
        <button
          onClick={downloadPlan}
          className="flex items-center bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-4 py-2 rounded-lg hover:opacity-90 font-medium"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Plan
        </button>
      </div>

      {/* Dosha Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-3">Select Your Dosha Type:</h3>
        <div className="flex gap-3">
          {['vata', 'pitta', 'kapha'].map(dosha => (
            <button
              key={dosha}
              onClick={() => setSelectedDosha(dosha)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedDosha === dosha
                  ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] shadow-lg scale-105'
                  : 'bg-[var(--card-bg-light)] text-[var(--foreground)] border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)]'
              }`}
            >
              {dosha.charAt(0).toUpperCase() + dosha.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Don't know your dosha? Take the <strong>Dosha Quiz</strong> in the sidebar!
        </p>
      </div>

      {/* Daily Guidelines */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[var(--card-bg-light)] p-5 rounded-lg border-2 border-[var(--border-color)]">
          <div className="flex items-center mb-3">
            <Droplets className="w-5 h-5 text-[var(--accent-primary)] mr-2" />
            <h4 className="font-bold text-[var(--foreground)]">Water Intake</h4>
          </div>
          <p className="text-[var(--foreground)] text-sm">{guidelines.water}</p>
        </div>

        <div className="bg-[var(--card-bg-light)] p-5 rounded-lg border-2 border-[var(--border-color)]">
          <div className="flex items-center mb-3">
            <Utensils className="w-5 h-5 text-[var(--accent-primary)] mr-2" />
            <h4 className="font-bold text-[var(--foreground)]">Grains & Flour</h4>
          </div>
          <p className="text-[var(--foreground)] text-sm">{guidelines.flour}</p>
        </div>

        <div className="bg-[var(--card-bg-light)] p-5 rounded-lg border-2 border-[var(--border-color)]">
          <div className="flex items-center mb-3">
            <Activity className="w-5 h-5 text-[var(--accent-primary)] mr-2" />
            <h4 className="font-bold text-[var(--foreground)]">Lifestyle</h4>
          </div>
          <p className="text-[var(--foreground)] text-sm">{guidelines.lifestyle}</p>
        </div>

        <div className="bg-[var(--card-bg-light)] p-5 rounded-lg border-2 border-[var(--border-color)]">
          <div className="flex items-center mb-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] mr-2" />
            <h4 className="font-bold text-[var(--foreground)]">Supplements</h4>
          </div>
          <p className="text-[var(--foreground)] text-sm">{guidelines.supplements}</p>
        </div>
      </div>

      {/* Symptom-Specific Recommendations */}
      {userSymptoms.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-2 text-[var(--accent-secondary)]" />
            Personalized for Your Symptoms
          </h3>
          <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30 border-2 border-[var(--accent-secondary)] rounded-lg p-6">
            <p className="text-sm text-[var(--foreground)] opacity-80 mb-4">
              Based on symptoms you reported: <strong className="text-[var(--accent-primary)]">{userSymptoms.join(', ')}</strong>
            </p>
            <div className="space-y-3">
              {getSymptomRecommendations(userSymptoms).map((rec, idx) => (
                <div key={idx} className="flex items-start bg-[var(--background)] bg-opacity-50 p-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[var(--foreground)]">{rec}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4 italic">
              💡 These recommendations are integrated into your daily schedule below. Focus on these first for fastest relief.
            </p>
          </div>
        </div>
      )}

      {/* Daily Schedule */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-[var(--accent-primary)]" />
          Your Ideal Daily Schedule
        </h3>

        <div className="space-y-6">
          {/* Morning */}
          <div>
            <h4 className="text-lg font-bold text-[var(--accent-secondary)] mb-3 flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              Morning Routine
            </h4>
            <div className="space-y-3">
              {schedule.filter(item => item.category === 'morning').map((item, idx) => (
                <div key={idx} className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-[var(--accent-primary)]">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--accent-primary)] mr-3 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--accent-primary)]">{item.time}</span>
                      </div>
                      <h5 className="font-semibold text-[var(--foreground)] mb-1">{item.activity}</h5>
                      <p className="text-sm text-[var(--foreground)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div>
            <h4 className="text-lg font-bold text-[var(--accent-secondary)] mb-3 flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              Afternoon
            </h4>
            <div className="space-y-3">
              {schedule.filter(item => item.category === 'afternoon').map((item, idx) => (
                <div key={idx} className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-[var(--accent-primary)]">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--accent-primary)] mr-3 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--accent-primary)]">{item.time}</span>
                      </div>
                      <h5 className="font-semibold text-[var(--foreground)] mb-1">{item.activity}</h5>
                      <p className="text-sm text-[var(--foreground)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div>
            <h4 className="text-lg font-bold text-[var(--accent-secondary)] mb-3 flex items-center">
              <Moon className="w-5 h-5 mr-2" />
              Evening & Night
            </h4>
            <div className="space-y-3">
              {schedule.filter(item => item.category === 'evening' || item.category === 'night').map((item, idx) => (
                <div key={idx} className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-[var(--accent-primary)]">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-[var(--accent-primary)] mr-3 mt-1" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[var(--accent-primary)]">{item.time}</span>
                      </div>
                      <h5 className="font-semibold text-[var(--foreground)] mb-1">{item.activity}</h5>
                      <p className="text-sm text-[var(--foreground)]">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30 border-2 border-[var(--accent-primary)] rounded-lg p-6">
        <h4 className="font-bold text-[var(--accent-secondary)] mb-3">💡 Start Small, Build Big</h4>
        <ul className="space-y-2 text-sm text-[var(--foreground)]">
          <li>• Don't try to implement everything at once - that's overwhelming and unsustainable</li>
          <li>• Pick 2-3 practices that resonate with you and start there</li>
          <li>• Give each practice 2-3 weeks before adding more</li>
          <li>• Consistency beats perfection - even 70% compliance is better than 0%</li>
          <li>• Listen to your body - Ayurveda is about YOU, not rigid rules</li>
          <li>• Track how you feel - energy, digestion, mood, sleep quality</li>
        </ul>
      </div>
    </div>
  );
}
