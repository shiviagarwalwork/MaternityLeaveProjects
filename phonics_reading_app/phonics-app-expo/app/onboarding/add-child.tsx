import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/theme';

const avatars = [
  { id: 'bear', icon: 'paw', color: colors.stageColors[0] },
  { id: 'owl', icon: 'moon', color: colors.stageColors[1] },
  { id: 'fox', icon: 'leaf', color: colors.stageColors[2] },
  { id: 'rabbit', icon: 'flower', color: colors.stageColors[3] },
  { id: 'dragon', icon: 'flame', color: colors.stageColors[4] },
  { id: 'unicorn', icon: 'star', color: colors.stageColors[5] },
];

export default function AddChildScreen() {
  const [name, setName] = useState('');
  const [selectedAge, setSelectedAge] = useState(5);
  const [selectedAvatar, setSelectedAvatar] = useState('bear');

  const handleAddChild = () => {
    if (!name.trim()) {
      // Show error
      return;
    }
    // TODO: Save child profile
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Who's learning{'\n'}to read?</Text>

        {/* Avatar selection */}
        <Text style={styles.sectionTitle}>Pick an avatar</Text>
        <View style={styles.avatarGrid}>
          {avatars.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarButton,
                {
                  backgroundColor:
                    selectedAvatar === avatar.id
                      ? avatar.color
                      : `${avatar.color}30`,
                  borderColor:
                    selectedAvatar === avatar.id ? avatar.color : 'transparent',
                },
              ]}
              onPress={() => setSelectedAvatar(avatar.id)}
            >
              <Ionicons
                name={avatar.icon as any}
                size={32}
                color={selectedAvatar === avatar.id ? colors.surface : avatar.color}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Name input */}
        <Text style={styles.sectionTitle}>Child's name</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="happy-outline"
            size={20}
            color={colors.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor={colors.textLight}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Age selection */}
        <Text style={styles.sectionTitle}>Age</Text>
        <View style={styles.ageGrid}>
          {[3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
            <TouchableOpacity
              key={age}
              style={[
                styles.ageButton,
                selectedAge === age && styles.ageButtonSelected,
              ]}
              onPress={() => setSelectedAge(age)}
            >
              <Text
                style={[
                  styles.ageText,
                  selectedAge === age && styles.ageTextSelected,
                ]}
              >
                {age}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleAddChild}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Start Learning!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  avatarButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: `${colors.textLight}30`,
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  ageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  ageButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: `${colors.textLight}30`,
  },
  ageButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ageText: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  ageTextSelected: {
    color: colors.surface,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginTop: spacing.xxl,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.textOnPrimary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
});
