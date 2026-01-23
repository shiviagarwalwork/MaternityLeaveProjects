// Firestore Service for AlphaMa
// Handles all cloud data operations

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { COLLECTIONS, getUserRef } from '../../config/firebase';
import { User, DailyCheckIn, JournalEntry, Insight } from '../../types';
import { UserFact, UserPattern } from '../memory';
import { StoredCapturedItem } from '../../contexts/MentalLoadContext';

// ==================== TYPES ====================

export interface FirestoreUserProfile {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  authProvider: 'google' | 'apple';
  stage?: string;
  concerns?: string[];
  goals?: string[];
  babyName?: string;
  babyBirthDate?: FirebaseFirestoreTypes.Timestamp;
  dueDate?: FirebaseFirestoreTypes.Timestamp;
  returnToWorkDate?: FirebaseFirestoreTypes.Timestamp;
  childrenAges?: number[];
  hasCompletedOnboarding: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  lastSyncedAt: FirebaseFirestoreTypes.Timestamp;
  migratedFromLocal?: boolean;
}

// ==================== USER PROFILE ====================

export async function createOrUpdateUserProfile(
  firebaseUser: FirebaseAuthTypes.User,
  provider: 'google' | 'apple'
): Promise<void> {
  const userRef = getUserRef(firebaseUser.uid);
  const doc = await userRef.get();

  if (doc.exists) {
    // Update existing user
    await userRef.update({
      email: firebaseUser.email,
      name: firebaseUser.displayName || doc.data()?.name,
      photoURL: firebaseUser.photoURL,
      updatedAt: firestore.FieldValue.serverTimestamp(),
      lastSyncedAt: firestore.FieldValue.serverTimestamp(),
    });
  } else {
    // Create new user
    await userRef.set({
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL,
      authProvider: provider,
      hasCompletedOnboarding: false,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
      lastSyncedAt: firestore.FieldValue.serverTimestamp(),
    });
  }
}

