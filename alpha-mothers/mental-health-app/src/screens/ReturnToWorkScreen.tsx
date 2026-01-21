import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';

interface Week {
  number: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  type: 'exercise' | 'script' | 'reading' | 'reflection';
  duration: string;
  isCompleted: boolean;
}

const returnToWorkWeeks: Week[] = [
  {
    number: 1,
    title: 'Mindset Reset',
    description: 'Rebuilding your professional confidence',
    isCompleted: true,
    isCurrent: false,
    tasks: [
      { id: '1-1', title: 'Identity Integration Exercise', type: 'exercise', duration: '15 min', isCompleted: true },
      { id: '1-2', title: '"I Am" Affirmations', type: 'reflection', duration: '5 min', isCompleted: true },
      { id: '1-3', title: 'Success Stories from Other Moms', type: 'reading', duration: '10 min', isCompleted: true },
    ],
  },
  {
    number: 2,
    title: 'The Mom Brain Myth',
    description: 'Understanding and reframing cognitive changes',
    isCompleted: true,
    isCurrent: false,
    tasks: [
      { id: '2-1', title: 'Brain Science of Motherhood', type: 'reading', duration: '10 min', isCompleted: true },
      { id: '2-2', title: 'Cognitive Strengths Assessment', type: 'exercise', duration: '15 min', isCompleted: true },
      { id: '2-3', title: 'Reframing "Mom Brain"', type: 'reflection', duration: '10 min', isCompleted: true },
    ],
  },
  {
    number: 3,
    title: 'Flexibility Conversations',
    description: 'Negotiating the work arrangement you need',
    isCompleted: false,
    isCurrent: true,
    tasks: [
      { id: '3-1', title: 'Know Your Rights & Options', type: 'reading', duration: '15 min', isCompleted: true },
      { id: '3-2', title: 'Flexibility Negotiation Script', type: 'script', duration: '20 min', isCompleted: false },
      { id: '3-3', title: 'Practice Conversation', type: 'exercise', duration: '15 min', isCompleted: false },
    ],
  },
  {
    number: 4,
    title: 'Boundaries That Work',
    description: 'Setting healthy limits at work and home',
    isCompleted: false,
    isCurrent: false,
    tasks: [
      { id: '4-1', title: 'Boundary Assessment', type: 'exercise', duration: '10 min', isCompleted: false },
      { id: '4-2', title: 'Communication Scripts', type: 'script', duration: '15 min', isCompleted: false },
      { id: '4-3', title: 'Saying No Without Guilt', type: 'reflection', duration: '10 min', isCompleted: false },
    ],
  },
  {
    number: 5,
    title: 'The First Week Back',
    description: 'Practical strategies for day one and beyond',
    isCompleted: false,
    isCurrent: false,
    tasks: [
      { id: '5-1', title: 'First Day Preparation Checklist', type: 'exercise', duration: '20 min', isCompleted: false },
      { id: '5-2', title: 'Managing First-Day Anxiety', type: 'reading', duration: '10 min', isCompleted: false },
      { id: '5-3', title: 'Evening Decompression Ritual', type: 'reflection', duration: '15 min', isCompleted: false },
    ],
  },
  {
    number: 6,
    title: 'Pumping & Practical Logistics',
    description: 'Making it work with dignity',
    isCompleted: false,
    isCurrent: false,
    tasks: [
      { id: '6-1', title: 'Your Pumping Rights', type: 'reading', duration: '10 min', isCompleted: false },
      { id: '6-2', title: 'Pumping Schedule Builder', type: 'exercise', duration: '15 min', isCompleted: false },
      { id: '6-3', title: 'Scripts for Requesting Space/Time', type: 'script', duration: '10 min', isCompleted: false },
    ],
  },
];

