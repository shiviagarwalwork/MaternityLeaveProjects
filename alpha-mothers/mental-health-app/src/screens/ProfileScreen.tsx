import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/theme';
import { useUser } from '../contexts/UserContext';
import { useMemory } from '../hooks/useMemory';
import { UserFact, UserPattern } from '../services/memory';
import { useGmail } from '../hooks/useGmail';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  hasArrow?: boolean;
  badge?: string;
  isToggle?: boolean;
  value?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: 'Account',
    items: [
      { id: 'profile', label: 'Edit Profile', icon: '👤', hasArrow: true },
      { id: 'subscription', label: 'Subscription', icon: '⭐', hasArrow: true, badge: 'Free Trial' },
      { id: 'privacy', label: 'Privacy Settings', icon: '🔒', hasArrow: true },
    ],
  },
  {
    title: 'AlphaMa Memory',
    items: [
      { id: 'memory', label: 'What I Know About You', icon: '🧠', hasArrow: true },
      { id: 'patterns', label: 'Patterns Detected', icon: '📊', hasArrow: true },
      { id: 'clear-memory', label: 'Clear All Memory', icon: '🗑️', hasArrow: true },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { id: 'gmail', label: 'Connect Gmail', icon: '📧', hasArrow: true },
      { id: 'calendar-connect', label: 'Connect Calendar', icon: '📅', hasArrow: true },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', label: 'Notifications', icon: '🔔', isToggle: true },
      { id: 'reminders', label: 'Daily Reminders', icon: '⏰', hasArrow: true },
      { id: 'theme', label: 'Appearance', icon: '🎨', hasArrow: true },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', label: 'Help Center', icon: '❓', hasArrow: true },
      { id: 'feedback', label: 'Send Feedback', icon: '💬', hasArrow: true },
      { id: 'crisis', label: 'Crisis Resources', icon: '🆘', hasArrow: true },
    ],
  },
  {
    title: 'About',
    items: [
      { id: 'terms', label: 'Terms of Service', icon: '📄', hasArrow: true },
      { id: 'privacy-policy', label: 'Privacy Policy', icon: '🛡️', hasArrow: true },
      { id: 'version', label: 'App Version', icon: 'ℹ️', value: '1.0.0' },
    ],
  },
];

const stageLabels: { [key: string]: string } = {
  pregnant: 'Expecting',
  new_mom: 'New Mom',
  postpartum: 'Postpartum',
  returning_to_work: 'Returning to Work',
  working_mom: 'Working Mom',
  established_mom: 'Established Mom',
};

