import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserStage, DailyCheckIn, Insight } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  todayCheckIn: DailyCheckIn | null;
  setTodayCheckIn: (checkIn: DailyCheckIn | null) => void;
  insights: Insight[];
  setInsights: (insights: Insight[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [todayCheckIn, setTodayCheckIn] = useState<DailyCheckIn | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        todayCheckIn,
        setTodayCheckIn,
        insights,
        setInsights,
        isLoading,
        setIsLoading,
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
    pregnancy: 'Pregnancy',
    postpartum_0_3_months: 'Fourth Trimester',
    postpartum_3_6_months: 'Postpartum (3-6 months)',
    postpartum_6_12_months: 'Postpartum (6-12 months)',
    return_to_work_prep: 'Preparing to Return to Work',
    recently_returned: 'Recently Returned to Work',
    thriving: 'Thriving',
  };
  return stageNames[stage];
}

// Helper function to get greeting based on time
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
