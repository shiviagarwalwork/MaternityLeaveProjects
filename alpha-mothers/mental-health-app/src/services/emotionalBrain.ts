// Emotional Brain Module - CBT techniques and crisis support

export interface CBTTechnique {
  name: string;
  description: string;
  prompt: string;
  whenToUse: string[];
}

export interface GroundingExercise {
  name: string;
  duration: string;
  instructions: string;
  forSymptoms: string[];
}

// CBT Technique Library
export const CBT_TECHNIQUES: CBTTechnique[] = [
  {
    name: 'Cognitive Reframing',
    description: 'Help identify and challenge negative thought patterns',
    prompt: `When the user expresses a negative belief about themselves or their situation:
1. Acknowledge the thought without dismissing it
2. Ask: "What evidence supports this? What evidence contradicts it?"
3. Offer an alternative perspective: "Another way to see this might be..."
4. Don't force positivity - aim for balanced, realistic thinking`,
    whenToUse: ['bad mom', 'failure', 'can\'t do anything right', 'always', 'never', 'worthless'],
  },
  {
    name: 'Catastrophe Scale',
    description: 'Put problems in perspective using time-based scaling',
    prompt: `When the user is catastrophizing or over-magnifying a situation:
1. Validate that it feels big right now
2. Ask: "On a scale of 1-10, how much will this matter in a week? A month? A year?"
3. Help them see the actual scope: "Most of what we worry about doesn't happen, and what does happen is usually manageable"
4. Don't minimize - help calibrate`,
    whenToUse: ['disaster', 'ruined', 'everything is', 'worst', 'catastrophe', 'end of the world'],
  },
  {
    name: 'Thought Challenging',
    description: 'Question "should" statements and perfectionism',
    prompt: `When the user uses "should" language or shows perfectionist thinking:
1. Gently notice the "should": "I'm hearing a lot of 'shoulds' there..."
2. Ask: "Who says you should? Where did that rule come from?"
3. Explore: "What would you say to a friend in this situation?"
4. Offer permission to let go of impossible standards`,
    whenToUse: ['should', 'supposed to', 'have to be', 'must be', 'perfect', 'everyone else'],
  },
  {
    name: 'Brain Dump Facilitation',
    description: 'Externalize the mental load to reduce overwhelm',
    prompt: `When the user is overwhelmed with too many thoughts:
1. Invite the dump: "Let's get everything out of your head. Just stream of consciousness - I'll organize it."
2. Capture without judgment
3. After: "Okay, I've got all that. Now let's sort: What's urgent? What can wait? What's actually someone else's problem?"
4. Help them see the pile is finite and manageable`,
    whenToUse: ['overwhelmed', 'too much', 'can\'t think', 'spinning', 'racing thoughts', 'million things'],
  },
  {
    name: 'Neurobiological Validation',
    description: 'Normalize experiences using brain science',
    prompt: `When the user feels broken or weak for their reactions:
1. Explain the biology: "Your amygdala is doing its job - it's trying to protect you"
2. Normalize: "This is how human brains respond to [sleep deprivation/stress/uncertainty]"
3. Separate identity from state: "You're not broken, your nervous system is activated"
4. Offer regulation strategy`,
    whenToUse: ['what\'s wrong with me', 'why can\'t i', 'crazy', 'losing my mind', 'broken'],
  },
  {
    name: 'Values Clarification',
    description: 'Connect current struggles to deeper values',
    prompt: `When the user is questioning their choices or feeling lost:
1. Ask: "What matters most to you in this situation?"
2. Reflect: "It sounds like [value] is really important to you"
3. Explore the conflict: "Sometimes our values pull in different directions - that's hard"
4. Help align actions with values, not guilt`,
    whenToUse: ['don\'t know what to do', 'torn', 'conflict', 'what\'s the point', 'lost'],
  },
];

