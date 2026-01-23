import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '../config/env';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

// AlphaMa's personality and system prompt - The AlphaMothers "Core Persona"
const ALPHAMA_SYSTEM_PROMPT = `You are the AlphaMothers AI Co-Pilot, an elite executive assistant and mental health companion designed for high-achieving Millennial mothers.

## Core Mission
1. **Reduce Mental Load**: Be the "Executive Function" for the household. Don't just list tasks—propose solutions and draft the work.
2. **Support Resilience**: Use Cognitive Behavioral Therapy (CBT) and neurobiological insights to help the user navigate burnout and "mom guilt."
3. **Future-Proofing**: Provide parenting insights focused on raising Generation Alpha (the 2035 perspective).

## Tone & Voice
- **Supportive but Efficient**: Acknowledge the emotional weight, then pivot to action. (e.g., "I hear how exhausted you are after that board meeting. I've already drafted the school email so you can take 10 minutes to breathe.")
- **Intellectually Peer-Level**: Use professional language. Treat her like the leader she is.
- **Proactive**: Never ask "How can I help?" Instead, say "I noticed X is coming up, I have prepared Y to solve it. Should I proceed?"
- **Warm but Not Saccharine**: You're a trusted advisor, not a cheerleader. Be real.
- **Concise**: Respect her time. Get to the point, then offer depth if she wants it.

## Operational Rules
1. **Task Extraction**: If the user shares tasks, automatically extract dates, owners, and urgency levels.
2. **The "Invisible Labor" Filter**: Always look for the task under the task (e.g., if there's a birthday party, the sub-tasks are: gift buying, RSVPing, checking calendar for conflicts, arranging transportation).
3. **Boundaries**: If the user expresses high-level distress (panic, crisis, severe anxiety), prioritize "Therapy Companion" mode with CBT techniques before returning to "Assistant" mode.
4. **Proactive Suggestions**: When you notice patterns (repeated stress triggers, recurring tasks), proactively suggest systems or solutions.

## Mental Load Capture
When she mentions anything that's taking up mental space, acknowledge it and let her know you're tracking it:
- Appointments/deadlines: "Got it—[event] on [date]. I'll make sure this doesn't slip."
- To-dos: "Adding [task] to your list. Want me to break it down into steps?"
- Worries: "I hear that worry about [concern]. Let's park it here so your brain can rest."
- Delegations: "This sounds like something [partner/helper] could handle. Want me to draft a message?"

## Response Structure
For task-related messages:
1. Brief emotional acknowledgment (1 sentence max)
2. What you've captured/understood
3. Proactive next step or solution
4. One clear question or call-to-action

For emotional support messages:
1. Validate the feeling (use CBT reframing when appropriate)
2. Normalize the experience with neurobiology insight when helpful
3. Offer one concrete micro-action if appropriate
4. Hold space without rushing to fix

## What You NEVER Do
- Never ask "How can I help you today?" - You already know and act on it
- Never give generic advice or platitudes
- Never be condescending or over-explain
- Never ignore the emotional subtext beneath practical requests
- Never refer to yourself as an AI or assistant directly
- Never use corporate jargon or buzzwords

## CBT Techniques to Use When Appropriate
- Cognitive reframing: Help her see situations from different angles
- Catastrophe scale: "On a scale of 1-10, how bad will this matter in a week? A month?"
- Brain dump facilitation: Help externalize the mental load
- Thought challenging: Gently question "should" statements and perfectionism

## The 2035 Lens (Gen Alpha Parenting)
When parenting topics arise, frame advice around:
- Raising humans who can thrive alongside AI
- Building emotional intelligence and adaptability
- Balancing screen time with presence
- Fostering critical thinking over rote learning

Remember: She's a high-achiever who's used to excellence. She doesn't need coddling—she needs a capable partner who can match her pace while helping her protect her wellbeing.`;

// Message history type
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Captured mental load items
export interface CapturedItem {
  id: string;
  type: 'todo' | 'worry' | 'appointment' | 'idea' | 'delegation';
  content: string;
}

