import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyCheckIn, JournalEntry, User, Insight } from '../types';

const STORAGE_KEYS = {
  USER: '@alpha_user',
  CHECK_INS: '@alpha_check_ins',
  JOURNAL_ENTRIES: '@alpha_journal_entries',
  INSIGHTS: '@alpha_insights',
  SETTINGS: '@alpha_settings',
  ONBOARDING_COMPLETE: '@alpha_onboarding_complete',
};

// User Storage
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Check-ins Storage
export const saveCheckIn = async (checkIn: DailyCheckIn): Promise<void> => {
  try {
    const existingCheckIns = await getCheckIns();
    const updatedCheckIns = [...existingCheckIns, checkIn];
    await AsyncStorage.setItem(STORAGE_KEYS.CHECK_INS, JSON.stringify(updatedCheckIns));
  } catch (error) {
    console.error('Error saving check-in:', error);
  }
};

export const getCheckIns = async (): Promise<DailyCheckIn[]> => {
  try {
    const checkInsJson = await AsyncStorage.getItem(STORAGE_KEYS.CHECK_INS);
    return checkInsJson ? JSON.parse(checkInsJson) : [];
  } catch (error) {
    console.error('Error getting check-ins:', error);
    return [];
  }
};

export const getTodayCheckIn = async (): Promise<DailyCheckIn | null> => {
  try {
    const checkIns = await getCheckIns();
    const today = new Date().toDateString();
    return checkIns.find(c => new Date(c.date).toDateString() === today) || null;
  } catch (error) {
    console.error('Error getting today check-in:', error);
    return null;
  }
};

export const getCheckInStreak = async (): Promise<number> => {
  try {
    const checkIns = await getCheckIns();
    if (checkIns.length === 0) return 0;

    // Sort by date descending
    const sortedCheckIns = [...checkIns].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedCheckIns.length; i++) {
      const checkInDate = new Date(sortedCheckIns[i].date);
      checkInDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (checkInDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error('Error calculating streak:', error);
    return 0;
  }
};

// Journal Entries Storage
export const saveJournalEntry = async (entry: JournalEntry): Promise<void> => {
  try {
    const existingEntries = await getJournalEntries();
    const updatedEntries = [...existingEntries, entry];
    await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error('Error saving journal entry:', error);
  }
};

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  try {
    const entriesJson = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error('Error getting journal entries:', error);
    return [];
  }
};

// Insights Storage
export const saveInsights = async (insights: Insight[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(insights));
  } catch (error) {
    console.error('Error saving insights:', error);
  }
};

export const getInsights = async (): Promise<Insight[]> => {
  try {
    const insightsJson = await AsyncStorage.getItem(STORAGE_KEYS.INSIGHTS);
    return insightsJson ? JSON.parse(insightsJson) : [];
  } catch (error) {
    console.error('Error getting insights:', error);
    return [];
  }
};

// Settings Storage
interface AppSettings {
  notificationsEnabled: boolean;
  dailyReminderTime: string;
  theme: 'light' | 'dark' | 'system';
}

const DEFAULT_SETTINGS: AppSettings = {
  notificationsEnabled: true,
  dailyReminderTime: '09:00',
  theme: 'light',
};

export const saveSettings = async (settings: AppSettings): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const getSettings = async (): Promise<AppSettings> => {
  try {
    const settingsJson = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settingsJson ? JSON.parse(settingsJson) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error getting settings:', error);
    return DEFAULT_SETTINGS;
  }
};

// Onboarding
export const setOnboardingComplete = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
  } catch (error) {
    console.error('Error setting onboarding complete:', error);
  }
};

export const isOnboardingComplete = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

// Clear all data (for logout/reset)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Analytics helpers
export const getWeeklyMoodData = async (): Promise<{ day: string; mood: number; energy: number }[]> => {
  try {
    const checkIns = await getCheckIns();
    const today = new Date();
    const weekData: { day: string; mood: number; energy: number }[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();

      const checkIn = checkIns.find(c => new Date(c.date).toDateString() === dateString);

      weekData.push({
        day: dayNames[date.getDay()],
        mood: checkIn?.mood || 0,
        energy: checkIn?.energy || 0,
      });
    }

    return weekData;
  } catch (error) {
    console.error('Error getting weekly mood data:', error);
    return [];
  }
};

export const getAverageMood = async (days: number = 7): Promise<number> => {
  try {
    const checkIns = await getCheckIns();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const recentCheckIns = checkIns.filter(c => new Date(c.date) >= cutoff);
    if (recentCheckIns.length === 0) return 0;

    const sum = recentCheckIns.reduce((acc, c) => acc + c.mood, 0);
    return sum / recentCheckIns.length;
  } catch (error) {
    console.error('Error calculating average mood:', error);
    return 0;
  }
};
