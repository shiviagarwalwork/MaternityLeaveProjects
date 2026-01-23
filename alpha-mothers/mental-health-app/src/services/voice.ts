// Voice Service - Speech-to-Text and Text-to-Speech for AlphaMa
// Phase 2A: Voice Integration

import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { ANTHROPIC_API_KEY } from '../config/env';

// Web Speech API type declarations
interface WebSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: WebSpeechRecognitionEvent) => void) | null;
  onerror: ((event: WebSpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface WebSpeechRecognitionEvent {
  results: WebSpeechRecognitionResultList;
}

interface WebSpeechRecognitionResultList {
  length: number;
  [index: number]: WebSpeechRecognitionResult;
}

interface WebSpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: WebSpeechRecognitionAlternative;
}

interface WebSpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface WebSpeechRecognitionErrorEvent {
  error: string;
}

// Types
export interface VoiceSettings {
  language: string;
  pitch: number;
  rate: number;
  voice?: string;
}

export interface TranscriptionResult {
  text: string;
  confidence?: number;
  isFinal: boolean;
}

export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

// Default voice settings for AlphaMa - warm, natural voice
const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  language: 'en-US',
  pitch: 1.0,
  rate: 0.9, // Slightly slower for warmth
};

// Available voices cache
let availableVoices: Speech.Voice[] = [];

// Audio recording instance
let recording: Audio.Recording | null = null;

// Web Speech Recognition (for web platform)
let webSpeechRecognition: WebSpeechRecognition | null = null;

// Initialize voice service
export async function initializeVoiceService(): Promise<void> {
  try {
    // Get available voices
    availableVoices = await Speech.getAvailableVoicesAsync();
    console.log(`Voice service initialized. ${availableVoices.length} voices available.`);

    // Request audio permissions
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Audio recording permission not granted');
    }

    // Configure audio mode for recording
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    // Initialize Web Speech API if available (for web platform)
    if (Platform.OS === 'web' && 'webkitSpeechRecognition' in window) {
      initializeWebSpeechRecognition();
    }
  } catch (error) {
    console.error('Failed to initialize voice service:', error);
  }
}

// Initialize Web Speech Recognition API
function initializeWebSpeechRecognition(): void {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition() as WebSpeechRecognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    webSpeechRecognition = recognition;
    console.log('Web Speech Recognition initialized');
  }
}

// ==================== TEXT-TO-SPEECH ====================

// Speak text aloud
export async function speak(
  text: string,
  settings?: Partial<VoiceSettings>,
  onStart?: () => void,
  onDone?: () => void,
  onError?: (error: Error) => void
): Promise<void> {
  const mergedSettings = { ...DEFAULT_VOICE_SETTINGS, ...settings };

  // Find a good female voice for AlphaMa personality
  const preferredVoice = findPreferredVoice();

  return new Promise((resolve, reject) => {
    Speech.speak(text, {
      language: mergedSettings.language,
      pitch: mergedSettings.pitch,
      rate: mergedSettings.rate,
      voice: preferredVoice?.identifier,
      onStart: () => {
        onStart?.();
      },
      onDone: () => {
        onDone?.();
        resolve();
      },
      onError: (error) => {
        onError?.(error as Error);
        reject(error);
      },
      onStopped: () => {
        onDone?.();
        resolve();
      },
    });
  });
}

// Stop speaking
export function stopSpeaking(): void {
  Speech.stop();
}

// Check if currently speaking
export async function isSpeaking(): Promise<boolean> {
  return Speech.isSpeakingAsync();
}

// Find a natural-sounding female voice for AlphaMa
function findPreferredVoice(): Speech.Voice | undefined {
  // Preference order for warm, natural female voices
  const preferredIdentifiers = [
    // iOS/macOS voices
    'com.apple.ttsbundle.Samantha-compact',
    'com.apple.ttsbundle.Samantha-premium',
    'com.apple.voice.compact.en-US.Samantha',
    'com.apple.voice.enhanced.en-US.Samantha',
    // Android voices
    'en-us-x-sfg-local',
    'en-us-x-tpc-local',
    // Google voices
    'Google US English',
  ];

  // Try to find a preferred voice
  for (const identifier of preferredIdentifiers) {
    const voice = availableVoices.find(v =>
      v.identifier?.includes(identifier) || v.name?.includes(identifier)
    );
    if (voice) return voice;
  }

  // Fallback to any female-sounding English voice
  const femaleVoice = availableVoices.find(v =>
    v.language?.startsWith('en') &&
    (v.name?.toLowerCase().includes('female') ||
     v.name?.toLowerCase().includes('samantha') ||
     v.name?.toLowerCase().includes('karen') ||
     v.name?.toLowerCase().includes('allison'))
  );
  if (femaleVoice) return femaleVoice;

  // Final fallback to any English voice
  return availableVoices.find(v => v.language?.startsWith('en'));
}

// Get all available voices
export function getAvailableVoices(): Speech.Voice[] {
  return availableVoices;
}

// ==================== SPEECH-TO-TEXT ====================

// Start listening for speech input (returns real-time transcription via callback)
export async function startListening(
  onTranscription: (result: TranscriptionResult) => void,
  onError?: (error: Error) => void
): Promise<void> {
  // Web platform - use Web Speech API
  if (Platform.OS === 'web' && webSpeechRecognition) {
    return startWebSpeechRecognition(onTranscription, onError);
  }

  // Native platforms - use audio recording + transcription API
  return startNativeRecording(onTranscription, onError);
}

