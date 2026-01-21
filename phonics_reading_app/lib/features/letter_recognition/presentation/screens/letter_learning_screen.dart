import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

/// Screen for learning individual letters
class LetterLearningScreen extends StatefulWidget {
  final String letterId;

  const LetterLearningScreen({
    super.key,
    required this.letterId,
  });

  @override
  State<LetterLearningScreen> createState() => _LetterLearningScreenState();
}

class _LetterLearningScreenState extends State<LetterLearningScreen> {
  bool _isListening = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => context.pop(),
        ),
        title: LinearProgressIndicator(
          value: 0.3,
          backgroundColor: AppColors.primaryLight.withOpacity(0.3),
          valueColor: const AlwaysStoppedAnimation(AppColors.primary),
          minHeight: 8,
          borderRadius: BorderRadius.circular(4),
        ),
        actions: [
          // XP display
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.gold.withOpacity(0.15),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: const [
                Icon(Icons.star_rounded, color: AppColors.gold, size: 18),
                SizedBox(width: 4),
                Text(
                  '10',
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color: AppColors.gold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            const Spacer(),

            // Character/mascot placeholder
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: AppColors.primaryLight.withOpacity(0.3),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.sentiment_very_satisfied_rounded,
                size: 60,
                color: AppColors.primary,
              ),
            ),

            const SizedBox(height: 16),

            // Instruction text
            Text(
              'Say the letter',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: AppColors.textSecondary,
                  ),
            ),

            const SizedBox(height: 32),

            // Letter display
            Container(
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(32),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.stageColors[0].withOpacity(0.2),
                    blurRadius: 30,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Center(
                child: Text(
                  widget.letterId.toUpperCase(),
                  style: TextStyle(
                    fontSize: 120,
                    fontWeight: FontWeight.w800,
                    color: AppColors.stageColors[0],
                  ),
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Example word
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    color: AppColors.stageColors[0].withOpacity(0.15),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Icon(
                    Icons.apple,
                    size: 36,
                    color: Colors.red,
                  ),
                ),
                const SizedBox(width: 12),
                RichText(
                  text: TextSpan(
                    style: Theme.of(context).textTheme.headlineSmall,
                    children: [
                      TextSpan(
                        text: widget.letterId.toLowerCase(),
                        style: TextStyle(
                          fontWeight: FontWeight.w800,
                          color: AppColors.stageColors[0],
                        ),
                      ),
                      const TextSpan(
                        text: 'pple',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const Spacer(),

            // Microphone button
            GestureDetector(
              onTapDown: (_) => setState(() => _isListening = true),
              onTapUp: (_) => setState(() => _isListening = false),
              onTapCancel: () => setState(() => _isListening = false),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                width: _isListening ? 90 : 80,
                height: _isListening ? 90 : 80,
                decoration: BoxDecoration(
                  color: _isListening ? AppColors.error : AppColors.primary,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: (_isListening ? AppColors.error : AppColors.primary)
                          .withOpacity(0.4),
                      blurRadius: _isListening ? 30 : 20,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Icon(
                  _isListening ? Icons.mic : Icons.mic_none_rounded,
                  size: 36,
                  color: Colors.white,
                ),
              ),
            ),

            const SizedBox(height: 12),

            Text(
              _isListening ? 'Listening...' : 'Hold to speak',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: AppColors.textSecondary,
                  ),
            ),

            const SizedBox(height: 48),

            // Audio button
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _ActionButton(
                  icon: Icons.volume_up_rounded,
                  label: 'Hear it',
                  onTap: () {
                    // TODO: Play letter sound
                  },
                ),
                const SizedBox(width: 16),
                _ActionButton(
                  icon: Icons.skip_next_rounded,
                  label: 'Skip',
                  onTap: () => context.pop(),
                ),
              ],
            ),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _ActionButton({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: AppColors.textLight.withOpacity(0.2),
          ),
        ),
        child: Row(
          children: [
            Icon(icon, color: AppColors.textSecondary, size: 20),
            const SizedBox(width: 8),
            Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: AppColors.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
