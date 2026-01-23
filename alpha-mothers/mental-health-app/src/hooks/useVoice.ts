// useVoice Hook - React hook for voice input/output in AlphaMa
// Phase 2A: Voice Integration

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  initializeVoiceService,
  speak,
  stopSpeaking,
  isSpeaking,
  startListening,
  stopListening,
  isVoiceInputAvailable,
  getVoiceCapabilities,
  cleanupVoiceService,
  VoiceState,
  TranscriptionResult,
  VoiceCapabilities,
} from '../services/voice';

export interface UseVoiceOptions {
  autoSpeak?: boolean; // Automatically speak AI responses
  onTranscriptionComplete?: (text: string) => void;
  onSpeakingStart?: () => void;
  onSpeakingEnd?: () => void;
  onError?: (error: Error) => void;
}

export interface UseVoiceReturn {
  // State
  voiceState: VoiceState;
  isListening: boolean;
  isSpeakingNow: boolean;
  transcription: string;
  interimTranscription: string;
  isInitialized: boolean;
  capabilities: VoiceCapabilities | null;
  error: Error | null;

  // Actions
  startVoiceInput: () => Promise<void>;
  stopVoiceInput: () => Promise<string | null>;
  speakText: (text: string) => Promise<void>;
  stopSpeech: () => void;
  toggleVoiceMode: () => void;

  // Voice mode
  voiceModeEnabled: boolean;
  setVoiceModeEnabled: (enabled: boolean) => void;
}

export function useVoice(options: UseVoiceOptions = {}): UseVoiceReturn {
  const {
    autoSpeak = false,
    onTranscriptionComplete,
    onSpeakingStart,
    onSpeakingEnd,
    onError,
  } = options;

  // State
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcription, setTranscription] = useState('');
  const [interimTranscription, setInterimTranscription] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [capabilities, setCapabilities] = useState<VoiceCapabilities | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [voiceModeEnabled, setVoiceModeEnabled] = useState(false);

  // Refs to track current state in callbacks
  const voiceStateRef = useRef(voiceState);
  voiceStateRef.current = voiceState;

  // Initialize voice service
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        await initializeVoiceService();
        const caps = await getVoiceCapabilities();

        if (mounted) {
          setCapabilities(caps);
          setIsInitialized(true);
          console.log('Voice hook initialized:', caps);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
          onError?.(err as Error);
        }
      }
    }

    init();

    return () => {
      mounted = false;
      cleanupVoiceService();
    };
  }, []);

  // Handle transcription updates
  const handleTranscription = useCallback((result: TranscriptionResult) => {
    if (result.isFinal) {
      setTranscription(result.text);
      setInterimTranscription('');
      onTranscriptionComplete?.(result.text);
    } else {
      setInterimTranscription(result.text);
    }
  }, [onTranscriptionComplete]);

  // Handle transcription errors
  const handleTranscriptionError = useCallback((err: Error) => {
    setError(err);
    setVoiceState('idle');
    onError?.(err);
  }, [onError]);

  // Start voice input
  const startVoiceInput = useCallback(async () => {
    if (!isInitialized || !capabilities?.sttAvailable) {
      const err = new Error('Voice input not available');
      setError(err);
      onError?.(err);
      return;
    }

    try {
      setError(null);
      setTranscription('');
      setInterimTranscription('');
      setVoiceState('listening');

      await startListening(handleTranscription, handleTranscriptionError);
    } catch (err) {
      setVoiceState('idle');
      setError(err as Error);
      onError?.(err as Error);
    }
  }, [isInitialized, capabilities, handleTranscription, handleTranscriptionError, onError]);

  // Stop voice input
  const stopVoiceInput = useCallback(async (): Promise<string | null> => {
    if (voiceStateRef.current !== 'listening') {
      return null;
    }

    setVoiceState('processing');

    try {
      const finalText = await stopListening();
      setVoiceState('idle');

      // If we got a final transcription from native recording
      if (finalText) {
        setTranscription(finalText);
        onTranscriptionComplete?.(finalText);
        return finalText;
      }

      // Otherwise return whatever we have from web speech
      const result = transcription || interimTranscription;
      if (result) {
        setTranscription(result);
        onTranscriptionComplete?.(result);
      }
      return result || null;
    } catch (err) {
      setVoiceState('idle');
      setError(err as Error);
      onError?.(err as Error);
      return null;
    }
  }, [transcription, interimTranscription, onTranscriptionComplete, onError]);

  // Speak text
  const speakText = useCallback(async (text: string) => {
    if (!isInitialized || !capabilities?.ttsAvailable) {
      console.warn('TTS not available');
      return;
    }

    // Stop any current speech
    stopSpeaking();

    try {
      setError(null);
      setVoiceState('speaking');

      await speak(
        text,
        undefined,
        () => {
          onSpeakingStart?.();
        },
        () => {
          setVoiceState('idle');
          onSpeakingEnd?.();
        },
        (err) => {
          setVoiceState('idle');
          setError(err);
          onError?.(err);
        }
      );
    } catch (err) {
      setVoiceState('idle');
      setError(err as Error);
      onError?.(err as Error);
    }
  }, [isInitialized, capabilities, onSpeakingStart, onSpeakingEnd, onError]);

  // Stop speech
  const stopSpeech = useCallback(() => {
    stopSpeaking();
    if (voiceStateRef.current === 'speaking') {
      setVoiceState('idle');
      onSpeakingEnd?.();
    }
  }, [onSpeakingEnd]);

  // Toggle voice mode
  const toggleVoiceMode = useCallback(() => {
    setVoiceModeEnabled(prev => !prev);
  }, []);

  // Derived states
  const isListening = voiceState === 'listening';
  const isSpeakingNow = voiceState === 'speaking';

  return {
    // State
    voiceState,
    isListening,
    isSpeakingNow,
    transcription,
    interimTranscription,
    isInitialized,
    capabilities,
    error,

    // Actions
    startVoiceInput,
    stopVoiceInput,
    speakText,
    stopSpeech,
    toggleVoiceMode,

    // Voice mode
    voiceModeEnabled,
    setVoiceModeEnabled,
  };
}

export default useVoice;
