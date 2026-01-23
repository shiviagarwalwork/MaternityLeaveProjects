// useCalendar Hook - React hook for calendar integration in AlphaMa
// Phase 2C: Calendar & Email Integration

import { useState, useEffect, useCallback } from 'react';
import {
  CalendarEvent,
  CalendarSettings,
  DraftEmail,
  EventCategory,
  loadCalendarSettings,
  saveCalendarSettings,
  loadEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getTodayEvents,
  getWeekEvents,
  getUpcomingEvents,
  buildCalendarContext,
  loadDrafts,
  saveDraft,
  updateDraftStatus,
  deleteDraft,
  clearCalendarData,
  categorizeEvent,
} from '../services/calendar';

export interface UseCalendarReturn {
  // State
  events: CalendarEvent[];
  todayEvents: CalendarEvent[];
  weekEvents: CalendarEvent[];
  drafts: DraftEmail[];
  settings: CalendarSettings;
  isLoading: boolean;
  error: Error | null;

  // Event operations
  addNewEvent: (event: Omit<CalendarEvent, 'id' | 'source'>) => Promise<CalendarEvent>;
  editEvent: (eventId: string, updates: Partial<CalendarEvent>) => Promise<void>;
  removeEvent: (eventId: string) => Promise<void>;
  getEvents: (days?: number) => Promise<CalendarEvent[]>;

  // Draft operations
  createDraft: (draft: Omit<DraftEmail, 'id' | 'createdAt' | 'status'>) => Promise<DraftEmail>;
  markDraftSent: (draftId: string) => Promise<void>;
  discardDraft: (draftId: string) => Promise<void>;
  removeDraft: (draftId: string) => Promise<void>;

  // Calendar context
  getCalendarContext: () => Promise<string>;

  // Settings
  updateSettings: (settings: Partial<CalendarSettings>) => Promise<void>;

  // Utilities
  refreshCalendar: () => Promise<void>;
  clearAll: () => Promise<void>;
  categorize: (title: string, description?: string) => EventCategory;
}