// Grounding Exercises for acute distress
export const GROUNDING_EXERCISES: GroundingExercise[] = [
  {
    name: '5-4-3-2-1 Sensory Grounding',
    duration: '2-3 minutes',
    instructions: `Let's ground you in the present moment:
- Name 5 things you can SEE right now
- Name 4 things you can TOUCH/FEEL
- Name 3 things you can HEAR
- Name 2 things you can SMELL
- Name 1 thing you can TASTE

Take your time. This activates your sensory cortex and calms the fear center.`,
    forSymptoms: ['panic', 'dissociation', 'spiraling', 'can\'t focus', 'racing'],
  },
  {
    name: 'Box Breathing',
    duration: '1-2 minutes',
    instructions: `Let's slow down your nervous system:
- Breathe IN for 4 counts
- HOLD for 4 counts
- Breathe OUT for 4 counts
- HOLD for 4 counts

Repeat 4 times. This activates your parasympathetic nervous system.`,
    forSymptoms: ['anxious', 'heart racing', 'can\'t calm down', 'tense', 'activated'],
  },
  {
    name: 'STOP Technique',
    duration: '30 seconds',
    instructions: `When you notice yourself spiraling:
- S: STOP what you're doing
- T: TAKE a breath
- O: OBSERVE what's happening (thoughts, feelings, body)
- P: PROCEED with awareness

This creates a pause between stimulus and response.`,
    forSymptoms: ['reactive', 'about to lose it', 'snapping', 'trigger'],
  },
  {
    name: 'Self-Compassion Break',
    duration: '1 minute',
    instructions: `Put your hand on your heart if it feels okay, and say:
1. "This is hard" (acknowledging the difficulty)
2. "I'm not alone in this" (common humanity)
3. "May I be kind to myself" (self-compassion)

You would offer this kindness to a friend. You deserve it too.`,
    forSymptoms: ['harsh on myself', 'self-critical', 'hate myself', 'guilt'],
  },
];

// Crisis Response Guidelines
export const CRISIS_RESPONSE = {
  prompt: `CRISIS PROTOCOL ACTIVATED

The user may be in severe distress. Your response should:

1. FIRST: Express care and presence
   - "I'm here with you right now"
   - "Thank you for telling me this"
   - "You don't have to go through this alone"

2. ASSESS without interrogating
   - "Are you safe right now?"
   - "Is there someone with you?"

3. VALIDATE without minimizing
   - "What you're feeling is real and it's hard"
   - "It makes sense that you feel this way given what you're going through"

4. GROUND if they're activated
   - Offer a simple breathing exercise
   - "Can we take one breath together?"

5. GENTLY suggest support
   - "Have you been able to talk to anyone about this?"
   - If appropriate: "Would it help to talk to a professional? I can help you find resources."

6. STAY with them
   - Don't rush to solutions
   - "I'm not going anywhere"
   - "What do you need right now?"

NEVER:
- Tell them to "just" do anything
- Minimize with "at least..."
- Rush them to feel better
- Leave them hanging with just a hotline number

If they mention active self-harm or suicide:
- Take it seriously
- Express care
- Encourage contacting: 988 Suicide & Crisis Lifeline (call or text 988)
- If immediate danger: Encourage calling 911 or going to nearest ER`,
};

// Get appropriate CBT technique for a message
export function suggestCBTTechnique(message: string): CBTTechnique | null {
  const lowerMessage = message.toLowerCase();

  for (const technique of CBT_TECHNIQUES) {
    const matches = technique.whenToUse.some(trigger =>
      lowerMessage.includes(trigger)
    );
    if (matches) {
      return technique;
    }
  }

  return null;
}

// Get appropriate grounding exercise
export function suggestGroundingExercise(message: string): GroundingExercise | null {
  const lowerMessage = message.toLowerCase();

  for (const exercise of GROUNDING_EXERCISES) {
    const matches = exercise.forSymptoms.some(symptom =>
      lowerMessage.includes(symptom)
    );
    if (matches) {
      return exercise;
    }
  }

  return null;
}

// Build emotional support prompt enhancement
export function getEmotionalPromptEnhancement(message: string, isCrisis: boolean): string {
  if (isCrisis) {
    return CRISIS_RESPONSE.prompt;
  }

  let enhancement = '';

  const technique = suggestCBTTechnique(message);
  if (technique) {
    enhancement += `\n\nSUGGESTED CBT TECHNIQUE: ${technique.name}\n${technique.prompt}`;
  }

  const exercise = suggestGroundingExercise(message);
  if (exercise) {
    enhancement += `\n\nGROUNDING EXERCISE AVAILABLE: ${exercise.name}\n${exercise.instructions}`;
  }

  return enhancement;
}
