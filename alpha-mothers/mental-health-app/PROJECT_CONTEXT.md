# Alpha - AI Life Partner for Moms

**Last Updated:** January 22, 2026
**Vision Version:** 2.0 - Complete Redesign

---

## Product Vision

Alpha is not an app. It's an **AI life partner** that handles the mental load so mothers can be present. Through voice-first conversations, Alpha combines the emotional support of a therapist with the practical help of an executive assistant and the coordination power of a family manager.

> "Alpha handles the mental load so you can be present."

See `VISION.md` for complete product vision, user stories, and example conversations.

---

## Major Redesign (Jan 22, 2026)

The app was completely redesigned from a traditional mental health tracking app to a voice-first AI companion. Key changes:

### Old Approach (Deprecated)
- Daily check-ins with mood/energy tracking
- Progress charts and analytics
- Static guided sessions
- To-do list style interface

### New Approach (Current)
- **Voice-first conversations** - Talk, don't type
- **AI companion "Alpha"** - Therapist + Executive Assistant + Family Coordinator
- **Mental load capture** - Auto-extracts to-dos, worries, appointments from conversation
- **Minimal UI** - One main action: Open → Talk
- **Proactive intelligence** - Alpha anticipates needs and takes action

---

## Tech Stack

- **Framework:** React Native with Expo (v54)
- **Language:** TypeScript
- **Navigation:** React Navigation (Bottom Tabs + Native Stack)
- **Storage:** AsyncStorage for local persistence
- **State:** React Context API
- **AI (Planned):** Claude API for conversations
- **Voice (Planned):** React Native Voice / Expo Speech

---

## Current Screens

### Main Navigation (3 Tabs)

| Tab | Screen | File | Description |
|-----|--------|------|-------------|
| Mind | MindScreen | `src/screens/MindScreen.tsx` | Mental load manager - captured to-dos, worries, appointments |
| **Alpha** | AlphaScreen | `src/screens/AlphaScreen.tsx` | Main voice-first conversation screen (center tab, emphasized) |
| You | ProfileScreen | `src/screens/ProfileScreen.tsx` | User profile and settings |

### Other Screens

| Screen | File | Description |
|--------|------|-------------|
| Onboarding | `src/screens/OnboardingScreen.tsx` | 5-step onboarding (Welcome → Stage → Name → Concerns → Ready) |

---

## Five Layers of Alpha

The app is designed to eventually support five layers of support:

### Layer 1: Emotional Support (MVP - In Progress)
- Voice conversations anytime
- Processes emotions, validates feelings
- Remembers user's story, struggles, wins
- Therapeutic conversation techniques

### Layer 2: Mental Load Capture (MVP - In Progress)
- Auto-captures from conversation (to-dos, worries, appointments, ideas)
- Displays in Mind screen
- Reminds at the right time

### Layer 3: Active Management (Phase 2)
- Calendar integration (Google/Outlook)
- Email triage and summaries
- Meeting prep and smart prioritization

### Layer 4: Family Coordination (Phase 3)
- Partner linking and shared lists
- Task delegation via SMS
- Fair division suggestions
- Meal planning

### Layer 5: Proactive Intelligence (Phase 4)
- Anticipates needs (checkups, renewals)
- Pattern recognition
- Life admin automation

---

## File Structure

```
mental-health-app/
├── App.tsx                          # Main entry with minimal 3-tab navigation
├── index.ts                         # Expo entry point
├── package.json                     # Dependencies
├── PROJECT_CONTEXT.md               # This file
├── VISION.md                        # Complete product vision document
├── src/
│   ├── screens/
│   │   ├── AlphaScreen.tsx          # ✅ Main conversation screen
│   │   ├── MindScreen.tsx           # ✅ Mental load manager
│   │   ├── ProfileScreen.tsx        # ✅ User settings
│   │   ├── OnboardingScreen.tsx     # ✅ 5-step onboarding
│   │   ├── HomeScreen.tsx           # (Legacy - not in current nav)
│   │   ├── ChatScreen.tsx           # (Legacy - replaced by AlphaScreen)
│   │   ├── CheckInScreen.tsx        # (Legacy - not in current nav)
│   │   ├── ProgressScreen.tsx       # (Legacy - not in current nav)
│   │   ├── JournalScreen.tsx        # (Legacy - not in current nav)
│   │   ├── ReturnToWorkScreen.tsx   # (Legacy - not in current nav)
│   │   └── GenAlphaScreen.tsx       # (Legacy - not in current nav)
│   ├── components/                  # Reusable components
│   ├── services/
│   │   └── storage.ts               # AsyncStorage service
│   ├── contexts/
│   │   └── UserContext.tsx          # User state with onboarding
│   ├── constants/
│   │   └── theme.ts                 # Design system
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── hooks/
│   ├── utils/
│   └── assets/
```

