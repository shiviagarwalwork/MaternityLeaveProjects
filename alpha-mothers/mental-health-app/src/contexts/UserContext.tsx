import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserStage, UserConcern, DailyCheckIn, Insight } from '../types';

const STORAGE_KEYS = {
  USER: '@alpha_mothers_user',
  CHECK_INS: '@alpha_mothers_checkins',
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  todayCheckIn: DailyCheckIn | null;
  setTodayCheckIn: (checkIn: DailyCheckIn | null) => void;
  insights: Insight[];
  setInsights: (insights: Insight[]) => void;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

interface OnboardingData {
  name: string;
  stage: UserStage;
  concerns: UserConcern[];
  babyName?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [todayCheckIn, setTodayCheckIn] = useState<DailyCheckIn | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (userData) {
        setUserState(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUser = async (newUser: User | null) => {
    setUserState(newUser);
    try {
      if (newUser) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const completeOnboarding = async (data: OnboardingData) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      stage: data.stage,
      concerns: data.concerns,
      babyName: data.babyName,
      hasCompletedOnboarding: true,
      createdAt: new Date().toISOString(),
    };
    await setUser(newUser);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      await setUser(updatedUser);
    }
  };

  const resetOnboarding = async () => {
    await setUser(null);
  };

  const hasCompletedOnboarding = user?.hasCompletedOnboarding ?? false;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        todayCheckIn,
        setTodayCheckIn,
        insights,
        setInsights,
        isLoading,
        hasCompletedOnboarding,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Helper function to get stage display name
export function getStageDisplayName(stage: UserStage): string {
  const stageNames: Record<UserStage, string> = {
    pregnant: 'Expecting',
    new_mom: 'New Mom',
    postpartum: 'Postpartum',
    returning_to_work: 'Returning to Work',
    working_mom: 'Working Mom',
    established_mom: 'Established Mom',
  };
  return stageNames[stage] || stage;
}

// Helper function to get concern display name
export function getConcernDisplayName(concern: UserConcern): string {
  const concernNames: Record<UserConcern, string> = {
    sleep_deprivation: 'Sleep',
    anxiety_overwhelm: 'Anxiety',
    work_life_balance: 'Balance',
    career_identity: 'Career',
    relationship_changes: 'Relationships',
    physical_recovery: 'Recovery',
    loneliness: 'Connection',
    mom_guilt: 'Mom Guilt',
    screen_time_kids: 'Screen Time',
    financial_stress: 'Finances',
  };
  return concernNames[concern] || concern;
}

// Helper function to get greeting based on time
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

// Helper to get personalized content suggestions based on stage and concerns
export function getPersonalizedSuggestions(user: User): { title: string; description: string; action: string }[] {
  const suggestions: { title: string; description: string; action: string }[] = [];

  // Stage-based suggestions
  if (user.stage === 'pregnant') {
    suggestions.push({
      title: 'Prepare for Baby',
      description: 'Mental preparation exercises for motherhood',
      action: 'start_session',
    });
  } else if (user.stage === 'new_mom' || user.stage === 'postpartum') {
    suggestions.push({
      title: 'Sleep When You Can',
      description: 'Quick relaxation techniques for tired moms',
      action: 'start_session',
    });
  } else if (user.stage === 'returning_to_work') {
    suggestions.push({
      title: 'Return to Work Guide',
      description: '6-week program to ease your transition',
      action: 'open_rtw',
    });
  }

  // Concern-based suggestions
  if (user.concerns.includes('anxiety_overwhelm')) {
    suggestions.push({
      title: '2-Minute Calm',
      description: 'Quick breathing exercise for overwhelming moments',
      action: 'breathing',
    });
  }
  if (user.concerns.includes('sleep_deprivation')) {
    suggestions.push({
      title: 'Power Rest',
      description: 'Make the most of short sleep windows',
      action: 'sleep_tips',
    });
  }
  if (user.concerns.includes('mom_guilt')) {
    suggestions.push({
      title: 'Talk to Alpha',
      description: 'Process those guilty feelings with your AI companion',
      action: 'open_chat',
    });
  }

  return suggestions.slice(0, 3); // Return top 3
}
