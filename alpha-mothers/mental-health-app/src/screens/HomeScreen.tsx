import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows, MoodEmojis } from '../constants/theme';
import { useUser, getGreeting } from '../contexts/UserContext';

export default function HomeScreen() {
  const { user, todayCheckIn, insights } = useUser();
  const greeting = getGreeting();

  // Mock data for demo
  const mockUser = {
    name: 'Sarah',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.userName}>{mockUser.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Check-in Card */}
        <TouchableOpacity style={styles.checkInCard}>
          <View style={styles.checkInHeader}>
            <Text style={styles.checkInTitle}>How are you feeling today?</Text>
            <Text style={styles.checkInSubtitle}>30 seconds • Daily check-in</Text>
          </View>
          <View style={styles.moodSelector}>
            {MoodEmojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  index === 3 && styles.moodButtonSelected,
                ]}
              >
                <Text style={styles.moodEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>

        {/* AI Insight Card */}
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Text style={styles.insightIcon}>✨</Text>
            <Text style={styles.insightLabel}>Today's Insight</Text>
          </View>
          <Text style={styles.insightText}>
            I noticed you've been feeling more anxious on Sunday evenings.
            This is common as the week ahead approaches. Would you like to
            explore some strategies?
          </Text>
          <TouchableOpacity style={styles.insightButton}>
            <Text style={styles.insightButtonText}>Explore Strategies</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: Colors.primary50 }]}>
            <Text style={styles.quickActionIcon}>📝</Text>
            <Text style={styles.quickActionLabel}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: Colors.sageMist }]}>
            <Text style={styles.quickActionIcon}>🎧</Text>
            <Text style={styles.quickActionLabel}>Guided</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: Colors.blush }]}>
            <Text style={styles.quickActionIcon}>💬</Text>
            <Text style={styles.quickActionLabel}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#FDF5ED' }]}>
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionLabel}>Progress</Text>
          </TouchableOpacity>
        </View>

        {/* Journey Modules */}
        <Text style={styles.sectionTitle}>Your Journey</Text>

        {/* Return to Work Module */}
        <TouchableOpacity style={styles.moduleCard}>
          <View style={[styles.moduleIcon, { backgroundColor: '#FDF5ED' }]}>
            <Text style={styles.moduleIconText}>🚀</Text>
          </View>
          <View style={styles.moduleContent}>
            <Text style={styles.moduleLabel}>Return to Work</Text>
            <Text style={styles.moduleTitle}>Week 3: Flexibility Conversations</Text>
            <Text style={styles.moduleDescription}>
              Ready to discuss hybrid work options with your manager?
            </Text>
            <View style={styles.moduleProgress}>
              <View style={[styles.progressBar, { width: '60%' }]} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Gen Alpha Module */}
        <TouchableOpacity style={styles.moduleCard}>
          <View style={[styles.moduleIcon, { backgroundColor: Colors.sageMist }]}>
            <Text style={styles.moduleIconText}>🤖</Text>
          </View>
          <View style={styles.moduleContent}>
            <Text style={styles.moduleLabel}>Gen Alpha Guide</Text>
            <Text style={styles.moduleTitle}>This Week's Challenge</Text>
            <Text style={styles.moduleDescription}>
              Ask your child: "If AI could help you with homework, what would you want it to do?"
            </Text>
          </View>
        </TouchableOpacity>

        {/* Guided Sessions */}
        <Text style={styles.sectionTitle}>Recommended Sessions</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sessionsContainer}
        >
          {[
            { title: 'Evening Wind Down', duration: '10 min', icon: '🌙', color: Colors.primary50 },
            { title: 'Anxiety Relief', duration: '5 min', icon: '🧘', color: Colors.sageMist },
            { title: 'Morning Energy', duration: '8 min', icon: '☀️', color: Colors.blush },
          ].map((session, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.sessionCard, { backgroundColor: session.color }]}
            >
              <Text style={styles.sessionIcon}>{session.icon}</Text>
              <Text style={styles.sessionTitle}>{session.title}</Text>
              <Text style={styles.sessionDuration}>{session.duration}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  greeting: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  notificationIcon: {
    fontSize: 20,
  },

  // Check-in Card
  checkInCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  checkInHeader: {
    marginBottom: Spacing.md,
  },
  checkInTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  checkInSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodButtonSelected: {
    backgroundColor: Colors.primary,
    transform: [{ scale: 1.1 }],
    ...Shadows.md,
  },
  moodEmoji: {
    fontSize: 28,
  },

  // Insight Card
  insightCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  insightIcon: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  insightLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.primary,
  },
  insightText: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  insightButton: {
    backgroundColor: Colors.primary50,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignSelf: 'flex-start',
  },
  insightButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.primary,
  },

  // Section Title
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.md,
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  quickAction: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  quickActionLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    color: Colors.foreground,
  },

  // Module Card
  moduleCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  moduleIconText: {
    fontSize: 24,
  },
  moduleContent: {
    flex: 1,
  },
  moduleLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  moduleTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  moduleDescription: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    lineHeight: 20,
  },
  moduleProgress: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginTop: Spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },

  // Sessions
  sessionsContainer: {
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  sessionCard: {
    width: 140,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginRight: Spacing.md,
  },
  sessionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  sessionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  sessionDuration: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
  },
});
