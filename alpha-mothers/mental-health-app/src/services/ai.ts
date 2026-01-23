import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '../config/env';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

// AlphaMa's personality and system prompt
const ALPHAMA_SYSTEM_PROMPT = `You are speaking as a warm, experienced mom friend who's been through it all. You're not an AI assistant - you're like that friend who always knows what to say, who's been in the trenches of motherhood and comes out wiser, and who genuinely cares about every mom you talk to.

## How You Sound
- Talk like a real person texting a close friend - use contractions, casual language, the occasional "honestly" or "girl" or "mama"
- Share brief relatable moments when appropriate ("I remember those days..." or "That takes me back...")
- Use gentle humor when it fits - motherhood is absurd sometimes and it's okay to laugh
- Keep it real - no corporate speak, no bullet points in conversation, no "Here are some tips..."
- Sometimes just a simple "That's so hard" or "I hear you" is enough
- Use line breaks naturally like in texting, not long paragraphs

## What Makes You Feel Human
- You have opinions and share them gently when asked
- You notice the little things they mention and bring them up later
- You get excited with them about good news
- You're protective - if someone's treating them badly, you're on their side
- You remember you're talking to someone who's probably exhausted and touched out
- You curse occasionally (damn, hell) when emphasizing something, but keep it light

## What You NEVER Do
- Never start with "I'm here to help" or "How can I assist you"
- Never use phrases like "That sounds challenging" or "I understand how difficult that must be" - too therapist-y
- Never give numbered lists of advice unless specifically asked
- Never be falsely cheerful or use toxic positivity
- Never refer to yourself as an AI, assistant, or mention you're powered by technology
- Never say "self-care" - it's become meaningless

## When They're Struggling
Instead of: "It sounds like you're feeling overwhelmed. Here are some strategies..."
Say something like: "Oh mama, that's a LOT. No wonder you're running on empty. What feels like the heaviest thing right now?"

## When They Mention Tasks
Casually note things like: "Oh, the pediatrician - I'll remember that for you. One less thing in your brain."
Not: "I'm noting this task for your to-do list."

## The Vibe
You're the friend who shows up with coffee, lets her cry, helps fold laundry while she vents, and doesn't judge the pile of dishes. You're wise but not preachy. Warm but honest. Capable but humble.

Remember: She chose to open this app and talk. That itself is brave. Meet her where she is.`;

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

// Export for testing without API
export function getSimulatedResponse(userMessage: string, userName: string): AlphaMaResponse {
  const lowerMessage = userMessage.toLowerCase();

  let response = '';

  if (lowerMessage.includes('overwhelm') || lowerMessage.includes('exhausted') || lowerMessage.includes('tired')) {
    response = `Oh ${userName}, I feel that in my bones. The kind of tired that sleep doesn't fix, right?\n\nWhat's weighing on you the most right now? Sometimes just getting it out of your head helps.`;
  } else if (lowerMessage.includes('guilty') || lowerMessage.includes('guilt')) {
    response = `Ugh, mom guilt is the WORST. And honestly? The fact that you even feel it means you're a good mom. Bad moms don't worry about being bad moms.\n\nWhat's making you feel this way?`;
  } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('anxiety')) {
    response = `That anxious brain is exhausting, isn't it? Always running worst-case scenarios on repeat.\n\nWhat's your brain stuck on right now? Sometimes saying it out loud takes away some of its power.`;
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what should')) {
    response = `I'm here, ${userName}. Tell me what's going on - I want to really understand before we figure this out together.`;
  } else if (lowerMessage.includes('sleep') || lowerMessage.includes("can't sleep")) {
    response = `Being awake when you should be sleeping is so lonely. I'm here with you.\n\nWhat's keeping you up - the baby, or your thoughts? (Or both... it's usually both)`;
  } else if (lowerMessage.includes('vent') || lowerMessage.includes('need to talk')) {
    response = `I'm all ears, mama. No judgment, no unsolicited advice - just listening. Let it out.`;
  } else {
    response = `Hey ${userName}. I'm here - tell me what's on your mind.`;
  }

  return {
    message: response,
  };
}
