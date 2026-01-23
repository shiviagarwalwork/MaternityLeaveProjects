// Gmail Service - Google Gmail Integration for AlphaMa
// Phase 2D: Gmail Integration

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Complete auth session for web
WebBrowser.maybeCompleteAuthSession();

// Storage keys
const STORAGE_KEYS = {
  GMAIL_TOKENS: '@alphama_gmail_tokens',
  GMAIL_PROFILE: '@alphama_gmail_profile',
  CACHED_EMAILS: '@alphama_cached_emails',
  GMAIL_SETTINGS: '@alphama_gmail_settings',
};

// ==================== CONFIGURATION ====================

// Google OAuth configuration
// You'll need to replace this with your Google Cloud project credentials
const GOOGLE_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
  // Web client ID for Expo web
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
  // Scopes needed for Gmail
  scopes: [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

// Discovery document for Google OAuth
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

// ==================== TYPES ====================

export interface GmailTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: string;
}

export interface GmailProfile {
  email: string;
  name: string;
  picture?: string;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  from: string;
  to: string[];
  subject: string;
  snippet: string;
  body?: string;
  date: string;
  isRead: boolean;
  labels: string[];
  hasAttachments: boolean;
}

export interface EmailThread {
  id: string;
  messages: EmailMessage[];
  subject: string;
  participants: string[];
  lastMessageDate: string;
}

export interface EmailDraft {
  to: string;
  subject: string;
  body: string;
  cc?: string[];
  bcc?: string[];
}

export interface GmailSettings {
  isConnected: boolean;
  lastSync?: string;
  syncFrequency: 'realtime' | 'hourly' | 'manual';
  importantSendersFilter?: string[];
  labelFilters?: string[];
}

export interface EmailSummary {
  unreadCount: number;
  importantEmails: EmailMessage[];
  actionRequired: EmailMessage[];
  schoolEmails: EmailMessage[];
  workEmails: EmailMessage[];
}

// ==================== OAUTH FLOW ====================

// Create OAuth request
export function useGoogleAuth() {
  // Use Expo's auth proxy for development
  const redirectUri = 'https://auth.expo.io/@shiviagarwalwork/alphama';

  console.log('OAuth redirect URI:', redirectUri);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CONFIG.webClientId || GOOGLE_CONFIG.clientId,
      scopes: GOOGLE_CONFIG.scopes,
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
    },
    discovery
  );

  return { request, response, promptAsync, redirectUri };
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string,
  redirectUri: string
): Promise<GmailTokens> {
  const tokenResponse = await fetch(discovery.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_CONFIG.webClientId || GOOGLE_CONFIG.clientId,
      code,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }).toString(),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  const data = await tokenResponse.json();

  const tokens: GmailTokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
    tokenType: data.token_type,
  };

  await saveTokens(tokens);
  return tokens;
}

// Refresh access token
export async function refreshAccessToken(): Promise<GmailTokens | null> {
  const tokens = await loadTokens();
  if (!tokens?.refreshToken) {
    return null;
  }

  try {
    const response = await fetch(discovery.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CONFIG.webClientId || GOOGLE_CONFIG.clientId,
        refresh_token: tokens.refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();

    const newTokens: GmailTokens = {
      accessToken: data.access_token,
      refreshToken: tokens.refreshToken, // Keep existing refresh token
      expiresAt: Date.now() + data.expires_in * 1000,
      tokenType: data.token_type,
    };

    await saveTokens(newTokens);
    return newTokens;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
}

// Get valid access token (refresh if needed)
export async function getValidAccessToken(): Promise<string | null> {
  let tokens = await loadTokens();

  if (!tokens) {
    return null;
  }

  // Check if token is expired or will expire in next 5 minutes
  if (tokens.expiresAt < Date.now() + 5 * 60 * 1000) {
    tokens = await refreshAccessToken();
  }

  return tokens?.accessToken || null;
}

// ==================== TOKEN STORAGE ====================

export async function saveTokens(tokens: GmailTokens): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.GMAIL_TOKENS, JSON.stringify(tokens));
  } catch (error) {
    console.error('Failed to save Gmail tokens:', error);
  }
}

export async function loadTokens(): Promise<GmailTokens | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.GMAIL_TOKENS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load Gmail tokens:', error);
    return null;
  }
}

export async function clearTokens(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.GMAIL_TOKENS);
    await AsyncStorage.removeItem(STORAGE_KEYS.GMAIL_PROFILE);
  } catch (error) {
    console.error('Failed to clear Gmail tokens:', error);
  }
}

