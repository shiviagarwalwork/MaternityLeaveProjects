// Sunday Reset Service - Weekly planning and stress analysis

import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_API_KEY } from '../config/env';

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

// Types
export interface WeeklyStressor {
  id: string;
  title: string;
  date?: string;
  stressLevel: 'high' | 'medium' | 'low';
  reason: string;
  actionItem?: string;
  category: 'work' | 'kids' | 'household' | 'relationship' | 'self' | 'other';
}

export interface DraftMessage {
  id: string;
  to: string;
  subject?: string;
  body: string;
  type: 'email' | 'text';
  context: string;
}

export interface BioBreak {
  id: string;
  day: string;
  time: string;
  duration: number; // minutes
  suggestion: string;
}

export interface InvisibleLaborItem {
  id: string;
  mainTask: string;
  subTasks: string[];
}

export interface SundayResetOutput {
  stressors: WeeklyStressor[];
  drafts: DraftMessage[];
  bioBreaks: BioBreak[];
  invisibleLabor: InvisibleLaborItem[];
  weekSummary: string;
  encouragement: string;
}

// System prompt for Sunday Reset processing
const SUNDAY_RESET_PROMPT = `You are processing a Sunday Reset brain dump for a high-achieving mother. Your job is to analyze her upcoming week and return structured, actionable output.

IMPORTANT: Return your response as valid JSON matching this exact structure:
{
  "stressors": [
    {
      "title": "string - brief title",
      "date": "string or null - day/date if mentioned",
      "stressLevel": "high" | "medium" | "low",
      "reason": "string - why this is stressful",
      "actionItem": "string or null - one concrete action to reduce stress",
      "category": "work" | "kids" | "household" | "relationship" | "self" | "other"
    }
  ],
  "drafts": [
    {
      "to": "string - recipient",
      "subject": "string or null - for emails",
      "body": "string - the draft message",
      "type": "email" | "text",
      "context": "string - what this draft is for"
    }
  ],
  "bioBreaks": [
    {
      "day": "string - day of week",
      "time": "string - suggested time",
      "duration": number - minutes,
      "suggestion": "string - what to do (breathing, walk, etc.)"
    }
  ],
  "invisibleLabor": [
    {
      "mainTask": "string - the visible task",
      "subTasks": ["string array of hidden tasks underneath"]
    }
  ],
  "weekSummary": "string - 2-3 sentence summary of the week ahead",
  "encouragement": "string - one sentence of genuine, non-saccharine encouragement"
}

Guidelines:
1. STRESSORS: Identify the top 3-5 things that will weigh on her. Rank by actual impact, not just what she mentioned first.
2. DRAFTS: If she mentions needing to communicate with someone, draft it. Be specific and ready-to-send.
3. BIO-BREAKS: Find 2-3 realistic gaps in her schedule for 5-minute breathing/reset moments.
4. INVISIBLE LABOR: For any event/task mentioned, identify the hidden sub-tasks she's probably also tracking.
5. Keep everything actionable and specific - no vague advice.
6. Tone: Efficient, peer-level, warm but not cheesy.`;

// Generate unique ID
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Process the brain dump and return structured output
export async function processSundayReset(
  brainDump: string,
  userName: string,
  additionalContext?: {
    kidsNames?: string[];
    partnerName?: string;
    workSchedule?: string;
  }
): Promise<SundayResetOutput> {
  try {
    // Build context
    let userContext = `User's name: ${userName}`;
    if (additionalContext?.kidsNames?.length) {
      userContext += `\nKids: ${additionalContext.kidsNames.join(', ')}`;
    }
    if (additionalContext?.partnerName) {
      userContext += `\nPartner: ${additionalContext.partnerName}`;
    }
    if (additionalContext?.workSchedule) {
      userContext += `\nWork schedule: ${additionalContext.workSchedule}`;
    }

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: SUNDAY_RESET_PROMPT,
      messages: [
        {
          role: 'user',
          content: `${userContext}\n\n---\n\nBRAIN DUMP:\n${brainDump}`,
        },
      ],
    });

    // Extract and parse JSON response
    const textContent = response.content.find(block => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from AI');
    }

    // Try to parse JSON from response (handle potential markdown code blocks)
    let jsonStr = textContent.text;
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    }

    const parsed = JSON.parse(jsonStr.trim());

    // Add IDs to all items
    const output: SundayResetOutput = {
      stressors: (parsed.stressors || []).map((s: any) => ({
        ...s,
        id: generateId(),
      })),
      drafts: (parsed.drafts || []).map((d: any) => ({
        ...d,
        id: generateId(),
      })),
      bioBreaks: (parsed.bioBreaks || []).map((b: any) => ({
        ...b,
        id: generateId(),
      })),
      invisibleLabor: (parsed.invisibleLabor || []).map((i: any) => ({
        ...i,
        id: generateId(),
      })),
      weekSummary: parsed.weekSummary || 'Your week is taking shape. Let\'s tackle it together.',
      encouragement: parsed.encouragement || 'You\'ve got this. One thing at a time.',
    };

    return output;
  } catch (error) {
    console.error('Error processing Sunday Reset:', error);
    // Return a fallback response
    return getSimulatedSundayReset(brainDump, userName);
  }
}

