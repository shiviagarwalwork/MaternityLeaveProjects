import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/theme';

const letterData: Record<string, { word: string; description: string }> = {
  A: { word: 'Apple', description: 'A is for Apple! Say "aah" like at the doctor.' },
  B: { word: 'Ball', description: 'B is for Ball! Press your lips together and say "buh".' },
  C: { word: 'Cat', description: 'C is for Cat! Say "kuh" from the back of your throat.' },
  D: { word: 'Dog', description: 'D is for Dog! Touch your tongue to your teeth and say "duh".' },
  E: { word: 'Elephant', description: 'E is for Elephant! Say "eh" like you\'re thinking.' },
  F: { word: 'Fish', description: 'F is for Fish! Blow air through your teeth and say "fff".' },
};

export default function LetterLearningScreen() {
  const { letterId } = useLocalSearchParams<{ letterId: string }>();
  const letter = letterId?.toUpperCase() || 'A';
  const data = letterData[letter] || letterData.A;

  const [isListening, setIsListening] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);

  const stageIndex = letter.charCodeAt(0) - 65; // A=0, B=1, etc.
  const color = colors.stageColors[stageIndex % colors.stageColors.length];

  const handleMicPress = () => {
    if (isListening) {
      // Stop listening - simulate success after attempts
      setIsListening(false);
      if (attempts >= 1) {
        setSuccess(true);
      } else {
        setAttempts(attempts + 1);
      }
    } else {
      // Start listening
      setIsListening(true);
    }
  };

  const handleNext = () => {
    const nextLetter = String.fromCharCode(letter.charCodeAt(0) + 1);
    if (nextLetter <= 'Z') {
      setSuccess(false);
      setAttempts(0);
      router.replace(`/learn/${nextLetter}`);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.progressDots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                i <= attempts && { backgroundColor: color },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Letter Display */}
        <View style={[styles.letterCard, { backgroundColor: `${color}15` }]}>
          <Text style={[styles.letterText, { color }]}>{letter}</Text>
          <Text style={[styles.letterLower, { color: `${color}80` }]}>
            {letter.toLowerCase()}
          </Text>
        </View>

        {/* Word Example */}
        <View style={styles.wordSection}>
          <View style={[styles.wordBadge, { backgroundColor: `${color}20` }]}>
            <Ionicons name="sparkles" size={16} color={color} />
            <Text style={[styles.wordText, { color }]}>{data.word}</Text>
          </View>
          <Text style={styles.description}>{data.description}</Text>
        </View>

        {/* Microphone Button */}
        {!success ? (
          <TouchableOpacity
            style={[
              styles.micButton,
              { backgroundColor: isListening ? colors.error : color },
            ]}
            onPress={handleMicPress}
            activeOpacity={0.8}
          >
            <View style={[styles.micPulse, isListening && styles.micPulseActive]} />
            <Ionicons
              name={isListening ? 'stop' : 'mic'}
              size={48}
              color={colors.surface}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.successContainer}>
            <View style={[styles.successIcon, { backgroundColor: colors.success }]}>
              <Ionicons name="checkmark" size={48} color={colors.surface} />
            </View>
            <Text style={styles.successText}>Great job!</Text>
          </View>
        )}

        <Text style={styles.instruction}>
          {isListening
            ? 'Listening... Say the letter sound!'
            : success
            ? 'You did it!'
            : 'Tap the microphone and say the letter sound'}
        </Text>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.hintButton}>
          <Ionicons name="bulb-outline" size={24} color={color} />
          <Text style={[styles.hintText, { color }]}>Hint</Text>
        </TouchableOpacity>

        {success && (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: color }]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Next Letter</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.surface} />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.speakerButton}>
          <Ionicons name="volume-high-outline" size={24} color={color} />
          <Text style={[styles.speakerText, { color }]}>Hear it</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDots: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: `${colors.textLight}40`,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  letterCard: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 120,
    fontWeight: fontWeight.extrabold,
    lineHeight: 130,
  },
  letterLower: {
    fontSize: 48,
    fontWeight: fontWeight.bold,
    marginTop: -10,
  },
  wordSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  wordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  wordText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    lineHeight: 24,
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  micPulse: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'transparent',
  },
  micPulseActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ scale: 1.2 }],
  },
  successContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.success,
    marginTop: spacing.md,
  },
  instruction: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  hintButton: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  hintText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    marginTop: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  nextButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  speakerButton: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  speakerText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    marginTop: 4,
  },
});