// ==================== GMAIL API CALLS ====================

const GMAIL_API_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

// Make authenticated Gmail API request
async function gmailApiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    throw new Error('Not authenticated with Gmail');
  }

  const response = await fetch(`${GMAIL_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gmail API error: ${error}`);
  }

  return response.json();
}

// Get user profile
export async function getProfile(): Promise<GmailProfile> {
  const data = await gmailApiRequest('/profile');

  const profile: GmailProfile = {
    email: data.emailAddress,
    name: data.emailAddress.split('@')[0], // Will be updated with userinfo
  };

  // Get full profile from userinfo
  const accessToken = await getValidAccessToken();
  if (accessToken) {
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userInfo = await userInfoResponse.json();
      profile.name = userInfo.name || profile.name;
      profile.picture = userInfo.picture;
    } catch (e) {
      // Use email-based name as fallback
    }
  }

  await AsyncStorage.setItem(STORAGE_KEYS.GMAIL_PROFILE, JSON.stringify(profile));
  return profile;
}

// Load cached profile
export async function loadCachedProfile(): Promise<GmailProfile | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.GMAIL_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// List emails
export async function listEmails(options: {
  maxResults?: number;
  query?: string;
  labelIds?: string[];
  pageToken?: string;
}): Promise<{ messages: EmailMessage[]; nextPageToken?: string }> {
  const params = new URLSearchParams();

  if (options.maxResults) params.set('maxResults', options.maxResults.toString());
  if (options.query) params.set('q', options.query);
  if (options.labelIds) params.set('labelIds', options.labelIds.join(','));
  if (options.pageToken) params.set('pageToken', options.pageToken);

  const data = await gmailApiRequest(`/messages?${params.toString()}`);

  if (!data.messages) {
    return { messages: [] };
  }

  // Fetch full message details for each message
  const messages = await Promise.all(
    data.messages.slice(0, 10).map((msg: { id: string }) => getEmailById(msg.id))
  );

  return {
    messages: messages.filter(Boolean) as EmailMessage[],
    nextPageToken: data.nextPageToken,
  };
}

// Get email by ID
export async function getEmailById(messageId: string): Promise<EmailMessage | null> {
  try {
    const data = await gmailApiRequest(`/messages/${messageId}?format=full`);
    return parseGmailMessage(data);
  } catch (error) {
    console.error(`Failed to get email ${messageId}:`, error);
    return null;
  }
}

// Parse Gmail API message format to our EmailMessage type
function parseGmailMessage(data: any): EmailMessage {
  const headers = data.payload?.headers || [];

  const getHeader = (name: string): string => {
    const header = headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase());
    return header?.value || '';
  };

  // Extract body
  let body = '';
  if (data.payload?.body?.data) {
    body = decodeBase64Url(data.payload.body.data);
  } else if (data.payload?.parts) {
    const textPart = data.payload.parts.find(
      (p: any) => p.mimeType === 'text/plain'
    );
    if (textPart?.body?.data) {
      body = decodeBase64Url(textPart.body.data);
    }
  }

  return {
    id: data.id,
    threadId: data.threadId,
    from: getHeader('From'),
    to: getHeader('To').split(',').map((e: string) => e.trim()),
    subject: getHeader('Subject'),
    snippet: data.snippet || '',
    body,
    date: getHeader('Date'),
    isRead: !data.labelIds?.includes('UNREAD'),
    labels: data.labelIds || [],
    hasAttachments: data.payload?.parts?.some(
      (p: any) => p.filename && p.filename.length > 0
    ) || false,
  };
}

// Decode base64url encoded string
function decodeBase64Url(encoded: string): string {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return encoded;
  }
}

// Get unread count
export async function getUnreadCount(): Promise<number> {
  try {
    const data = await gmailApiRequest('/labels/UNREAD');
    return data.messagesUnread || 0;
  } catch {
    return 0;
  }
}

// ==================== SEND EMAIL ====================

// Send an email
export async function sendEmail(draft: EmailDraft): Promise<string> {
  const message = createMimeMessage(draft);
  const encodedMessage = btoa(message)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const data = await gmailApiRequest('/messages/send', {
    method: 'POST',
    body: JSON.stringify({ raw: encodedMessage }),
  });

  return data.id;
}

