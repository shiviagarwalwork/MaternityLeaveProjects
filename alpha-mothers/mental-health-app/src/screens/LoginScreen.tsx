// LoginScreen - Authentication screen for AlphaMa
// Provides Google and Apple Sign-In options

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthContext } from '../contexts/AuthContext';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '../constants/theme';

export default function LoginScreen() {
  const {
    signInWithGoogle,
    signInWithApple,
    isLoading,
    error,
    isAppleSignInAvailable,
    isMigrating,
  } = useAuthContext();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      Alert.alert('Sign In Failed', 'Could not sign in with Google. Please try again.');
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
    } catch (err) {
      Alert.alert('Sign In Failed', 'Could not sign in with Apple. Please try again.');
    }
  };

  if (isMigrating) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Syncing your data...</Text>
          <Text style={styles.loadingSubtext}>
            We're moving your existing data to the cloud
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary50, Colors.background]}
        style={styles.gradient}
      >
        {/* Logo & Welcome */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🌸</Text>
          </View>
          <Text style={styles.title}>AlphaMa</Text>
          <Text style={styles.subtitle}>Your supportive companion{'\n'}through motherhood</Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <FeatureItem icon="🧠" text="AI-powered emotional support" />
          <FeatureItem icon="📊" text="Track your wellness journey" />
          <FeatureItem icon="☁️" text="Sync across all your devices" />
        </View>

        {/* Sign In Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Google Sign In */}
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={styles.buttonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Apple Sign In (iOS only) */}
          {isAppleSignInAvailable && (
            <TouchableOpacity
              style={[styles.button, styles.appleButton]}
              onPress={handleAppleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.appleIcon}></Text>
                  <Text style={[styles.buttonText, styles.appleButtonText]}>
                    Continue with Apple
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {/* Error Message */}
          {error && (
            <Text style={styles.errorText}>
              {error.message || 'An error occurred. Please try again.'}
            </Text>
          )}
        </View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

// Feature item component
function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  loadingText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold as any,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  loadingSubtext: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl * 2,
    paddingBottom: Spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: FontWeights.bold as any,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  features: {
    paddingVertical: Spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  featureText: {
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    fontWeight: FontWeights.medium as any,
  },
  buttonsContainer: {
    paddingTop: Spacing.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md + 4,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: FontWeights.bold as any,
    color: '#fff',
    marginRight: Spacing.md,
    backgroundColor: '#fff',
    color: '#4285F4',
    width: 28,
    height: 28,
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 4,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  appleIcon: {
    fontSize: 20,
    color: '#fff',
    marginRight: Spacing.md,
  },
  buttonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold as any,
    color: '#fff',
  },
  appleButtonText: {
    color: '#fff',
  },
  errorText: {
    fontSize: FontSizes.sm,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  terms: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  termsText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: FontWeights.medium as any,
  },
});
