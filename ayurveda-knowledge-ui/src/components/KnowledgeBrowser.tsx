'use client';

import { useState } from 'react';
import { manuscripts, getAllCategories, getManuscriptsByCategory } from '@/data/manuscripts';
import { Manuscript } from '@/types';
import { BookOpen, Search, Filter } from 'lucide-react';
import ManuscriptViewer from './ManuscriptViewer';

export default function KnowledgeBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);

  const categories = getAllCategories();

  const getFilteredManuscripts = (): Manuscript[] => {
    let filtered = selectedCategory
      ? getManuscriptsByCategory(selectedCategory)
      : manuscripts;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.englishText.toLowerCase().includes(query) ||
        m.keywords.some(k => k.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const filteredManuscripts = getFilteredManuscripts();

  if (selectedManuscript) {
    return (
      <ManuscriptViewer
        manuscript={selectedManuscript}
        onClose={() => setSelectedManuscript(null)}
      />
    );
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Knowledge Browser</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
          <input
            type="text"
            placeholder="Search manuscripts, keywords, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--card-bg-light)] text-[var(--foreground)]"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Filter className="w-4 h-4 mr-2 text-[var(--text-muted)]" />
          <h3 className="font-semibold text-[var(--foreground)]">Filter by Category</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)]'
                : 'bg-[var(--card-bg-light)] text-[var(--foreground)] hover:bg-[var(--olive-light)]'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)]'
                  : 'bg-[var(--card-bg-light)] text-[var(--foreground)] hover:bg-[var(--olive-light)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-[var(--text-muted)]">
        Showing {filteredManuscripts.length} manuscript{filteredManuscripts.length !== 1 ? 's' : ''}
      </div>

      {/* Manuscript Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredManuscripts.map(manuscript => (
          <div
            key={manuscript.id}
            onClick={() => setSelectedManuscript(manuscript)}
            className="border-2 border-[var(--border-color)] rounded-lg p-4 hover:border-[var(--accent-primary)] hover:shadow-md transition-all cursor-pointer bg-[var(--card-bg-light)]"
          >
            <div className="flex items-start mb-3">
              <BookOpen className="w-5 h-5 text-[var(--accent-primary)] mr-3 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold text-[var(--foreground)] mb-1">{manuscript.title}</h4>
                <p className="text-xs text-[var(--text-muted)]">{manuscript.source}</p>
              </div>
            </div>

            <p className="text-sm text-[var(--foreground)] mb-3 line-clamp-3">
              {manuscript.englishText}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs bg-gradient-to-r from-[var(--accent-primary)] to-[var(--olive)] text-[var(--background)] px-2 py-1 rounded-full font-medium">
                {manuscript.category}
              </span>
              <span className="text-xs text-[var(--accent-primary)] hover:opacity-80 font-medium">
                Read More →
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {manuscript.keywords.slice(0, 3).map(keyword => (
                <span
                  key={keyword}
                  className="text-xs bg-[var(--olive-light)] bg-opacity-30 text-[var(--foreground)] px-2 py-0.5 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredManuscripts.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
          <p className="text-[var(--foreground)]">No manuscripts found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className="mt-4 text-[var(--accent-primary)] hover:opacity-80 font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
