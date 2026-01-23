import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Brain, Calendar, Users, Sparkles } from 'lucide-react';

// Example conversations to showcase the app
const conversations = [
  {
    context: "Morning overwhelm",
    userMessage: "I'm already exhausted and the day hasn't even started. The baby was up twice, I have a big presentation at 2, and I haven't even looked at my emails.",
    alphaResponse: "That sounds really hard. Let me help take some things off your plate. I looked at your inbox - out of 34 new emails, only 2 actually need you before your meeting. Your presentation is at 2pm, and you have a clear block from 10 to 12 for prep. Want me to mark you as 'focused' so people don't book over it?"
  },
  {
    context: "2am thoughts",
    userMessage: "I can't turn my brain off. I keep checking if she's breathing. I know it's irrational but I can't stop.",
    alphaResponse: "I'm glad you're talking to me right now instead of sitting alone with these thoughts. What you're describing - the constant checking, the inability to rest - this is really common in the postpartum period. It doesn't mean you're crazy. Your brain is trying to protect her so hard that it's hurting you."
  },
  {
    context: "Partner frustration",
    userMessage: "He got to go to the gym while I did everything with the kids. And then he comes home and says he's tired. TIRED.",
    alphaResponse: "I can hear the frustration. The imbalance isn't just about the gym - it's about what it represents. He got a break from parenthood while you were deep in it. This resentment, left unaddressed, will grow. What would fair look like to you?"
  }
];

