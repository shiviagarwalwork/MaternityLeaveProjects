// Alpha Mothers Brand Theme

export const Colors = {
  // Primary - Dusty Rose (nurturing, warm)
  primary: '#8B5A6B',
  primaryLight: '#B8889A',
  primaryDark: '#6B4251',
  primary50: '#F9F5F6',
  primary100: '#F3EBF0',

  // Secondary - Warm Gold (empowerment)
  secondary: '#D4A574',
  secondaryLight: '#E8C9A8',
  secondaryDark: '#B8895A',

  // Accent - Sage Green (growth, calm)
  accent: '#5B7B6F',
  accentLight: '#8BA99B',
  accentDark: '#4A6459',

  // Neutral backgrounds
  cream: '#FDF8F3',
  blush: '#FAF0ED',
  sageMist: '#F0F4F2',
  background: '#FFFCFA',

  // Text
  foreground: '#2D2D2D',
  muted: '#6B6B6B',
  subtle: '#9B9B9B',

  // UI
  border: '#E8E4E0',
  card: '#FFFFFF',
  shadow: 'rgba(139, 90, 107, 0.1)',

  // Semantic
  success: '#4CAF50',
  warning: '#F5A623',
  error: '#E53935',

  // Mood colors
  mood1: '#E57373', // very low - soft red
  mood2: '#FFB74D', // low - orange
  mood3: '#FFF176', // neutral - yellow
  mood4: '#AED581', // good - light green
  mood5: '#81C784', // excellent - green

  // Mood colors for Progress screen
  moodPoor: '#E57373',
  moodFair: '#FFB74D',
  moodOkay: '#FFF176',
  moodGood: '#AED581',
  moodExcellent: '#81C784',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  display: 40,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadows = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const MoodEmojis = ['😔', '😐', '🙂', '😊', '🌟'];

export const MoodLabels = [
  'Struggling',
  'Low',
  'Okay',
  'Good',
  'Great',
];

export const EnergyLabels = [
  'Exhausted',
  'Tired',
  'Normal',
  'Energized',
  'Very Energized',
];
