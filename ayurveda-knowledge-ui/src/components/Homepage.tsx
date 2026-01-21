'use client';

import { useState } from 'react';
import { blogPosts, getAllCategories } from '@/data/blogs';
import { BlogPost } from '@/data/blogs';
import BlogCard from './BlogCard';
import BlogViewer from './BlogViewer';
import { Sparkles, TrendingUp, BookOpen } from 'lucide-react';

export default function Homepage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getAllCategories();

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  if (selectedPost) {
    return <BlogViewer post={selectedPost} onClose={() => setSelectedPost(null)} />;
  }

  return (
    <div className="relative bg-gradient-to-br from-white via-[var(--parchment-light)] to-[var(--parchment)] rounded-xl shadow-lg p-6 md:p-8 border-2 border-[var(--palm-leaf)]">
      {/* Manuscript Corner Ornaments */}
      <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-2xl">❧</div>
      <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-x-[-1]">❧</div>
      <div className="absolute bottom-4 left-4 text-[var(--gold-leaf)] text-2xl transform scale-y-[-1]">❧</div>
      <div className="absolute bottom-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-[-1]">❧</div>

      {/* Hero Section */}
      <div className="text-center mb-12 relative">
        {/* Decorative top border */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-[var(--gold-leaf)]"></div>
          <span className="mx-4 text-[var(--gold-leaf)] text-xl">✿</span>
          <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-[var(--gold-leaf)]"></div>
        </div>

        <div className="flex items-center justify-center mb-4">
          <span className="text-[var(--gold-leaf)] text-2xl mr-3">❖</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--ink-black)]" style={{fontFamily: 'Georgia, serif'}}>
            Ancient Wisdom, Modern Life
          </h1>
          <span className="text-[var(--gold-leaf)] text-2xl ml-3">❖</span>
        </div>
        <p className="text-lg text-[var(--ink-brown)] max-w-3xl mx-auto leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
          Real talk about Ayurveda for real people. No gatekeeping, no Sanskrit you can't pronounce, just practical wellness wisdom that actually works.
        </p>
      </div>

      {/* Featured Badge */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-6 py-3 rounded-full shadow-lg">
          <BookOpen className="w-5 h-5 mr-2" />
          <span className="font-bold">Fresh content for curious minds</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-[var(--ink-black)] mb-4 uppercase tracking-wider flex items-center">
          <span className="text-[var(--gold-leaf)] mr-2">❖</span>
          Explore by Topic
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white shadow-lg'
                : 'bg-white text-[var(--ink-brown)] border-2 border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)]'
            }`}
          >
            All Posts ({blogPosts.length})
          </button>
          {categories.map(category => {
            const count = blogPosts.filter(p => p.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white shadow-lg'
                    : 'bg-white text-[var(--ink-brown)] border-2 border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)]'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--palm-leaf)] to-transparent"></div>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => setSelectedPost(post)}
          />
        ))}
      </div>

      {/* CTA Section with Manuscript Style */}
      <div className="mt-16 relative">
        {/* Decorative top border */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--gold-leaf)]"></div>
          <span className="mx-4 text-[var(--gold-leaf)]">❖ ❖ ❖</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--gold-leaf)]"></div>
        </div>

        <div className="text-center bg-gradient-to-br from-[var(--parchment-light)] to-white rounded-xl p-10 border-2 border-[var(--gold-leaf)] relative overflow-hidden">
          {/* Corner ornaments */}
          <div className="absolute top-3 left-3 text-[var(--gold-leaf)] opacity-50">✦</div>
          <div className="absolute top-3 right-3 text-[var(--gold-leaf)] opacity-50">✦</div>
          <div className="absolute bottom-3 left-3 text-[var(--gold-leaf)] opacity-50">✦</div>
          <div className="absolute bottom-3 right-3 text-[var(--gold-leaf)] opacity-50">✦</div>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--ink-black)] mb-4" style={{fontFamily: 'Georgia, serif'}}>
            Ready to dive deeper?
          </h2>
          <p className="text-[var(--ink-brown)] text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
            Our AI advisor can give you personalized recommendations based on these ancient principles. No two bodies are the same - find out what works for YOU.
          </p>
          <div className="flex items-center justify-center text-sm text-[var(--faded-ink)]">
            <span className="text-[var(--gold-leaf)] mr-2">←</span>
            Check out the tools in the sidebar to get started
          </div>
        </div>
      </div>
    </div>
  );
}
