// Memory Service - Long-term memory and personalization for AlphaMa
// Phase 2B: Memory & Personalization

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  USER_FACTS: '@alphama_user_facts',
  PATTERNS: '@alphama_patterns',
  CONVERSATION_SUMMARIES: '@alphama_conversation_summaries',
  PREFERENCES: '@alphama_preferences',
};

// ==================== TYPES ====================

export interface UserFact {
  id: string;
  category: FactCategory;
  key: string;
  value: string;
  confidence: number; // 0-1, how confident we are this is accurate
  source: 'explicit' | 'inferred' | 'onboarding';
  createdAt: string;
  updatedAt: string;
  mentions: number; // How many times this has been mentioned
}

export type FactCategory =
  | 'family'      // Kids names, ages, partner info
  | 'work'        // Job, schedule, role
  | 'health'      // Allergies, conditions, preferences
  | 'schedule'    // Recurring events, routines
  | 'preferences' // Communication style, triggers
  | 'stressors'   // Known stress patterns
  | 'goals'       // Personal/career goals
  | 'other';

export interface UserPattern {
  id: string;
  type: PatternType;
  description: string;
  frequency: number; // Times observed
  lastOccurred: string;
  triggers?: string[];
  suggestions?: string[];
}

export type PatternType =
  | 'emotional'     // e.g., "Gets anxious before presentations"
  | 'scheduling'    // e.g., "Overwhelmed on Monday mornings"
  | 'delegation'    // e.g., "Struggles to ask partner for help"
  | 'self_care'     // e.g., "Skips meals when stressed"
  | 'parenting';    // e.g., "Worries about screen time weekly"

export interface ConversationSummary {
  id: string;
  date: string;
  summary: string;
  topics: string[];
  emotionalState?: string;
  keyInsights?: string[];
  itemsCaptured: number;
}

export interface UserPreferences {
  communicationStyle: 'direct' | 'gentle' | 'balanced';
  responseLength: 'brief' | 'detailed' | 'adaptive';
  useNicknames: boolean;
  preferVoice: boolean;
  notificationTimes?: string[];
}

// ==================== FACT EXTRACTION ====================

// Patterns for extracting facts from conversations
const FACT_PATTERNS: Array<{
  pattern: RegExp;
  category: FactCategory;
  keyExtractor: (match: RegExpMatchArray) => string;
  valueExtractor: (match: RegExpMatchArray) => string;
}> = [
  // Kids' names and ages
  {
    pattern: /my (?:son|daughter|kid|child)(?: named| called)? (\w+)/i,
    category: 'family',
    keyExtractor: () => 'child_name',
    valueExtractor: (m) => m[1],
  },
  {
    pattern: /(\w+) is (\d+)(?: years old)?/i,
    category: 'family',
    keyExtractor: (m) => `${m[1].toLowerCase()}_age`,
    valueExtractor: (m) => m[2],
  },
  // Partner
  {
    pattern: /my (?:husband|wife|partner|spouse)(?: named| called)? (\w+)/i,
    category: 'family',
    keyExtractor: () => 'partner_name',
    valueExtractor: (m) => m[1],
  },
  // Work
  {
    pattern: /I (?:work as|am) (?:a |an )?(.+?)(?:\.|,|$)/i,
    category: 'work',
    keyExtractor: () => 'job_title',
    valueExtractor: (m) => m[1].trim(),
  },
  {
    pattern: /I work (?:at|for) (.+?)(?:\.|,|$)/i,
    category: 'work',
    keyExtractor: () => 'employer',
    valueExtractor: (m) => m[1].trim(),
  },
  // Schedule patterns
  {
    pattern: /(?:every|each) (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
    category: 'schedule',
    keyExtractor: () => 'recurring_day',
    valueExtractor: (m) => m[1],
  },
  // Health/allergies
  {
    pattern: /(?:I am|I'm|he is|she is|they are) allergic to (.+?)(?:\.|,|$)/i,
    category: 'health',
    keyExtractor: () => 'allergy',
    valueExtractor: (m) => m[1].trim(),
  },
];

// Extract facts from a message
export function extractFacts(message: string): Partial<UserFact>[] {
  const facts: Partial<UserFact>[] = [];

  for (const { pattern, category, keyExtractor, valueExtractor } of FACT_PATTERNS) {
    const match = message.match(pattern);
    if (match) {
      facts.push({
        category,
        key: keyExtractor(match),
        value: valueExtractor(match),
        confidence: 0.8,
        source: 'inferred',
      });
    }
  }

  return facts;
}

// ==================== PATTERN DETECTION ====================

// Detect emotional patterns from conversation history
export function detectPatterns(
  messages: Array<{ role: string; content: string; timestamp?: string }>
): Partial<UserPattern>[] {
  const patterns: Partial<UserPattern>[] = [];

  // Count emotional keywords over time
  const emotionalCounts: Record<string, number> = {};
  const keywords = {
    anxious: ['anxious', 'anxiety', 'nervous', 'worried'],
    overwhelmed: ['overwhelmed', 'too much', 'can\'t handle'],
    guilty: ['guilty', 'feel bad', 'should have'],
    exhausted: ['exhausted', 'tired', 'no energy', 'depleted'],
  };

  for (const msg of messages) {
    if (msg.role === 'user') {
      const lower = msg.content.toLowerCase();
      for (const [emotion, words] of Object.entries(keywords)) {
        if (words.some(w => lower.includes(w))) {
          emotionalCounts[emotion] = (emotionalCounts[emotion] || 0) + 1;
        }
      }
    }
  }

  // Identify significant patterns
  for (const [emotion, count] of Object.entries(emotionalCounts)) {
    if (count >= 2) { // Mentioned at least twice
      patterns.push({
        type: 'emotional',
        description: `Frequently experiences ${emotion} feelings`,
        frequency: count,
        lastOccurred: new Date().toISOString(),
      });
    }
  }

  return patterns;
}

// ==================== STORAGE OPERATIONS ====================

// Generate unique ID
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Load all user facts
export async function loadUserFacts(): Promise<UserFact[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_FACTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load user facts:', error);
    return [];
  }
}

// Save user facts
export async function saveUserFacts(facts: UserFact[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_FACTS, JSON.stringify(facts));
  } catch (error) {
    console.error('Failed to save user facts:', error);
  }
}

