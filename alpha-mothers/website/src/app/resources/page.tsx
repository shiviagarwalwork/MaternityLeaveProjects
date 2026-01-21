'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Vision', slug: 'vision' },
  { name: 'Raising Gen Alpha', slug: 'gen-alpha' },
  { name: 'Career', slug: 'career' },
  { name: 'Return to Work', slug: 'return-to-work' },
];

const posts = [
  {
    title: 'The Vision Behind Alpha Mothers',
    excerpt: "Being a career-oriented, high-achieving Millennial mom is a lot. And with AI changing the world at warp speed, the pressure is on to prepare them for a future we can barely imagine.",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'vision-behind-alpha-mothers',
    date: 'January 17, 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: true,
  },
  {
    title: 'The Old School Skills Your Child Needs to Thrive in the Age of AI',
    excerpt: "It's not just about teaching them to use AI tools; it's about giving them the foundational knowledge to understand how those tools work, to think critically, and to even create their own AI-powered solutions.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'old-school-skills-ai-age',
    date: 'March 1, 2025',
    image: '/images/Math blog.jpeg',
    featured: false,
  },
  {
    title: 'Tiny Humans, Big Tech: Sparking Curiosity About AI in Little Learners',
    excerpt: "My daughter's first word wasn't 'Mama' or 'Dada.' It was 'Hey Doodle!' We can introduce basic AI concepts to even the littlest learners in a way that's fun, engaging, and sparks their natural curiosity.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'tiny-humans-big-tech',
    date: 'February 20, 2025',
    image: '/images/TINY HIMANS.png',
    featured: false,
  },
  {
    title: 'Beyond ABCs: Raising Our Children for an AI-Powered Future',
    excerpt: "This isn't about turning our toddlers into tech wizards. It's about something much more fundamental: nurturing their humanity, the very essence that distinguishes us from machines.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'beyond-abcs-ai-future',
    date: 'February 15, 2025',
    image: '/images/BEYOND ABCS.png',
    featured: false,
  },
  {
    title: 'Raising a Toddler in 2025: Can I Keep Up with the AI Wave?',
    excerpt: "My days are a whirlwind of toddler tantrums, snack negotiations, and trying to keep my 3-year-old from turning on YouTube. But here's the twist: I'm also fascinated by AI.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'raising-toddler-2025',
    date: 'January 27, 2025',
    image: '/images/RAISING TODDLER.png',
    featured: false,
  },
  {
    title: "Parenting for 2035: Wait, What?!",
    excerpt: "Fast forward 10 years. What will life be like for our Alpha Generation kids? It's a wild future, right? But how do we prepare our kids for a world that's changing so fast?",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'parenting-for-2035',
    date: 'January 16, 2025',
    image: 'https://alphamothers.com/wp-content/uploads/2025/01/Designer-1.jpeg',
    featured: false,
  },
  {
    title: "Welcome Back! You've Got This",
    excerpt: "Today I met a new mom returning to work after mat leave, and it took me right back to my own experience two years ago. It's not about going back. It's about moving forward.",
    category: 'Return to Work',
    categorySlug: 'return-to-work',
    slug: 'welcome-back',
    date: 'January 6, 2025',
    image: 'https://alphamothers.com/wp-content/uploads/2025/01/1731349944136.jpeg',
    featured: false,
  },
  {
    title: 'Returning to Work? Know Your Worth',
    excerpt: "The conversation about your value doesn't start when you walk back through those office doors. It starts with how you see yourself.",
    category: 'Career',
    categorySlug: 'career',
    slug: 'know-your-worth',
    date: 'January 6, 2025',
    image: 'https://alphamothers.com/wp-content/uploads/2025/01/1731524235265.jpeg',
    featured: false,
  },
  {
    title: 'The Leadership Tightrope: A Mother\'s Perspective',
    excerpt: "Can I really balance the demands of a leadership role with my aspirations of raising a confident, curious, and loved child? These are questions I grapple with, and I know I'm not alone.",
    category: 'Career',
    categorySlug: 'career',
    slug: 'leadership-tightrope-mothers-perspective',
    date: 'January 2025',
    image: '/images/Leadership Tightrope.jpeg',
    featured: false,
  },
  {
    title: 'Why Self-Advocacy Is Essential for Your Career',
    excerpt: "Studies show that only 7% of women negotiated their first salary offer, compared to 57% of men. It's time to break the silence and step into your true power.",
    category: 'Career',
    categorySlug: 'career',
    slug: 'advocate-for-yourself',
    date: 'January 2025',
    image: '/images/communicate goals.jpeg',
    featured: false,
  },
  {
    title: 'A Letter to My Younger Self',
    excerpt: "Writing a letter to my younger self made me realize how far I've come and how much I've learned. Trust your gut—it knows what you truly want.",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'letter-to-my-younger-self',
    date: 'January 2025',
    image: 'https://alphamothers.com/wp-content/uploads/2025/01/1731349944136.jpeg',
    featured: false,
  },
  {
    title: 'Mom\'s Brain (This Is a Wild Place)',
    excerpt: "This is how my brain normally converses internally almost every evening—from her to work to self-reflection topics, even though I have so much help.",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'moms-brain-wild-place',
    date: 'January 2025',
    image: '/images/Moms brain.jpeg',
    featured: false,
  },
  {
    title: 'How Parenthood Transformed My Perspective',
    excerpt: "Suddenly, the future isn't just about my aspirations; it's about the world my child will inherit. Becoming a mother has redefined my purpose.",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'parenthood-transformed-perspective',
    date: 'January 2025',
    image: '/images/Becoming parent.jpeg',
    featured: false,
  },
  {
    title: 'Kensho and Satori: Two Paths to Personal Growth',
    excerpt: "Ever heard of kensho and satori? These terms offer two contrasting paths to personal growth—one through pain and the other through insight.",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'kensho-and-satori',
    date: 'January 2025',
    image: '/images/Kensho Satori.jpeg',
    featured: false,
  },
  {
    title: 'First-Time Mom Anxiety: Will My Career Survive?',
    excerpt: "That wave of fear when you find out you're expecting—not just about childbirth, but about losing yourself and all the hard-earned progress in your career.",
    category: 'Return to Work',
    categorySlug: 'return-to-work',
    slug: 'first-time-mom-career-anxiety',
    date: 'January 2025',
    image: '/images/Uncertainity of motherhood.jpeg',
    featured: false,
  },
  {
    title: 'Biology vs Career: Why Do We Have to Choose?',
    excerpt: "You're finally hitting your stride with your career. Things are happening! And then suddenly, it hits you: your biological clock is ticking.",
    category: 'Career',
    categorySlug: 'career',
    slug: 'biology-vs-career',
    date: 'January 2025',
    image: '/images/Birthday and age.jpeg',
    featured: false,
  },
  {
    title: 'Millennials Raising Alpha: A Unique Parenting Dynamic',
    excerpt: "Did you realize that Millennials are raising the first generation to be born entirely in the 21st century? It's a unique dynamic shaped by our upbringing and the digital world.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'millennials-raising-alpha',
    date: 'January 2025',
    image: '/images/milleniakls and alpha gen.jpeg',
    featured: false,
  },
  {
    title: 'Why the AI World Needs More Women',
    excerpt: "Women hold less than 20% of AI professional roles. This isn't just a statistic—it's a missed opportunity for building a truly inclusive future.",
    category: 'Career',
    categorySlug: 'career',
    slug: 'women-in-ai',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
  {
    title: 'Teaching Your Child to Fail Forward',
    excerpt: "In a world obsessed with success metrics, the most valuable skill we can teach our kids might be how to embrace failure as a stepping stone.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'teaching-fail-forward',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
  {
    title: 'The Guilt Trap: Why Perfect Motherhood Is a Myth',
    excerpt: "Mom guilt is real, pervasive, and exhausting. But what if the pursuit of perfect motherhood is actually holding us back from being the mothers our kids need?",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'guilt-trap-perfect-motherhood',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
  {
    title: 'Screen Time Boundaries: Finding the Balance',
    excerpt: "How much screen time is too much? Instead of rigid rules, here's a more nuanced approach to managing technology in your child's life.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'screen-time-boundaries',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
  {
    title: 'Rediscovering Your Identity Beyond Motherhood',
    excerpt: "Somewhere between the diaper changes and school runs, many of us lost sight of who we were before 'mom' became our primary identity.",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'identity-beyond-motherhood',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
  {
    title: 'Raising Emotionally Intelligent Kids in a Digital World',
    excerpt: "As AI gets better at mimicking human interaction, teaching our children genuine emotional intelligence becomes more crucial than ever.",
    category: 'Raising Gen Alpha',
    categorySlug: 'gen-alpha',
    slug: 'emotional-intelligence-digital-world',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
  {
    title: 'The Power of Saying No: Setting Boundaries at Work',
    excerpt: "As working mothers, we often feel we need to prove ourselves twice as hard. But learning to say no might be the most powerful career move you make.",
    category: 'Career',
    categorySlug: 'career',
    slug: 'power-of-saying-no',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
  {
    title: 'Building Your Village: Why Community Matters',
    excerpt: "They say it takes a village to raise a child. In our increasingly isolated world, here's how to intentionally build your support network.",
    category: 'Vision',
    categorySlug: 'vision',
    slug: 'building-your-village',
    date: 'January 2025',
    image: '/images/Alpha Mothers vision and logo.jpeg',
    featured: false,
  },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Vision': { bg: 'bg-[var(--primary-50)]', text: 'text-[var(--primary)]' },
  'Return to Work': { bg: 'bg-[#FDF5ED]', text: 'text-[var(--secondary-dark)]' },
  'Raising Gen Alpha': { bg: 'bg-[var(--sage-mist)]', text: 'text-[var(--accent)]' },
  'Career': { bg: 'bg-[var(--blush)]', text: 'text-[var(--primary)]' },
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const featuredPost = posts.find(post => post.featured);

  const filteredPosts = posts.filter(post => {
    if (activeCategory === 'all') return !post.featured;
    return post.categorySlug === activeCategory && !post.featured;
  });

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--cream)] to-[var(--blush)]">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
            Insights
          </h1>
          <p className="text-xl text-[var(--muted)] leading-relaxed">
            Thoughts on motherhood, career, mindset, and raising kids in the AI age.
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
                onClick={() => setActiveCategory(category.slug)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category.slug
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--cream)] text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-50)]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post - Only show when viewing all */}
      {featuredPost && activeCategory === 'all' && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-[var(--primary)] font-medium tracking-wide uppercase text-sm mb-6">
              Featured
            </p>
            <Link href={`/resources/${featuredPost.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="py-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[featuredPost.category]?.bg} ${categoryColors[featuredPost.category]?.text}`}>
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-[var(--muted)]">{featuredPost.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 group-hover:text-[var(--primary)] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center text-[var(--primary)] font-medium group-hover:gap-3 gap-2 transition-all">
                    Read article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16 bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
            {activeCategory === 'all' ? 'Latest Insights' : categories.find(c => c.slug === activeCategory)?.name}
          </h2>

          {filteredPosts.length === 0 ? (
            <p className="text-[var(--muted)] text-center py-12">
              No posts found in this category yet. Check back soon!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Link key={index} href={`/resources/${post.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[post.category]?.bg} ${categoryColors[post.category]?.text}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-[var(--muted)]">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[var(--muted)] text-sm leading-relaxed flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center text-[var(--primary)] font-medium text-sm mt-4 group-hover:gap-2 gap-1 transition-all">
                        Read more
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Join the Alpha Mothers Movement
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Bi-weekly inspiration, practical parenting strategies, and support for
            high-achieving women balancing careers with raising future-ready children in the AI era.
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