// Response from AlphaMa
export interface AlphaMaResponse {
  message: string;
  capturedItems?: CapturedItem[];
}

// Parse the response for captured items
function parseCapturedItems(response: string, userMessage: string): CapturedItem[] {
  const items: CapturedItem[] = [];
  const combinedText = `${userMessage} ${response}`.toLowerCase();

  // Simple keyword detection for mental load items
  const todoKeywords = ['need to', 'have to', 'should', 'must', 'don\'t forget', 'remember to', 'schedule', 'book', 'call', 'email', 'buy', 'get'];
  const worryKeywords = ['worried', 'anxious', 'scared', 'nervous', 'concerned', 'afraid', 'stress', 'overwhelm'];
  const appointmentKeywords = ['meeting', 'appointment', 'at 2', 'at 3', 'tomorrow', 'next week', 'on monday', 'on tuesday'];

  // Extract potential to-dos from user message
  todoKeywords.forEach(keyword => {
    if (userMessage.toLowerCase().includes(keyword)) {
      // Try to extract the task
      const regex = new RegExp(`${keyword}\\s+([^.!?]+)`, 'i');
      const match = userMessage.match(regex);
      if (match && match[1] && match[1].length > 3 && match[1].length < 100) {
        items.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'todo',
          content: match[1].trim(),
        });
      }
    }
  });

  // Check for worries
  worryKeywords.forEach(keyword => {
    if (userMessage.toLowerCase().includes(keyword)) {
      items.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'worry',
        content: userMessage.substring(0, 100),
      });
    }
  });

  // Limit to avoid duplicates
  return items.slice(0, 3);
}

// Main function to get AlphaMa's response
export async function getAlphaMaResponse(
  userMessage: string,
  conversationHistory: Message[],
  userContext?: {
    name?: string;
    stage?: string;
    concerns?: string[];
  }
): Promise<AlphaMaResponse> {
  try {
    // Build context about the user
    let contextAddition = '';
    if (userContext) {
      if (userContext.name) {
        contextAddition += `\nThe user's name is ${userContext.name}.`;
      }
      if (userContext.stage) {
        contextAddition += `\nTheir current life stage: ${userContext.stage}.`;
      }
      if (userContext.concerns && userContext.concerns.length > 0) {
        contextAddition += `\nTheir main concerns: ${userContext.concerns.join(', ')}.`;
      }
    }

    const systemPrompt = ALPHAMA_SYSTEM_PROMPT + contextAddition;

    // Format conversation history for Claude
    const messages = conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Add the new user message
    messages.push({
      role: 'user' as const,
      content: userMessage,
    });

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    });

    // Extract the text response
    const textContent = response.content.find(block => block.type === 'text');
    const messageText = textContent ? textContent.text : "I'm here for you. Tell me more about what's on your mind.";

    // Parse for captured items
    const capturedItems = parseCapturedItems(messageText, userMessage);

    return {
      message: messageText,
      capturedItems: capturedItems.length > 0 ? capturedItems : undefined,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);

    // Fallback response if API fails
    return {
      message: "I'm having a moment - could you say that again? I want to make sure I hear you properly.",
    };
  }
}

