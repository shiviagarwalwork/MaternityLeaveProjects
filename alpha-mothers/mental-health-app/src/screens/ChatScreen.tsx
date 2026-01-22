import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../constants/theme';
import { Message } from '../types';

// Sample conversation for demo
const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi Sarah! I noticed you haven't checked in for a few days. How are you doing? No pressure—just here if you want to talk. 💙",
    timestamp: new Date().toISOString(),
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response (in production, this would call your AI backend)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputText.trim()),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  // Simple response logic for demo (replace with actual AI in production)
  const getAIResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();

    if (lowercaseInput.includes('anxious') || lowercaseInput.includes('anxiety') || lowercaseInput.includes('worried')) {
      return "I hear you. Anxiety is incredibly common, especially for mothers navigating so many responsibilities. It makes sense that you're feeling this way. Would you like to try a quick grounding exercise, or would you prefer to talk through what's on your mind?";
    }

    if (lowercaseInput.includes('tired') || lowercaseInput.includes('exhausted') || lowercaseInput.includes('sleep')) {
      return "Sleep deprivation is so hard, and it affects everything. You're doing an incredible job even when running on empty. Have you been able to get any rest during the day? Sometimes even 10 minutes can help. I have a short guided rest session if you'd like to try it.";
    }

    if (lowercaseInput.includes('work') || lowercaseInput.includes('job') || lowercaseInput.includes('career')) {
      return "The intersection of work and motherhood is so complex. Whatever you're feeling about it is valid. Are you preparing to go back, already there and adjusting, or thinking about your career path? I have resources tailored to wherever you are.";
    }

    if (lowercaseInput.includes('guilt') || lowercaseInput.includes('bad mom') || lowercaseInput.includes('not enough')) {
      return "I want you to know something: the fact that you care so much shows what a wonderful mother you are. Mom guilt is almost universal, but it doesn't mean you're doing anything wrong. You're enough, exactly as you are. What's triggering these feelings right now?";
    }

    return "Thank you for sharing that with me. I'm here to listen and support you however I can. Would you like to explore this more, or is there something specific I can help you with today?";
  };

  const quickResponses = [
    "I'm feeling anxious",
    "I need help with sleep",
    "Work is overwhelming",
    "I'm struggling with guilt",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>Alpha</Text>
              <Text style={styles.headerSubtitle}>Your companion • Always here</Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.role === 'user' && styles.userMessageWrapper,
              ]}
            >
              {message.role === 'assistant' && (
                <View style={styles.assistantAvatar}>
                  <Text style={styles.assistantAvatarText}>A</Text>
                </View>
              )}
              <View
                style={[
                  styles.messageBubble,
                  message.role === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.role === 'user' && styles.userMessageText,
                  ]}
                >
                  {message.content}
                </Text>
              </View>
            </View>
          ))}

          {/* Quick Responses */}
          {messages.length === 1 && (
            <View style={styles.quickResponses}>
              <Text style={styles.quickResponsesLabel}>Quick responses:</Text>
              <View style={styles.quickResponsesGrid}>
                {quickResponses.map((response, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickResponseButton}
                    onPress={() => {
                      setInputText(response);
                    }}
                  >
                    <Text style={styles.quickResponseText}>{response}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.voiceButton}>
            <Text style={styles.voiceIcon}>🎤</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.muted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              inputText.trim() && styles.sendButtonActive,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendIcon}>↑</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Alpha provides support but is not a replacement for professional mental health care.
          If you're in crisis, please contact a healthcare provider.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },

  // Header
  header: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    color: Colors.foreground,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
  },

  // Messages
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  assistantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  assistantAvatarText: {
    color: 'white',
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  assistantMessage: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: BorderRadius.xs,
    ...Shadows.sm,
  },
  userMessage: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: BorderRadius.xs,
  },
  messageText: {
    fontSize: FontSizes.md,
    color: Colors.foreground,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },

  // Quick Responses
  quickResponses: {
    marginTop: Spacing.lg,
  },
  quickResponsesLabel: {
    fontSize: FontSizes.sm,
    color: Colors.muted,
    marginBottom: Spacing.sm,
  },
  quickResponsesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickResponseButton: {
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickResponseText: {
    fontSize: FontSizes.sm,
    color: Colors.foreground,
  },

  // Input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.md,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.md,
    color: Colors.foreground,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
  sendIcon: {
    fontSize: 20,
    color: 'white',
    fontWeight: FontWeights.bold,
  },

  // Disclaimer
  disclaimer: {
    fontSize: FontSizes.xs,
    color: Colors.subtle,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
});
