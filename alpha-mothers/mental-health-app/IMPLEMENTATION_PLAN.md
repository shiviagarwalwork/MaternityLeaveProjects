# AlphaMa App - Comprehensive Implementation Plan

> Last Updated: January 23, 2026
> Status: Phase 1 Complete - Core MVP Ready
> Author: Shivi Agarwal
> AI Partner: Claude (Anthropic)

---

## Table of Contents
1. [Product Vision](#product-vision)
2. [Target User](#target-user)
3. [The Problem We're Solving](#the-problem-were-solving)
4. [Three Brains Architecture](#three-brains-architecture)
5. [Technical Architecture](#technical-architecture)
6. [Current State Assessment](#current-state-assessment)
7. [Implementation Phases](#implementation-phases)
8. [Feature Specifications](#feature-specifications)
9. [Data Privacy & Security](#data-privacy--security)
10. [Technical Decisions](#technical-decisions)
11. [File Structure](#file-structure)
12. [Success Metrics](#success-metrics)
13. [Context for Future Sessions](#context-for-future-sessions)

---

## Product Vision

### The Big Idea
AlphaMa is not a chatbot. It's a **Proactive AI Operating System for Mothers** - an elite executive assistant combined with a mental health companion, designed specifically for high-achieving Millennial mothers raising Generation Alpha children.

### The Shift
| From (Generic AI) | To (AlphaMa) |
|-------------------|--------------|
| Reactive: "How can I help?" | Proactive: "I noticed X, I've prepared Y" |
| Generic advice | Personalized to her life, her kids, her career |
| Task lists | Solutions + drafted work |
| Surface-level chat | CBT-informed emotional support |
| Present-focused | 2035-focused (raising AI-native kids) |

### The Tagline
> "The Executive Function you deserve. The support you need. The partner who actually gets it."

---

## Target User

### Primary Persona: "The Achiever Mom"

**Demographics:**
- Age: 30-42 (Millennial)
- Career: Professional/Leadership role
- Kids: 1-3 children, ages 0-12 (Gen Alpha/Beta)
- Location: Urban/Suburban, developed markets
- Income: $100K+ household

**Psychographics:**
- High standards for herself (sometimes impossibly high)
- Feels guilty about work-life balance
- Mentally exhausted even when physically "fine"
- Wants to raise kids differently than she was raised
- Anxious about preparing kids for AI-dominated future
- Has "invisible labor" that no one sees or acknowledges

**Her Day:**
```
5:30 AM  - Wake before kids, try to exercise or work
6:30 AM  - Kid chaos: breakfast, clothes, tantrums
8:00 AM  - Drop-off, commute, mentally switch to "work mode"
9:00 AM  - Meetings, emails, proving she's still "committed"
3:00 PM  - School pickup logistics (coordinating with partner/nanny)
5:00 PM  - Dinner prep while helping with homework
7:00 PM  - Bedtime routine, final work emails
9:00 PM  - Collapse, scroll phone, feel guilty about scrolling
11:00 PM - Can't sleep, brain won't stop
```

**What She Says:**
- "I have a million tabs open in my brain"
- "I feel like I'm failing at everything"
- "My husband helps but I'm still the project manager"
- "I don't even know who I am outside of 'mom' and 'employee'"
- "How do I raise my kids for a world I can't predict?"

---

## The Problem We're Solving

### The Mental Load
The mental load isn't the tasks. It's **remembering, tracking, anticipating, and managing** all the tasks. It's the invisible labor.

**Example: "Birthday Party" is not one task**
```
Birthday Party (visible task)
├── Check calendar for conflicts
├── RSVP by deadline
├── Buy gift (research what kid likes, budget, order)
├── Wrap gift
├── Arrange transportation
├── Check if sibling needs care during party
├── Dietary restrictions? Bring safe snack?
├── What to wear? Is it themed?
└── Thank you note after?
```

This "task under the task" detection is what makes AlphaMa different.

### The Guilt Cycle
```
Work late → Feel guilty about kids
Leave early for kids → Feel guilty about work
Take time for self → Feel guilty about both
Never take time for self → Burn out
Burn out → Feel guilty about being burned out
```

AlphaMa breaks this cycle with **CBT-informed reframing** and **proactive load reduction**.

### The Loneliness
- Can't fully vent to partner (they're part of the problem sometimes)
- Can't fully vent to colleagues (professional reputation)
- Can't fully vent to mom friends (comparison/judgment)
- Therapist is expensive and requires scheduling

AlphaMa is available at 2am, doesn't judge, and actually remembers what she said last week.

---

## Three Brains Architecture

### Overview
The app routes conversations to the appropriate "brain" based on detected intent:

```
User Input
    │
    ▼
┌─────────────────┐
│ Mode Detection  │
│   (Intent AI)   │
└─────────────────┘
    │
    ├──── Emotional distress? ───▶ EMOTIONAL BRAIN
    │
    ├──── Task/logistics? ───────▶ LOGISTIC BRAIN
    │
    └──── Career/parenting? ─────▶ GROWTH BRAIN
```

---

### Brain 1: Emotional Brain (Therapy Companion)

**Purpose:** Provide real-time emotional support using CBT techniques and neurobiological insights.

**Triggers (when to activate):**
- Explicit: "I'm anxious", "feeling guilty", "can't cope", "overwhelmed"
- Implicit: Negative self-talk, catastrophizing, "should" statements
- Crisis: Mentions of self-harm, severe panic, prolonged despair

**Techniques Used:**

1. **Cognitive Reframing**
   - User: "I'm a terrible mother"
   - AlphaMa: "That's a thought, not a fact. What evidence supports it? What evidence contradicts it?"

2. **Catastrophe Scale**
   - User: "I forgot the school form, this is a disaster"
   - AlphaMa: "On a scale of 1-10, how much will this matter in a week? A month? Let's get perspective."

3. **Thought Challenging**
   - User: "I should be able to do it all"
   - AlphaMa: "Says who? That's a 'should' statement. Where did that rule come from?"

4. **Neurobiological Validation**
   - User: "Why can't I calm down?"
   - AlphaMa: "Your amygdala is in overdrive - that's biology, not weakness. Let's activate your parasympathetic nervous system. Can you take one slow breath?"

5. **Grounding Techniques**
   - 5-4-3-2-1 sensory exercise
   - Box breathing guidance
   - Body scan prompts

**Response Pattern:**
```
1. Validate the emotion (1 sentence)
2. Normalize with neurobiology (if helpful)
3. Apply CBT technique
4. Offer micro-action OR hold space
5. Check in: "How did that land?"
```

**Example Interaction:**
```
User: "I yelled at my kid this morning and I can't stop replaying it"

AlphaMa: "That replay loop is exhausting. Your brain is trying to 'fix'
something that's already done - that's normal, but not helpful.

Here's the thing: you yelled because you're human and depleted, not
because you're a bad mom. Bad moms don't feel bad about yelling.

Can we reality-check this? On a scale of 1-10, how damaging was this
single moment in the context of your whole relationship with your kid?

And what might you need right now - to process this, or to move forward?"
```

---

### Brain 2: Logistic Brain (The Assistant)

**Purpose:** Be the "Executive Function" for the household. Don't just track tasks - propose solutions and draft the work.

**Triggers (when to activate):**
- Task mentions: "need to", "have to", "don't forget", "remind me"
- Calendar mentions: "next week", "on Tuesday", "appointment"
- Delegation hints: "he never", "I always have to"
- Overwhelm + tasks: "too much to do", "can't keep track"

**Core Capabilities:**

1. **Task Extraction**
   ```
   User: "I have that meeting Tuesday, need to prep the deck,
         and the kids have dentist Thursday"

   AlphaMa extracts:
   - [ ] Meeting (Tuesday) - Owner: User - Urgency: High
     - [ ] Prep deck - Deadline: Monday EOD
   - [ ] Kids dentist (Thursday) - Owner: User
     - [ ] Confirm appointment time
     - [ ] Arrange transportation/childcare for other kid
   ```

2. **Invisible Labor Detection**
   ```
   User: "There's a birthday party Saturday"

   AlphaMa: "Got it - birthday party Saturday. Let me unpack that:
   - Have you RSVP'd? When's the deadline?
   - Gift needed? What's the budget and what does the kid like?
   - Transportation - who's taking, picking up?
   - Does your other child need coverage during the party?
   - Any dietary restrictions to prep for?

   Which of these can I help draft or solve?"
   ```

3. **Proactive Drafting**
   ```
   User: "I need to email the teacher about the field trip"

   AlphaMa: "I've drafted this for you:

   ---
   Subject: Field Trip Permission - [Child's Name]

   Hi [Teacher],

   [Child] has permission to attend the field trip on [date].
   Please let me know if you need any additional information.

   Best,
   [User's name]
   ---

   Should I adjust anything before you send?"
   ```

4. **Delegation Assistance**
   ```
   User: "I'm always the one who remembers the kids' vitamins"

   AlphaMa: "That's invisible labor that could be shared. Want me
   to draft a message to [partner] about taking over vitamin duty?

   I can frame it as a specific, concrete handoff rather than a
   complaint - that tends to work better. Yes?"
   ```

**Response Pattern:**
```
1. Acknowledge (brief)
2. Extract/capture what was mentioned
3. Identify the invisible labor underneath
4. Propose concrete next step or draft
5. Ask for confirmation/adjustment
```

---

### Brain 3: Growth Brain (The Coach)

**Purpose:** Support her career development and help her raise kids for a 2035 world.

**Triggers (when to activate):**
- Career mentions: "promotion", "work", "boss", "presentation", "imposter"
- Parenting philosophy: "how do I teach", "screen time", "AI", "future"
- Identity questions: "who am I", "I used to be", "I've lost myself"
- Leadership challenges: "managing team", "difficult conversation"

**Two Sub-Modes:**

#### A. Career Coach Mode
```
User: "I have a big presentation to the board next week and I'm terrified"

AlphaMa: "Board presentations are high-stakes. Let's break this down.

What's the actual fear?
- Being judged on content? → Let's bulletproof your argument
- Being seen as 'less committed' as a mom? → That's imposter syndrome, not reality
- Forgetting what to say? → We can build a recovery framework

Which resonates most? I can help with all three, but let's start with
the one keeping you up at night."
```

#### B. "Parenting for 2035" Mode
```
User: "My 5-year-old is obsessed with YouTube. Am I ruining him?"

AlphaMa: "Let's zoom out to 2035. He'll be 19, entering a workforce
where AI does most routine tasks.

What will matter then isn't whether he watched YouTube at 5. It's:
- Can he think critically about what he consumes?
- Can he create, not just consume?
- Does he know how to learn new things?
- Can he connect with humans authentically?

For right now: quality over quantity. Watch WITH him sometimes.
Ask 'why do you think that happened?' Build critical thinking into
the screen time rather than just fighting it.

Want me to suggest some co-viewing conversation starters?"
```

**Response Pattern:**
```
1. Identify the real question underneath
2. Provide frameworks, not just answers
3. Connect to long-term thinking (2035 lens)
4. Offer concrete next step
5. Position her as capable of figuring this out (empowerment, not dependency)
```

---

## Technical Architecture

### System Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                         USER'S DEVICE (iOS/Android)                     │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     REACT NATIVE + EXPO APP                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  │  │
│  │  │   Mind     │  │   Alpha    │  │    You     │  │  Sunday    │  │  │
│  │  │   Screen   │  │   Screen   │  │   Screen   │  │   Reset    │  │  │
│  │  │            │  │  (Main)    │  │ (Profile)  │  │   Screen   │  │  │
│  │  │ - To-dos   │  │ - Chat UI  │  │ - Settings │  │ - Weekly   │  │  │
│  │  │ - Worries  │  │ - Voice    │  │ - Onboard  │  │   Planner  │  │  │
│  │  │ - Appts    │  │ - Suggest  │  │ - Prefs    │  │ - Drafts   │  │  │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘  │  │
│  │                              │                                     │  │
│  │                              ▼                                     │  │
│  │  ┌──────────────────────────────────────────────────────────────┐ │  │
│  │  │                    LOCAL SERVICES LAYER                       │ │  │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │ │  │
│  │  │  │   Voice     │  │   Storage   │  │    Conversation     │   │ │  │
│  │  │  │  Service    │  │   Service   │  │      Context        │   │ │  │
│  │  │  │ (STT/TTS)   │  │(AsyncStore) │  │    (React Ctx)      │   │ │  │
│  │  │  └─────────────┘  └─────────────┘  └─────────────────────┘   │ │  │
│  │  └──────────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS / API Calls
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           CLOUD SERVICES                                │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      AI ORCHESTRATION LAYER                       │  │
│  │                                                                    │  │
│  │   ┌─────────────────────────────────────────────────────────┐    │  │
│  │   │                    CLAUDE API (Sonnet)                   │    │  │
│  │   │              + Executive Co-Pilot System Prompt          │    │  │
│  │   └─────────────────────────────────────────────────────────┘    │  │
│  │                              │                                    │  │
│  │          ┌───────────────────┼───────────────────┐               │  │
│  │          ▼                   ▼                   ▼               │  │
│  │   ┌────────────┐     ┌────────────┐     ┌────────────┐          │  │
│  │   │ Emotional  │     │  Logistic  │     │   Growth   │          │  │
│  │   │   Brain    │     │   Brain    │     │   Brain    │          │  │
│  │   │   (CBT)    │     │  (Tasks)   │     │  (Coach)   │          │  │
│  │   └────────────┘     └────────────┘     └────────────┘          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      MEMORY & CONTEXT LAYER                       │  │
│  │   ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐   │  │
│  │   │   Vector DB    │  │  User Profile  │  │  Conversation    │   │  │
│  │   │   (ChromaDB)   │  │   Database     │  │    History       │   │  │
│  │   │                │  │                │  │                  │   │  │
│  │   │ - RAG content  │  │ - Preferences  │  │ - Full logs      │   │  │
│  │   │ - Frameworks   │  │ - Kids info    │  │ - Summaries      │   │  │
│  │   │ - Embeddings   │  │ - Calendar     │  │ - Patterns       │   │  │
│  │   └────────────────┘  └────────────────┘  └──────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                       ACTION/INTEGRATION LAYER                    │  │
│  │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │  │
│  │   │  Google  │  │ Outlook  │  │  Email   │  │   Future:    │    │  │
│  │   │ Calendar │  │ Calendar │  │  Draft   │  │  Instacart   │    │  │
│  │   │   API    │  │   API    │  │  Service │  │  Amazon API  │    │  │
│  │   └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Example

```
User speaks: "I'm exhausted and I have that presentation tomorrow"
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. VOICE SERVICE: Convert speech to text                    │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. MODE DETECTION: Analyze intent                           │
│    - "exhausted" → Emotional signal (HIGH)                  │
│    - "presentation tomorrow" → Task signal (MEDIUM)         │
│    - Decision: Lead with Emotional Brain, then Logistic     │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. CONTEXT RETRIEVAL: Pull relevant memory                  │
│    - User had 3 hrs sleep (mentioned yesterday)             │
│    - Presentation is Q4 review (from calendar)              │
│    - Pattern: Pre-presentation anxiety (occurred 2x before) │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. CLAUDE API: Generate response with full context          │
│    System prompt + User context + Conversation history      │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. RESPONSE:                                                │
│    "I hear exhaustion AND presentation nerves - that's a    │
│    rough combo. Your body needs rest but your brain won't   │
│    let go.                                                   │
│                                                              │
│    I pulled up your Q4 deck - you've done this before and   │
│    crushed it. This is your third quarterly review.         │
│                                                              │
│    Two things: What would help most right now?              │
│    A) Quick brain dump of what's worrying you about tomorrow│
│    B) I draft your opening 2 sentences so it feels less big │
│    C) Just vent, no fixing"                                 │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. CAPTURE: Store mental load items                         │
│    - Worry: Presentation anxiety                            │
│    - To-do: Presentation prep (if not done)                 │
│    - Pattern: Pre-event anxiety → log for future            │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. TTS: Speak response back to user                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Current State Assessment

### What's Built (January 2026)

| Component | Status | Details |
|-----------|--------|---------|
| **React Native App** | ✅ Complete | Expo-based, runs on iOS/Android/Web |
| **Navigation** | ✅ Complete | 3-tab layout (Mind, Alpha, You) |
| **Onboarding** | ✅ Complete | 5 steps: Welcome → Stage → Name → Concerns → Ready |
| **Alpha Screen UI** | ✅ Complete | Chat bubbles, suggestions, voice button (UI only) |
| **Mind Screen UI** | ✅ Complete | Filterable list, mock data |
| **Profile Screen** | ✅ Complete | Settings structure |
| **Design System** | ✅ Complete | Dusty rose, sage green, warm gold palette |
| **System Prompt** | ✅ Complete | Executive Co-Pilot persona with CBT, proactive style |
| **Claude API Setup** | ✅ Complete | API key configured, tested working |
| **Simulated Responses** | ✅ Complete | Keyword-based, matches new persona |
| **Voice Input** | ❌ Not started | Button exists, no STT |
| **Voice Output** | ❌ Not started | No TTS |
| **Conversation Persistence** | ✅ Complete | AsyncStorage, auto-save/load |
| **Mental Load Capture** | ✅ Complete | Enhanced regex extraction, shared context, persistence |
| **Mode Detection** | ❌ Not started | All goes through same prompt |
| **Memory/Context** | ❌ Not started | No long-term memory |
| **Calendar Integration** | ❌ Not started | — |
| **Sunday Reset** | ❌ Not started | — |

### Key Files

```
mental-health-app/
├── App.tsx                           # Entry point, navigation + providers
├── .env.example                      # Environment variable template
├── src/
│   ├── screens/
│   │   ├── AlphaScreen.tsx           # Main conversation + persistence
│   │   ├── MindScreen.tsx            # Mental load display (real data)
│   │   ├── ProfileScreen.tsx         # Settings
│   │   └── OnboardingScreen.tsx      # First-time flow
│   ├── services/
│   │   ├── ai.ts                     # Claude API + enhanced parsing
│   │   └── storage.ts                # AsyncStorage for persistence
│   ├── contexts/
│   │   ├── UserContext.tsx           # User state management
│   │   └── MentalLoadContext.tsx     # Shared mental load state (NEW)
│   ├── config/
│   │   └── env.ts                    # API key + feature flags
│   └── constants/
│       └── theme.ts                  # Design tokens
├── package.json                      # Dependencies
├── PROJECT_CONTEXT.md                # Product vision doc
├── VISION.md                         # Detailed vision doc
└── IMPLEMENTATION_PLAN.md            # This file
```

---

## Implementation Phases

### Phase 1A: Core AI Loop (Week 1-2)
**Goal:** Make the AI actually work end-to-end with real responses.

#### Tasks:
- [x] **1A.1** Set up API key management ✅
  - Move key to environment variable
  - Create `.env.example` template
  - Update `env.ts` to read from `process.env`
  - Auto-fallback to simulated mode when no API key

- [x] **1A.2** Test real Claude API ✅
  - Verified API calls work with real key
  - Error handling in place
  - Loading states implemented

- [x] **1A.3** Persist conversations ✅
  - Save to AsyncStorage on each message
  - Load on app start
  - Conversation summarization for old messages

- [x] **1A.4** Improve mental load parsing ✅
  - Better regex patterns for task extraction
  - Extract appointments with dates/times
  - Detect worries, delegation hints, ideas
  - Deduplication of captured items

- [x] **1A.5** Connect to Mind screen ✅
  - Created MentalLoadContext for shared state
  - Replace mock data with real captured items
  - Sync between Alpha and Mind screens
  - Allow marking items complete

#### Files to Modify:
```
src/config/env.ts          - Environment variable handling
src/services/ai.ts         - Error handling, parsing improvements
src/screens/AlphaScreen.tsx - Persistence, loading states
src/screens/MindScreen.tsx  - Real data connection
src/contexts/              - Add ConversationContext.tsx
```

---

### Phase 1B: Three Brains Mode Detection (Week 3-4) ✅ COMPLETE
**Goal:** Route conversations intelligently to the right "brain."

#### Tasks:
- [x] **1B.1** Create mode detection service ✅
  - Keyword-based scoring for emotional/task/growth signals
  - Crisis detection with priority override
  - Primary + secondary mode with blending

- [x] **1B.2** Implement Emotional Brain module ✅
  - 6 CBT techniques (reframing, catastrophe scale, thought challenging, etc.)
  - 4 grounding exercises (5-4-3-2-1, box breathing, STOP, self-compassion)
  - Full crisis response protocol

- [x] **1B.3** Implement Logistic Brain module ✅
  - Invisible labor patterns for 8+ common scenarios
  - Delegation opportunity detection
  - 6 draft templates (partner, school, appointments, etc.)

- [x] **1B.4** Implement Growth Brain module ✅
  - 5 career coaching frameworks (imposter syndrome, negotiation, etc.)
  - 4 Gen Alpha parenting frameworks (screen time, EQ, failure, critical thinking)
  - 2035 lens integration

- [x] **1B.5** Integrate with main AI service ✅
  - Dynamic system prompt enhancement based on mode
  - Mode blending when signals are mixed
  - Mode logging for debugging

#### New Files Created:
```
src/services/modeDetection.ts   - Intent classification (200+ lines)
src/services/emotionalBrain.ts  - CBT techniques, crisis handling (250+ lines)
src/services/logisticBrain.ts   - Task extraction, drafting (230+ lines)
src/services/growthBrain.ts     - Coaching frameworks (280+ lines)
```

---

### Phase 1C: Sunday Reset MVP (Week 5-6) ✅ COMPLETE
**Goal:** Build the "killer feature" - weekly planning assistant.

#### The Feature:
Every Sunday evening, the user opens Sunday Reset and:
1. Does a brain dump (voice or text) of the upcoming week
2. AlphaMa processes and returns:
   - **Top 3 Stressors** - What will weigh on her most
   - **Automated Drafts** - Ready-to-send emails/texts
   - **Bio-Break Schedule** - Where she can fit 5-min breathing
   - **Prep Checklist** - Invisible labor for the week
3. Optionally: 1-minute audio summary she can listen to

#### Tasks:
- [x] **1C.1** Create Sunday Reset screen ✅
  - Brain dump text input with prompts
  - Processing state with animation
  - Results view with expandable cards

- [x] **1C.2** Build processing logic ✅
  - AI-powered parsing via Claude API
  - Stressor ranking by impact
  - Invisible labor detection
  - Simulated fallback for testing

- [x] **1C.3** Generate outputs ✅
  - AI-generated stressor analysis with action items
  - Ready-to-send draft messages (text and email)
  - Bio-break scheduling with suggestions

- [x] **1C.4** Add to navigation ✅
  - Fourth tab "Reset" in bottom navigation
  - Full-screen dedicated experience

#### New Files Created:
```
src/screens/SundayResetScreen.tsx  - Full Sunday Reset UI (500+ lines)
src/services/sundayReset.ts        - Processing logic (250+ lines)
```

---

### Phase 2A: Voice Integration (Week 7-8)
**Goal:** Enable hands-free mode for busy moms.

#### Tasks:
- [ ] **2A.1** Implement Speech-to-Text
  - Install `expo-speech` or `@react-native-voice/voice`
  - Handle permissions
  - Real-time transcription UI

- [ ] **2A.2** Implement Text-to-Speech
  - Install TTS library
  - Natural voice selection
  - Speed/pitch controls

- [ ] **2A.3** Create voice mode UI
  - Full-screen voice interface
  - Waveform visualization
  - Interrupt handling

#### Dependencies:
```json
{
  "expo-speech": "^12.0.0",
  "@react-native-voice/voice": "^3.2.4"
}
```

---

### Phase 2B: Memory & Personalization (Week 9-10)
**Goal:** AI remembers everything about her life.

#### What to Remember:
- Kids' names, ages, allergies, schools
- Partner's name and work schedule
- Her work schedule and role
- Recurring stressors and patterns
- Past conversations (summarized)
- Preferences (communication style, triggers)

#### Tasks:
- [ ] **2B.1** Choose and set up vector database
  - ChromaDB for local-first privacy
  - Or Pinecone for cloud scalability

- [ ] **2B.2** Implement memory service
  - Store user facts as embeddings
  - Retrieve relevant context per message
  - Update facts from conversations

- [ ] **2B.3** Add RAG for AlphaMothers content
  - Embed coaching frameworks
  - Gen Alpha parenting guides
  - CBT technique library

- [ ] **2B.4** Conversation summarization
  - Summarize old conversations
  - Store summaries, delete raw logs
  - Pattern detection over time

---

### Phase 2C: Calendar & Email Integration (Week 11-12)
**Goal:** Actually see and act on her schedule.

#### Tasks:
- [ ] **2C.1** Google Calendar OAuth
  - Sign-in flow
  - Read calendar events
  - Create/modify events

- [ ] **2C.2** Outlook Calendar OAuth
  - Microsoft Graph API
  - Same capabilities as Google

- [ ] **2C.3** Email summarization
  - Connect to Gmail/Outlook
  - Summarize school newsletters
  - Flag action items

- [ ] **2C.4** Draft sending
  - Generate drafts in-app
  - One-click send (with confirmation)

---

### Phase 3: Advanced Features (Month 4+)
- Apple Watch integration (heart rate, stress detection)
- Autonomous agents (book appointments, order groceries)
- AI-matched mom "Squads"
- Personalized 10-year parenting roadmap
- HIPAA compliance for healthcare partnerships

---

## Feature Specifications

### Specification: Sunday Reset

#### User Flow
```
1. User opens Sunday Reset (Sunday 6pm notification or manual)
                    │
                    ▼
2. Welcome screen: "Let's get your week organized.
   Brain dump everything coming up - I'll sort it out."
                    │
                    ▼
3. Input screen: Large text area + voice button
   User dumps: "Monday I have that board meeting,
   Tuesday kids have dentist, need to figure out
   birthday gift for Emma's party Saturday,
   feeling anxious about the presentation..."
                    │
                    ▼
4. Processing screen: "Organizing your week..." (3-5 sec)
                    │
                    ▼
5. Results screen (scrollable):

   ┌─────────────────────────────────────────┐
   │ 🎯 YOUR TOP 3 STRESSORS                 │
   ├─────────────────────────────────────────┤
   │ 1. Board meeting (Monday)               │
   │    → Presentation anxiety detected      │
   │    → Prep time blocked: Sunday 8-9pm    │
   │                                         │
   │ 2. Birthday gift for Emma (Saturday)    │
   │    → No gift purchased yet              │
   │    → Amazon link ready: [Suggested gift]│
   │                                         │
   │ 3. Kids dentist coordination (Tuesday)  │
   │    → Who's taking? Not assigned         │
   │    → Draft message to partner ready     │
   └─────────────────────────────────────────┘

   ┌─────────────────────────────────────────┐
   │ 📝 READY-TO-SEND DRAFTS                 │
   ├─────────────────────────────────────────┤
   │ To: Partner                             │
   │ "Can you handle Tuesday dentist?        │
   │  I have back-to-backs until 3pm."       │
   │                        [Edit] [Send]    │
   ├─────────────────────────────────────────┤
   │ To: Emma's mom                          │
   │ "Emma can't wait for Saturday!          │
   │  Any dietary restrictions for the       │
   │  cake?"                 [Edit] [Send]   │
   └─────────────────────────────────────────┘

   ┌─────────────────────────────────────────┐
   │ 🧘 YOUR BIO-BREAK WINDOWS               │
   ├─────────────────────────────────────────┤
   │ Mon 7:00am  - 5 min before meeting      │
   │ Wed 12:30pm - Lunch break gap           │
   │ Fri 3:00pm  - Between calls             │
   │                                         │
   │ [Add breathing reminders to calendar]   │
   └─────────────────────────────────────────┘
                    │
                    ▼
6. Optional: "Want me to read you the summary?" [Play Audio]
```

#### Technical Implementation
```typescript
// src/services/sundayReset.ts

interface WeeklyStressor {
  id: string;
  title: string;
  date: string;
  stressLevel: 'high' | 'medium' | 'low';
  reason: string;
  actionItem?: string;
}

interface DraftMessage {
  id: string;
  to: string;
  subject?: string;
  body: string;
  type: 'email' | 'text';
}

interface BioBreak {
  id: string;
  datetime: string;
  duration: number; // minutes
  suggestion: string;
}

interface SundayResetOutput {
  stressors: WeeklyStressor[];
  drafts: DraftMessage[];
  bioBreaks: BioBreak[];
  audioSummary?: string; // URL or base64
}

async function processSundayReset(
  brainDump: string,
  calendarEvents?: CalendarEvent[],
  userContext?: UserContext
): Promise<SundayResetOutput> {
  // 1. Send to Claude with specialized prompt
  // 2. Parse structured output
  // 3. Cross-reference with calendar
  // 4. Generate drafts
  // 5. Find bio-break slots
  // 6. Return organized output
}
```

---

## Data Privacy & Security

### Principles
1. **Local-First**: Process on device when possible
2. **Minimize Collection**: Only store what's necessary
3. **Encrypt Everything**: E2E encryption for all personal data
4. **User Control**: Easy export and delete
5. **Transparent**: Clear about what's stored and why

### Implementation
```
┌─────────────────────────────────────────────────────────────┐
│                    DATA CLASSIFICATION                       │
├─────────────────────────────────────────────────────────────┤
│ SENSITIVE (encrypted, local-only):                          │
│ - Mental health conversations                               │
│ - Emotional state logs                                      │
│ - Family information                                        │
│ - Relationship discussions                                  │
├─────────────────────────────────────────────────────────────┤
│ FUNCTIONAL (encrypted, may sync):                           │
│ - Task lists                                                │
│ - Calendar events                                           │
│ - Preferences                                               │
├─────────────────────────────────────────────────────────────┤
│ ANONYMOUS (may be used for improvement):                    │
│ - Feature usage patterns                                    │
│ - Error logs (no PII)                                       │
│ - Aggregate engagement metrics                              │
└─────────────────────────────────────────────────────────────┘
```

### Future: HIPAA Compliance
For healthcare partnerships:
- BAA (Business Associate Agreement) ready
- Audit logging
- Access controls
- Data retention policies

---

## Technical Decisions

| Decision | Options Considered | Choice | Rationale |
|----------|-------------------|--------|-----------|
| **Framework** | React Native, Flutter | React Native + Expo | Already built, good ecosystem |
| **AI Model** | GPT-4, Claude, Gemini | Claude (Sonnet) | Better at nuanced conversation, Anthropic values |
| **Vector DB** | Pinecone, Weaviate, ChromaDB | ChromaDB | Local-first for privacy, free |
| **Voice STT** | expo-speech, Whisper, Google | expo-speech | Expo ecosystem, simple |
| **Voice TTS** | expo-speech, ElevenLabs | ElevenLabs | More natural voice |
| **Auth** | Firebase, Supabase, Auth0 | Supabase | Good free tier, PostgreSQL |
| **Storage** | AsyncStorage, SQLite, Realm | AsyncStorage + SQLite | Simple start, upgrade path |
| **Calendar** | Google, Outlook, Apple | Google first | Most common, best API |

---

## File Structure (Target State)

```
mental-health-app/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── .env.local                        # API keys (git-ignored)
├── .env.example                      # Template for env vars
│
├── src/
│   ├── screens/
│   │   ├── AlphaScreen.tsx           # Main conversation
│   │   ├── MindScreen.tsx            # Mental load manager
│   │   ├── ProfileScreen.tsx         # Settings & profile
│   │   ├── OnboardingScreen.tsx      # First-time setup
│   │   └── SundayResetScreen.tsx     # NEW: Weekly planning
│   │
│   ├── components/
│   │   ├── ChatBubble.tsx
│   │   ├── VoiceButton.tsx
│   │   ├── SuggestionChips.tsx
│   │   ├── MentalLoadCard.tsx
│   │   ├── StressorCard.tsx          # NEW
│   │   ├── DraftPreview.tsx          # NEW
│   │   └── BioBreakSchedule.tsx      # NEW
│   │
│   ├── services/
│   │   ├── ai.ts                     # Claude API + orchestration
│   │   ├── modeDetection.ts          # NEW: Intent classification
│   │   ├── emotionalBrain.ts         # NEW: CBT module
│   │   ├── logisticBrain.ts          # NEW: Task module
│   │   ├── growthBrain.ts            # NEW: Coaching module
│   │   ├── sundayReset.ts            # NEW: Weekly planning
│   │   ├── voice.ts                  # NEW: STT/TTS
│   │   ├── memory.ts                 # NEW: Vector DB
│   │   ├── calendar.ts               # NEW: Google/Outlook
│   │   └── storage.ts                # NEW: Persistence layer
│   │
│   ├── contexts/
│   │   ├── UserContext.tsx           # User state
│   │   └── ConversationContext.tsx   # NEW: Chat history
│   │
│   ├── hooks/
│   │   ├── useVoice.ts               # NEW: Voice input/output
│   │   ├── useMemory.ts              # NEW: Context retrieval
│   │   └── useCalendar.ts            # NEW: Calendar access
│   │
│   ├── config/
│   │   └── env.ts                    # Environment variables
│   │
│   ├── constants/
│   │   ├── theme.ts                  # Design tokens
│   │   └── prompts.ts                # NEW: System prompts
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces
│
├── assets/
│   └── logo.jpeg
│
├── docs/
│   ├── PROJECT_CONTEXT.md
│   └── VISION.md
│
└── IMPLEMENTATION_PLAN.md            # This file
```

---

## Success Metrics

### Phase 1 Success Criteria
- [ ] User can have real conversation with Claude (not simulated)
- [ ] Conversations persist across app sessions
- [ ] Mental load items appear in Mind screen from conversations
- [ ] Sunday Reset generates useful weekly summary
- [ ] 3 test users complete full onboarding + conversation

### Phase 2 Success Criteria
- [ ] User can speak to app (voice input works)
- [ ] App speaks back (TTS works)
- [ ] Calendar events visible in app
- [ ] AI references past conversations accurately
- [ ] Draft emails generate correctly

### North Star Metric
**"Mental Load Items Resolved Per Week"**
- Not just captured, but marked as done or delegated
- Shows the app is actually reducing cognitive burden

---

## Context for Future Claude Sessions

### If you're a Claude instance reading this:

**What is this project?**
AlphaMa is a React Native mobile app that serves as an AI mental health companion and executive assistant for mothers. It's part of the Alpha Mothers ecosystem (which also includes a website at alphamothers.com).

**Who is the user?**
Shivi Agarwal - a tech professional on maternity leave building this product. She has experience at Infosys, Deloitte, and Salesforce.

**What's the current state?**
- UI is mostly complete
- Claude API integration exists but needs testing with real key
- System prompt has been upgraded to "Executive Co-Pilot" persona
- No voice, no persistence, no calendar integration yet

**What should you focus on?**
Check the [Implementation Phases](#implementation-phases) section for current priorities. As of January 2026, focus is on **Phase 1A: Core AI Loop**.

**Key files to read:**
1. `src/services/ai.ts` - AI integration and system prompt
2. `src/screens/AlphaScreen.tsx` - Main conversation UI
3. `docs/PROJECT_CONTEXT.md` - Product vision
4. `docs/VISION.md` - Detailed vision document

**Design principles:**
1. Proactive, not reactive
2. Executive-level peer, not servile assistant
3. CBT-informed emotional support
4. "Invisible labor" detection
5. 2035 parenting lens

**Don't forget:**
- The website is separate (Next.js, different git repo)
- API key must come from environment variable (was hardcoded, got flagged)
- User values privacy highly - local-first when possible
