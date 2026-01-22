import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows, MoodEmojis } from '../constants/theme';
import { useUser, getGreeting, getStageDisplayName, getConcernDisplayName } from '../contexts/UserContext';
import { UserConcern } from '../types';

// Personalized insights based on concerns
const CONCERN_INSIGHTS: Record<UserConcern, { text: string; action: string }> = {
  sleep_deprivation: {
    text: "Sleep deprivation affects everything - your mood, patience, and energy. Even 10 extra minutes can help. Would you like some quick rest strategies?",
    action: "Explore Sleep Tips",
  },
  anxiety_overwhelm: {
    text: "Feeling overwhelmed is your mind's signal that you need support. You're not failing - you're human. Want to try a 2-minute breathing exercise?",
    action: "Try Breathing Exercise",
  },
  work_life_balance: {
    text: "The 'balance' myth sets us up to fail. It's more about intentional choices. Let's explore what boundaries might work for you.",
    action: "Explore Strategies",
  },
  career_identity: {
    text: "Your identity is expanding, not disappearing. Many moms feel this tension between who they were and who they're becoming.",
    action: "Talk to Alpha",
  },
  relationship_changes: {
    text: "Relationships shift when a baby arrives. It's normal to feel disconnected. Small moments of connection can help.",
    action: "Get Tips",
  },
  physical_recovery: {
    text: "Your body did something incredible. Recovery isn't linear, and it's okay to take it slow. Be gentle with yourself.",
    action: "View Recovery Guide",
  },
  loneliness: {
    text: "Motherhood can feel isolating, even when surrounded by people. You're not alone in feeling alone. Connection helps.",
    action: "Find Community",
  },
  mom_guilt: {
    text: "Mom guilt is almost universal - it means you care deeply. But it doesn't have to run the show. Let's work through it.",
    action: "Talk to Alpha",
  },
  screen_time_kids: {
    text: "Navigating screens with kids in the AI age is new territory for all of us. There's no perfect answer, just intentional choices.",
    action: "View Gen Alpha Guide",
  },
  financial_stress: {
    text: "Financial pressure adds weight to everything else. It's valid to feel stressed about it. Taking small steps helps.",
    action: "Explore Resources",
  },
};

// Stage-specific modules
const getModulesForStage = (stage: string) => {
  const modules = [];

  if (stage === 'pregnant') {
    modules.push({
      icon: '🤰',
      color: Colors.blush,
      label: 'Preparing for Baby',
      title: 'Mental Health Prep',
      description: 'Build your emotional toolkit before baby arrives',
      route: 'Journal',
    });
  }

  if (['new_mom', 'postpartum'].includes(stage)) {
    modules.push({
      icon: '💤',
      color: Colors.sageMist,
      label: 'New Mom Survival',
      title: 'This Week: Sleep Strategies',
      description: 'Making peace with broken sleep and finding rest where you can',
      route: 'Journal',
    });
  }

  if (['returning_to_work', 'working_mom'].includes(stage)) {
    modules.push({
      icon: '🚀',
      color: '#FDF5ED',
      label: 'Return to Work',
      title: 'Week 3: Flexibility Conversations',
      description: 'Ready to discuss hybrid work options with your manager?',
      route: 'ReturnToWork',
      progress: 0.6,
    });
  }

  // Always show Gen Alpha for moms with kids
  if (['new_mom', 'postpartum', 'returning_to_work', 'working_mom', 'established_mom'].includes(stage)) {
    modules.push({
      icon: '🤖',
      color: Colors.sageMist,
      label: 'Raising Gen Alpha',
      title: "This Week's Challenge",
      description: 'Start a conversation about AI with your child using our prompts',
      route: 'GenAlpha',
    });
  }

  return modules;
};

