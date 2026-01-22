import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/theme';
import { useUser } from '../contexts/UserContext';

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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userName = user?.name || 'there';
  const userInitial = userName.charAt(0).toUpperCase();
  const userStage = user?.stage ? stageLabels[user.stage] || user.stage : 'Mom';

  const handleMenuPress = (itemId: string) => {
    switch (itemId) {
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
});
