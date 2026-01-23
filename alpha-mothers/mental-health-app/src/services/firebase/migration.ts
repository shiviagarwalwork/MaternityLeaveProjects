// Migration Service for AlphaMa
// Migrates existing AsyncStorage data to Firestore on first cloud sign-in

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { getUserRef, COLLECTIONS } from '../../config/firebase';

// Migration flag key
const MIGRATION_FLAG = '@alphama_migrated_to_firestore';

// Storage keys from existing storage.ts
const LOCAL_STORAGE_KEYS = {
  USER: '@alpha_user',
  CHECK_INS: '@alpha_check_ins',
  JOURNAL_ENTRIES: '@alpha_journal_entries',
  INSIGHTS: '@alpha_insights',
  SETTINGS: '@alpha_settings',
  ONBOARDING_COMPLETE: '@alpha_onboarding_complete',
  CONVERSATION: '@alphama_conversations',
  MENTAL_LOAD: '@alphama_mental_load',
  USER_FACTS: '@alphama_user_facts',
  PATTERNS: '@alphama_patterns',
  PREFERENCES: '@alphama_preferences',
  CONVERSATION_SUMMARIES: '@alphama_conversation_summaries',
};

export interface MigrationResult {
  success: boolean;
  migratedCount: {
    user: boolean;
    checkIns: number;
    mentalLoadItems: number;
    journalEntries: number;
    insights: number;
    facts: number;
    patterns: number;
  };
  errors: string[];
}

// Check if migration is needed
export async function needsMigration(userId: string): Promise<boolean> {
  const migrated = await AsyncStorage.getItem(MIGRATION_FLAG);
  if (migrated === userId) {
    return false;
  }

  // Check if there's any local data worth migrating
  const localUser = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.USER);
  const localCheckIns = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.CHECK_INS);
  const localMentalLoad = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.MENTAL_LOAD);

  return !!(localUser || localCheckIns || localMentalLoad);
}