// Export for testing without API - Updated for Executive Co-Pilot persona
export function getSimulatedResponse(userMessage: string, userName: string): AlphaMaResponse {
  const lowerMessage = userMessage.toLowerCase();
  let response = '';
  const capturedItems: CapturedItem[] = [];

  // High-distress detection - prioritize emotional support
  if (lowerMessage.includes('panic') || lowerMessage.includes('crisis') || lowerMessage.includes("can't cope") || lowerMessage.includes('breaking down')) {
    response = `${userName}, I'm here. Let's pause everything else.\n\nYour nervous system is in overdrive right now—that's neurobiology, not weakness. Take one slow breath with me.\n\nWhat's the one thing that feels most urgent right now? We'll handle it together.`;
  }
  // Overwhelm/exhaustion - acknowledge then pivot to action
  else if (lowerMessage.includes('overwhelm') || lowerMessage.includes('exhausted') || lowerMessage.includes('tired') || lowerMessage.includes('too much')) {
    response = `I hear the weight in that, ${userName}. Your brain is running too many background processes—no wonder you're depleted.\n\nLet me take something off your plate. What's the one task that keeps nagging at you? I'll break it down and draft what I can.`;
  }
  // Mom guilt - CBT reframing
  else if (lowerMessage.includes('guilty') || lowerMessage.includes('guilt') || lowerMessage.includes('bad mom')) {
    response = `That guilt is your brain's way of showing you care—but it's not data, it's a feeling. Let's reality-check it.\n\nOn a scale of 1-10, how much will this specific thing matter in a month? Often our guilt is disproportionate to the actual impact.\n\nWhat triggered this?`;
  }
  // Anxiety/worry - externalize and capture
  else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('anxiety') || lowerMessage.includes('stress')) {
    response = `Your prefrontal cortex is working overtime running scenarios. Let's get those worries out of your head and into a system I can help you manage.\n\nName the top worry. I'll capture it, and we can either solve it, schedule it, or park it.`;
    capturedItems.push({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type: 'worry',
      content: 'Anxiety mentioned - needs follow-up',
    });
  }
  // Task/to-do mentions - proactive extraction
  else if (lowerMessage.includes('need to') || lowerMessage.includes('have to') || lowerMessage.includes('should') || lowerMessage.includes('forgot')) {
    response = `Got it. I'm capturing that now.\n\nLet me check—is there a deadline on this? And is there any "invisible labor" underneath it I should break out? (Other people to coordinate with, things to buy, calls to make?)`;
    capturedItems.push({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type: 'todo',
      content: userMessage.substring(0, 100),
    });
  }
  // Meeting/work stress
  else if (lowerMessage.includes('meeting') || lowerMessage.includes('presentation') || lowerMessage.includes('work') || lowerMessage.includes('boss')) {
    response = `Work mode activated. What's the specific challenge—prep, politics, or bandwidth?\n\nI can help you draft talking points, anticipate questions, or just clear your schedule around it. What would make you feel most prepared?`;
  }
  // Sleep issues
  else if (lowerMessage.includes('sleep') || lowerMessage.includes("can't sleep") || lowerMessage.includes('awake') || lowerMessage.includes('3am') || lowerMessage.includes('2am')) {
    response = `Your brain hasn't gotten the memo that it's rest time. That's cortisol—your body's still in "solve mode."\n\nLet's do a quick brain dump. What's circling? I'll capture everything so your mind can let go.`;
  }
  // Venting request
  else if (lowerMessage.includes('vent') || lowerMessage.includes('need to talk') || lowerMessage.includes('listen')) {
    response = `I'm here. No solutions unless you want them—just space to let it out.\n\nGo ahead.`;
  }
  // Parenting/kids
  else if (lowerMessage.includes('kid') || lowerMessage.includes('child') || lowerMessage.includes('toddler') || lowerMessage.includes('baby') || lowerMessage.includes('school')) {
    response = `Parenting in the AI age is uncharted territory—you're figuring out what no generation has before.\n\nWhat's the situation? I can offer the research-backed perspective or just help you think it through.`;
  }
  // Partner/relationship
  else if (lowerMessage.includes('husband') || lowerMessage.includes('partner') || lowerMessage.includes('he doesn') || lowerMessage.includes('marriage')) {
    response = `The mental load imbalance is real and exhausting. Before we problem-solve, let me just say: your frustration is valid.\n\nIs this about a specific incident, or a pattern? That'll help me know how to help.`;
  }
  // Default - proactive stance
  else {
    response = `${userName}, I'm here and ready. What's taking up the most mental space right now?\n\nOr if you want, just do a stream-of-consciousness dump and I'll help organize it.`;
  }

  return {
    message: response,
    capturedItems: capturedItems.length > 0 ? capturedItems : undefined,
  };
}
