'use client';

import { useState } from 'react';
import {
  ArrowLeft, Search, ChevronDown, ChevronUp,
  // Icons for different categories
  Smartphone, Brain, Battery, Moon, Flame, Target, Scale,
  Angry, Clock3, RefreshCw, Heart, Activity,
  Frown, Scissors, Droplets, Bone,
  Wind, ShieldAlert, Users, BookOpen, Leaf, UtensilsCrossed, Sparkles
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import symptomMappings, { getSutrasForSymptom, SymptomResponse } from '../data/symptomMappings';

interface QuickFix {
  id: string;
  symptomId: string; // Maps to symptomMappings
  title: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  category: string;
}

// Map QuickStart IDs to symptomMappings IDs
const idMapping: Record<string, string> = {
  'screentime': 'screen-time',
  'stress': 'stress',
  'burnout': 'burnout',
  'sleep': 'sleep',
  'digestion': 'digestion',
  'focus': 'focus',
  'weight': 'weight',
  'angry': 'anger',
  'procrastination': 'procrastination',
  'overthinking': 'overthinking',
  'highbp': 'high-bp',
  'thyroid': 'thyroid',
  'backpain': 'back-pain',
  'neckpain': 'neck-pain',
  'headache': 'headache',
  'hairfall': 'hair-fall',
  'acidity': 'acidity',
  'jointpain': 'joint-pain',
  'diabetes': 'diabetes',
  'coldcough': 'cold-cough',
  'skinissues': 'skin-issues',
  'lowimmunity': 'low-immunity',
  'pcod': 'pcos'
};

// Helper to get symptom data from mappings
const getSymptomData = (id: string): SymptomResponse | undefined => {
  const symptomId = idMapping[id] || id;
  return symptomMappings.find(s => s.symptomId === symptomId);
};

export default function QuickStart() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const quickFixes: QuickFix[] = [
    {
      id: 'screentime',
      symptomId: 'screen-time',
      title: 'Too much screen time',
      icon: Smartphone,
      iconColor: '#5D4037',
      iconBg: '#E8F5E9',
      category: 'Digital Wellness'
    },
    {
      id: 'stress',
      symptomId: 'stress',
      title: 'Stressed & anxious',
      icon: Brain,
      iconColor: '#7B1FA2',
      iconBg: '#F3E5F5',
      category: 'Mental Health'
    },
    {
      id: 'burnout',
      symptomId: 'burnout',
      title: 'Burnt out & exhausted',
      icon: Battery,
      iconColor: '#D32F2F',
      iconBg: '#FFEBEE',
      category: 'Energy'
    },
    {
      id: 'sleep',
      symptomId: 'sleep',
      title: "Can't sleep well",
      icon: Moon,
      iconColor: '#1565C0',
      iconBg: '#E3F2FD',
      category: 'Sleep'
    },
    {
      id: 'digestion',
      symptomId: 'digestion',
      title: 'Digestion issues',
      icon: Flame,
      iconColor: '#EF6C00',
      iconBg: '#FFF3E0',
      category: 'Digestion'
    },
    {
      id: 'focus',
      symptomId: 'focus',
      title: "Can't concentrate",
      icon: Target,
      iconColor: '#00695C',
      iconBg: '#E0F2F1',
      category: 'Focus'
    },
    {
      id: 'weight',
      symptomId: 'weight',
      title: 'Weight gain & sluggish',
      icon: Scale,
      iconColor: '#6A1B9A',
      iconBg: '#F3E5F5',
      category: 'Metabolism'
    },
    {
      id: 'angry',
      symptomId: 'anger',
      title: 'Irritable & angry',
      icon: Angry,
      iconColor: '#C62828',
      iconBg: '#FFEBEE',
      category: 'Emotions'
    },
    {
      id: 'procrastination',
      symptomId: 'procrastination',
      title: 'Procrastination & laziness',
      icon: Clock3,
      iconColor: '#4E342E',
      iconBg: '#EFEBE9',
      category: 'Motivation'
    },
    {
      id: 'overthinking',
      symptomId: 'overthinking',
      title: 'Racing thoughts',
      icon: RefreshCw,
      iconColor: '#303F9F',
      iconBg: '#E8EAF6',
      category: 'Mental Clarity'
    },
    {
      id: 'highbp',
      symptomId: 'high-bp',
      title: 'High blood pressure',
      icon: Heart,
      iconColor: '#B71C1C',
      iconBg: '#FFCDD2',
      category: 'Heart Health'
    },
    {
      id: 'thyroid',
      symptomId: 'thyroid',
      title: 'Thyroid imbalance',
      icon: Activity,
      iconColor: '#00838F',
      iconBg: '#E0F7FA',
      category: 'Hormones'
    },
    {
      id: 'backpain',
      symptomId: 'back-pain',
      title: 'Back pain',
      icon: Frown,
      iconColor: '#5D4037',
      iconBg: '#D7CCC8',
      category: 'Pain Relief'
    },
    {
      id: 'neckpain',
      symptomId: 'neck-pain',
      title: 'Neck pain & stiffness',
      icon: Frown,
      iconColor: '#37474F',
      iconBg: '#CFD8DC',
      category: 'Pain Relief'
    },
    {
      id: 'headache',
      symptomId: 'headache',
      title: 'Headaches & migraines',
      icon: Brain,
      iconColor: '#AD1457',
      iconBg: '#F8BBD0',
      category: 'Pain Relief'
    },
    {
      id: 'hairfall',
      symptomId: 'hair-fall',
      title: 'Hair fall & thinning',
      icon: Scissors,
      iconColor: '#4A148C',
      iconBg: '#E1BEE7',
      category: 'Hair & Skin'
    },
    {
      id: 'acidity',
      symptomId: 'acidity',
      title: 'Acidity & heartburn',
      icon: Flame,
      iconColor: '#E65100',
      iconBg: '#FFE0B2',
      category: 'Digestion'
    },
    {
      id: 'jointpain',
      symptomId: 'joint-pain',
      title: 'Joint pain & arthritis',
      icon: Bone,
      iconColor: '#795548',
      iconBg: '#D7CCC8',
      category: 'Pain Relief'
    },
    {
      id: 'diabetes',
      symptomId: 'diabetes',
      title: 'Blood sugar concerns',
      icon: Droplets,
      iconColor: '#1565C0',
      iconBg: '#BBDEFB',
      category: 'Metabolism'
    },
    {
      id: 'coldcough',
      symptomId: 'cold-cough',
      title: 'Cold, cough & congestion',
      icon: Wind,
      iconColor: '#0277BD',
      iconBg: '#B3E5FC',
      category: 'Immunity'
    },
    {
      id: 'skinissues',
      symptomId: 'skin-issues',
      title: 'Skin problems & acne',
      icon: Sparkles,
      iconColor: '#F57C00',
      iconBg: '#FFE0B2',
      category: 'Hair & Skin'
    },
    {
      id: 'lowimmunity',
      symptomId: 'low-immunity',
      title: 'Weak immunity',
      icon: ShieldAlert,
      iconColor: '#2E7D32',
      iconBg: '#C8E6C9',
      category: 'Immunity'
    },
    {
      id: 'pcod',
      symptomId: 'pcos',
      title: 'PCOD/PCOS symptoms',
      icon: Users,
      iconColor: '#C2185B',
      iconBg: '#F8BBD0',
      category: 'Hormones'
    }
  ];

  // Filter quick fixes based on search term
  const filteredFixes = quickFixes.filter(fix => {
    const symptomData = getSymptomData(fix.id);
    const searchLower = searchTerm.toLowerCase();
    return (
      fix.title.toLowerCase().includes(searchLower) ||
      fix.category.toLowerCase().includes(searchLower) ||
      (symptomData?.ayurvedicName?.toLowerCase().includes(searchLower)) ||
      (symptomData?.doshaInvolvement?.some(d => d.toLowerCase().includes(searchLower))) ||
      (symptomData?.herbs?.some(h => h.name.toLowerCase().includes(searchLower)))
    );
  });

  // Show first 6 or all based on showAll state
  const displayedFixes = showAll ? filteredFixes : filteredFixes.slice(0, 6);

  if (selectedPath) {
    const path = quickFixes.find(p => p.id === selectedPath);
    if (!path) return null;
    const Icon = path.icon;
    const symptomData = getSymptomData(path.id);
    const sutras = symptomData ? getSutrasForSymptom(symptomData.sutraIds) : [];

    return (
      <div className="relative bg-gradient-to-br from-white via-[var(--parchment-light)] to-[var(--parchment)] rounded-xl shadow-lg p-6 border-2 border-[var(--palm-leaf)]">
        {/* Corner ornaments */}
        <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-xl">❧</div>
        <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-xl transform scale-x-[-1]">❧</div>

        <button
          onClick={() => setSelectedPath(null)}
          className="flex items-center text-[var(--copper-brown)] hover:text-[var(--henna)] mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all symptoms
        </button>

        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
            style={{ backgroundColor: path.iconBg, borderColor: path.iconColor }}
          >
            <Icon className="w-10 h-10" style={{ color: path.iconColor }} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--ink-black)] mb-2" style={{fontFamily: 'Georgia, serif'}}>{path.title}</h2>
          {symptomData && (
            <p className="text-sm text-[var(--copper-brown)] italic mb-2" style={{fontFamily: 'Georgia, serif'}}>
              {symptomData.ayurvedicName}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-block bg-[var(--parchment-dark)] text-[var(--ink-brown)] px-3 py-1 rounded-full text-xs">
              {path.category}
            </span>
            {symptomData?.doshaInvolvement.map((dosha, idx) => (
              <span key={idx} className="inline-block bg-[var(--gold-leaf)] bg-opacity-20 text-[var(--copper-brown)] px-2 py-1 rounded-full text-xs">
                {dosha}
              </span>
            ))}
          </div>
        </div>

        {/* Warning if present */}
        {symptomData?.warning && (
          <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4 mb-6">
            <p className="text-sm text-red-700 font-medium">⚠️ {symptomData.warning}</p>
          </div>
        )}

        {/* Ayurvedic Understanding */}
        {symptomData && (
          <div className="bg-white rounded-xl p-5 mb-6 border-2 border-[var(--gold-leaf)]">
            <h3 className="text-sm font-bold text-[var(--ink-black)] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--gold-leaf)]" />
              Ayurvedic Understanding
            </h3>
            <p className="text-sm text-[var(--ink-brown)] leading-relaxed whitespace-pre-line" style={{fontFamily: 'Georgia, serif'}}>
              {symptomData.response}
            </p>
          </div>
        )}

        {/* Quick Remedies */}
        {symptomData && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[var(--ink-black)] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--gold-leaf)]" />
              Quick Remedies
            </h3>
            <div className="grid gap-3">
              {symptomData.quickRemedies.map((remedy, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--parchment)] flex items-center justify-center text-[var(--gold-leaf)] text-sm border border-[var(--gold-leaf)]">
                      {['❖', '✦', '✿', '❧'][idx % 4]}
                    </div>
                    <p className="flex-1 text-sm text-[var(--ink-brown)]">{remedy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dietary & Lifestyle Advice */}
        {symptomData && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Dietary Advice */}
            <div className="bg-[var(--parchment-light)] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[var(--ink-black)] mb-3 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-[var(--copper-brown)]" />
                Dietary Advice
              </h3>
              <ul className="space-y-2">
                {symptomData.dietaryAdvice.map((advice, idx) => (
                  <li key={idx} className="text-xs text-[var(--ink-brown)] flex items-start gap-2">
                    <span className="text-[var(--gold-leaf)]">•</span>
                    {advice}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lifestyle Advice */}
            <div className="bg-[var(--parchment-light)] rounded-xl p-4">
              <h3 className="text-sm font-bold text-[var(--ink-black)] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--copper-brown)]" />
                Lifestyle Changes
              </h3>
              <ul className="space-y-2">
                {symptomData.lifestyleAdvice.map((advice, idx) => (
                  <li key={idx} className="text-xs text-[var(--ink-brown)] flex items-start gap-2">
                    <span className="text-[var(--gold-leaf)]">•</span>
                    {advice}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Herbs */}
        {symptomData && symptomData.herbs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[var(--ink-black)] mb-3 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-600" />
              Recommended Herbs
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {symptomData.herbs.map((herb, idx) => (
                <div key={idx} className="bg-green-50 rounded-xl p-3 border border-green-200">
                  <p className="font-bold text-sm text-green-800">{herb.name}</p>
                  <p className="text-xs text-green-700 mt-1">{herb.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yoga Asanas */}
        {symptomData && symptomData.yogaAsanas.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[var(--ink-black)] mb-3">🧘 Recommended Yoga</h3>
            <div className="flex flex-wrap gap-2">
              {symptomData.yogaAsanas.map((asana, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs">
                  {asana}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Charaka Samhita References */}
        {sutras.length > 0 && (
          <div className="bg-[var(--parchment)] rounded-xl p-5 border-2 border-[var(--gold-leaf)]">
            <h3 className="text-sm font-bold text-[var(--ink-black)] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--gold-leaf)]" />
              Charaka Samhita References
            </h3>
            <div className="space-y-4">
              {sutras.map((sutra, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-[var(--palm-leaf)]">
                  <p className="text-xs text-[var(--copper-brown)] font-medium mb-2">
                    📜 {sutra.reference}
                  </p>
                  <p className="text-sm text-[var(--ink-brown)] italic leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                    "{sutra.english}"
                  </p>
                  <p className="text-xs text-[var(--faded-ink)] mt-2">
                    Context: {sutra.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-white via-[var(--parchment-light)] to-[var(--parchment)] rounded-xl shadow-lg p-6 border-2 border-[var(--palm-leaf)]">
      {/* Corner ornaments */}
      <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-2xl">❧</div>
      <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-x-[-1]">❧</div>
      <div className="absolute bottom-4 left-4 text-[var(--gold-leaf)] text-2xl transform scale-y-[-1]">❧</div>
      <div className="absolute bottom-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-[-1]">❧</div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <span className="text-[var(--gold-leaf)] mr-3">❖</span>
          <h2 className="text-2xl font-bold text-[var(--ink-black)]" style={{fontFamily: 'Georgia, serif'}}>
            Quick Fix Guide
          </h2>
          <span className="text-[var(--gold-leaf)] ml-3">❖</span>
        </div>
        <p className="text-[var(--ink-brown)]">
          Pick your symptom. Get instant Ayurvedic solutions from Charaka Samhita.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--faded-ink)]" />
        <input
          type="text"
          placeholder="Search symptoms (e.g., headache, thyroid, stress...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[var(--palm-leaf)] bg-white focus:border-[var(--gold-leaf)] focus:outline-none transition-colors text-[var(--ink-black)]"
        />
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--gold-leaf)]"></div>
        <span className="mx-4 text-[var(--gold-leaf)]">✿</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--gold-leaf)]"></div>
      </div>

      {/* Results count */}
      {searchTerm && (
        <p className="text-sm text-[var(--faded-ink)] mb-4">
          Found {filteredFixes.length} symptom{filteredFixes.length !== 1 ? 's' : ''} matching "{searchTerm}"
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayedFixes.map((fix) => {
          const Icon = fix.icon;
          return (
            <button
              key={fix.id}
              onClick={() => setSelectedPath(fix.id)}
              className="relative bg-white rounded-xl p-4 text-left hover:shadow-lg transition-all border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] group"
            >
              <div className="absolute top-2 right-2 text-[var(--gold-leaf)] opacity-30 text-sm">✦</div>
              <div
                className="w-12 h-12 rounded-full mb-3 flex items-center justify-center border-2 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: fix.iconBg, borderColor: fix.iconColor }}
              >
                <Icon className="w-6 h-6" style={{ color: fix.iconColor }} />
              </div>
              <p className="font-bold text-[var(--ink-black)] text-sm mb-1 leading-tight">{fix.title}</p>
              <p className="text-xs text-[var(--faded-ink)]">{fix.category}</p>
            </button>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {filteredFixes.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-[var(--copper-brown)] hover:text-[var(--henna)] font-medium transition-colors border-t border-[var(--palm-leaf)]"
        >
          {showAll ? (
            <>
              <ChevronUp className="w-5 h-5" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              Show {filteredFixes.length - 6} More Symptoms
            </>
          )}
        </button>
      )}

      {/* No results message */}
      {filteredFixes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[var(--faded-ink)]">No symptoms found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-[var(--copper-brown)] hover:text-[var(--henna)] underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