// Personalized sessions based on concerns
const getSessionsForConcerns = (concerns: UserConcern[]) => {
  const sessions = [];

  if (concerns.includes('sleep_deprivation')) {
    sessions.push({ title: 'Power Nap Reset', duration: '10 min', icon: '😴', color: Colors.sageMist });
  }
  if (concerns.includes('anxiety_overwhelm')) {
    sessions.push({ title: 'Anxiety Relief', duration: '5 min', icon: '🧘', color: Colors.primary50 });
  }
  if (concerns.includes('loneliness') || concerns.includes('mom_guilt')) {
    sessions.push({ title: 'Self-Compassion', duration: '8 min', icon: '💕', color: Colors.blush });
  }

  // Default sessions
  if (sessions.length < 3) {
    sessions.push({ title: 'Morning Energy', duration: '8 min', icon: '☀️', color: Colors.blush });
  }
  if (sessions.length < 3) {
    sessions.push({ title: 'Evening Wind Down', duration: '10 min', icon: '🌙', color: Colors.primary50 });
  }

  return sessions.slice(0, 3);
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { user, todayCheckIn } = useUser();
  const greeting = getGreeting();

  // Use actual user data
  const userName = user?.name || 'there';
  const userStage = user?.stage || 'new_mom';
  const userConcerns = user?.concerns || ['anxiety_overwhelm'];
  const primaryConcern = userConcerns[0];

  // Get personalized content
  const insight = CONCERN_INSIGHTS[primaryConcern];
  const modules = getModulesForStage(userStage);
  const sessions = getSessionsForConcerns(userConcerns);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <View style={styles.stageBadge}>
            <Text style={styles.stageBadgeText}>{getStageDisplayName(userStage)}</Text>
          </View>
        </View>

        {/* Concerns Tags */}
        <View style={styles.concernsContainer}>
          {userConcerns.slice(0, 3).map((concern, index) => (
            <View key={concern} style={styles.concernTag}>
              <Text style={styles.concernTagText}>{getConcernDisplayName(concern)}</Text>
            </View>
          ))}
        </View>

        {/* Daily Check-in Card */}
        <TouchableOpacity
          style={styles.checkInCard}
          onPress={() => navigation.navigate('CheckInTab')}
        >
          <View style={styles.checkInHeader}>
            <Text style={styles.checkInTitle}>How are you feeling today?</Text>
            <Text style={styles.checkInSubtitle}>30 seconds • Daily check-in</Text>
          </View>
          <View style={styles.moodSelector}>
            {MoodEmojis.map((emoji, index) => (
              <View
                key={index}
                style={[
                  styles.moodButton,
                  todayCheckIn?.mood === (index + 1) && styles.moodButtonSelected,
                ]}
              >
                <Text style={styles.moodEmoji}>{emoji}</Text>
              </View>
            ))}
          </View>
          {!todayCheckIn && (
            <View style={styles.checkInPrompt}>
              <Text style={styles.checkInPromptText}>Tap to check in</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Personalized AI Insight Card */}
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Text style={styles.insightIcon}>✨</Text>
            <Text style={styles.insightLabel}>For You Today</Text>
          </View>
          <Text style={styles.insightText}>{insight.text}</Text>
          <TouchableOpacity
            style={styles.insightButton}
            onPress={() => navigation.navigate('Alpha')}
          >
            <Text style={styles.insightButtonText}>{insight.action}</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickAction, { backgroundColor: Colors.primary50 }]}
            onPress={() => navigation.navigate('Journal')}
          >
            <Text style={styles.quickActionIcon}>📝</Text>
            <Text style={styles.quickActionLabel}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, { backgroundColor: Colors.sageMist }]}
            onPress={() => navigation.navigate('Alpha')}
          >
            <Text style={styles.quickActionIcon}>💬</Text>
            <Text style={styles.quickActionLabel}>Talk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, { backgroundColor: Colors.blush }]}
            onPress={() => navigation.navigate('CheckInTab')}
          >
            <Text style={styles.quickActionIcon}>✨</Text>
            <Text style={styles.quickActionLabel}>Check In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, { backgroundColor: '#FDF5ED' }]}
            onPress={() => navigation.navigate('Progress')}
          >
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionLabel}>Progress</Text>
          </TouchableOpacity>
        </View>

        {/* Journey Modules - Personalized by Stage */}
        <Text style={styles.sectionTitle}>Your Journey</Text>
        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            style={styles.moduleCard}
            onPress={() => module.route && navigation.navigate(module.route)}
          >
            <View style={[styles.moduleIcon, { backgroundColor: module.color }]}>
              <Text style={styles.moduleIconText}>{module.icon}</Text>
            </View>
            <View style={styles.moduleContent}>
              <Text style={styles.moduleLabel}>{module.label}</Text>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDescription}>{module.description}</Text>
              {module.progress !== undefined && (
                <View style={styles.moduleProgressContainer}>
                  <View style={styles.moduleProgressTrack}>
                    <View style={[styles.moduleProgressBar, { width: `${module.progress * 100}%` }]} />
                  </View>
                  <Text style={styles.moduleProgressText}>{Math.round(module.progress * 100)}%</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Recommended Sessions - Personalized by Concerns */}
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sessionsContainer}
        >
          {sessions.map((session, index) => (
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
    marginBottom: Spacing.sm,
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
  stageBadge: {
    backgroundColor: Colors.primary50,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  stageBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    color: Colors.primary,
  },

  // Concerns Tags
  concernsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  concernTag: {
    backgroundColor: Colors.cream,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  concernTagText: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
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
  checkInPrompt: {
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  checkInPromptText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },

  // Insight Card
  insightCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
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
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignSelf: 'flex-start',
  },
  insightButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: 'white',
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
  moduleProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  moduleProgressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  moduleProgressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  moduleProgressText: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    fontWeight: FontWeights.medium,
  },

  // Sessions
  sessionsContainer: {
    paddingRight: Spacing.lg,
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
