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

interface AgeGroup {
  id: string;
  range: string;
  label: string;
  description: string;
}

interface Content {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'activity' | 'conversation' | 'tool';
  duration: string;
  ageGroups: string[];
  isNew?: boolean;
}

const ageGroups: AgeGroup[] = [
  { id: '0-2', range: '0-2', label: 'Baby & Toddler', description: 'Building foundations' },
  { id: '3-5', range: '3-5', label: 'Preschool', description: 'Early exploration' },
  { id: '6-8', range: '6-8', label: 'Early Elementary', description: 'Digital citizenship basics' },
  { id: '9-12', range: '9-12', label: 'Pre-Teen', description: 'Critical thinking & safety' },
];

const weeklyChallenge = {
  title: 'Tech-Free Tuesday Dinner',
  description: 'Have a family dinner without any screens. Use conversation cards to spark discussion.',
  duration: '45 min',
  participants: '1,234 families',
};

const content: Content[] = [
  {
    id: '1',
    title: 'What is AI? (Age-Appropriate Explanation)',
    description: 'Simple ways to explain artificial intelligence to kids at different ages',
    type: 'guide',
    duration: '10 min read',
    ageGroups: ['3-5', '6-8', '9-12'],
    isNew: true,
  },
  {
    id: '2',
    title: 'Family Tech Agreement Generator',
    description: 'Create customized screen time rules and agreements for your family',
    type: 'tool',
    duration: '15 min',
    ageGroups: ['6-8', '9-12'],
  },
  {
    id: '3',
    title: 'Screen Time Quality Audit',
    description: 'Evaluate the quality of your child\'s screen time - not just quantity',
    type: 'tool',
    duration: '20 min',
    ageGroups: ['3-5', '6-8', '9-12'],
  },
  {
    id: '4',
    title: 'AI vs Human: A Sorting Game',
    description: 'Fun activity to help kids understand what AI can and cannot do',
    type: 'activity',
    duration: '30 min',
    ageGroups: ['6-8', '9-12'],
    isNew: true,
  },
  {
    id: '5',
    title: 'Talking About Online Safety',
    description: 'Age-appropriate conversation starters for internet safety',
    type: 'conversation',
    duration: '15 min',
    ageGroups: ['6-8', '9-12'],
  },
  {
    id: '6',
    title: 'Building Creativity in an AI World',
    description: 'Activities that nurture uniquely human skills AI can\'t replicate',
    type: 'activity',
    duration: '45 min',
    ageGroups: ['3-5', '6-8', '9-12'],
  },
  {
    id: '7',
    title: 'Screen-Free Alternatives List',
    description: '100+ engaging activities for when screens aren\'t an option',
    type: 'guide',
    duration: '5 min',
    ageGroups: ['0-2', '3-5', '6-8', '9-12'],
  },
  {
    id: '8',
    title: 'When Your Child Asks About ChatGPT',
    description: 'How to respond to questions about AI tools kids see everywhere',
    type: 'conversation',
    duration: '10 min',
    ageGroups: ['6-8', '9-12'],
    isNew: true,
  },
];

const futureskills = [
  { skill: 'Critical Thinking', icon: '🧠', description: 'Questioning and evaluating information' },
  { skill: 'Creativity', icon: '🎨', description: 'Original thinking and problem-solving' },
  { skill: 'Emotional Intelligence', icon: '💙', description: 'Understanding and managing emotions' },
  { skill: 'Adaptability', icon: '🌊', description: 'Thriving in change and uncertainty' },
];

