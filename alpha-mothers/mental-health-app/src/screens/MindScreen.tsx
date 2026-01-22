import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
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

// Mock data - will be replaced with actual captured items from conversations
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
    type: 'worry',
    content: 'Worried about daycare transition next week',
    resolved: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    type: 'appointment',
    content: 'Team meeting - Thursday 2pm',
    resolved: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'delegation',
    content: 'Ask partner to handle grocery shopping this week',
    resolved: false,
    createdAt: new Date(),
    assignedTo: 'Partner',
  },
  {
    id: '5',
    type: 'idea',
    content: 'Try the 5-minute calm technique before big meetings',
    resolved: false,
    createdAt: new Date(),
  },
];

const typeConfig = {
  todo: { icon: '✓', label: 'To-Do', color: Colors.primary },
  worry: { icon: '💭', label: 'On Your Mind', color: '#E8A87C' },
  appointment: { icon: '📅', label: 'Coming Up', color: '#7B68EE' },
  delegation: { icon: '🤝', label: 'Delegate', color: '#20B2AA' },
  idea: { icon: '💡', label: 'Ideas', color: '#FFB347' },
};

export default function MindScreen() {
  const { user } = useUser();
  const [items, setItems] = useState<MindItem[]>(mockMindItems);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const toggleResolved = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    );
  };

  const filteredItems = selectedFilter
    ? items.filter(item => item.type === selectedFilter)
    : items;

  const unresolvedCount = items.filter(item => !item.resolved).length;
  const resolvedCount = items.filter(item => item.resolved).length;

  const filters = ['todo', 'worry', 'appointment', 'delegation', 'idea'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.primary50, Colors.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Mind</Text>
          <Text style={styles.subtitle}>
            {unresolvedCount > 0
              ? `${unresolvedCount} things on your mind`
              : 'Your mind is clear ✨'}
          </Text>
        </View>
      </LinearGradient>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[
            styles.filterPill,
            !selectedFilter && styles.filterPillActive,
          ]}
          onPress={() => setSelectedFilter(null)}
        >
          <Text
            style={[
              styles.filterText,
              !selectedFilter && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {filters.map(filter => {
          const config = typeConfig[filter as keyof typeof typeConfig];
          const count = items.filter(i => i.type === filter && !i.resolved).length;
          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterPill,
                selectedFilter === filter && styles.filterPillActive,
                selectedFilter === filter && { backgroundColor: config.color },
              ]}
              onPress={() =>
                setSelectedFilter(selectedFilter === filter ? null : filter)
              }
            >
              <Text style={styles.filterIcon}>{config.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {config.label}
              </Text>
              {count > 0 && (
                <View
                  style={[
                    styles.filterBadge,
                    { backgroundColor: selectedFilter === filter ? 'white' : config.color },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterBadgeText,
                      { color: selectedFilter === filter ? config.color : 'white' },
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Items List */}
      <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
        {/* Unresolved Items */}
        {filteredItems
          .filter(item => !item.resolved)
          .map(item => (
            <MindItemCard
              key={item.id}
              item={item}
              onToggle={() => toggleResolved(item.id)}
            />
          ))}

        {/* Resolved Section */}
        {resolvedCount > 0 && (
          <View style={styles.resolvedSection}>
            <Text style={styles.resolvedHeader}>
              Resolved ({resolvedCount})
            </Text>
            {filteredItems
              .filter(item => item.resolved)
              .map(item => (
                <MindItemCard
                  key={item.id}
                  item={item}
                  onToggle={() => toggleResolved(item.id)}
                />
              ))}
          </View>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🧘</Text>
            <Text style={styles.emptyTitle}>Mind is clear</Text>
            <Text style={styles.emptySubtitle}>
              Talk to AlphaMa to capture what's on your mind
            </Text>
          </View>
        )}

        {/* Bottom Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>💬</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>How this works</Text>
            <Text style={styles.infoText}>
              As you talk with AlphaMa, I'll automatically capture your to-dos,
              worries, and important things so you don't have to remember
              everything yourself.
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Individual Item Card
function MindItemCard({
  item,
  onToggle,
}: {
  item: MindItem;
  onToggle: () => void;
}) {
  const config = typeConfig[item.type];

  return (
    <TouchableOpacity
      style={[styles.itemCard, item.resolved && styles.itemCardResolved]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.itemCheckbox,
          item.resolved && styles.itemCheckboxChecked,
          { borderColor: config.color },
          item.resolved && { backgroundColor: config.color },
        ]}
      >
        {item.resolved && <Text style={styles.checkmark}>✓</Text>}
      </View>

      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View style={[styles.itemTypeBadge, { backgroundColor: `${config.color}20` }]}>
            <Text style={styles.itemTypeIcon}>{config.icon}</Text>
            <Text style={[styles.itemTypeLabel, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
          {item.priority === 'high' && (
            <View style={styles.priorityBadge}>
              <Text style={styles.priorityText}>Priority</Text>
            </View>
          )}
        </View>

        <Text
          style={[styles.itemText, item.resolved && styles.itemTextResolved]}
        >
          {item.content}
        </Text>

        {item.assignedTo && (
          <Text style={styles.itemAssigned}>→ {item.assignedTo}</Text>
        )}

        {item.dueDate && (
          <Text style={styles.itemDue}>
            {item.dueDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    paddingBottom: Spacing.sm,
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
    marginTop: 4,
  },

  // Filters
  filterContainer: {
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterIcon: {
    fontSize: 14,
  },
  filterText: {
    fontSize: 14,
    color: Colors.muted,
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  filterBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Items List
  itemsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Item Card
  itemCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  itemCardResolved: {
    opacity: 0.6,
  },
  itemCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  itemCheckboxChecked: {
    borderWidth: 0,
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  itemTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  itemTypeIcon: {
    fontSize: 12,
  },
  itemTypeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBadge: {
    backgroundColor: '#FFE4E4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D32F2F',
  },
  itemText: {
    fontSize: 16,
    color: Colors.foreground,
    lineHeight: 22,
  },
  itemTextResolved: {
    textDecorationLine: 'line-through',
    color: Colors.muted,
  },
  itemAssigned: {
    fontSize: 13,
    color: '#20B2AA',
    marginTop: 6,
    fontWeight: '500',
  },
  itemDue: {
    fontSize: 13,
    color: '#7B68EE',
    marginTop: 6,
    fontWeight: '500',
  },

  // Resolved Section
  resolvedSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  resolvedHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.muted,
    marginBottom: 12,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: Colors.muted,
    textAlign: 'center',
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    backgroundColor: `${Colors.primary}10`,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
  },
});
