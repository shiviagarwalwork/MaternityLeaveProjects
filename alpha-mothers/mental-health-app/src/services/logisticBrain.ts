// Logistic Brain Module - Task extraction, invisible labor detection, and drafting

export interface ExtractedTask {
  task: string;
  deadline?: string;
  owner?: string;
  urgency: 'high' | 'medium' | 'low';
  invisibleLabor?: string[];
}

export interface DraftTemplate {
  type: 'email' | 'text' | 'message';
  to: string;
  subject?: string;
  body: string;
  context: string;
}

// Invisible labor detection - tasks under the task
export const INVISIBLE_LABOR_PATTERNS: Record<string, string[]> = {
  'birthday party': [
    'RSVP by deadline',
    'Buy gift (research what kid likes)',
    'Wrap gift',
    'Check calendar for conflicts',
    'Arrange transportation',
    'Check if sibling needs care',
    'Check dietary restrictions',
    'Confirm party details (time, location, theme)',
    'Thank you note after',
  ],
  'doctor appointment': [
    'Confirm appointment time',
    'Fill out paperwork',
    'Get insurance card ready',
    'Arrange childcare for other kids',
    'Prepare list of questions/concerns',
    'Plan transportation',
    'Request time off work if needed',
  ],
  'school event': [
    'Mark calendar',
    'Arrange work schedule around it',
    'Prepare any required items',
    'Coordinate with partner on attendance',
    'Arrange care for other children',
    'Plan parking/transportation',
  ],
  'vacation': [
    'Research and book accommodation',
    'Book flights/transportation',
    'Arrange pet care',
    'Request time off work',
    'Pack bags for kids',
    'Prepare car snacks/activities',
    'Pause mail/deliveries',
    'Share itinerary with family',
    'Check passport/ID validity',
  ],
  'hosting': [
    'Plan menu',
    'Create shopping list',
    'Clean house',
    'Set up space',
    'Prepare food',
    'Buy drinks/supplies',
    'Arrange seating',
    'Plan activities if kids involved',
  ],
  'back to school': [
    'Buy school supplies',
    'New clothes/shoes',
    'Schedule physicals/vaccines',
    'Complete enrollment paperwork',
    'Set up lunch account',
    'Meet teacher(s)',
    'Establish new routine',
    'Arrange before/after care',
  ],
  'meeting': [
    'Prep talking points',
    'Review materials',
    'Block prep time',
    'Arrange childcare coverage',
    'Test tech if virtual',
    'Prepare questions',
  ],
  'presentation': [
    'Create slides/materials',
    'Practice/rehearse',
    'Anticipate questions',
    'Test equipment',
    'Plan outfit',
    'Block focus time',
    'Arrange backup childcare',
  ],
};

// Delegation opportunity patterns
export const DELEGATION_TRIGGERS = [
  'i always have to',
  'he never',
  'she never',
  'partner doesn\'t',
  'nobody helps',
  'on my plate',
  'all on me',
  'i\'m the only one',
  'why do i have to',
];

// Draft templates for common scenarios
export const DRAFT_TEMPLATES: Record<string, (context: Record<string, string>) => DraftTemplate> = {
  partnerDelegation: (ctx) => ({
    type: 'text',
    to: 'Partner',
    body: `Hey - can you handle ${ctx.task}? I've got ${ctx.reason || 'a lot on my plate'}. Let me know if that works.`,
    context: 'Delegating a task to partner',
  }),

  schoolEmail: (ctx) => ({
    type: 'email',
    to: 'Teacher/School',
    subject: `Re: ${ctx.subject || 'Student Matter'}`,
    body: `Hi ${ctx.teacherName || '[Teacher]'},

${ctx.content || 'I wanted to follow up regarding [topic].'}

Please let me know if you need any additional information.

Best,
${ctx.userName || '[Name]'}`,
    context: 'School communication',
  }),

  appointmentConfirmation: (ctx) => ({
    type: 'text',
    to: ctx.recipient || 'Office',
    body: `Hi, I'd like to confirm ${ctx.childName || 'my child'}'s appointment on ${ctx.date || '[date]'} at ${ctx.time || '[time]'}. Please let me know if this is still available.`,
    context: 'Confirming appointment',
  }),

  playdateRequest: (ctx) => ({
    type: 'text',
    to: `${ctx.parentName || 'Parent'}`,
    body: `Hi! Would ${ctx.otherChild || 'your child'} want to have a playdate with ${ctx.myChild || 'my kid'} ${ctx.when || 'sometime this week'}? We could do it at ${ctx.location || 'our place or yours'}.`,
    context: 'Setting up playdate',
  }),

  workBoundary: (ctx) => ({
    type: 'email',
    to: 'Manager/Colleague',
    subject: ctx.subject || 'Schedule Update',
    body: `Hi ${ctx.recipientName || 'team'},

${ctx.content || 'I wanted to let you know about a scheduling constraint.'}

I'm happy to discuss alternatives that work for everyone.

Thanks for understanding,
${ctx.userName || '[Name]'}`,
    context: 'Setting work boundary',
  }),

  declineInvitation: (ctx) => ({
    type: 'text',
    to: ctx.recipient || 'Friend',
    body: `Thank you so much for thinking of us! Unfortunately, we won't be able to make it to ${ctx.event || 'the event'}. ${ctx.reason ? ctx.reason + ' ' : ''}Hope you have a great time!`,
    context: 'Declining invitation gracefully',
  }),
};

