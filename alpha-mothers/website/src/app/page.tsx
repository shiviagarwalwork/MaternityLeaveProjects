import Link from 'next/link';
import Image from 'next/image';
import { Heart, Bot, Briefcase, Baby } from 'lucide-react';

// Blog posts from alphamothers.com
const blogPosts = [
  {
    title: "The Vision Behind Alpha Mothers",
    excerpt: "Being a career-oriented, high-achieving Millennial mom is a lot. And with AI changing the world at warp speed, the pressure is on to prepare them for a future we can barely imagine.",
    slug: "vision-behind-alpha-mothers",
  },
  {
    title: "Parenting for 2035: Wait, What?!",
    excerpt: "Fast forward 10 years. What will life be like for our Alpha Generation kids? It's a wild future, right? But how do we prepare our kids for a world that's changing so fast?",
    slug: "parenting-for-2035",
  },
  {
    title: "Welcome Back! You've Got This",
    excerpt: "Today I met a new mom returning to work after mat leave, and it took me right back to my own experience two years ago. It's not about going back. It's about moving forward.",
    slug: "welcome-back",
  },
  {
    title: "Returning to Work? Know Your Worth",
    excerpt: "The conversation about your value doesn't start when you walk back through those office doors. It starts with how you see yourself.",
    slug: "know-your-worth",
  },
];

