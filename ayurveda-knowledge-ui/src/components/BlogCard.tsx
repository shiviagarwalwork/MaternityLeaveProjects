'use client';

import { BlogPost } from '@/data/blogs';
import { Clock, Tag } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onClick?: () => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-white to-[var(--parchment-light)] rounded-xl overflow-hidden border-2 border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1"
    >
      {/* Manuscript Corner Ornaments */}
      <div className="absolute top-2 left-2 text-[var(--gold-leaf)] opacity-40 text-lg z-10">❧</div>
      <div className="absolute top-2 right-2 text-[var(--gold-leaf)] opacity-40 text-lg z-10 transform scale-x-[-1]">❧</div>
      <div className="absolute bottom-2 left-2 text-[var(--gold-leaf)] opacity-40 text-lg z-10 transform scale-y-[-1]">❧</div>
      <div className="absolute bottom-2 right-2 text-[var(--gold-leaf)] opacity-40 text-lg z-10 transform scale-[-1]">❧</div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Decorative gold border on image */}
        <div className="absolute inset-0 border-b-4 border-[var(--gold-leaf)] opacity-60"></div>
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {post.category}
          </span>
        </div>
        {/* Manuscript flourish overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Decorative line */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[var(--gold-leaf)] to-transparent opacity-50"></div>

        <h3 className="text-lg font-bold text-[var(--ink-black)] mb-3 group-hover:text-[var(--copper-brown)] transition-colors line-clamp-2" style={{fontFamily: 'Georgia, serif'}}>
          {post.title}
        </h3>

        <p className="text-[var(--ink-brown)] text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[var(--faded-ink)]">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime}
            </div>
            <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Tags with manuscript styling */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="flex items-center text-xs bg-[var(--parchment-dark)] text-[var(--ink-brown)] px-2 py-1 rounded-full border border-[var(--palm-leaf)]"
            >
              <span className="text-[var(--gold-leaf)] mr-1">❖</span>
              {tag}
            </span>
          ))}
        </div>

        {/* Read More with ornament */}
        <div className="mt-4 flex items-center text-[var(--copper-brown)] font-semibold text-sm group-hover:translate-x-2 transition-transform">
          <span className="mr-2">Read More</span>
          <span className="text-[var(--gold-leaf)]">→</span>
        </div>
      </div>
    </div>
  );
}
