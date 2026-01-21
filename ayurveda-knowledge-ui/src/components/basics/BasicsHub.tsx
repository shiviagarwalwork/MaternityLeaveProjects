'use client';

import { useState } from 'react';
import { BookOpen, User, Sparkles } from 'lucide-react';
import DoshaGuides from './DoshaGuides';
import ChakraExplorer from './ChakraExplorer';

type Section = 'doshas' | 'chakras';

export default function BasicsHub() {
  const [activeSection, setActiveSection] = useState<Section>('doshas');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent mb-4">
          Ayurveda Basics
        </h1>
        <p className="text-xl text-[var(--foreground)] max-w-2xl mx-auto">
          Ancient wisdom explained for modern life - No woo-woo, just practical knowledge
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 border-b-2 border-[var(--border-color)] overflow-x-auto">
        <button
          onClick={() => setActiveSection('doshas')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
            activeSection === 'doshas'
              ? 'text-[var(--accent-primary)] border-b-4 border-[var(--accent-primary)] -mb-0.5'
              : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
          }`}
        >
          <User className="w-5 h-5" />
          The Three Doshas
        </button>
        <button
          onClick={() => setActiveSection('chakras')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
            activeSection === 'chakras'
              ? 'text-[var(--accent-primary)] border-b-4 border-[var(--accent-primary)] -mb-0.5'
              : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          7 Chakras
        </button>
      </div>

      {/* Content Sections */}
      <div className="animate-fadeIn">
        {activeSection === 'doshas' && <DoshaGuides />}
        {activeSection === 'chakras' && <ChakraExplorer />}
      </div>
    </div>
  );
}
