import Link from 'next/link';
import Image from 'next/image';
import {
  MessageCircle, Brain, Calendar, Users, Sparkles,
  Mic, CheckCircle2, Mail, Clock, Heart
} from 'lucide-react';

// Extended conversations for the app page
const fullConversations = [
  {
    title: "Morning Overwhelm",
    context: "Sarah, 34, returning to work after maternity leave. Baby was up twice, big presentation today.",
    exchanges: [
      {
        role: 'user',
        message: "I'm already exhausted and the day hasn't even started. The baby was up twice, I have that big presentation at 2, and I haven't even looked at my emails. I feel like I'm drowning."
      },
      {
        role: 'alpha',
        message: "That sounds really hard. Two wake-ups plus a big presentation day - that's a lot to carry into the morning.\n\nLet me help take some things off your plate so you can focus on what matters today.\n\nI looked at your inbox - out of 34 new emails, only 2 actually need you before your meeting: one from David about the slide deck, and a quick approval from finance. Everything else can wait until tomorrow.\n\nYour presentation is at 2pm, and I see you have a clear block from 10 to 12 - that's solid prep time. Want me to mark you as 'focused' so people don't book over it?"
      },
      {
        role: 'user',
        message: "Yes to all of that. God, thank you. What was David's email about?"
      },
      {
        role: 'alpha',
        message: "David wants to know if you're keeping slide 7 about Q3 projections or replacing it with the updated numbers. I can draft a quick response if you tell me which way you're leaning."
      },
      {
        role: 'user',
        message: "Updated numbers. Can you handle it?"
      },
      {
        role: 'alpha',
        message: "Done. I'll send: 'Going with updated Q3 numbers. Will have revised slide by 11am.' Sound good?\n\nOne more thing - you have 15 minutes before you need to leave. The bottle for daycare is prepped, right? I know you mentioned worrying about forgetting it."
      },
    ]
  },
  {
    title: "2am Postpartum Anxiety",
    context: "Rachel, 31, 3 months postpartum, experiencing anxiety she's never felt before.",
    exchanges: [
      {
        role: 'user',
        message: "I can't turn my brain off. I keep checking if she's breathing. I know it's crazy but I can't stop. I'm so tired but I can't sleep because what if something happens."
      },
      {
        role: 'alpha',
        message: "Rachel, I'm glad you're talking to me right now instead of sitting alone with these thoughts.\n\nWhat you're describing - the constant checking, the inability to rest even when she's sleeping, the intrusive worries - this is really common in the postpartum period. It doesn't mean you're crazy. It means your brain is trying to protect her so hard that it's hurting you.\n\nCan I ask: how long has this been going on?"
      },
      {
        role: 'user',
        message: "Since we came home from the hospital. It's getting worse, not better. Everyone says the newborn phase is hard but this feels... different. Like I'm constantly on the edge of panic."
      },
      {
        role: 'alpha',
        message: "I hear you. And I want you to know - what you're describing sounds like it might be postpartum anxiety. It's different from the general 'newborn phase is hard' that people talk about. It's a real condition, it's treatable, and it's not your fault.\n\nRachel, I'm not a doctor, but based on what you're telling me, I really think talking to your OB or midwife would help. There are treatments - therapy, sometimes medication - that can turn down the alarm bells and let you actually rest.\n\nWould you be willing to call them tomorrow?"
      },
      {
        role: 'user',
        message: "I don't even know what I would say."
      },
      {
        role: 'alpha',
        message: "You could say exactly what you told me: 'I'm having trouble sleeping even when the baby sleeps because I can't stop worrying something will happen. It's been going on since we came home and it's getting worse, not better.'\n\nThat's enough. They'll know what questions to ask.\n\nWant me to add it to your morning? Just a simple task: 'Call OB office - mention anxiety and sleep.' I can remind you at 9am when they open."
      },
    ]
  },
  {
    title: "Sunday Night Planning",
    context: "Priya, 36, looking at an overwhelming week ahead.",
    exchanges: [
      {
        role: 'user',
        message: "Okay I'm looking at this week and I'm already stressed. I have back-to-backs Monday and Tuesday, Aria has a doctor's appointment Wednesday that I forgot to arrange coverage for, I'm supposed to bring something to the school bake sale Friday, and somewhere in there I need to actually do my job. Help."
      },
      {
        role: 'alpha',
        message: "Okay, let's untangle this together. First - just hearing you list all that, I want you to know: the stress makes sense. This IS a lot. But we're going to make it manageable.\n\nLet me go through each one:\n\n• Monday/Tuesday back-to-backs: I'm going to block 15 minutes before your noon meetings both days so you can breathe. Non-negotiable sanity breaks.\n\n• Aria's appointment Wednesday 10am: You need someone to cover the morning. Is this a partner day or do we need backup?\n\n• Bake sale Friday: What's the easiest path here? Store-bought that looks homemade? I can find options near your office."
      },
      {
        role: 'user',
        message: "The bake sale - honestly I don't have time to bake. Is that terrible?"
      },
      {
        role: 'alpha',
        message: "Not even a little bit. 90% of bake sale items are store-bought anyway. There's a bakery near your office - 'Sweet Maple' - that does mini muffins that look homemade. I can add 'pick up muffins' to your Thursday tasks with the address. Done.\n\nWhat about Wednesday coverage?"
      },
      {
        role: 'user',
        message: "My mom could probably help but I hate asking her. She always makes comments about how I 'do too much.'"
      },
      {
        role: 'alpha',
        message: "So the ask comes with emotional tax. That's real. Would it help to frame it as a 'grandma morning' rather than 'I need help'? Like, 'Mom, Aria has a checkup but I thought maybe you'd want to take her to breakfast after?'\n\nFlips the script a bit. Want me to draft a text to her?"
      },
    ]
  },
];

