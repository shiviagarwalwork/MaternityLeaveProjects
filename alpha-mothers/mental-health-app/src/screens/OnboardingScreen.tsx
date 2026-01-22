import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '../constants/theme';
import { UserStage, UserConcern } from '../types';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  name: string;
  stage: UserStage;
  concerns: UserConcern[];
  babyName?: string;
  dueDate?: string;
}

const STAGES: { id: UserStage; emoji: string; title: string; description: string }[] = [
  { id: 'pregnant', emoji: '🤰', title: 'Expecting', description: 'Preparing for motherhood' },
  { id: 'new_mom', emoji: '👶', title: 'New Mom', description: 'Baby is 0-6 months' },
  { id: 'postpartum', emoji: '🍼', title: 'Postpartum', description: 'Baby is 6-12 months' },
  { id: 'returning_to_work', emoji: '💼', title: 'Returning to Work', description: 'Preparing or just returned' },
  { id: 'working_mom', emoji: '⚡', title: 'Working Mom', description: 'Balancing career & family' },
  { id: 'established_mom', emoji: '🌟', title: 'Established Mom', description: 'Kids are 1+ years' },
];

const CONCERNS: { id: UserConcern; emoji: string; title: string }[] = [
  { id: 'sleep_deprivation', emoji: '😴', title: 'Sleep Deprivation' },
  { id: 'anxiety_overwhelm', emoji: '😰', title: 'Anxiety & Overwhelm' },
  { id: 'work_life_balance', emoji: '⚖️', title: 'Work-Life Balance' },
  { id: 'career_identity', emoji: '🎯', title: 'Career & Identity' },
  { id: 'relationship_changes', emoji: '💑', title: 'Relationship Changes' },
  { id: 'physical_recovery', emoji: '🏃‍♀️', title: 'Physical Recovery' },
  { id: 'loneliness', emoji: '🫂', title: 'Loneliness & Isolation' },
  { id: 'mom_guilt', emoji: '💔', title: 'Mom Guilt' },
  { id: 'screen_time_kids', emoji: '📱', title: 'Kids & Screen Time' },
  { id: 'financial_stress', emoji: '💰', title: 'Financial Stress' },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [stage, setStage] = useState<UserStage | null>(null);
  const [concerns, setConcerns] = useState<UserConcern[]>([]);
  const [babyName, setBabyName] = useState('');

  const totalSteps = 5;
  const progress = (step + 1) / totalSteps;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleConcernToggle = (concern: UserConcern) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else if (concerns.length < 3) {
      setConcerns([...concerns, concern]);
    }
  };

  const handleComplete = () => {
    if (name && stage && concerns.length > 0) {
      onComplete({
        name,
        stage,
        concerns,
        babyName: babyName || undefined,
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true; // Welcome
      case 1: return stage !== null;
      case 2: return name.trim().length > 0;
      case 3: return concerns.length > 0;
      case 4: return true; // Ready
      default: return false;
    }
  };

  const renderWelcome = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.welcomeEmoji}>🌸</Text>
      <Text style={styles.welcomeTitle}>Welcome to{'\n'}Alpha Mothers</Text>
      <Text style={styles.welcomeSubtitle}>
        Your personal companion for navigating motherhood with confidence and calm.
      </Text>
      <View style={styles.welcomeFeatures}>
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>💬</Text>
          <Text style={styles.featureText}>AI companion who understands</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>📊</Text>
          <Text style={styles.featureText}>Track your mental wellness</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>🎯</Text>
          <Text style={styles.featureText}>Personalized for your journey</Text>
        </View>
      </View>
    </View>
  );

  const renderStageSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Where are you in your journey?</Text>
      <Text style={styles.stepSubtitle}>This helps us personalize your experience</Text>
      <ScrollView style={styles.optionsScroll} showsVerticalScrollIndicator={false}>
        {STAGES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.stageCard,
              stage === item.id && styles.stageCardSelected,
            ]}
            onPress={() => setStage(item.id)}
          >
            <Text style={styles.stageEmoji}>{item.emoji}</Text>
            <View style={styles.stageTextContainer}>
              <Text style={[
                styles.stageTitle,
                stage === item.id && styles.stageTitleSelected,
              ]}>
                {item.title}
              </Text>
              <Text style={styles.stageDescription}>{item.description}</Text>
            </View>
            {stage === item.id && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderNameInput = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepEmoji}>👋</Text>
      <Text style={styles.stepTitle}>What should we call you?</Text>
      <Text style={styles.stepSubtitle}>Your first name is perfect</Text>
      <TextInput
        style={styles.nameInput}
        placeholder="Your name"
        placeholderTextColor={Colors.muted}
        value={name}
        onChangeText={setName}
        autoFocus
        autoCapitalize="words"
      />
      {(stage === 'pregnant' || stage === 'new_mom' || stage === 'postpartum') && (
        <>
          <Text style={styles.optionalLabel}>
            {stage === 'pregnant' ? "Baby's name (if chosen)" : "Baby's name (optional)"}
          </Text>
          <TextInput
            style={styles.nameInput}
            placeholder={stage === 'pregnant' ? "Baby's name" : "Baby's name"}
            placeholderTextColor={Colors.muted}
            value={babyName}
            onChangeText={setBabyName}
            autoCapitalize="words"
          />
        </>
      )}
    </View>
  );

  const renderConcernsSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What's on your mind lately?</Text>
      <Text style={styles.stepSubtitle}>Select up to 3 that resonate most</Text>
      <ScrollView style={styles.concernsScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.concernsGrid}>
          {CONCERNS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.concernCard,
                concerns.includes(item.id) && styles.concernCardSelected,
              ]}
              onPress={() => handleConcernToggle(item.id)}
            >
              <Text style={styles.concernEmoji}>{item.emoji}</Text>
              <Text style={[
                styles.concernTitle,
                concerns.includes(item.id) && styles.concernTitleSelected,
              ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Text style={styles.selectionCount}>{concerns.length}/3 selected</Text>
    </View>
  );

  const renderReady = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.readyEmoji}>✨</Text>
      <Text style={styles.readyTitle}>You're all set, {name}!</Text>
      <Text style={styles.readySubtitle}>
        We've personalized Alpha Mothers just for you. Here's what awaits:
      </Text>
      <View style={styles.readyFeatures}>
        <View style={styles.readyFeatureItem}>
          <Text style={styles.readyFeatureEmoji}>☀️</Text>
          <View>
            <Text style={styles.readyFeatureTitle}>Daily Check-ins</Text>
            <Text style={styles.readyFeatureText}>Track your mood & energy in 30 seconds</Text>
          </View>
        </View>
        <View style={styles.readyFeatureItem}>
          <Text style={styles.readyFeatureEmoji}>🤖</Text>
          <View>
            <Text style={styles.readyFeatureTitle}>Alpha - Your AI Companion</Text>
            <Text style={styles.readyFeatureText}>Chat anytime about anything</Text>
          </View>
        </View>
        <View style={styles.readyFeatureItem}>
          <Text style={styles.readyFeatureEmoji}>📈</Text>
          <View>
            <Text style={styles.readyFeatureTitle}>Insights & Progress</Text>
            <Text style={styles.readyFeatureText}>See patterns and celebrate wins</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case 0: return renderWelcome();
      case 1: return renderStageSelection();
      case 2: return renderNameInput();
      case 3: return renderConcernsSelection();
      case 4: return renderReady();
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        {step > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {renderStep()}

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !canProceed() && styles.continueButtonDisabled,
          ]}
          onPress={step === totalSteps - 1 ? handleComplete : handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.continueButtonText}>
            {step === 0 ? "Let's Begin" : step === totalSteps - 1 ? "Start My Journey" : "Continue"}
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  backButton: {
    marginLeft: Spacing.md,
    padding: Spacing.xs,
  },
  backButtonText: {
    fontSize: 24,
    color: Colors.muted,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },

  // Welcome Step
  welcomeEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.lg,
  },
  welcomeTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  welcomeSubtitle: {
    fontSize: FontSizes.lg,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: Spacing.xxl,
  },
  welcomeFeatures: {
    marginTop: Spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cream,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  featureText: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    fontWeight: FontWeights.medium,
  },

  // Stage Selection
  stepTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  stepSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    marginBottom: Spacing.lg,
  },
  stepEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  optionsScroll: {
    flex: 1,
  },
  stageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  stageCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  stageEmoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  stageTextContainer: {
    flex: 1,
  },
  stageTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: 2,
  },
  stageTitleSelected: {
    color: Colors.primary,
  },
  stageDescription: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontWeight: FontWeights.bold,
    fontSize: 14,
  },

  // Name Input
  nameInput: {
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: FontSizes.lg,
    color: Colors.foreground,
    marginBottom: Spacing.md,
  },
  optionalLabel: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
  },

  // Concerns Selection
  concernsScroll: {
    flex: 1,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  concernCard: {
    width: (width - Spacing.lg * 2 - Spacing.sm) / 2,
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  concernCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary50,
  },
  concernEmoji: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  concernTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.foreground,
    textAlign: 'center',
  },
  concernTitleSelected: {
    color: Colors.primary,
  },
  selectionCount: {
    textAlign: 'center',
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },

  // Ready Step
  readyEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  readyTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  readySubtitle: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  readyFeatures: {
    marginTop: Spacing.md,
  },
  readyFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cream,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  readyFeatureEmoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  readyFeatureTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
  },
  readyFeatureText: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },

  // Bottom
  bottomContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: Colors.border,
  },
  continueButtonText: {
    color: 'white',
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
});
