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

  // Chakra colors matching the app's design
  const chakraColors = {
    head: { fill: '#9B59B6', stroke: '#7D3C98', label: 'Sahasrara' }, // Crown - Purple
    eyes: { fill: '#5B5EA6', stroke: '#3F4289', label: 'Ajna' }, // Third Eye - Indigo
    throat: { fill: '#3498DB', stroke: '#2874A6', label: 'Vishuddha' }, // Throat - Blue
    chest: { fill: '#2ECC71', stroke: '#239B56', label: 'Anahata' }, // Heart - Green
    stomach: { fill: '#F1C40F', stroke: '#D4AC0D', label: 'Manipura' }, // Solar Plexus - Yellow
    back: { fill: '#E67E22', stroke: '#CA6F1E', label: 'Svadhisthana' }, // Sacral - Orange
    joints: { fill: '#E74C3C', stroke: '#C0392B', label: 'Muladhara' }, // Root - Red
    skin: { fill: '#F5EFE0', stroke: '#D4C5A9', label: 'Skin' },
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-[var(--parchment-light)] to-[var(--parchment)] rounded-xl shadow-lg p-6 border-2 border-[var(--palm-leaf)]">
      {/* Manuscript Corner Ornaments */}
      <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-2xl">❧</div>
      <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-x-[-1]">❧</div>
      <div className="absolute bottom-4 left-4 text-[var(--gold-leaf)] text-2xl transform scale-y-[-1]">❧</div>
      <div className="absolute bottom-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-[-1]">❧</div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <span className="text-[var(--gold-leaf)] mr-3">❖</span>
          <h2 className="text-2xl font-bold text-[var(--ink-black)]" style={{fontFamily: 'Georgia, serif'}}>
            Interactive Body Map
          </h2>
          <span className="text-[var(--gold-leaf)] ml-3">❖</span>
        </div>
        <p className="text-[var(--ink-brown)]">
          Click on a body part to explore Ayurvedic insights based on ancient Pariksha methods
        </p>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--gold-leaf)]"></div>
        <span className="mx-4 text-[var(--gold-leaf)]">✿</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--gold-leaf)]"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* SVG Body Diagram with Chakra Styling */}
        <div className="flex-1">
          <div className="bg-[var(--parchment)] rounded-xl p-4 border border-[var(--palm-leaf)]">
            <svg
              viewBox="0 0 200 400"
              className="w-full max-w-md mx-auto"
              style={{ maxHeight: '500px' }}
            >
              {/* Decorative background pattern */}
              <defs>
                <pattern id="manuscriptPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                  <circle cx="10" cy="10" r="1" fill="#D4AF37" opacity="0.1"/>
                </pattern>
              </defs>
              <rect width="200" height="400" fill="url(#manuscriptPattern)" />

              {/* Body outline glow */}
              <ellipse
                cx="100"
                cy="200"
                rx="70"
                ry="150"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1"
                opacity="0.3"
              />

              {/* Head - Crown Chakra */}
              <ellipse
                cx="100"
                cy="40"
                rx="35"
                ry="40"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'head' ? chakraColors.head.fill : '#F5EFE0'}
                stroke={activePart === 'head' ? chakraColors.head.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('head')}
                onMouseEnter={() => setHoveredPart('head')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="3"
                opacity={activePart === 'head' ? 1 : 0.8}
              />
              {/* Crown chakra symbol - Sahasrara */}
              <text x="100" y="48" textAnchor="middle" fontSize="14" fill={activePart === 'head' ? '#fff' : '#9B59B6'} style={{fontFamily: 'Georgia, serif'}}>सहस्रार</text>

              {/* Eyes - Third Eye Chakra */}
              <circle
                cx="85"
                cy="35"
                r="8"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'eyes' ? chakraColors.eyes.fill : '#F5EFE0'}
                stroke={activePart === 'eyes' ? chakraColors.eyes.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('eyes')}
                onMouseEnter={() => setHoveredPart('eyes')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="2"
              />
              <circle
                cx="115"
                cy="35"
                r="8"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'eyes' ? chakraColors.eyes.fill : '#F5EFE0'}
                stroke={activePart === 'eyes' ? chakraColors.eyes.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('eyes')}
                onMouseEnter={() => setHoveredPart('eyes')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="2"
              />

              {/* Throat - Vishuddha Chakra */}
              <rect
                x="85"
                y="75"
                width="30"
                height="25"
                rx="5"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'throat' ? chakraColors.throat.fill : '#F5EFE0'}
                stroke={activePart === 'throat' ? chakraColors.throat.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('throat')}
                onMouseEnter={() => setHoveredPart('throat')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="2"
              />

              {/* Chest - Heart Chakra */}
              <ellipse
                cx="100"
                cy="140"
                rx="50"
                ry="45"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'chest' ? chakraColors.chest.fill : '#F5EFE0'}
                stroke={activePart === 'chest' ? chakraColors.chest.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('chest')}
                onMouseEnter={() => setHoveredPart('chest')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="3"
              />
              {/* Heart chakra symbol - Anahata */}
              <text x="100" y="145" textAnchor="middle" fontSize="12" fill={activePart === 'chest' ? '#fff' : '#2ECC71'} style={{fontFamily: 'Georgia, serif'}}>अनाहत</text>

              {/* Stomach - Solar Plexus Chakra */}
              <ellipse
                cx="100"
                cy="210"
                rx="45"
                ry="35"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'stomach' ? chakraColors.stomach.fill : '#F5EFE0'}
                stroke={activePart === 'stomach' ? chakraColors.stomach.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('stomach')}
                onMouseEnter={() => setHoveredPart('stomach')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="3"
              />
              {/* Solar Plexus symbol - Manipura/Agni */}
              <text x="100" y="215" textAnchor="middle" fontSize="12" fill={activePart === 'stomach' ? '#fff' : '#D4AC0D'} style={{fontFamily: 'Georgia, serif'}}>अग्नि</text>

              {/* Arms/Joints - Root connections */}
              <circle
                cx="40"
                cy="130"
                r="15"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'joints' ? chakraColors.joints.fill : '#F5EFE0'}
                stroke={activePart === 'joints' ? chakraColors.joints.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('joints')}
                onMouseEnter={() => setHoveredPart('joints')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="2"
              />
              <circle
                cx="160"
                cy="130"
                r="15"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'joints' ? chakraColors.joints.fill : '#F5EFE0'}
                stroke={activePart === 'joints' ? chakraColors.joints.stroke : '#D4C5A9'}
                onClick={() => handlePartClick('joints')}
                onMouseEnter={() => setHoveredPart('joints')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="2"
              />

              {/* Back - Sacral area */}
              <rect
                x="75"
                y="110"
                width="50"
                height="80"
                rx="10"
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'back' ? chakraColors.back.fill : '#F5EFE0'}
                stroke={activePart === 'back' ? chakraColors.back.stroke : '#D4C5A9'}
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
                className="cursor-pointer transition-all duration-300"
                fill={activePart === 'skin' ? '#F5E6D3' : 'transparent'}
                stroke={activePart === 'skin' ? '#B87333' : '#D4C5A9'}
                onClick={() => handlePartClick('skin')}
                onMouseEnter={() => setHoveredPart('skin')}
                onMouseLeave={() => setHoveredPart(null)}
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="5,5"
              />

              {/* Labels with manuscript styling */}
              <text x="100" y="12" textAnchor="middle" className="text-[10px]" fill="#5C4033" fontWeight="bold" style={{fontFamily: 'Georgia, serif'}}>Head</text>
              <text x="100" y="68" textAnchor="middle" className="text-[10px]" fill="#5C4033" fontWeight="bold" style={{fontFamily: 'Georgia, serif'}}>Eyes</text>
              <text x="145" y="90" textAnchor="start" className="text-[10px]" fill="#5C4033" fontWeight="bold" style={{fontFamily: 'Georgia, serif'}}>Throat</text>
              <text x="160" y="145" textAnchor="start" className="text-[10px]" fill="#5C4033" fontWeight="bold" style={{fontFamily: 'Georgia, serif'}}>Chest</text>
              <text x="155" y="215" textAnchor="start" className="text-[10px]" fill="#5C4033" fontWeight="bold" style={{fontFamily: 'Georgia, serif'}}>Stomach</text>
              <text x="20" y="160" textAnchor="start" className="text-[10px]" fill="#5C4033" fontWeight="bold" style={{fontFamily: 'Georgia, serif'}}>Joints</text>
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-[#9B59B6]/20 text-[#7D3C98]">Crown</span>
            <span className="px-2 py-1 rounded bg-[#5B5EA6]/20 text-[#3F4289]">Third Eye</span>
            <span className="px-2 py-1 rounded bg-[#3498DB]/20 text-[#2874A6]">Throat</span>
            <span className="px-2 py-1 rounded bg-[#2ECC71]/20 text-[#239B56]">Heart</span>
            <span className="px-2 py-1 rounded bg-[#F1C40F]/20 text-[#D4AC0D]">Solar Plexus</span>
            <span className="px-2 py-1 rounded bg-[#E74C3C]/20 text-[#C0392B]">Root</span>
          </div>
        </div>

        {/* Info Panel with Manuscript Style */}
        <div className="flex-1">
          {activeBodyPart ? (
            <div className="relative bg-gradient-to-br from-white to-[var(--parchment-light)] p-6 rounded-xl border-2 border-[var(--gold-leaf)]">
              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 text-[var(--gold-leaf)] opacity-50">✦</div>
              <div className="absolute top-2 right-2 text-[var(--gold-leaf)] opacity-50">✦</div>

              <h3 className="text-xl font-bold text-[var(--copper-brown)] mb-4 flex items-center" style={{fontFamily: 'Georgia, serif'}}>
                <span className="text-[var(--gold-leaf)] mr-2">❖</span>
                {activeBodyPart.name}
              </h3>

              <p className="text-sm text-[var(--ink-black)] mb-3 font-semibold">Common Issues (from Charaka Samhita):</p>
              <ul className="space-y-2 mb-4">
                {activeBodyPart.commonIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-[var(--gold-leaf)] mr-2">✦</span>
                    <span className="text-[var(--ink-brown)]">{issue}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePartClick(activeBodyPart.id)}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-medium"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">✿</span>
                    Getting Remedies...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2 text-[var(--gold-leaf)]">❖</span>
                    Get Ayurvedic Remedies
                  </span>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-[var(--parchment-light)] p-6 rounded-xl border-2 border-[var(--palm-leaf)] h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4 text-[var(--gold-leaf)]">✿</div>
                <p className="text-[var(--ink-brown)]" style={{fontFamily: 'Georgia, serif'}}>
                  Hover over or click a body part to explore Ayurvedic wisdom for that area
                </p>
                <p className="text-xs text-[var(--faded-ink)] mt-2 italic">
                  Based on traditional Pariksha examination methods
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--gold-leaf)]"></div>
            <h3 className="mx-4 text-xl font-bold text-[var(--ink-black)] flex items-center" style={{fontFamily: 'Georgia, serif'}}>
              <span className="text-[var(--gold-leaf)] mr-2">❖</span>
              Ayurvedic Remedies
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--gold-leaf)]"></div>
          </div>
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
