# AlphaMa App - Implementation Plan

> Last Updated: January 23, 2026
> Status: Planning Phase

## Vision

Transform AlphaMa from a simple chatbot into a **Proactive AI Operating System for Mothers** - moving from reactive (user asks) to proactive (app anticipates and solves).

---

## The Three Brains Architecture

The app needs three distinct "brains" to solve the mental load:

### 1. Emotional Brain (Therapy Companion)
- Real-time CBT (Cognitive Behavioral Therapy)
- Burnout prevention and crisis detection
- Neurobiological insights for anxiety/guilt
- Future: Bio-feedback via Apple Watch sync

### 2. Logistic Brain (The Assistant)
- Manages "Invisible Labor" (calendars, school forms, meal planning)
- Task extraction with dates, owners, urgency
- "Task under the task" detection (birthday party → gift + RSVP + calendar + transport)
- Future: Autonomous agents that actually book/pay/order

### 3. Growth Brain (The Coach)
- Career and leadership development
- "Parenting for 2035" - Gen Alpha specific insights
- AI literacy guidance for kids
- Future: Personalized 10-year parenting roadmap

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React Native + Expo)            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │
│  │  Mind   │  │  Alpha  │  │   You   │  │  Sunday Reset   │ │
│  │  Tab    │  │   Tab   │  │   Tab   │  │    Feature      │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘ │
│                         │                                    │
│              Voice Input (STT) / Voice Output (TTS)          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    BRAIN LAYER (AI Orchestration)            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Claude API (Sonnet)                   ││
│  │         + Executive Co-Pilot System Prompt               ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │     RAG     │  │   Memory    │  │   Mode Detection    │  │
│  │ (Coaching   │  │  (Vector    │  │ (Emotional/Logic/   │  │
│  │ Frameworks) │  │    DB)      │  │     Growth)         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ACTION LAYER (APIs)                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐ │
│  │  Google   │  │  Outlook  │  │  Instacart│  │  Amazon  │ │
│  │ Calendar  │  │   Email   │  │    API    │  │   API    │ │
│  └───────────┘  └───────────┘  └───────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Current State (January 2026)

| Component | Status | Notes |
|-----------|--------|-------|
| React Native + Expo | ✅ Done | 3-tab navigation, polished UI |
| Onboarding Flow | ✅ Done | 5-step, captures stage + concerns |
| System Prompt | ✅ Done | Executive Co-Pilot persona |
| Claude API Integration | ⚠️ Partial | Code exists, needs API key |
| Simulated Responses | ✅ Done | Keyword-based, matches persona |
| Voice Input | ❌ UI Only | Button exists, no audio capture |
| Voice Output (TTS) | ❌ Not started | — |
| Mental Load Capture | ⚠️ Basic | Simple keyword detection |
| Conversation Persistence | ❌ Not started | Resets on app close |
| Memory/Vector DB | ❌ Not started | — |
| RAG | ❌ Not started | — |
| Calendar Integration | ❌ Not started | — |
| Email Integration | ❌ Not started | — |
| Sunday Reset | ❌ Not started | — |

---

## Implementation Phases

### Phase 1A: Core AI Loop (Foundation)
**Goal:** Make the AI actually work end-to-end

- [ ] Set up Anthropic API key management (env variables)
- [ ] Test real Claude API responses
- [ ] Implement conversation history persistence (AsyncStorage)
- [ ] Improve mental load parsing (extract to-dos, worries, appointments)
- [ ] Connect parsed items to Mind screen (replace mock data)

**Files to modify:**
- `src/config/env.ts` - API key from environment
- `src/services/ai.ts` - Improve parsing logic
- `src/screens/AlphaScreen.tsx` - Persist conversations
- `src/screens/MindScreen.tsx` - Use real captured items

---

### Phase 1B: Three Brains Mode Detection
**Goal:** Route conversations to the right "brain"

- [ ] Create mode detection logic (emotional vs logistic vs growth)
- [ ] Emotional Brain: Detect distress, use CBT techniques
- [ ] Logistic Brain: Extract tasks, propose solutions, draft messages
- [ ] Growth Brain: Career/parenting coaching mode

**New files:**
- `src/services/modeDetection.ts` - Classify user intent
- `src/services/emotionalBrain.ts` - CBT responses
- `src/services/logisticBrain.ts` - Task management
- `src/services/growthBrain.ts` - Coaching responses

---

### Phase 1C: Sunday Reset MVP
**Goal:** Build the "killer feature"

- [ ] Create Sunday Reset screen/modal
- [ ] Manual input: upcoming stressors, events, concerns
- [ ] AI generates:
  - Top 3 stressors for the week
  - Draft emails/messages for tasks
  - Suggested "bio-break" times
- [ ] 1-minute voice summary (TTS)

**New files:**
- `src/screens/SundayResetScreen.tsx`
- `src/services/sundayReset.ts`

---

### Phase 2A: Voice Integration
**Goal:** Hands-free mode for busy moms

