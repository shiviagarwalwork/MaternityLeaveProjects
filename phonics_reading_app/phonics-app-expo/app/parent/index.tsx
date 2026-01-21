import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../src/theme';

export default function ParentPinScreen() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const correctPin = '1234'; // TODO: Store securely

  const handleNumberPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === correctPin) {
          router.push('/parent/dashboard');
          setPin('');
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setError(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed" size={48} color={colors.primary} />
        </View>
        <Text style={styles.title}>Parent Area</Text>
        <Text style={styles.subtitle}>Enter your PIN to access settings</Text>

        {/* PIN Dots */}
        <View style={styles.pinContainer}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.pinDot,
                i < pin.length && styles.pinDotFilled,
                error && styles.pinDotError,
              ]}
            />
          ))}
        </View>

        {error && (
          <Text style={styles.errorText}>Incorrect PIN. Try again.</Text>
        )}

        {/* Hint */}
        <Text style={styles.hint}>Hint: 1234</Text>

        {/* Number Pad */}
        <View style={styles.numPad}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['', '0', 'delete'],
          ].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numRow}>
              {row.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.numButton,
                    item === '' && styles.numButtonEmpty,
                  ]}
                  onPress={() => {
                    if (item === 'delete') {
                      handleDelete();
                    } else if (item !== '') {
                      handleNumberPress(item);
                    }
                  }}
                  disabled={item === ''}
                  activeOpacity={0.7}
                >
                  {item === 'delete' ? (
                    <Ionicons name="backspace-outline" size={28} color={colors.textPrimary} />
                  ) : (
                    <Text style={styles.numText}>{item}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  pinContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  pinDotFilled: {
    backgroundColor: colors.primary,
  },
  pinDotError: {
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.error,
    marginBottom: spacing.md,
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.xl,
  },
  numPad: {
    gap: spacing.md,
  },
  numRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  numButton: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  numButtonEmpty: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  numText: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
});
