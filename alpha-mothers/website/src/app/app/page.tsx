import Link from 'next/link';
import {
  Heart, BarChart3, PenLine, Headphones, LifeBuoy,
  Calendar, Dumbbell, MessageSquare, Star, Users,
  Bot, Smartphone, Target, FileText, Rocket,
  Lightbulb, Sparkles, Handshake
} from 'lucide-react';

const features = [
  {
    category: 'Mental Health',
    color: 'primary',
    items: [
      {
        title: 'Daily Check-in',
        description: 'A 30-second mood and energy assessment that takes the pulse of your mental state without overwhelming you.',
        icon: Heart,
      },
      {
        title: 'Pattern Recognition',
        description: 'AI notices trends in your data—like Sunday evening anxiety or Tuesday energy dips—before they become crises.',
        icon: BarChart3,
      },
      {
        title: 'Journaling',
        description: 'Voice-to-text for those 3am racing thoughts. Get it out of your head and into a safe space.',
        icon: PenLine,
      },
      {
        title: 'Guided Sessions',
        description: 'Short audio sessions for anxiety, sleep, and overwhelm—designed for mothers with no time.',
        icon: Headphones,
      },
      {
        title: 'Crisis Support',
        description: 'When things get serious, we connect you with human support immediately. Safety is never compromised.',
        icon: LifeBuoy,
      },
    ],
  },
  {
    category: 'Return to Work',
    color: 'secondary',
    items: [
      {
        title: 'Transition Timeline',
        description: 'Week-by-week preparation starting 4 weeks before your return, so you\'re not blindsided.',
        icon: Calendar,
      },
      {
        title: 'Confidence Rebuilding',
        description: 'Exercises to address "mom brain" concerns and rebuild your professional identity.',
        icon: Dumbbell,
      },
      {
        title: 'Flexibility Scripts',
        description: 'Personalized scripts for negotiating hybrid work, adjusted schedules, or other accommodations.',
        icon: MessageSquare,
      },
      {
        title: 'Identity Integration',
        description: 'Tools to help you embrace being both a great mother AND a high-performing professional.',
        icon: Star,
      },
      {
        title: 'Peer Stories',
        description: 'Real stories from mothers who\'ve navigated the transition successfully. You\'re not alone.',
        icon: Users,
      },
    ],
  },
  {
    category: 'Raising Gen Alpha',
    color: 'accent',
    items: [
      {
        title: 'AI Literacy by Age',
        description: 'Age-appropriate conversations about AI—what it is, what it can\'t do, and how to use it wisely.',
        icon: Bot,
      },
      {
        title: 'Screen Time Wisdom',
        description: 'Beyond just limits: understanding quality vs. quantity and making intentional choices.',
        icon: Smartphone,
      },
      {
        title: 'Weekly Challenges',
        description: 'Fun family activities that build critical thinking, emotional intelligence, and healthy tech habits.',
        icon: Target,
      },
      {
        title: 'Family Tech Agreement',
        description: 'Generate personalized family guidelines for device use, social media, and online safety.',
        icon: FileText,
      },
      {
        title: 'Future Skills',
        description: 'Guidance on nurturing creativity, empathy, and adaptability—skills AI can\'t replace.',
        icon: Rocket,
      },
    ],
  },
];

// Experience-first pricing model
const howItWorks = [
  {
    step: '1',
    title: 'Try Everything Free',
    description: 'Full access to all features for 14 days. No credit card required. Experience the complete app.',
  },
  {
    step: '2',
    title: 'Discover What Helps',
    description: 'Use what resonates with you. Daily check-ins? AI companion? Return-to-work guides? Gen Alpha resources?',
  },
  {
    step: '3',
    title: 'Pay for What You Value',
    description: 'After your trial, choose what to continue. Pay only for the features that actually help you.',
  },
];

