import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../../src/theme';

const wordData: Record<string, { phonemes: string[]; image: string }> = {
  cat: { phonemes: ['c', 'a', 't'], image: 'paw' },
  dog: { phonemes: ['d', 'o', 'g'], image: 'paw' },
  sun: { phonemes: ['s', 'u', 'n'], image: 'sunny' },
  hat: { phonemes: ['h', 'a', 't'], image: 'shirt' },
  bed: { phonemes: ['b', 'e', 'd'], image: 'bed' },
  map: { phonemes: ['m', 'a', 'p'], image: 'map' },
  pen: { phonemes: ['p', 'e', 'n'], image: 'pencil' },
  cup: { phonemes: ['c', 'u', 'p'], image: 'cafe' },
};

export default function WordLearningScreen() {
  const { wordId } = useLocalSearchParams<{ wordId: string }>();
  const word = wordId?.toLowerCase() || 'cat';
  const data = wordData[word] || wordData.cat;

  const [currentPhoneme, setCurrentPhoneme] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [completedPhonemes, setCompletedPhonemes] = useState<boolean[]>(
    new Array(data.phonemes.length).fill(false)
  );
  const [wordComplete, setWordComplete] = useState(false);

  const handleMicPress = () => {
    if (isListening) {
      // Stop listening and simulate success
      setIsListening(false);
      const newCompleted = [...completedPhonemes];
      newCompleted[currentPhoneme] = true;
      setCompletedPhonemes(newCompleted);

      if (currentPhoneme < data.phonemes.length - 1) {
        setCurrentPhoneme(currentPhoneme + 1);
      } else {
        setWordComplete(true);
      }
    } else {
      setIsListening(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentPhoneme(0);
    setCompletedPhonemes(new Array(data.phonemes.length).fill(false));
    setWordComplete(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CVC Words</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Word Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons
            name={data.image as any}
            size={80}
            color={colors.stageColors[2]}
          />
        </View>

        {/* Phoneme Display */}
        <View style={styles.phonemeContainer}>
          {data.phonemes.map((phoneme, index) => {
            const isActive = index === currentPhoneme && !wordComplete;
            const isCompleted = completedPhonemes[index];

            return (
              <View
                key={index}
                style={[
                  styles.phonemeBox,
                  isActive && styles.phonemeBoxActive,
                  isCompleted && styles.phonemeBoxCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.phonemeText,
                    isActive && styles.phonemeTextActive,
                    isCompleted && styles.phonemeTextCompleted,
                  ]}
                >
                  {phoneme.toUpperCase()}
                </Text>
                {isActive && !wordComplete && (
                  <View style={styles.phonemeIndicator} />
                )}
                {isCompleted && (
                  <View style={styles.checkMark}>
                    <Ionicons name="checkmark" size={16} color={colors.surface} />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Full Word */}
        <Text style={styles.fullWord}>{word.toUpperCase()}</Text>

        {/* Status Message */}
        {!wordComplete ? (
          <Text style={styles.instruction}>
            {isListening
              ? `Say "${data.phonemes[currentPhoneme].toUpperCase()}"!`
              : `Tap and say the sound for "${data.phonemes[currentPhoneme].toUpperCase()}"`}
          </Text>
        ) : (
          <View style={styles.successMessage}>
            <Ionicons name="star" size={24} color={colors.gold} />
            <Text style={styles.successText}>You read the whole word!</Text>
          </View>
        )}

        {/* Microphone / Completion */}
        {!wordComplete ? (
          <TouchableOpacity
            style={[
              styles.micButton,
              { backgroundColor: isListening ? colors.error : colors.stageColors[2] },
            ]}
            onPress={handleMicPress}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isListening ? 'stop' : 'mic'}
              size={40}
              color={colors.surface}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.completionActions}>
            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={handleTryAgain}
            >
              <Ionicons name="refresh" size={24} color={colors.stageColors[2]} />
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => router.back()}
            >
              <Text style={styles.continueText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.surface} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  (completedPhonemes.filter(Boolean).length / data.phonemes.length) *
                  100
                }%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {completedPhonemes.filter(Boolean).length} / {data.phonemes.length} sounds
        </Text>
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
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
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
    paddingTop: spacing.lg,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: borderRadius.xxl,
    backgroundColor: `${colors.stageColors[2]}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  phonemeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  phonemeBox: {
    width: 80,
    height: 100,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: `${colors.textLight}30`,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  phonemeBoxActive: {
    borderColor: colors.stageColors[2],
    backgroundColor: `${colors.stageColors[2]}10`,
    transform: [{ scale: 1.05 }],
  },
  phonemeBoxCompleted: {
    borderColor: colors.success,
    backgroundColor: `${colors.success}10`,
  },
  phonemeText: {
    fontSize: 48,
    fontWeight: fontWeight.extrabold,
    color: colors.textLight,
  },
  phonemeTextActive: {
    color: colors.stageColors[2],
  },
  phonemeTextCompleted: {
    color: colors.success,
  },
  phonemeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.stageColors[2],
  },
  checkMark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWord: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 8,
    marginBottom: spacing.md,
  },
  instruction: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  successText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.success,
  },
  micButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  completionActions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  tryAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.stageColors[2]}15`,
    gap: spacing.sm,
  },
  tryAgainText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.stageColors[2],
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.success,
    gap: spacing.sm,
  },
  continueText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: `${colors.stageColors[2]}20`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.stageColors[2],
    borderRadius: 4,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
