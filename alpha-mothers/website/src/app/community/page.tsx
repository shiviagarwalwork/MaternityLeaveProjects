import Link from 'next/link';
import Image from 'next/image';
import {
  Users, MessageCircle, Sparkles, Heart,
  BookOpen, Lightbulb, Shield, Globe,
  ArrowRight, CheckCircle2
} from 'lucide-react';

const communityBenefits = [
  {
    icon: Users,
    title: 'Connect with Like-Minded Moms',
    description: 'Join a tribe of ambitious millennial mothers who understand the unique challenges of raising kids in the AI age while building careers.',
  },
  {
    icon: MessageCircle,
    title: 'Real Conversations',
    description: 'No judgment, no perfection. Share your struggles, celebrate wins, and get real advice from women walking the same path.',
  },
  {
    icon: BookOpen,
    title: 'Learn Together',
    description: 'From AI basics to parenting strategies, grow your knowledge through peer-to-peer learning and shared resources.',
  },
  {
    icon: Shield,
    title: 'Safe Space',
    description: 'A private, moderated community where you can be vulnerable, ask questions, and find support without fear.',
  },
];

const communityGroups = [
  {
    name: 'Alpha Moms - General',
    description: 'The main hub for all community members. Introductions, general discussions, and community updates.',
    members: 'All members',
    color: 'bg-[var(--primary-50)]',
    textColor: 'text-[var(--primary)]',
  },
  {
    name: 'AI & Tech Learning',
    description: 'For moms wanting to understand AI, learn tech skills, and prepare their kids for an AI-powered future.',
    members: 'Tech-curious moms',
    color: 'bg-[var(--sage-mist)]',
    textColor: 'text-[var(--accent)]',
  },
  {
    name: 'Career & Leadership',
    description: 'Discussions about career growth, leadership challenges, work-life balance, and professional development.',
    members: 'Working moms',
    color: 'bg-[#FDF5ED]',
    textColor: 'text-[var(--secondary-dark)]',
  },
  {
    name: 'Return to Work Support',
    description: 'Dedicated space for moms preparing to return to work or recently back from maternity leave.',
    members: 'Returning moms',
    color: 'bg-[var(--blush)]',
    textColor: 'text-[var(--primary)]',
  },
];

const whatYouGet = [
  'Weekly discussion prompts and topics',
  'Exclusive resources and guides',
  'Virtual meetups and events',
  'Direct access to community founders',
  'Early access to the Alpha Mothers app',
  'Partner discounts and perks',
];

