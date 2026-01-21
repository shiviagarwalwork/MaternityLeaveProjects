import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/router/app_router.dart';

/// Welcome screen for new users
class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              const Spacer(),

              // Illustration placeholder
              Container(
                width: 280,
                height: 280,
                decoration: BoxDecoration(
                  color: AppColors.primaryLight.withOpacity(0.3),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.child_care_rounded,
                  size: 140,
                  color: AppColors.primary,
                ),
              ),

              const SizedBox(height: 48),

              // Title
              Text(
                'Welcome to\nPhonicsAI!',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.displaySmall?.copyWith(
                      fontWeight: FontWeight.w800,
                      color: AppColors.textPrimary,
                    ),
              ),

              const SizedBox(height: 16),

              // Subtitle
              Text(
                'The fun way for kids to learn\nreading with AI-powered phonics',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: AppColors.textSecondary,
                    ),
              ),

              const Spacer(),

              // Get Started button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => context.go(AppRoutes.parentSignup),
                  child: const Text('Get Started'),
                ),
              ),

              const SizedBox(height: 16),

              // Already have account
              TextButton(
                onPressed: () {
                  // TODO: Navigate to login
                },
                child: const Text('I already have an account'),
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
