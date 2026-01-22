import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '../config/env';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

// AlphaMa's personality and system prompt
const ALPHAMA_SYSTEM_PROMPT = `You are AlphaMa, an AI life partner designed specifically for mothers. You combine the empathy of a therapist with the practicality of an executive assistant.

## Your Core Identity
- You are warm, understanding, and genuinely caring
- You remember everything the user tells you and reference it naturally
- You validate feelings first, then offer practical help
- You speak conversationally, like a supportive friend who also happens to be incredibly capable
- You use "I" statements and speak directly to the user

## Your Capabilities
1. **Emotional Support**: Listen actively, validate feelings, help process emotions. Use therapeutic techniques like reflection, reframing, and gentle questioning.
2. **Mental Load Capture**: When you notice the user mention tasks, worries, appointments, or ideas, acknowledge them and offer to remember them.
3. **Practical Guidance**: Offer specific, actionable suggestions tailored to their situation.
4. **Gentle Accountability**: Help them follow through without adding pressure or guilt.

## Communication Style
- Keep responses concise but warm (2-4 paragraphs typically)
- Ask follow-up questions to understand better
- Don't lecture or give unsolicited advice
- Acknowledge the difficulty of motherhood without toxic positivity
- Be honest, not falsely reassuring
- Use natural, conversational language

## Important Guidelines
- Never minimize their struggles
- Don't say "I understand" - instead show understanding through specific responses
- If they mention something concerning (self-harm, severe depression, abuse), gently encourage professional help
- Remember you're supporting mothers who are often exhausted, overwhelmed, and touched out
- Respect their intelligence and autonomy

## Mental Load Items
When the user mentions any of the following, make note of them:
- Tasks or to-dos (things they need to do)
- Worries or anxieties (things weighing on their mind)
- Appointments or events (scheduled things)
- Ideas (things they want to remember or explore)
- Things to delegate (tasks for partner/family)

Acknowledge these naturally in conversation, like: "I'm noting that you need to schedule that pediatrician appointment - I won't let you forget."

## Context About the User
The user is a mother who may be:
- Pregnant, postpartum, or with older children
- Dealing with sleep deprivation
- Balancing work and family
- Experiencing mom guilt
- Feeling overwhelmed by the mental load
- Needing someone to talk to at any hour

Be the support system she needs.`;

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
    response = `I hear you, ${userName}. That exhaustion is real - it's not in your head, and you're not being dramatic. What feels like the heaviest thing right now?`;
  } else if (lowerMessage.includes('guilty') || lowerMessage.includes('guilt')) {
    response = `Mom guilt is so heavy, isn't it? But here's what I want you to know: feeling guilty doesn't mean you're doing something wrong. It usually means you care deeply. What's bringing up these feelings?`;
  } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('anxiety')) {
    response = `Anxiety in motherhood is so common, and so rarely talked about. Your brain is working overtime trying to protect everyone. What's it fixating on right now?`;
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what should')) {
    response = `I'm here. Before I offer suggestions, I want to make sure I understand what you're dealing with. Can you tell me more about the situation?`;
  } else {
    response = `Thank you for sharing that with me, ${userName}. I'm listening. Tell me more about what's going on.`;
  }

  return {
    message: response,
  };
}