export default function CommunityPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--secondary)] opacity-10 blob blob-animate" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
                Join the Movement
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
                Your village is<br />
                <span className="gradient-text">waiting for you</span>
              </h1>
              <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
                Connect with ambitious mothers who are navigating careers, raising Gen Alpha kids,
                and figuring out this whole AI thing together. Because you shouldn&apos;t have to do it alone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#join"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  Join the Community
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/resources" className="btn-secondary">
                  Read Our Blog
                </Link>
              </div>
              <p className="text-sm text-[var(--muted)] mt-4">
                Free to join. No spam. Real community.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/images/Alpha Mothers vision and logo.jpeg"
                      alt="Alpha Mothers"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)]">Alpha Mothers Community</h3>
                    <p className="text-sm text-[var(--muted)]">Where ambitious moms connect</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="bg-[var(--cream)] rounded-xl p-4">
                    <p className="text-sm text-[var(--foreground)]">
                      <span className="font-medium">Sarah:</span> Just got promoted while working 4 days a week!
                      Thank you all for the negotiation tips!
                    </p>
                  </div>
                  <div className="bg-[var(--sage-mist)] rounded-xl p-4">
                    <p className="text-sm text-[var(--foreground)]">
                      <span className="font-medium">Priya:</span> Anyone else struggling with screen time boundaries?
                      Would love to hear what&apos;s working for you...
                    </p>
                  </div>
                  <div className="bg-[var(--blush)] rounded-xl p-4">
                    <p className="text-sm text-[var(--foreground)]">
                      <span className="font-medium">Maya:</span> The AI workshop yesterday was amazing!
                      Finally understanding what my kid will grow up with.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)] border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-[var(--secondary)] border-2 border-white" />
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] border-2 border-white" />
                  </div>
                  <span>Join hundreds of Alpha Mothers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Why Join
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              More than just a group chat
            </h2>
            <p className="text-xl text-[var(--muted)]">
              A curated community of women who get it—the ambition, the challenges,
              the guilt, and the joy of raising the next generation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--primary-50)] flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[var(--primary)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{benefit.title}</h3>
                  <p className="text-[var(--muted)]">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Groups Section */}
      <section className="py-24 bg-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Community Channels
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Find your people
            </h2>
            <p className="text-xl text-[var(--muted)]">
              Our community is organized into focused groups so you can connect with
              mothers in similar situations and interests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {communityGroups.map((group, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${group.color} flex items-center justify-center flex-shrink-0`}>
                    <MessageCircle className={`w-6 h-6 ${group.textColor}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{group.name}</h3>
                    <p className="text-[var(--muted)] text-sm mb-2">{group.description}</p>
                    <span className={`text-xs font-medium ${group.textColor} ${group.color} px-2 py-1 rounded-full`}>
                      {group.members}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
                Membership Benefits
              </p>
              <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
                What you get as a member
              </h2>
              <p className="text-xl text-[var(--muted)] mb-8">
                Being part of the Alpha Mothers community gives you access to resources,
                connections, and support you won&apos;t find anywhere else.
              </p>
              <ul className="space-y-4">
                {whatYouGet.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--primary)] flex-shrink-0" strokeWidth={2} />
                    <span className="text-[var(--foreground)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8" strokeWidth={1.5} />
                <span className="text-xl font-bold">Founding Member</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Join Now - It&apos;s Free!</h3>
              <p className="text-white/80 mb-6">
                We&apos;re building this community together. Early members help shape what
                Alpha Mothers becomes. Your voice matters here.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/90">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">No cost to join</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Global community</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Lightbulb className="w-4 h-4" />
                  <span className="text-sm">Shape the future together</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 bg-[var(--cream)]" id="join">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
            Ready to find your village?
          </h2>
          <p className="text-xl text-[var(--muted)] mb-12">
            Choose your preferred platform to join the Alpha Mothers community.
            Same great community, your choice of where to connect.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* WhatsApp Option */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">WhatsApp Community</h3>
              <p className="text-[var(--muted)] text-sm mb-6">
                Quick, mobile-friendly conversations. Perfect for on-the-go moms who want
                instant connection.
              </p>
              <a
                href="https://chat.whatsapp.com/H0cLCmq7ijg1NpdXpZPwN9"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 bg-[#25D366] text-white font-medium rounded-full hover:bg-[#20BD5A] transition-colors"
              >
                Join WhatsApp Community
              </a>
            </div>

            {/* Slack Option */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#4A154B]/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Slack Workspace</h3>
              <p className="text-[var(--muted)] text-sm mb-6">
                Organized channels, threaded discussions, and easy file sharing.
                Great for deeper conversations.
              </p>
              <a
                href="https://join.slack.com/t/alphamothers/shared_invite/zt-3o7uufjia-FMc7EDMNgL47uQDqm~eZLw"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 bg-[#4A154B] text-white font-medium rounded-full hover:bg-[#3D1140] transition-colors"
              >
                Join Slack Workspace
              </a>
            </div>
          </div>

          <p className="text-sm text-[var(--muted)] mt-8">
            Not sure which to choose? Start with WhatsApp for quick access,
            or join both to get the full experience!
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Not ready to join yet?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Subscribe to our newsletter for bi-weekly insights on raising Gen Alpha,
            career tips, and community highlights.
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
