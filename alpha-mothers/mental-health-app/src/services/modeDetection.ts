// Mode Detection Service - Routes conversations to the appropriate "brain"

export type BrainMode = 'emotional' | 'logistic' | 'growth';

export interface ModeScore {
  emotional: number;
  logistic: number;
  growth: number;
}

export interface ModeDetectionResult {
  primaryMode: BrainMode;
  secondaryMode: BrainMode | null;
  scores: ModeScore;
  isCrisis: boolean;
  blendModes: boolean;
}

// Crisis indicators that should override normal mode detection
const CRISIS_INDICATORS = [
  'suicide', 'kill myself', 'end it all', 'want to die',
  'self harm', 'hurt myself', 'cutting',
  'can\'t go on', 'no point', 'give up',
  'panic attack', 'can\'t breathe', 'heart racing',
  'emergency', 'crisis', 'breaking down'
];

// Emotional mode keywords and patterns
const EMOTIONAL_INDICATORS = {
  high: [
    'overwhelmed', 'exhausted', 'burned out', 'burnout',
    'anxious', 'anxiety', 'panic', 'scared', 'terrified',
    'depressed', 'hopeless', 'worthless', 'failure',
    'guilty', 'guilt', 'bad mom', 'terrible mother',
    'crying', 'can\'t stop crying', 'breakdown',
    'can\'t cope', 'falling apart', 'losing it',
    'hate myself', 'so tired', 'drained'
  ],
  medium: [
    'stressed', 'worried', 'frustrated', 'angry', 'upset',
    'sad', 'lonely', 'isolated', 'disconnected',
    'resentful', 'bitter', 'hurt', 'disappointed',
    'insecure', 'doubt', 'uncertain', 'lost',
    'struggling', 'hard time', 'difficult'
  ],
  low: [
    'feeling', 'feel like', 'emotions', 'mood',
    'tired', 'sleepy', 'restless', 'uneasy',
    'off', 'not myself', 'weird day'
  ]
};

// Logistic mode keywords and patterns
const LOGISTIC_INDICATORS = {
  high: [
    'need to', 'have to', 'must', 'deadline',
    'schedule', 'appointment', 'meeting', 'call',
    'organize', 'plan', 'prepare', 'arrange',
    'forgot', 'remember', 'don\'t forget',
    'list', 'tasks', 'to-do', 'todo',
    'birthday party', 'school event', 'pick up',
    'grocery', 'shopping', 'buy', 'order'
  ],
  medium: [
    'when', 'what time', 'where', 'how do i',
    'help me with', 'can you', 'draft', 'write',
    'email', 'text', 'message', 'reply',
    'coordinate', 'figure out', 'sort out'
  ],
  low: [
    'thing', 'stuff', 'something', 'tomorrow',
    'next week', 'later', 'soon', 'eventually'
  ]
};

// Growth mode keywords and patterns
const GROWTH_INDICATORS = {
  high: [
    'career', 'promotion', 'job', 'work opportunity',
    'boss', 'manager', 'leadership', 'team',
    'presentation', 'meeting', 'negotiation',
    'raise', 'salary', 'title',
    'parenting', 'raising', 'teach my kid',
    'screen time', 'technology', 'ai', 'future',
    'gen alpha', 'generation alpha', '2035',
    'who am i', 'identity', 'lost myself',
    'used to be', 'before kids', 'my dreams'
  ],
  medium: [
    'how should i', 'what\'s the best way',
    'advice', 'guidance', 'perspective',
    'balance', 'boundaries', 'priorities',
    'confidence', 'imposter', 'capable',
    'growth', 'develop', 'improve', 'learn'
  ],
  low: [
    'think about', 'wondering', 'curious',
    'maybe', 'should i', 'considering'
  ]
};