- [ ] Speech-to-Text (expo-speech or react-native-voice)
- [ ] Text-to-Speech for Alpha's responses
- [ ] "Hey Alpha" wake word (stretch goal)

**Dependencies:**
- `expo-speech` or `@react-native-voice/voice`
- ElevenLabs API (for natural TTS) or expo-speech

---

### Phase 2B: Memory & Personalization
**Goal:** AI remembers everything

- [ ] Choose vector database (Pinecone, Weaviate, or local)
- [ ] Store user context (kid allergies, work schedule, preferences)
- [ ] Implement RAG with AlphaMothers coaching frameworks
- [ ] Conversation summarization for long-term memory

**Considerations:**
- Privacy: Local-first vs cloud
- Cost: Vector DB pricing
- Performance: Query latency

---

### Phase 2C: Calendar & Email Integration
**Goal:** Autonomous task execution

- [ ] Google Calendar OAuth integration
- [ ] Outlook Calendar OAuth integration
- [ ] Email summarization (school emails, newsletters)
- [ ] Draft email/message generation
- [ ] One-click send (with user approval)

**Dependencies:**
- Google Calendar API
- Microsoft Graph API
- OAuth flow implementation

---

### Phase 3: Advanced Features (Future)
- Bio-feedback via Apple Watch (heart rate, stress detection)
- Autonomous agents (book appointments, order groceries)
- AI-matched mom "Squads" (community feature)
- Personalized 10-year parenting roadmap
- HIPAA compliance audit

---

## Data Privacy Requirements

Since we handle mental health and family data:

1. **Local Processing**: Move as much AI processing to device as possible
2. **End-to-End Encryption**: All personal logs encrypted
3. **Data Minimization**: Only collect what's necessary
4. **User Control**: Easy export and delete
5. **Future**: HIPAA compliance for healthcare partnerships

---

## Key Technical Decisions Needed

| Decision | Options | Recommendation |
|----------|---------|----------------|
| Vector DB | Pinecone, Weaviate, ChromaDB, Local | ChromaDB (local-first for privacy) |
| Voice STT | expo-speech, react-native-voice, Whisper | expo-speech (Expo ecosystem) |
| Voice TTS | expo-speech, ElevenLabs | ElevenLabs (more natural) |
| Calendar | Google, Outlook, Apple | Google first (most common) |
| Auth | Firebase, Supabase, Auth0 | Supabase (good free tier) |

---

## File Structure (Target)

```
mental-health-app/
├── src/
│   ├── screens/
│   │   ├── AlphaScreen.tsx      # Main conversation
│   │   ├── MindScreen.tsx       # Mental load manager
│   │   ├── ProfileScreen.tsx    # Settings
│   │   ├── SundayResetScreen.tsx # NEW: Weekly planning
│   │   └── OnboardingScreen.tsx
│   ├── services/
│   │   ├── ai.ts                # Claude API + system prompt
│   │   ├── modeDetection.ts     # NEW: Route to correct brain
│   │   ├── emotionalBrain.ts    # NEW: CBT + crisis support
│   │   ├── logisticBrain.ts     # NEW: Task management
│   │   ├── growthBrain.ts       # NEW: Coaching
│   │   ├── sundayReset.ts       # NEW: Weekly summary
│   │   ├── voice.ts             # NEW: STT/TTS
│   │   ├── memory.ts            # NEW: Vector DB
│   │   └── calendar.ts          # NEW: Google/Outlook
│   ├── contexts/
│   │   ├── UserContext.tsx
│   │   └── ConversationContext.tsx # NEW: Persist history
│   └── config/
│       └── env.ts
├── IMPLEMENTATION_PLAN.md       # This file
└── PROJECT_CONTEXT.md           # Vision document
```

---

## Success Metrics

### Phase 1 Success
- [ ] Real AI conversations working
- [ ] Mental load items captured and displayed
- [ ] Conversations persist across sessions
- [ ] Sunday Reset generates useful output

### Phase 2 Success
- [ ] Voice input/output working
- [ ] Calendar events visible in app
- [ ] AI remembers user context across weeks
- [ ] Draft emails generate correctly

---

## Resources

- **Claude API Docs**: https://docs.anthropic.com/
- **Expo Speech**: https://docs.expo.dev/versions/latest/sdk/speech/
- **React Native Voice**: https://github.com/react-native-voice/voice
- **ElevenLabs**: https://elevenlabs.io/docs
- **Google Calendar API**: https://developers.google.com/calendar

---

## Notes for Future Claude Sessions

If you're a Claude instance reading this:
1. This is the AlphaMa mental health app for mothers
2. It uses React Native + Expo
3. The AI persona is "Executive Co-Pilot" (see `src/services/ai.ts`)
4. Current focus: Phase 1A (Core AI Loop)
5. Check `PROJECT_CONTEXT.md` and `VISION.md` in `/docs` for product vision
6. The website is separate: `/alpha-mothers/website/` (Next.js, deployed to alphamothers.com)
