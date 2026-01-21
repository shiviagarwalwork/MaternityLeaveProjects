'use client';

import { useState } from 'react';
import { doshaGuides } from '@/data/doshaGuides';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DoshaGuides() {
  const [selectedDosha, setSelectedDosha] = useState(doshaGuides[0]);
  const [expandedSection, setExpandedSection] = useState<string | null>('physical');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-[var(--card-bg)] rounded-lg p-6 border-2 border-[var(--accent-primary)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
          What Are Doshas?
        </h2>
        <p className="text-[var(--foreground)] mb-2">
          Doshas are your mind-body constitution - your unique combination of physical, mental, and emotional characteristics. Think of it as your wellness blueprint.
        </p>
        <p className="text-[var(--foreground)]">
          Understanding your dosha helps you make personalized choices about diet, exercise, and lifestyle that actually work for YOUR body.
        </p>
      </div>

      {/* Dosha Selector Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {doshaGuides.map((dosha) => (
          <button
            key={dosha.id}
            onClick={() => setSelectedDosha(dosha)}
            className={`p-6 rounded-lg border-4 transition-all text-left ${
              selectedDosha.id === dosha.id
                ? 'border-[var(--accent-primary)] bg-[var(--card-bg)] shadow-lg scale-105'
                : 'border-[var(--border-color)] bg-[var(--card-bg-light)] hover:border-[var(--accent-primary)]'
            }`}
          >
            <div className="text-4xl mb-3">{dosha.icon}</div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
              {dosha.name}
            </h3>
            <p className="text-[var(--text-muted)] text-sm mb-3">{dosha.subtitle}</p>
            <p className="text-sm text-[var(--foreground)] italic">
              "{dosha.westernEquivalent}"
            </p>
          </button>
        ))}
      </div>

      {/* Detailed Dosha Information */}
      <div className="bg-[var(--card-bg)] rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--card-bg-light)] to-[var(--olive-light)] p-6 border-b-4 border-[var(--accent-primary)]">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{selectedDosha.icon}</span>
            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)]">
                {selectedDosha.name} <span className="text-xl text-[var(--text-muted)]">({selectedDosha.subtitle})</span>
              </h2>
              <p className="text-[var(--foreground)] mt-2 italic">
                {selectedDosha.westernEquivalent}
              </p>
            </div>
          </div>
        </div>

        {/* Physical Characteristics */}
        <Section
          title="Physical Characteristics"
          isExpanded={expandedSection === 'physical'}
          onToggle={() => toggleSection('physical')}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard label="Body Type" value={selectedDosha.physical.bodyType} />
            <InfoCard label="Skin" value={selectedDosha.physical.skin} />
            <InfoCard label="Hair" value={selectedDosha.physical.hair} />
            <InfoCard label="Eyes" value={selectedDosha.physical.eyes} />
            <InfoCard label="Appetite" value={selectedDosha.physical.appetite} />
            <InfoCard label="Digestion" value={selectedDosha.physical.digestion} />
            <InfoCard label="Sleep" value={selectedDosha.physical.sleep} />
            <InfoCard label="Energy" value={selectedDosha.physical.energy} />
          </div>
        </Section>

        {/* Mental & Emotional Traits */}
        <Section
          title="Mental & Emotional Traits"
          isExpanded={expandedSection === 'mental'}
          onToggle={() => toggleSection('mental')}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InfoCard label="Thinking Style" value={selectedDosha.mental.thinking} />
            <InfoCard label="Learning" value={selectedDosha.mental.learning} />
            <InfoCard label="Memory" value={selectedDosha.mental.memory} />
            <InfoCard label="Creativity" value={selectedDosha.mental.creativity} />
            <InfoCard label="Under Stress" value={selectedDosha.mental.under_stress} />
          </div>
        </Section>

        {/* Balanced vs Imbalanced */}
        <Section
          title="When Balanced vs Imbalanced"
          isExpanded={expandedSection === 'balance'}
          onToggle={() => toggleSection('balance')}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--card-bg)] p-4 rounded-lg border-2 border-[var(--accent-primary)]">
              <h4 className="font-bold text-[var(--accent-primary)] mb-3 flex items-center gap-2">
                <span className="text-xl">✓</span> When Balanced
              </h4>
              <ul className="space-y-2">
                {selectedDosha.whenBalanced.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] flex items-start gap-2">
                    <span className="text-[var(--accent-primary)] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--card-bg)] p-4 rounded-lg border-2 border-[var(--accent-secondary)]">
              <h4 className="font-bold text-[var(--accent-secondary)] mb-3 flex items-center gap-2">
                <span className="text-xl">⚠</span> When Imbalanced
              </h4>
              <ul className="space-y-2">
                {selectedDosha.whenImbalanced.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] flex items-start gap-2">
                    <span className="text-[var(--accent-secondary)] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Modern Life Issues */}
        <Section
          title="Modern Life Challenges & Solutions"
          isExpanded={expandedSection === 'modern'}
          onToggle={() => toggleSection('modern')}
        >
          <div className="space-y-4">
            {selectedDosha.modernImbalances.map((item, idx) => (
              <div key={idx} className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-[var(--accent-primary)]">
                <h4 className="font-bold text-[var(--foreground)] mb-2">
                  {item.issue}
                </h4>
                <p className="text-sm text-[var(--text-muted)] mb-2">
                  <strong className="text-[var(--accent-secondary)]">Cause:</strong> {item.cause}
                </p>
                <p className="text-sm text-[var(--foreground)]">
                  <strong className="text-[var(--accent-primary)]">Solution:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Food Guidelines */}
        <Section
          title="Food Guidelines"
          isExpanded={expandedSection === 'food'}
          onToggle={() => toggleSection('food')}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--card-bg)] p-4 rounded-lg border-2 border-[var(--accent-primary)]">
              <h4 className="font-bold text-[var(--accent-primary)] mb-3">✓ Favor These Foods</h4>
              <ul className="space-y-2">
                {selectedDosha.foods.favor.map((food, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-primary)]">•</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <p className="text-sm text-[var(--foreground)]">
                  <strong>Best Tastes:</strong> {selectedDosha.foods.tastes.join(', ')}
                </p>
              </div>
            </div>
            <div className="bg-[var(--card-bg)] p-4 rounded-lg border-2 border-[var(--accent-secondary)]">
              <h4 className="font-bold text-[var(--accent-secondary)] mb-3">✗ Reduce These Foods</h4>
              <ul className="space-y-2">
                {selectedDosha.foods.reduce.map((food, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-secondary)]">•</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Lifestyle Practices */}
        <Section
          title="Lifestyle Practices"
          isExpanded={expandedSection === 'lifestyle'}
          onToggle={() => toggleSection('lifestyle')}
        >
          <div className="space-y-4">
            <InfoCard label="Exercise" value={selectedDosha.lifestyle.exercise} />
            <InfoCard label="Yoga" value={selectedDosha.lifestyle.yoga} />
            <InfoCard label="Routine" value={selectedDosha.lifestyle.routine} />
            <InfoCard label="Self-Care" value={selectedDosha.lifestyle.self_care} />
            <InfoCard label="Environment" value={selectedDosha.lifestyle.environment} />
          </div>
        </Section>

        {/* Quick Fixes */}
        <Section
          title="Quick Fixes - Start Here"
          isExpanded={expandedSection === 'quick'}
          onToggle={() => toggleSection('quick')}
        >
          <div className="grid md:grid-cols-3 gap-4">
            {selectedDosha.quickFixes.map((fix, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">{fix.title}</h4>
                <p className="text-sm mb-2 opacity-90">{fix.practice}</p>
                <p className="text-xs opacity-75">⏰ {fix.timing}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Herbs & Supplements */}
        <Section
          title="Recommended Herbs"
          isExpanded={expandedSection === 'herbs'}
          onToggle={() => toggleSection('herbs')}
        >
          <div className="grid md:grid-cols-3 gap-4">
            {selectedDosha.herbs.map((herb, idx) => (
              <div key={idx} className="bg-[var(--card-bg-light)] p-4 rounded-lg border-2 border-[var(--border-color)]">
                <h4 className="font-bold text-[var(--accent-primary)] mb-2">{herb.name}</h4>
                <p className="text-sm text-[var(--foreground)] mb-2">{herb.benefit}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  <strong>Dosage:</strong> {herb.dosage}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[var(--card-bg)] to-[var(--card-bg-light)] border-2 border-[var(--accent-primary)] rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
          Want to Know Your Dosha?
        </h3>
        <p className="text-[var(--foreground)] mb-4">
          Take our comprehensive Dosha Assessment to discover your unique constitution
        </p>
        <button
          onClick={() => {
            window.location.hash = 'assessment';
            window.location.reload();
          }}
          className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-6 py-3 rounded-lg font-bold hover:opacity-90"
        >
          Take Dosha Quiz →
        </button>
      </div>
    </div>
  );
}

// Helper Components
function Section({
  title,
  children,
  isExpanded,
  onToggle
}: {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--border-color)]">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[var(--card-bg-light)] transition-colors"
      >
        <h3 className="text-xl font-bold text-[var(--foreground)]">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-6 h-6 text-[var(--accent-primary)]" />
        ) : (
          <ChevronDown className="w-6 h-6 text-[var(--text-muted)]" />
        )}
      </button>
      {isExpanded && (
        <div className="px-6 pb-6">
          {children}
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--card-bg-light)] p-3 rounded-lg">
      <p className="text-sm font-semibold text-[var(--accent-primary)] mb-1">{label}</p>
      <p className="text-[var(--foreground)]">{value}</p>
    </div>
  );
}