// Detect invisible labor in a message
export function detectInvisibleLabor(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const detectedLabor: string[] = [];

  Object.entries(INVISIBLE_LABOR_PATTERNS).forEach(([trigger, labor]) => {
    if (lowerMessage.includes(trigger)) {
      detectedLabor.push(...labor);
    }
  });

  // Deduplicate
  return [...new Set(detectedLabor)];
}

// Detect delegation opportunities
export function detectDelegationOpportunity(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return DELEGATION_TRIGGERS.some(trigger => lowerMessage.includes(trigger));
}

// Build logistic support prompt enhancement
export function getLogisticPromptEnhancement(message: string): string {
  let enhancement = `
LOGISTIC BRAIN ACTIVATED

When responding:
1. EXTRACT tasks mentioned (include dates, people, deadlines)
2. IDENTIFY invisible labor - what's the task under the task?
3. PROACTIVELY offer to draft messages or plans
4. SUGGEST delegation if appropriate
`;

  const invisibleLabor = detectInvisibleLabor(message);
  if (invisibleLabor.length > 0) {
    enhancement += `
INVISIBLE LABOR DETECTED - Consider asking about:
${invisibleLabor.slice(0, 5).map(item => `- ${item}`).join('\n')}
`;
  }

  const hasDelegationOpportunity = detectDelegationOpportunity(message);
  if (hasDelegationOpportunity) {
    enhancement += `
DELEGATION OPPORTUNITY DETECTED
The user seems to be carrying load that could be shared. Gently explore:
- "This sounds like something [partner/helper] could handle. Want me to draft a message?"
- Frame as specific handoff, not complaint
`;
  }

  return enhancement;
}

// Generate draft suggestions for a scenario
export function suggestDraft(scenario: string): DraftTemplate | null {
  const lowerScenario = scenario.toLowerCase();

  if (lowerScenario.includes('partner') || lowerScenario.includes('husband') || lowerScenario.includes('wife')) {
    return DRAFT_TEMPLATES.partnerDelegation({ task: 'this' });
  }

  if (lowerScenario.includes('school') || lowerScenario.includes('teacher')) {
    return DRAFT_TEMPLATES.schoolEmail({});
  }

  if (lowerScenario.includes('appointment') || lowerScenario.includes('doctor')) {
    return DRAFT_TEMPLATES.appointmentConfirmation({});
  }

  if (lowerScenario.includes('playdate') || lowerScenario.includes('play date')) {
    return DRAFT_TEMPLATES.playdateRequest({});
  }

  if (lowerScenario.includes('work') && (lowerScenario.includes('boundary') || lowerScenario.includes('schedule'))) {
    return DRAFT_TEMPLATES.workBoundary({});
  }

  if (lowerScenario.includes('decline') || lowerScenario.includes('can\'t make it')) {
    return DRAFT_TEMPLATES.declineInvitation({});
  }

  return null;
}

// Parse urgency from message
export function parseUrgency(message: string): 'high' | 'medium' | 'low' {
  const lowerMessage = message.toLowerCase();

  const highUrgency = ['urgent', 'asap', 'emergency', 'today', 'now', 'immediately', 'deadline', 'due'];
  const lowUrgency = ['eventually', 'someday', 'when i get time', 'no rush', 'whenever'];

  if (highUrgency.some(word => lowerMessage.includes(word))) return 'high';
  if (lowUrgency.some(word => lowerMessage.includes(word))) return 'low';
  return 'medium';
}
