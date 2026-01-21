import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

/// Screen for learning words with phoneme-by-phoneme pronunciation
class WordLearningScreen extends StatefulWidget {
  final String wordId;

  const WordLearningScreen({
    super.key,
    required this.wordId,
  });

  @override
  State<WordLearningScreen> createState() => _WordLearningScreenState();
}

class _WordLearningScreenState extends State<WordLearningScreen> {
  int _currentPhonemeIndex = 0;
  bool _isListening = false;

  // Example word data - in real app this would come from a provider
  final String _word = 'cat';
  final List<String> _phonemes = ['c', 'a', 't'];

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
          value: (_currentPhonemeIndex + 1) / _phonemes.length,
          backgroundColor: AppColors.primaryLight.withOpacity(0.3),
          valueColor: const AlwaysStoppedAnimation(AppColors.primary),
          minHeight: 8,
          borderRadius: BorderRadius.circular(4),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            const Spacer(),

            // Instruction
            Text(
              'Sound it out!',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: AppColors.textSecondary,
                  ),
            ),

            const SizedBox(height: 32),

            // Word with highlighted phonemes
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_phonemes.length, (index) {
                final isActive = index == _currentPhonemeIndex;
                final isCompleted = index < _currentPhonemeIndex;

                return AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: isActive
                        ? AppColors.stageColors[2]
                        : isCompleted
                            ? AppColors.success.withOpacity(0.2)
                            : AppColors.surface,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: isActive
                        ? [
                            BoxShadow(
                              color: AppColors.stageColors[2].withOpacity(0.4),
                              blurRadius: 20,
                              offset: const Offset(0, 8),
                            ),
                          ]
                        : null,
                  ),
                  child: Text(
                    _phonemes[index].toUpperCase(),
                    style: TextStyle(
                      fontSize: 64,
                      fontWeight: FontWeight.w800,
                      color: isActive
                          ? Colors.white
                          : isCompleted
                              ? AppColors.success
                              : AppColors.textLight,
                    ),
                  ),
                );
              }),
            ),

            const SizedBox(height: 24),

            // Picture
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                color: AppColors.stageColors[2].withOpacity(0.15),
                borderRadius: BorderRadius.circular(24),
              ),
              child: const Icon(
                Icons.pets_rounded,
                size: 64,
                color: AppColors.textSecondary,
              ),
            ),

            const Spacer(),

            // Current phoneme hint
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(
                    Icons.lightbulb_outline_rounded,
                    color: AppColors.warning,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Say "${_getPhonemeSound(_phonemes[_currentPhonemeIndex])}"',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Microphone button
            GestureDetector(
              onTapDown: (_) => setState(() => _isListening = true),
              onTapUp: (_) {
                setState(() => _isListening = false);
                _handlePhonemeAttempt();
              },
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
          ],
        ),
      ),
    );
  }

  String _getPhonemeSound(String phoneme) {
    final sounds = {
      'c': 'kuh',
      'a': 'aaa',
      't': 'tuh',
    };
    return sounds[phoneme.toLowerCase()] ?? phoneme;
  }

  void _handlePhonemeAttempt() {
    // TODO: Implement actual speech recognition
    // For now, just advance to next phoneme
    if (_currentPhonemeIndex < _phonemes.length - 1) {
      setState(() {
        _currentPhonemeIndex++;
      });
    } else {
      // Word complete!
      _showSuccessDialog();
    }
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.celebration_rounded,
              size: 64,
              color: AppColors.gold,
            ),
            const SizedBox(height: 16),
            Text(
              'Great job!',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            const SizedBox(height: 8),
            Text(
              'You read "$_word"!',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Icon(Icons.star_rounded, color: AppColors.gold),
                SizedBox(width: 4),
                Text(
                  '+10 XP',
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color: AppColors.gold,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                context.pop();
              },
              child: const Text('Continue'),
            ),
          ),
        ],
      ),
    );
  }
}
