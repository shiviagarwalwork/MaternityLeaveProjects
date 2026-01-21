import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: number;
  prompt?: string;
}

// Mock journal entries
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    date: 'Today, 10:30 AM',
    content: 'Feeling overwhelmed with the return to work coming up. Had a good talk with my partner about it though, which helped. Need to remember that asking for help is okay.',
    mood: 3,
    prompt: "What's weighing on you?",
  },
  {
    id: '2',
    date: 'Yesterday, 9:15 PM',
    content: 'Baby slept through the night for the first time! I actually got 6 hours of uninterrupted sleep. Feeling like a new person today.',
    mood: 5,
    prompt: 'What made you smile today?',
  },
  {
    id: '3',
    date: 'Jan 18, 3:45 PM',
    content: 'Struggled with guilt today about going back to work. Logically I know it\'s okay, but emotionally it\'s hard. Talked to Alpha about it and felt a bit better.',
    mood: 2,
    prompt: "What's weighing on you?",
  },
  {
    id: '4',
    date: 'Jan 17, 8:00 AM',
    content: 'Morning routine went smoothly! Got both kids fed, dressed, and even had time for a quick meditation. Small wins matter.',
    mood: 4,
    prompt: 'What made you smile today?',
  },
];

const prompts = [
  "What's weighing on you?",
  "What made you smile today?",
  "What do you need right now?",
  "What are you grateful for?",
  "How did you show up for yourself today?",
];

export default function JournalScreen() {
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [entries] = useState<JournalEntry[]>(mockEntries);

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😔', '😐', '🙂', '😊', '🌟'];
    return emojis[mood - 1] || '😐';
  };

  const handleSave = () => {
    if (newEntry.trim()) {
      // In production, save to storage/backend
      setNewEntry('');
      setSelectedPrompt(null);
      setIsWriting(false);
    }
  };

  if (isWriting) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.writeContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.writeHeader}>
            <TouchableOpacity onPress={() => setIsWriting(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.writeTitle}>New Entry</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={[styles.saveButton, !newEntry.trim() && styles.saveButtonDisabled]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

          {/* Prompt Selection */}
          {!selectedPrompt && (
            <View style={styles.promptSection}>
              <Text style={styles.promptLabel}>Choose a prompt (optional)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.promptsRow}>
                  {prompts.map((prompt, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.promptChip}
                      onPress={() => setSelectedPrompt(prompt)}
                    >
                      <Text style={styles.promptChipText}>{prompt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {selectedPrompt && (
            <View style={styles.selectedPromptContainer}>
              <Text style={styles.selectedPromptLabel}>Prompt:</Text>
              <Text style={styles.selectedPrompt}>{selectedPrompt}</Text>
              <TouchableOpacity onPress={() => setSelectedPrompt(null)}>
                <Text style={styles.changePrompt}>Change</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Text Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Write your thoughts..."
              placeholderTextColor={Colors.muted}
              value={newEntry}
              onChangeText={setNewEntry}
              autoFocus
              textAlignVertical="top"
            />
          </View>

          {/* Voice Option */}
          <View style={styles.voiceSection}>
            <TouchableOpacity style={styles.voiceButton}>
              <Text style={styles.voiceIcon}>🎤</Text>
              <Text style={styles.voiceText}>Tap to speak instead</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Journal</Text>
            <Text style={styles.subtitle}>Your private space to reflect</Text>
          </View>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => setIsWriting(true)}
          >
            <Text style={styles.newButtonText}>+ New</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Add Card */}
        <TouchableOpacity
          style={styles.quickAddCard}
          onPress={() => setIsWriting(true)}
        >
          <View style={styles.quickAddIcon}>
            <Text style={styles.quickAddEmoji}>✏️</Text>
          </View>
          <View style={styles.quickAddContent}>
            <Text style={styles.quickAddTitle}>What&apos;s on your mind?</Text>
            <Text style={styles.quickAddSubtitle}>Tap to start writing or speaking</Text>
          </View>
          <Text style={styles.quickAddArrow}>›</Text>
        </TouchableOpacity>

        {/* Entries */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>

          {entries.map((entry) => (
            <TouchableOpacity key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{entry.date}</Text>
                <Text style={styles.entryMood}>{getMoodEmoji(entry.mood)}</Text>
              </View>
              {entry.prompt && (
                <Text style={styles.entryPrompt}>{entry.prompt}</Text>
              )}
              <Text style={styles.entryContent} numberOfLines={3}>
                {entry.content}
              </Text>
              <Text style={styles.readMore}>Read more</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Journaling Journey</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Entries</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipCard}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            Studies show that journaling for just 5 minutes a day can reduce anxiety
            and improve emotional processing. You&apos;re doing great!
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    marginTop: 2,
  },
  newButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  newButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FontSizes.md,
  },
  quickAddCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.primary + '10',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    borderStyle: 'dashed',
  },
  quickAddIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAddEmoji: {
    fontSize: 24,
  },
  quickAddContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  quickAddTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.foreground,
  },
  quickAddSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  quickAddArrow: {
    fontSize: 28,
    color: Colors.primary,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: Spacing.md,
  },
  entryCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  entryDate: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  entryMood: {
    fontSize: 20,
  },
  entryPrompt: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  entryContent: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    lineHeight: 22,
  },
  readMore: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '500',
    marginTop: Spacing.sm,
  },
  statsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
  },
  tipCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.accent + '15',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  tipText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.foreground,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 100,
  },
  // Writing Mode Styles
  writeContainer: {
    flex: 1,
  },
  writeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  writeTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.foreground,
  },
  cancelButton: {
    fontSize: FontSizes.md,
    color: Colors.muted,
  },
  saveButton: {
    fontSize: FontSizes.md,
    color: Colors.primary,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  promptSection: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  promptLabel: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  promptsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  promptChip: {
    backgroundColor: Colors.cream,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  promptChipText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },
  selectedPromptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.cream,
  },
  selectedPromptLabel: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginRight: Spacing.xs,
  },
  selectedPrompt: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.foreground,
    fontStyle: 'italic',
  },
  changePrompt: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  inputContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizes.lg,
    color: Colors.foreground,
    lineHeight: 28,
  },
  voiceSection: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cream,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  voiceIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  voiceText: {
    fontSize: FontSizes.md,
    color: Colors.muted,
  },
});