const fiveLayers = [
  {
    title: 'Emotional Support',
    subtitle: 'Like a Therapist',
    description: 'Voice conversations anytime. Processes emotions, validates feelings. Remembers your story, struggles, and wins.',
    icon: MessageCircle,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--primary-50)]',
  },
  {
    title: 'Mental Load Capture',
    subtitle: 'Your Second Brain',
    description: 'Everything you mention gets captured automatically. To-dos, worries, ideas. You never have to write it down.',
    icon: Brain,
    color: 'text-[var(--accent)]',
    bgColor: 'bg-[var(--sage-mist)]',
  },
  {
    title: 'Active Management',
    subtitle: 'Executive Assistant',
    description: 'Email triage, calendar protection, meeting prep. AlphaMa handles the admin so you can focus on what matters.',
    icon: Calendar,
    color: 'text-[var(--secondary-dark)]',
    bgColor: 'bg-[#FDF5ED]',
  },
  {
    title: 'Family Coordination',
    subtitle: 'Household Manager',
    description: 'Task delegation to your partner via text. Shared lists, fair division suggestions, meal planning.',
    icon: Users,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--blush)]',
  },
  {
    title: 'Proactive Intelligence',
    subtitle: 'Life Manager',
    description: 'Anticipates needs before you ask. Pattern recognition. Connects the dots across all areas of your life.',
    icon: Sparkles,
    color: 'text-[var(--accent)]',
    bgColor: 'bg-[var(--sage-mist)]',
  },
];

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
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Problem-First */}
      <section className="relative min-h-[90vh] flex items-center">
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
                Your brain is running a constant background process.
              </h1>
              <p className="text-lg md:text-xl text-[var(--muted)] mb-8 animate-fade-in-up delay-200 leading-relaxed">
                Tracking. Anticipating. Planning. Worrying. Even when you&apos;re &quot;relaxing,&quot; the mental tabs are open.
                <br /><br />
                <span className="text-[var(--foreground)] font-medium">What if you could hand off the mental load to someone who actually understands?</span>
              </p>
              <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/app" className="btn-primary">
                  Meet AlphaMa
                </Link>
                <Link href="/about" className="btn-secondary">
                  Read My Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - Deep Understanding */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              The mental load isn&apos;t the tasks. It&apos;s REMEMBERING and MANAGING all the tasks.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { layer: 'Emotional', example: 'Guilt, anxiety, overwhelm, feeling unseen' },
              { layer: 'Cognitive', example: 'Remembering everything for everyone' },
              { layer: 'Administrative', example: 'Emails, forms, appointments, bills' },
              { layer: 'Coordination', example: 'Who\'s picking up? What\'s for dinner?' },
              { layer: 'Work', example: 'Meetings, deadlines, pumping schedules' },
              { layer: 'Self', example: 'Personal needs - always last priority' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-[var(--foreground)] mb-2">{item.layer}</h3>
                <p className="text-[var(--muted)] text-sm">{item.example}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl text-[var(--muted)] leading-relaxed mb-4">
              Therapy helps with feelings but doesn&apos;t handle logistics. Productivity apps add MORE to manage.
              To-do lists just remind you of everything you&apos;re not doing.
            </p>
            <p className="text-xl text-[var(--foreground)] font-medium">
              You don&apos;t need another app. You need a partner.
            </p>
          </div>
        </div>
      </section>

      {/* Alpha Introduction */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[var(--primary)] font-medium mb-4">Introducing</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              AlphaMa
            </h2>
            <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto leading-relaxed">
              Your AI life partner - a therapist, executive assistant, and family coordinator in one.
              Available 24/7 through natural voice conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[var(--primary-50)] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Talk, don&apos;t type.</h3>
              <p className="text-[var(--muted)] mb-4">
                She&apos;s already holding a baby. Voice-first means she can vent, plan, and delegate while
                nursing, cooking, or commuting.
              </p>
            </div>
            <div className="bg-[var(--sage-mist)] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Remembers everything.</h3>
              <p className="text-[var(--muted)] mb-4">
                No more keeping it all in her head. AlphaMa captures to-dos, worries, ideas, and appointments
                from conversation - and handles them.
              </p>
            </div>
            <div className="bg-[#FDF5ED] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Therapist + Assistant.</h3>
              <p className="text-[var(--muted)] mb-4">
                Emotional support AND practical help. Process the guilt AND delegate the tasks.
                AlphaMa does both.
              </p>
            </div>
            <div className="bg-[var(--blush)] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Actually does things.</h3>
              <p className="text-[var(--muted)] mb-4">
                Texts your partner about diaper runs. Blocks focus time on your calendar.
                Drafts the email. AlphaMa takes action.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/app" className="btn-primary">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Example Conversations */}
      <section className="py-20 bg-[var(--blush)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              What talking to AlphaMa actually looks like
            </h2>
            <p className="text-xl text-[var(--muted)]">
              Real conversations. Real support. At any hour.
            </p>
          </div>

          <div className="space-y-8">
            {conversations.map((convo, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <p className="text-sm text-[var(--primary)] font-medium mb-4">{convo.context}</p>

                {/* User message */}
                <div className="flex justify-end mb-4">
                  <div className="bg-[var(--primary)] text-white rounded-2xl rounded-br-md px-5 py-3 max-w-[80%]">
                    <p className="text-sm">&quot;{convo.userMessage}&quot;</p>
                  </div>
                </div>

                {/* Alpha response */}
                <div className="flex justify-start">
                  <div className="bg-[var(--cream)] rounded-2xl rounded-bl-md px-5 py-3 max-w-[80%]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src="/images/Alpha Mothers vision and logo.jpeg"
                          alt="AlphaMa"
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-[var(--primary)]">AlphaMa</span>
                    </div>
                    <p className="text-sm text-[var(--foreground)]">&quot;{convo.alphaResponse}&quot;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/app" className="btn-primary">
              Start Talking to AlphaMa
            </Link>
          </div>
        </div>
      </section>

      {/* Five Layers */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              Five layers of support
            </h2>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
              More than a chatbot. More than an assistant. AlphaMa is a complete life partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fiveLayers.map((layer, index) => {
              const IconComponent = layer.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${layer.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${layer.color}`} strokeWidth={1.5} />
                  </div>
                  <p className="text-xs text-[var(--muted)] font-medium uppercase tracking-wide mb-1">{layer.subtitle}</p>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{layer.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{layer.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Personal Story */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              I built this because I needed it.
            </h2>
          </div>

          <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed">
            <p>
              I&apos;m currently on maternity leave, and let me tell you - the mental load is real.
              Even when I&apos;m supposed to be &quot;off,&quot; my brain is running a constant background process:
              tracking feeds, worrying about milestones, managing the household, and already thinking about
              what returning to work will look like.
            </p>
            <p>
              We&apos;re caught between two worlds: ambitious careers that were designed for people
              without caregiving responsibilities, and wanting to be fully present for our children during
              the most precious (and exhausting) moments of their lives.
            </p>
            <p className="text-[var(--foreground)] font-medium">
              The mental load isn&apos;t about being organized enough or trying harder. It&apos;s about
              needing real support - someone (or something) that can carry some of it with you.
            </p>
            <p>
              That&apos;s why I&apos;m building Alpha Mothers.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link href="/about" className="btn-secondary">
              Read My Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts / Thoughts */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
              What I&apos;m thinking about
            </h2>
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
                  Read more
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            You don&apos;t have to carry it all alone.
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            AlphaMa handles the mental load so you can be present.
            For yourself. For your family. For what actually matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app" className="inline-flex items-center px-8 py-4 bg-white text-[var(--primary)] font-medium rounded-full hover:bg-white/90 transition-colors">
              Download Alpha Mothers
            </Link>
            <Link href="/community" className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[var(--cream)]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Join the conversation
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Occasional thoughts on motherhood, mental load, and building technology that actually helps.
            No spam. No toxic positivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-5 py-3 rounded-full border border-[var(--border)] focus:outline-none focus:border-[var(--primary)]"
            />
            <button className="px-6 py-3 bg-[var(--primary)] text-white font-medium rounded-full hover:bg-[var(--primary-dark)] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