// Migrate all local data to Firestore
export async function migrateLocalDataToFirestore(
  userId: string
): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: true,
    migratedCount: {
      user: false,
      checkIns: 0,
      mentalLoadItems: 0,
      journalEntries: 0,
      insights: 0,
      facts: 0,
      patterns: 0,
    },
    errors: [],
  };

  // Check if already migrated
  const migrated = await AsyncStorage.getItem(MIGRATION_FLAG);
  if (migrated === userId) {
    console.log('Data already migrated for this user');
    return result;
  }

  const db = firestore();
  const userRef = getUserRef(userId);

  try {
    // 1. Migrate user profile
    const localUser = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    if (localUser) {
      try {
        const userData = JSON.parse(localUser);
        await userRef.set(
          {
            name: userData.name || '',
            stage: userData.stage,
            concerns: userData.concerns || [],
            goals: userData.goals || [],
            babyName: userData.babyName || null,
            babyBirthDate: userData.babyBirthDate
              ? firestore.Timestamp.fromDate(new Date(userData.babyBirthDate))
              : null,
            dueDate: userData.dueDate
              ? firestore.Timestamp.fromDate(new Date(userData.dueDate))
              : null,
            returnToWorkDate: userData.returnToWorkDate
              ? firestore.Timestamp.fromDate(new Date(userData.returnToWorkDate))
              : null,
            childrenAges: userData.childrenAges || [],
            hasCompletedOnboarding: userData.hasCompletedOnboarding || false,
            updatedAt: firestore.FieldValue.serverTimestamp(),
            lastSyncedAt: firestore.FieldValue.serverTimestamp(),
            migratedFromLocal: true,
          },
          { merge: true }
        );
        result.migratedCount.user = true;
      } catch (error) {
        result.errors.push(`User migration failed: ${error}`);
      }
    }

    // 2. Migrate check-ins
    const localCheckIns = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.CHECK_INS);
    if (localCheckIns) {
      try {
        const checkIns = JSON.parse(localCheckIns);
        const batch = db.batch();
        let count = 0;

        for (const checkIn of checkIns) {
          if (checkIn.id) {
            const checkInRef = userRef.collection(COLLECTIONS.CHECK_INS).doc(checkIn.id);
            batch.set(checkInRef, {
              ...checkIn,
              date: checkIn.date
                ? firestore.Timestamp.fromDate(new Date(checkIn.date))
                : firestore.FieldValue.serverTimestamp(),
              createdAt: checkIn.createdAt
                ? firestore.Timestamp.fromDate(new Date(checkIn.createdAt))
                : firestore.FieldValue.serverTimestamp(),
              syncedAt: firestore.FieldValue.serverTimestamp(),
            });
            count++;
          }
        }

        if (count > 0) {
          await batch.commit();
          result.migratedCount.checkIns = count;
        }
      } catch (error) {
        result.errors.push(`Check-ins migration failed: ${error}`);
      }
    }

    // 3. Migrate mental load items
    const localMentalLoad = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.MENTAL_LOAD);
    if (localMentalLoad) {
      try {
        const items = JSON.parse(localMentalLoad);
        const batch = db.batch();
        let count = 0;

        for (const item of items) {
          if (item.id) {
            const itemRef = userRef
              .collection(COLLECTIONS.MENTAL_LOAD_ITEMS)
              .doc(item.id);
            batch.set(itemRef, {
              ...item,
              createdAt: item.createdAt
                ? firestore.Timestamp.fromDate(new Date(item.createdAt))
                : firestore.FieldValue.serverTimestamp(),
              dueDate: item.dueDate
                ? firestore.Timestamp.fromDate(new Date(item.dueDate))
                : null,
              syncedAt: firestore.FieldValue.serverTimestamp(),
            });
            count++;
          }
        }

        if (count > 0) {
          await batch.commit();
          result.migratedCount.mentalLoadItems = count;
        }
      } catch (error) {
        result.errors.push(`Mental load items migration failed: ${error}`);
      }
    }

    // 4. Migrate journal entries
    const localJournal = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.JOURNAL_ENTRIES);
    if (localJournal) {
      try {
        const entries = JSON.parse(localJournal);
        const batch = db.batch();
        let count = 0;

        for (const entry of entries) {
          if (entry.id) {
            const entryRef = userRef
              .collection(COLLECTIONS.JOURNAL_ENTRIES)
              .doc(entry.id);
            batch.set(entryRef, {
              ...entry,
              createdAt: entry.createdAt
                ? firestore.Timestamp.fromDate(new Date(entry.createdAt))
                : firestore.FieldValue.serverTimestamp(),
              syncedAt: firestore.FieldValue.serverTimestamp(),
            });
            count++;
          }
        }

        if (count > 0) {
          await batch.commit();
          result.migratedCount.journalEntries = count;
        }
      } catch (error) {
        result.errors.push(`Journal entries migration failed: ${error}`);
      }
    }

    // 5. Migrate insights
    const localInsights = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.INSIGHTS);
    if (localInsights) {
      try {
        const insights = JSON.parse(localInsights);
        const batch = db.batch();
        let count = 0;

        for (const insight of insights) {
          if (insight.id) {
            const insightRef = userRef.collection(COLLECTIONS.INSIGHTS).doc(insight.id);
            batch.set(insightRef, {
              ...insight,
              createdAt: insight.createdAt
                ? firestore.Timestamp.fromDate(new Date(insight.createdAt))
                : firestore.FieldValue.serverTimestamp(),
              syncedAt: firestore.FieldValue.serverTimestamp(),
            });
            count++;
          }
        }

        if (count > 0) {
          await batch.commit();
          result.migratedCount.insights = count;
        }
      } catch (error) {
        result.errors.push(`Insights migration failed: ${error}`);
      }
    }

    // 6. Migrate user facts (memory)
    const localFacts = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.USER_FACTS);
    if (localFacts) {
      try {
        const facts = JSON.parse(localFacts);
        const batch = db.batch();
        let count = 0;

        for (const fact of facts) {
          if (fact.id) {
            const factRef = userRef
              .collection(COLLECTIONS.MEMORY)
              .doc('data')
              .collection(COLLECTIONS.FACTS)
              .doc(fact.id);
            batch.set(factRef, {
              ...fact,
              createdAt: fact.createdAt
                ? firestore.Timestamp.fromDate(new Date(fact.createdAt))
                : firestore.FieldValue.serverTimestamp(),
              updatedAt: fact.updatedAt
                ? firestore.Timestamp.fromDate(new Date(fact.updatedAt))
                : firestore.FieldValue.serverTimestamp(),
            });
            count++;
          }
        }

        if (count > 0) {
          await batch.commit();
          result.migratedCount.facts = count;
        }
      } catch (error) {
        result.errors.push(`Facts migration failed: ${error}`);
      }
    }

    // 7. Migrate patterns
    const localPatterns = await AsyncStorage.getItem(LOCAL_STORAGE_KEYS.PATTERNS);
    if (localPatterns) {
      try {
        const patterns = JSON.parse(localPatterns);
        const batch = db.batch();
        let count = 0;

        for (const pattern of patterns) {
          if (pattern.id) {
            const patternRef = userRef
              .collection(COLLECTIONS.MEMORY)
              .doc('data')
              .collection(COLLECTIONS.PATTERNS)
              .doc(pattern.id);
            batch.set(patternRef, {
              ...pattern,
              firstDetected: pattern.firstDetected
                ? firestore.Timestamp.fromDate(new Date(pattern.firstDetected))
                : firestore.FieldValue.serverTimestamp(),
              lastSeen: pattern.lastSeen
                ? firestore.Timestamp.fromDate(new Date(pattern.lastSeen))
                : firestore.FieldValue.serverTimestamp(),
            });
            count++;
          }
        }

        if (count > 0) {
          await batch.commit();
          result.migratedCount.patterns = count;
        }
      } catch (error) {
        result.errors.push(`Patterns migration failed: ${error}`);
      }
    }

    // Mark as migrated
    await AsyncStorage.setItem(MIGRATION_FLAG, userId);

    console.log('Migration completed:', result);
  } catch (error) {
    result.success = false;
    result.errors.push(`Migration failed: ${error}`);
    console.error('Migration failed:', error);
  }

  return result;
}

// Clear migration flag (for testing or re-migration)
export async function clearMigrationFlag(): Promise<void> {
  await AsyncStorage.removeItem(MIGRATION_FLAG);
}

// Get migration status
export async function getMigrationStatus(): Promise<string | null> {
  return await AsyncStorage.getItem(MIGRATION_FLAG);
}
