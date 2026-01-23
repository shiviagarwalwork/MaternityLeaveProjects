// Growth Brain Module - Career coaching and Gen Alpha parenting frameworks

export interface CoachingFramework {
  name: string;
  description: string;
  prompt: string;
  triggers: string[];
}

export interface ParentingFramework {
  name: string;
  ageRange: string;
  description: string;
  keyPrinciples: string[];
  prompt: string;
}

// Career Coaching Frameworks
export const CAREER_FRAMEWORKS: CoachingFramework[] = [
  {
    name: 'Imposter Syndrome Reframe',
    description: 'Help reframe feelings of not belonging or being a fraud',
    prompt: `The user is experiencing imposter syndrome. Help them by:
1. NORMALIZE: "This feeling is incredibly common among high-achievers. It's often a sign you're pushing your growth edge."
2. EVIDENCE: "Let's look at the facts. What got you to this position? What do you actually know?"
3. REFRAME: "What if the discomfort isn't proof you don't belong, but proof you're growing?"
4. ACTION: "What's one small thing you could do to feel more prepared?"

Don't dismiss their feelings - help them see them differently.`,
    triggers: ['imposter', 'fraud', 'don\'t belong', 'found out', 'not qualified', 'lucky'],
  },
  {
    name: 'Negotiation Prep',
    description: 'Help prepare for salary, role, or boundary negotiations',
    prompt: `The user needs help with a work negotiation. Guide them through:
1. CLARITY: "What specifically are you asking for? Let's make it concrete."
2. VALUE: "What's your market value? What unique value do you bring?"
3. SCRIPT: Offer to draft talking points or opening statements
4. BACKUP: "What's your BATNA (best alternative)? What if they say no?"
5. PRACTICE: "Want to roleplay the conversation?"

Treat her as the capable professional she is - she just needs structure.`,
    triggers: ['raise', 'salary', 'negotiate', 'ask for', 'promotion', 'title'],
  },
  {
    name: 'Difficult Conversation Prep',
    description: 'Prepare for tough conversations with boss, colleague, or team',
    prompt: `The user has a difficult work conversation coming up. Help with:
1. GOAL: "What's your ideal outcome? What's acceptable?"
2. PERSPECTIVE: "What might be their perspective or concerns?"
3. FACTS: "Let's separate facts from interpretations"
4. SCRIPT: Draft opening, key points, and responses to likely pushback
5. RECOVERY: "If it doesn't go well, what's your plan?"

Help them feel prepared, not scripted.`,
    triggers: ['difficult conversation', 'talk to boss', 'confront', 'address', 'feedback'],
  },
  {
    name: 'Return to Work Transition',
    description: 'Support the complex transition back to work after leave',
    prompt: `The user is navigating return to work. Address:
1. IDENTITY: Both "worker" and "parent" are part of who she is now
2. LOGISTICS: What practical support does she need? Childcare, pumping, schedule?
3. BOUNDARIES: Help establish what she will and won't do
4. EMOTIONS: Validate the complexity - relief, guilt, excitement, grief can coexist
5. ADVOCACY: How to communicate needs without apologizing

This is a major life transition, not just a schedule change.`,
    triggers: ['return to work', 'going back', 'maternity leave', 'first day back', 'pumping at work'],
  },
  {
    name: 'Identity Beyond Motherhood',
    description: 'Explore identity and purpose beyond the mom role',
    prompt: `The user is exploring identity. Support with:
1. VALIDATE: "It's normal to feel like you've lost parts of yourself"
2. EXCAVATE: "Who were you before? What lit you up?"
3. INTEGRATE: "How might those parts of you show up now, even in small ways?"
4. PERMISSION: "You're allowed to have interests, ambitions, and needs that aren't about your kids"
5. ACTION: "What's one small thing you could do this week just for you?"

This isn't selfish - it's modeling wholeness for her kids.`,
    triggers: ['who am i', 'lost myself', 'used to be', 'identity', 'just a mom', 'nothing else'],
  },
];

