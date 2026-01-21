# Alpha Mothers Mental Health App - Project Context

**Last Updated:** January 20, 2026

## Overview

A React Native/Expo mental health companion app for millennial mothers navigating career, motherhood, and raising kids in the AI age.

---

## Tech Stack

- **Framework:** React Native with Expo (v54.0.31)
- **Language:** TypeScript
- **Navigation:** React Navigation (Bottom Tabs + Native Stack)
- **Storage:** AsyncStorage for local persistence
- **State:** React Context API

---

## What's COMPLETED

### Core Screens (6 screens)

| Screen | File | Status | Description |
|--------|------|--------|-------------|
| Home | `src/screens/HomeScreen.tsx` | ✅ Done | Dashboard with check-in card, insights, quick actions, modules |
| Chat | `src/screens/ChatScreen.tsx` | ✅ Done | AI companion "Alpha" with simulated responses |
| Check-In | `src/screens/CheckInScreen.tsx` | ✅ Done | 4-step daily check-in (mood, energy, sleep, notes) |
| Progress | `src/screens/ProgressScreen.tsx` | ✅ Done | Mood/energy charts, streaks, AI insights |
| Profile | `src/screens/ProfileScreen.tsx` | ✅ Done | User profile, settings, menu sections |
| Journal | `src/screens/JournalScreen.tsx` | ✅ Done | Journal entries list, writing mode with prompts |

### Module Screens (2 screens)

| Screen | File | Status | Description |
|--------|------|--------|-------------|
| Return to Work | `src/screens/ReturnToWorkScreen.tsx` | ✅ Done | 6-week program with tasks (exercises, scripts, readings) |
| Gen Alpha | `src/screens/GenAlphaScreen.tsx` | ✅ Done | Age-filtered content, weekly challenges, future skills |

### Infrastructure

| Component | File | Status | Description |
|-----------|------|--------|-------------|
| App Entry | `App.tsx` | ✅ Done | React Navigation with custom tab bar |
| Theme | `src/constants/theme.ts` | ✅ Done | Colors, spacing, typography, mood colors |
| Types | `src/types/index.ts` | ✅ Done | TypeScript interfaces for all data |
| User Context | `src/contexts/UserContext.tsx` | ✅ Done | Global user state management |
| Storage Service | `src/services/storage.ts` | ✅ Done | AsyncStorage CRUD operations |

---

## What's PENDING

### High Priority

1. **Navigation Integration**
   - Connect Return to Work and Gen Alpha screens to navigation
   - Add stack navigation for module detail screens
   - Back button functionality in module screens

2. **Data Persistence**
   - Connect storage service to screens
   - Save check-ins to AsyncStorage
   - Save journal entries to AsyncStorage
   - Load data on app start

3. **Real AI Integration**
   - Replace mock responses in ChatScreen with actual AI API
   - Pattern detection from check-in data
   - Personalized insights generation

### Medium Priority

4. **Reusable Components** (Empty: `src/components/`)
   - `Button.tsx` - Primary, secondary, outline variants
   - `Card.tsx` - Content cards with shadows
   - `Input.tsx` - Text input with validation
   - `MoodSelector.tsx` - Emoji mood picker
   - `ProgressBar.tsx` - Animated progress indicator
   - `InsightCard.tsx` - AI insight display

5. **Guided Sessions**
   - Audio player component
   - Session content data
   - Session detail screen
   - Background audio playback

6. **Onboarding Flow**
   - Welcome screens
   - Stage selection (pregnancy, postpartum, returning to work, etc.)
   - Initial profile setup
   - Notifications permission request

### Lower Priority

7. **Authentication**
   - Login/signup screens
   - Password reset flow
   - Social auth (Google, Apple)
   - Session management

8. **Push Notifications**
   - Daily reminder notifications
   - Check-in reminders
   - Weekly challenge notifications
   - Expo push notifications setup

9. **Analytics & Reporting**
   - More detailed progress charts
   - Monthly/yearly mood trends
   - Export data functionality
   - Printable reports for healthcare providers

10. **Testing**
    - Unit tests for storage service
    - Component tests
    - E2E tests with Detox
    - CI/CD setup

