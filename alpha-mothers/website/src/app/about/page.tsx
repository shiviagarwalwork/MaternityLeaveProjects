import Link from 'next/link';
import Image from 'next/image';

// Journey milestones - reverse chronological
const journeyMilestones = [
  {
    year: 'Now',
    title: 'Building Alpha Mothers',
    description: 'On maternity leave with my second child, I\'m building Alpha Mothers—an AI life partner for mothers. Because if anyone understands the mental load of motherhood, it should be the technology we use.',
    highlight: true,
  },
  {
    year: '2025',
    title: 'Second Maternity Leave',
    description: 'November 2025—welcomed my second baby, a Gen Beta child. This time, I knew what was coming: the sleep deprivation, the identity shift, the mental load that multiplies (not just doubles) with two kids.',
  },
  {
    year: '2025',
    title: 'Deep Learning & NLP Course',
    description: 'Completed Stanford\'s Natural Language Processing with Deep Learning course while working at Salesforce. Because if I\'m going to build AI that truly understands mothers, I need to understand how AI understands us.',
  },
  {
    year: '2024',
    title: 'Salesforce, Canada',
    description: 'Moved to Canada and joined Salesforce. Continued building expertise in integration architecture, cloud solutions, and AI. Earned certifications in Salesforce AI, Mulesoft, and Microsoft Azure.',
  },
  {
    year: '2022',
    title: 'First Maternity Leave',
    description: 'March 2022—became a mother for the first time in Hyderabad, welcoming my Gen Alpha child while working at Deloitte. Six months of the most transformative, overwhelming, beautiful chaos of my life.',
  },
  {
    year: '2017+',
    title: 'Deloitte, Hyderabad',
    description: 'Moved to Deloitte in Hyderabad, building expertise in enterprise integration and technology consulting. This is where I was when I became a mother for the first time.',
  },
  {
    year: '2014',
    title: 'Infosys, Mysore & Pune',
    description: 'Started my tech career at Infosys—training at the Mysore campus, then working in Pune. The foundation for everything that came after.',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary-light)] opacity-10 blob blob-animate" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--primary)] font-medium mb-4">About Me</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6 leading-tight">
            From India to Canada, now building AI for mothers.
          </h1>
          <p className="text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
            I&apos;m Shivi—a tech professional with 10+ years at Infosys, Deloitte, and Salesforce, and a mother of two.
            Currently on maternity leave, building the support system I wish I had.
          </p>
        </div>
      </section>

      {/* Photo + Intro */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/WhatsApp Image 2026-01-14 at 01.14.12.jpeg"
                  alt="Shivi Agarwal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Intro */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                Hi, I&apos;m Shivi
              </h2>
              <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
                I&apos;m currently on maternity leave with my second child, and I&apos;m using
                this time to build something I desperately needed the first time around:
                <span className="text-[var(--foreground)] font-medium"> an AI that actually helps
                mothers manage the mental load.</span>
              </p>
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                By day (well, by naptime), I work at Salesforce. By night (between feeds),
                I&apos;m studying NLP at Stanford. And in every spare moment, I&apos;m building Alpha Mothers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey - Timeline */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4 text-center">
            The Journey
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 max-w-xl mx-auto">
            From building enterprise software to building for mothers—here&apos;s how I got here.
          </p>

          <div className="space-y-8">
            {journeyMilestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex gap-6 ${milestone.highlight ? '' : ''}`}
              >
                {/* Year marker */}
                <div className="flex-shrink-0 w-20 text-right">
                  <span className={`font-bold ${
                    milestone.highlight
                      ? 'text-[var(--primary)] text-lg'
                      : 'text-[var(--muted)]'
                  }`}>
                    {milestone.year}
                  </span>
                </div>

                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    milestone.highlight
                      ? 'bg-[var(--primary)]'
                      : 'bg-[var(--muted)]'
                  }`} />
                  {index < journeyMilestones.length - 1 && (
                    <div className="w-0.5 h-full bg-[var(--border)] mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-8 ${
                  milestone.highlight
                    ? 'bg-white rounded-xl p-6 shadow-sm -mt-2'
                    : ''
                }`}>
                  <h3 className={`font-bold mb-2 ${
                    milestone.highlight
                      ? 'text-xl text-[var(--foreground)]'
                      : 'text-lg text-[var(--foreground)]'
                  }`}>
                    {milestone.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    milestone.highlight
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--muted)]'
                  }`}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why I'm Building This */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
            Why I&apos;m building Alpha Mothers
          </h2>

          <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed">
            <p>
              During my first maternity leave, I experienced something no one warned me about:
              the mental load. Not just the physical exhaustion of caring for a newborn, but
              the constant cognitive burden of tracking, planning, worrying, anticipating—all
              while trying to figure out who I was becoming.
            </p>

            <p>
              I had apps for tracking feeds. Apps for tracking sleep. Apps for tracking my mood.
              But nothing that actually <em>helped</em>. Nothing that understood that I needed
              someone to talk to at 3am. Nothing that could capture the million things swirling
              in my brain without adding to the overwhelm.
            </p>

            <p>
              Now, on my second maternity leave, I&apos;m building what I wished existed:
              <span className="text-[var(--foreground)] font-medium"> an AI life partner that
              combines the empathy of a therapist with the practicality of an executive assistant.</span>
            </p>

            <p>
              I believe technology should reduce our mental load, not add to it. I believe
              mothers deserve support that meets them where they are—at 3am, mid-meltdown,
              or in the quiet moments when the guilt creeps in.
            </p>

            <p className="text-[var(--foreground)] font-medium text-xl">
              That&apos;s why I&apos;m building Alpha Mothers. And I&apos;m building it in public,
              because I know I&apos;m not the only one who needs this.
            </p>
          </div>
        </div>
      </section>

      {/* What I Write About */}
      <section className="py-20 bg-[var(--blush)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-12 text-center">
            What I explore here
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Mental Load</h3>
              <p className="text-[var(--muted)]">
                The invisible labor of motherhood. The constant background process running
                in our brains. The thing that exhausts us even when we&apos;re &quot;resting.&quot;
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Tech & Motherhood</h3>
              <p className="text-[var(--muted)]">
                How AI can actually help mothers—not just track data, but provide real support.
                Building technology that understands the complexity of our lives.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Raising Gen Alpha</h3>
              <p className="text-[var(--muted)]">
                Our kids are the first AI natives. How do we prepare them for a future
                we can&apos;t predict? How do we raise humans in an AI world?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
            Why &quot;Alpha Mothers&quot;?
          </h2>

          <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed">
            <p>
              My first child is Generation Alpha—the first generation born entirely in the
              21st century, growing up with AI as a natural part of their world. My second
              is Generation Beta, born into a world where AI is already everywhere.
            </p>

            <p>
              And I&apos;m their mother. A Millennial woman who came of age in the digital
              revolution and is now raising kids through the AI revolution.
            </p>

            <p>
              &quot;Alpha Mothers&quot; isn&apos;t about being the best or the most dominant. It&apos;s
              about being at the forefront of a new era of motherhood—raising the Alpha and Beta
              generations while figuring it out in real time, together.
            </p>
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
            Let&apos;s connect
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
            If any of this resonates with you, I&apos;d love to hear from you.
            Follow the journey, try Alpha, or just say hi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app" className="btn-primary">
              Try Alpha Mothers
            </Link>
            <Link href="/resources" className="btn-secondary">
              Read the Blog
            </Link>
            <a
              href="https://www.linkedin.com/in/shivi-agarwal-95b15537/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
