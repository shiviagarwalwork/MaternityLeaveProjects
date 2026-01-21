'use client';

import { Smartphone, Camera, Brain, Sparkles, Heart, Leaf, Eye, Hand, MessageSquare, ChevronRight } from 'lucide-react';
import ChakraIcon from './ChakraIcon';

export default function AppShowcase() {
  const features = [
    {
      icon: Brain,
      title: 'Dosha Assessment',
      description: 'Discover your unique Prakriti through our comprehensive quiz'
    },
    {
      icon: Camera,
      title: 'AI Diagnostics',
      description: 'Tongue, eye, skin & nail analysis powered by AI'
    },
    {
      icon: Sparkles,
      title: 'Ojas Tracking',
      description: 'Monitor your vital energy and daily glow'
    },
    {
      icon: MessageSquare,
      title: 'AI Consultation',
      description: 'Chat with our Ayurvedic AI assistant'
    }
  ];

  const diagnostics = [
    { name: 'Jihva Pariksha', english: 'Tongue', icon: '👅', color: '#E91E63' },
    { name: 'Netra Pariksha', english: 'Eyes', icon: '👁️', color: '#1976D2' },
    { name: 'Twak Pariksha', english: 'Skin', icon: '✨', color: '#FF9800' },
    { name: 'Nakha Pariksha', english: 'Nails', icon: '💅', color: '#795548' },
    { name: 'Nadi Pariksha', english: 'Pulse', icon: '❤️', color: '#D32F2F' },
    { name: 'Prakriti Quiz', english: 'Constitution', icon: '🧘', color: '#6B8E23' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="parchment-card rounded-2xl p-8 relative overflow-hidden">
        <ChakraIcon className="absolute -top-10 -right-10 text-[var(--accent-primary)] opacity-10" size={200} />

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left - Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Smartphone className="w-4 h-4" />
              <span>Mobile App</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--accent-secondary)] mb-4" style={{fontFamily: 'Georgia, serif'}}>
              AyuVed
            </h1>
            <p className="text-xl text-[var(--foreground)] mb-2 font-medium">
              Ancient Wisdom, Modern Wellness
            </p>
            <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
              Experience the timeless science of Ayurveda through AI-powered diagnostics.
              Understand your unique constitution, track your vitality, and receive
              personalized wellness recommendations rooted in 5,000 years of wisdom.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="#" className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            <p className="text-sm text-[var(--accent-primary)] font-medium">
              Coming Soon to App Stores
            </p>
          </div>

          {/* Right - Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-64 h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-[#F5E6D3] to-[#E8D4B8] rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl"></div>

                  {/* App Preview Content */}
                  <div className="pt-10 px-4 h-full">
                    {/* App Header */}
                    <div className="text-center mb-4">
                      <p className="text-[var(--accent-secondary)] font-bold text-lg">Namaste, Seeker</p>
                      <p className="text-[var(--text-muted)] text-xs">Your Ayurvedic Journey Awaits</p>
                    </div>

                    {/* Dosha Card */}
                    <div className="bg-white/80 rounded-xl p-4 mb-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl">🔥</span>
                          </div>
                          <div>
                            <p className="font-bold text-[var(--accent-secondary)]">Pitta</p>
                            <p className="text-xs text-[var(--text-muted)]">Dominant Dosha</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-[var(--accent-primary)]">45%</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white/60 rounded-lg p-2 text-center">
                        <span className="text-2xl">👅</span>
                        <p className="text-[8px] text-[var(--text-muted)] mt-1">Tongue</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2 text-center">
                        <span className="text-2xl">👁️</span>
                        <p className="text-[8px] text-[var(--text-muted)] mt-1">Eyes</p>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2 text-center">
                        <span className="text-2xl">✨</span>
                        <p className="text-[8px] text-[var(--text-muted)] mt-1">Ojas</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-[var(--accent-primary)]/20 rounded-xl p-3">
                      <p className="text-xs font-medium text-[var(--accent-secondary)] mb-2">Your Progress</p>
                      <div className="flex justify-between text-center">
                        <div>
                          <p className="text-lg font-bold text-[var(--accent-primary)]">6/6</p>
                          <p className="text-[8px] text-[var(--text-muted)]">Analyses</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-[var(--accent-primary)]">85</p>
                          <p className="text-[8px] text-[var(--text-muted)]">Ojas Score</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-[var(--accent-primary)]">7</p>
                          <p className="text-[8px] text-[var(--text-muted)]">Day Streak</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-[4rem] opacity-20 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="parchment-card rounded-xl p-5 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[var(--accent-primary)]/20 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
              </div>
              <h3 className="font-bold text-[var(--accent-secondary)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* AI Diagnostics Section */}
      <div className="parchment-card rounded-2xl p-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] px-4 py-1 rounded-full text-sm font-medium mb-3">
            AI-Powered Analysis
          </span>
          <h2 className="text-3xl font-bold text-[var(--accent-secondary)] mb-2" style={{fontFamily: 'Georgia, serif'}}>
            Six Pillars of Ayurvedic Diagnosis
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            Traditional Pariksha techniques enhanced with artificial intelligence for accurate, personalized insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnostics.map((diag, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-[var(--card-bg-light)] rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${diag.color}20` }}
              >
                {diag.icon}
              </div>
              <div>
                <p className="font-bold text-[var(--foreground)]">{diag.name}</p>
                <p className="text-sm text-[var(--text-muted)]">{diag.english} Analysis</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] p-8 text-white">
        <ChakraIcon className="absolute -top-10 -right-10 text-white opacity-10" size={200} />

        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Georgia, serif'}}>
            Begin Your Ayurvedic Journey
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Download AyuVed today and discover the ancient wisdom that can transform your modern life.
            Your personalized path to balance awaits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="inline-flex items-center gap-2 bg-white text-[var(--accent-primary)] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors">
              <Smartphone className="w-5 h-5" />
              Download App
              <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors border border-white/30">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