export async function getUserProfile(userId: string): Promise<FirestoreUserProfile | null> {
  const doc = await getUserRef(userId).get();
  return doc.exists ? (doc.data() as FirestoreUserProfile) : null;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<User>
): Promise<void> {
  const userRef = getUserRef(userId);

  // Convert dates to Firestore timestamps
  const firestoreUpdates: any = { ...updates };
  if (updates.babyBirthDate) {
    firestoreUpdates.babyBirthDate = firestore.Timestamp.fromDate(
      new Date(updates.babyBirthDate)
    );
  }

  await userRef.update({
    ...firestoreUpdates,
    updatedAt: firestore.FieldValue.serverTimestamp(),
    lastSyncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function completeOnboardingInFirestore(
  userId: string,
  onboardingData: {
    name: string;
    stage: string;
    concerns: string[];
    babyName?: string;
    dueDate?: string;
  }
): Promise<void> {
  const userRef = getUserRef(userId);

  await userRef.update({
    name: onboardingData.name,
    stage: onboardingData.stage,
    concerns: onboardingData.concerns,
    babyName: onboardingData.babyName || null,
    dueDate: onboardingData.dueDate
      ? firestore.Timestamp.fromDate(new Date(onboardingData.dueDate))
      : null,
    hasCompletedOnboarding: true,
    updatedAt: firestore.FieldValue.serverTimestamp(),
    lastSyncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

// Subscribe to user profile changes
export function subscribeToUserProfile(
  userId: string,
  callback: (profile: FirestoreUserProfile | null) => void
): () => void {
  return getUserRef(userId).onSnapshot(
    (doc) => {
      callback(doc.exists ? (doc.data() as FirestoreUserProfile) : null);
    },
    (error) => {
      console.error('User profile subscription error:', error);
      callback(null);
    }
  );
}

// ==================== CHECK-INS ====================

export async function saveCheckIn(
  userId: string,
  checkIn: DailyCheckIn
): Promise<void> {
  const checkInsRef = getUserRef(userId).collection(COLLECTIONS.CHECK_INS);

  await checkInsRef.doc(checkIn.id).set({
    ...checkIn,
    date: firestore.Timestamp.fromDate(new Date(checkIn.date)),
    createdAt: firestore.Timestamp.fromDate(new Date(checkIn.createdAt)),
    syncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getCheckIns(
  userId: string,
  limit: number = 30
): Promise<DailyCheckIn[]> {
  const snapshot = await getUserRef(userId)
    .collection(COLLECTIONS.CHECK_INS)
    .orderBy('date', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      date: data.date?.toDate?.()?.toISOString() || data.date,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
    } as DailyCheckIn;
  });
}

export function subscribeToCheckIns(
  userId: string,
  callback: (checkIns: DailyCheckIn[]) => void,
  limit: number = 30
): () => void {
  return getUserRef(userId)
    .collection(COLLECTIONS.CHECK_INS)
    .orderBy('date', 'desc')
    .limit(limit)
    .onSnapshot(
      (snapshot) => {
        const checkIns = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            date: data.date?.toDate?.()?.toISOString() || data.date,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          } as DailyCheckIn;
        });
        callback(checkIns);
      },
      (error) => {
        console.error('Check-ins subscription error:', error);
      }
    );
}

// ==================== MENTAL LOAD ITEMS ====================

export async function saveMentalLoadItem(
  userId: string,
  item: StoredCapturedItem
): Promise<void> {
  const itemsRef = getUserRef(userId).collection(COLLECTIONS.MENTAL_LOAD_ITEMS);

  await itemsRef.doc(item.id).set({
    ...item,
    createdAt: firestore.Timestamp.fromDate(new Date(item.createdAt)),
    dueDate: item.dueDate
      ? firestore.Timestamp.fromDate(new Date(item.dueDate))
      : null,
    syncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function updateMentalLoadItem(
  userId: string,
  itemId: string,
  updates: Partial<StoredCapturedItem>
): Promise<void> {
  const itemRef = getUserRef(userId)
    .collection(COLLECTIONS.MENTAL_LOAD_ITEMS)
    .doc(itemId);

  await itemRef.update({
    ...updates,
    syncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getMentalLoadItems(
  userId: string
): Promise<StoredCapturedItem[]> {
  const snapshot = await getUserRef(userId)
    .collection(COLLECTIONS.MENTAL_LOAD_ITEMS)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
      dueDate: data.dueDate?.toDate?.()?.toISOString() || data.dueDate,
    } as StoredCapturedItem;
  });
}

export function subscribeToMentalLoadItems(
  userId: string,
  callback: (items: StoredCapturedItem[]) => void
): () => void {
  return getUserRef(userId)
    .collection(COLLECTIONS.MENTAL_LOAD_ITEMS)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
            dueDate: data.dueDate?.toDate?.()?.toISOString() || data.dueDate,
          } as StoredCapturedItem;
        });
        callback(items);
      },
      (error) => {
        console.error('Mental load items subscription error:', error);
      }
    );
}

// ==================== JOURNAL ENTRIES ====================

export async function saveJournalEntry(
  userId: string,
  entry: JournalEntry
): Promise<void> {
  const entriesRef = getUserRef(userId).collection(COLLECTIONS.JOURNAL_ENTRIES);

  await entriesRef.doc(entry.id).set({
    ...entry,
    createdAt: firestore.Timestamp.fromDate(new Date(entry.createdAt)),
    syncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getJournalEntries(
  userId: string,
  limit: number = 50
): Promise<JournalEntry[]> {
  const snapshot = await getUserRef(userId)
    .collection(COLLECTIONS.JOURNAL_ENTRIES)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
    } as JournalEntry;
  });
}

// ==================== MEMORY (FACTS & PATTERNS) ====================

export async function saveUserFact(userId: string, fact: UserFact): Promise<void> {
  const factsRef = getUserRef(userId)
    .collection(COLLECTIONS.MEMORY)
    .doc('data')
    .collection(COLLECTIONS.FACTS);

  await factsRef.doc(fact.id).set({
    ...fact,
    createdAt: firestore.Timestamp.fromDate(new Date(fact.createdAt)),
    updatedAt: firestore.Timestamp.fromDate(new Date(fact.updatedAt)),
    syncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getUserFacts(userId: string): Promise<UserFact[]> {
  const snapshot = await getUserRef(userId)
    .collection(COLLECTIONS.MEMORY)
    .doc('data')
    .collection(COLLECTIONS.FACTS)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
    } as UserFact;
  });
}

export async function deleteUserFact(userId: string, factId: string): Promise<void> {
  await getUserRef(userId)
    .collection(COLLECTIONS.MEMORY)
    .doc('data')
    .collection(COLLECTIONS.FACTS)
    .doc(factId)
    .delete();
}

export async function saveUserPattern(
  userId: string,
  pattern: UserPattern
): Promise<void> {
  const patternsRef = getUserRef(userId)
    .collection(COLLECTIONS.MEMORY)
    .doc('data')
    .collection(COLLECTIONS.PATTERNS);

  await patternsRef.doc(pattern.id).set({
    ...pattern,
    firstDetected: firestore.Timestamp.fromDate(new Date(pattern.firstDetected)),
    lastSeen: firestore.Timestamp.fromDate(new Date(pattern.lastSeen)),
    syncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getUserPatterns(userId: string): Promise<UserPattern[]> {
  const snapshot = await getUserRef(userId)
    .collection(COLLECTIONS.MEMORY)
    .doc('data')
    .collection(COLLECTIONS.PATTERNS)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      firstDetected: data.firstDetected?.toDate?.()?.toISOString() || data.firstDetected,
      lastSeen: data.lastSeen?.toDate?.()?.toISOString() || data.lastSeen,
    } as UserPattern;
  });
}

// ==================== INSIGHTS ====================

export async function saveInsight(userId: string, insight: Insight): Promise<void> {
  const insightsRef = getUserRef(userId).collection(COLLECTIONS.INSIGHTS);

  await insightsRef.doc(insight.id).set({
    ...insight,
    createdAt: firestore.Timestamp.fromDate(new Date(insight.createdAt)),
    syncedAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getInsights(
  userId: string,
  limit: number = 20
): Promise<Insight[]> {
  const snapshot = await getUserRef(userId)
    .collection(COLLECTIONS.INSIGHTS)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
    } as Insight;
  });
}

// ==================== DELETE ALL USER DATA ====================

export async function deleteAllUserData(userId: string): Promise<void> {
  const userRef = getUserRef(userId);
  const batch = firestore().batch();

  // Delete subcollections
  const subcollections = [
    COLLECTIONS.CHECK_INS,
    COLLECTIONS.MENTAL_LOAD_ITEMS,
    COLLECTIONS.JOURNAL_ENTRIES,
    COLLECTIONS.INSIGHTS,
    COLLECTIONS.CONVERSATIONS,
  ];

  for (const subcollection of subcollections) {
    const snapshot = await userRef.collection(subcollection).get();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
  }

  // Delete memory subcollections
  const factsSnapshot = await userRef
    .collection(COLLECTIONS.MEMORY)
    .doc('data')
    .collection(COLLECTIONS.FACTS)
    .get();
  factsSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  const patternsSnapshot = await userRef
    .collection(COLLECTIONS.MEMORY)
    .doc('data')
    .collection(COLLECTIONS.PATTERNS)
    .get();
  patternsSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Delete user document
  batch.delete(userRef);

  await batch.commit();
}
