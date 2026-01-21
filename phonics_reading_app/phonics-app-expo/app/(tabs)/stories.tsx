import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/theme';

const stories = [
  { title: 'The Big Dog', level: 'Beginner', color: colors.stageColors[0] },
  { title: 'A Fun Day', level: 'Beginner', color: colors.stageColors[1] },
  { title: 'The Red Hat', level: 'Beginner', color: colors.stageColors[2] },
  { title: 'My Pet Fish', level: 'Beginner', color: colors.stageColors[3] },
  { title: 'The Sun Sets', level: 'Easy', color: colors.stageColors[4] },
  { title: 'In the Park', level: 'Easy', color: colors.stageColors[5] },
];

export default function StoriesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Story Library</Text>
          <Text style={styles.subtitle}>Read fun stories and practice reading!</Text>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <CategoryChip label="All" isSelected />
          <CategoryChip label="Animals" />
          <CategoryChip label="Adventure" />
          <CategoryChip label="Funny" />
          <CategoryChip label="Nature" />
        </ScrollView>

        {/* Featured Story */}
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={() => router.push('/learn/story/1')}
          activeOpacity={0.9}
        >
          <View style={styles.featuredDecor1} />
          <View style={styles.featuredDecor2} />
          <View style={styles.featuredContent}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Beginner</Text>
            </View>
            <View style={styles.featuredBottom}>
              <Text style={styles.featuredTitle}>The Friendly Cat</Text>
              <Text style={styles.featuredDescription}>
                A story about a cat who makes new friends
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* More Stories */}
        <Text style={styles.sectionTitle}>More Stories</Text>
        <View style={styles.storiesGrid}>
          {stories.map((story, index) => (
            <TouchableOpacity
              key={index}
              style={styles.storyCard}
              onPress={() => router.push(`/learn/story/${index + 2}`)}
              activeOpacity={0.8}
            >
              <View style={[styles.storyCover, { backgroundColor: `${story.color}20` }]}>
                <Ionicons name="book" size={40} color={story.color} />
              </View>
              <View style={styles.storyInfo}>
                <Text style={styles.storyTitle} numberOfLines={1}>
                  {story.title}
                </Text>
                <View style={[styles.storyLevel, { backgroundColor: `${story.color}20` }]}>
                  <Text style={[styles.storyLevelText, { color: story.color }]}>
                    {story.level}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryChip({ label, isSelected = false }: { label: string; isSelected?: boolean }) {
  return (
    <TouchableOpacity
      style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
    >
      <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: 4,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  categoryChipSelected: {
    backgroundColor: `${colors.primary}15`,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  categoryTextSelected: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  featuredCard: {
    marginHorizontal: spacing.lg,
    height: 180,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    backgroundColor: colors.stageColors[5],
  },
  featuredDecor1: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  featuredDecor2: {
    position: 'absolute',
    right: 30,
    bottom: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  featuredContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  levelText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.surface,
  },
  featuredBottom: {},
  featuredTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  featuredDescription: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  storyCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  storyCover: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInfo: {
    padding: spacing.md,
  },
  storyTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  storyLevel: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginTop: spacing.xs,
  },
  storyLevelText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  bottomSpacer: {
    height: 100,
  },
});