const fiveLayers = [
  {
    title: 'Emotional Support',
    subtitle: 'Like a Therapist',
    description: 'Voice conversations anytime you need them. AlphaMa processes emotions, validates feelings, and remembers your story. Uses therapeutic techniques without feeling clinical.',
    icon: MessageCircle,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--primary-50)]',
    features: ['24/7 voice conversations', 'Remembers your history', 'Validates without judgment', 'Therapeutic techniques'],
  },
  {
    title: 'Mental Load Capture',
    subtitle: 'Your Second Brain',
    description: 'Everything you mention in conversation gets captured automatically. To-dos, worries, ideas, appointments. You NEVER have to write it down or open another app.',
    icon: Brain,
    color: 'text-[var(--accent)]',
    bgColor: 'bg-[var(--sage-mist)]',
    features: ['Auto-captures from conversation', 'Organizes by type', 'Reminds at the right time', 'Reduces cognitive burden'],
  },
  {
    title: 'Active Management',
    subtitle: 'Executive Assistant',
    description: 'AlphaMa triages your inbox, protects your calendar, and preps you for meetings. "You have 47 emails. 3 actually need you today."',
    icon: Calendar,
    color: 'text-[var(--secondary-dark)]',
    bgColor: 'bg-[#FDF5ED]',
    features: ['Email triage', 'Calendar protection', 'Meeting prep', 'Smart prioritization'],
  },
  {
    title: 'Family Coordination',
    subtitle: 'Household Manager',
    description: 'Creates shareable task lists. Suggests fair division with your partner. Sends tasks directly via text. Shared calendar management.',
    icon: Users,
    color: 'text-[var(--primary)]',
    bgColor: 'bg-[var(--blush)]',
    features: ['Task delegation via text', 'Fair division suggestions', 'Shared family calendar', 'Meal planning'],
  },
  {
    title: 'Proactive Intelligence',
    subtitle: 'Life Manager',
    description: 'Anticipates needs before you ask. "Baby\'s 6-month checkup is due. I found 3 slots near you." Pattern recognition and life admin automation.',
    icon: Sparkles,
    color: 'text-[var(--accent)]',
    bgColor: 'bg-[var(--sage-mist)]',
    features: ['Anticipates needs', 'Pattern recognition', 'Life admin automation', 'Connects the dots'],
  },
];

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Try Alpha Mothers and see how it helps',
    features: [
      '5 voice conversations per week',
      'Basic mental load capture',
      '7-day conversation history',
      'Community access',
    ],
    cta: 'Download Free',
    highlighted: false,
  },
  {
    name: 'AlphaMa Pro',
    price: '$19',
    period: '/month',
    description: 'Full AlphaMa experience for you',
    features: [
      'Unlimited voice conversations',
      'Complete memory & history',
      'Calendar integration',
      'Email triage & summaries',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'AlphaMa Family',
    price: '$39',
    period: '/month',
    description: 'Coordinate with your partner',
    features: [
      'Everything in Pro',
      'Partner access & linking',
      'Task delegation via SMS',
      'Shared family calendar',
      'Fair division suggestions',
      'Meal planning',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
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
                Meet AlphaMa
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
                Your AI <span className="gradient-text">life partner</span>
              </h1>
              <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
                A therapist, executive assistant, and family coordinator in one.
                Available 24/7 through natural voice conversation.
                <br /><br />
                <span className="text-[var(--foreground)] font-medium">AlphaMa handles the mental load so you can be present.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#download" className="btn-primary inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Download for iOS
                </Link>
                <Link href="#download" className="btn-secondary">
                  Download for Android
                </Link>
              </div>
              <p className="text-sm text-[var(--muted)] mt-4">
                Free to start. No credit card required.
              </p>
            </div>

            {/* Phone Mockup - Updated */}
            <div className="relative flex justify-center">
              <div className="w-[300px] h-[620px] bg-[var(--foreground)] rounded-[50px] p-4 shadow-2xl">
                <div className="w-full h-full bg-[var(--cream)] rounded-[38px] overflow-hidden flex flex-col">
                  {/* App Header */}
                  <div className="p-5 bg-white/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src="/images/Alpha Mothers vision and logo.jpeg"
                          alt="AlphaMa"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[var(--foreground)]">AlphaMa</p>
                        <p className="text-xs text-[var(--muted)]">Your AI life partner</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-[var(--primary)] text-white rounded-2xl rounded-br-md px-4 py-2 max-w-[85%]">
                        <p className="text-sm">I&apos;m feeling so overwhelmed today...</p>
                      </div>
                    </div>

                    {/* Alpha response */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2 max-w-[85%] shadow-sm">
                        <p className="text-sm text-[var(--foreground)]">I hear you. Tell me what&apos;s weighing on you most right now.</p>
                      </div>
                    </div>

                    {/* Captured items bar */}
                    <div className="bg-white/80 rounded-xl p-3 mt-4">
                      <p className="text-xs text-[var(--muted)] mb-2">On your mind today</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-[var(--primary-50)] text-[var(--primary)] text-xs px-2 py-1 rounded-full">✓ Pediatrician</span>
                        <span className="bg-[var(--sage-mist)] text-[var(--accent)] text-xs px-2 py-1 rounded-full">💭 Daycare worry</span>
                        <span className="bg-[#FDF5ED] text-[var(--secondary-dark)] text-xs px-2 py-1 rounded-full">📅 Meeting 2pm</span>
                      </div>
                    </div>
                  </div>

                  {/* Voice Input */}
                  <div className="p-4 bg-white/50">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-center text-xs text-[var(--muted)] mt-2">Tap to talk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice-First Callout */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-[var(--primary-50)] flex items-center justify-center flex-shrink-0">
              <Mic className="w-12 h-12 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Talk, don&apos;t type.</h2>
              <p className="text-lg text-[var(--muted)]">
                She&apos;s already holding a baby. Or cooking dinner. Or pumping.
                AlphaMa is voice-first because typing isn&apos;t realistic when you have one hand free (maybe).
                Just talk - while nursing, commuting, or lying awake at 3am.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Five Layers Section */}
      <section className="py-24 bg-[var(--cream)]" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              How AlphaMa Helps
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Five layers of support
            </h2>
            <p className="text-xl text-[var(--muted)]">
              More than a chatbot. More than an assistant. AlphaMa is a complete life partner
              that handles the mental load across every dimension.
            </p>
          </div>

          <div className="space-y-12">
            {fiveLayers.map((layer, index) => {
              const IconComponent = layer.icon;
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="flex-1">
                    <div className={`w-16 h-16 rounded-2xl ${layer.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-8 h-8 ${layer.color}`} strokeWidth={1.5} />
                    </div>
                    <p className="text-sm text-[var(--muted)] font-medium uppercase tracking-wide mb-2">{layer.subtitle}</p>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">{layer.title}</h3>
                    <p className="text-lg text-[var(--muted)] mb-6">{layer.description}</p>
                    <ul className="space-y-2">
                      {layer.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${layer.color} flex-shrink-0`} />
                          <span className="text-[var(--foreground)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`flex-1 ${layer.bgColor} rounded-3xl p-8 min-h-[300px] flex items-center justify-center`}>
                    <IconComponent className={`w-32 h-32 ${layer.color} opacity-20`} strokeWidth={0.5} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Conversations Section */}
      <section className="py-24" id="conversations">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Real Conversations
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              What talking to AlphaMa looks like
            </h2>
            <p className="text-xl text-[var(--muted)]">
              AlphaMa combines the empathy of a therapist with the practicality of an executive assistant.
              Here are real examples of how AlphaMa helps.
            </p>
          </div>

          <div className="space-y-16">
            {fullConversations.map((convo, convoIndex) => (
              <div key={convoIndex} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{convo.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{convo.context}</p>
                </div>

                <div className="space-y-4">
                  {convo.exchanges.map((exchange, i) => (
                    <div key={i} className={`flex ${exchange.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {exchange.role === 'alpha' && (
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 mt-1">
                          <Image
                            src="/images/Alpha Mothers vision and logo.jpeg"
                            alt="AlphaMa"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className={`rounded-2xl px-5 py-3 max-w-[85%] ${
                        exchange.role === 'user'
                          ? 'bg-[var(--primary)] text-white rounded-br-md'
                          : 'bg-[var(--cream)] text-[var(--foreground)] rounded-bl-md'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{exchange.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[var(--blush)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Getting Started
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Simple as talking
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Download', description: 'Get AlphaMa from the App Store or Google Play. Create your account in seconds.', icon: Heart },
              { step: '2', title: 'Tell your story', description: 'Talk to AlphaMa about your life, your stage, your challenges. AlphaMa remembers everything.', icon: MessageCircle },
              { step: '3', title: 'Let AlphaMa help', description: 'Vent, plan, delegate. AlphaMa captures your mental load and takes action.', icon: Brain },
              { step: '4', title: 'Be present', description: 'With the mental load handled, you can actually be present for what matters.', icon: Sparkles },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-[var(--primary)]" strokeWidth={1.5} />
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

      {/* Pricing Section */}
      <section className="py-24" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-4">
              Pricing
            </p>
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-6">
              Start free. Upgrade when you&apos;re ready.
            </h2>
            <p className="text-xl text-[var(--muted)]">
              Try Alpha Mothers free and see how it helps. No credit card required.
              Upgrade to unlock the full experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`rounded-3xl p-8 ${
                  plan.highlighted
                    ? 'bg-[var(--primary)] text-white shadow-2xl scale-105'
                    : 'bg-white shadow-lg'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-[var(--foreground)]'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-[var(--foreground)]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-white/70' : 'text-[var(--muted)]'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-[var(--muted)]'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-[var(--accent)]'}`} />
                      <span className={`text-sm ${plan.highlighted ? 'text-white' : 'text-[var(--foreground)]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#download"
                  className={`block text-center py-3 px-6 rounded-full font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-white text-[var(--primary)] hover:bg-white/90'
                      : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--muted)] mt-8">
            Comparison: Therapy is $150/session. AlphaMa Pro is $19/month for unlimited support.
          </p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white" id="download">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to hand off the mental load?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Download Alpha Mothers and start talking. Be present for what actually matters.
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
            Free forever plan available. Upgrade anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
