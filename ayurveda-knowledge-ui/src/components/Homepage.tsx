'use client';

import { useState } from 'react';
import { blogPosts, getAllCategories } from '@/data/blogs';
import { BlogPost } from '@/data/blogs';
import BlogCard from './BlogCard';
import BlogViewer from './BlogViewer';
import { Sparkles, TrendingUp } from 'lucide-react';

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
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6 md:p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-[var(--accent-primary)] mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--olive)] bg-clip-text text-transparent">
            Ancient Wisdom, Modern Life
          </h1>
          <Sparkles className="w-8 h-8 text-[var(--accent-primary)] ml-3" />
        </div>
        <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
          Real talk about Ayurveda for real people. No gatekeeping, no Sanskrit you can't pronounce, just practical wellness wisdom that actually works.
        </p>
      </div>

      {/* Featured Badge */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-6 py-3 rounded-full shadow-lg">
          <TrendingUp className="w-5 h-5 mr-2" />
          <span className="font-bold">Fresh content for curious minds</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-[var(--foreground)] mb-4 uppercase tracking-wide">
          Explore by Topic
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] shadow-lg scale-105'
                : 'bg-[var(--card-bg-light)] text-[var(--foreground)] border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)]'
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
                    ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] shadow-lg scale-105'
                    : 'bg-[var(--card-bg-light)] text-[var(--foreground)] border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)]'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
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

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-20 rounded-2xl p-12 border-2 border-[var(--accent-primary)]">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
          Ready to dive deeper? 🌿
        </h2>
        <p className="text-[var(--text-muted)] text-lg mb-6 max-w-2xl mx-auto">
          Our AI advisor can give you personalized recommendations based on these ancient principles. No two bodies are the same - find out what works for YOU.
        </p>
        <div className="text-sm text-[var(--foreground)] opacity-75">
          ← Check out the tools in the sidebar to get started
        </div>
      </div>
    </div>
  );
}
