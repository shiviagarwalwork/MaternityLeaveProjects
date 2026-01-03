'use client';

import { useState } from 'react';
import { Zap, Clock, Target, TrendingUp } from 'lucide-react';

export default function QuickStart() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const quickPaths = [
    {
      id: 'stressed',
      emoji: '😰',
      title: "I'm Stressed AF",
      time: '2 min',
      steps: [
        { icon: '🫚', text: 'Drink ginger tea NOW', action: 'Boil water + fresh ginger slice' },
        { icon: '🧘', text: 'Try 5-min breathing', action: '4 counts in, hold 4, out 4' },
        { icon: '💊', text: 'Start Ashwagandha', action: '300mg twice daily with meals' },
        { icon: '🛁', text: 'Oil massage tonight', action: 'Warm sesame oil on feet before bed' }
      ],
      why: 'Stress increases Vata (anxiety) and Pitta (irritability). These calm both instantly.'
    },
    {
      id: 'tired',
      emoji: '😴',
      title: 'Always Tired',
      time: '2 min',
      steps: [
        { icon: '☀️', text: 'Wake up at 6 AM', action: 'Set alarm. No snooze. For real.' },
        { icon: '🏃', text: 'Move your body', action: '20 min cardio - make yourself sweat' },
        { icon: '🍯', text: 'Hot water + honey', action: 'Every morning. Kickstarts metabolism.' },
        { icon: '🚫', text: 'No dairy for 2 weeks', action: 'Kapha loves dairy. You need less Kapha.' }
      ],
      why: 'Excess Kapha = lethargy. These practices reduce heaviness and increase energy.'
    },
    {
      id: 'bloated',
      emoji: '🤢',
      title: 'Digestion is Trash',
      time: '1 min',
      steps: [
        { icon: '🫚', text: 'Ginger before meals', action: 'Chew fresh ginger with salt + lemon' },
        { icon: '🔥', text: 'Add spices to everything', action: 'Cumin, coriander, fennel, turmeric' },
        { icon: '🥘', text: 'Only eat warm food', action: 'No salads, smoothies, or cold drinks' },
        { icon: '🕐', text: 'Dinner by 7 PM', action: 'Your gut needs 12 hours to rest' }
      ],
      why: 'Weak digestive fire (Agni) causes all this. These reignite it.'
    },
    {
      id: 'sleep',
      emoji: '😵',
      title: "Can't Sleep",
      time: '2 min',
      steps: [
        { icon: '📱', text: 'No screens after 8 PM', action: 'Read books. Use paper. Be boring.' },
        { icon: '🥛', text: 'Golden milk at 9 PM', action: 'Warm milk + turmeric + nutmeg' },
        { icon: '🦶', text: 'Oil your feet', action: 'Sesame or coconut oil. Massage 5 min.' },
        { icon: '🛏️', text: 'In bed by 10 PM', action: 'Seriously. Pitta takes over after 10.' }
      ],
      why: 'Vata imbalance or Pitta overthinking. This routine calms both.'
    },
    {
      id: 'weight',
      emoji: '⚖️',
      title: "Weight Won't Budge",
      time: '2 min',
      steps: [
        { icon: '🍽️', text: 'Skip breakfast', action: 'Kapha types do great with IF' },
        { icon: '🌶️', text: 'Spice everything up', action: 'Black pepper, cayenne, ginger daily' },
        { icon: '💪', text: 'HIIT workouts', action: '30 min intense exercise daily' },
        { icon: '🥗', text: 'Light dinners only', action: "Soup or steamed veggies. That's it." }
      ],
      why: 'Excess Kapha = weight gain. These practices burn it off.'
    },
    {
      id: 'headaches',
      emoji: '🤯',
      title: 'Headaches/Migraines',
      time: '1 min',
      steps: [
        { icon: '❄️', text: 'Cool down', action: 'Cold compress on head. Avoid hot yoga.' },
        { icon: '🌿', text: 'Brahmi supplement', action: '300mg daily. Calms the mind.' },
        { icon: '🚫', text: 'Cut caffeine & spicy foods', action: 'They inflame Pitta = more headaches' },
        { icon: '🧘', text: 'Meditate 10 min daily', action: 'Reduce mental fire' }
      ],
      why: 'Excess Pitta (heat) in the head. Cool it down.'
    }
  ];

  if (selectedPath) {
    const path = quickPaths.find(p => p.id === selectedPath);
    if (!path) return null;

    return (
      <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
        <button
          onClick={() => setSelectedPath(null)}
          className="text-[var(--accent-primary)] hover:opacity-80 mb-4 font-medium"
        >
          ← Back to all paths
        </button>

        <div className="mb-6">
          <div className="text-6xl mb-3">{path.emoji}</div>
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">{path.title}</h2>
          <div className="flex items-center gap-3 text-[var(--text-muted)]">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {path.time} read
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30 border-2 border-[var(--accent-primary)] rounded-lg p-5 mb-6">
          <h3 className="font-bold text-[var(--accent-secondary)] mb-2">Why This Works:</h3>
          <p className="text-[var(--foreground)]">{path.why}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-[var(--foreground)] text-xl flex items-center">
            <Target className="w-5 h-5 mr-2 text-[var(--accent-primary)]" />
            Your Action Plan
          </h3>
          {path.steps.map((step, idx) => (
            <div key={idx} className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-[var(--accent-primary)]">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{step.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-[var(--foreground)] mb-1">{step.text}</h4>
                  <p className="text-[var(--text-muted)] text-sm">{step.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-[var(--card-bg-light)] rounded-lg">
          <p className="text-sm text-[var(--foreground)]">
            <strong>Pro tip:</strong> Don't try all 4 at once. Pick ONE, do it for 3 days, then add another. Consistency &gt; perfection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Zap className="w-8 h-8 text-[var(--accent-primary)] mr-3" />
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Quick Fix Guide ⚡</h2>
        </div>
        <p className="text-[var(--text-muted)] text-lg">
          No time for long reads? Pick your problem, get instant solutions. All backed by Ayurveda, zero BS.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickPaths.map(path => (
          <button
            key={path.id}
            onClick={() => setSelectedPath(path.id)}
            className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30 border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)] rounded-xl p-6 text-left transition-all group hover:scale-105"
          >
            <div className="text-5xl mb-3">{path.emoji}</div>
            <h3 className="font-bold text-[var(--foreground)] text-lg mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
              {path.title}
            </h3>
            <div className="flex items-center text-sm text-[var(--text-muted)]">
              <Clock className="w-4 h-4 mr-1" />
              {path.time}
            </div>
            <div className="mt-3 text-[var(--accent-primary)] font-medium text-sm group-hover:translate-x-2 transition-transform">
              Get solutions →
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30 border-2 border-[var(--accent-primary)] rounded-lg">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-[var(--accent-secondary)] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-[var(--foreground)] mb-2">Want deeper personalization?</h3>
            <p className="text-[var(--foreground)] text-sm mb-3">
              Take the Dosha Quiz to get a complete daily plan customized for your body type and symptoms.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Check out "Dosha Quiz" and "My Daily Plan" in the sidebar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
