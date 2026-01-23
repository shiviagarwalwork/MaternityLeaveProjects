// Calendar Service - Google/Outlook Calendar Integration for AlphaMa
// Phase 2C: Calendar & Email Integration

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const STORAGE_KEYS = {
  CALENDAR_EVENTS: '@alphama_calendar_events',
  CALENDAR_TOKEN: '@alphama_calendar_token',
  CALENDAR_SETTINGS: '@alphama_calendar_settings',
};

// ==================== TYPES ====================

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string;
  location?: string;
  isAllDay: boolean;
  category: EventCategory;
  source: 'google' | 'outlook' | 'manual';
  attendees?: string[];
  reminders?: Reminder[];
  recurring?: boolean;
  recurringPattern?: string;
}

export type EventCategory =
  | 'work'
  | 'kids'
  | 'health'
  | 'personal'
  | 'household'
  | 'social'
  | 'other';

export interface Reminder {
  type: 'notification' | 'email';
  minutesBefore: number;
}

export interface CalendarSettings {
  provider: 'google' | 'outlook' | 'none';
  isConnected: boolean;
  lastSync?: string;
  syncEnabled: boolean;
  calendarIds?: string[]; // Which calendars to sync
}

export interface DraftEmail {
  id: string;
  to: string;
  subject: string;
  body: string;
  context: string;
  createdAt: string;
  status: 'draft' | 'sent' | 'discarded';
}

// ==================== CALENDAR OPERATIONS ====================

// Get default settings
function getDefaultSettings(): CalendarSettings {
  return {
    provider: 'none',
    isConnected: false,
    syncEnabled: false,
  };
}

// Load calendar settings
export async function loadCalendarSettings(): Promise<CalendarSettings> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CALENDAR_SETTINGS);
    return data ? JSON.parse(data) : getDefaultSettings();
  } catch (error) {
    console.error('Failed to load calendar settings:', error);
    return getDefaultSettings();
  }
}

// Save calendar settings
export async function saveCalendarSettings(settings: Partial<CalendarSettings>): Promise<CalendarSettings> {
  try {
    const current = await loadCalendarSettings();
    const updated = { ...current, ...settings };
    await AsyncStorage.setItem(STORAGE_KEYS.CALENDAR_SETTINGS, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to save calendar settings:', error);
    throw error;
  }
}

// Load events from local storage
export async function loadEvents(): Promise<CalendarEvent[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CALENDAR_EVENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load calendar events:', error);
    return [];
  }
}

// Save events to local storage
export async function saveEvents(events: CalendarEvent[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CALENDAR_EVENTS, JSON.stringify(events));
  } catch (error) {
    console.error('Failed to save calendar events:', error);
  }
}

// Add a manual event
export async function addEvent(event: Omit<CalendarEvent, 'id' | 'source'>): Promise<CalendarEvent> {
  const events = await loadEvents();
  const newEvent: CalendarEvent = {
    ...event,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    source: 'manual',
  };
  events.push(newEvent);
  await saveEvents(events);
  return newEvent;
}

