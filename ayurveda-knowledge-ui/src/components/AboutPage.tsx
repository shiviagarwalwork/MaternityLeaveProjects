'use client';

import { BookOpen, Heart, Lightbulb, Target, Users, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section with Featured Image */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent mb-4">
          Ancient Wisdom for Your Digital Life
        </h1>
        <p className="text-xl text-[var(--foreground)] max-w-2xl mx-auto mb-8">
          Making 5,000-year-old Ayurvedic knowledge relevant for screen addiction,
          sensory overload, and modern mental health challenges.
        </p>

        {/* Featured Manuscript Image */}
        <div className="relative mx-auto max-w-md mb-4">
          <div className="border-4 border-[var(--accent-primary)] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/manuscripts/ayurvedic-body-chakras-1800.jpg"
              alt="18th century Ayurvedic anatomical painting showing human body with chakras and energy systems"
              width={600}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2 italic">
            Ayurvedic anatomical painting (ca. 1800, Nepal) showing the microcosm-macrocosm connection
            <br />
            <span className="text-[var(--accent-primary)]">Source: Wellcome Collection, Public Domain</span>
          </p>
        </div>
      </div>

      {/* Core Question */}
      <div className="bg-[var(--card-bg)] border-2 border-[var(--accent-primary)] rounded-lg p-6 mb-12 text-center">
        <p className="text-2xl font-semibold text-[var(--accent-secondary)] mb-2">
          The One Question That Matters:
        </p>
        <p className="text-xl text-[var(--foreground)]">
          "Is your current way of living producing <strong className="text-[var(--accent-primary)]">sukha</strong> (happiness)
          or <strong className="text-[var(--accent-tertiary)]">duḥkha</strong> (suffering)?"
        </p>
      </div>

      {/* The Problem */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-[var(--accent-tertiary)]" />
          <h2 className="text-3xl font-bold text-[var(--foreground)]">The Problem</h2>
        </div>

        <div className="bg-[var(--card-bg-light)] rounded-lg p-6 space-y-4">
          <p className="text-[var(--foreground)]">
            You know scrolling at 2 AM destroys your sleep. You do it anyway.
          </p>
          <p className="text-[var(--foreground)]">
            You know social media comparison makes you miserable. You keep checking.
          </p>
          <p className="text-[var(--foreground)]">
            You know binge-watching leaves you feeling hollow. Netflix autoplays.
          </p>
          <p className="text-[var(--foreground)] font-semibold">
            The ancient Ayurvedic physician Charaka called this <strong className="text-[var(--accent-primary)]">prajñāparādha</strong> -
            "crimes against wisdom." Knowingly doing what harms you.
          </p>
          <p className="text-[var(--foreground)] italic border-l-4 border-[var(--accent-primary)] pl-4">
            This isn't a new problem. It's THE root cause of disease according to the Charaka Samhita,
            written 5,000 years ago.
          </p>
        </div>
      </section>

      {/* The Solution */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-[var(--accent-primary)]" />
          <h2 className="text-3xl font-bold text-[var(--foreground)]">The Solution</h2>
        </div>

        <div className="bg-[var(--card-bg-light)] rounded-lg p-6 space-y-4">
          <p className="text-[var(--foreground)]">
            Modern digital life creates conditions that Ayurveda specifically warned against:
          </p>
          <ul className="space-y-2 ml-6 text-[var(--foreground)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent-primary)] mt-1">•</span>
              <span><strong>Sensory overload</strong> (endless scrolling, notifications)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent-primary)] mt-1">•</span>
              <span><strong>Broken natural rhythms</strong> (blue light at night, irregular eating)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent-primary)] mt-1">•</span>
              <span><strong>Mental agitation</strong> (comparison, outrage, FOMO)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--accent-primary)] mt-1">•</span>
              <span><strong>Depleted vitality</strong> (exhaustion despite doing nothing physical)</span>
            </li>
          </ul>
          <p className="text-[var(--foreground)] font-semibold pt-4">
            The Charaka Samhita provides a complete framework for addressing these issues -
            not by rejecting technology, but by asking what truly serves your wellbeing.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-[var(--accent-secondary)]" />
          <h2 className="text-3xl font-bold text-[var(--foreground)]">What We Offer</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[var(--card-bg)] border border-[var(--accent-primary)] rounded-lg p-6">
            <h3 className="text-xl font-bold text-[var(--accent-primary)] mb-3">Not Generic Wellness</h3>
            <ul className="space-y-2 text-[var(--foreground)]">
              <li>✓ Deep, authentic Charaka Samhita knowledge</li>
              <li>✓ Direct connection to modern digital challenges</li>
              <li>✓ Practical, actionable guidance</li>
              <li>✓ Non-judgmental, wisdom-based approach</li>
            </ul>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--accent-tertiary)] rounded-lg p-6">
            <h3 className="text-xl font-bold text-[var(--accent-tertiary)] mb-3">But Rather</h3>
            <ul className="space-y-2 text-[var(--foreground)]">
              <li>✓ Ancient sutras addressing screen addiction</li>
              <li>✓ Ojas-building (vitality restoration) protocols</li>
              <li>✓ Sensory hygiene for digital overwhelm</li>
              <li>✓ Mental state tracking (sattva/rajas/tamas)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-[var(--accent-primary)]" />
          <h2 className="text-3xl font-bold text-[var(--foreground)]">8 Core Concepts</h2>
        </div>

        <div className="bg-[var(--card-bg-light)] rounded-lg p-6">
          <p className="text-[var(--foreground)] mb-6">
            We've translated ancient Charaka Samhita wisdom into modern applications:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-[var(--accent-primary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">1. Prajñāparādha</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Crimes against wisdom → Why you keep scrolling</p>
            </div>

            <div className="border-l-4 border-[var(--accent-secondary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">2. Ojas</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Vital essence → Why you feel drained</p>
            </div>

            <div className="border-l-4 border-[var(--accent-tertiary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">3. Sensory Health</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Unwholesome contact → Screen fatigue</p>
            </div>

            <div className="border-l-4 border-[var(--accent-primary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">4. Vata Imbalance</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Air element → Modern anxiety</p>
            </div>

            <div className="border-l-4 border-[var(--accent-secondary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">5. Dinacharya</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Daily routine → Circadian alignment</p>
            </div>

            <div className="border-l-4 border-[var(--accent-tertiary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">6. Sadvritta</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Right conduct → Digital ethics</p>
            </div>

            <div className="border-l-4 border-[var(--accent-primary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">7. Ritucharya</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Seasonal living → Natural rhythms</p>
            </div>

            <div className="border-l-4 border-[var(--accent-secondary)] pl-4">
              <h4 className="font-bold text-[var(--foreground)] mb-1">8. Manas</h4>
              <p className="text-sm text-[var(--foreground)] opacity-80">Mental states → Clarity vs agitation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-8 h-8 text-[var(--accent-secondary)]" />
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Who This Is For</h2>
        </div>

        <div className="bg-[var(--card-bg)] border-2 border-[var(--accent-secondary)] rounded-lg p-6">
          <div className="space-y-3 text-[var(--foreground)]">
            <p><strong className="text-[var(--accent-primary)]">→</strong> Tech workers and creatives experiencing screen fatigue and burnout</p>
            <p><strong className="text-[var(--accent-primary)]">→</strong> Anyone dealing with anxiety, insomnia, or depression from modern life</p>
            <p><strong className="text-[var(--accent-primary)]">→</strong> Wellness enthusiasts looking for authentic ancient wisdom</p>
            <p><strong className="text-[var(--accent-primary)]">→</strong> Parents concerned about digital-age mental health</p>
            <p><strong className="text-[var(--accent-primary)]">→</strong> Anyone who knows what's hurting them but keeps doing it anyway</p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-[var(--accent-tertiary)]" />
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Our Approach</h2>
        </div>

        <div className="bg-[var(--card-bg-light)] rounded-lg p-6 space-y-4">
          <p className="text-[var(--foreground)]">
            <strong className="text-[var(--accent-primary)]">Not anti-technology, pro-wisdom.</strong>
          </p>
          <p className="text-[var(--foreground)]">
            We don't tell you to throw away your phone or live in the woods.
            We help you understand what truly serves your wellbeing vs. what depletes you.
          </p>
          <p className="text-[var(--foreground)]">
            <strong className="text-[var(--accent-secondary)]">Not preachy, just aware.</strong>
          </p>
          <p className="text-[var(--foreground)]">
            No shame about screen time. Just honest questions: Is this making you happier or more miserable?
          </p>
          <p className="text-[var(--foreground)]">
            <strong className="text-[var(--accent-tertiary)]">Not perfection, just alignment.</strong>
          </p>
          <p className="text-[var(--foreground)]">
            Small changes in the direction of what serves you. Progress over perfection.
          </p>
        </div>
      </section>

      {/* Vision with Sanskrit Manuscript Image */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-bg-light)] to-[var(--card-bg)] border-2 border-[var(--accent-primary)] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[var(--accent-secondary)] mb-6 text-center">Our Vision</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Sanskrit Manuscript Image */}
            <div>
              <div className="border-2 border-[var(--accent-secondary)] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/manuscripts/sanskrit-palm-leaf-miniatures.jpg"
                  alt="Ancient Sanskrit palm leaf manuscript with traditional miniatures and calligraphy"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2 italic text-center">
                Sanskrit palm leaf manuscript with miniatures
                <br />
                <span className="text-[var(--accent-secondary)]">Source: Wellcome Collection, CC BY 4.0</span>
              </p>
            </div>

            {/* Vision Text */}
            <div className="text-center md:text-left">
              <p className="text-lg text-[var(--foreground)] mb-4">
                Make Charaka Samhita the primary mental health framework for the digital age.
              </p>
              <p className="text-[var(--foreground)] opacity-80">
                Just as mindfulness went from Buddhist practice to mainstream mental health tool,
                we want Ayurvedic concepts like prajñāparādha, ojas, and svastha to become
                common language for discussing digital wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="bg-[var(--card-bg)] border-2 border-[var(--accent-primary)] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Ready to Bridge Ancient Wisdom with Modern Life?
          </h2>
          <p className="text-[var(--foreground)] mb-6">
            Start with the Quick Fix guide for immediate relief, or dive into the
            Dosha Assessment to understand your unique constitution.
          </p>
          <p className="text-sm text-[var(--foreground)] opacity-60">
            5,000 years old. Zero BS.
          </p>
        </div>
      </section>
    </div>
  );
}
