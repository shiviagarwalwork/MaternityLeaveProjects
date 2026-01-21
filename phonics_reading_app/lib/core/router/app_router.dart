import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../features/onboarding/presentation/screens/splash_screen.dart';
import '../../features/onboarding/presentation/screens/welcome_screen.dart';
import '../../features/onboarding/presentation/screens/parent_signup_screen.dart';
import '../../features/onboarding/presentation/screens/add_child_screen.dart';
import '../../shared/widgets/main_scaffold.dart';
import '../../features/letter_recognition/presentation/screens/home_screen.dart';
import '../../features/progress/presentation/screens/progress_map_screen.dart';
import '../../features/stories/presentation/screens/story_library_screen.dart';
import '../../features/letter_recognition/presentation/screens/letter_learning_screen.dart';
import '../../features/phonics/presentation/screens/phonics_practice_screen.dart';
import '../../features/cvc_words/presentation/screens/word_learning_screen.dart';
import '../../features/stories/presentation/screens/story_reader_screen.dart';
import '../../features/parent_dashboard/presentation/screens/parent_pin_screen.dart';
import '../../features/parent_dashboard/presentation/screens/parent_dashboard_screen.dart';

/// Route names for the app
class AppRoutes {
  AppRoutes._();

  // Onboarding
  static const String splash = '/';
  static const String welcome = '/welcome';
  static const String parentSignup = '/parent-signup';
  static const String addChild = '/add-child';

  // Main app (child)
  static const String home = '/home';
  static const String progressMap = '/progress';
  static const String storyLibrary = '/library';

  // Learning screens
  static const String letterLearning = '/home/letter/:letterId';
  static const String phonicsPractice = '/home/phonics/:phonemeId';
  static const String wordLearning = '/home/word/:wordId';
  static const String storyReader = '/library/story/:storyId';

  // Parent area
  static const String parentPin = '/parent';
  static const String parentDashboard = '/parent/dashboard';
  static const String parentSettings = '/parent/settings';
  static const String parentReports = '/parent/reports';
}

/// Navigation key for accessing navigator from anywhere
final rootNavigatorKey = GlobalKey<NavigatorState>();
final shellNavigatorKey = GlobalKey<NavigatorState>();

/// GoRouter configuration provider
final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    navigatorKey: rootNavigatorKey,
    initialLocation: AppRoutes.splash,
    debugLogDiagnostics: true,
    routes: [
      // Splash screen
      GoRoute(
        path: AppRoutes.splash,
        name: 'splash',
        builder: (context, state) => const SplashScreen(),
      ),

      // Welcome screen
      GoRoute(
        path: AppRoutes.welcome,
        name: 'welcome',
        builder: (context, state) => const WelcomeScreen(),
      ),

      // Parent signup
      GoRoute(
        path: AppRoutes.parentSignup,
        name: 'parentSignup',
        builder: (context, state) => const ParentSignupScreen(),
      ),

      // Add child profile
      GoRoute(
        path: AppRoutes.addChild,
        name: 'addChild',
        builder: (context, state) => const AddChildScreen(),
      ),

      // Main app shell with bottom navigation
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return MainScaffold(navigationShell: navigationShell);
        },
        branches: [
          // Home/Learning branch
          StatefulShellBranch(
            navigatorKey: shellNavigatorKey,
            routes: [
              GoRoute(
                path: AppRoutes.home,
                name: 'home',
                builder: (context, state) => const HomeScreen(),
                routes: [
                  // Letter learning
                  GoRoute(
                    path: 'letter/:letterId',
                    name: 'letterLearning',
                    builder: (context, state) => LetterLearningScreen(
                      letterId: state.pathParameters['letterId']!,
                    ),
                  ),
                  // Phonics practice
                  GoRoute(
                    path: 'phonics/:phonemeId',
                    name: 'phonicsPractice',
                    builder: (context, state) => PhonicsPracticeScreen(
                      phonemeId: state.pathParameters['phonemeId']!,
                    ),
                  ),
                  // Word learning
                  GoRoute(
                    path: 'word/:wordId',
                    name: 'wordLearning',
                    builder: (context, state) => WordLearningScreen(
                      wordId: state.pathParameters['wordId']!,
                    ),
                  ),
                ],
              ),
            ],
          ),

          // Progress map branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.progressMap,
                name: 'progressMap',
                builder: (context, state) => const ProgressMapScreen(),
              ),
            ],
          ),

          // Story library branch
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.storyLibrary,
                name: 'storyLibrary',
                builder: (context, state) => const StoryLibraryScreen(),
                routes: [
                  GoRoute(
                    path: 'story/:storyId',
                    name: 'storyReader',
                    builder: (context, state) => StoryReaderScreen(
                      storyId: state.pathParameters['storyId']!,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),

      // Parent area (outside main shell, requires PIN)
      GoRoute(
        path: AppRoutes.parentPin,
        name: 'parentPin',
        builder: (context, state) => const ParentPinScreen(),
        routes: [
          GoRoute(
            path: 'dashboard',
            name: 'parentDashboard',
            builder: (context, state) => const ParentDashboardScreen(),
          ),
        ],
      ),
    ],

    // Error page
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.error_outline,
              size: 64,
              color: Colors.red,
            ),
            const SizedBox(height: 16),
            Text(
              'Oops! Page not found',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text(
              state.error?.message ?? 'Something went wrong',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => context.go(AppRoutes.home),
              child: const Text('Go Home'),
            ),
          ],
        ),
      ),
    ),

    // Redirect logic
    redirect: (context, state) {
      // TODO: Add authentication checks here
      // final isLoggedIn = ref.read(authStateProvider);
      // final isOnboarding = state.matchedLocation == AppRoutes.splash ||
      //     state.matchedLocation == AppRoutes.welcome;

      // if (!isLoggedIn && !isOnboarding) {
      //   return AppRoutes.welcome;
      // }

      return null;
    },
  );
});