---

## File Structure

```
mental-health-app/
├── App.tsx                          # Main entry with navigation
├── index.ts                         # Expo entry point
├── package.json                     # Dependencies
├── PROJECT_CONTEXT.md               # This file
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx           # ✅ Dashboard
│   │   ├── ChatScreen.tsx           # ✅ AI companion
│   │   ├── CheckInScreen.tsx        # ✅ Daily check-in flow
│   │   ├── ProgressScreen.tsx       # ✅ Mood charts & insights
│   │   ├── ProfileScreen.tsx        # ✅ User settings
│   │   ├── JournalScreen.tsx        # ✅ Journal entries
│   │   ├── ReturnToWorkScreen.tsx   # ✅ RTW 6-week program
│   │   └── GenAlphaScreen.tsx       # ✅ AI parenting guide
│   ├── components/                  # ❌ EMPTY - needs components
│   ├── services/
│   │   └── storage.ts               # ✅ AsyncStorage service
│   ├── contexts/
│   │   └── UserContext.tsx          # ✅ User state
│   ├── constants/
│   │   └── theme.ts                 # ✅ Design system
│   ├── types/
│   │   └── index.ts                 # ✅ TypeScript types
│   ├── hooks/                       # ❌ EMPTY - needs custom hooks
│   ├── utils/                       # ❌ EMPTY - needs helpers
│   └── assets/                      # Icons and images
```

---

## Next Session TODO

1. **Quick Wins (Start Here)**
   - [ ] Add Return to Work and Gen Alpha to navigation stack
   - [ ] Wire up storage service to CheckInScreen (save check-ins)
   - [ ] Wire up storage service to JournalScreen (save entries)

2. **Create Basic Components**
   - [ ] Extract Button component from existing code
   - [ ] Extract Card component
   - [ ] Create MoodSelector as reusable component

3. **Test the App**
   - [ ] Run `npm start` to test on device/simulator
   - [ ] Test all navigation flows
   - [ ] Test check-in flow end-to-end

---

## Commands

```bash
# Navigate to app directory
cd /Users/shiviagarwal/Desktop/ClaudeCode/claude-skills-pack/alpha-mothers/mental-health-app

# Install dependencies (if needed)
npm install

# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

---

## Design Notes

### Brand Colors
- **Primary (Dusty Rose):** #8B5A6B - nurturing, warm
- **Secondary (Warm Gold):** #D4A574 - empowerment
- **Accent (Sage Green):** #5B7B6F - growth, calm

### Mood Colors
- Level 1 (Struggling): #E57373 (soft red)
- Level 2 (Low): #FFB74D (orange)
- Level 3 (Okay): #FFF176 (yellow)
- Level 4 (Good): #AED581 (light green)
- Level 5 (Great): #81C784 (green)

---

## Related Projects

- **Website:** `/Users/shiviagarwal/Desktop/ClaudeCode/claude-skills-pack/alpha-mothers/website`
  - Next.js website at localhost:3000
  - Includes About, Blog, Coaching, App pages

---

## Notes for Tomorrow

1. The app **compiles successfully** (TypeScript checks pass) but hasn't been tested on device yet
2. All screens are using **mock data** - need to connect to storage
3. Chat responses are **simulated** - no real AI integration yet
4. Module screens (RTW, Gen Alpha) **are now connected** to navigation stack
5. Consider adding an **Onboarding flow** before users see the main app
6. Run `npm start` to test on Expo Go

## Session Summary (Jan 20, 2026)

### Completed Today:
- Set up React Navigation (Bottom Tabs + Native Stack)
- Created 3 new screens: Progress, Profile, Journal
- Created 2 module screens: Return to Work, Gen Alpha
- Added AsyncStorage service for data persistence
- Fixed all TypeScript errors
- Connected all screens to navigation

### Total Screens: 8
1. HomeScreen - Dashboard
2. ChatScreen - AI Companion
3. CheckInScreen - Daily check-in
4. ProgressScreen - Charts & insights
5. ProfileScreen - Settings
6. JournalScreen - Journal entries
7. ReturnToWorkScreen - 6-week program
8. GenAlphaScreen - AI parenting guide
