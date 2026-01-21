import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/theme';

const skillsData = [
  { name: 'Letter Recognition', progress: 0.8, color: colors.stageColors[0] },
  { name: 'Letter Sounds', progress: 0.3, color: colors.stageColors[1] },
  { name: 'CVC Words', progress: 0.1, color: colors.stageColors[2] },
  { name: 'Sight Words', progress: 0, color: colors.stageColors[3] },
];

const recentActivity = [
  { date: 'Today', activity: 'Practiced letter A sound', xp: 25 },
  { date: 'Today', activity: 'Completed "The Cat" story', xp: 50 },
  { date: 'Yesterday', activity: 'Learned letter B', xp: 30 },
  { date: 'Yesterday', activity: 'Practiced CVC word: cat', xp: 20 },
];

export default function ParentDashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Parent Dashboard</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Child Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="paw" size={32} color={colors.surface} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.childName}>Emma</Text>
            <Text style={styles.childAge}>Age 5 • Stage 2</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Weekly Stats */}
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.statsGrid}>
          <StatCard
            icon="time-outline"
            value="45"
            label="Minutes"
            color={colors.primary}
          />
          <StatCard
            icon="book-outline"
            value="12"
            label="Lessons"
            color={colors.stageColors[2]}
          />
          <StatCard
            icon="star-outline"
            value="250"
            label="XP Earned"
            color={colors.gold}
          />
          <StatCard
            icon="flame-outline"
            value="3"
            label="Day Streak"
            color={colors.streakOrange}
          />
        </View>

        {/* Skills Progress */}
        <Text style={styles.sectionTitle}>Skills Progress</Text>
        <View style={styles.skillsContainer}>
          {skillsData.map((skill, index) => (
            <View key={index} style={styles.skillRow}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={[styles.skillPercent, { color: skill.color }]}>
                  {Math.round(skill.progress * 100)}%
                </Text>
              </View>
              <View style={[styles.skillBar, { backgroundColor: `${skill.color}20` }]}>
                <View
                  style={[
                    styles.skillProgress,
                    { width: `${skill.progress * 100}%`, backgroundColor: skill.color },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityContainer}>
          {recentActivity.map((item, index) => (
            <View key={index} style={styles.activityRow}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>{item.activity}</Text>
                <Text style={styles.activityDate}>{item.date}</Text>
              </View>
              <View style={styles.xpBadge}>
                <Text style={styles.xpText}>+{item.xp} XP</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsContainer}>
          <SettingRow icon="notifications-outline" label="Daily Reminders" hasToggle />
          <SettingRow icon="time-outline" label="Daily Time Limit" value="30 min" />
          <SettingRow icon="volume-high-outline" label="Sound Effects" hasToggle />
          <SettingRow icon="person-outline" label="Edit Child Profile" hasArrow />
          <SettingRow icon="key-outline" label="Change PIN" hasArrow />
          <SettingRow icon="help-circle-outline" label="Help & Support" hasArrow />
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

function SettingRow({
  icon,
  label,
  value,
  hasToggle,
  hasArrow,
}: {
  icon: string;
  label: string;
  value?: string;
  hasToggle?: boolean;
  hasArrow?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.settingRow}>
      <Ionicons name={icon as any} size={22} color={colors.textSecondary} />
      <Text style={styles.settingLabel}>{label}</Text>
      {value && <Text style={styles.settingValue}>{value}</Text>}
      {hasToggle && (
        <View style={styles.toggle}>
          <View style={styles.toggleKnob} />
        </View>
      )}
      {hasArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
      )}
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
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.stageColors[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  childName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  childAge: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    width: '47%',
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
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.extrabold,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  skillsContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  skillRow: {},
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  skillName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  skillPercent: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  skillBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    borderRadius: 4,
  },
  activityContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.textLight}15`,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  activityDate: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  xpBadge: {
    backgroundColor: `${colors.gold}20`,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  xpText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.gold,
  },
  settingsContainer: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.textLight}15`,
    gap: spacing.md,
  },
  settingLabel: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  settingValue: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    padding: 2,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
    marginLeft: 'auto',
  },
  bottomSpacer: {
    height: 40,
  },
});
