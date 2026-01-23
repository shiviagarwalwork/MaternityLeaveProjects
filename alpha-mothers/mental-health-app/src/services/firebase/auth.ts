// Firebase Authentication Service for AlphaMa
// Supports Google Sign-In and Apple Sign-In

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

// ==================== TYPES ====================

export interface AuthResult {
  user: FirebaseAuthTypes.User;
  isNewUser: boolean;
  provider: 'google' | 'apple';
}

export interface AuthError {
  code: string;
  message: string;
}

// ==================== GOOGLE SIGN-IN ====================

export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    // Check if device supports Google Play Services (Android)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in and get user info
    const signInResult = await GoogleSignin.signIn();
    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error('No ID token received from Google Sign-In');
    }

    // Create Google credential
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign in with Firebase
    const result = await auth().signInWithCredential(googleCredential);

    return {
      user: result.user,
      isNewUser: result.additionalUserInfo?.isNewUser ?? false,
      provider: 'google',
    };
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Sign-in cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign-in already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services not available');
    }
    throw error;
  }
}

// ==================== APPLE SIGN-IN ====================

export async function signInWithApple(): Promise<AuthResult> {
  // Generate secure nonce
  const nonce = generateNonce();
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce
  );

  // Request Apple Sign-In
  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });

  const { identityToken } = appleCredential;
  if (!identityToken) {
    throw new Error('No identity token received from Apple');
  }

  // Create Firebase credential
  const firebaseCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  );

  // Sign in with Firebase
  const result = await auth().signInWithCredential(firebaseCredential);

  // Apple only provides name on first sign-in, so update profile if available
  if (appleCredential.fullName?.givenName && result.additionalUserInfo?.isNewUser) {
    const displayName = [
      appleCredential.fullName.givenName,
      appleCredential.fullName.familyName,
    ]
      .filter(Boolean)
      .join(' ');

    if (displayName) {
      await result.user.updateProfile({ displayName });
    }
  }

  return {
    user: result.user,
    isNewUser: result.additionalUserInfo?.isNewUser ?? false,
    provider: 'apple',
  };
}

// Generate random nonce for Apple Sign-In security
function generateNonce(length: number = 32): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const values = new Uint8Array(length);

  // Use crypto for secure random values
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(values);
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < length; i++) {
      values[i] = Math.floor(Math.random() * 256);
    }
  }

  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}

// Check if Apple Sign-In is available
export async function isAppleSignInAvailable(): Promise<boolean> {
  if (Platform.OS !== 'ios') {
    return false;
  }
  return await AppleAuthentication.isAvailableAsync();
}

// ==================== SIGN OUT ====================

export async function signOut(): Promise<void> {
  const currentUser = auth().currentUser;

  if (currentUser) {
    // Get provider ID to sign out of correct provider
    const providerId = currentUser.providerData[0]?.providerId;

    if (providerId === 'google.com') {
      try {
        await GoogleSignin.signOut();
      } catch (error) {
        console.warn('Google sign out error:', error);
      }
    }

    await auth().signOut();
  }
}

// ==================== AUTH STATE ====================

export function onAuthStateChanged(
  callback: (user: FirebaseAuthTypes.User | null) => void
): () => void {
  return auth().onAuthStateChanged(callback);
}

export function getCurrentUser(): FirebaseAuthTypes.User | null {
  return auth().currentUser;
}

// ==================== ACCOUNT MANAGEMENT ====================

export async function deleteAccount(): Promise<void> {
  const user = auth().currentUser;
  if (!user) {
    throw new Error('No user signed in');
  }

  // Note: Firestore data should be deleted before calling this
  await user.delete();
}

export async function reauthenticateWithGoogle(): Promise<void> {
  await GoogleSignin.hasPlayServices();
  const { data } = await GoogleSignin.signIn();

  if (!data?.idToken) {
    throw new Error('Failed to get ID token');
  }

  const credential = auth.GoogleAuthProvider.credential(data.idToken);
  await auth().currentUser?.reauthenticateWithCredential(credential);
}

export async function reauthenticateWithApple(): Promise<void> {
  const nonce = generateNonce();
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce
  );

  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });

  if (!appleCredential.identityToken) {
    throw new Error('Failed to get identity token');
  }

  const credential = auth.AppleAuthProvider.credential(
    appleCredential.identityToken,
    nonce
  );
  await auth().currentUser?.reauthenticateWithCredential(credential);
}