// Update an event
export async function updateEvent(eventId: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent | null> {
  const events = await loadEvents();
  const index = events.findIndex(e => e.id === eventId);
  if (index >= 0) {
    events[index] = { ...events[index], ...updates };
    await saveEvents(events);
    return events[index];
  }
  return null;
}

// Delete an event
export async function deleteEvent(eventId: string): Promise<void> {
  const events = await loadEvents();
  const filtered = events.filter(e => e.id !== eventId);
  await saveEvents(filtered);
}

// Get events for a specific date range
export async function getEventsInRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
  const events = await loadEvents();
  return events.filter(event => {
    const eventStart = new Date(event.startTime);
    return eventStart >= startDate && eventStart <= endDate;
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

// Get today's events
export async function getTodayEvents(): Promise<CalendarEvent[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getEventsInRange(today, tomorrow);
}

// Get this week's events
export async function getWeekEvents(): Promise<CalendarEvent[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);
  return getEventsInRange(today, weekEnd);
}

// Get upcoming events (next N days)
export async function getUpcomingEvents(days: number = 7): Promise<CalendarEvent[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + days);
  return getEventsInRange(today, endDate);
}

// ==================== EVENT CATEGORIZATION ====================

// Auto-categorize event based on title/description
export function categorizeEvent(title: string, description?: string): EventCategory {
  const text = `${title} ${description || ''}`.toLowerCase();

  // Work keywords
  if (/\b(meeting|call|presentation|deadline|report|client|office|work|project|standup|sprint)\b/.test(text)) {
    return 'work';
  }

  // Kids keywords
  if (/\b(school|pediatr|doctor|dentist|playdate|birthday|practice|game|recital|lesson|class)\b/.test(text)) {
    return 'kids';
  }

  // Health keywords
  if (/\b(appointment|checkup|therapy|gym|workout|doctor|dentist|physical|vaccine)\b/.test(text)) {
    return 'health';
  }

  // Social keywords
  if (/\b(dinner|lunch|brunch|party|wedding|shower|happy hour|drinks|date night)\b/.test(text)) {
    return 'social';
  }

  // Household keywords
  if (/\b(repair|service|delivery|plumber|electrician|cleaning|maintenance)\b/.test(text)) {
    return 'household';
  }

  return 'other';
}

// ==================== CALENDAR CONTEXT FOR AI ====================

// Build calendar context for AI prompts
export async function buildCalendarContext(): Promise<string> {
  const todayEvents = await getTodayEvents();
  const weekEvents = await getWeekEvents();

  if (todayEvents.length === 0 && weekEvents.length === 0) {
    return '';
  }

  let context = '\n\n[CALENDAR CONTEXT - Upcoming events:]\n';

  if (todayEvents.length > 0) {
    context += '\nTODAY:\n';
    for (const event of todayEvents) {
      const time = new Date(event.startTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      context += `- ${time}: ${event.title}${event.location ? ` @ ${event.location}` : ''}\n`;
    }
  }

  // Rest of the week (excluding today)
  const futureEvents = weekEvents.filter(e => {
    const eventDate = new Date(e.startTime).toDateString();
    return eventDate !== new Date().toDateString();
  });

  if (futureEvents.length > 0) {
    context += '\nCOMING UP THIS WEEK:\n';
    for (const event of futureEvents.slice(0, 5)) {
      const date = new Date(event.startTime).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const time = event.isAllDay ? 'All day' : new Date(event.startTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      context += `- ${date} ${time}: ${event.title}\n`;
    }
  }

  return context;
}

// ==================== GOOGLE CALENDAR INTEGRATION ====================

// Note: Full OAuth implementation requires native modules and backend support
// This provides the structure for integration

export interface GoogleCalendarConfig {
  clientId: string;
  scopes: string[];
}

// Initialize Google Calendar (placeholder for OAuth flow)
export async function initGoogleCalendar(config: GoogleCalendarConfig): Promise<boolean> {
  // In production, this would:
  // 1. Use expo-auth-session for OAuth flow
  // 2. Store tokens securely
  // 3. Set up token refresh

  console.log('Google Calendar integration initialized with config:', config);

  // For now, mark as not connected
  await saveCalendarSettings({
    provider: 'google',
    isConnected: false,
  });

  return false;
}

// Sync events from Google Calendar (placeholder)
export async function syncGoogleCalendar(): Promise<CalendarEvent[]> {
  const settings = await loadCalendarSettings();

  if (!settings.isConnected || settings.provider !== 'google') {
    throw new Error('Google Calendar not connected');
  }

  // In production, this would:
  // 1. Call Google Calendar API
  // 2. Convert events to our format
  // 3. Merge with local events
  // 4. Update lastSync timestamp

  await saveCalendarSettings({ lastSync: new Date().toISOString() });

  return loadEvents();
}

// ==================== OUTLOOK CALENDAR INTEGRATION ====================

// Initialize Outlook Calendar (placeholder for OAuth flow)
export async function initOutlookCalendar(): Promise<boolean> {
  // Similar to Google, would use Microsoft Graph API

  console.log('Outlook Calendar integration initialized');

  await saveCalendarSettings({
    provider: 'outlook',
    isConnected: false,
  });

  return false;
}

// ==================== EMAIL DRAFT MANAGEMENT ====================

const DRAFTS_KEY = '@alphama_email_drafts';

// Load saved drafts
export async function loadDrafts(): Promise<DraftEmail[]> {
  try {
    const data = await AsyncStorage.getItem(DRAFTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load drafts:', error);
    return [];
  }
}

// Save a draft
export async function saveDraft(draft: Omit<DraftEmail, 'id' | 'createdAt' | 'status'>): Promise<DraftEmail> {
  const drafts = await loadDrafts();
  const newDraft: DraftEmail = {
    ...draft,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    status: 'draft',
  };
  drafts.push(newDraft);
  await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  return newDraft;
}

// Update draft status
export async function updateDraftStatus(
  draftId: string,
  status: 'sent' | 'discarded'
): Promise<void> {
  const drafts = await loadDrafts();
  const index = drafts.findIndex(d => d.id === draftId);
  if (index >= 0) {
    drafts[index].status = status;
    await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  }
}

// Delete a draft
export async function deleteDraft(draftId: string): Promise<void> {
  const drafts = await loadDrafts();
  const filtered = drafts.filter(d => d.id !== draftId);
  await AsyncStorage.setItem(DRAFTS_KEY, JSON.stringify(filtered));
}

// ==================== UTILITIES ====================

// Format event time for display
export function formatEventTime(event: CalendarEvent): string {
  if (event.isAllDay) {
    return 'All day';
  }

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${startTime} - ${endTime}`;
}

// Get event category icon
export function getCategoryIcon(category: EventCategory): string {
  const icons: Record<EventCategory, string> = {
    work: '💼',
    kids: '👶',
    health: '💊',
    personal: '🧘',
    household: '🏠',
    social: '🎉',
    other: '📅',
  };
  return icons[category] || '📅';
}

// Get day name
export function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Check if event is happening soon (within 2 hours)
export function isEventSoon(event: CalendarEvent): boolean {
  const now = new Date();
  const eventStart = new Date(event.startTime);
  const hoursUntil = (eventStart.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursUntil > 0 && hoursUntil <= 2;
}

// Clear all calendar data
export async function clearCalendarData(): Promise<void> {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.CALENDAR_EVENTS,
    STORAGE_KEYS.CALENDAR_TOKEN,
    STORAGE_KEYS.CALENDAR_SETTINGS,
    DRAFTS_KEY,
  ]);
}
