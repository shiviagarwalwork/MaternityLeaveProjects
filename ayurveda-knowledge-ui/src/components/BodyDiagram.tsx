'use client';

import { useState } from 'react';
import { bodyParts } from '@/data/symptoms';
import { aiService } from '@/services/aiService';
import { Recommendation } from '@/types';
import RecommendationCard from './RecommendationCard';

export default function BodyDiagram() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePartClick = async (partId: string) => {
    const part = bodyParts.find(p => p.id === partId);
    if (part) {
      setSelectedPart(partId);
      setIsLoading(true);
      try {
        const query = part.commonIssues.join(', ');
        const recs = await aiService.getRecommendations(query);
        setRecommendations(recs);
      } catch (error) {
        console.error('Error getting recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const activePart = hoveredPart || selectedPart;
  const activeBodyPart = bodyParts.find(p => p.id === activePart);

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Body Diagram</h2>
      <p className="text-[var(--text-muted)] mb-6">Click on a body part to see common health concerns</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* SVG Body Diagram */}
        <div className="flex-1">
          <svg
            viewBox="0 0 200 400"
            className="w-full max-w-md mx-auto"
            style={{ maxHeight: '500px' }}
          >
            {/* Head */}
            <ellipse
              cx="100"
              cy="40"
              rx="35"
              ry="40"
              className={`cursor-pointer transition-all ${
                activePart === 'head'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-amber-100 stroke-amber-300 hover:fill-amber-200'
              }`}
              onClick={() => handlePartClick('head')}
              onMouseEnter={() => setHoveredPart('head')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />

            {/* Eyes */}
            <circle
              cx="85"
              cy="35"
              r="8"
              className={`cursor-pointer transition-all ${
                activePart === 'eyes'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-blue-100 stroke-blue-300 hover:fill-blue-200'
              }`}
              onClick={() => handlePartClick('eyes')}
              onMouseEnter={() => setHoveredPart('eyes')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />
            <circle
              cx="115"
              cy="35"
              r="8"
              className={`cursor-pointer transition-all ${
                activePart === 'eyes'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-blue-100 stroke-blue-300 hover:fill-blue-200'
              }`}
              onClick={() => handlePartClick('eyes')}
              onMouseEnter={() => setHoveredPart('eyes')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />

            {/* Throat */}
            <rect
              x="85"
              y="75"
              width="30"
              height="25"
              rx="5"
              className={`cursor-pointer transition-all ${
                activePart === 'throat'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-red-100 stroke-red-300 hover:fill-red-200'
              }`}
              onClick={() => handlePartClick('throat')}
              onMouseEnter={() => setHoveredPart('throat')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />

            {/* Chest */}
            <ellipse
              cx="100"
              cy="140"
              rx="50"
              ry="45"
              className={`cursor-pointer transition-all ${
                activePart === 'chest'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-green-100 stroke-green-300 hover:fill-green-200'
              }`}
              onClick={() => handlePartClick('chest')}
              onMouseEnter={() => setHoveredPart('chest')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />

            {/* Stomach */}
            <ellipse
              cx="100"
              cy="210"
              rx="45"
              ry="35"
              className={`cursor-pointer transition-all ${
                activePart === 'stomach'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-purple-100 stroke-purple-300 hover:fill-purple-200'
              }`}
              onClick={() => handlePartClick('stomach')}
              onMouseEnter={() => setHoveredPart('stomach')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />

            {/* Arms/Joints */}
            <circle
              cx="40"
              cy="130"
              r="15"
              className={`cursor-pointer transition-all ${
                activePart === 'joints'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-orange-100 stroke-orange-300 hover:fill-orange-200'
              }`}
              onClick={() => handlePartClick('joints')}
              onMouseEnter={() => setHoveredPart('joints')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />
            <circle
              cx="160"
              cy="130"
              r="15"
              className={`cursor-pointer transition-all ${
                activePart === 'joints'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-orange-100 stroke-orange-300 hover:fill-orange-200'
              }`}
              onClick={() => handlePartClick('joints')}
              onMouseEnter={() => setHoveredPart('joints')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
            />

            {/* Back */}
            <rect
              x="75"
              y="110"
              width="50"
              height="80"
              rx="10"
              className={`cursor-pointer transition-all ${
                activePart === 'back'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-yellow-100 stroke-yellow-300 hover:fill-yellow-200'
              }`}
              onClick={() => handlePartClick('back')}
              onMouseEnter={() => setHoveredPart('back')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
              opacity="0.5"
            />

            {/* Skin (body outline) */}
            <ellipse
              cx="100"
              cy="175"
              rx="55"
              ry="90"
              className={`cursor-pointer transition-all ${
                activePart === 'skin'
                  ? 'fill-amber-500 stroke-amber-700'
                  : 'fill-pink-100 stroke-pink-300 hover:fill-pink-200'
              }`}
              onClick={() => handlePartClick('skin')}
              onMouseEnter={() => setHoveredPart('skin')}
              onMouseLeave={() => setHoveredPart(null)}
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Labels */}
            <text x="100" y="50" textAnchor="middle" className="text-xs pointer-events-none" fill="#2d3e1f" fontWeight="bold">Head</text>
            <text x="100" y="90" textAnchor="middle" className="text-xs pointer-events-none" fill="#2d3e1f" fontWeight="bold">Throat</text>
            <text x="100" y="145" textAnchor="middle" className="text-xs pointer-events-none" fill="#2d3e1f" fontWeight="bold">Chest</text>
            <text x="100" y="215" textAnchor="middle" className="text-xs pointer-events-none" fill="#2d3e1f" fontWeight="bold">Stomach</text>
          </svg>
        </div>

        {/* Info Panel */}
        <div className="flex-1">
          {activeBodyPart ? (
            <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] p-6 rounded-lg border-2 border-[var(--accent-primary)]">
              <h3 className="text-xl font-bold text-[var(--accent-secondary)] mb-4">{activeBodyPart.name}</h3>
              <p className="text-sm text-[var(--foreground)] mb-3 font-semibold">Common Issues:</p>
              <ul className="space-y-2">
                {activeBodyPart.commonIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[var(--accent-primary)] mr-2">•</span>
                    <span className="text-[var(--foreground)]">{issue}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePartClick(activeBodyPart.id)}
                disabled={isLoading}
                className="mt-4 w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--foreground)] py-2 px-4 rounded-lg hover:from-[var(--olive)] hover:to-[var(--olive-dark)] disabled:bg-[var(--card-bg-light)]300"
              >
                {isLoading ? 'Getting Remedies...' : 'Get Remedies'}
              </button>
            </div>
          ) : (
            <div className="bg-[var(--card-bg-light)] p-6 rounded-lg border-2 border-[var(--border-color)] h-full flex items-center justify-center">
              <p className="text-[var(--text-muted)] text-center">
                Hover over or click a body part to see common health concerns
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Ayurvedic Remedies</h3>
          <div className="space-y-4">
            {recommendations.map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
