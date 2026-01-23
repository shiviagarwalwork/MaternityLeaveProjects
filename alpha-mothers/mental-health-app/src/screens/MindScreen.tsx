import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSizes, Spacing, BorderRadius, FontWeights, Shadows } from '../constants/theme';
import { useUser } from '../contexts/UserContext';

// Types for mental load items
interface MindItem {
  id: string;
  type: 'todo' | 'worry' | 'appointment' | 'idea' | 'delegation';
  content: string;
  resolved: boolean;
  createdAt: Date;
  dueDate?: Date;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
}

// Mock data - organized by type
const mockMindItems: MindItem[] = [
  {
    id: '1',
    type: 'todo',
    content: 'Schedule pediatrician appointment',
    resolved: false,
    createdAt: new Date(),
    priority: 'high',
  },
  {
    id: '2',
    type: 'todo',
    content: 'Buy diapers',
    resolved: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    type: 'worry',
    content: 'Daycare transition next week',
    resolved: false,
    createdAt: new Date(),
  },
  {
    id: '4',
    type: 'appointment',
    content: 'Team meeting - Thursday 2pm',
    resolved: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    type: 'delegation',
    content: 'Grocery shopping',
    resolved: false,
    createdAt: new Date(),
    assignedTo: 'Partner',
  },
  {
    id: '6',
    type: 'idea',
    content: '5-minute calm technique before meetings',
    resolved: false,
    createdAt: new Date(),
  },
];

const sectionConfig = {
  todo: { title: 'To-Do', icon: '✓', color: Colors.primary, emptyText: 'No tasks right now' },
  appointment: { title: 'Coming Up', icon: '📅', color: '#7B68EE', emptyText: 'Nothing scheduled' },
  delegation: { title: 'For Partner', icon: '🤝', color: '#20B2AA', emptyText: 'Nothing to delegate' },
  worry: { title: 'On Your Mind', icon: '💭', color: '#E8A87C', emptyText: 'Mind is clear' },
  idea: { title: 'Ideas & Self-Care', icon: '💡', color: '#FFB347', emptyText: 'No ideas saved' },
};

export default function MindScreen() {
  const { user } = useUser();
  const [items, setItems] = useState<MindItem[]>(mockMindItems);

  const toggleResolved = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  const getItemsByType = (type: string) => items.filter(item => item.type === type && !item.resolved);
  const resolvedItems = items.filter(item => item.resolved);
  const totalUnresolved = items.filter(item => !item.resolved).length;

  const renderSection = (type: keyof typeof sectionConfig) => {
    const config = sectionConfig[type];
    const sectionItems = getItemsByType(type);

    return (
      <View key={type} style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIconBg, { backgroundColor: `${config.color}20` }]}>
            <Text style={styles.sectionIcon}>{config.icon}</Text>
          </View>
          <Text style={styles.sectionTitle}>{config.title}</Text>
          {sectionItems.length > 0 && (
            <View style={[styles.badge, { backgroundColor: config.color }]}>
              <Text style={styles.badgeText}>{sectionItems.length}</Text>
            </View>
          )}
        </View>

        {sectionItems.length === 0 ? (
          <Text style={styles.emptyText}>{config.emptyText}</Text>
        ) : (
          <View style={styles.itemsContainer}>
            {sectionItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemCard}
                onPress={() => toggleResolved(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, { borderColor: config.color }]} />
                <View style={styles.itemContent}>
                  <Text style={styles.itemText}>{item.content}</Text>
                  {item.assignedTo && (
                    <TouchableOpacity style={styles.assignedTag}>
                      <Text style={styles.assignedText}>→ {item.assignedTo}</Text>
                      <Text style={styles.calendarHint}>Add to calendar</Text>
                    </TouchableOpacity>
                  )}
                  {item.dueDate && (
                    <Text style={styles.dueText}>
                      {item.dueDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  )}
                  {item.type === 'idea' && item.content.toLowerCase().includes('calm') && (
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionIcon}>🧘</Text>
                      <Text style={styles.actionText}>Try now</Text>
                    </TouchableOpacity>
                  )}
                  {item.priority === 'high' && (
                    <View style={styles.priorityTag}>
                      <Text style={styles.priorityText}>Priority</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary50, Colors.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              source={require('../../assets/logo.jpeg')}
              style={styles.headerLogo}
            />
            <Text style={styles.title}>Your Mind</Text>
          </View>
          <Text style={styles.subtitle}>
            {totalUnresolved > 0
              ? `${totalUnresolved} things I'm keeping track of for you`
              : "Your mind is clear ✨"}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Sections */}
        {renderSection('todo')}
        {renderSection('appointment')}
        {renderSection('delegation')}
        {renderSection('worry')}
        {renderSection('idea')}

        {/* Resolved Items */}
        {resolvedItems.length > 0 && (
          <View style={styles.resolvedSection}>
            <Text style={styles.resolvedHeader}>
              Done ({resolvedItems.length})
            </Text>
            {resolvedItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.resolvedItem}
                onPress={() => toggleResolved(item.id)}
              >
                <View style={[styles.checkbox, styles.checkboxDone]}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.resolvedText}>{item.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* How It Works Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💬</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>How this works</Text>
            <Text style={styles.infoText}>
              As you chat with me, I'll automatically capture tasks, worries, and ideas so you don't have to hold everything in your head.
            </Text>
          </View>
        </View>

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
  headerGradient: {
    paddingBottom: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginTop: Spacing.xs,
    marginLeft: 40,
  },

  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },

  // Sections
  section: {
    marginTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIcon: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: FontWeights.bold,
  },
  emptyText: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    fontStyle: 'italic',
    marginLeft: 36,
  },

  // Items
  itemsContainer: {
    gap: Spacing.sm,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    marginRight: Spacing.md,
    marginTop: 2,
  },
  checkboxDone: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: FontWeights.bold,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    lineHeight: 22,
  },
  assignedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },
  assignedText: {
    fontSize: FontSizes.sm,
    color: '#20B2AA',
    fontWeight: FontWeights.medium,
  },
  calendarHint: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  dueText: {
    fontSize: FontSizes.sm,
    color: '#7B68EE',
    marginTop: Spacing.xs,
    fontWeight: FontWeights.medium,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
    gap: 4,
  },
  actionIcon: {
    fontSize: 14,
  },
  actionText: {
    fontSize: FontSizes.xs,
    color: Colors.accent,
    fontWeight: FontWeights.semibold,
  },
  priorityTag: {
    backgroundColor: '#FFE4E4',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: Spacing.xs,
  },
  priorityText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
    color: '#D32F2F',
  },

  // Resolved Section
  resolvedSection: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  resolvedHeader: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: Colors.muted,
    marginBottom: Spacing.md,
  },
  resolvedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  resolvedText: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    textDecorationLine: 'line-through',
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${Colors.primary}10`,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.xl,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    lineHeight: 20,
  },
});