export default function GenAlphaScreen() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const getTypeIcon = (type: Content['type']) => {
    switch (type) {
      case 'guide': return '📖';
      case 'activity': return '🎯';
      case 'conversation': return '💬';
      case 'tool': return '🔧';
      default: return '📋';
    }
  };

  const filteredContent = selectedAge
    ? content.filter(c => c.ageGroups.includes(selectedAge))
    : content;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Raising Gen Alpha</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Intro Card */}
        <View style={styles.introCard}>
          <Text style={styles.introEmoji}>👶🤖</Text>
          <Text style={styles.introTitle}>Parenting the AI Generation</Text>
          <Text style={styles.introText}>
            Our kids are the first true "AI natives." This guide helps you raise
            humans who can thrive in an AI world.
          </Text>
        </View>

        {/* Weekly Challenge */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeBadge}>
            <Text style={styles.challengeBadgeText}>Weekly Challenge</Text>
          </View>
          <Text style={styles.challengeTitle}>{weeklyChallenge.title}</Text>
          <Text style={styles.challengeDesc}>{weeklyChallenge.description}</Text>
          <View style={styles.challengeMeta}>
            <Text style={styles.challengeDuration}>{weeklyChallenge.duration}</Text>
            <Text style={styles.challengeParticipants}>
              {weeklyChallenge.participants} participating
            </Text>
          </View>
          <TouchableOpacity style={styles.challengeButton}>
            <Text style={styles.challengeButtonText}>Join Challenge</Text>
          </TouchableOpacity>
        </View>

        {/* Age Filter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Age Group</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.ageFilters}>
              <TouchableOpacity
                style={[
                  styles.ageChip,
                  !selectedAge && styles.ageChipActive,
                ]}
                onPress={() => setSelectedAge(null)}
              >
                <Text style={[
                  styles.ageChipText,
                  !selectedAge && styles.ageChipTextActive,
                ]}>
                  All Ages
                </Text>
              </TouchableOpacity>
              {ageGroups.map((age) => (
                <TouchableOpacity
                  key={age.id}
                  style={[
                    styles.ageChip,
                    selectedAge === age.id && styles.ageChipActive,
                  ]}
                  onPress={() => setSelectedAge(age.id)}
                >
                  <Text style={[
                    styles.ageChipText,
                    selectedAge === age.id && styles.ageChipTextActive,
                  ]}>
                    {age.range}
                  </Text>
                  <Text style={[
                    styles.ageChipLabel,
                    selectedAge === age.id && styles.ageChipLabelActive,
                  ]}>
                    {age.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Content Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources & Activities</Text>

          {filteredContent.map((item) => (
            <TouchableOpacity key={item.id} style={styles.contentCard}>
              <View style={styles.contentHeader}>
                <View style={styles.contentType}>
                  <Text style={styles.contentIcon}>{getTypeIcon(item.type)}</Text>
                  <Text style={styles.contentTypeText}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Text>
                </View>
                {item.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New</Text>
                  </View>
                )}
              </View>
              <Text style={styles.contentTitle}>{item.title}</Text>
              <Text style={styles.contentDesc}>{item.description}</Text>
              <View style={styles.contentMeta}>
                <Text style={styles.contentDuration}>{item.duration}</Text>
                <View style={styles.ageTagsRow}>
                  {item.ageGroups.map((age) => (
                    <View key={age} style={styles.ageTag}>
                      <Text style={styles.ageTagText}>{age}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Future Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills AI Can't Replace</Text>
          <Text style={styles.sectionSubtitle}>
            Focus on nurturing these uniquely human capabilities
          </Text>

          <View style={styles.skillsGrid}>
            {futureskills.map((skill, index) => (
              <View key={index} style={styles.skillCard}>
                <Text style={styles.skillIcon}>{skill.icon}</Text>
                <Text style={styles.skillName}>{skill.skill}</Text>
                <Text style={styles.skillDesc}>{skill.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteEmoji}>🌟</Text>
          <Text style={styles.quoteText}>
            "The goal isn't to raise kids who can compete with AI.
            It's to raise kids who can do what AI cannot: be deeply, authentically human."
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
  introCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  introEmoji: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  introTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  introText: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  challengeCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.accent + '40',
  },
  challengeBadge: {
    backgroundColor: Colors.accent + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  challengeBadgeText: {
    fontSize: FontSizes.xs,
    color: Colors.accent,
    fontWeight: '600',
  },
  challengeTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  challengeDesc: {
    fontSize: FontSizes.md,
    color: Colors.muted,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  challengeMeta: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  challengeDuration: {
    fontSize: FontSizes.sm,
    color: Colors.subtle,
  },
  challengeParticipants: {
    fontSize: FontSizes.sm,
    color: Colors.accent,
    fontWeight: '500',
  },
  challengeButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: FontSizes.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  sectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  ageFilters: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  ageChip: {
    backgroundColor: Colors.cream,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    minWidth: 80,
  },
  ageChipActive: {
    backgroundColor: Colors.accent,
  },
  ageChipText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.foreground,
  },
  ageChipTextActive: {
    color: '#fff',
  },
  ageChipLabel: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    marginTop: 2,
  },
  ageChipLabelActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  contentCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  contentType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contentIcon: {
    fontSize: 16,
  },
  contentTypeText: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    textTransform: 'uppercase',
  },
  newBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  newBadgeText: {
    fontSize: FontSizes.xs,
    color: '#fff',
    fontWeight: '600',
  },
  contentTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 4,
  },
  contentDesc: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  contentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentDuration: {
    fontSize: FontSizes.xs,
    color: Colors.subtle,
  },
  ageTagsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  ageTag: {
    backgroundColor: Colors.cream,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ageTagText: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  skillCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  skillIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  skillName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.foreground,
    marginBottom: 4,
    textAlign: 'center',
  },
  skillDesc: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
    textAlign: 'center',
  },
  quoteCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.sageMist,
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
