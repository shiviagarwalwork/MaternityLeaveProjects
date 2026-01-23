// useAuth Hook - Firebase Authentication for AlphaMa
// Provides Google and Apple Sign-In functionality

import { useState, useEffect, useCallback } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  signInWithGoogle,
  signInWithApple,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  isAppleSignInAvailable,
  AuthResult,
} from '../services/firebase/auth';
import {
  createOrUpdateUserProfile,
  getUserProfile,
  FirestoreUserProfile,
} from '../services/firebase/firestore';
import {
  needsMigration,
  migrateLocalDataToFirestore,
  MigrationResult,
} from '../services/firebase/migration';

export interface UseAuthReturn {
  // Auth state
  user: FirebaseAuthTypes.User | null;
  profile: FirestoreUserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;

  // Auth methods
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;

  // Feature flags
  isAppleSignInAvailable: boolean;

  // Migration
  migrationResult: MigrationResult | null;
  isMigrating: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profile, setProfile] = useState<FirestoreUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  const [migrationResult, setMigrationResult] = useState<MigrationResult | null>(null);
  const [isMigrating, setIsMigrating] = useState(false);

  // Check Apple Sign-In availability
  useEffect(() => {
    isAppleSignInAvailable().then(setIsAppleAvailable);
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Load user profile from Firestore
        try {
          const userProfile = await getUserProfile(firebaseUser.uid);
          setProfile(userProfile);
        } catch (err) {
          console.error('Failed to load profile:', err);
        }
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handle auth result (common for both Google and Apple)
  const handleAuthResult = useCallback(async (result: AuthResult) => {
    try {
      // Create/update user profile in Firestore
      await createOrUpdateUserProfile(result.user, result.provider);

      // Check if migration is needed for new users with existing local data
      if (result.isNewUser) {
        const shouldMigrate = await needsMigration(result.user.uid);
        if (shouldMigrate) {
          setIsMigrating(true);
          const migration = await migrateLocalDataToFirestore(result.user.uid);
          setMigrationResult(migration);
          setIsMigrating(false);
        }
      }

      // Load fresh profile
      const userProfile = await getUserProfile(result.user.uid);
      setProfile(userProfile);
    } catch (err) {
      console.error('Post-auth setup failed:', err);
      throw err;
    }
  }, []);

  // Google Sign-In
  const handleGoogleSignIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithGoogle();
      await handleAuthResult(result);
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('Google Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthResult]);

  // Apple Sign-In
  const handleAppleSignIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInWithApple();
      await handleAuthResult(result);
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('Apple Sign-In error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthResult]);

  // Sign Out
  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await firebaseSignOut();
      setProfile(null);
      setMigrationResult(null);
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    error,
    signInWithGoogle: handleGoogleSignIn,
    signInWithApple: handleAppleSignIn,
    signOut: handleSignOut,
    isAppleSignInAvailable: isAppleAvailable,
    migrationResult,
    isMigrating,
  };
}

export default useAuth;
