import Link from 'next/link';

const coachingTypes = [
  {
    name: '1:1 Executive Coaching',
    description: 'Personalized, high-touch support for leaders and senior professionals navigating the complexities of ambitious motherhood.',
    features: [
      'Bi-weekly 60-minute sessions',
      'Unlimited async messaging',
      'Custom action plans',
      'Career strategy integration',
      'Mental health check-ins',
    ],
    price: 'From $500/month',
    ideal: 'Senior professionals, executives, founders',
    icon: '👑',
  },
  {
    name: 'Group Coaching',
    description: 'Connect with a cohort of mothers in similar life stages. Learn from each other while getting expert guidance.',
    features: [
      'Weekly 90-minute group sessions',
      'Private community access',
      'Peer accountability',
      'Expert-led workshops',
      'Lifetime alumni network',
    ],
    price: 'From $200/month',
    ideal: 'Mothers seeking community + guidance',
    icon: '👥',
  },
  {
    name: 'Return-to-Work Intensive',
    description: 'A focused 6-week program designed specifically for the critical transition back to work after maternity leave.',
    features: [
      '6 weekly coaching sessions',
      'Week-by-week transition plan',
      'Flexibility negotiation prep',
      'Identity integration work',
      'Post-return check-ins',
    ],
    price: '$1,200 one-time',
    ideal: 'Returning from maternity leave',
    icon: '🚀',
  },
  {
    name: 'Postpartum Support',
    description: 'Specialized coaching for the fourth trimester and beyond, with mental health awareness built in.',
    features: [
      'Flexible session scheduling',
      'Mental health monitoring',
      'Crisis escalation protocols',
      'Partner/family integration',
      'Clinical referral network',
    ],
    price: 'From $300/month',
    ideal: 'New mothers (0-12 months postpartum)',
    icon: '🌸',
  },
];

const coaches = [
  {
    name: 'Lead Coach',
    specialties: ['Executive Leadership', 'Career Transitions', 'Work-Life Integration'],
    bio: 'Former Fortune 500 executive who navigated her own return-to-work journey and now helps other ambitious mothers do the same.',
  },
  {
    name: 'Clinical Coach',
    specialties: ['Postpartum Mental Health', 'Anxiety Management', 'Crisis Support'],
    bio: 'Licensed therapist specializing in perinatal mental health with 10+ years of experience supporting new mothers.',
  },
  {
    name: 'Career Coach',
    specialties: ['Negotiation', 'Career Strategy', 'Professional Identity'],
    bio: 'Career strategist who has helped hundreds of mothers navigate promotions, pivots, and flexibility conversations.',
  },
];

const process = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'A free 30-minute conversation to understand your situation and determine the best support path.',
    icon: '📞',
  },
  {
    step: 2,
    title: 'Custom Plan',
    description: 'We create a personalized coaching plan based on your goals, challenges, and timeline.',
    icon: '📋',
  },
  {
    step: 3,
    title: 'Regular Sessions',
    description: 'Consistent coaching sessions with actionable takeaways and ongoing support between calls.',
    icon: '💬',
  },
  {
    step: 4,
    title: 'Integration',
    description: 'Tools and frameworks to sustain your growth long after coaching ends.',
    icon: '✨',
  },
];

export default function CoachingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--secondary)] opacity-10 blob blob-animate" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Coaching
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
              Human support for<br />
              <span className="gradient-text">complex journeys</span>
            </h1>
            <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
              While our AI companion handles daily support, some challenges need human wisdom.
              Our coaches understand the unique intersection of ambition, motherhood, and mental health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#book" className="btn-primary">
                Book a Free Discovery Call
              </Link>
              <Link href="#programs" className="btn-secondary">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Coaching Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
                Why Coaching
              </p>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
                When AI isn&apos;t enough
              </h2>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  Our AI companion is powerful for daily check-ins, pattern recognition, and
                  immediate support. But some moments need more.
                </p>
                <p>
                  When you&apos;re preparing for a difficult conversation with your manager about
                  flexibility. When you&apos;re processing complex emotions about your identity
                  as both mother and professional. When you need someone who&apos;s been through
                  it to help you see the path forward.
                </p>
                <p className="font-medium text-[var(--foreground)]">
                  That&apos;s when human coaching makes all the difference.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--primary-50)] rounded-2xl p-6">
                <div className="text-3xl mb-3">🧠</div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">Deep Understanding</h4>
                <p className="text-sm text-[var(--muted)]">Coaches who&apos;ve lived the experience</p>
              </div>
              <div className="bg-[var(--sage-mist)] rounded-2xl p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">Custom Strategy</h4>
                <p className="text-sm text-[var(--muted)]">Personalized plans for your situation</p>
              </div>
              <div className="bg-[#FDF5ED] rounded-2xl p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">Accountability</h4>
                <p className="text-sm text-[var(--muted)]">Someone in your corner</p>
              </div>
              <div className="bg-[var(--blush)] rounded-2xl p-6">
                <div className="text-3xl mb-3">💡</div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">Breakthrough Moments</h4>
                <p className="text-sm text-[var(--muted)]">Insights you can&apos;t get from an app</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-[var(--cream)]" id="programs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Programs
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Find the right support
            </h2>
            <p className="text-xl text-[var(--muted)]">
              Different seasons of motherhood need different types of support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coachingTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{type.icon}</div>
                  <span className="text-sm font-medium text-[var(--primary)] bg-[var(--primary-50)] px-3 py-1 rounded-full">
                    {type.price}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">{type.name}</h3>
                <p className="text-[var(--muted)] mb-4">{type.description}</p>
                <p className="text-sm text-[var(--primary)] font-medium mb-4">
                  Ideal for: {type.ideal}
                </p>
                <ul className="space-y-2 mb-6">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="#book" className="btn-secondary w-full text-center">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Our Coaches
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Experts who understand
            </h2>
            <p className="text-xl text-[var(--muted)]">
              Every coach has lived experience with ambitious motherhood, combined with professional expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[var(--primary-light)] to-[var(--secondary-light)] mb-6" />
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{coach.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {coach.specialties.map((specialty, i) => (
                    <span key={i} className="text-xs bg-[var(--cream)] text-[var(--muted)] px-2 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-[var(--muted)] text-sm">{coach.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[var(--primary)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary-light)] font-medium tracking-wide uppercase text-sm mb-4">
              How It Works
            </p>
            <h2 className="text-4xl font-bold mb-6">
              Simple process, profound impact
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-10 h-10 mx-auto rounded-full bg-white/20 flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" id="book">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8">
            Book a free 30-minute discovery call. No pressure, no commitment—just a conversation
            to see if coaching is right for you.
          </p>
          <Link href="#" className="btn-primary text-lg px-10 py-4">
            Book Your Free Call
          </Link>
          <p className="text-sm text-[var(--muted)] mt-6">
            Prefer to start with the app? <Link href="/app" className="text-[var(--primary)] hover:underline">Download Alpha free</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
