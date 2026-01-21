import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';

const { width } = Dimensions.get('window');

// Mock data for demonstration
const weeklyMoodData = [
  { day: 'Mon', mood: 4, energy: 3 },
  { day: 'Tue', mood: 3, energy: 2 },
  { day: 'Wed', mood: 4, energy: 4 },
  { day: 'Thu', mood: 5, energy: 4 },
  { day: 'Fri', mood: 3, energy: 3 },
  { day: 'Sat', mood: 4, energy: 5 },
  { day: 'Sun', mood: 4, energy: 4 },
];

const insights = [
  {
    id: 1,
    title: 'Sleep Pattern',
    description: 'Your mood is 40% better on days after good sleep.',
    icon: '😴',
    color: Colors.accent,
  },
  {
    id: 2,
    title: 'Tuesday Dip',
    description: 'Energy tends to dip on Tuesdays. Consider lighter tasks.',
    icon: '📉',
    color: Colors.secondary,
  },
  {
    id: 3,
    title: 'Weekend Boost',
    description: 'Your mood and energy peak on weekends. Great self-care!',
    icon: '🌟',
    color: Colors.primary,
  },
];

const streakData = {
  currentStreak: 7,
  longestStreak: 14,
  totalCheckIns: 42,
  thisMonth: 23,
};

type TimeRange = 'week' | 'month' | '3months';

export default function ProgressScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const getMoodColor = (mood: number) => {
    const colors = [
      Colors.moodPoor,
      Colors.moodFair,
      Colors.moodOkay,
      Colors.moodGood,
      Colors.moodExcellent,
    ];
    return colors[mood - 1] || Colors.muted;
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😔', '😐', '🙂', '😊', '🌟'];
    return emojis[mood - 1] || '😐';
  };

  const averageMood = (weeklyMoodData.reduce((sum, d) => sum + d.mood, 0) / weeklyMoodData.length).toFixed(1);
  const averageEnergy = (weeklyMoodData.reduce((sum, d) => sum + d.energy, 0) / weeklyMoodData.length).toFixed(1);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>Track your journey to wellness</Text>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakMain}>
            <Text style={styles.streakNumber}>{streakData.currentStreak}</Text>
            <Text style={styles.streakLabel}>Day Streak 🔥</Text>
          </View>
          <View style={styles.streakStats}>
            <View style={styles.streakStat}>
              <Text style={styles.streakStatNumber}>{streakData.longestStreak}</Text>
              <Text style={styles.streakStatLabel}>Best</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakStat}>
              <Text style={styles.streakStatNumber}>{streakData.totalCheckIns}</Text>
              <Text style={styles.streakStatLabel}>Total</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakStat}>
              <Text style={styles.streakStatNumber}>{streakData.thisMonth}</Text>
              <Text style={styles.streakStatLabel}>This Month</Text>
            </View>
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeSelector}>
          {(['week', 'month', '3months'] as TimeRange[]).map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeButton,
                timeRange === range && styles.timeButtonActive,
              ]}
              onPress={() => setTimeRange(range)}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  timeRange === range && styles.timeButtonTextActive,
                ]}
              >
                {range === 'week' ? 'Week' : range === 'month' ? 'Month' : '3 Months'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mood Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Mood & Energy</Text>
            <View style={styles.averages}>
              <View style={styles.averageItem}>
                <View style={[styles.averageDot, { backgroundColor: Colors.primary }]} />
                <Text style={styles.averageText}>Mood: {averageMood}</Text>
              </View>
              <View style={styles.averageItem}>
                <View style={[styles.averageDot, { backgroundColor: Colors.secondary }]} />
                <Text style={styles.averageText}>Energy: {averageEnergy}</Text>
              </View>
            </View>
          </View>

          {/* Simple Bar Chart */}
          <View style={styles.chart}>
            {weeklyMoodData.map((day, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.barContainer}>
                  {/* Energy bar (behind) */}
                  <View
                    style={[
                      styles.bar,
                      styles.energyBar,
                      { height: (day.energy / 5) * 100 },
                    ]}
                  />
                  {/* Mood bar (front) */}
                  <View
                    style={[
                      styles.bar,
                      styles.moodBar,
                      { height: (day.mood / 5) * 100, backgroundColor: getMoodColor(day.mood) },
                    ]}
                  />
                </View>
                <Text style={styles.chartLabel}>{day.day}</Text>
                <Text style={styles.chartEmoji}>{getMoodEmoji(day.mood)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <Text style={styles.sectionSubtitle}>Patterns we&apos;ve noticed</Text>

          {insights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                <Text style={styles.insightEmoji}>{insight.icon}</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDescription}>{insight.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>January Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>😊</Text>
              <Text style={styles.summaryValue}>3.8</Text>
              <Text style={styles.summaryLabel}>Avg Mood</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>⚡</Text>
              <Text style={styles.summaryValue}>3.5</Text>
              <Text style={styles.summaryLabel}>Avg Energy</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>😴</Text>
              <Text style={styles.summaryValue}>Good</Text>
              <Text style={styles.summaryLabel}>Sleep</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>📝</Text>
              <Text style={styles.summaryValue}>12</Text>
              <Text style={styles.summaryLabel}>Journal</Text>
            </View>
          </View>
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.muted,
  },
  streakCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  streakMain: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  streakNumber: {
    fontSize: 56,
    fontWeight: '700',
    color: '#fff',
  },
  streakLabel: {
    fontSize: FontSizes.lg,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  streakStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: Spacing.md,
  },
  streakStat: {
    alignItems: 'center',
  },
  streakStatNumber: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: '#fff',
  },
  streakStatLabel: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  streakDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  timeSelector: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  timeButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
  },
  timeButtonActive: {
    backgroundColor: Colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timeButtonText: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    fontWeight: '500',
  },
  timeButtonTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  chartCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  chartTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.foreground,
  },
  averages: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  averageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  averageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  averageText: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 100,
    width: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
  },
  energyBar: {
    width: 24,
    backgroundColor: Colors.secondary + '40',
  },
  moodBar: {
    width: 16,
  },
  chartLabel: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    marginTop: Spacing.xs,
  },
  chartEmoji: {
    fontSize: 16,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginBottom: Spacing.md,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  insightEmoji: {
    fontSize: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 2,
  },
  insightDescription: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    lineHeight: 20,
  },
  summaryCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryEmoji: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  summaryValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.foreground,
  },
  summaryLabel: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
  },
  bottomPadding: {
    height: 100,
  },
});
