import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/theme';
import { useUser, getGreeting } from '../contexts/UserContext';
import { getAlphaMaResponse, getSimulatedResponse, Message as AIMessage } from '../services/ai';
import { USE_SIMULATED_RESPONSES } from '../config/env';

const { width, height } = Dimensions.get('window');

interface Message {
  id: string;
  role: 'user' | 'alpha';
  content: string;
  timestamp: Date;
  capturedItems?: CapturedItem[];
}

interface CapturedItem {
  id: string;
  type: 'todo' | 'worry' | 'appointment' | 'idea';
  content: string;
  resolved: boolean;
}

// Suggestion prompts for different moods/needs
const suggestionPrompts = [
  { id: '1', text: "I'm feeling overwhelmed", icon: '😮‍💨' },
  { id: '2', text: "I need to vent", icon: '💬' },
  { id: '3', text: "Help me organize my day", icon: '📋' },
  { id: '4', text: "I'm feeling guilty", icon: '💭' },
  { id: '5', text: "I can't sleep", icon: '🌙' },
  { id: '6', text: "I need some encouragement", icon: '💪' },
];

// Helper to convert local messages to AI service format
const convertToAIMessages = (messages: Message[]): AIMessage[] => {
  return messages
    .filter(m => m.id !== 'initial')
    .map(m => ({
      role: m.role === 'user' ? 'user' as const : 'assistant' as const,
      content: m.content,
    }));
};

