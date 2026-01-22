import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, MoodEmojis, MoodLabels, EnergyLabels } from '../constants/theme';
import { MoodLevel, EnergyLevel, SleepQuality } from '../types';

export default function CheckInScreen() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<MoodLevel | null>(null);
  const [energy, setEnergy] = useState<EnergyLevel | null>(null);
  const [sleep, setSleep] = useState<SleepQuality | null>(null);
  const [notes, setNotes] = useState('');

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit check-in
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // In production, save to backend
    console.log('Check-in submitted:', { mood, energy, sleep, notes });
    // Navigate back or show success
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return mood !== null;
      case 2:
        return energy !== null;
      case 3:
        return sleep !== null;
      case 4:
        return true; // Notes are optional
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>How are you feeling today?</Text>
            <Text style={styles.stepSubtitle}>
              Tap the emoji that best represents your mood right now
            </Text>
            <View style={styles.moodGrid}>
              {MoodEmojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.moodOption,
                    mood === (index + 1) && styles.moodOptionSelected,
                  ]}
                  onPress={() => setMood((index + 1) as MoodLevel)}
                >
                  <Text style={styles.moodEmoji}>{emoji}</Text>
                  <Text
                    style={[
                      styles.moodLabel,
                      mood === (index + 1) && styles.moodLabelSelected,
                    ]}
                  >
                    {MoodLabels[index]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>How's your energy level?</Text>
            <Text style={styles.stepSubtitle}>
              From exhausted to energized, where are you today?
            </Text>
            <View style={styles.energyContainer}>
              {[1, 2, 3, 4, 5].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.energyOption,
                    energy === level && styles.energyOptionSelected,
                  ]}
                  onPress={() => setEnergy(level as EnergyLevel)}
                >
                  <View
                    style={[
                      styles.energyBar,
                      { height: level * 16 },
                      energy === level && styles.energyBarSelected,
                    ]}
                  />
                  <Text
                    style={[
                      styles.energyLabel,
                      energy === level && styles.energyLabelSelected,
                    ]}
                  >
                    {EnergyLabels[level - 1]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>How did you sleep?</Text>
            <Text style={styles.stepSubtitle}>
              We know sleep is hard. No judgment—just tracking.
            </Text>
            <View style={styles.sleepOptions}>
              {(['poor', 'fair', 'good', 'excellent'] as SleepQuality[]).map(
                (quality) => (
                  <TouchableOpacity
                    key={quality}
                    style={[
                      styles.sleepOption,
                      sleep === quality && styles.sleepOptionSelected,
                    ]}
                    onPress={() => setSleep(quality)}
                  >
                    <Text style={styles.sleepEmoji}>
                      {quality === 'poor'
                        ? '😴'
                        : quality === 'fair'
                        ? '😐'
                        : quality === 'good'
                        ? '🙂'
                        : '😊'}
                    </Text>
                    <Text
                      style={[
                        styles.sleepLabel,
                        sleep === quality && styles.sleepLabelSelected,
                      ]}
                    >
                      {quality.charAt(0).toUpperCase() + quality.slice(1)}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Anything else on your mind?</Text>
            <Text style={styles.stepSubtitle}>
              Optional. This is a safe space to share.
            </Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Write anything you'd like to remember or process..."
              placeholderTextColor={Colors.muted}
              multiline
              numberOfLines={6}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
            <View style={styles.promptsContainer}>
              <Text style={styles.promptsLabel}>Need a prompt?</Text>
              <View style={styles.prompts}>
                {[
                  "What's weighing on you?",
                  "What made you smile today?",
                  "What do you need right now?",
                ].map((prompt, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.promptButton}
                    onPress={() => setNotes(prompt + '\n\n')}
                  >
                    <Text style={styles.promptText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} disabled={step === 1}>
          <Text style={[styles.backButton, step === 1 && styles.backButtonDisabled]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          {[1, 2, 3, 4].map((s) => (
            <View
              key={s}
              style={[
                styles.progressDot,
                s <= step && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
        <TouchableOpacity>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {renderStep()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canProceed() && styles.continueButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.continueButtonText}>
            {step === totalSteps ? 'Complete Check-in' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },
  backButtonDisabled: {
    color: Colors.muted,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  skipButton: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    fontWeight: FontWeights.medium,
  },

  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    flexGrow: 1,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },

  // Mood
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  moodOption: {
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    width: '18%',
  },
  moodOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  moodEmoji: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  moodLabel: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    textAlign: 'center',
  },
  moodLabelSelected: {
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },

  // Energy
  energyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  energyOption: {
    alignItems: 'center',
    width: '18%',
  },
  energyOptionSelected: {
    // Selected state handled by bar color
  },
  energyBar: {
    width: 40,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },
  energyBarSelected: {
    backgroundColor: Colors.primary,
  },
  energyLabel: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    textAlign: 'center',
  },
  energyLabelSelected: {
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },

  // Sleep
  sleepOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  sleepOption: {
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.card,
    width: '23%',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sleepOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  sleepEmoji: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  sleepLabel: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  sleepLabelSelected: {
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },

  // Notes
  notesInput: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    fontSize: FontSizes.md,
    color: Colors.foreground,
    minHeight: 150,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promptsContainer: {
    marginTop: Spacing.xl,
  },
  promptsLabel: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginBottom: Spacing.sm,
  },
  prompts: {
    gap: Spacing.sm,
  },
  promptButton: {
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promptText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },

  // Footer
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: Colors.border,
  },
  continueButtonText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: 'white',
  },
});
