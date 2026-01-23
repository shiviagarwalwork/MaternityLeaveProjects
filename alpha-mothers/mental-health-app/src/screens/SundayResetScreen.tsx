import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSizes, Spacing, BorderRadius, FontWeights, Shadows } from '../constants/theme';
import { useUser } from '../contexts/UserContext';
import {
  processSundayReset,
  getSimulatedSundayReset,
  SundayResetOutput,
  WeeklyStressor,
  DraftMessage,
  BioBreak,
  InvisibleLaborItem,
  getStressColor,
  getCategoryIcon,
} from '../services/sundayReset';
import { USE_SIMULATED_RESPONSES } from '../config/env';

const { width } = Dimensions.get('window');

type ViewState = 'input' | 'processing' | 'results';

export default function SundayResetScreen() {
  const { user } = useUser();
  const [viewState, setViewState] = useState<ViewState>('input');
  const [brainDump, setBrainDump] = useState('');
  const [results, setResults] = useState<SundayResetOutput | null>(null);
  const [expandedStressor, setExpandedStressor] = useState<string | null>(null);
  const [copiedDraft, setCopiedDraft] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const userName = user?.name || 'there';

  const handleProcess = async () => {
    if (!brainDump.trim()) return;

    setViewState('processing');

    try {
      let output: SundayResetOutput;

      if (USE_SIMULATED_RESPONSES) {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        output = getSimulatedSundayReset(brainDump, userName);
      } else {
        output = await processSundayReset(brainDump, userName);
      }

      setResults(output);
      setViewState('results');

      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error processing Sunday Reset:', error);
      // Fallback to simulated
      const output = getSimulatedSundayReset(brainDump, userName);
      setResults(output);
      setViewState('results');
    }
  };

  const handleReset = () => {
    setViewState('input');
    setBrainDump('');
    setResults(null);
    fadeAnim.setValue(0);
  };

  const handleCopyDraft = (draft: DraftMessage) => {
    // In a real app, this would copy to clipboard
    setCopiedDraft(draft.id);
    setTimeout(() => setCopiedDraft(null), 2000);
  };

  const renderInputView = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.inputContainer}>
        <Text style={styles.welcomeText}>
          Hey {userName} 👋
        </Text>
        <Text style={styles.instructionText}>
          Let's get your week organized. Brain dump everything coming up—meetings, appointments, worries, to-dos. I'll sort it out and give you a game plan.
        </Text>

        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Monday I have that board meeting, Tuesday the kids have dentist, need to figure out birthday gift for Emma's party Saturday, feeling anxious about the presentation..."
            placeholderTextColor={Colors.muted}
            multiline
            value={brainDump}
            onChangeText={setBrainDump}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.promptsContainer}>
          <Text style={styles.promptsTitle}>Need prompts?</Text>
          <View style={styles.promptChips}>
            {[
              'What meetings do you have?',
              'Any kid activities or appointments?',
              'What\'s weighing on you?',
              'Anything you\'re dreading?',
            ].map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.promptChip}
                onPress={() => setBrainDump(prev => prev + (prev ? '\n' : '') + prompt.replace('?', ': '))}
              >
                <Text style={styles.promptChipText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.processButton, !brainDump.trim() && styles.processButtonDisabled]}
          onPress={handleProcess}
          disabled={!brainDump.trim()}
        >
          <LinearGradient
            colors={brainDump.trim() ? [Colors.primary, Colors.primaryDark] : [Colors.muted, Colors.muted]}
            style={styles.processButtonGradient}
          >
            <Text style={styles.processButtonText}>Process My Week</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderProcessingView = () => (
    <View style={styles.processingContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.processingTitle}>Organizing your week...</Text>
      <Text style={styles.processingSubtitle}>
        Identifying stressors, finding opportunities, drafting messages
      </Text>
    </View>
  );

  const renderStressorCard = (stressor: WeeklyStressor) => {
    const isExpanded = expandedStressor === stressor.id;

    return (
      <TouchableOpacity
        key={stressor.id}
        style={styles.stressorCard}
        onPress={() => setExpandedStressor(isExpanded ? null : stressor.id)}
        activeOpacity={0.8}
      >
        <View style={styles.stressorHeader}>
          <View style={[styles.stressIndicator, { backgroundColor: getStressColor(stressor.stressLevel) }]} />
          <Text style={styles.stressorIcon}>{getCategoryIcon(stressor.category)}</Text>
          <View style={styles.stressorTitleContainer}>
            <Text style={styles.stressorTitle}>{stressor.title}</Text>
            {stressor.date && (
              <Text style={styles.stressorDate}>{stressor.date}</Text>
            )}
          </View>
          <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
        </View>

        {isExpanded && (
          <View style={styles.stressorDetails}>
            <Text style={styles.stressorReason}>{stressor.reason}</Text>
            {stressor.actionItem && (
              <View style={styles.actionItemContainer}>
                <Text style={styles.actionItemLabel}>→ Action:</Text>
                <Text style={styles.actionItemText}>{stressor.actionItem}</Text>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderDraftCard = (draft: DraftMessage) => (
    <View key={draft.id} style={styles.draftCard}>
      <View style={styles.draftHeader}>
        <Text style={styles.draftType}>{draft.type === 'email' ? '📧' : '💬'}</Text>
        <Text style={styles.draftTo}>To: {draft.to}</Text>
        <TouchableOpacity
          style={[styles.copyButton, copiedDraft === draft.id && styles.copyButtonCopied]}
          onPress={() => handleCopyDraft(draft)}
        >
          <Text style={styles.copyButtonText}>
            {copiedDraft === draft.id ? '✓ Copied' : 'Copy'}
          </Text>
        </TouchableOpacity>
      </View>
      {draft.subject && (
        <Text style={styles.draftSubject}>Subject: {draft.subject}</Text>
      )}
      <Text style={styles.draftBody}>{draft.body}</Text>
      <Text style={styles.draftContext}>{draft.context}</Text>
    </View>
  );

  const renderBioBreakCard = (bioBreak: BioBreak) => (
    <View key={bioBreak.id} style={styles.bioBreakCard}>
      <View style={styles.bioBreakTime}>
        <Text style={styles.bioBreakDay}>{bioBreak.day}</Text>
        <Text style={styles.bioBreakTimeText}>{bioBreak.time}</Text>
      </View>
      <View style={styles.bioBreakContent}>
        <Text style={styles.bioBreakDuration}>{bioBreak.duration} min</Text>
        <Text style={styles.bioBreakSuggestion}>{bioBreak.suggestion}</Text>
      </View>
    </View>
  );

  const renderInvisibleLaborCard = (item: InvisibleLaborItem) => (
    <View key={item.id} style={styles.invisibleLaborCard}>
      <Text style={styles.invisibleLaborMain}>📋 {item.mainTask}</Text>
      <View style={styles.subTasksList}>
        {item.subTasks.map((subTask, index) => (
          <View key={index} style={styles.subTaskItem}>
            <Text style={styles.subTaskBullet}>•</Text>
            <Text style={styles.subTaskText}>{subTask}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderResultsView = () => {
    if (!results) return null;

    return (
      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Week Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{results.weekSummary}</Text>
          <Text style={styles.encouragementText}>{results.encouragement}</Text>
        </View>

        {/* Top Stressors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎯</Text>
            <Text style={styles.sectionTitle}>Your Top Stressors</Text>
          </View>
          {results.stressors.map(renderStressorCard)}
        </View>

        {/* Ready-to-Send Drafts */}
        {results.drafts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📝</Text>
              <Text style={styles.sectionTitle}>Ready-to-Send Drafts</Text>
            </View>
            {results.drafts.map(renderDraftCard)}
          </View>
        )}

        {/* Bio-Break Windows */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🧘</Text>
            <Text style={styles.sectionTitle}>Your Bio-Break Windows</Text>
          </View>
          <View style={styles.bioBreaksContainer}>
            {results.bioBreaks.map(renderBioBreakCard)}
          </View>
        </View>

        {/* Invisible Labor */}
        {results.invisibleLabor.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>👁️</Text>
              <Text style={styles.sectionTitle}>Invisible Labor Unpacked</Text>
            </View>
            {results.invisibleLabor.map(renderInvisibleLaborCard)}
          </View>
        )}

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Start New Reset</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary50, Colors.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sunday Reset</Text>
          <Text style={styles.headerSubtitle}>
            {viewState === 'input' && 'Plan your week, protect your peace'}
            {viewState === 'processing' && 'Processing...'}
            {viewState === 'results' && 'Your week, organized'}
          </Text>
        </View>
      </LinearGradient>

      {viewState === 'input' && renderInputView()}
      {viewState === 'processing' && renderProcessingView()}
      {viewState === 'results' && renderResultsView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    paddingBottom: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },

  // Input View
  inputContainer: {
    padding: Spacing.lg,
  },
  welcomeText: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  instructionText: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  textAreaContainer: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  textArea: {
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.foreground,
    minHeight: 200,
    lineHeight: 24,
  },
  promptsContainer: {
    marginTop: Spacing.lg,
  },
  promptsTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.muted,
    marginBottom: Spacing.sm,
  },
  promptChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  promptChip: {
    backgroundColor: Colors.cream,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promptChipText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },
  processButton: {
    marginTop: Spacing.xl,
  },
  processButtonDisabled: {
    opacity: 0.6,
  },
  processButtonGradient: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  processButtonText: {
    color: 'white',
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
  },

  // Processing View
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  processingTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginTop: Spacing.lg,
  },
  processingSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },

  // Results View
  summaryCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.primary50,
    borderRadius: BorderRadius.lg,
  },
  summaryText: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    lineHeight: 24,
  },
  encouragementText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: FontWeights.medium,
    marginTop: Spacing.md,
    fontStyle: 'italic',
  },

  // Sections
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
  },

  // Stressor Cards
  stressorCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
    overflow: 'hidden',
  },
  stressorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  stressIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  stressorIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  stressorTitleContainer: {
    flex: 1,
  },
  stressorTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
  },
  stressorDate: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginTop: 2,
  },
  expandIcon: {
    fontSize: 12,
    color: Colors.muted,
  },
  stressorDetails: {
    padding: Spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stressorReason: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    lineHeight: 20,
  },
  actionItemContainer: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    backgroundColor: Colors.cream,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  actionItemLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  actionItemText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
    flex: 1,
  },

  // Draft Cards
  draftCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  draftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  draftType: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  draftTo: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    flex: 1,
  },
  copyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  copyButtonCopied: {
    backgroundColor: Colors.accent,
  },
  copyButtonText: {
    color: 'white',
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
  },
  draftSubject: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginBottom: Spacing.xs,
  },
  draftBody: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
    lineHeight: 20,
    backgroundColor: Colors.cream,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  draftContext: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    marginTop: Spacing.sm,
    fontStyle: 'italic',
  },

  // Bio-Break Cards
  bioBreaksContainer: {
    gap: Spacing.sm,
  },
  bioBreakCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  bioBreakTime: {
    backgroundColor: Colors.accent + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  bioBreakDay: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
    color: Colors.accent,
  },
  bioBreakTimeText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },
  bioBreakContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bioBreakDuration: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
  },
  bioBreakSuggestion: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },

  // Invisible Labor Cards
  invisibleLaborCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  invisibleLaborMain: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  subTasksList: {
    paddingLeft: Spacing.md,
  },
  subTaskItem: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  subTaskBullet: {
    color: Colors.muted,
    marginRight: Spacing.sm,
  },
  subTaskText: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    flex: 1,
  },

  // Reset Button
  resetButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
});
