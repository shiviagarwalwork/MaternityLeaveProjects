// useMemory Hook - React hook for memory and personalization in AlphaMa
// Phase 2B: Memory & Personalization

import { useState, useEffect, useCallback } from 'react';
import {
  UserFact,
  UserPattern,
  UserPreferences,
  ConversationSummary,
  FactCategory,
  loadUserFacts,
  saveUserFacts,
  addOrUpdateFact,
  getFactsByCategory,
  deleteFact,
  loadPatterns,
  addOrUpdatePattern,
  loadPreferences,
  savePreferences,
  loadConversationSummaries,
  saveConversationSummary,
  buildMemoryContext,
  processMessageForMemory,
  clearAllMemory,
  exportMemoryData,
  extractFacts,
  detectPatterns,
} from '../services/memory';

export interface UseMemoryReturn {
  // State
  facts: UserFact[];
  patterns: UserPattern[];
  preferences: UserPreferences;
  summaries: ConversationSummary[];
  isLoading: boolean;
  error: Error | null;

  // Fact operations
  addFact: (fact: Partial<UserFact>) => Promise<void>;
  removeFact: (factId: string) => Promise<void>;
  getFactsForCategory: (category: FactCategory) => UserFact[];

  // Pattern operations
  addPattern: (pattern: Partial<UserPattern>) => Promise<void>;

  // Preference operations
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;

  // Summary operations
  addSummary: (summary: Omit<ConversationSummary, 'id'>) => Promise<void>;

  // Memory context
  getMemoryContext: () => Promise<string>;

  // Process new message
  processMessage: (message: string, role: 'user' | 'assistant') => Promise<void>;

  // Analyze conversation for patterns
  analyzeConversation: (messages: Array<{ role: string; content: string }>) => Promise<void>;

  // Utilities
  refreshMemory: () => Promise<void>;
  clearMemory: () => Promise<void>;
  exportData: () => Promise<{
    facts: UserFact[];
    patterns: UserPattern[];
    summaries: ConversationSummary[];
    preferences: UserPreferences;
  }>;
}

export function useMemory(): UseMemoryReturn {
  const [facts, setFacts] = useState<UserFact[]>([]);
  const [patterns, setPatterns] = useState<UserPattern[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    communicationStyle: 'balanced',
    responseLength: 'adaptive',
    useNicknames: true,
    preferVoice: false,
  });
  const [summaries, setSummaries] = useState<ConversationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load all memory data on mount
  useEffect(() => {
    loadAllMemory();
  }, []);

  const loadAllMemory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [loadedFacts, loadedPatterns, loadedPrefs, loadedSummaries] = await Promise.all([
        loadUserFacts(),
        loadPatterns(),
        loadPreferences(),
        loadConversationSummaries(),
      ]);

      setFacts(loadedFacts);
      setPatterns(loadedPatterns);
      setPreferences(loadedPrefs);
      setSummaries(loadedSummaries);
    } catch (err) {
      console.error('Failed to load memory:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a fact
  const addFact = useCallback(async (factData: Partial<UserFact>) => {
    try {
      const newFact = await addOrUpdateFact(factData);
      setFacts(prev => {
        const index = prev.findIndex(f => f.id === newFact.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = newFact;
          return updated;
        }
        return [...prev, newFact];
      });
    } catch (err) {
      console.error('Failed to add fact:', err);
      setError(err as Error);
    }
  }, []);

  // Remove a fact
  const removeFact = useCallback(async (factId: string) => {
    try {
      await deleteFact(factId);
      setFacts(prev => prev.filter(f => f.id !== factId));
    } catch (err) {
      console.error('Failed to remove fact:', err);
      setError(err as Error);
    }
  }, []);

  // Get facts for a specific category
  const getFactsForCategory = useCallback((category: FactCategory): UserFact[] => {
    return facts.filter(f => f.category === category);
  }, [facts]);

  // Add a pattern
  const addPattern = useCallback(async (patternData: Partial<UserPattern>) => {
    try {
      const newPattern = await addOrUpdatePattern(patternData);
      setPatterns(prev => {
        const index = prev.findIndex(p => p.id === newPattern.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = newPattern;
          return updated;
        }
        return [...prev, newPattern];
      });
    } catch (err) {
      console.error('Failed to add pattern:', err);
      setError(err as Error);
    }
  }, []);

  // Update preferences
  const updatePreferences = useCallback(async (prefs: Partial<UserPreferences>) => {
    try {
      const updated = await savePreferences(prefs);
      setPreferences(updated);
    } catch (err) {
      console.error('Failed to update preferences:', err);
      setError(err as Error);
    }
  }, []);

  // Add conversation summary
  const addSummary = useCallback(async (summary: Omit<ConversationSummary, 'id'>) => {
    try {
      const newSummary = await saveConversationSummary(summary);
      setSummaries(prev => [...prev, newSummary].slice(-30));
    } catch (err) {
      console.error('Failed to add summary:', err);
      setError(err as Error);
    }
  }, []);

  // Get memory context for AI prompts
  const getMemoryContext = useCallback(async (): Promise<string> => {
    return buildMemoryContext();
  }, []);

  // Process a message to extract facts
  const processMessage = useCallback(async (message: string, role: 'user' | 'assistant') => {
    if (role !== 'user') return;

    try {
      // Extract and store facts
      const extractedFacts = extractFacts(message);
      for (const fact of extractedFacts) {
        if (fact.key && fact.value) {
          await addFact(fact);
        }
      }
    } catch (err) {
      console.error('Failed to process message for memory:', err);
    }
  }, [addFact]);

  // Analyze conversation for patterns
  const analyzeConversation = useCallback(async (
    messages: Array<{ role: string; content: string }>
  ) => {
    try {
      const detectedPatterns = detectPatterns(messages);
      for (const pattern of detectedPatterns) {
        await addPattern(pattern);
      }
    } catch (err) {
      console.error('Failed to analyze conversation:', err);
    }
  }, [addPattern]);

  // Refresh all memory data
  const refreshMemory = useCallback(async () => {
    await loadAllMemory();
  }, []);

  // Clear all memory
  const clearMemory = useCallback(async () => {
    try {
      await clearAllMemory();
      setFacts([]);
      setPatterns([]);
      setSummaries([]);
      setPreferences({
        communicationStyle: 'balanced',
        responseLength: 'adaptive',
        useNicknames: true,
        preferVoice: false,
      });
    } catch (err) {
      console.error('Failed to clear memory:', err);
      setError(err as Error);
    }
  }, []);

  // Export all data
  const exportData = useCallback(async () => {
    return exportMemoryData();
  }, []);

  return {
    // State
    facts,
    patterns,
    preferences,
    summaries,
    isLoading,
    error,

    // Fact operations
    addFact,
    removeFact,
    getFactsForCategory,

    // Pattern operations
    addPattern,

    // Preference operations
    updatePreferences,

    // Summary operations
    addSummary,

    // Memory context
    getMemoryContext,

    // Process new message
    processMessage,

    // Analyze conversation
    analyzeConversation,

    // Utilities
    refreshMemory,
    clearMemory,
    exportData,
  };
}

export default useMemory;
