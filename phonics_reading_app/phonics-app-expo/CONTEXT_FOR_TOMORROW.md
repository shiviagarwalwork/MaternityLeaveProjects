# PhonicsAI - Development Context

## Project Overview
A high-end, AI-driven children's reading app (ages 3-10) built with React Native + Expo. Features phoneme-level speech detection, beautiful animations, and an 8-stage learning curriculum from basic letter recognition to reading chapter books.

## Technology Stack
- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Animations**: React Native Reanimated + Lottie (to be added)
- **Speech**: Azure Pronunciation Assessment API (primary), VOSK (offline fallback)
- **Backend**: Supabase (planned)

---

## Completed Work

### Project Setup
- [x] Created Expo project with TypeScript
- [x] Configured Expo Router with file-based navigation
- [x] Set up theme system with child-friendly colors

### Theme Files (`/src/theme/`)
- `colors.ts` - Child-friendly color palette with 8 stage colors
- `spacing.ts` - Consistent spacing values
- `index.ts` - Exports all theme values

### Screens Created

#### Onboarding (`/app/onboarding/`)
- `welcome.tsx` - Welcome screen with "Get Started" button
- `signup.tsx` - Parent email/password signup
- `add-child.tsx` - Child profile creation (avatar, name, age)

#### Main Tabs (`/app/(tabs)/`)
- `index.tsx` - Home screen with daily progress, streak, lesson card, practice grid
- `journey.tsx` - Progress map showing 8 learning stages with timeline
- `stories.tsx` - Story library with categories and featured story

#### Learning Screens (`/app/learn/`)
- `[letterId].tsx` - Letter learning with microphone button (A-Z)
- `word/[wordId].tsx` - CVC word learning with phoneme-by-phoneme highlighting
- `story/[storyId].tsx` - Story reader with word-by-word reading

#### Parent Area (`/app/parent/`)
- `index.tsx` - PIN screen (4-digit entry)
- `dashboard.tsx` - Parent dashboard with stats, skills progress, activity log, settings

---

## Pending Work (Priority Order)

### High Priority

1. **Integrate Real Speech Recognition**
   - Install `expo-av` for audio recording
   - Implement Azure Pronunciation Assessment API
   - Add VOSK for offline fallback
   - Create `src/services/speech.ts`

2. **Add Rive/Lottie Animations**
   - Install `rive-react-native` for mascot character
   - Create animated mascot that:
     - Listens while child speaks
     - Celebrates on correct answers
     - Encourages on mistakes
   - Add level-up celebration animations
   - Add confetti effects

3. **Connect to Supabase Backend**
   - Create Supabase project
   - Set up database schema (see plan file)
   - Implement authentication (parent login)
   - Implement progress tracking
   - Add offline sync

4. **Expand Content**
   - Add all 26 letters with descriptions
   - Add 100+ CVC words with images
   - Add 20+ short stories with illustrations
   - Add sight words (50+ common words)

### Medium Priority

5. **Gamification System**
   - XP points for completing activities
   - Badge system (20+ badges)
   - Streak tracking with freeze tokens
   - Daily challenges
   - Unlockable avatars/themes

6. **Adaptive Learning Algorithm**
   - Implement SM-2 spaced repetition variant
   - Track phoneme accuracy per child
   - Adjust difficulty based on performance
   - Personalized daily learning paths

7. **Audio System**
   - Text-to-speech for word pronunciation
   - Sound effects for feedback
   - Background music (optional)
   - Create `src/services/audio.ts`

### Lower Priority

8. **Parent Features**
   - Weekly email reports
   - Push notification reminders
   - Detailed skill breakdowns
   - Time limit settings that actually work

9. **Offline Mode**
   - Download content for offline use
   - Queue progress updates for sync
   - Implement VOSK local speech recognition

10. **Polish & Performance**
    - Add loading skeletons
    - Optimize images
    - Add haptic feedback
    - Test on real devices

---

## File Structure

```
phonics-app-expo/
├── app/
│   ├── _layout.tsx          # Root layout with navigation
│   ├── index.tsx            # Splash/redirect screen
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab bar configuration
│   │   ├── index.tsx        # Home screen
│   │   ├── journey.tsx      # Progress map
│   │   └── stories.tsx      # Story library
│   ├── learn/
│   │   ├── _layout.tsx      # Learning stack layout
│   │   ├── [letterId].tsx   # Letter learning
│   │   ├── word/
│   │   │   └── [wordId].tsx # Word learning
│   │   └── story/
│   │       └── [storyId].tsx # Story reader
│   ├── onboarding/
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── signup.tsx
│   │   └── add-child.tsx
│   └── parent/
│       ├── _layout.tsx
│       ├── index.tsx        # PIN screen
│       └── dashboard.tsx    # Parent dashboard
├── src/
│   └── theme/
│       ├── colors.ts
│       ├── spacing.ts
│       └── index.ts
├── assets/                  # Images, fonts (to be added)
├── app.json
├── package.json
└── tsconfig.json
```

---

## To Run the App

```bash
cd /Users/shiviagarwal/Desktop/ClaudeCode/claude-skills-pack/phonics_reading_app/phonics-app-expo
npx expo start
```

Then:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on physical device

---

## Key Design Decisions

1. **File-based Routing**: Using Expo Router for clean URL structure and deep linking
2. **Theme Centralization**: All colors, spacing, typography in `/src/theme/`
3. **Progressive Learning**: 8 stages from letters → chapter books
4. **Phoneme-First**: Focus on individual sounds before full words
5. **Parent Controls**: PIN-protected area with progress tracking

---

## Notes for Tomorrow

- Speech recognition is simulated (tap mic → success after attempts)
- Stories/words are hardcoded - need to create data files
- No actual audio playback yet
- No state persistence (Zustand or AsyncStorage needed)
- No authentication flow connected to backend

---

## Related Files

- **Original Plan**: `/Users/shiviagarwal/.claude/plans/twinkly-purring-iverson.md`
- **Flutter Version**: `/phonics-reading-app/` (alternative implementation)