// Create MIME message
function createMimeMessage(draft: EmailDraft): string {
  const lines = [
    `To: ${draft.to}`,
    `Subject: ${draft.subject}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
  ];

  if (draft.cc?.length) {
    lines.push(`Cc: ${draft.cc.join(', ')}`);
  }
  if (draft.bcc?.length) {
    lines.push(`Bcc: ${draft.bcc.join(', ')}`);
  }

  lines.push('', draft.body);

  return lines.join('\r\n');
}

// ==================== SMART EMAIL FEATURES ====================

// Get important emails for AI context
export async function getImportantEmails(): Promise<EmailMessage[]> {
  try {
    const { messages } = await listEmails({
      maxResults: 5,
      query: 'is:important is:unread',
    });
    return messages;
  } catch {
    return [];
  }
}

// Get school-related emails
export async function getSchoolEmails(): Promise<EmailMessage[]> {
  try {
    const { messages } = await listEmails({
      maxResults: 5,
      query: '(from:school OR from:teacher OR from:edu OR subject:school) newer_than:7d',
    });
    return messages;
  } catch {
    return [];
  }
}

// Get action-required emails
export async function getActionRequiredEmails(): Promise<EmailMessage[]> {
  try {
    const { messages } = await listEmails({
      maxResults: 5,
      query: '(subject:action OR subject:required OR subject:urgent OR subject:RSVP OR subject:deadline) is:unread',
    });
    return messages;
  } catch {
    return [];
  }
}

// Get email summary for AI context
export async function getEmailSummary(): Promise<EmailSummary> {
  const [unreadCount, important, actionRequired, school] = await Promise.all([
    getUnreadCount(),
    getImportantEmails(),
    getActionRequiredEmails(),
    getSchoolEmails(),
  ]);

  return {
    unreadCount,
    importantEmails: important,
    actionRequired,
    schoolEmails: school,
    workEmails: [], // Could add work email detection
  };
}

// ==================== EMAIL CONTEXT FOR AI ====================

// Build email context for AI prompts
export async function buildEmailContext(): Promise<string> {
  const tokens = await loadTokens();
  if (!tokens) {
    return ''; // Not connected to Gmail
  }

  try {
    const summary = await getEmailSummary();

    if (summary.unreadCount === 0 && summary.actionRequired.length === 0) {
      return '';
    }

    let context = '\n\n[EMAIL CONTEXT - Gmail summary:]\n';

    context += `\nUnread emails: ${summary.unreadCount}\n`;

    if (summary.actionRequired.length > 0) {
      context += '\nACTION REQUIRED:\n';
      for (const email of summary.actionRequired.slice(0, 3)) {
        context += `- "${email.subject}" from ${email.from}\n`;
      }
    }

    if (summary.schoolEmails.length > 0) {
      context += '\nSCHOOL/KIDS:\n';
      for (const email of summary.schoolEmails.slice(0, 3)) {
        context += `- "${email.subject}" from ${email.from}\n`;
      }
    }

    if (summary.importantEmails.length > 0) {
      context += '\nIMPORTANT:\n';
      for (const email of summary.importantEmails.slice(0, 3)) {
        context += `- "${email.subject}" from ${email.from}\n`;
      }
    }

    return context;
  } catch (error) {
    console.error('Failed to build email context:', error);
    return '';
  }
}

// ==================== SETTINGS ====================

export async function loadGmailSettings(): Promise<GmailSettings> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.GMAIL_SETTINGS);
    return data
      ? JSON.parse(data)
      : {
          isConnected: false,
          syncFrequency: 'manual',
        };
  } catch {
    return { isConnected: false, syncFrequency: 'manual' };
  }
}

export async function saveGmailSettings(settings: Partial<GmailSettings>): Promise<void> {
  const current = await loadGmailSettings();
  const updated = { ...current, ...settings };
  await AsyncStorage.setItem(STORAGE_KEYS.GMAIL_SETTINGS, JSON.stringify(updated));
}

// ==================== DISCONNECT ====================

export async function disconnectGmail(): Promise<void> {
  const tokens = await loadTokens();

  if (tokens?.accessToken) {
    // Revoke access
    try {
      await fetch(`${discovery.revocationEndpoint}?token=${tokens.accessToken}`, {
        method: 'POST',
      });
    } catch (e) {
      // Continue with local cleanup even if revocation fails
    }
  }

  await AsyncStorage.multiRemove([
    STORAGE_KEYS.GMAIL_TOKENS,
    STORAGE_KEYS.GMAIL_PROFILE,
    STORAGE_KEYS.CACHED_EMAILS,
    STORAGE_KEYS.GMAIL_SETTINGS,
  ]);
}

// ==================== CHECK CONNECTION ====================

export async function isGmailConnected(): Promise<boolean> {
  const tokens = await loadTokens();
  return !!tokens?.accessToken;
}
