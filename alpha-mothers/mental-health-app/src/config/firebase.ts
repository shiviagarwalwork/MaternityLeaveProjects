// Firebase Configuration for AlphaMa
// This file initializes Firebase services

import { Platform } from 'react-native';

// Firebase config is loaded from native config files:
// - iOS: GoogleService-Info.plist
// - Android: google-services.json

// Re-export Firebase modules for easy access
export { default as auth } from '@react-native-firebase/auth';
export { default as firestore } from '@react-native-firebase/firestore';

// Initialize Firestore settings
import firestoreModule from '@react-native-firebase/firestore';

// Enable offline persistence
firestoreModule().settings({
  persistence: true,
  cacheSizeBytes: firestoreModule.CACHE_SIZE_UNLIMITED,
});

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  CHECK_INS: 'checkIns',
  MENTAL_LOAD_ITEMS: 'mentalLoadItems',
  JOURNAL_ENTRIES: 'journalEntries',
  INSIGHTS: 'insights',
  CONVERSATIONS: 'conversations',
  MEMORY: 'memory',
  FACTS: 'facts',
  PATTERNS: 'patterns',
} as const;

// Helper to get user document reference
export function getUserRef(userId: string) {
  return firestoreModule().collection(COLLECTIONS.USERS).doc(userId);
}

// Helper to get subcollection reference
export function getSubcollectionRef(
  userId: string,
  subcollection: keyof typeof COLLECTIONS
) {
  return getUserRef(userId).collection(COLLECTIONS[subcollection]);
}
