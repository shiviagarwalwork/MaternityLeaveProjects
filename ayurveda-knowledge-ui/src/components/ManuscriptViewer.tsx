'use client';

import { useState } from 'react';
import { Manuscript } from '@/types';
import { ExternalLink, BookmarkPlus, Languages } from 'lucide-react';
import { bookmarkService } from '@/services/bookmarkService';

interface ManuscriptViewerProps {
  manuscript: Manuscript;
  onClose?: () => void;
}

export default function ManuscriptViewer({ manuscript, onClose }: ManuscriptViewerProps) {
  const [showSanskrit, setShowSanskrit] = useState(true);

  const handleBookmark = () => {
    bookmarkService.add({
      type: 'manuscript',
      data: manuscript
    });
    alert('Manuscript bookmarked!');
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--foreground)] px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{manuscript.title}</h2>
            <p className="text-sm opacity-90">{manuscript.source}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-[var(--foreground)] hover:text-[var(--foreground)]200 text-2xl ml-4"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category and Keywords */}
        <div className="mb-6">
          <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
            {manuscript.category}
          </span>
          {manuscript.keywords.slice(0, 3).map(keyword => (
            <span
              key={keyword}
              className="inline-block bg-[var(--card-bg-light)] text-[var(--foreground)] px-3 py-1 rounded-full text-xs mr-2"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* View Toggle */}
        {manuscript.sanskritText && (
          <div className="mb-4 flex items-center space-x-4">
            <button
              onClick={() => setShowSanskrit(!showSanskrit)}
              className="flex items-center text-sm text-[var(--accent-primary)] hover:opacity-80 font-medium"
            >
              <Languages className="w-4 h-4 mr-2" />
              {showSanskrit ? 'Hide Sanskrit' : 'Show Sanskrit'}
            </button>
          </div>
        )}

        {/* Side-by-side or Single View */}
        {manuscript.sanskritText && showSanskrit ? (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Sanskrit Text */}
            <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive-light)] bg-opacity-30 p-5 rounded-lg border-2 border-[var(--accent-secondary)]">
              <h3 className="text-sm font-bold text-[var(--accent-secondary)] mb-3 flex items-center">
                <Languages className="w-4 h-4 mr-2" />
                Sanskrit (Devanagari)
              </h3>
              <p className="text-[var(--foreground)] leading-relaxed text-lg font-serif">
                {manuscript.sanskritText}
              </p>
            </div>

            {/* English Translation */}
            <div className="bg-gradient-to-br from-[var(--card-bg-light)] to-[var(--olive)] bg-opacity-20 p-5 rounded-lg border-2 border-[var(--accent-primary)]">
              <h3 className="text-sm font-bold text-[var(--accent-primary)] mb-3">
                English Translation
              </h3>
              <p className="text-[var(--foreground)] leading-relaxed">
                {manuscript.englishText}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--card-bg-light)] p-5 rounded-lg border-2 border-[var(--border-color)] mb-6">
            <p className="text-[var(--foreground)] leading-relaxed">
              {manuscript.englishText}
            </p>
          </div>
        )}

        {/* Source Link */}
        <div className="mb-6">
          <a
            href={manuscript.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--accent-primary)] hover:opacity-80 font-medium"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Original Source
          </a>
        </div>

        {/* Related Manuscripts */}
        {manuscript.relatedManuscripts && manuscript.relatedManuscripts.length > 0 && (
          <div className="border-t border-[var(--border-color)] pt-4">
            <h4 className="font-bold text-[var(--foreground)] mb-3">Related Texts</h4>
            <div className="flex flex-wrap gap-2">
              {manuscript.relatedManuscripts.map(relatedId => (
                <span
                  key={relatedId}
                  className="bg-[var(--card-bg-light)] text-[var(--foreground)] px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-[var(--olive-light)]"
                >
                  {relatedId}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={handleBookmark}
            className="flex items-center bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--foreground)] px-4 py-2 rounded-lg hover:from-[var(--olive)] hover:to-[var(--olive-dark)]"
          >
            <BookmarkPlus className="w-4 h-4 mr-2" />
            Bookmark
          </button>
        </div>
      </div>
    </div>
  );
}
