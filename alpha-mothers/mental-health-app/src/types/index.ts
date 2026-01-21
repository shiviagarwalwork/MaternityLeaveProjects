// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  stage: UserStage;
  dueDate?: string;
  babyBirthDate?: string;
  returnToWorkDate?: string;
  childrenAges?: number[];
  createdAt: string;
}

export type UserStage =
  | 'pregnancy'
  | 'postpartum_0_3_months'
  | 'postpartum_3_6_months'
  | 'postpartum_6_12_months'
  | 'return_to_work_prep'
  | 'recently_returned'
  | 'thriving';

// Check-in Types
export interface DailyCheckIn {
  id: string;
  userId: string;
  date: string;
  mood: MoodLevel;
  energy: EnergyLevel;
  sleepQuality?: SleepQuality;
  anxietyLevel?: number; // 1-10
  notes?: string;
  createdAt: string;
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5; // 1 = very low, 5 = excellent
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;
export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';

// Insights Types
export interface Insight {
  id: string;
  userId: string;
  type: InsightType;
  title: string;
  description: string;
  actionable?: string;
  severity: 'info' | 'warning' | 'urgent';
  createdAt: string;
  read: boolean;
}

export type InsightType =
  | 'pattern_detected'
  | 'trend_alert'
  | 'milestone'
  | 'recommendation'
  | 'check_in_reminder';

// Journal Types
export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  mood?: MoodLevel;
  tags?: string[];
  isVoiceNote: boolean;
  audioUrl?: string;
  createdAt: string;
}

// Content Types
export interface GuidedSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: SessionCategory;
  audioUrl: string;
  imageUrl?: string;
  stage?: UserStage[];
}

export type SessionCategory =
  | 'anxiety_relief'
  | 'sleep'
  | 'energy_boost'
  | 'overwhelm'
  | 'confidence'
  | 'return_to_work'
  | 'bonding';

// Return to Work Types
export interface ReturnToWorkModule {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  exercises: Exercise[];
  scripts?: Script[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
}

export interface Script {
  id: string;
  title: string;
  scenario: string;
  template: string;
  tips: string[];
}

// Gen Alpha Types
export interface GenAlphaContent {
  id: string;
  ageRange: [number, number]; // min, max age
  title: string;
  description: string;
  conversationStarters: string[];
  weeklyChallenge?: string;
  resources?: string[];
}

// AI Companion Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  topic?: string;
  createdAt: string;
  updatedAt: string;
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  CheckIn: undefined;
  Journal: undefined;
  Chat: undefined;
  Session: { sessionId: string };
  ReturnToWork: undefined;
  GenAlpha: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Companion: undefined;
  Tools: undefined;
  Progress: undefined;
};