export default function AlphaScreen() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedItems, setCapturedItems] = useState<CapturedItem[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const userName = user?.name || 'there';
  const userStage = user?.stage || 'new_mom';
  const greeting = getGreeting();

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Initial greeting when no messages
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: 'initial',
        role: 'alpha',
        content: `${greeting}, ${userName}. 💜\n\nHow are you feeling today? I'm here to listen - whether you need to vent, need help figuring something out, or just need someone to talk to.`,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, []);

  // Pulse animation for recording button
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const handleSend = async (text?: string) => {
    const messageText = (text || inputText).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      let responseText: string;
      let newItems: CapturedItem[] | undefined;

      if (USE_SIMULATED_RESPONSES) {
        const simResponse = getSimulatedResponse(messageText, userName);
        responseText = simResponse.message;
        newItems = simResponse.capturedItems?.map(item => ({
          ...item,
          resolved: false,
        })) as CapturedItem[] | undefined;
      } else {
        const conversationHistory = convertToAIMessages(messages);
        const aiResponse = await getAlphaMaResponse(
          messageText,
          conversationHistory,
          {
            name: userName,
            stage: userStage,
            concerns: user?.concerns,
          }
        );
        responseText = aiResponse.message;
        newItems = aiResponse.capturedItems?.map(item => ({
          ...item,
          resolved: false,
        })) as CapturedItem[] | undefined;
      }

      const alphaMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'alpha',
        content: responseText,
        timestamp: new Date(),
        capturedItems: newItems,
      };

      setMessages(prev => [...prev, alphaMessage]);

      if (newItems && newItems.length > 0) {
        setCapturedItems(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'alpha',
        content: "I'm having a moment - could you say that again? I want to make sure I hear you properly.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSuggestionPress = (text: string) => {
    handleSend(text);
  };

  const handleVoiceStart = () => {
    setIsRecording(true);
  };

  const handleVoiceEnd = () => {
    setIsRecording(false);
    const mockTranscription = "I'm feeling really overwhelmed today";
    setInputText(mockTranscription);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Beautiful Header */}
      <LinearGradient
        colors={[Colors.primary50, Colors.background]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              style={styles.alphaAvatar}
            >
              <Text style={styles.alphaAvatarText}>α</Text>
            </LinearGradient>
            <View>
              <Text style={styles.alphaName}>AlphaMa</Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.alphaStatus}>Here for you</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            {messages.map((message, index) => (
              <Animated.View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.role === 'user' ? styles.userWrapper : styles.alphaWrapper,
                ]}
              >
                {message.role === 'alpha' && (
                  <View style={styles.miniAvatar}>
                    <Text style={styles.miniAvatarText}>α</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.role === 'user' ? styles.userBubble : styles.alphaBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.role === 'user' ? styles.userText : styles.alphaText,
                    ]}
                  >
                    {message.content}
                  </Text>

                  {message.capturedItems && message.capturedItems.length > 0 && (
                    <View style={styles.capturedInMessage}>
                      <View style={styles.capturedLabelRow}>
                        <Text style={styles.capturedIcon}>📝</Text>
                        <Text style={styles.capturedLabel}>Captured for you:</Text>
                      </View>
                      {message.capturedItems.map(item => (
                        <View key={item.id} style={styles.capturedItemSmall}>
                          <Text style={styles.capturedItemIcon}>
                            {item.type === 'todo' ? '☐' : item.type === 'appointment' ? '📅' : '💭'}
                          </Text>
                          <Text style={styles.capturedItemText}>{item.content}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </Animated.View>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <View style={[styles.messageWrapper, styles.alphaWrapper]}>
                <View style={styles.miniAvatar}>
                  <Text style={styles.miniAvatarText}>α</Text>
                </View>
                <View style={[styles.messageBubble, styles.alphaBubble, styles.typingBubble]}>
                  <View style={styles.typingIndicator}>
                    <View style={styles.typingDots}>
                      <Animated.View style={[styles.typingDot, { opacity: 0.4 }]} />
                      <Animated.View style={[styles.typingDot, { opacity: 0.7 }]} />
                      <Animated.View style={[styles.typingDot, { opacity: 1 }]} />
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Suggestion Prompts */}
            {showSuggestions && !isLoading && (
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>I can help with...</Text>
                <View style={styles.suggestionsGrid}>
                  {suggestionPrompts.map((prompt) => (
                    <TouchableOpacity
                      key={prompt.id}
                      style={styles.suggestionChip}
                      onPress={() => handleSuggestionPress(prompt.text)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.suggestionIcon}>{prompt.icon}</Text>
                      <Text style={styles.suggestionText}>{prompt.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </Animated.View>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Captured Items Bar */}
        {capturedItems.length > 0 && (
          <View style={styles.capturedBar}>
            <View style={styles.capturedBarHeader}>
              <Text style={styles.capturedBarIcon}>🧠</Text>
              <Text style={styles.capturedBarTitle}>
                On your mind ({capturedItems.filter(i => !i.resolved).length})
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {capturedItems.filter(i => !i.resolved).slice(0, 5).map(item => (
                <View key={item.id} style={styles.capturedChip}>
                  <Text style={styles.capturedChipText}>{item.content}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.textInput, isLoading && styles.textInputDisabled]}
                placeholder={isLoading ? "Thinking..." : "What's on your mind?"}
                placeholderTextColor={Colors.muted}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                editable={!isLoading}
              />
            </View>

            {inputText.trim() ? (
              <TouchableOpacity
                style={[styles.sendButton, isLoading && styles.buttonDisabled]}
                onPress={() => handleSend()}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primaryDark]}
                  style={styles.sendButtonGradient}
                >
                  <Text style={styles.sendIcon}>↑</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.micButton, isLoading && styles.buttonDisabled]}
                onPressIn={handleVoiceStart}
                onPressOut={handleVoiceEnd}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <LinearGradient
                    colors={isRecording ? ['#E53935', '#C62828'] : [Colors.accent, Colors.accentDark]}
                    style={styles.micButtonGradient}
                  >
                    <Text style={styles.micIcon}>{isRecording ? '⏹' : '🎤'}</Text>
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            )}
          </View>

          {isRecording && (
            <View style={styles.recordingHintContainer}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingHint}>Listening... release to send</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  headerGradient: {
    paddingBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  alphaAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
  },
  alphaAvatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: FontWeights.bold,
    fontStyle: 'italic',
  },
  alphaName: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: Colors.foreground,
    letterSpacing: -0.5,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  alphaStatus: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  menuIcon: {
    fontSize: 20,
  },

  // Keyboard Avoid
  keyboardAvoid: {
    flex: 1,
  },

  // Messages
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  alphaWrapper: {
    justifyContent: 'flex-start',
  },
  miniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    marginBottom: 4,
  },
  miniAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: FontWeights.bold,
    fontStyle: 'italic',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: BorderRadius.xs,
    marginLeft: 'auto',
  },
  alphaBubble: {
    backgroundColor: Colors.card,
    borderBottomLeftRadius: BorderRadius.xs,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  messageText: {
    fontSize: FontSizes.md,
    lineHeight: 24,
  },
  userText: {
    color: 'white',
  },
  alphaText: {
    color: Colors.foreground,
  },

  // Typing indicator
  typingBubble: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },

  // Captured items in message
  capturedInMessage: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  capturedLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.xs,
  },
  capturedIcon: {
    fontSize: 14,
  },
  capturedLabel: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },
  capturedItemSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: 4,
  },
  capturedItemIcon: {
    fontSize: 14,
  },
  capturedItemText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },

  // Suggestions
  suggestionsContainer: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  suggestionsTitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
    ...Shadows.sm,
  },
  suggestionIcon: {
    fontSize: 16,
  },
  suggestionText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
    fontWeight: FontWeights.medium,
  },

  // Captured Bar
  capturedBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.cream,
  },
  capturedBarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.xs,
  },
  capturedBarIcon: {
    fontSize: 14,
  },
  capturedBarTitle: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
  },
  capturedChip: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary50,
  },
  capturedChipText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },

  // Input
  inputContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  textInput: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.foreground,
    maxHeight: 100,
  },
  textInputDisabled: {
    opacity: 0.6,
  },
  sendButton: {
    width: 48,
    height: 48,
  },
  sendButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    color: 'white',
    fontSize: 22,
    fontWeight: FontWeights.bold,
  },
  micButton: {
    width: 48,
    height: 48,
  },
  micButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    fontSize: 22,
  },
  recordingHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.sm,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E53935',
  },
  recordingHint: {
    fontSize: FontSizes.xs,
    color: '#E53935',
    fontWeight: FontWeights.medium,
  },
});