export function useCalendar(): UseCalendarReturn {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [todayEvents, setTodayEvents] = useState<CalendarEvent[]>([]);
  const [weekEvents, setWeekEvents] = useState<CalendarEvent[]>([]);
  const [drafts, setDrafts] = useState<DraftEmail[]>([]);
  const [settings, setSettings] = useState<CalendarSettings>({
    provider: 'none',
    isConnected: false,
    syncEnabled: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load all calendar data on mount
  useEffect(() => {
    loadAllCalendarData();
  }, []);

  const loadAllCalendarData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [loadedEvents, loadedSettings, loadedDrafts, today, week] = await Promise.all([
        loadEvents(),
        loadCalendarSettings(),
        loadDrafts(),
        getTodayEvents(),
        getWeekEvents(),
      ]);

      setEvents(loadedEvents);
      setSettings(loadedSettings);
      setDrafts(loadedDrafts);
      setTodayEvents(today);
      setWeekEvents(week);
    } catch (err) {
      console.error('Failed to load calendar data:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new event
  const addNewEvent = useCallback(async (
    eventData: Omit<CalendarEvent, 'id' | 'source'>
  ): Promise<CalendarEvent> => {
    try {
      const newEvent = await addEvent(eventData);
      setEvents(prev => [...prev, newEvent]);

      // Refresh today/week if applicable
      const eventDate = new Date(newEvent.startTime);
      const today = new Date();
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() + 7);

      if (eventDate.toDateString() === today.toDateString()) {
        setTodayEvents(await getTodayEvents());
      }
      if (eventDate <= weekEnd) {
        setWeekEvents(await getWeekEvents());
      }

      return newEvent;
    } catch (err) {
      console.error('Failed to add event:', err);
      setError(err as Error);
      throw err;
    }
  }, []);

  // Edit an event
  const editEvent = useCallback(async (
    eventId: string,
    updates: Partial<CalendarEvent>
  ): Promise<void> => {
    try {
      const updated = await updateEvent(eventId, updates);
      if (updated) {
        setEvents(prev => prev.map(e => e.id === eventId ? updated : e));
        setTodayEvents(await getTodayEvents());
        setWeekEvents(await getWeekEvents());
      }
    } catch (err) {
      console.error('Failed to edit event:', err);
      setError(err as Error);
      throw err;
    }
  }, []);

  // Remove an event
  const removeEvent = useCallback(async (eventId: string): Promise<void> => {
    try {
      await deleteEvent(eventId);
      setEvents(prev => prev.filter(e => e.id !== eventId));
      setTodayEvents(await getTodayEvents());
      setWeekEvents(await getWeekEvents());
    } catch (err) {
      console.error('Failed to remove event:', err);
      setError(err as Error);
      throw err;
    }
  }, []);

  // Get events for N days
  const getEvents = useCallback(async (days: number = 7): Promise<CalendarEvent[]> => {
    return getUpcomingEvents(days);
  }, []);

  // Create a draft
  const createDraft = useCallback(async (
    draftData: Omit<DraftEmail, 'id' | 'createdAt' | 'status'>
  ): Promise<DraftEmail> => {
    try {
      const newDraft = await saveDraft(draftData);
      setDrafts(prev => [...prev, newDraft]);
      return newDraft;
    } catch (err) {
      console.error('Failed to create draft:', err);
      setError(err as Error);
      throw err;
    }
  }, []);

  // Mark draft as sent
  const markDraftSent = useCallback(async (draftId: string): Promise<void> => {
    try {
      await updateDraftStatus(draftId, 'sent');
      setDrafts(prev => prev.map(d =>
        d.id === draftId ? { ...d, status: 'sent' as const } : d
      ));
    } catch (err) {
      console.error('Failed to mark draft sent:', err);
      setError(err as Error);
    }
  }, []);

  // Discard draft
  const discardDraft = useCallback(async (draftId: string): Promise<void> => {
    try {
      await updateDraftStatus(draftId, 'discarded');
      setDrafts(prev => prev.map(d =>
        d.id === draftId ? { ...d, status: 'discarded' as const } : d
      ));
    } catch (err) {
      console.error('Failed to discard draft:', err);
      setError(err as Error);
    }
  }, []);

  // Remove draft
  const removeDraft = useCallback(async (draftId: string): Promise<void> => {
    try {
      await deleteDraft(draftId);
      setDrafts(prev => prev.filter(d => d.id !== draftId));
    } catch (err) {
      console.error('Failed to remove draft:', err);
      setError(err as Error);
    }
  }, []);

  // Get calendar context for AI
  const getCalendarContext = useCallback(async (): Promise<string> => {
    return buildCalendarContext();
  }, []);

  // Update settings
  const updateSettings = useCallback(async (
    newSettings: Partial<CalendarSettings>
  ): Promise<void> => {
    try {
      const updated = await saveCalendarSettings(newSettings);
      setSettings(updated);
    } catch (err) {
      console.error('Failed to update settings:', err);
      setError(err as Error);
    }
  }, []);

  // Refresh all calendar data
  const refreshCalendar = useCallback(async (): Promise<void> => {
    await loadAllCalendarData();
  }, []);

  // Clear all calendar data
  const clearAll = useCallback(async (): Promise<void> => {
    try {
      await clearCalendarData();
      setEvents([]);
      setTodayEvents([]);
      setWeekEvents([]);
      setDrafts([]);
      setSettings({
        provider: 'none',
        isConnected: false,
        syncEnabled: false,
      });
    } catch (err) {
      console.error('Failed to clear calendar data:', err);
      setError(err as Error);
    }
  }, []);

  // Categorize helper
  const categorize = useCallback((title: string, description?: string): EventCategory => {
    return categorizeEvent(title, description);
  }, []);

  return {
    // State
    events,
    todayEvents,
    weekEvents,
    drafts,
    settings,
    isLoading,
    error,

    // Event operations
    addNewEvent,
    editEvent,
    removeEvent,
    getEvents,

    // Draft operations
    createDraft,
    markDraftSent,
    discardDraft,
    removeDraft,

    // Calendar context
    getCalendarContext,

    // Settings
    updateSettings,

    // Utilities
    refreshCalendar,
    clearAll,
    categorize,
  };
}

export default useCalendar;