export default function ProfileScreen() {
  const { user, resetOnboarding } = useUser();
  const { facts, patterns, clearMemory, removeFact, isLoading: memoryLoading } = useMemory();
  const {
    isConnected: isGmailConnected,
    isAuthenticating,
    profile: gmailProfile,
    unreadCount,
    connectGmail,
    disconnect: disconnectGmail,
    error: gmailError,
  } = useGmail();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [memoryModalVisible, setMemoryModalVisible] = useState(false);
  const [patternsModalVisible, setPatternsModalVisible] = useState(false);

  const userName = user?.name || 'there';
  const userInitial = userName.charAt(0).toUpperCase();
  const userStage = user?.stage ? stageLabels[user.stage] || user.stage : 'Mom';

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      family: '👨‍👩‍👧',
      work: '💼',
      health: '💊',
      schedule: '📅',
      preferences: '⚙️',
      stressors: '😰',
      goals: '🎯',
      other: '📝',
    };
    return icons[category] || '📝';
  };

  const getPatternIcon = (type: string): string => {
    const icons: Record<string, string> = {
      emotional: '💜',
      scheduling: '📅',
      delegation: '🤝',
      self_care: '🧘',
      parenting: '👶',
    };
    return icons[type] || '📊';
  };

  const handleClearMemory = () => {
    Alert.alert(
      'Clear All Memory',
      'This will delete everything AlphaMa has learned about you. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearMemory();
            Alert.alert('Memory Cleared', 'AlphaMa will start fresh with learning about you.');
          },
        },
      ]
    );
  };

  const handleDeleteFact = (factId: string, factContent: string) => {
    Alert.alert(
      'Delete This Memory?',
      `Remove: ${factContent}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeFact(factId),
        },
      ]
    );
  };

  const handleGmailConnect = async () => {
    if (isGmailConnected) {
      Alert.alert(
        'Disconnect Gmail',
        `Disconnect ${gmailProfile?.email || 'Gmail'}? AlphaMa will no longer have access to your emails.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disconnect',
            style: 'destructive',
            onPress: async () => {
              await disconnectGmail();
              Alert.alert('Disconnected', 'Gmail has been disconnected.');
            },
          },
        ]
      );
    } else {
      try {
        await connectGmail();
      } catch (err) {
        Alert.alert('Connection Failed', 'Could not connect to Gmail. Please try again.');
      }
    }
  };

  const handleMenuPress = (itemId: string) => {
    switch (itemId) {
      case 'memory':
        setMemoryModalVisible(true);
        break;
      case 'patterns':
        setPatternsModalVisible(true);
        break;
      case 'clear-memory':
        handleClearMemory();
        break;
      case 'gmail':
        handleGmailConnect();
        break;
      case 'calendar-connect':
        Alert.alert('Coming Soon', 'Calendar connection will be available after you set up Google Cloud credentials.');
        break;
      case 'crisis':
        Alert.alert(
          'Crisis Resources',
          'If you\'re in crisis, please reach out:\n\n' +
          '• National Suicide Prevention Lifeline: 988\n' +
          '• Crisis Text Line: Text HOME to 741741\n' +
          '• Postpartum Support International: 1-800-944-4773\n\n' +
          'You are not alone. Help is available 24/7.',
          [{ text: 'OK' }]
        );
        break;
      case 'feedback':
        Alert.alert('Feedback', 'Thank you for wanting to share feedback! This feature is coming soon.');
        break;
      default:
        // Navigate to respective screen
        break;
    }
  };

  const renderFactItem = ({ item }: { item: UserFact }) => (
    <TouchableOpacity
      style={styles.memoryItem}
      onLongPress={() => handleDeleteFact(item.id, item.value)}
    >
      <Text style={styles.memoryIcon}>{getCategoryIcon(item.category)}</Text>
      <View style={styles.memoryContent}>
        <Text style={styles.memoryKey}>{item.key.replace(/_/g, ' ')}</Text>
        <Text style={styles.memoryValue}>{item.value}</Text>
      </View>
      <View style={styles.confidenceBadge}>
        <Text style={styles.confidenceText}>{Math.round(item.confidence * 100)}%</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPatternItem = ({ item }: { item: UserPattern }) => (
    <View style={styles.patternItem}>
      <Text style={styles.patternIcon}>{getPatternIcon(item.type)}</Text>
      <View style={styles.patternContent}>
        <Text style={styles.patternDescription}>{item.description}</Text>
        <Text style={styles.patternMeta}>Observed {item.frequency}x</Text>
      </View>
    </View>
  );

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out? This will reset the app.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => resetOnboarding() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.primary50, Colors.background]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Manage your account</Text>
          </View>
        </LinearGradient>

        {/* User Card */}
        <View style={styles.userCard}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{userInitial}</Text>
          </LinearGradient>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <View style={styles.stageBadge}>
              <Text style={styles.stageText}>{userStage}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Check-ins</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Journal Entries</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={() => handleMenuPress(item.id)}
                  disabled={item.isToggle}
                >
                  <View style={styles.menuItemLeft}>
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.value && (
                      <Text style={styles.menuValue}>{item.value}</Text>
                    )}
                    {item.isToggle && (
                      <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: Colors.border, true: Colors.primary + '60' }}
                        thumbColor={notificationsEnabled ? Colors.primary : Colors.muted}
                      />
                    )}
                    {item.hasArrow && (
                      <Text style={styles.arrow}>›</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with 💜 by Alpha Mothers</Text>
          <Text style={styles.footerSubtext}>
            Remember: You&apos;re doing amazing. One day at a time.
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Memory Modal */}
      <Modal
        visible={memoryModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setMemoryModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>What AlphaMa Knows</Text>
            <TouchableOpacity onPress={() => setMemoryModalVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>
            Facts learned from our conversations. Long press to delete.
          </Text>
          {facts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🧠</Text>
              <Text style={styles.emptyText}>No memories yet</Text>
              <Text style={styles.emptySubtext}>
                As we chat, I'll learn about your family, work, and preferences to better support you.
              </Text>
            </View>
          ) : (
            <FlatList
              data={facts}
              renderItem={renderFactItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.memoryList}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Patterns Modal */}
      <Modal
        visible={patternsModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setPatternsModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Patterns Detected</Text>
            <TouchableOpacity onPress={() => setPatternsModalVisible(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>
            Trends and patterns I've noticed in our conversations.
          </Text>
          {patterns.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📊</Text>
              <Text style={styles.emptyText}>No patterns detected yet</Text>
              <Text style={styles.emptySubtext}>
                Over time, I'll identify recurring themes and stressors to proactively help you.
              </Text>
            </View>
          ) : (
            <FlatList
              data={patterns}
              renderItem={renderPatternItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.memoryList}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    paddingBottom: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginTop: 2,
  },
  userCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  stageBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  stageText: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  editButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  editButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: FontSizes.sm,
  },
  statsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.xxl,
    fontWeight: '700',
    color: Colors.foreground,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  section: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  menuCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
  },
  menuLabel: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
  },
  badge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginLeft: Spacing.sm,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    color: '#fff',
    fontWeight: '600',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  arrow: {
    fontSize: 24,
    color: Colors.muted,
    marginLeft: Spacing.sm,
  },
  logoutButton: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  logoutText: {
    fontSize: FontSizes.md,
    color: Colors.error,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  footerSubtext: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
  bottomPadding: {
    height: 100,
  },

  // Memory Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
  },
  modalClose: {
    fontSize: 24,
    color: Colors.muted,
    padding: Spacing.sm,
  },
  modalSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  memoryList: {
    padding: Spacing.lg,
  },
  memoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  memoryIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  memoryContent: {
    flex: 1,
  },
  memoryKey: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    textTransform: 'capitalize',
  },
  memoryValue: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    marginTop: 2,
  },
  confidenceBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  confidenceText: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: '600',
  },
  patternItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  patternIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  patternContent: {
    flex: 1,
  },
  patternDescription: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
  },
  patternMeta: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