// Simulated response for testing without API
export function getSimulatedSundayReset(brainDump: string, userName: string): SundayResetOutput {
  const lowerDump = brainDump.toLowerCase();

  const stressors: WeeklyStressor[] = [];
  const drafts: DraftMessage[] = [];
  const bioBreaks: BioBreak[] = [];
  const invisibleLabor: InvisibleLaborItem[] = [];

  // Detect common stressors from brain dump
  if (lowerDump.includes('meeting') || lowerDump.includes('presentation')) {
    stressors.push({
      id: generateId(),
      title: 'Work Meeting/Presentation',
      stressLevel: 'high',
      reason: 'High-stakes work event requiring prep and mental energy',
      actionItem: 'Block 30 min prep time the day before',
      category: 'work',
    });
  }

  if (lowerDump.includes('birthday') || lowerDump.includes('party')) {
    stressors.push({
      id: generateId(),
      title: 'Birthday Party',
      stressLevel: 'medium',
      reason: 'Multiple logistics to coordinate',
      actionItem: 'Confirm gift and transportation today',
      category: 'kids',
    });
    invisibleLabor.push({
      id: generateId(),
      mainTask: 'Birthday Party',
      subTasks: [
        'RSVP (check deadline)',
        'Buy and wrap gift',
        'Confirm party time and location',
        'Arrange transportation',
        'Check if sibling needs care',
      ],
    });
  }

  if (lowerDump.includes('doctor') || lowerDump.includes('dentist') || lowerDump.includes('appointment')) {
    stressors.push({
      id: generateId(),
      title: 'Medical Appointment',
      stressLevel: 'medium',
      reason: 'Schedule coordination and potential wait times',
      actionItem: 'Prepare questions list and confirm time',
      category: 'kids',
    });
  }

  if (lowerDump.includes('partner') || lowerDump.includes('husband') || lowerDump.includes('wife')) {
    if (lowerDump.includes('help') || lowerDump.includes('doesn\'t') || lowerDump.includes('never')) {
      drafts.push({
        id: generateId(),
        to: 'Partner',
        body: `Hey - I\'m looking at this week and feeling stretched. Could you take point on [specific task]? Would really help me out.`,
        type: 'text',
        context: 'Delegation request to partner',
      });
    }
  }

  if (lowerDump.includes('school') || lowerDump.includes('teacher')) {
    drafts.push({
      id: generateId(),
      to: 'Teacher/School',
      subject: 'Quick Question',
      body: `Hi,\n\nI wanted to follow up on [topic]. Could you let me know [specific question]?\n\nThanks so much,\n${userName}`,
      type: 'email',
      context: 'School communication',
    });
  }

  // Default stressor if none detected
  if (stressors.length === 0) {
    stressors.push({
      id: generateId(),
      title: 'Week Ahead Planning',
      stressLevel: 'low',
      reason: 'General week coordination',
      actionItem: 'Review calendar and identify priorities',
      category: 'other',
    });
  }

  // Always suggest bio-breaks
  bioBreaks.push(
    {
      id: generateId(),
      day: 'Monday',
      time: '7:00 AM',
      duration: 5,
      suggestion: 'Box breathing before the week starts',
    },
    {
      id: generateId(),
      day: 'Wednesday',
      time: '12:30 PM',
      duration: 5,
      suggestion: 'Midweek reset - step outside or stretch',
    },
    {
      id: generateId(),
      day: 'Friday',
      time: '3:00 PM',
      duration: 5,
      suggestion: 'Transition breathing before weekend mode',
    }
  );

  return {
    stressors,
    drafts,
    bioBreaks,
    invisibleLabor,
    weekSummary: `${userName}, you\'ve got a full week ahead. The key is tackling the high-stress items early and protecting some breathing room.`,
    encouragement: 'You\'re not just surviving this week - you\'re designing it. That\'s already a win.',
  };
}

// Helper to get stress level color
export function getStressColor(level: 'high' | 'medium' | 'low'): string {
  switch (level) {
    case 'high':
      return '#EF4444'; // Red
    case 'medium':
      return '#F59E0B'; // Amber
    case 'low':
      return '#10B981'; // Green
  }
}

// Helper to get category icon
export function getCategoryIcon(category: WeeklyStressor['category']): string {
  switch (category) {
    case 'work':
      return '💼';
    case 'kids':
      return '👶';
    case 'household':
      return '🏠';
    case 'relationship':
      return '💑';
    case 'self':
      return '🧘';
    case 'other':
      return '📋';
  }
}
