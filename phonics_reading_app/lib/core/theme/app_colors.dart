import 'package:flutter/material.dart';

/// Child-friendly color palette for the reading app
class AppColors {
  AppColors._();

  // Primary colors - Warm, inviting purple
  static const Color primary = Color(0xFF7C4DFF);
  static const Color primaryLight = Color(0xFFB388FF);
  static const Color primaryDark = Color(0xFF651FFF);

  // Secondary colors - Playful teal
  static const Color secondary = Color(0xFF00BFA5);
  static const Color secondaryLight = Color(0xFF64FFDA);
  static const Color secondaryDark = Color(0xFF00897B);

  // Accent colors for feedback
  static const Color success = Color(0xFF4CAF50);
  static const Color successLight = Color(0xFFA5D6A7);
  static const Color warning = Color(0xFFFF9800);
  static const Color warningLight = Color(0xFFFFCC80);
  static const Color error = Color(0xFFEF5350);
  static const Color errorLight = Color(0xFFEF9A9A);

  // Fun colors for gamification
  static const Color gold = Color(0xFFFFD700);
  static const Color silver = Color(0xFFC0C0C0);
  static const Color bronze = Color(0xFFCD7F32);
  static const Color xpPurple = Color(0xFF9C27B0);
  static const Color streakOrange = Color(0xFFFF5722);

  // Background colors
  static const Color background = Color(0xFFF8F9FF);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color cardBackground = Color(0xFFFFFFFF);

  // Text colors
  static const Color textPrimary = Color(0xFF2D3142);
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textLight = Color(0xFF9CA3AF);
  static const Color textOnPrimary = Color(0xFFFFFFFF);

  // Stage colors (each learning stage has its own color)
  static const List<Color> stageColors = [
    Color(0xFFFF6B6B), // Stage 1: Letter Recognition - Red
    Color(0xFFFF9F43), // Stage 2: Letter Sounds - Orange
    Color(0xFFFECA57), // Stage 3: CVC Words - Yellow
    Color(0xFF5CD85A), // Stage 4: Consonant Blends - Green
    Color(0xFF48DBFB), // Stage 5: Sight Words - Cyan
    Color(0xFF54A0FF), // Stage 6: Sentences - Blue
    Color(0xFF9B59B6), // Stage 7: Short Stories - Purple
    Color(0xFFFF6B9D), // Stage 8: Chapter Books - Pink
  ];

  // Avatar background colors
  static const List<Color> avatarColors = [
    Color(0xFFFFCDD2),
    Color(0xFFE1BEE7),
    Color(0xFFBBDEFB),
    Color(0xFFB2DFDB),
    Color(0xFFFFF9C4),
    Color(0xFFFFCCBC),
  ];

  // Gradient for progress bars and achievements
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [primary, primaryLight],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient successGradient = LinearGradient(
    colors: [success, Color(0xFF81C784)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient goldGradient = LinearGradient(
    colors: [Color(0xFFFFD700), Color(0xFFFFA000)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