// Add or update a fact
export async function addOrUpdateFact(factData: Partial<UserFact>): Promise<UserFact> {
  const facts = await loadUserFacts();

  // Check if fact already exists
  const existingIndex = facts.findIndex(
    f => f.category === factData.category && f.key === factData.key
  );

  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    // Update existing fact
    const existing = facts[existingIndex];
    facts[existingIndex] = {
      ...existing,
      value: factData.value || existing.value,
      confidence: Math.min(1, existing.confidence + 0.1),
      updatedAt: now,
      mentions: existing.mentions + 1,
    };
    await saveUserFacts(facts);
    return facts[existingIndex];
  } else {
    // Add new fact
    const newFact: UserFact = {
      id: generateId(),
      category: factData.category || 'other',
      key: factData.key || 'unknown',
      value: factData.value || '',
      confidence: factData.confidence || 0.5,
      source: factData.source || 'inferred',
      createdAt: now,
      updatedAt: now,
      mentions: 1,
    };
    facts.push(newFact);
    await saveUserFacts(facts);
    return newFact;
  }
}

// Get facts by category
export async function getFactsByCategory(category: FactCategory): Promise<UserFact[]> {
  const facts = await loadUserFacts();
  return facts.filter(f => f.category === category);
}

// Get high-confidence facts
export async function getHighConfidenceFacts(minConfidence = 0.7): Promise<UserFact[]> {
  const facts = await loadUserFacts();
  return facts.filter(f => f.confidence >= minConfidence);
}

// Delete a fact
export async function deleteFact(factId: string): Promise<void> {
  const facts = await loadUserFacts();
  const filtered = facts.filter(f => f.id !== factId);
  await saveUserFacts(filtered);
}

// ==================== PATTERNS STORAGE ====================

// Load patterns
export async function loadPatterns(): Promise<UserPattern[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PATTERNS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load patterns:', error);
    return [];
  }
}

// Save patterns
export async function savePatterns(patterns: UserPattern[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PATTERNS, JSON.stringify(patterns));
  } catch (error) {
    console.error('Failed to save patterns:', error);
  }
}

// Add or update a pattern
export async function addOrUpdatePattern(patternData: Partial<UserPattern>): Promise<UserPattern> {
  const patterns = await loadPatterns();

  // Check if similar pattern exists
  const existingIndex = patterns.findIndex(
    p => p.type === patternData.type && p.description === patternData.description
  );

  if (existingIndex >= 0) {
    // Update frequency
    patterns[existingIndex].frequency += 1;
    patterns[existingIndex].lastOccurred = new Date().toISOString();
    await savePatterns(patterns);
    return patterns[existingIndex];
  } else {
    // Add new pattern
    const newPattern: UserPattern = {
      id: generateId(),
      type: patternData.type || 'emotional',
      description: patternData.description || '',
      frequency: patternData.frequency || 1,
      lastOccurred: new Date().toISOString(),
      triggers: patternData.triggers,
      suggestions: patternData.suggestions,
    };
    patterns.push(newPattern);
    await savePatterns(patterns);
    return newPattern;
  }
}

