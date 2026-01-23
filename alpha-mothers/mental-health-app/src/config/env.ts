// Environment configuration
// API keys and feature flags are loaded from environment variables
// See .env.example for setup instructions

export const ANTHROPIC_API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '';

// Use simulated responses when:
// 1. EXPO_PUBLIC_USE_SIMULATED is explicitly set to 'true'
// 2. OR no API key is provided
export const USE_SIMULATED_RESPONSES =
  process.env.EXPO_PUBLIC_USE_SIMULATED === 'true' ||
  !ANTHROPIC_API_KEY;

// Check if we're in a valid API mode
export const isAPIConfigured = (): boolean => {
  return !!ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.startsWith('sk-');
};
