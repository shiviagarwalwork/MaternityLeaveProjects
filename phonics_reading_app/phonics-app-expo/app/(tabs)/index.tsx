import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Hi there! 👋</Text>
            <Text style={styles.subGreeting}>Ready to learn?</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/parent')}
          >
            <Ionicons name="settings-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Daily Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressLabel}>Today's Goal</Text>
              <Text style={styles.progressValue}>
                5<Text style={styles.progressUnit}> / 15 min</Text>
              </Text>
            </View>
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={20} color={colors.streakOrange} />
              <Text style={styles.streakText}>3 days</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '33%' }]} />
          </View>
        </View>

        {/* Continue Learning */}
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <TouchableOpacity
          style={styles.lessonCard}
          onPress={() => router.push('/learn/A')}
          activeOpacity={0.8}
        >
          <View style={styles.lessonIcon}>
            <Text style={styles.lessonLetter}>A</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>Letter A</Text>
            <Text style={styles.lessonDescription}>Learn the letter A and its sound</Text>
            <View style={styles.lessonProgressContainer}>
              <View style={styles.lessonProgressBar}>
                <View style={[styles.lessonProgress, { width: '30%' }]} />
              </View>
              <Text style={styles.lessonProgressText}>30%</Text>
            </View>
          </View>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color={colors.surface} />
          </View>
        </TouchableOpacity>

        {/* Quick Practice */}
        <Text style={styles.sectionTitle}>Quick Practice</Text>
        <View style={styles.practiceGrid}>
          <PracticeCard
            title="Letters"
            icon="text"
            color={colors.stageColors[0]}
            onPress={() => router.push('/learn/A')}
          />
          <PracticeCard
            title="Sounds"
            icon="mic"
            color={colors.stageColors[1]}
            onPress={() => {}}
          />
          <PracticeCard
            title="Words"
            icon="chatbubble"
            color={colors.stageColors[2]}
            onPress={() => router.push('/learn/word/cat')}
          />
          <PracticeCard
            title="Review"
            icon="refresh"
            color={colors.stageColors[4]}
            onPress={() => {}}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

function PracticeCard({
  title,
  icon,
  color,
  onPress,
}: {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.practiceCard} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.practiceIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon as any} size={28} color={color} />
      </View>
      <Text style={styles.practiceTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  subGreeting: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingsButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  progressCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  progressLabel: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: fontWeight.medium,
  },
  progressValue: {
    fontSize: fontSize.display,
    color: colors.surface,
    fontWeight: fontWeight.extrabold,
    marginTop: 4,
  },
  progressUnit: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: 6,
  },
  streakText: {
    color: colors.surface,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 5,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.surface,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  lessonIcon: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.xl,
    backgroundColor: `${colors.stageColors[0]}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonLetter: {
    fontSize: fontSize.display,
    fontWeight: fontWeight.extrabold,
    color: colors.stageColors[0],
  },
  lessonInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  lessonTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  lessonDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lessonProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  lessonProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: `${colors.stageColors[0]}20`,
    borderRadius: 3,
    overflow: 'hidden',
  },
  lessonProgress: {
    height: '100%',
    backgroundColor: colors.stageColors[0],
    borderRadius: 3,
  },
  lessonProgressText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  practiceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  practiceCard: {
    width: '47%',
    aspectRatio: 1.1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  practiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  practiceTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  bottomSpacer: {
    height: 100,
  },
});
