'use client';

import { Recommendation } from '@/types';
import { Leaf, Utensils, Heart, BookOpen, ExternalLink } from 'lucide-react';
import OmSymbol from './OmSymbol';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getIcon = () => {
    switch (recommendation.type) {
      case 'herb':
        return <Leaf className="w-5 h-5" />;
      case 'diet':
        return <Utensils className="w-5 h-5" />;
      case 'lifestyle':
        return <Heart className="w-5 h-5" />;
      case 'treatment':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (recommendation.type) {
      case 'herb':
        return 'bg-[var(--emerald)] text-[var(--bright-gold)] border-[var(--gold)]';
      case 'diet':
        return 'bg-[var(--copper)] text-[#000000] border-[var(--gold)]';
      case 'lifestyle':
        return 'bg-[var(--royal-purple)] text-[var(--bright-gold)] border-[var(--gold)]';
      case 'treatment':
        return 'bg-[var(--deep-red)] text-[var(--bright-gold)] border-[var(--gold)]';
      default:
        return 'bg-[var(--rich-brown)] text-[var(--foreground)] border-[var(--copper)]';
    }
  };

  const getAgreementColor = () => {
    switch (recommendation.agreementLevel) {
      case 'high':
        return 'text-[#4ade80]';
      case 'medium':
        return 'text-[var(--bright-gold)]';
      case 'low':
        return 'text-[#fb923c]';
      default:
        return 'text-[var(--copper)]';
    }
  };

  return (
    <div className="parchment-card card-hover rounded-lg p-6 relative overflow-hidden">
      {/* Large decorative chakra in background */}
      <OmSymbol className="absolute top-2 right-2 text-[var(--gold)] opacity-10" size={60} />
      <div className="absolute -bottom-4 -left-4 text-[var(--copper)] opacity-5">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg border-3 shadow-lg ${getTypeColor()}`}>
            {getIcon()}
          </div>
          <div>
            <h4 className="font-bold text-[var(--gold)] text-xl mb-2" style={{fontFamily: 'Georgia, serif', textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'}}>
              {recommendation.title}
            </h4>
            <span className={`text-sm font-bold ${getTypeColor()} px-4 py-1.5 rounded-full border-2 shadow-md`} style={{fontFamily: 'Georgia, serif'}}>
              {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
            </span>
          </div>
        </div>
        <div className={`text-base font-bold ${getAgreementColor()} flex items-center gap-2`} style={{fontFamily: 'Georgia, serif', textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>
          <span className="text-xl">❖</span>
          {recommendation.agreementLevel === 'high' && 'High'}
          {recommendation.agreementLevel === 'medium' && 'Medium'}
          {recommendation.agreementLevel === 'low' && 'Low'}
        </div>
      </div>

      <p className="text-[var(--foreground)] text-base mb-5 leading-relaxed relative z-10" style={{fontFamily: 'Georgia, serif'}}>
        {recommendation.description}
      </p>

      {recommendation.sources && recommendation.sources.length > 0 && (
        <div className="border-t-2 border-[var(--gold)] pt-4 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <OmSymbol className="text-[var(--gold)] float" size={24} />
            <p className="text-sm font-bold text-[var(--gold)]" style={{fontFamily: 'Georgia, serif', textShadow: '0 0 5px rgba(255, 215, 0, 0.5)'}}>
              Sources ({recommendation.sources.length}):
            </p>
          </div>
          <div className="space-y-3">
            {recommendation.sources.map((source, idx) => (
              <div key={idx} className="text-sm bg-[var(--deep-brown)] rounded-lg p-3 border-2 border-[var(--copper)] hover:border-[var(--gold)] transition-all">
                <a
                  href={source.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold)] hover:text-[var(--bright-gold)] font-bold flex items-center transition-colors"
                  style={{fontFamily: 'Georgia, serif'}}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {source.manuscriptTitle}
                </a>
                <p className="text-[var(--foreground)] mt-2 ml-6 italic leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                  &quot;{source.excerpt}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
