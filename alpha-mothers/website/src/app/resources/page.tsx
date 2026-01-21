import Link from 'next/link';

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Mental Health', slug: 'mental-health' },
  { name: 'Return to Work', slug: 'return-to-work' },
  { name: 'Raising Gen Alpha', slug: 'gen-alpha' },
  { name: 'Career', slug: 'career' },
];

const posts = [
  {
    title: 'The Vision Behind Alpha Mothers',
    excerpt: "Being a career-oriented, high-achieving Millennial mom is a lot. And with AI changing the world at warp speed, the pressure is on to prepare them for a future we can barely imagine.",
    category: 'Mental Health',
    slug: 'postpartum-anxiety',
  },
  {
    title: "Parenting for 2035: Wait, What?!",
    excerpt: "It's a wild future, right? But how do we prepare our kids for a world that's changing so fast?",
    category: 'Raising Gen Alpha',
    slug: 'ai-literacy-age',
  },
  {
    title: "Welcome Back! You've Got This",
    excerpt: "Today I met a new mom returning to work after mat leave, and it took me right back to my own experience two years ago. I remember that mix of emotions – excitement, nervousness, and this overwhelming urge to prove I could still 'do it all.'",
    category: 'Return to Work',
    slug: 'return-timeline',
  },
  {
    title: 'Returning to Work? Know Your Worth',
    excerpt: "The conversation about your value doesn't start when you walk back through those office doors. It starts with how you see yourself.",
    category: 'Career',
    slug: 'negotiating-promotions',
  },
  {
    title: 'Understanding Postpartum Anxiety',
    excerpt: "Postpartum anxiety affects up to 1 in 5 new mothers, yet it often goes unrecognized. Let's talk about what it actually looks like.",
    category: 'Mental Health',
    slug: 'postpartum-anxiety',
  },
  {
    title: "The 3am Spiral: When Your Mind Won't Stop",
    excerpt: "It's 3am. The baby is finally asleep. You should be sleeping too. But instead, your mind is racing with everything you need to do, everything you're worried about.",
    category: 'Mental Health',
    slug: '3am-spiral',
  },
  {
    title: 'Scripts for Negotiating Flexibility',
    excerpt: "Having 'the flexibility conversation' with your manager is one of the biggest anxieties about returning to work. Here's how to approach it.",
    category: 'Return to Work',
    slug: 'flexibility-scripts',
  },
  {
    title: "Beyond Screen Time Limits",
    excerpt: "Not all screen time is equal. 30 minutes of mindless scrolling affects a child differently than 30 minutes of creative coding.",
    category: 'Raising Gen Alpha',
    slug: 'screen-time-quality',
  },
  {
    title: 'How to Talk to Kids About AI',
    excerpt: "Having conversations about AI with your kids might feel intimidating. What if they ask something you don't know? Here's how to start.",
    category: 'Raising Gen Alpha',
    slug: 'ai-conversations',
  },
  {
    title: "The Guilt Trap",
    excerpt: "Guilt is the constant companion of working mothers. Guilt about missing bedtime. Guilt about being distracted during meetings. It's time to understand it—and release it.",
    category: 'Career',
    slug: 'career-guilt',
  },
  {
    title: "Managing Energy, Not Just Time",
    excerpt: "You've tried the time management hacks. You've tried the apps. Why do you still feel exhausted? The real resource to manage isn't time—it's energy.",
    category: 'Career',
    slug: 'energy-management',
  },
  {
    title: 'Building Critical Thinking in the AI Age',
    excerpt: "When AI can answer any question in seconds, why would children learn to think for themselves? This is the paradox of raising kids today.",
    category: 'Raising Gen Alpha',
    slug: 'critical-thinking',
  },
];

export default function ResourcesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            Blog
          </h1>
          <p className="text-xl text-[var(--muted)] leading-relaxed">
            Thoughts on motherhood, career, mental health, and raising kids in the AI age.
            No perfect answers—just honest exploration.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-[var(--border)] sticky top-16 bg-white z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.slug}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  category.slug === 'all'
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--cream)] text-[var(--muted)] hover:text-[var(--primary)]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {posts.map((post, index) => (
              <article key={index} className="border-b border-[var(--border)] pb-12 last:border-0">
                <Link href={`/resources/${post.slug}`} className="group block">
                  <span className="text-sm font-medium text-[var(--primary)] mb-2 block">
                    {post.category}
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[var(--muted)] leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-[var(--primary)] font-medium">
                    Read more →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[var(--cream)]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Get new posts in your inbox
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Occasional thoughts on motherhood, career, and raising kids in the AI age.
            No spam, just real talk.
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
