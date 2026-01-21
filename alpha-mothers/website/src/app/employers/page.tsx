import Link from 'next/link';

const stats = [
  { number: '43%', label: 'of mothers never return to their role after maternity leave' },
  { number: '38%', label: 'higher retention with robust support programs' },
  { number: '$47K', label: 'average cost to replace an employee who leaves' },
  { number: '68%', label: 'of new mothers report significant anxiety returning to work' },
];

const packages = [
  {
    name: 'Team',
    description: 'Essential support for small teams',
    price: '$8',
    period: 'per employee/month',
    features: [
      'Full Alpha app access for all parents',
      'Return-to-work module',
      'Gen Alpha parenting guides',
      'Anonymous usage analytics',
      'Email support',
    ],
    minSeats: '10+ employees',
  },
  {
    name: 'Professional',
    description: 'Comprehensive support with coaching',
    price: '$15',
    period: 'per employee/month',
    features: [
      'Everything in Team',
      'Monthly group coaching sessions',
      'Manager training resources',
      'Quarterly impact reports',
      'Dedicated success manager',
      'Custom content options',
    ],
    minSeats: '50+ employees',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'Fully customized enterprise solution',
    price: 'Custom',
    period: 'annual contract',
    features: [
      'Everything in Professional',
      '1:1 coaching credits',
      'Leadership workshops',
      'Integration with HR systems',
      'White-label options',
      'Executive sponsor support',
      'Custom ROI measurement',
    ],
    minSeats: '500+ employees',
  },
];

const benefits = [
  {
    title: 'Reduce Turnover',
    description: 'The return-to-work transition is when most mothers leave. Proactive support keeps your best talent.',
    icon: '📉',
    stat: '38% higher retention',
  },
  {
    title: 'Faster Ramp-Up',
    description: 'Mothers who feel supported return to full productivity faster than those left to figure it out alone.',
    icon: '🚀',
    stat: '41% faster productivity recovery',
  },
  {
    title: 'Mental Health ROI',
    description: 'Addressing perinatal mental health reduces absenteeism, presenteeism, and healthcare costs.',
    icon: '💚',
    stat: '4:1 ROI on mental health programs',
  },
  {
    title: 'Employer Brand',
    description: 'Become known as a company that genuinely supports working parents—a key differentiator in talent markets.',
    icon: '🏆',
    stat: 'Top driver for parent talent',
  },
];

const useCases = [
  {
    company: 'Tech Company',
    size: '2,000 employees',
    challenge: 'High turnover among senior women after maternity leave',
    result: '62% reduction in post-leave departures within first year',
  },
  {
    company: 'Consulting Firm',
    size: '500 employees',
    challenge: 'Managers struggling to support returning mothers',
    result: '89% of managers report increased confidence in supporting team members',
  },
  {
    company: 'Healthcare System',
    size: '15,000 employees',
    challenge: 'High stress levels among nursing mothers',
    result: '45% improvement in self-reported mental health scores',
  },
];

