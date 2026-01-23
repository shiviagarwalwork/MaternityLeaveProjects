// useGmail Hook - React hook for Gmail integration in AlphaMa
// Phase 2D: Gmail Integration

import { useState, useEffect, useCallback } from 'react';
import * as AuthSession from 'expo-auth-session';
import {
  GmailTokens,
  GmailProfile,
  EmailMessage,
  EmailDraft,
  GmailSettings,
  EmailSummary,
  useGoogleAuth,
  exchangeCodeForTokens,
  loadTokens,
  clearTokens,
  getProfile,
  loadCachedProfile,
  listEmails,
  getEmailById,
  sendEmail,
  getEmailSummary,
  buildEmailContext,
  loadGmailSettings,
  saveGmailSettings,
  disconnectGmail,
  isGmailConnected,
  getUnreadCount,
} from '../services/gmail';

export interface UseGmailReturn {
  // Auth state
  isConnected: boolean;
  isLoading: boolean;
  isAuthenticating: boolean;
  error: Error | null;

  // Profile
  profile: GmailProfile | null;

  // Emails
  emails: EmailMessage[];
  unreadCount: number;
  emailSummary: EmailSummary | null;

  // Settings
  settings: GmailSettings;

  // Auth actions
  connectGmail: () => Promise<void>;
  disconnect: () => Promise<void>;

  // Email actions
  fetchEmails: (query?: string) => Promise<void>;
  getEmail: (id: string) => Promise<EmailMessage | null>;
  send: (draft: EmailDraft) => Promise<string>;
  refreshEmails: () => Promise<void>;

  // Context
  getContext: () => Promise<string>;

  // Settings
  updateSettings: (settings: Partial<GmailSettings>) => Promise<void>;
}

export function useGmail(): UseGmailReturn {
  // State
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [profile, setProfile] = useState<GmailProfile | null>(null);
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [emailSummary, setEmailSummary] = useState<EmailSummary | null>(null);
  const [settings, setSettings] = useState<GmailSettings>({
    isConnected: false,
    syncFrequency: 'manual',
  });

  // Google Auth hook
  const { request, response, promptAsync, redirectUri } = useGoogleAuth();

  // Initialize on mount
  useEffect(() => {
    initializeGmail();
  }, []);

  // Handle OAuth response
  useEffect(() => {
    handleAuthResponse();
  }, [response]);

  const initializeGmail = async () => {
    setIsLoading(true);
    try {
      const connected = await isGmailConnected();
      setIsConnected(connected);

      if (connected) {
        const [cachedProfile, gmailSettings, count] = await Promise.all([
          loadCachedProfile(),
          loadGmailSettings(),
          getUnreadCount(),
        ]);

        if (cachedProfile) {
          setProfile(cachedProfile);
        } else {
          // Fetch fresh profile
          const freshProfile = await getProfile();
          setProfile(freshProfile);
        }

        setSettings(gmailSettings);
        setUnreadCount(count);
      }
    } catch (err) {
      console.error('Failed to initialize Gmail:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthResponse = async () => {
    if (response?.type === 'success' && response.params.code) {
      setIsAuthenticating(true);
      setError(null);

      try {
        // Exchange code for tokens
        if (request?.codeVerifier) {
          await exchangeCodeForTokens(
            response.params.code,
            request.codeVerifier,
            redirectUri
          );

          // Fetch profile
          const userProfile = await getProfile();
          setProfile(userProfile);

          // Update settings
          await saveGmailSettings({ isConnected: true, lastSync: new Date().toISOString() });
          setSettings(prev => ({ ...prev, isConnected: true }));

          setIsConnected(true);

          // Fetch initial data
          await refreshEmails();
        }
      } catch (err) {
        console.error('OAuth error:', err);
        setError(err as Error);
      } finally {
        setIsAuthenticating(false);
      }
    } else if (response?.type === 'error') {
      setError(new Error(response.error?.message || 'Authentication failed'));
      setIsAuthenticating(false);
    }
  };

  // Connect to Gmail
  const connectGmail = useCallback(async () => {
    if (!request) {
      setError(new Error('OAuth not ready. Please try again.'));
      return;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      await promptAsync();
    } catch (err) {
      setError(err as Error);
      setIsAuthenticating(false);
    }
  }, [request, promptAsync]);

  // Disconnect from Gmail
  const disconnect = useCallback(async () => {
    try {
      await disconnectGmail();
      setIsConnected(false);
      setProfile(null);
      setEmails([]);
      setUnreadCount(0);
      setEmailSummary(null);
      setSettings({ isConnected: false, syncFrequency: 'manual' });
    } catch (err) {
      console.error('Failed to disconnect:', err);
      setError(err as Error);
    }
  }, []);

  // Fetch emails
  const fetchEmails = useCallback(async (query?: string) => {
    if (!isConnected) return;

    setIsLoading(true);
    try {
      const { messages } = await listEmails({
        maxResults: 20,
        query,
      });
      setEmails(messages);
    } catch (err) {
      console.error('Failed to fetch emails:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [isConnected]);

  // Get single email
  const getEmail = useCallback(async (id: string): Promise<EmailMessage | null> => {
    if (!isConnected) return null;

    try {
      return await getEmailById(id);
    } catch (err) {
      console.error('Failed to get email:', err);
      setError(err as Error);
      return null;
    }
  }, [isConnected]);

  // Send email
  const send = useCallback(async (draft: EmailDraft): Promise<string> => {
    if (!isConnected) {
      throw new Error('Not connected to Gmail');
    }

    try {
      const messageId = await sendEmail(draft);
      return messageId;
    } catch (err) {
      console.error('Failed to send email:', err);
      setError(err as Error);
      throw err;
    }
  }, [isConnected]);

  // Refresh emails and summary
  const refreshEmails = useCallback(async () => {
    if (!isConnected) return;

    setIsLoading(true);
    try {
      const [count, summary] = await Promise.all([
        getUnreadCount(),
        getEmailSummary(),
      ]);

      setUnreadCount(count);
      setEmailSummary(summary);

      await saveGmailSettings({ lastSync: new Date().toISOString() });
    } catch (err) {
      console.error('Failed to refresh emails:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [isConnected]);

  // Get email context for AI
  const getContext = useCallback(async (): Promise<string> => {
    if (!isConnected) return '';
    return buildEmailContext();
  }, [isConnected]);

  // Update settings
  const updateSettings = useCallback(async (newSettings: Partial<GmailSettings>) => {
    try {
      await saveGmailSettings(newSettings);
      setSettings(prev => ({ ...prev, ...newSettings }));
    } catch (err) {
      console.error('Failed to update settings:', err);
      setError(err as Error);
    }
  }, []);

  return {
    // Auth state
    isConnected,
    isLoading,
    isAuthenticating,
    error,

    // Profile
    profile,

    // Emails
    emails,
    unreadCount,
    emailSummary,

    // Settings
    settings,

    // Auth actions
    connectGmail,
    disconnect,

    // Email actions
    fetchEmails,
    getEmail,
    send,
    refreshEmails,

    // Context
    getContext,

    // Settings
    updateSettings,
  };
}

export default useGmail;
