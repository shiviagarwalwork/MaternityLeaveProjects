import { Bookmark } from '@/types';

const STORAGE_KEY = 'ayurveda_bookmarks';

export class BookmarkService {
  getAll(): Bookmark[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  add(bookmark: Omit<Bookmark, 'id' | 'savedAt'>): Bookmark {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: Date.now().toString(),
      savedAt: new Date()
    };

    const bookmarks = this.getAll();
    bookmarks.unshift(newBookmark);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));

    return newBookmark;
  }

  remove(id: string): void {
    const bookmarks = this.getAll().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  exists(type: string, dataId: string): boolean {
    const bookmarks = this.getAll();
    return bookmarks.some(b => {
      if (b.type !== type) return false;
      const id = (b.data as any).id;
      return id === dataId;
    });
  }

  clear(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

export const bookmarkService = new BookmarkService();
