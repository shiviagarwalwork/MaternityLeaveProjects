import Link from 'next/link';
import {
  Handshake, Users, Lightbulb, Heart,
  Building2, GraduationCap, Megaphone, Mail
} from 'lucide-react';

const partnerTypes = [
  {
    icon: GraduationCap,
    title: 'Coaches & Mentors',
    description: 'Are you a certified coach, therapist, or mentor with expertise in working with mothers, career development, or mental health?',
    looking: [
      'Executive coaches with corporate experience',
      'Licensed therapists specializing in maternal mental health',
      'Career coaches focused on working parents',
      'Life coaches with lived experience as working mothers',
    ],
    color: 'bg-[var(--primary-50)]',
    textColor: 'text-[var(--primary)]',
  },
  {
    icon: Building2,
    title: 'Organizations & Companies',
    description: 'Is your organization committed to supporting working parents? We\'d love to explore collaboration opportunities.',
    looking: [
      'Companies with parent-friendly policies',
      'HR tech companies focused on employee wellbeing',
      'Childcare and education providers',
      'Corporate wellness programs',
    ],
    color: 'bg-[var(--sage-mist)]',
    textColor: 'text-[var(--accent)]',
  },
  {
    icon: Megaphone,
    title: 'Content Creators & Experts',
    description: 'Do you create content about parenting, career, AI, or related topics? Let\'s amplify each other\'s voices.',
    looking: [
      'Parenting bloggers and podcasters',
      'AI and tech educators',
      'Career development content creators',
      'Authors and thought leaders',
    ],
    color: 'bg-[#FDF5ED]',
    textColor: 'text-[var(--secondary-dark)]',
  },
  {
    icon: Heart,
    title: 'Community Partners',
    description: 'Do you run a community, nonprofit, or initiative that aligns with our mission? Let\'s support each other.',
    looking: [
      'Women in tech communities',
      'Parent support networks',
      'Nonprofits supporting working families',
      'Professional women\'s networks',
    ],
    color: 'bg-[var(--blush)]',
    textColor: 'text-[var(--primary)]',
  },
];

const collaborationIdeas = [
  'Guest content and cross-promotion',
  'Joint workshops and webinars',
  'Community partnerships',
  'Resource sharing',
  'Speaking opportunities',
  'App integrations',
];

export default function PartnerPage() {
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
              Partner With Us
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
              Let&apos;s build the<br />
              <span className="gradient-text">future together</span>
            </h1>
            <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
              Alpha Mothers is growing, and we&apos;re looking for coaches, organizations, and
              thought leaders who share our mission of empowering ambitious mothers
              raising the next generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                Get in Touch
              </a>
              <Link href="/about" className="btn-secondary">
                Learn About Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
                Our Vision
              </p>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
                We can&apos;t do this alone
              </h2>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  Supporting ambitious mothers through career transitions, mental health
                  challenges, and raising kids in the AI age requires a village of experts.
                </p>
                <p>
                  We&apos;re building an ecosystem where mothers can access the best coaches,
                  resources, and support—all in one place. And we need partners who
                  share our values to make that vision a reality.
                </p>
                <p className="font-medium text-[var(--foreground)]">
                  Together, we can reach more mothers and create more impact.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--primary-50)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">Growing Community</h4>
                <p className="text-sm text-[var(--muted)]">Access to engaged, ambitious mothers</p>
              </div>
              <div className="bg-[var(--sage-mist)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">
                  <Lightbulb className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">Shared Mission</h4>
                <p className="text-sm text-[var(--muted)]">Aligned values and purpose</p>
              </div>
              <div className="bg-[#FDF5ED] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">
                  <Megaphone className="w-5 h-5 text-[var(--secondary-dark)]" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">Amplified Reach</h4>
                <p className="text-sm text-[var(--muted)]">Cross-promotion opportunities</p>
              </div>
              <div className="bg-[var(--blush)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3">
                  <Handshake className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[var(--foreground)] mb-2">True Partnership</h4>
                <p className="text-sm text-[var(--muted)]">Collaborative, not transactional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Who We&apos;re Looking For
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Partners who share our mission
            </h2>
            <p className="text-xl text-[var(--muted)]">
              We&apos;re open to various types of collaborations with individuals and
              organizations who want to support ambitious mothers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-sm">
                  <div className={`w-14 h-14 rounded-2xl ${type.color} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-7 h-7 ${type.textColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">{type.title}</h3>
                  <p className="text-[var(--muted)] mb-4">{type.description}</p>
                  <p className="text-sm font-medium text-[var(--foreground)] mb-2">We&apos;re looking for:</p>
                  <ul className="space-y-2">
                    {type.looking.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                        <svg className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collaboration Ideas */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Ways we can collaborate</h3>
                <ul className="space-y-4">
                  {collaborationIdeas.map((idea, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-white/80 text-sm">
                  Have another idea? We&apos;re open to creative collaborations!
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
                Collaboration
              </p>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
                Flexible partnerships
              </h2>
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  We believe the best partnerships are built on mutual benefit and shared
                  values, not rigid structures. We&apos;re open to exploring what works best
                  for both parties.
                </p>
                <p>
                  Whether you want to contribute content, offer services to our community,
                  co-create resources, or explore something entirely new—let&apos;s talk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[var(--cream)]" id="contact">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--primary-50)] flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-[var(--primary)]" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
            Let&apos;s start a conversation
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8">
            Interested in partnering with Alpha Mothers? We&apos;d love to hear from you.
            Tell us about yourself and how you&apos;d like to collaborate.
          </p>
          <a
            href="mailto:hello@alphamothers.com?subject=Partnership Inquiry"
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Email Us
          </a>
          <p className="text-sm text-[var(--muted)] mt-6">
            Or connect with us on{' '}
            <a href="https://www.linkedin.com/company/alpha-mothers" className="text-[var(--primary)] hover:underline" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--muted)] mb-4">
            Not looking to partner but want to be part of the community?
          </p>
          <Link href="/community" className="text-[var(--primary)] font-medium hover:underline">
            Join the Alpha Mothers Community →
          </Link>
        </div>
      </section>
    </div>
  );
}
