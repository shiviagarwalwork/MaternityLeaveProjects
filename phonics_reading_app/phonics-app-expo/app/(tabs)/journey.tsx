import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/theme';

const stages = [
  { name: 'Letter Recognition', progress: 0.8, unlocked: true },
  { name: 'Letter Sounds', progress: 0.3, unlocked: true },
  { name: 'CVC Words', progress: 0, unlocked: false },
  { name: 'Consonant Blends', progress: 0, unlocked: false },
  { name: 'Sight Words', progress: 0, unlocked: false },
  { name: 'Simple Sentences', progress: 0, unlocked: false },
  { name: 'Short Stories', progress: 0, unlocked: false },
  { name: 'Chapter Books', progress: 0, unlocked: false },
];

export default function JourneyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Journey</Text>
          <Text style={styles.subtitle}>Keep learning to unlock new stages!</Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatCard icon="star" value="150" label="XP" color={colors.gold} />
          <StatCard icon="checkmark-circle" value="12" label="Lessons" color={colors.success} />
          <StatCard icon="flame" value="3" label="Streak" color={colors.streakOrange} />
        </View>

        {/* Stages */}
        <View style={styles.stagesContainer}>
          {stages.map((stage, index) => (
            <StageCard
              key={index}
              stageNumber={index + 1}
              name={stage.name}
              progress={stage.progress}
              isUnlocked={stage.unlocked}
              color={colors.stageColors[index]}
              isLast={index === stages.length - 1}
            />
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={24} color={color} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function StageCard({
  stageNumber,
  name,
  progress,
  isUnlocked,
  color,
  isLast,
}: {
  stageNumber: number;
  name: string;
  progress: number;
  isUnlocked: boolean;
  color: string;
  isLast: boolean;
}) {
  return (
    <View style={styles.stageRow}>
      {/* Timeline */}
      <View style={styles.timeline}>
        <View
          style={[
            styles.stageCircle,
            { backgroundColor: isUnlocked ? color : `${colors.textLight}40` },
          ]}
        >
          {isUnlocked ? (
            <Text style={styles.stageNumber}>{stageNumber}</Text>
          ) : (
            <Ionicons name="lock-closed" size={16} color={colors.surface} />
          )}
        </View>
        {!isLast && (
          <View
            style={[
              styles.connector,
              { backgroundColor: isUnlocked ? `${color}40` : `${colors.textLight}20` },
            ]}
          />
        )}
      </View>

      {/* Stage info */}
      <View
        style={[
          styles.stageCard,
          progress > 0 && { borderColor: `${color}40`, borderWidth: 2 },
        ]}
      >
        <View style={styles.stageHeader}>
          <Text
            style={[
              styles.stageName,
              !isUnlocked && { color: colors.textLight },
            ]}
          >
            {name}
          </Text>
          {progress >= 1 && (
            <View style={styles.completeBadge}>
              <Text style={styles.completeBadgeText}>Complete</Text>
            </View>
          )}
        </View>
        {isUnlocked && progress > 0 && (
          <>
            <View style={[styles.stageProgressBar, { backgroundColor: `${color}20` }]}>
              <View
                style={[
                  styles.stageProgress,
                  { width: `${progress * 100}%`, backgroundColor: color },
                ]}
              />
            </View>
            <Text style={styles.stageProgressText}>
              {Math.round(progress * 100)}% complete
            </Text>
          </>
        )}
      </View>
    </View>
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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.extrabold,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  stagesContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  stageRow: {
    flexDirection: 'row',
  },
  timeline: {
    alignItems: 'center',
    width: 48,
  },
  stageCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageNumber: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  connector: {
    width: 3,
    height: 60,
    marginTop: 4,
  },
  stageCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginLeft: spacing.md,
    marginBottom: spacing.md,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  completeBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  completeBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.surface,
  },
  stageProgressBar: {
    height: 6,
    borderRadius: 3,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  stageProgress: {
    height: '100%',
    borderRadius: 3,
  },
  stageProgressText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 4,
  },
  bottomSpacer: {
    height: 100,
  },
});
