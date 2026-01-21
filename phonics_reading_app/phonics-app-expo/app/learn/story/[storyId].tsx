import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../../src/theme';

const storiesData: Record<
  string,
  { title: string; pages: { text: string; words: string[] }[] }
> = {
  '1': {
    title: 'The Friendly Cat',
    pages: [
      {
        text: 'The cat sat on the mat.',
        words: ['The', 'cat', 'sat', 'on', 'the', 'mat.'],
      },
      {
        text: 'The cat is fat.',
        words: ['The', 'cat', 'is', 'fat.'],
      },
      {
        text: 'The cat can run and jump.',
        words: ['The', 'cat', 'can', 'run', 'and', 'jump.'],
      },
      {
        text: 'The cat is a good pet!',
        words: ['The', 'cat', 'is', 'a', 'good', 'pet!'],
      },
    ],
  },
  '2': {
    title: 'The Big Dog',
    pages: [
      {
        text: 'The dog is big.',
        words: ['The', 'dog', 'is', 'big.'],
      },
      {
        text: 'The dog can run fast.',
        words: ['The', 'dog', 'can', 'run', 'fast.'],
      },
      {
        text: 'The dog likes to play.',
        words: ['The', 'dog', 'likes', 'to', 'play.'],
      },
    ],
  },
};

export default function StoryReaderScreen() {
  const { storyId } = useLocalSearchParams<{ storyId: string }>();
  const story = storiesData[storyId || '1'] || storiesData['1'];

  const [currentPage, setCurrentPage] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());

  const currentPageData = story.pages[currentPage];
  const isPageComplete = completedWords.size === currentPageData.words.length;
  const isStoryComplete = currentPage === story.pages.length - 1 && isPageComplete;

  const handleWordTap = (index: number) => {
    if (!completedWords.has(index)) {
      setCurrentWordIndex(index);
    }
  };

  const handleMicPress = () => {
    if (isListening) {
      // Simulate successful word recognition
      setIsListening(false);
      const newCompleted = new Set(completedWords);
      newCompleted.add(currentWordIndex);
      setCompletedWords(newCompleted);

      // Move to next word
      const nextUnread = currentPageData.words.findIndex(
        (_, i) => i > currentWordIndex && !newCompleted.has(i)
      );
      if (nextUnread !== -1) {
        setCurrentWordIndex(nextUnread);
      }
    } else {
      setIsListening(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
      setCurrentWordIndex(0);
      setCompletedWords(new Set());
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setCurrentWordIndex(0);
      setCompletedWords(new Set());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {story.title}
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Story Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration Placeholder */}
        <View style={styles.illustrationContainer}>
          <Ionicons
            name="image"
            size={60}
            color={colors.stageColors[5]}
          />
          <Text style={styles.illustrationText}>Story Illustration</Text>
        </View>

        {/* Text with Word Highlighting */}
        <View style={styles.textContainer}>
          <View style={styles.wordsRow}>
            {currentPageData.words.map((word, index) => {
              const isCurrent = index === currentWordIndex && !completedWords.has(index);
              const isComplete = completedWords.has(index);

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleWordTap(index)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.word,
                      isCurrent && styles.wordCurrent,
                      isComplete && styles.wordComplete,
                    ]}
                  >
                    {word}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Current Word Focus */}
        {!isPageComplete && (
          <View style={styles.focusContainer}>
            <Text style={styles.focusLabel}>Read this word:</Text>
            <Text style={styles.focusWord}>
              {currentPageData.words[currentWordIndex]}
            </Text>
          </View>
        )}

        {/* Microphone or Completion */}
        {!isPageComplete ? (
          <TouchableOpacity
            style={[
              styles.micButton,
              { backgroundColor: isListening ? colors.error : colors.stageColors[5] },
            ]}
            onPress={handleMicPress}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isListening ? 'stop' : 'mic'}
              size={36}
              color={colors.surface}
            />
          </TouchableOpacity>
        ) : isStoryComplete ? (
          <View style={styles.storyCompleteContainer}>
            <View style={styles.starsRow}>
              {[0, 1, 2].map((i) => (
                <Ionicons key={i} name="star" size={40} color={colors.gold} />
              ))}
            </View>
            <Text style={styles.completeTitle}>Story Complete!</Text>
            <Text style={styles.completeSubtitle}>Great reading!</Text>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => router.back()}
            >
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.pageCompleteContainer}>
            <Ionicons name="checkmark-circle" size={48} color={colors.success} />
            <Text style={styles.pageCompleteText}>Page Complete!</Text>
            <TouchableOpacity
              style={styles.nextPageButton}
              onPress={handleNextPage}
            >
              <Text style={styles.nextPageText}>Next Page</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.surface} />
            </TouchableOpacity>
          </View>
        )}

        {!isPageComplete && (
          <Text style={styles.instruction}>
            {isListening ? 'Listening...' : 'Tap the microphone and read the word'}
          </Text>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
          onPress={handlePrevPage}
          disabled={currentPage === 0}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={currentPage === 0 ? colors.textLight : colors.textPrimary}
          />
        </TouchableOpacity>

        <View style={styles.pageIndicator}>
          {story.pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.pageDot,
                index === currentPage && styles.pageDotActive,
                index < currentPage && styles.pageDotComplete,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.navButton,
            (currentPage === story.pages.length - 1 || !isPageComplete) &&
              styles.navButtonDisabled,
          ]}
          onPress={handleNextPage}
          disabled={currentPage === story.pages.length - 1 || !isPageComplete}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={
              currentPage === story.pages.length - 1 || !isPageComplete
                ? colors.textLight
                : colors.textPrimary
            }
          />
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
  headerTitle: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  illustrationContainer: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.xxl,
    backgroundColor: `${colors.stageColors[5]}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  illustrationText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.sm,
  },
  textContainer: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  wordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  word: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,
    color: colors.textLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  wordCurrent: {
    color: colors.stageColors[5],
    fontWeight: fontWeight.bold,
    backgroundColor: `${colors.stageColors[5]}15`,
    borderRadius: borderRadius.sm,
  },
  wordComplete: {
    color: colors.textPrimary,
    fontWeight: fontWeight.bold,
  },
  focusContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  focusLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  focusWord: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.extrabold,
    color: colors.stageColors[5],
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: spacing.md,
  },
  instruction: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  pageCompleteContainer: {
    alignItems: 'center',
  },
  pageCompleteText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.success,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  nextPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.stageColors[5],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  nextPageText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  storyCompleteContainer: {
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  completeTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
  },
  completeSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  finishButton: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
  },
  finishButtonText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: `${colors.textLight}20`,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: `${colors.textLight}10`,
  },
  pageIndicator: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: `${colors.textLight}40`,
  },
  pageDotActive: {
    width: 24,
    backgroundColor: colors.stageColors[5],
  },
  pageDotComplete: {
    backgroundColor: colors.success,
  },
});
