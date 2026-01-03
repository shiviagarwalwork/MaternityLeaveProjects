'use client';

import { BlogPost } from '@/data/blogs';
import { Clock, Tag, X, Share2 } from 'lucide-react';

interface BlogViewerProps {
  post: BlogPost;
  onClose: () => void;
}

export default function BlogViewer({ post, onClose }: BlogViewerProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--background)] bg-opacity-95 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={onClose}
              className="flex items-center text-[var(--accent-primary)] hover:opacity-80 font-medium"
            >
              ← Back to Blogs
            </button>
            <button
              onClick={handleShare}
              className="flex items-center text-[var(--accent-primary)] hover:opacity-80"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>

          {/* Blog Content */}
          <article className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-2xl">
            {/* Featured Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--background)] to-transparent p-8">
                <span className="inline-block bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-4 py-2 rounded-full text-sm font-bold mb-4">
                  {post.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Meta Info */}
            <div className="px-8 py-6 border-b-2 border-[var(--border-color)]">
              <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)]">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {post.readTime} read
                </div>
                <div>
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div>By {post.author}</div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-12">
              {/* Excerpt */}
              <p className="text-xl text-[var(--accent-primary)] font-medium mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-[var(--foreground)] mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t-2 border-[var(--border-color)]">
                <h3 className="text-sm font-bold text-[var(--foreground)] mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center bg-[var(--card-bg-light)] text-[var(--foreground)] px-4 py-2 rounded-full text-sm border-2 border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors"
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Close Button at Bottom */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Back to All Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
