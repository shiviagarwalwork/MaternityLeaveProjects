/**
 * Child-friendly color palette for the reading app
 */
export const colors = {
  // Primary colors - Warm, inviting purple
  primary: '#7C4DFF',
  primaryLight: '#B388FF',
  primaryDark: '#651FFF',

  // Secondary colors - Playful teal
  secondary: '#00BFA5',
  secondaryLight: '#64FFDA',
  secondaryDark: '#00897B',

  // Accent colors for feedback
  success: '#4CAF50',
  successLight: '#A5D6A7',
  warning: '#FF9800',
  warningLight: '#FFCC80',
  error: '#EF5350',
  errorLight: '#EF9A9A',

  // Fun colors for gamification
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  xpPurple: '#9C27B0',
  streakOrange: '#FF5722',

  // Background colors
  background: '#F8F9FF',
  surface: '#FFFFFF',
  cardBackground: '#FFFFFF',

  // Text colors
  textPrimary: '#2D3142',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  // Stage colors (each learning stage has its own color)
  stageColors: [
    '#FF6B6B', // Stage 1: Letter Recognition - Red
    '#FF9F43', // Stage 2: Letter Sounds - Orange
    '#FECA57', // Stage 3: CVC Words - Yellow
    '#5CD85A', // Stage 4: Consonant Blends - Green
    '#48DBFB', // Stage 5: Sight Words - Cyan
    '#54A0FF', // Stage 6: Sentences - Blue
    '#9B59B6', // Stage 7: Short Stories - Purple
    '#FF6B9D', // Stage 8: Chapter Books - Pink
  ],

  // Avatar background colors
  avatarColors: [
    '#FFCDD2',
    '#E1BEE7',
    '#BBDEFB',
    '#B2DFDB',
    '#FFF9C4',
    '#FFCCBC',
  ],
} as const;

export type ColorKey = keyof typeof colors;
