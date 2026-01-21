'use client';

import { BlogPost } from '@/data/blogs';
import { Clock, Tag, X, Share2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface BlogViewerProps {
  post: BlogPost;
  onClose: () => void;
}

export default function BlogViewer({ post, onClose }: BlogViewerProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false);

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
    <div className="fixed inset-0 bg-[var(--parchment)] z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <button
              onClick={onClose}
              className="flex items-center text-[var(--copper-brown)] hover:text-[var(--henna)] font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Blogs
            </button>
            <button
              onClick={handleShare}
              className="flex items-center text-[var(--copper-brown)] hover:text-[var(--henna)] transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>

          {/* Blog Content - Manuscript Style */}
          <article className="relative bg-gradient-to-br from-white via-[var(--parchment-light)] to-[var(--parchment)] rounded-xl overflow-hidden shadow-2xl border-2 border-[var(--palm-leaf)]">
            {/* Manuscript Corner Ornaments */}
            <div className="absolute top-4 left-4 text-[var(--gold-leaf)] text-2xl z-20">❧</div>
            <div className="absolute top-4 right-4 text-[var(--gold-leaf)] text-2xl z-20 transform scale-x-[-1]">❧</div>

            {/* Featured Image */}
            <div
              className="relative h-80 md:h-96 overflow-hidden cursor-pointer group"
              onClick={() => setImageModalOpen(true)}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-black)]/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-white/80 text-[var(--ink-brown)] px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to view full
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg" style={{fontFamily: 'Georgia, serif'}}>
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Decorative Border Line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[var(--gold-leaf)] to-transparent"></div>

            {/* Meta Info */}
            <div className="px-6 md:px-8 py-4 bg-[var(--parchment-light)]/50 border-b border-[var(--palm-leaf)]">
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-[var(--faded-ink)]">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-[var(--copper-brown)]" />
                  {post.readTime} read
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--gold-leaf)] mr-2">❖</span>
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--gold-leaf)] mr-2">✦</span>
                  By {post.author}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 py-10 relative">
              {/* Decorative side borders */}
              <div className="absolute left-2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[var(--gold-leaf)]/30 to-transparent"></div>
              <div className="absolute right-2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[var(--gold-leaf)]/30 to-transparent"></div>

              {/* Drop Cap Style Excerpt */}
              <div className="relative mb-8 pl-4 border-l-4 border-[var(--gold-leaf)]">
                <span className="absolute -left-3 -top-2 text-5xl text-[var(--gold-leaf)] opacity-30" style={{fontFamily: 'Georgia, serif'}}>"</span>
                <p className="text-lg md:text-xl text-[var(--copper-brown)] font-medium leading-relaxed italic" style={{fontFamily: 'Georgia, serif'}}>
                  {post.excerpt}
                </p>
              </div>

              {/* Decorative Divider */}
              <div className="flex items-center justify-center my-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--palm-leaf)]"></div>
                <span className="mx-4 text-[var(--gold-leaf)] text-xl">✿</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--palm-leaf)]"></div>
              </div>

              {/* Main Content */}
              <div className="prose prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-[var(--ink-brown)] mb-6 leading-relaxed text-base md:text-lg" style={{fontFamily: 'Georgia, serif'}}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags with Manuscript Styling */}
              <div className="mt-12 pt-8 border-t border-[var(--palm-leaf)] relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--parchment-light)] px-4">
                  <span className="text-[var(--gold-leaf)]">❖ ❖ ❖</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--ink-black)] mb-4 uppercase tracking-wider">Topics Covered:</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center bg-gradient-to-r from-[var(--parchment-dark)] to-[var(--parchment)] text-[var(--ink-brown)] px-4 py-2 rounded-full text-sm border border-[var(--palm-leaf)] hover:border-[var(--gold-leaf)] transition-colors"
                    >
                      <span className="text-[var(--gold-leaf)] mr-2">✦</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Corner Ornaments */}
            <div className="absolute bottom-4 left-4 text-[var(--gold-leaf)] text-2xl transform scale-y-[-1]">❧</div>
            <div className="absolute bottom-4 right-4 text-[var(--gold-leaf)] text-2xl transform scale-[-1]">❧</div>
          </article>

          {/* Close Button at Bottom */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--copper-brown)] to-[var(--henna)] text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Blogs
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageModalOpen && (
        <div
          className="fixed inset-0 bg-[var(--ink-black)]/95 z-[60] flex items-center justify-center p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <button
            onClick={() => setImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-[var(--gold-leaf)] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
