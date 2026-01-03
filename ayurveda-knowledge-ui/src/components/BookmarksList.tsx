'use client';

import { useState, useEffect } from 'react';
import { Bookmark as BookmarkIcon, Trash2, Download } from 'lucide-react';
import { bookmarkService } from '@/services/bookmarkService';
import { Bookmark } from '@/types';

export default function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    setBookmarks(bookmarkService.getAll());
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this bookmark?')) {
      bookmarkService.remove(id);
      loadBookmarks();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all bookmarks?')) {
      bookmarkService.clear();
      loadBookmarks();
    }
  };

  const exportBookmarks = () => {
    const dataStr = JSON.stringify(bookmarks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ayurveda-bookmarks.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Saved Bookmarks</h2>
        <div className="flex space-x-2">
          {bookmarks.length > 0 && (
            <>
              <button
                onClick={exportBookmarks}
                className="text-sm bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--foreground)] px-3 py-2 rounded-lg hover:from-[var(--olive)] hover:to-[var(--olive-dark)] flex items-center"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
              <button
                onClick={handleClearAll}
                className="text-sm bg-red-600 text-[var(--foreground)] px-3 py-2 rounded-lg hover:bg-red-700"
              >
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <BookmarkIcon className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--foreground)]">No bookmarks saved yet.</p>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Save chats, manuscripts, or recommendations to access them later.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map(bookmark => (
            <div
              key={bookmark.id}
              className="border-2 border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--accent-primary)] transition-all bg-[var(--card-bg-light)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-xs bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-2 py-1 rounded-full mr-2 font-medium">
                      {bookmark.type}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {new Date(bookmark.savedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {bookmark.type === 'chat' && (
                    <div className="text-sm text-[var(--foreground)]">
                      <p className="line-clamp-3">{(bookmark.data as any).content}</p>
                    </div>
                  )}

                  {bookmark.type === 'manuscript' && (
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">
                        {(bookmark.data as any).title}
                      </h4>
                      <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
                        {(bookmark.data as any).englishText}
                      </p>
                    </div>
                  )}

                  {bookmark.type === 'recommendation' && (
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">
                        {(bookmark.data as any).title}
                      </h4>
                      <p className="text-sm text-[var(--text-muted)] mt-1">
                        {(bookmark.data as any).description}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="ml-4 text-[var(--error)] hover:opacity-80"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