// ==================== CONVERSATION SUMMARIES ====================

// Load conversation summaries
export async function loadConversationSummaries(): Promise<ConversationSummary[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CONVERSATION_SUMMARIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load conversation summaries:', error);
    return [];
  }
}

// Save conversation summary
export async function saveConversationSummary(summary: Omit<ConversationSummary, 'id'>): Promise<ConversationSummary> {
  try {
    const summaries = await loadConversationSummaries();
    const newSummary: ConversationSummary = {
      ...summary,
      id: generateId(),
    };

    // Keep only last 30 summaries
    const updated = [...summaries, newSummary].slice(-30);
    await AsyncStorage.setItem(STORAGE_KEYS.CONVERSATION_SUMMARIES, JSON.stringify(updated));

    return newSummary;
  } catch (error) {
    console.error('Failed to save conversation summary:', error);
    throw error;
  }
}

// ==================== USER PREFERENCES ====================

// Load preferences
export async function loadPreferences(): Promise<UserPreferences> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return data ? JSON.parse(data) : getDefaultPreferences();
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return getDefaultPreferences();
  }
}

// Save preferences
export async function savePreferences(prefs: Partial<UserPreferences>): Promise<UserPreferences> {
  try {
    const current = await loadPreferences();
    const updated = { ...current, ...prefs };
    await AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save preferences:', error);
    throw error;
  }
}

// Default preferences
function getDefaultPreferences(): UserPreferences {
  return {
    communicationStyle: 'balanced',
    responseLength: 'adaptive',
    useNicknames: true,
    preferVoice: false,
  };
}

// ==================== CONTEXT BUILDING ====================

// Build context string for AI prompts
export async function buildMemoryContext(): Promise<string> {
  const facts = await getHighConfidenceFacts(0.6);
  const patterns = await loadPatterns();
  const prefs = await loadPreferences();

  if (facts.length === 0 && patterns.length === 0) {
    return '';
  }

  let context = '\n\n[MEMORY CONTEXT - What I know about you:]\n';

  // Group facts by category
  const factsByCategory: Record<string, UserFact[]> = {};
  for (const fact of facts) {
    if (!factsByCategory[fact.category]) {
      factsByCategory[fact.category] = [];
    }
    factsByCategory[fact.category].push(fact);
  }

  // Family info
  if (factsByCategory.family?.length) {
    context += '\nFamily:\n';
    for (const fact of factsByCategory.family) {
      context += `- ${fact.key.replace(/_/g, ' ')}: ${fact.value}\n`;
    }
  }

  // Work info
  if (factsByCategory.work?.length) {
    context += '\nWork:\n';
    for (const fact of factsByCategory.work) {
      context += `- ${fact.key.replace(/_/g, ' ')}: ${fact.value}\n`;
    }
  }

  // Health info
  if (factsByCategory.health?.length) {
    context += '\nHealth:\n';
    for (const fact of factsByCategory.health) {
      context += `- ${fact.key.replace(/_/g, ' ')}: ${fact.value}\n`;
    }
  }

  // Patterns
  if (patterns.length > 0) {
    context += '\nPatterns I\'ve noticed:\n';
    for (const pattern of patterns.slice(0, 5)) {
      context += `- ${pattern.description} (observed ${pattern.frequency}x)\n`;
    }
  }

  // Preferences
  context += `\nCommunication preference: ${prefs.communicationStyle}\n`;

  return context;
}

// Process a message to extract and store facts
export async function processMessageForMemory(
  message: string,
  role: 'user' | 'assistant'
): Promise<void> {
  if (role !== 'user') return;

  // Extract facts
  const extractedFacts = extractFacts(message);

  // Store each fact
  for (const fact of extractedFacts) {
    if (fact.key && fact.value) {
      await addOrUpdateFact(fact);
    }
  }
}

// ==================== CLEANUP ====================

// Clear all memory data
export async function clearAllMemory(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_FACTS,
      STORAGE_KEYS.PATTERNS,
      STORAGE_KEYS.CONVERSATION_SUMMARIES,
      STORAGE_KEYS.PREFERENCES,
    ]);
  } catch (error) {
    console.error('Failed to clear memory:', error);
  }
}

// Export all memory data (for user data portability)
export async function exportMemoryData(): Promise<{
  facts: UserFact[];
  patterns: UserPattern[];
  summaries: ConversationSummary[];
  preferences: UserPreferences;
}> {
  return {
    facts: await loadUserFacts(),
    patterns: await loadPatterns(),
    summaries: await loadConversationSummaries(),
    preferences: await loadPreferences(),
  };
}