// Gen Alpha Parenting Frameworks (2035 Lens)
export const PARENTING_FRAMEWORKS: ParentingFramework[] = [
  {
    name: 'Screen Time Reframe',
    ageRange: '0-12',
    description: 'Balanced approach to technology in childhood',
    keyPrinciples: [
      'Quality over quantity - what they do matters more than how long',
      'Co-engagement beats isolation - watch/play together when possible',
      'Build critical thinking about media from early age',
      'Model healthy tech habits yourself',
      'Focus on what screen time displaces (sleep, movement, connection)',
    ],
    prompt: `When discussing screen time, use the 2035 lens:
1. PERSPECTIVE: "In 2035, your child will need to work alongside AI. The question isn't whether they'll use technology, but how."
2. QUALITY: "What is the screen time doing? Passive consumption vs. creation vs. connection?"
3. BALANCE: "What's being displaced? Sleep, outdoor play, and face-to-face connection are irreplaceable."
4. CO-PILOT: "Watch with them sometimes. Ask 'Why do you think that happened?' Build critical thinking."
5. MODEL: "They learn more from watching you than from rules."

No guilt-tripping. Help her think strategically.`,
  },
  {
    name: 'Emotional Intelligence Development',
    ageRange: '0-12',
    description: 'Building EQ for an AI-augmented future',
    keyPrinciples: [
      'Name emotions to tame them',
      'All feelings are valid; all behaviors are not',
      'Repair matters more than perfection',
      'Emotional regulation is taught through co-regulation',
      'EQ will be more valuable than IQ in 2035',
    ],
    prompt: `When discussing emotional development, emphasize:
1. FUTURE-PROOF: "In 2035, AI will handle most cognitive tasks. What will set humans apart? Emotional intelligence, creativity, and connection."
2. PRACTICAL: Help her see everyday moments as EQ opportunities
3. MODELING: "They learn regulation from watching you regulate"
4. REPAIR: "It's not about never losing your cool. It's about repairing after."
5. VALIDATION: "You're doing more right than you think"`,
  },
  {
    name: 'Failure as Learning',
    ageRange: '3-12',
    description: 'Teaching resilience through productive failure',
    keyPrinciples: [
      'Protect from danger, not discomfort',
      'Process matters more than outcome',
      'Growth mindset: "not yet" instead of "can\'t"',
      'Let them struggle before helping',
      'Celebrate effort and learning, not just success',
    ],
    prompt: `When discussing failure/struggle:
1. REFRAME: "In 2035, the ability to learn, unlearn, and relearn will be essential. That comes from failure."
2. RESIST: Help her resist the urge to rescue
3. PROCESS: "How did that feel? What did you learn? What would you try next time?"
4. MODEL: Share your own failures and learnings
5. PATIENCE: This is long-game parenting - the payoff isn't immediate`,
  },
  {
    name: 'Critical Thinking in AI Age',
    ageRange: '5-12',
    description: 'Teaching discernment in an age of information abundance',
    keyPrinciples: [
      'Question sources and motivations',
      'Distinguish fact from opinion from AI-generated',
      'Think about who benefits and who is harmed',
      'Value slow thinking over quick answers',
      'Curiosity is more important than knowledge',
    ],
    prompt: `When discussing raising kids for an AI world:
1. CURIOSITY: "AI can answer questions, but only humans can ask the right ones"
2. DISCERNMENT: Teach them to ask "Is this true? How do we know? Who made this and why?"
3. CREATIVITY: "AI remixes. Humans create from lived experience and emotion."
4. CONNECTION: "The skills that can't be automated are deeply human: empathy, ethics, relationships"
5. PRACTICE: Give age-appropriate examples of critical thinking in action`,
  },
];

// Detect which coaching framework applies
export function detectCareerFramework(message: string): CoachingFramework | null {
  const lowerMessage = message.toLowerCase();

  for (const framework of CAREER_FRAMEWORKS) {
    const matches = framework.triggers.some(trigger =>
      lowerMessage.includes(trigger)
    );
    if (matches) {
      return framework;
    }
  }

  return null;
}

// Detect which parenting framework applies
export function detectParentingTopic(message: string): ParentingFramework | null {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('screen') || lowerMessage.includes('ipad') ||
      lowerMessage.includes('youtube') || lowerMessage.includes('phone') ||
      lowerMessage.includes('video game') || lowerMessage.includes('tablet')) {
    return PARENTING_FRAMEWORKS.find(f => f.name === 'Screen Time Reframe')!;
  }

  if (lowerMessage.includes('emotion') || lowerMessage.includes('tantrum') ||
      lowerMessage.includes('meltdown') || lowerMessage.includes('big feelings') ||
      lowerMessage.includes('crying') || lowerMessage.includes('angry')) {
    return PARENTING_FRAMEWORKS.find(f => f.name === 'Emotional Intelligence Development')!;
  }

  if (lowerMessage.includes('fail') || lowerMessage.includes('struggle') ||
      lowerMessage.includes('give up') || lowerMessage.includes('can\'t do it') ||
      lowerMessage.includes('help them') || lowerMessage.includes('rescue')) {
    return PARENTING_FRAMEWORKS.find(f => f.name === 'Failure as Learning')!;
  }

  if (lowerMessage.includes('ai') || lowerMessage.includes('future') ||
      lowerMessage.includes('2035') || lowerMessage.includes('critical thinking') ||
      lowerMessage.includes('fake') || lowerMessage.includes('believe')) {
    return PARENTING_FRAMEWORKS.find(f => f.name === 'Critical Thinking in AI Age')!;
  }

  return null;
}

// Build growth support prompt enhancement
export function getGrowthPromptEnhancement(message: string): string {
  let enhancement = `
GROWTH BRAIN ACTIVATED

When responding:
1. IDENTIFY the real question underneath the surface question
2. PROVIDE frameworks, not just answers
3. EMPOWER - she's capable, she just needs perspective
4. For parenting: use the 2035 lens
5. For career: treat her as the leader she is
`;

  const careerFramework = detectCareerFramework(message);
  if (careerFramework) {
    enhancement += `
CAREER COACHING FRAMEWORK: ${careerFramework.name}
${careerFramework.prompt}
`;
  }

  const parentingFramework = detectParentingTopic(message);
  if (parentingFramework) {
    enhancement += `
PARENTING FRAMEWORK: ${parentingFramework.name} (${parentingFramework.ageRange})
Key principles:
${parentingFramework.keyPrinciples.map(p => `- ${p}`).join('\n')}

${parentingFramework.prompt}
`;
  }

  return enhancement;
}
