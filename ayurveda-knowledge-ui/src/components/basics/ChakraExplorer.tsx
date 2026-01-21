'use client';

import { useState } from 'react';
import { chakras } from '@/data/chakras';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ChakraExplorer() {
  const [selectedChakra, setSelectedChakra] = useState(chakras[0]);
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-[var(--card-bg)] rounded-lg p-6 border-2 border-[var(--accent-primary)]">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
          What Are Chakras?
        </h2>
        <p className="text-[var(--foreground)] mb-2">
          Chakras are energy centers in your body - think of them as your internal power stations. Each one governs specific physical, emotional, and mental functions.
        </p>
        <p className="text-[var(--foreground)]">
          <strong>For skeptics:</strong> Chakras map to actual nerve plexuses, endocrine glands, and organ systems. Ancient wisdom, modern anatomy.
        </p>
      </div>

      {/* Visual Chakra Selector */}
      <div className="bg-[var(--card-bg)] rounded-lg p-8 shadow-lg">
        <h3 className="text-xl font-bold text-center text-[var(--foreground)] mb-6">
          Select a Chakra
        </h3>

        {/* Vertical Chakra Display */}
        <div className="flex flex-col-reverse items-center gap-4 mb-8">
          {chakras.map((chakra) => (
            <button
              key={chakra.id}
              onClick={() => setSelectedChakra(chakra)}
              className={`w-full max-w-md p-4 rounded-lg border-4 transition-all ${
                selectedChakra.id === chakra.id
                  ? 'border-[var(--accent-primary)] bg-[var(--card-bg-light)] shadow-xl scale-105'
                  : 'border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--accent-primary)]'
              }`}
              style={{ borderLeftColor: chakra.color, borderLeftWidth: '8px' }}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{chakra.symbol}</div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-[var(--foreground)]">
                    {chakra.number}. {chakra.name}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {chakra.sanskrit} - {chakra.location}
                  </div>
                  <div className="text-xs text-[var(--accent-primary)] mt-1 italic">
                    {chakra.westernConcept}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Chakra Information */}
      <div className="bg-[var(--card-bg)] rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div
          className="p-6 border-b-4"
          style={{
            background: `linear-gradient(to right, ${selectedChakra.color}15, ${selectedChakra.color}05)`,
            borderColor: selectedChakra.color
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{selectedChakra.symbol}</span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[var(--foreground)]">
                {selectedChakra.name}
              </h2>
              <p className="text-lg text-[var(--foreground)] mt-1">
                {selectedChakra.sanskrit} <span className="text-[var(--text-muted)]">({selectedChakra.translation})</span>
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-[var(--foreground)]">
                  <strong>Location:</strong> {selectedChakra.location}
                </p>
                <p className="text-[var(--foreground)]">
                  <strong>Element:</strong> {selectedChakra.element}
                </p>
              </div>
            </div>
          </div>

          {/* Western Concept & Modern Issue */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[var(--card-bg)] p-4 rounded-lg">
              <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Western Concept</h4>
              <p className="text-[var(--foreground)]">{selectedChakra.westernConcept}</p>
            </div>
            <div className="bg-[var(--card-bg)] p-4 rounded-lg">
              <h4 className="font-semibold text-[var(--accent-secondary)] mb-2">Modern Issue</h4>
              <p className="text-[var(--foreground)]">{selectedChakra.modernIssue}</p>
            </div>
          </div>
        </div>

        {/* Physical Connections */}
        <Section
          title="Physical Connection (The Science Part)"
          isExpanded={expandedSection === 'overview'}
          onToggle={() => toggleSection('overview')}
        >
          <div className="space-y-4">
            <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
              <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Endocrine System</h4>
              <p className="text-[var(--foreground)]">
                <strong>Glands:</strong> {selectedChakra.physicalLink.glands}
              </p>
            </div>
            <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
              <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Organs & Body Parts</h4>
              <div className="grid md:grid-cols-2 gap-3 mt-2">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)] mb-1">Organs:</p>
                  <ul className="text-[var(--foreground)] space-y-1">
                    {selectedChakra.physicalLink.organs.map((organ, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="text-[var(--accent-primary)]">•</span>
                        {organ}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)] mb-1">Body Parts:</p>
                  <ul className="text-[var(--foreground)] space-y-1">
                    {selectedChakra.physicalLink.bodyParts.map((part, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="text-[var(--accent-primary)]">•</span>
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* When Balanced */}
        <Section
          title="When This Chakra is Balanced"
          isExpanded={expandedSection === 'balanced'}
          onToggle={() => toggleSection('balanced')}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-[var(--accent-primary)] mb-3">Physical</h4>
              <ul className="space-y-2">
                {selectedChakra.balanced.physical.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-primary)] mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--accent-primary)] mb-3">Emotional</h4>
              <ul className="space-y-2">
                {selectedChakra.balanced.emotional.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-primary)] mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--accent-primary)] mb-3">Mental</h4>
              <ul className="space-y-2">
                {selectedChakra.balanced.mental.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-primary)] mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--accent-primary)] mb-3">Spiritual</h4>
              <ul className="space-y-2">
                {selectedChakra.balanced.spiritual.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-primary)] mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* When Imbalanced */}
        <Section
          title="When This Chakra is Imbalanced"
          isExpanded={expandedSection === 'imbalanced'}
          onToggle={() => toggleSection('imbalanced')}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-500 mb-3">Excessive (Too Much)</h4>
              <ul className="space-y-2">
                {selectedChakra.imbalanced.excessive.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-red-500">↑</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-500 mb-3">Deficient (Too Little)</h4>
              <ul className="space-y-2">
                {selectedChakra.imbalanced.deficient.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-blue-500">↓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-[var(--accent-secondary)]">
              <h4 className="font-semibold text-[var(--accent-secondary)] mb-3">Physical Symptoms</h4>
              <ul className="space-y-2">
                {selectedChakra.imbalanced.physical_symptoms.map((item, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                    <span className="text-[var(--accent-secondary)]">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Balance Practices */}
        <Section
          title="How to Balance This Chakra"
          isExpanded={expandedSection === 'practices'}
          onToggle={() => toggleSection('practices')}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--accent-primary)] mb-3">Yoga Poses</h4>
                <ul className="space-y-2">
                  {selectedChakra.practices.yoga_poses.map((pose, idx) => (
                    <li key={idx} className="text-[var(--foreground)] text-sm flex items-center gap-2">
                      <span className="text-[var(--accent-primary)]">•</span>
                      {pose}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Breathwork</h4>
                <p className="text-[var(--foreground)] text-sm">{selectedChakra.practices.breathwork}</p>
              </div>

              <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Meditation</h4>
                <p className="text-[var(--foreground)] text-sm">{selectedChakra.practices.meditation}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--accent-primary)] mb-3">Affirmations</h4>
                <ul className="space-y-2">
                  {selectedChakra.practices.affirmations.map((affirmation, idx) => (
                    <li key={idx} className="text-[var(--foreground)] text-sm italic">
                      "{affirmation}"
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Foods</h4>
                <ul className="space-y-1">
                  {selectedChakra.practices.foods.map((food, idx) => (
                    <li key={idx} className="text-[var(--foreground)] text-sm flex items-start gap-2">
                      <span className="text-[var(--accent-primary)]">•</span>
                      {food}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Colors & Sounds</h4>
                <p className="text-[var(--foreground)] text-sm mb-2">
                  <strong>Colors:</strong> {selectedChakra.practices.colors}
                </p>
                <p className="text-[var(--foreground)] text-sm">
                  <strong>Sounds:</strong> {selectedChakra.practices.sounds}
                </p>
              </div>

              <div className="bg-[var(--card-bg-light)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--accent-primary)] mb-2">Crystals (Optional)</h4>
                <p className="text-[var(--foreground)] text-sm">
                  {selectedChakra.practices.crystals.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Modern Life Application */}
        <Section
          title="Real Life Application"
          isExpanded={expandedSection === 'modern'}
          onToggle={() => toggleSection('modern')}
        >
          <div className="space-y-4">
            <div className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-500 mb-2">The Challenge</h4>
              <p className="text-[var(--foreground)]">{selectedChakra.modernApplication.challenge}</p>
            </div>

            <div className="bg-[var(--card-bg-light)] p-4 rounded-lg border-l-4 border-[var(--accent-primary)]">
              <h4 className="font-semibold text-[var(--accent-primary)] mb-2">The Solution</h4>
              <p className="text-[var(--foreground)]">{selectedChakra.modernApplication.solution}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Daily Practice</h4>
                <p className="text-sm opacity-90">{selectedChakra.modernApplication.daily_practice}</p>
              </div>

              <div className="bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--gold)] text-[var(--background)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Quick Fix</h4>
                <p className="text-sm opacity-90">{selectedChakra.modernApplication.quick_fix}</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Quick Reference Card */}
      <div className="bg-gradient-to-r from-[var(--card-bg)] to-[var(--card-bg-light)] border-2 border-[var(--accent-primary)] rounded-lg p-6">
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 text-center">
          Pro Tip: Start with One Chakra
        </h3>
        <p className="text-[var(--foreground)] text-center">
          Don't try to balance all 7 at once. Pick the chakra that resonates most with your current challenges and focus there for 1-2 weeks.
        </p>
      </div>
    </div>
  );
}

// Helper Component
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