// Stop listening
export async function stopListening(): Promise<string | null> {
  // Web platform
  if (Platform.OS === 'web' && webSpeechRecognition) {
    webSpeechRecognition.stop();
    return null; // Result comes through callback
  }

  // Native platforms - stop recording and transcribe
  return stopNativeRecording();
}

// Web Speech Recognition implementation
function startWebSpeechRecognition(
  onTranscription: (result: TranscriptionResult) => void,
  onError?: (error: Error) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!webSpeechRecognition) {
      const error = new Error('Web Speech Recognition not available');
      onError?.(error);
      reject(error);
      return;
    }

    webSpeechRecognition.onresult = (event: WebSpeechRecognitionEvent) => {
      const results = event.results;
      const lastResult = results[results.length - 1];

      onTranscription({
        text: lastResult[0].transcript,
        confidence: lastResult[0].confidence,
        isFinal: lastResult.isFinal,
      });
    };

    webSpeechRecognition.onerror = (event: WebSpeechRecognitionErrorEvent) => {
      const error = new Error(`Speech recognition error: ${event.error}`);
      onError?.(error);
    };

    webSpeechRecognition.onend = () => {
      resolve();
    };

    webSpeechRecognition.start();
  });
}

// Native audio recording implementation
async function startNativeRecording(
  onTranscription: (result: TranscriptionResult) => void,
  onError?: (error: Error) => void
): Promise<void> {
  try {
    // Check permissions
    const { status } = await Audio.requestPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Audio recording permission not granted');
    }

    // Create and start recording
    recording = new Audio.Recording();
    await recording.prepareToRecordAsync({
      android: {
        extension: '.m4a',
        outputFormat: Audio.AndroidOutputFormat.MPEG_4,
        audioEncoder: Audio.AndroidAudioEncoder.AAC,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
      },
      ios: {
        extension: '.m4a',
        audioQuality: Audio.IOSAudioQuality.HIGH,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      web: {
        mimeType: 'audio/webm',
        bitsPerSecond: 128000,
      },
    });

    await recording.startAsync();
    console.log('Native recording started');

    // Send initial feedback
    onTranscription({
      text: '',
      isFinal: false,
    });
  } catch (error) {
    console.error('Failed to start recording:', error);
    onError?.(error as Error);
    throw error;
  }
}

// Stop native recording and transcribe
async function stopNativeRecording(): Promise<string | null> {
  if (!recording) return null;

  try {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    recording = null;

    if (!uri) return null;

    // Transcribe the audio
    const transcription = await transcribeAudio(uri);
    return transcription;
  } catch (error) {
    console.error('Failed to stop recording:', error);
    recording = null;
    return null;
  }
}

// Transcribe audio file using Anthropic's Claude (or fallback to OpenAI Whisper API)
// For now, we'll use a simulated transcription for testing
async function transcribeAudio(audioUri: string): Promise<string> {
  // In production, you would send the audio to a transcription service
  // Options:
  // 1. OpenAI Whisper API
  // 2. Deepgram
  // 3. AssemblyAI
  // 4. Google Cloud Speech-to-Text

  console.log('Transcribing audio from:', audioUri);

  // For now, return a placeholder - this should be replaced with actual API call
  // The actual implementation would fetch the audio file and send to a transcription API

  try {
    // Simulated delay for processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual transcription API call
    // Example with OpenAI Whisper:
    // const formData = new FormData();
    // formData.append('file', { uri: audioUri, type: 'audio/m4a', name: 'audio.m4a' });
    // formData.append('model', 'whisper-1');
    // const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` },
    //   body: formData,
    // });

    return 'Voice transcription will be processed here';
  } catch (error) {
    console.error('Transcription failed:', error);
    throw error;
  }
}

// ==================== VOICE MODE HELPERS ====================

// Check if voice input is available
export function isVoiceInputAvailable(): boolean {
  if (Platform.OS === 'web') {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }
  // Native platforms - audio recording is available if permissions granted
  return true;
}

// Check if voice output is available
export async function isVoiceOutputAvailable(): Promise<boolean> {
  return availableVoices.length > 0;
}

// Get voice capabilities info
export interface VoiceCapabilities {
  ttsAvailable: boolean;
  sttAvailable: boolean;
  platform: string;
  voiceCount: number;
}

export async function getVoiceCapabilities(): Promise<VoiceCapabilities> {
  return {
    ttsAvailable: availableVoices.length > 0,
    sttAvailable: isVoiceInputAvailable(),
    platform: Platform.OS,
    voiceCount: availableVoices.length,
  };
}

// ==================== AUDIO FEEDBACK ====================

// Play a subtle sound for UI feedback
let feedbackSound: Audio.Sound | null = null;

export async function playFeedbackSound(type: 'start' | 'stop' | 'error'): Promise<void> {
  // Sound feedback could be implemented here
  // For now, we'll use haptic feedback on supported devices
  console.log(`Feedback sound: ${type}`);
}

// Clean up resources
export async function cleanupVoiceService(): Promise<void> {
  stopSpeaking();
  if (recording) {
    try {
      await recording.stopAndUnloadAsync();
    } catch (e) {
      // Ignore errors during cleanup
    }
    recording = null;
  }
  if (feedbackSound) {
    await feedbackSound.unloadAsync();
    feedbackSound = null;
  }
}
