'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { symptoms } from '@/data/symptoms';
import { aiService } from '@/services/aiService';
import { Recommendation } from '@/types';
import RecommendationCard from './RecommendationCard';

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredSymptoms = symptoms.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptomName: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomName)
        ? prev.filter(s => s !== symptomName)
        : [...prev, symptomName]
    );
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);
    try {
      const query = selectedSymptoms.join(', ');
      const recs = await aiService.getRecommendations(query);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setRecommendations([]);
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Symptom Checker</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--card-bg-light)] text-[var(--foreground)]"
          />
        </div>
      </div>

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[var(--foreground)]">Selected Symptoms:</h3>
            <button
              onClick={clearSelection}
              className="text-sm text-[var(--error)] hover:opacity-80"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSymptoms.map(symptom => (
              <span
                key={symptom}
                className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-3 py-1 rounded-full text-sm flex items-center font-medium"
              >
                {symptom}
                <button
                  onClick={() => toggleSymptom(symptom)}
                  className="ml-2 hover:opacity-80"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={analyzeSymptoms}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--foreground)] py-2 rounded-lg hover:from-[var(--olive)] hover:to-[var(--olive-dark)] disabled:bg-[var(--card-bg-light)]300"
          >
            {isAnalyzing ? 'Analyzing...' : 'Get Ayurvedic Recommendations'}
          </button>
        </div>
      )}

      {/* Symptom Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {filteredSymptoms.map(symptom => (
          <button
            key={symptom.id}
            onClick={() => toggleSymptom(symptom.name)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedSymptoms.includes(symptom.name)
                ? 'border-[var(--accent-primary)] bg-[var(--olive-light)] bg-opacity-20'
                : 'border-[var(--border-color)] bg-[var(--card-bg-light)] hover:border-[var(--accent-primary)]'
            }`}
          >
            <div className="font-medium text-[var(--foreground)]">{symptom.name}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{symptom.category}</div>
          </button>
        ))}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30 border-2 border-[var(--accent-primary)] rounded-lg">
        <p className="text-sm text-[var(--foreground)]">
          <strong className="text-[var(--accent-secondary)]">Disclaimer:</strong> This tool provides educational information based on Ayurvedic texts.
          It is not a substitute for professional medical advice. Please consult a qualified healthcare provider
          for diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}
