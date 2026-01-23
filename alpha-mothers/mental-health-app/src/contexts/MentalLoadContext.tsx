// Context for sharing mental load items between screens
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  loadMentalLoadItems,
  saveMentalLoadItems,
  StoredCapturedItem,
} from '../services/storage';

// Types
export interface MentalLoadItem extends StoredCapturedItem {}

interface MentalLoadContextType {
  items: MentalLoadItem[];
  addItem: (item: Omit<MentalLoadItem, 'id' | 'createdAt' | 'resolved'>) => void;
  addItems: (items: Omit<MentalLoadItem, 'id' | 'createdAt' | 'resolved'>[]) => void;
  toggleResolved: (id: string) => void;
  deleteItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<MentalLoadItem>) => void;
  getItemsByType: (type: MentalLoadItem['type']) => MentalLoadItem[];
  unresolvedCount: number;
  isLoading: boolean;
}

const MentalLoadContext = createContext<MentalLoadContextType | undefined>(undefined);

export function MentalLoadProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MentalLoadItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load items on mount
  useEffect(() => {
    loadItems();
  }, []);

  // Save items whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveMentalLoadItems(items);
    }
  }, [items, isLoading]);

  const loadItems = async () => {
    setIsLoading(true);
    const storedItems = await loadMentalLoadItems();
    setItems(storedItems);
    setIsLoading(false);
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addItem = (item: Omit<MentalLoadItem, 'id' | 'createdAt' | 'resolved'>) => {
    // Check for duplicates
    const isDuplicate = items.some(
      i => i.content.toLowerCase() === item.content.toLowerCase() && !i.resolved
    );

    if (!isDuplicate) {
      const newItem: MentalLoadItem = {
        ...item,
        id: generateId(),
        createdAt: new Date().toISOString(),
        resolved: false,
      };
      setItems(prev => [...prev, newItem]);
    }
  };

  const addItems = (newItems: Omit<MentalLoadItem, 'id' | 'createdAt' | 'resolved'>[]) => {
    const itemsToAdd: MentalLoadItem[] = [];

    newItems.forEach(item => {
      // Check for duplicates against existing items and items being added
      const isDuplicateExisting = items.some(
        i => i.content.toLowerCase() === item.content.toLowerCase() && !i.resolved
      );
      const isDuplicateNew = itemsToAdd.some(
        i => i.content.toLowerCase() === item.content.toLowerCase()
      );

      if (!isDuplicateExisting && !isDuplicateNew && item.content.length > 3) {
        itemsToAdd.push({
          ...item,
          id: generateId(),
          createdAt: new Date().toISOString(),
          resolved: false,
        });
      }
    });

    if (itemsToAdd.length > 0) {
      setItems(prev => [...prev, ...itemsToAdd]);
    }
  };

  const toggleResolved = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<MentalLoadItem>) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const getItemsByType = (type: MentalLoadItem['type']) => {
    return items.filter(item => item.type === type && !item.resolved);
  };

  const unresolvedCount = items.filter(item => !item.resolved).length;

  return (
    <MentalLoadContext.Provider
      value={{
        items,
        addItem,
        addItems,
        toggleResolved,
        deleteItem,
        updateItem,
        getItemsByType,
        unresolvedCount,
        isLoading,
      }}
    >
      {children}
    </MentalLoadContext.Provider>
  );
}

export function useMentalLoad() {
  const context = useContext(MentalLoadContext);
  if (context === undefined) {
    throw new Error('useMentalLoad must be used within a MentalLoadProvider');
  }
  return context;
}