export default function EmployersPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 blob blob-animate" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-white/70 font-medium tracking-wide uppercase text-sm mb-4">
              For Employers
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Retain your best talent through motherhood
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              43% of mothers never return after maternity leave. The ones who do often struggle in silence.
              Alpha Mothers gives your employees the support they need to thrive—and your company the
              retention results you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact" className="inline-flex items-center px-8 py-4 bg-white text-[var(--accent)] font-medium rounded-full hover:bg-white/90 transition-colors">
                Request a Demo
              </Link>
              <Link href="#packages" className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stat-number">{stat.number}</div>
                <p className="text-[var(--muted)] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
                The Problem
              </p>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
                The hidden cost of unsupported mothers
              </h2>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  You&apos;ve invested years developing your female talent. Then maternity leave happens,
                  and nearly half never return. Those who do often struggle with anxiety, guilt,
                  and a crisis of professional identity—in silence.
                </p>
                <p>
                  The cost? Beyond the $47K average replacement cost, you lose institutional knowledge,
                  team cohesion, and the very diversity you&apos;ve worked to build.
                </p>
                <p>
                  Most companies offer generic EAP programs that mothers don&apos;t use, or nothing at all.
                  What they need is support that understands the specific challenges of ambitious motherhood.
                </p>
              </div>
            </div>
            <div className="bg-[var(--cream)] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">Common Pain Points</h3>
              <ul className="space-y-4">
                {[
                  'High-performing women leaving within 12 months of return',
                  'Managers unsure how to support returning mothers',
                  'Reduced engagement and productivity post-leave',
                  'Mental health issues going unaddressed',
                  'Difficulty attracting parent talent',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[var(--primary)]">⚠️</span>
                    <span className="text-[var(--foreground)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              The Solution
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Why companies choose Alpha Mothers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{benefit.title}</h3>
                <p className="text-[var(--muted)] text-sm mb-4">{benefit.description}</p>
                <p className="text-[var(--primary)] font-medium text-sm">{benefit.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              What We Offer
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Comprehensive support ecosystem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-elegant p-8">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary-50)] text-[var(--primary)] flex items-center justify-center text-2xl mb-6">
                📱
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Alpha App Access</h3>
              <p className="text-[var(--muted)] mb-4">
                Full access to our AI companion app for all employees who are pregnant or parenting.
                24/7 mental health support, return-to-work preparation, and Gen Alpha parenting guidance.
              </p>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• Daily check-ins and pattern recognition</li>
                <li>• Return-to-work transition module</li>
                <li>• Crisis support escalation</li>
              </ul>
            </div>

            <div className="card-elegant p-8">
              <div className="w-14 h-14 rounded-2xl bg-[var(--sage-mist)] text-[var(--accent)] flex items-center justify-center text-2xl mb-6">
                👥
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Group Coaching</h3>
              <p className="text-[var(--muted)] mb-4">
                Expert-led group sessions that build community among working parents in your organization.
                Cohorts by life stage ensure relevant support.
              </p>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• Monthly virtual sessions</li>
                <li>• Expectant parent cohorts</li>
                <li>• Return-to-work cohorts</li>
              </ul>
            </div>

            <div className="card-elegant p-8">
              <div className="w-14 h-14 rounded-2xl bg-[#FDF5ED] text-[var(--secondary-dark)] flex items-center justify-center text-2xl mb-6">
                📊
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Analytics & Insights</h3>
              <p className="text-[var(--muted)] mb-4">
                Anonymous, aggregate data on program engagement and impact. Demonstrate ROI
                and identify where additional support may be needed.
              </p>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>• Engagement dashboards</li>
                <li>• Quarterly impact reports</li>
                <li>• Benchmark comparisons</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-[var(--primary)]" id="packages">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary-light)] font-medium tracking-wide uppercase text-sm mb-4">
              Pricing
            </p>
            <h2 className="text-4xl font-bold text-white mb-6">
              Flexible packages for any organization
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`rounded-3xl p-8 ${
                  pkg.highlighted
                    ? 'bg-white shadow-2xl scale-105'
                    : 'bg-white/10 backdrop-blur-sm'
                }`}
              >
                <p className={`text-sm font-medium mb-2 ${pkg.highlighted ? 'text-[var(--primary)]' : 'text-white/70'}`}>
                  {pkg.minSeats}
                </p>
                <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-[var(--foreground)]' : 'text-white'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-4 ${pkg.highlighted ? 'text-[var(--muted)]' : 'text-white/70'}`}>
                  {pkg.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${pkg.highlighted ? 'text-[var(--foreground)]' : 'text-white'}`}>
                    {pkg.price}
                  </span>
                  <span className={pkg.highlighted ? 'text-[var(--muted)]' : 'text-white/70'}>
                    {' '}{pkg.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-[var(--primary)]' : 'text-white'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${pkg.highlighted ? 'text-[var(--foreground)]' : 'text-white/90'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={`block w-full py-3 rounded-full font-medium text-center transition-all ${
                    pkg.highlighted
                      ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                      : 'bg-white text-[var(--primary)] hover:bg-white/90'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Results
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Real impact, real companies
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-[var(--cream)] rounded-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[var(--foreground)]">{useCase.company}</h3>
                  <span className="text-sm text-[var(--muted)]">{useCase.size}</span>
                </div>
                <p className="text-[var(--muted)] text-sm mb-4">
                  <span className="font-medium">Challenge:</span> {useCase.challenge}
                </p>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-[var(--primary)] font-medium text-sm">Result:</p>
                  <p className="text-[var(--foreground)] font-bold">{useCase.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--cream)]" id="contact">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
            Ready to support your working parents?
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8">
            Schedule a demo to see how Alpha Mothers can reduce turnover, improve retention,
            and create a culture where ambitious mothers thrive.
          </p>
          <Link href="#" className="btn-primary text-lg px-10 py-4">
            Request a Demo
          </Link>
          <p className="text-sm text-[var(--muted)] mt-6">
            Or email us directly at <a href="mailto:enterprise@alphamothers.com" className="text-[var(--primary)]">enterprise@alphamothers.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
