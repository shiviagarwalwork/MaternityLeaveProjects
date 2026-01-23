// VoiceMode Component - Full-screen voice interaction for AlphaMa
// Phase 2A: Voice Integration

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '../constants/theme';
import { useVoice } from '../hooks/useVoice';
import { VoiceState } from '../services/voice';

const { width, height } = Dimensions.get('window');

interface VoiceModeProps {
  visible: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => Promise<void>;
  lastResponse?: string;
  isProcessing?: boolean;
}

export default function VoiceMode({
  visible,
  onClose,
  onSendMessage,
  lastResponse,
  isProcessing = false,
}: VoiceModeProps) {
  const {
    voiceState,
    isListening,
    isSpeakingNow,
    transcription,
    interimTranscription,
    isInitialized,
    capabilities,
    startVoiceInput,
    stopVoiceInput,
    speakText,
    stopSpeech,
    error,
  } = useVoice({
    autoSpeak: true,
    onTranscriptionComplete: (text) => {
      if (text.trim()) {
        handleSendTranscription(text);
      }
    },
    onError: (err) => {
      console.error('Voice error:', err);
    },
  });

  const [displayText, setDisplayText] = useState('');
  const [statusText, setStatusText] = useState('Tap to speak');

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  // Pulse animation for the main button
  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening]);

  // Wave animation for listening state
  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      waveAnim.setValue(0);
    }
  }, [isListening]);

  // Fade in on mount
  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // Update display text based on state
  useEffect(() => {
    if (interimTranscription) {
      setDisplayText(interimTranscription);
    } else if (transcription) {
      setDisplayText(transcription);
    } else if (lastResponse && !isListening) {
      setDisplayText(lastResponse);
    }
  }, [interimTranscription, transcription, lastResponse, isListening]);

  // Update status text based on voice state
  useEffect(() => {
    switch (voiceState) {
      case 'listening':
        setStatusText('Listening...');
        break;
      case 'processing':
        setStatusText('Processing...');
        break;
      case 'speaking':
        setStatusText('AlphaMa is speaking');
        break;
      default:
        if (isProcessing) {
          setStatusText('AlphaMa is thinking...');
        } else {
          setStatusText('Tap to speak');
        }
    }
  }, [voiceState, isProcessing]);

  // Speak last response when it changes
  useEffect(() => {
    if (lastResponse && !isListening && !isProcessing && voiceState === 'idle') {
      speakText(lastResponse);
    }
  }, [lastResponse]);

  // Handle sending transcription
  const handleSendTranscription = async (text: string) => {
    if (text.trim()) {
      await onSendMessage(text.trim());
    }
  };

  // Handle main button press
  const handleMainButtonPress = async () => {
    if (isSpeakingNow) {
      stopSpeech();
      return;
    }

    if (isListening) {
      const text = await stopVoiceInput();
      if (text) {
        handleSendTranscription(text);
      }
    } else {
      setDisplayText('');
      await startVoiceInput();
    }
  };

  // Get button color based on state
  const getButtonColors = (): [string, string] => {
    if (isListening) {
      return ['#E53935', '#C62828']; // Red when listening
    }
    if (isSpeakingNow) {
      return [Colors.accent, Colors.accentDark]; // Green when speaking
    }
    if (isProcessing) {
      return ['#9E9E9E', '#757575']; // Gray when processing
    }
    return [Colors.primary, Colors.primaryDark]; // Default
  };

  // Get button icon based on state
  const getButtonIcon = (): string => {
    if (isListening) return '⏹';
    if (isSpeakingNow) return '🔊';
    if (isProcessing) return '⏳';
    return '🎤';
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.primary50, Colors.background, Colors.background]}
          style={styles.gradient}
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>

            {/* AlphaMa Avatar */}
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/logo.jpeg')}
                style={styles.avatar}
              />
              <Text style={styles.avatarName}>AlphaMa</Text>
              <View style={styles.statusIndicator}>
                <View style={[
                  styles.statusDot,
                  isSpeakingNow && styles.statusDotSpeaking,
                  isListening && styles.statusDotListening,
                ]} />
                <Text style={styles.statusText}>{statusText}</Text>
              </View>
            </View>

            {/* Display Text / Transcription */}
            <View style={styles.textContainer}>
              <Text style={[
                styles.displayText,
                isListening && styles.displayTextListening,
                !displayText && styles.displayTextPlaceholder,
              ]}>
                {displayText || (isListening ? 'Say something...' : 'Tap the button to start talking')}
              </Text>
            </View>

            {/* Waveform Visualization */}
            {isListening && (
              <View style={styles.waveformContainer}>
                {[...Array(5)].map((_, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.waveBar,
                      {
                        height: 20 + Math.random() * 40,
                        opacity: waveAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 1],
                        }),
                        transform: [{
                          scaleY: waveAnim.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0.5, 1.2, 0.5],
                          }),
                        }],
                      },
                    ]}
                  />
                ))}
              </View>
            )}

            {/* Main Voice Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.mainButton}
                onPress={handleMainButtonPress}
                activeOpacity={0.8}
                disabled={isProcessing || voiceState === 'processing'}
              >
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient
                    colors={getButtonColors()}
                    style={styles.mainButtonGradient}
                  >
                    <Text style={styles.mainButtonIcon}>{getButtonIcon()}</Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>

              {/* Listening ring effect */}
              {isListening && (
                <Animated.View style={[
                  styles.listeningRing,
                  {
                    opacity: pulseAnim.interpolate({
                      inputRange: [1, 1.15],
                      outputRange: [0.5, 0],
                    }),
                    transform: [{ scale: pulseAnim }],
                  },
                ]} />
              )}
            </View>

            {/* Quick Action Buttons */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => handleSendTranscription("I'm feeling overwhelmed")}
              >
                <Text style={styles.quickActionIcon}>😮‍💨</Text>
                <Text style={styles.quickActionText}>Overwhelmed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => handleSendTranscription("I need to vent")}
              >
                <Text style={styles.quickActionIcon}>💬</Text>
                <Text style={styles.quickActionText}>Vent</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => handleSendTranscription("Help me organize my thoughts")}
              >
                <Text style={styles.quickActionIcon}>📋</Text>
                <Text style={styles.quickActionText}>Organize</Text>
              </TouchableOpacity>
            </View>

            {/* Error Display */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {error.message || 'Voice feature unavailable'}
                </Text>
              </View>
            )}

            {/* Capabilities Info */}
            {!isInitialized && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Initializing voice...</Text>
              </View>
            )}
          </Animated.View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Spacing.xl,
  },

  // Close button
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 20,
    color: Colors.foreground,
  },

  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.md,
  },
  avatarName: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
  },
  statusDotSpeaking: {
    backgroundColor: Colors.accent,
  },
  statusDotListening: {
    backgroundColor: '#E53935',
  },
  statusText: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },

  // Text display
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    maxHeight: 200,
  },
  displayText: {
    fontSize: FontSizes.lg,
    color: Colors.foreground,
    textAlign: 'center',
    lineHeight: 28,
  },
  displayTextListening: {
    color: Colors.primary,
    fontStyle: 'italic',
  },
  displayTextPlaceholder: {
    color: Colors.muted,
  },

  // Waveform
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    gap: 8,
  },
  waveBar: {
    width: 6,
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },

  // Main button
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xl,
  },
  mainButton: {
    zIndex: 2,
  },
  mainButtonGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  mainButtonIcon: {
    fontSize: 40,
  },
  listeningRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#E53935',
    zIndex: 1,
  },

  // Quick actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 80,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: FontSizes.xs,
    color: Colors.muted,
  },

  // Error
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  errorText: {
    color: '#C62828',
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },

  // Loading
  loadingContainer: {
    padding: Spacing.md,
  },
  loadingText: {
    color: Colors.muted,
    fontSize: FontSizes.sm,
  },
});
