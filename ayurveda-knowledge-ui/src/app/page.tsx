'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import SymptomChecker from '@/components/SymptomChecker';
import BodyDiagram from '@/components/BodyDiagram';
import DoshaAssessment from '@/components/DoshaAssessment';
import KnowledgeBrowser from '@/components/KnowledgeBrowser';
import BookmarksList from '@/components/BookmarksList';
import Homepage from '@/components/Homepage';
import PersonalizedPlan from '@/components/PersonalizedPlan';
import QuickStart from '@/components/QuickStart';
import AboutPage from '@/components/AboutPage';
import AppShowcase from '@/components/AppShowcase';
import ChakraIcon from '@/components/ChakraIcon';
import OmSymbol from '@/components/OmSymbol';
import {
  MessageSquare,
  Stethoscope,
  User,
  BookOpen,
  Bookmark,
  Menu,
  X,
  AlertCircle,
  Home as HomeIcon,
  Newspaper,
  CalendarCheck,
  Zap,
  Info,
  Smartphone
} from 'lucide-react';

type Tab = 'app' | 'home' | 'quick' | 'chat' | 'symptoms' | 'body' | 'dosha' | 'plan' | 'browser' | 'bookmarks' | 'about';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('app');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const tabs = [
    { id: 'app' as Tab, label: 'AyuVed App', icon: Smartphone, description: 'Download our mobile app' },
    { id: 'home' as Tab, label: 'Blog', icon: Newspaper, description: 'Ancient wisdom, modern life' },
    { id: 'about' as Tab, label: 'About', icon: Info, description: 'Our mission & vision' },
    { id: 'quick' as Tab, label: 'Quick Fix', icon: Zap, description: 'Instant solutions (1-2 min)' },
    { id: 'plan' as Tab, label: 'My Daily Plan', icon: CalendarCheck, description: 'Personalized schedule' },
    { id: 'chat' as Tab, label: 'AI Advisor', icon: MessageSquare, description: 'Get personalized help' },
    { id: 'dosha' as Tab, label: 'Dosha Quiz', icon: User, description: 'Know your type' },
    { id: 'symptoms' as Tab, label: 'Symptoms', icon: Stethoscope, description: 'Check what\'s up' },
    { id: 'body' as Tab, label: 'Body Map', icon: User, description: 'Interactive guide' },
    { id: 'browser' as Tab, label: 'Texts', icon: BookOpen, description: 'Sacred manuscripts' },
    { id: 'bookmarks' as Tab, label: 'Saved', icon: Bookmark, description: 'Your favorites' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Disclaimer Banner */}
      {showDisclaimer && (
        <div className="bg-[var(--card-bg-light)] border-b-2 border-[var(--accent-primary)] px-4 py-3 relative z-10">
          <div className="max-w-7xl mx-auto flex items-start justify-between">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-[var(--accent-primary)] mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-[var(--foreground)]">
                <strong className="text-[var(--accent-secondary)]">Medical Disclaimer:</strong> This application provides educational information based on
                traditional Ayurvedic texts. It is not intended to diagnose, treat, cure, or prevent any disease.
                Always consult with a qualified healthcare professional before making health decisions.
              </div>
            </div>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="ml-4 text-[var(--accent-primary)] hover:opacity-80 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative bg-gradient-to-r from-[var(--background)] via-[var(--card-bg)] to-[var(--background)] shadow-2xl overflow-hidden border-b-2 border-[var(--accent-primary)]">
        {/* Decorative top glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent"></div>

        {/* Background chakra decorations */}
        <ChakraIcon
          className="absolute -top-10 -left-10 text-[var(--accent-primary)] opacity-10"
          size={200}
        />
        <ChakraIcon
          className="absolute -top-10 -right-10 text-[var(--purple)] opacity-10"
          size={200}
        />

        <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <OmSymbol className="text-[var(--accent-primary)]" size={60} />
              </div>

              <div>
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent mb-2">
                  Ayurveda for Real Life ✨
                </h1>
                <p className="text-[var(--foreground)] text-sm md:text-lg font-medium">
                  5,000-year-old wisdom that actually makes sense
                </p>
                <p className="text-[var(--text-muted)] text-xs md:text-sm mt-1">
                  No gatekeeping, no judgment - just practical wellness for modern humans
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[var(--accent-primary)] p-2 rounded-lg border-2 border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--background)] transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside
            className={`md:w-64 ${
              mobileMenuOpen ? 'block' : 'hidden md:block'
            }`}
          >
            <nav className="parchment-card rounded-xl p-5 sticky top-6 relative overflow-hidden">
              <ChakraIcon className="absolute -top-4 -right-4 text-[var(--accent-primary)] opacity-8" size={140} />

              <ul className="space-y-2 relative z-10">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex flex-col items-start px-4 py-3 rounded-lg transition-all font-medium ${
                          activeTab === tab.id
                            ? 'ancient-button shadow-lg scale-105'
                            : 'text-[var(--foreground)] bg-[var(--card-bg-light)] hover:bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                        }`}
                      >
                        <div className="flex items-center w-full">
                          <Icon className="w-5 h-5 mr-3" />
                          <span>{tab.label}</span>
                        </div>
                        <span className={`text-xs mt-1 ml-8 ${activeTab === tab.id ? 'text-[var(--background)] opacity-90' : 'text-[var(--text-muted)]'}`}>
                          {tab.description}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t border-[var(--border-color)] relative z-10">
                <h3 className="text-sm font-bold text-[var(--accent-primary)] mb-3 flex items-center gap-2">
                  <OmSymbol className="text-[var(--accent-primary)]" size={20} />
                  Features
                </h3>
                <ul className="text-xs text-[var(--text-muted)] space-y-1.5">
                  <li>• Multi-source manuscripts</li>
                  <li>• AI-powered responses</li>
                  <li>• Source citations</li>
                  <li>• Sanskrit & English</li>
                  <li>• Dosha analysis</li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="transition-all duration-300">
              {activeTab === 'app' && <AppShowcase />}
              {activeTab === 'home' && <Homepage />}
              {activeTab === 'about' && <AboutPage />}
              {activeTab === 'quick' && <QuickStart />}
              {activeTab === 'plan' && <PersonalizedPlan />}
              {activeTab === 'chat' && <ChatInterface />}
              {activeTab === 'symptoms' && <SymptomChecker />}
              {activeTab === 'body' && <BodyDiagram />}
              {activeTab === 'dosha' && <DoshaAssessment />}
              {activeTab === 'browser' && <KnowledgeBrowser />}
              {activeTab === 'bookmarks' && <BookmarksList />}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[var(--background)] via-[var(--deep-brown)] to-[var(--background)] text-[var(--foreground)] mt-12 relative overflow-hidden border-t-4 border-[var(--gold)]">
        {/* Decorative top border with animation */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-pulse-subtle"></div>

        {/* Large background chakra decorations */}
        <ChakraIcon className="absolute -bottom-20 -left-20 text-[var(--gold)] opacity-10 chakra-glow" size={240} />
        <ChakraIcon className="absolute -bottom-20 -right-20 text-[var(--gold)] opacity-10 chakra-glow" size={240} />
        <ChakraIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[var(--copper)] opacity-8" size={200} />

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <OmSymbol className="text-[var(--gold)] float" size={35} />
                <h3 className="text-[var(--gold)] font-bold text-2xl" style={{fontFamily: 'Georgia, serif', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'}}>About</h3>
              </div>
              <p className="text-base leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                This application aggregates knowledge from classical Ayurvedic manuscripts
                translated from Sanskrit to English, making ancient wisdom accessible.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ChakraIcon className="text-[var(--gold)]" size={35} />
                <h3 className="text-[var(--gold)] font-bold text-2xl" style={{fontFamily: 'Georgia, serif', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'}}>Sources</h3>
              </div>
              <ul className="text-base space-y-3" style={{fontFamily: 'Georgia, serif'}}>
                <li className="flex items-center"><span className="text-[var(--gold)] mr-3 text-lg">❖</span> Charaka Samhita</li>
                <li className="flex items-center"><span className="text-[var(--gold)] mr-3 text-lg">❖</span> Sushruta Samhita</li>
                <li className="flex items-center"><span className="text-[var(--gold)] mr-3 text-lg">❖</span> Ashtanga Hridayam</li>
                <li className="flex items-center"><span className="text-[var(--gold)] mr-3 text-lg">❖</span> Bhavaprakasha</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <OmSymbol className="text-[var(--gold)] float" size={35} />
                <h3 className="text-[var(--gold)] font-bold text-2xl" style={{fontFamily: 'Georgia, serif', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'}}>Disclaimer</h3>
              </div>
              <p className="text-base leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                For educational purposes only. Not a substitute for professional medical advice.
                Consult qualified healthcare providers for health concerns.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-[var(--gold)] text-center">
            <div className="flex items-center justify-center gap-6 mb-4">
              <ChakraIcon className="text-[var(--gold)] chakra-glow" size={50} />
              <OmSymbol className="text-[var(--bright-gold)] float" size={60} />
              <ChakraIcon className="text-[var(--gold)] chakra-glow" size={50} />
            </div>
            <p className="text-base text-[var(--gold)] font-semibold" style={{fontFamily: 'Georgia, serif', letterSpacing: '1px', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'}}>
              &copy; 2024 Ayurveda Knowledge Portal. Built with ancient wisdom and modern technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
