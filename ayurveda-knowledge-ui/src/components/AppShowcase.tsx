'use client';

import { Smartphone, Camera, Brain, Sparkles, Heart, Leaf, Eye, Hand, MessageSquare, ChevronRight, BookOpen, Scroll, Zap, Shield, Moon, Sun, ClipboardList } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AppShowcaseProps {
  onNavigate?: (tab: string) => void;
}

export default function AppShowcase({ onNavigate }: AppShowcaseProps) {
  const features = [
    {
      icon: Scroll,
      title: 'Manuscript-Powered AI',
      description: 'Not generic wellness advice - our AI is trained on authentic Charaka Samhita translations'
    },
    {
      icon: Camera,
      title: 'AI Diagnostics',
      description: 'Tongue, eye, skin & nail analysis using ancient Pariksha methods'
    },
    {
      icon: Sparkles,
      title: 'Ojas Tracking',
      description: 'Monitor your vital energy - the ancient measure of true wellness'
    },
    {
      icon: MessageSquare,
      title: 'Personalized Guidance',
      description: 'Recommendations rooted in 5,000 years of documented healing'
    }
  ];

  const diagnostics: { name: string; english: string; icon: LucideIcon; color: string }[] = [
    { name: 'Jihva Pariksha', english: 'Tongue', icon: MessageSquare, color: '#9EBF88' },
    { name: 'Netra Pariksha', english: 'Eyes', icon: Eye, color: '#64B5F6' },
    { name: 'Twak Pariksha', english: 'Skin', icon: Sparkles, color: '#FFB74D' },
    { name: 'Nakha Pariksha', english: 'Nails', icon: Hand, color: '#BA68C8' },
    { name: 'Nadi Pariksha', english: 'Pulse', icon: Heart, color: '#FF6B6B' },
    { name: 'Prakriti Quiz', english: 'Constitution', icon: ClipboardList, color: '#7E57C2' }
  ];

  const modernIssues = [
    { issue: 'Neck & back pain from screens', remedy: 'Vata-balancing oils + posture wisdom', symbol: '॥' },
    { issue: 'Digital eye strain', remedy: 'Netra Basti + screen hygiene', symbol: '❖' },
    { issue: 'Anxiety from information overload', remedy: 'Sensory detox protocols', symbol: '✦' },
    { issue: 'Poor sleep from blue light', remedy: 'Circadian rhythm restoration', symbol: '☽' },
    { issue: 'Burnout & exhaustion', remedy: 'Ojas-building practices', symbol: '✿' },
    { issue: 'Digestive issues from stress', remedy: 'Agni restoration techniques', symbol: '❧' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section with Manuscript Style */}
      <div className="relative bg-gradient-to-br from-white via-[var(--parchment-light)] to-[var(--parchment)] rounded-2xl p-8 border-2 border-[var(--palm-leaf)] overflow-hidden">
        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-2xl">❧</div>
        <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-x-[-1]">❧</div>
        <div className="absolute bottom-4 left-4 text-[var(--gold-leaf)] text-2xl transform scale-y-[-1]">❧</div>
        <div className="absolute bottom-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-[-1]">❧</div>

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left - Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Scroll className="w-4 h-4" />
              <span>Powered by Ancient Manuscripts</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink-black)] mb-2" style={{fontFamily: 'Georgia, serif'}}>
              NayaVed AI
            </h1>
            <p className="text-xl text-[var(--copper-brown)] mb-4 font-medium" style={{fontFamily: 'Georgia, serif'}}>
              Where Charaka Samhita Meets AI
            </p>

            {/* The Story */}
            <div className="bg-white/60 rounded-xl p-4 mb-6 border-l-4 border-[var(--gold-leaf)]">
              <p className="text-[var(--ink-brown)] leading-relaxed italic" style={{fontFamily: 'Georgia, serif'}}>
                "After years of neck pain from endless Zoom calls, I discovered that ancient physicians had documented
                this exact condition 5,000 years ago - they called it <span className="text-[var(--copper-brown)] font-semibold">Grivagraha</span>
                (stiff neck from improper posture). The treatment? Not painkillers, but specific oils and lifestyle changes
                that actually worked. This app brings that ancient wisdom to your pocket."
              </p>
            </div>

            <p className="text-[var(--ink-brown)] mb-6 leading-relaxed">
              Unlike generic wellness apps, NayaVed AI is built on <strong>authenticated translations of the Charaka Samhita</strong> -
              a 5,000+ year old medical text that documented everything from digital-age problems (yes, they existed!)
              to personalized treatment protocols. Our AI doesn't guess - it references actual sutras.
            </p>

            {/* App Store Buttons - Coming Soon */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3 bg-[var(--ink-black)]/70 text-white px-5 py-3 rounded-xl cursor-not-allowed opacity-80">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Coming Soon to</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[var(--ink-black)]/70 text-white px-5 py-3 rounded-xl cursor-not-allowed opacity-80">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Coming Soon to</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-[var(--copper-brown)] font-medium flex items-center">
              <span className="text-[var(--gold-leaf)] mr-2">✦</span>
              Mobile app launching soon!
            </p>
          </div>

          {/* Right - Phone Mockup (Matching actual app design) */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-72 h-[540px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-[#D4C5A9] rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-10"></div>

                  {/* App Preview Content - Matching actual HomeScreen */}
                  <div className="pt-10 px-4 h-full overflow-hidden">
                    {/* App Header - Welcome */}
                    <div className="text-center mb-4 pb-3 border-b border-[var(--gold-leaf)]">
                      <p className="text-[var(--ink-black)] font-bold text-lg" style={{fontFamily: 'Georgia, serif'}}>Good Morning, Seeker</p>
                      <p className="text-[var(--faded-ink)] text-xs">Your Ayurvedic Journey Awaits</p>
                    </div>

                    {/* Health Summary Card */}
                    <div className="bg-[#F5EFE0] rounded-xl p-3 mb-3 border-2 border-[var(--gold-leaf)]">
                      <div className="flex justify-around text-center">
                        <div>
                          <div className="text-lg text-[#E74C3C] font-bold">पि</div>
                          <p className="text-[8px] text-[var(--faded-ink)]">Dosha</p>
                          <p className="text-xs font-bold text-[var(--ink-black)]">Pitta</p>
                        </div>
                        <div>
                          <div className="text-lg text-[var(--copper-brown)]">✓</div>
                          <p className="text-[8px] text-[var(--faded-ink)]">Analyses</p>
                          <p className="text-xs font-bold text-[var(--ink-black)]">4/6</p>
                        </div>
                        <div>
                          <div className="text-lg text-[var(--gold-leaf)]">✦</div>
                          <p className="text-[8px] text-[var(--faded-ink)]">Ojas</p>
                          <p className="text-xs font-bold text-[var(--ink-black)]">78</p>
                        </div>
                      </div>
                    </div>

                    {/* Diagnostic Card Preview */}
                    <div className="bg-[#7E57C2] rounded-xl p-3 mb-3 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">प्र</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-sm">Dosha Assessment</p>
                          <p className="text-white/80 text-[10px]">Discover your Ayurvedic constitution</p>
                        </div>
                      </div>
                      <div className="mt-2 bg-[#F5EFE0] rounded-lg py-2 px-3 inline-block">
                        <span className="text-[#512DA8] text-xs font-bold">Take Quiz →</span>
                      </div>
                    </div>

                    {/* Ojas Tracker Preview */}
                    <div className="bg-[#F4C430] rounded-xl p-3 mb-3 border-2 border-[#E5B80B]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl text-[var(--copper-brown)]">✦</span>
                        <p className="text-[var(--ink-black)] font-bold text-sm">Track Your Ojas Glow</p>
                      </div>
                      <p className="text-[var(--ink-brown)] text-[10px] mb-2">Start tracking your daily vitality habits</p>
                      <div className="bg-[#F5EFE0] rounded-lg py-1.5 px-3 inline-block">
                        <span className="text-[var(--copper-brown)] text-xs font-bold">Start Tracking →</span>
                      </div>
                    </div>

                    {/* Quick Fixes Grid */}
                    <p className="text-[var(--ink-black)] font-bold text-sm mb-2">Quick Fixes</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#F5EFE0] rounded-lg p-2 border border-[var(--copper-brown)]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[var(--copper-brown)]">॥</span>
                          <span className="text-[9px] text-[var(--ink-black)]">Screen time</span>
                        </div>
                      </div>
                      <div className="bg-[#F5EFE0] rounded-lg p-2 border border-[var(--copper-brown)]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[var(--copper-brown)]">❖</span>
                          <span className="text-[9px] text-[var(--ink-black)]">Stressed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--gold-leaf)] to-[var(--copper-brown)] rounded-[4rem] opacity-20 blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Diagnostic Technology Section */}
      <div className="relative bg-gradient-to-br from-[var(--parchment-light)] via-white to-[var(--parchment)] rounded-2xl p-8 border-2 border-[var(--copper-brown)] overflow-hidden">
        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 text-[var(--copper-brown)] text-2xl">✦</div>
        <div className="absolute top-4 right-4 text-[var(--copper-brown)] text-2xl">✦</div>
        <div className="absolute bottom-4 left-4 text-[var(--copper-brown)] text-2xl">✦</div>
        <div className="absolute bottom-4 right-4 text-[var(--copper-brown)] text-2xl">✦</div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Camera className="w-4 h-4" />
              AI-POWERED PARIKSHA
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--ink-black)] mb-3" style={{fontFamily: 'Georgia, serif'}}>
              Ancient Diagnostics, Modern AI
            </h2>
            <p className="text-[var(--ink-brown)] max-w-2xl mx-auto">
              Our app uses <strong className="text-[var(--copper-brown)]">Computer Vision AI</strong> to analyze photos of your tongue, eyes, skin, and nails -
              replicating the traditional Pariksha (examination) methods used by Ayurvedic physicians for 5,000 years.
            </p>
          </div>

          {/* How It Works - Step by Step */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 text-center border-2 border-[var(--gold-leaf)] shadow-md">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-[var(--gold-leaf)] to-[var(--copper-brown)] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                1
              </div>
              <h4 className="text-[var(--ink-black)] font-bold mb-2">Capture</h4>
              <p className="text-[var(--ink-brown)] text-sm">Take a photo of your tongue, eyes, skin, or nails using your phone camera</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border-2 border-[var(--gold-leaf)] shadow-md">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-[var(--gold-leaf)] to-[var(--copper-brown)] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                2
              </div>
              <h4 className="text-[var(--ink-black)] font-bold mb-2">AI Analysis</h4>
              <p className="text-[var(--ink-brown)] text-sm">Claude AI analyzes the image using traditional Pariksha parameters</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border-2 border-[var(--gold-leaf)] shadow-md">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-[var(--gold-leaf)] to-[var(--copper-brown)] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <h4 className="text-[var(--ink-black)] font-bold mb-2">Dosha Detection</h4>
              <p className="text-[var(--ink-brown)] text-sm">Identifies dosha imbalances (Vata, Pitta, Kapha) from visual markers</p>
            </div>
            <div className="bg-white rounded-xl p-5 text-center border-2 border-[var(--gold-leaf)] shadow-md">
              <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-[var(--gold-leaf)] to-[var(--copper-brown)] rounded-full flex items-center justify-center text-2xl font-bold text-white">
                4
              </div>
              <h4 className="text-[var(--ink-black)] font-bold mb-2">Personalized Plan</h4>
              <p className="text-[var(--ink-brown)] text-sm">Receive manuscript-backed remedies, diet, and lifestyle recommendations</p>
            </div>
          </div>

          {/* The 5 Pariksha Methods */}
          <div className="bg-white rounded-xl p-6 border-2 border-[var(--palm-leaf)]">
            <h3 className="text-xl font-bold text-[var(--ink-black)] mb-6 text-center" style={{fontFamily: 'Georgia, serif'}}>
              Five Traditional Examination Methods (Pancha Pariksha)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-[var(--parchment-light)] rounded-xl border border-[#9EBF88]">
                <div className="w-14 h-14 mx-auto mb-3 bg-[#9EBF88] rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <p className="text-[var(--ink-black)] font-bold text-sm">Jihva Pariksha</p>
                <p className="text-[var(--faded-ink)] text-xs">Tongue Analysis</p>
                <p className="text-[#6B8E23] text-xs mt-1 font-medium">Coating, color, shape</p>
              </div>
              <div className="text-center p-3 bg-[var(--parchment-light)] rounded-xl border border-[#64B5F6]">
                <div className="w-14 h-14 mx-auto mb-3 bg-[#64B5F6] rounded-xl flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <p className="text-[var(--ink-black)] font-bold text-sm">Netra Pariksha</p>
                <p className="text-[var(--faded-ink)] text-xs">Eye Analysis</p>
                <p className="text-[#1976D2] text-xs mt-1 font-medium">Sclera, iris patterns</p>
              </div>
              <div className="text-center p-3 bg-[var(--parchment-light)] rounded-xl border border-[#FFB74D]">
                <div className="w-14 h-14 mx-auto mb-3 bg-[#FFB74D] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <p className="text-[var(--ink-black)] font-bold text-sm">Twak Pariksha</p>
                <p className="text-[var(--faded-ink)] text-xs">Skin/Face Analysis</p>
                <p className="text-[#E65100] text-xs mt-1 font-medium">Texture, color, marks</p>
              </div>
              <div className="text-center p-3 bg-[var(--parchment-light)] rounded-xl border border-[#BA68C8]">
                <div className="w-14 h-14 mx-auto mb-3 bg-[#BA68C8] rounded-xl flex items-center justify-center">
                  <Hand className="w-7 h-7 text-white" />
                </div>
                <p className="text-[var(--ink-black)] font-bold text-sm">Nakha Pariksha</p>
                <p className="text-[var(--faded-ink)] text-xs">Nail Analysis</p>
                <p className="text-[#7B1FA2] text-xs mt-1 font-medium">Shape, color, ridges</p>
              </div>
              <div className="text-center p-3 bg-[var(--parchment-light)] rounded-xl border border-[#FF6B6B] col-span-2 md:col-span-1">
                <div className="w-14 h-14 mx-auto mb-3 bg-[#FF6B6B] rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <p className="text-[var(--ink-black)] font-bold text-sm">Nadi Pariksha</p>
                <p className="text-[var(--faded-ink)] text-xs">Pulse Reading</p>
                <p className="text-[#C62828] text-xs mt-1 font-medium">Coming with wearables</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="relative bg-gradient-to-br from-white to-[var(--parchment-light)] rounded-2xl p-8 border-2 border-[var(--palm-leaf)]">
        <div className="absolute top-4 left-4 text-[var(--gold-leaf)]">❖</div>
        <div className="absolute top-4 right-4 text-[var(--gold-leaf)]">❖</div>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ink-black)] mb-2" style={{fontFamily: 'Georgia, serif'}}>
            Why This Isn't Just Another Wellness App
          </h2>
          <p className="text-[var(--ink-brown)] max-w-2xl mx-auto">
            Most wellness apps give generic advice. We combine <strong>Computer Vision AI</strong> with <strong>documented ancient wisdom</strong> that has been
            tested for millennia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl border border-[var(--palm-leaf)]">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--parchment)] rounded-full flex items-center justify-center border-2 border-[var(--gold-leaf)]">
              <Camera className="w-8 h-8 text-[var(--copper-brown)]" />
            </div>
            <h3 className="font-bold text-[var(--ink-black)] mb-2">Visual AI Diagnosis</h3>
            <p className="text-sm text-[var(--ink-brown)]">
              Upload a photo and get AI-powered analysis using traditional Pariksha examination methods
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-[var(--palm-leaf)]">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--parchment)] rounded-full flex items-center justify-center border-2 border-[var(--gold-leaf)]">
              <Scroll className="w-8 h-8 text-[var(--copper-brown)]" />
            </div>
            <h3 className="font-bold text-[var(--ink-black)] mb-2">Manuscript-Backed</h3>
            <p className="text-sm text-[var(--ink-brown)]">
              Every recommendation traces back to actual Charaka Samhita sutras with verse citations
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-[var(--palm-leaf)]">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--parchment)] rounded-full flex items-center justify-center border-2 border-[var(--gold-leaf)]">
              <Brain className="w-8 h-8 text-[var(--copper-brown)]" />
            </div>
            <h3 className="font-bold text-[var(--ink-black)] mb-2">Claude AI Powered</h3>
            <p className="text-sm text-[var(--ink-brown)]">
              Advanced AI trained on authenticated Ayurvedic texts for accurate, personalized guidance
            </p>
          </div>
        </div>
      </div>

      {/* Modern Problems, Ancient Solutions */}
      <div className="relative bg-gradient-to-br from-[var(--parchment)] to-[var(--parchment-dark)] rounded-2xl p-8 border-2 border-[var(--copper-brown)]">
        <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-xl">✿</div>
        <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-xl">✿</div>

        <div className="text-center mb-8">
          <span className="inline-block bg-[var(--vermillion)] text-white px-4 py-1 rounded-full text-sm font-medium mb-3">
            Sound Familiar?
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ink-black)] mb-2" style={{fontFamily: 'Georgia, serif'}}>
            Modern Problems, Ancient Solutions
          </h2>
          <p className="text-[var(--ink-brown)] max-w-2xl mx-auto">
            The Charaka Samhita documented these exact conditions thousands of years ago.
            The causes may be different (palm leaves vs. iPhones), but the body's response is the same.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modernIssues.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.symbol}</span>
                <div>
                  <p className="font-bold text-[var(--ink-black)] text-sm mb-1">{item.issue}</p>
                  <p className="text-xs text-[var(--copper-brown)]">
                    <span className="text-[var(--gold-leaf)]">→</span> {item.remedy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="relative bg-white rounded-xl p-5 border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] hover:shadow-lg transition-all">
              <div className="absolute top-2 right-2 text-[var(--gold-leaf)] opacity-30 text-sm">❖</div>
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--parchment)] to-[var(--parchment-dark)] rounded-xl flex items-center justify-center mb-4 border border-[var(--gold-leaf)]">
                <Icon className="w-6 h-6 text-[var(--copper-brown)]" />
              </div>
              <h3 className="font-bold text-[var(--ink-black)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--ink-brown)]">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* AI Diagnostics Section */}
      <div className="relative bg-white rounded-2xl p-8 border-2 border-[var(--palm-leaf)]">
        <div className="absolute top-4 left-4 text-[var(--gold-leaf)]">❧</div>
        <div className="absolute top-4 right-4 text-[var(--gold-leaf)] transform scale-x-[-1]">❧</div>

        <div className="text-center mb-8">
          <span className="inline-block bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-4 py-1 rounded-full text-sm font-medium mb-3">
            AI-Powered Pariksha
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ink-black)] mb-2" style={{fontFamily: 'Georgia, serif'}}>
            Six Pillars of Ayurvedic Diagnosis
          </h2>
          <p className="text-[var(--ink-brown)] max-w-2xl mx-auto">
            Traditional examination techniques (Pariksha) enhanced with computer vision AI
            for personalized insights rooted in manuscript wisdom
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnostics.map((diag, index) => {
            const Icon = diag.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-[var(--parchment-light)] rounded-xl border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-colors"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${diag.color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: diag.color }} />
                </div>
                <div>
                  <p className="font-bold text-[var(--ink-black)]">{diag.name}</p>
                  <p className="text-sm text-[var(--faded-ink)]">{diag.english} Analysis</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F4C430] via-[#E5A825] to-[#D4941C] p-8 shadow-xl">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)'}}></div>
        </div>
        <div className="absolute top-4 left-4 text-[var(--copper-brown)] text-2xl">❧</div>
        <div className="absolute top-4 right-4 text-[var(--copper-brown)] text-2xl transform scale-x-[-1]">❧</div>
        <div className="absolute bottom-4 left-4 text-[var(--copper-brown)] text-2xl transform scale-y-[-1]">❧</div>
        <div className="absolute bottom-4 right-4 text-[var(--copper-brown)] text-2xl transform scale-[-1]">❧</div>

        <div className="relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#4A2C0A] drop-shadow-sm" style={{fontFamily: 'Georgia, serif'}}>
            Begin Your Ayurvedic Journey
          </h2>
          <p className="text-[#5D3A0A] mb-6 max-w-xl mx-auto leading-relaxed font-medium">
            Download NayaVed AI and discover what the ancient physicians knew about your modern problems.
            Your personalized path to balance awaits - backed by 5,000 years of documented wisdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2 bg-white text-[#8B4513] px-6 py-3 rounded-xl font-bold cursor-not-allowed shadow-lg">
              <Smartphone className="w-5 h-5" />
              Download App
              <span className="text-xs opacity-70">(Coming Soon)</span>
            </span>
            <button
              onClick={() => onNavigate?.('browser')}
              className="inline-flex items-center gap-2 bg-[#8B4513] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6B3410] transition-colors shadow-lg cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              Read the Manuscripts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
