'use client';

import { useState } from 'react';
import { doshaQuestions, symptoms } from '@/data/symptoms';
import { DoshaResult } from '@/types';

interface DoshaAssessmentProps {
  onNavigate?: (tab: string) => void;
}

export default function DoshaAssessment({ onNavigate }: DoshaAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: { dosha: string; points: number }}>({});
  const [result, setResult] = useState<DoshaResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showSymptomSelection, setShowSymptomSelection] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const handleAnswer = (questionId: string, dosha: string, points: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: { dosha, points } }));

    if (currentQuestion < doshaQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // After dosha questions, show symptom selection
      setShowSymptomSelection(true);
    }
  };

  const toggleSymptom = (symptomName: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomName)
        ? prev.filter(s => s !== symptomName)
        : [...prev, symptomName]
    );
  };

  const completeAssessment = () => {
    calculateResult(answers);
    // Store symptoms in localStorage for PersonalizedPlan to access
    localStorage.setItem('userSymptoms', JSON.stringify(selectedSymptoms));
    // Hide symptom selection screen to show results
    setShowSymptomSelection(false);
  };

  const calculateResult = (allAnswers: {[key: string]: { dosha: string; points: number }}) => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };

    Object.values(allAnswers).forEach(answer => {
      if (answer.dosha === 'vata') scores.vata += answer.points;
      if (answer.dosha === 'pitta') scores.pitta += answer.points;
      if (answer.dosha === 'kapha') scores.kapha += answer.points;
    });

    const total = scores.vata + scores.pitta + scores.kapha;
    const dominant = scores.vata > scores.pitta && scores.vata > scores.kapha ? 'vata' :
                     scores.pitta > scores.kapha ? 'pitta' : 'kapha';

    const doshaResult: DoshaResult = {
      vata: Math.round((scores.vata / total) * 100),
      pitta: Math.round((scores.pitta / total) * 100),
      kapha: Math.round((scores.kapha / total) * 100),
      dominant
    };

    setResult(doshaResult);
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResults(false);
    setShowSymptomSelection(false);
    setSelectedSymptoms([]);
    localStorage.removeItem('userSymptoms');
  };

  const getDoshaDescription = (dosha: string) => {
    const descriptions = {
      vata: {
        title: 'Vata (Air & Space)',
        traits: 'Creative, energetic, quick-thinking, adaptable',
        balance: 'When balanced: Enthusiastic, creative, vibrant',
        imbalance: 'When imbalanced: Anxious, restless, digestive issues, insomnia',
        recommendations: [
          'Warm, cooked, nourishing foods',
          'Regular routine and schedule',
          'Oil massage (Abhyanga)',
          'Calming practices like meditation',
          'Adequate rest and sleep'
        ]
      },
      pitta: {
        title: 'Pitta (Fire & Water)',
        traits: 'Intelligent, focused, driven, organized',
        balance: 'When balanced: Sharp intellect, good digestion, strong leadership',
        imbalance: 'When imbalanced: Irritable, acidic, inflammatory conditions, skin issues',
        recommendations: [
          'Cool, refreshing foods',
          'Avoid spicy and sour foods',
          'Moderate exercise',
          'Cooling practices',
          'Stress management'
        ]
      },
      kapha: {
        title: 'Kapha (Earth & Water)',
        traits: 'Calm, stable, compassionate, patient',
        balance: 'When balanced: Strong immunity, steady energy, loving nature',
        imbalance: 'When imbalanced: Lethargic, weight gain, congestion, depression',
        recommendations: [
          'Light, warm, spicy foods',
          'Regular exercise',
          'Stimulating activities',
          'Dry massage',
          'Avoid heavy, oily foods'
        ]
      }
    };
    return descriptions[dosha as keyof typeof descriptions];
  };

  // Show symptom selection screen
  if (showSymptomSelection) {
    const commonSymptoms = symptoms.filter(s =>
      s.category === 'Digestive' || s.category === 'Mental/Emotional' || s.category === 'Physical'
    );

    return (
      <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Almost done! 🎯</h2>
        <p className="text-[var(--text-muted)] mb-6">
          Select any current symptoms you're experiencing for a more personalized plan (optional - you can skip this)
        </p>

        {/* Symptom Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {commonSymptoms.map(symptom => (
            <button
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.name)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedSymptoms.includes(symptom.name)
                  ? 'border-[var(--accent-primary)] bg-[var(--olive-light)] bg-opacity-20'
                  : 'border-[var(--border-color)] bg-[var(--card-bg-light)] hover:border-[var(--accent-primary)]'
              }`}
            >
              <div className="font-medium text-[var(--foreground)] text-sm">{symptom.name}</div>
            </button>
          ))}
        </div>

        {selectedSymptoms.length > 0 && (
          <div className="mb-4 p-3 bg-[var(--card-bg-light)] rounded-lg">
            <p className="text-sm text-[var(--foreground)] mb-2">
              <strong>Selected ({selectedSymptoms.length}):</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map(symptom => (
                <span key={symptom} className="text-xs bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-3 py-1 rounded-full">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={completeAssessment}
            className="flex-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] py-3 rounded-lg hover:opacity-90 font-semibold"
          >
            {selectedSymptoms.length > 0 ? 'Continue with Selected Symptoms' : 'Skip & See Results'}
          </button>
        </div>
      </div>
    );
  }

  if (showResults && result) {
    const description = getDoshaDescription(result.dominant);

    return (
      <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Your Dosha Assessment Results</h2>

        {/* Dosha Percentages */}
        <div className="mb-8 space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-[var(--foreground)]">Vata</span>
              <span className="text-[var(--text-muted)]">{result.vata}%</span>
            </div>
            <div className="w-full bg-[var(--card-bg-light)] rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${result.vata}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-[var(--foreground)]">Pitta</span>
              <span className="text-[var(--text-muted)]">{result.pitta}%</span>
            </div>
            <div className="w-full bg-[var(--card-bg-light)] rounded-full h-4">
              <div
                className="bg-gradient-to-r from-red-400 to-red-600 h-4 rounded-full transition-all"
                style={{ width: `${result.pitta}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-[var(--foreground)]">Kapha</span>
              <span className="text-[var(--text-muted)]">{result.kapha}%</span>
            </div>
            <div className="w-full bg-[var(--card-bg-light)] rounded-full h-4">
              <div
                className="bg-gradient-to-r from-[var(--success)] to-green-600 h-4 rounded-full transition-all"
                style={{ width: `${result.kapha}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dominant Dosha Info */}
        <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] p-6 rounded-lg border-2 border-[var(--accent-primary)] mb-6">
          <h3 className="text-xl font-bold text-[var(--accent-secondary)] mb-3">
            Your Dominant Dosha: {description.title}
          </h3>

          <div className="space-y-3 text-[var(--foreground)]">
            <p><strong>Characteristics:</strong> {description.traits}</p>
            <div className="bg-[var(--card-bg)] p-4 rounded-lg border-2 border-[var(--accent-primary)]">
              <p className="text-[var(--foreground)] font-medium">
                <span className="text-[var(--accent-primary)] mr-2">✓</span>
                {description.balance}
              </p>
            </div>
            <div className="bg-[var(--card-bg)] p-4 rounded-lg border-2 border-[var(--accent-secondary)]">
              <p className="text-[var(--foreground)] font-medium">
                <span className="text-[var(--accent-secondary)] mr-2">⚠</span>
                {description.imbalance}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] p-6 rounded-lg mb-6">
          <h4 className="font-bold text-lg mb-3 text-[var(--foreground)]">Personalized Recommendations</h4>
          <ul className="space-y-2">
            {description.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-[var(--accent-primary)] mr-2 mt-1">✓</span>
                <span className="text-[var(--foreground)]">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] p-6 rounded-lg border-2 border-[var(--accent-primary)] mb-4">
          <h4 className="font-bold text-lg mb-2 text-[var(--foreground)]">🎯 Ready for Your Personalized Plan?</h4>
          <p className="text-[var(--foreground)] mb-4">
            Now that you know your dosha, get a complete daily schedule tailored to your type - including meal times, exercise routines, sleep schedule, and more!
          </p>
          <button
            onClick={() => {
              // Save dosha result to localStorage for PersonalizedPlan
              localStorage.setItem('doshaResult', JSON.stringify(result));
              if (onNavigate) {
                onNavigate('plan');
              }
            }}
            className="inline-block bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--gold)] text-[var(--background)] px-6 py-3 rounded-lg hover:opacity-90 font-bold shadow-lg cursor-pointer"
          >
            View My Daily Plan →
          </button>
        </div>

        <button
          onClick={resetAssessment}
          className="w-full bg-[var(--card-bg-light)] text-[var(--foreground)] py-3 rounded-lg hover:bg-[var(--olive-light)] font-semibold border-2 border-[var(--border-color)]"
        >
          Take Assessment Again
        </button>
      </div>
    );
  }

  const question = doshaQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / doshaQuestions.length) * 100;

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Dosha Assessment</h2>
      <p className="text-[var(--text-muted)] mb-6">
        Discover your unique Ayurvedic constitution (Prakriti)
      </p>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-[var(--text-muted)] mb-2">
          <span>Question {currentQuestion + 1} of {doshaQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-[var(--card-bg-light)] rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(question.id, option.dosha, option.points)}
              className="w-full text-left p-4 border-2 border-[var(--border-color)] rounded-lg hover:border-[var(--accent-primary)] hover:bg-[var(--card-bg-light)] transition-all"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-[var(--border-color)] mr-3 flex-shrink-0"></div>
                <span className="text-[var(--foreground)]">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(prev => prev - 1)}
          className="text-[var(--accent-primary)] hover:opacity-80"
        >
          ← Previous Question
        </button>
      )}
    </div>
  );
}