export default function ReturnToWorkScreen() {
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(
    returnToWorkWeeks.find(w => w.isCurrent) || null
  );

  const getTaskIcon = (type: Task['type']) => {
    switch (type) {
      case 'exercise': return '🎯';
      case 'script': return '📝';
      case 'reading': return '📖';
      case 'reflection': return '💭';
      default: return '📋';
    }
  };

  const currentWeek = returnToWorkWeeks.find(w => w.isCurrent);
  const completedWeeks = returnToWorkWeeks.filter(w => w.isCompleted).length;
  const progress = (completedWeeks / returnToWorkWeeks.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Return to Work</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Your Journey</Text>
            <Text style={styles.progressWeek}>
              Week {currentWeek?.number || 1} of {returnToWorkWeeks.length}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressSubtext}>
            {completedWeeks} weeks completed • {returnToWorkWeeks.length - completedWeeks} remaining
          </Text>
        </View>

        {/* Current Week Highlight */}
        {currentWeek && (
          <View style={styles.currentWeekCard}>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>This Week</Text>
            </View>
            <Text style={styles.currentWeekTitle}>{currentWeek.title}</Text>
            <Text style={styles.currentWeekDesc}>{currentWeek.description}</Text>
            <View style={styles.taskProgress}>
              <Text style={styles.taskProgressText}>
                {currentWeek.tasks.filter(t => t.isCompleted).length}/{currentWeek.tasks.length} tasks completed
              </Text>
            </View>
          </View>
        )}

        {/* Week List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Weeks</Text>

          {returnToWorkWeeks.map((week) => (
            <TouchableOpacity
              key={week.number}
              style={[
                styles.weekCard,
                week.isCurrent && styles.weekCardCurrent,
                week.isCompleted && styles.weekCardCompleted,
              ]}
              onPress={() => setSelectedWeek(week)}
            >
              <View style={styles.weekNumber}>
                {week.isCompleted ? (
                  <Text style={styles.checkmark}>✓</Text>
                ) : (
                  <Text style={[
                    styles.weekNumberText,
                    week.isCurrent && styles.weekNumberTextCurrent
                  ]}>
                    {week.number}
                  </Text>
                )}
              </View>
              <View style={styles.weekContent}>
                <Text style={[
                  styles.weekTitle,
                  week.isCompleted && styles.weekTitleCompleted
                ]}>
                  {week.title}
                </Text>
                <Text style={styles.weekDesc}>{week.description}</Text>
                <View style={styles.weekMeta}>
                  <Text style={styles.weekTasks}>
                    {week.tasks.length} tasks
                  </Text>
                  {week.isCurrent && (
                    <View style={styles.inProgressBadge}>
                      <Text style={styles.inProgressText}>In Progress</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.weekArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Week Tasks */}
        {selectedWeek && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Week {selectedWeek.number}: Tasks
            </Text>

            {selectedWeek.tasks.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskCard}>
                <View style={[
                  styles.taskCheck,
                  task.isCompleted && styles.taskCheckCompleted
                ]}>
                  {task.isCompleted && <Text style={styles.taskCheckmark}>✓</Text>}
                </View>
                <View style={styles.taskContent}>
                  <View style={styles.taskHeader}>
                    <Text style={styles.taskIcon}>{getTaskIcon(task.type)}</Text>
                    <Text style={styles.taskType}>
                      {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                    </Text>
                  </View>
                  <Text style={[
                    styles.taskTitle,
                    task.isCompleted && styles.taskTitleCompleted
                  ]}>
                    {task.title}
                  </Text>
                  <Text style={styles.taskDuration}>{task.duration}</Text>
                </View>
                <Text style={styles.taskArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Motivation Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteEmoji}>💪</Text>
          <Text style={styles.quoteText}>
            "You are not the same person who left for maternity leave.
            You are stronger, wiser, and more capable than you know."
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: Colors.foreground,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.foreground,
  },
  placeholder: {
    width: 40,
  },
  progressCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: '#fff',
  },
  progressWeek: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  currentWeekCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  currentBadge: {
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  currentBadgeText: {
    fontSize: FontSizes.xs,
    color: Colors.secondary,
    fontWeight: '600',
  },
  currentWeekTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  currentWeekDesc: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    marginBottom: Spacing.md,
  },
  taskProgress: {
    backgroundColor: Colors.cream,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  taskProgressText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
    fontWeight: '500',
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
  weekCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  weekCardCurrent: {
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  weekCardCompleted: {
    opacity: 0.8,
  },
  weekNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  weekNumberText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.muted,
  },
  weekNumberTextCurrent: {
    color: Colors.secondary,
  },
  checkmark: {
    fontSize: FontSizes.lg,
    color: Colors.success,
    fontWeight: '700',
  },
  weekContent: {
    flex: 1,
  },
  weekTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.foreground,
  },
  weekTitleCompleted: {
    color: Colors.muted,
  },
  weekDesc: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginTop: 2,
  },
  weekMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },
  weekTasks: {
    fontSize: FontSizes.xs,
    color: Colors.subtle,
  },
  inProgressBadge: {
    backgroundColor: Colors.secondary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  inProgressText: {
    fontSize: FontSizes.xs,
    color: Colors.secondary,
    fontWeight: '500',
  },
  weekArrow: {
    fontSize: 24,
    color: Colors.muted,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  taskCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCheckCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  taskCheckmark: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  taskContent: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  taskType: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    textTransform: 'uppercase',
  },
  taskTitle: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    fontWeight: '500',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.muted,
  },
  taskDuration: {
    fontSize: FontSizes.xs,
    color: Colors.subtle,
    marginTop: 2,
  },
  taskArrow: {
    fontSize: 20,
    color: Colors.muted,
  },
  quoteCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.primary + '10',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  quoteEmoji: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  quoteText: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  bottomPadding: {
    height: 100,
  },
});
