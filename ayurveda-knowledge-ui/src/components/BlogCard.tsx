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
      className="group bg-[var(--card-bg-light)] rounded-xl overflow-hidden border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-[var(--foreground)] text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {post.readTime}
            </div>
            <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="flex items-center text-xs bg-[var(--olive-light)] bg-opacity-20 text-[var(--foreground)] px-2 py-1 rounded-full"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <div className="mt-4 text-[var(--accent-primary)] font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">
          Read More →
        </div>
      </div>
    </div>
  );
}