const pricingOptions = [
  {
    name: 'AI Companion',
    price: '$4.99',
    period: '/month',
    description: 'Unlimited AI conversations, pattern insights, and personalized guidance',
    icon: MessageSquare,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--primary-50)]',
  },
  {
    name: 'Return to Work Module',
    price: '$9.99',
    period: 'one-time',
    description: 'Complete 12-week transition program with scripts, exercises, and strategies',
    icon: Rocket,
    color: 'text-[var(--secondary-dark)]',
    bgColor: 'bg-[#FDF5ED]',
  },
  {
    name: 'Gen Alpha Curriculum',
    price: '$7.99',
    period: '/month',
    description: 'Weekly AI literacy content, family challenges, and age-appropriate guides',
    icon: Bot,
    color: 'text-[var(--accent)]',
    bgColor: 'bg-[var(--sage-mist)]',
  },
  {
    name: 'Guided Sessions Pack',
    price: '$2.99',
    period: '/10 sessions',
    description: 'Audio sessions for anxiety, sleep, and overwhelm—use as many as you need',
    icon: Headphones,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--blush)]',
  },
  {
    name: 'Coaching Session',
    price: '$75',
    period: '/session',
    description: 'One-on-one call with a certified coach. Book when you need it.',
    icon: Handshake,
    color: 'text-[var(--accent)]',
    bgColor: 'bg-[var(--sage-mist)]',
  },
];