---

## What's Working Now

1. **App Navigation** - 3-tab layout (Mind | Alpha | You) with Alpha as center/main
2. **Onboarding Flow** - Captures user stage and concerns
3. **Alpha Screen** - Voice-first conversation UI with:
   - Message bubbles for user and Alpha
   - Captured items bar showing "On your mind" items
   - Voice recording button (UI only, not functional)
   - Simulated AI responses based on keywords
4. **Mind Screen** - Mental load manager with:
   - Filter by type (To-Do, Worry, Appointment, Delegation, Idea)
   - Mark items as resolved
   - Mock data (to be replaced with captured items)
5. **Profile Screen** - User settings and info

---

## What's Next

### Immediate (Phase 1 - Foundation)

1. **Real Voice Input**
   - Integrate React Native Voice or Expo Speech
   - Speech-to-text for conversation input

2. **Real AI Responses**
   - Integrate Claude API for conversation
   - Implement therapeutic + assistant personality
   - Memory system for context

3. **Text-to-Speech**
   - Alpha speaks responses aloud
   - Natural voice (ElevenLabs or similar)

4. **Mental Load Capture**
   - Parse conversation for to-dos, worries, appointments
   - Save to storage
   - Display in Mind screen

### Future Phases

- **Phase 2:** Calendar integration (Google/Outlook)
- **Phase 3:** Email integration (Gmail/Outlook triage)
- **Phase 4:** Family coordination (partner linking, SMS delegation)
- **Phase 5:** Proactive intelligence

---

## Commands

```bash
# Navigate to app directory
cd /Users/shiviagarwal/Desktop/ClaudeCode/claude-skills-pack/alpha-mothers/mental-health-app

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

---

## Related Projects

- **Website:** `/Users/shiviagarwal/Desktop/ClaudeCode/claude-skills-pack/alpha-mothers/website`
  - Next.js website (updated to reflect new Alpha vision)
  - Includes example conversations and five layers of support

- **Vision Document:** `VISION.md` in this directory
  - Complete product vision
  - User personas (Sarah, Maya, Priya, Rachel, Jess)
  - Full example conversations
  - Business model and pricing
  - Technical architecture plans

---

## Design Notes

### Brand Identity
- **Alpha** - The AI life partner
- **Voice-first** - Talk, don't type
- **Minimal UI** - Reduces mental load, doesn't add to it
- **Warm & Calm** - Safe space aesthetic

### Colors
- **Primary (Dusty Rose):** #8B5A6B - nurturing, warm
- **Secondary (Warm Gold):** #D4A574 - empowerment
- **Accent (Sage Green):** #5B7B6F - growth, calm
- **Background:** #FAF8F5 - warm white
- **Cream:** #FDF5ED - warm accent

### Mental Load Item Types
- **To-Do:** Tasks to complete
- **Worry:** Things on your mind
- **Appointment:** Scheduled events
- **Delegation:** Tasks for partner/family
- **Idea:** Things to remember/explore

---

## Session Summary (Jan 22, 2026)

### Completed Today:
1. Created comprehensive `VISION.md` with:
   - Complete product vision and positioning
   - Five layers of support
   - Five detailed user personas
   - Full example conversations (for marketing)
   - Technical architecture roadmap
   - Business model and pricing

2. Redesigned mobile app:
   - Created new `AlphaScreen.tsx` - voice-first conversation interface
   - Created new `MindScreen.tsx` - mental load manager
   - Updated `App.tsx` with minimal 3-tab navigation
   - Alpha-centric design (center tab, emphasized)

3. Updated website:
   - Updated homepage with new Alpha positioning
   - Updated app page with five layers and full conversations
   - Added example conversation displays
   - Updated pricing to match vision

4. Updated this `PROJECT_CONTEXT.md` with current state

### Key Documents:
- `VISION.md` - The source of truth for product direction
- `PROJECT_CONTEXT.md` - Technical context and status
- Website pages - Public-facing vision

---

## Notes

1. The app is using **simulated AI responses** - needs Claude API integration
2. Voice input is **UI only** - needs speech-to-text integration
3. Mental load capture is **mock data** - needs to parse from conversation
4. Legacy screens (HomeScreen, ChatScreen, etc.) are not removed but not in navigation
5. The website has been updated to reflect the new vision with example conversations