// Calculate score for a category
function calculateCategoryScore(
  message: string,
  indicators: { high: string[]; medium: string[]; low: string[] }
): number {
  const lowerMessage = message.toLowerCase();
  let score = 0;

  // High weight indicators (3 points each)
  indicators.high.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 3;
  });

  // Medium weight indicators (2 points each)
  indicators.medium.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 2;
  });

  // Low weight indicators (1 point each)
  indicators.low.forEach(keyword => {
    if (lowerMessage.includes(keyword)) score += 1;
  });

  return score;
}

// Check for crisis indicators
function detectCrisis(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return CRISIS_INDICATORS.some(indicator => lowerMessage.includes(indicator));
}

// Main mode detection function
export function detectMode(message: string): ModeDetectionResult {
  const lowerMessage = message.toLowerCase();

  // Check for crisis first - always prioritizes emotional support
  const isCrisis = detectCrisis(message);

  // Calculate scores for each mode
  const scores: ModeScore = {
    emotional: calculateCategoryScore(message, EMOTIONAL_INDICATORS),
    logistic: calculateCategoryScore(message, LOGISTIC_INDICATORS),
    growth: calculateCategoryScore(message, GROWTH_INDICATORS),
  };

  // If crisis detected, heavily weight emotional
  if (isCrisis) {
    scores.emotional += 100;
  }

  // Determine primary mode
  const sortedModes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a) as [BrainMode, number][];

  const primaryMode = sortedModes[0][0];
  const primaryScore = sortedModes[0][1];
  const secondaryScore = sortedModes[1][1];

  // Determine if we should blend modes (secondary is at least 50% of primary)
  const blendModes = secondaryScore >= primaryScore * 0.5 && secondaryScore > 2;
  const secondaryMode = blendModes ? sortedModes[1][0] : null;

  return {
    primaryMode,
    secondaryMode,
    scores,
    isCrisis,
    blendModes,
  };
}

// Get mode-specific context for the AI prompt
export function getModeContext(result: ModeDetectionResult): string {
  let context = '';

  if (result.isCrisis) {
    context = `
PRIORITY: CRISIS SUPPORT MODE
The user may be in distress. Prioritize:
1. Safety and stabilization
2. Validation of their experience
3. Grounding techniques if needed
4. Gentle suggestion of professional resources if appropriate
Do NOT pivot to tasks or productivity until they feel stable.
`;
    return context;
  }

  switch (result.primaryMode) {
    case 'emotional':
      context = `
MODE: EMOTIONAL SUPPORT (Therapy Companion)
The user needs emotional support. Focus on:
1. Validate their feelings first (1 sentence)
2. Normalize with neurobiology when helpful
3. Use CBT techniques: reframing, thought challenging, catastrophe scale
4. Offer grounding if they seem activated
5. Hold space - don't rush to fix unless they ask
`;
      break;

    case 'logistic':
      context = `
MODE: LOGISTIC SUPPORT (Executive Assistant)
The user needs help with tasks/planning. Focus on:
1. Brief acknowledgment of any emotional undertone
2. Extract and capture tasks, dates, people involved
3. Identify "invisible labor" - the tasks under the task
4. Proactively offer to draft messages, emails, or plans
5. Suggest delegation opportunities when appropriate
`;
      break;

    case 'growth':
      context = `
MODE: GROWTH SUPPORT (Career & Parenting Coach)
The user needs coaching/perspective. Focus on:
1. Identify the real question underneath
2. Provide frameworks, not just answers
3. For parenting: use the 2035 lens (what skills will matter?)
4. For career: treat her as the capable leader she is
5. Empower, don't create dependency
`;
      break;
  }

  // Add secondary mode context if blending
  if (result.blendModes && result.secondaryMode) {
    context += `
SECONDARY MODE: ${result.secondaryMode.toUpperCase()}
Blend both approaches - lead with ${result.primaryMode}, weave in ${result.secondaryMode} support.
`;
  }

  return context;
}

// Export for testing
export const _testing = {
  calculateCategoryScore,
  detectCrisis,
  EMOTIONAL_INDICATORS,
  LOGISTIC_INDICATORS,
  GROWTH_INDICATORS,
};