const appFeatures = [
  {
    title: 'Daily Check-ins',
    description: 'A 30-second mood and energy assessment that tracks your mental state without overwhelming you.',
    icon: Heart,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--primary-50)]',
  },
  {
    title: 'AI Companion',
    description: 'Get personalized support and pattern insights at any hour—even at 3am when the racing thoughts won\'t stop.',
    icon: Bot,
    color: 'text-[var(--accent)]',
    bgColor: 'bg-[var(--sage-mist)]',
  },
  {
    title: 'Return-to-Work Guides',
    description: 'Transition timelines, confidence exercises, and scripts for negotiating flexibility.',
    icon: Briefcase,
    color: 'text-[var(--secondary-dark)]',
    bgColor: 'bg-[#FDF5ED]',
  },
  {
    title: 'Gen Alpha Resources',
    description: 'Age-appropriate AI literacy guides, screen time wisdom, and family tech agreements.',
    icon: Baby,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--blush)]',
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Personal & Authentic */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[var(--primary-light)] opacity-10 blob blob-animate" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--secondary)] opacity-10 blob blob-animate" style={{ animationDelay: '-4s' }} />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo */}
            <div className="flex-shrink-0 animate-fade-in">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/images/WhatsApp Image 2026-01-14 at 01.14.12.jpeg"
                  alt="Shivi Agarwal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <p className="text-[var(--primary)] font-medium mb-4 animate-fade-in">
                Hi, I&apos;m Shivi Agarwal
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight mb-6 animate-fade-in-up">
                Are you a Millennial mom raising an Alpha Gen child while navigating a demanding career?
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted)] mb-8 animate-fade-in-up delay-200 leading-relaxed">
                You&apos;re not alone. And you don&apos;t have to figure this out by yourself.
              </p>
              <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/about" className="btn-primary">
                  Read My Story
                </Link>
                <Link href="/app" className="btn-secondary">
                  Explore the App
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality - Personal Story */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              I&apos;ve been there.
            </h2>
          </div>

          <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed">
            <p>
              Today I met a new mom returning to work after mat leave, and it took me right back to my own
              experience two years ago. I remember that mix of emotions – excitement, nervousness, and this
              overwhelming urge to prove I could still &quot;do it all.&quot;
            </p>
            <p>
              Being a career-oriented, high-achieving Millennial mom is <em>a lot</em>. And with AI changing
              the world at warp speed, the pressure is on to prepare our kids for a future we can barely imagine.
            </p>
            <p>
              We&apos;re caught between two worlds: trying to advance in careers that were designed for people
              without caregiving responsibilities, while also wanting to be present for our children during
              the most formative years of their lives.
            </p>
            <p className="text-[var(--foreground)] font-medium">
              I created Alpha Mothers because I believe in the right to seek a better quality of life
              in the name of balance, self-esteem, and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* What This Space Is About */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              What I think about
            </h2>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              The conversations I wish more people were having.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--primary-50)] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Our Mental Health</h3>
              <p className="text-[var(--muted)]">
                The anxiety that keeps us up at 3am. The guilt we carry. The identity crisis
                no one warned us about. Let&apos;s talk about it honestly.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FDF5ED] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--secondary-dark)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Returning to Work</h3>
              <p className="text-[var(--muted)]">
                That transition back is harder than anyone admits. The imposter syndrome.
                The pumping logistics. The guilt. You&apos;ve got this—and you don&apos;t have to pretend it&apos;s easy.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--sage-mist)] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Raising the AI Generation</h3>
              <p className="text-[var(--muted)]">
                Our kids will graduate into a world we can barely imagine. How do we prepare them
                for jobs that don&apos;t exist yet? How do we raise them to be human in an AI world?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The App Preview */}
      <section className="py-20 bg-[var(--blush)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              Support in your pocket
            </h2>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              The Alpha Mothers app is your companion through the journey—from mental health check-ins
              to return-to-work guides to raising kids in the AI age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {appFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/app" className="btn-primary">
              Learn More About the App
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts / Thoughts */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              Recent Thoughts
            </h2>
            <p className="text-xl text-[var(--muted)]">
              Things I&apos;ve been writing about lately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={index}
                href="/resources"
                className="bg-[var(--cream)] rounded-2xl p-8 hover:shadow-lg transition-shadow group"
              >
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 group-hover:text-[var(--primary)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-[var(--primary)] font-medium">
                  Read more →
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/resources" className="btn-secondary">
              See All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* The Question */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-8">
            Parenting for 2035: Wait, What?!
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
            It&apos;s a wild future, right? Our children are the first true &quot;AI natives.&quot;
            They&apos;ll grow up with artificial intelligence as naturally as we grew up with the internet.
          </p>
          <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
            But how do we prepare our kids for a world that&apos;s changing so fast?
            How do we teach them to think critically when AI can answer any question?
            How do we help them stay human in an increasingly digital world?
          </p>
          <p className="text-lg text-[var(--foreground)] font-medium">
            These are the questions I&apos;m exploring. I don&apos;t have all the answers—
            but I believe we can figure it out together.
          </p>
        </div>
      </section>

      {/* Coaching - Soft Mention */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
                Sometimes we need someone to talk to
              </h2>
              <p className="text-lg text-[var(--muted)] mb-6 leading-relaxed">
                I offer coaching for mothers navigating the intersection of career, family,
                and personal identity. Not advice from a textbook—real conversations about
                what you&apos;re actually going through.
              </p>
              <p className="text-lg text-[var(--muted)] mb-8 leading-relaxed">
                Training your top soft skills to create a happier mindset, more significant
                commitment, and success—on your own terms.
              </p>
              <Link href="/community" className="btn-secondary">
                Join Our Community
              </Link>
            </div>
            <div className="bg-[var(--cream)] rounded-2xl p-8 shadow-sm">
              <blockquote className="text-lg text-[var(--foreground)] italic leading-relaxed">
                &ldquo;We believe in the right to seek a better quality of life in the name of
                balance, self-esteem, and personal growth.&rdquo;
              </blockquote>
              <p className="mt-4 text-[var(--primary)] font-medium">— Shivi Agarwal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 bg-[var(--blush)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
            You&apos;re not alone in this
          </h2>
          <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
            Alpha Mothers is a space for Millennial moms who are figuring it out—
            the career, the parenting, the mental health, the future. Together.
          </p>
          <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
            No judgment. No perfection. Just honest conversations about what it&apos;s really like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="btn-primary">
              About Alpha Mothers
            </Link>
            <Link href="/resources" className="btn-secondary">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter - Simple */}
      <section className="py-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Join the conversation
          </h2>
          <p className="text-white/80 mb-6">
            Occasional thoughts on motherhood, career, and raising kids in the AI age.
            No spam, no sales pitches—just real talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-5 py-3 rounded-full text-[var(--foreground)] focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-[var(--primary)] font-medium rounded-full hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