export default function AppPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary-light)] opacity-10 blob blob-animate" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--accent)] opacity-10 blob blob-animate" style={{ animationDelay: '-4s' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
                The Alpha App
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
                Your 24/7 companion for the <span className="gradient-text">whole journey</span>
              </h1>
              <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
                Not another meditation app. Not another to-do list. Alpha Mothers is an intelligent
                companion that learns your patterns, understands your context, and provides
                support exactly when you need it—even at 3am.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#download" className="btn-primary">
                  Download for iOS
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </Link>
                <Link href="#download" className="btn-secondary">
                  Download for Android
                </Link>
              </div>
              <p className="text-sm text-[var(--muted)] mt-4">
                Free to start. No credit card required.
              </p>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center">
              <div className="w-[300px] h-[620px] bg-[var(--foreground)] rounded-[50px] p-4 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-[var(--cream)] to-[var(--blush)] rounded-[38px] overflow-hidden">
                  <div className="p-6">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <div>
                          <p className="font-medium text-[var(--foreground)]">Good morning</p>
                          <p className="text-xs text-[var(--muted)]">How are you feeling?</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                    </div>

                    {/* Mood Selection */}
                    <div className="bg-white rounded-2xl p-4 mb-4">
                      <p className="text-sm text-[var(--muted)] mb-3">Today&apos;s check-in</p>
                      <div className="flex justify-between">
                        {[1, 2, 3, 4, 5].map((level, i) => (
                          <button key={i} className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${i === 3 ? 'bg-[var(--primary)] scale-110 shadow-lg' : 'bg-[var(--cream)] hover:scale-105'}`}>
                            <div className={`w-6 h-6 rounded-full ${i === 3 ? 'bg-white' : 'bg-[var(--primary)]'}`} style={{ opacity: 0.2 + (i * 0.2) }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Insight Card */}
                    <div className="bg-white rounded-2xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
                        <p className="text-xs font-medium text-[var(--primary)]">Insight</p>
                      </div>
                      <p className="text-sm text-[var(--foreground)]">
                        Your energy typically dips on Tuesdays. Consider lighter tasks today.
                      </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[var(--primary-50)] rounded-xl p-3 text-center">
                        <PenLine className="w-6 h-6 mx-auto mb-1 text-[var(--primary)]" strokeWidth={1.5} />
                        <p className="text-xs font-medium text-[var(--primary)]">Journal</p>
                      </div>
                      <div className="bg-[var(--sage-mist)] rounded-xl p-3 text-center">
                        <Headphones className="w-6 h-6 mx-auto mb-1 text-[var(--accent)]" strokeWidth={1.5} />
                        <p className="text-xs font-medium text-[var(--accent)]">Guided</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Features
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Everything you need,<br />nothing you don&apos;t
            </h2>
            <p className="text-xl text-[var(--muted)]">
              Three integrated modules that address your complete experience as an ambitious mother.
            </p>
          </div>

          {features.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  category.color === 'primary'
                    ? 'bg-[var(--primary-50)] text-[var(--primary)]'
                    : category.color === 'secondary'
                    ? 'bg-[#FDF5ED] text-[var(--secondary-dark)]'
                    : 'bg-[var(--sage-mist)] text-[var(--accent)]'
                }`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${
                  category.color === 'primary'
                    ? 'text-[var(--primary)]'
                    : category.color === 'secondary'
                    ? 'text-[var(--secondary-dark)]'
                    : 'text-[var(--accent)]'
                }`}>
                  {category.category}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((feature, featureIndex) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={featureIndex} className="card-elegant p-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        category.color === 'primary'
                          ? 'bg-[var(--primary-50)]'
                          : category.color === 'secondary'
                          ? 'bg-[#FDF5ED]'
                          : 'bg-[var(--sage-mist)]'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          category.color === 'primary'
                            ? 'text-[var(--primary)]'
                            : category.color === 'secondary'
                            ? 'text-[var(--secondary-dark)]'
                            : 'text-[var(--accent)]'
                        }`} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">{feature.title}</h4>
                      <p className="text-[var(--muted)] text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              How It Works
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Simple, intentional, effective
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Check In Daily', description: '30 seconds to log how you\'re feeling. That\'s it.', icon: Smartphone, color: 'text-[var(--primary)]' },
              { step: '2', title: 'Get Insights', description: 'AI recognizes patterns and offers personalized guidance.', icon: Lightbulb, color: 'text-[var(--secondary-dark)]' },
              { step: '3', title: 'Take Action', description: 'Short exercises, scripts, and tools when you need them.', icon: Sparkles, color: 'text-[var(--accent)]' },
              { step: '4', title: 'Connect Human', description: 'When you need more, we connect you with real support.', icon: Handshake, color: 'text-[var(--primary)]' },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                    <IconComponent className={`w-8 h-8 ${item.color}`} strokeWidth={1.5} />
                  </div>
                  <div className="w-8 h-8 mx-auto rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{item.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section - Experience First */}
      <section className="py-24" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Experience First
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Try everything. Then pay for what helps.
            </h2>
            <p className="text-xl text-[var(--muted)]">
              We believe you should experience the full app before deciding what&apos;s worth paying for.
              No feature gates. No pressure. Just support.
            </p>
          </div>

          {/* How it Works */}
          <div className="bg-gradient-to-br from-[var(--cream)] to-[var(--blush)] rounded-3xl p-8 md:p-12 mb-16">
            <h3 className="text-2xl font-bold text-[var(--foreground)] text-center mb-8">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">{item.title}</h4>
                  <p className="text-[var(--muted)] text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="#download" className="btn-primary">
                Start Your Free 14-Day Trial
              </Link>
            </div>
          </div>

          {/* Always Free */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[var(--foreground)] text-center mb-8">Always Free</h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Daily mood check-ins',
                  'Basic pattern insights',
                  'Community access',
                  'Crisis resources',
                  'Weekly newsletter',
                  'Limited article access',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--foreground)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pay for What You Value */}
          <div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] text-center mb-4">Pay for What You Value</h3>
            <p className="text-[var(--muted)] text-center mb-8 max-w-2xl mx-auto">
              After your free trial, add only the features that made a difference for you.
              No bundles. No commitments. Cancel anytime.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pricingOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div key={index} className="card-elegant p-6">
                    <div className={`w-12 h-12 rounded-xl ${option.bgColor} flex items-center justify-center mb-3`}>
                      <IconComponent className={`w-6 h-6 ${option.color}`} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg font-bold text-[var(--foreground)] mb-1">{option.name}</h4>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-[var(--primary)]">{option.price}</span>
                      <span className="text-[var(--muted)] text-sm"> {option.period}</span>
                    </div>
                    <p className="text-[var(--muted)] text-sm">{option.description}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-center text-sm text-[var(--muted)] mt-8">
              Bundle all features for just <span className="font-semibold text-[var(--foreground)]">$14.99/month</span> (save 40%)
            </p>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white" id="download">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to feel supported?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Download Alpha and start your journey toward thriving—not just surviving—as an ambitious mother.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#" className="inline-flex items-center px-8 py-4 bg-white text-[var(--primary)] font-medium rounded-full hover:bg-white/90 transition-colors">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </Link>
            <Link href="#" className="inline-flex items-center px-8 py-4 bg-white text-[var(--primary)] font-medium rounded-full hover:bg-white/90 transition-colors">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.68.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
              </svg>
              Google Play
            </Link>
          </div>
          <p className="text-sm text-white/60 mt-6">
            Free to download. Free forever plan available.
          </p>
        </div>
      </section>
    </div>
  );
}
