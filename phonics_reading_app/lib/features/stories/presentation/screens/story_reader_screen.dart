import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

/// Screen for reading stories with highlighted words
class StoryReaderScreen extends StatefulWidget {
  final String storyId;

  const StoryReaderScreen({
    super.key,
    required this.storyId,
  });

  @override
  State<StoryReaderScreen> createState() => _StoryReaderScreenState();
}

class _StoryReaderScreenState extends State<StoryReaderScreen> {
  int _currentPage = 0;
  int _highlightedWordIndex = -1;

  // Example story data
  final List<Map<String, dynamic>> _pages = [
    {
      'text': 'The cat sat on the mat.',
      'words': ['The', 'cat', 'sat', 'on', 'the', 'mat.'],
    },
    {
      'text': 'It was a big, fat cat.',
      'words': ['It', 'was', 'a', 'big,', 'fat', 'cat.'],
    },
    {
      'text': 'The cat saw a rat.',
      'words': ['The', 'cat', 'saw', 'a', 'rat.'],
    },
  ];

  @override
  Widget build(BuildContext context) {
    final page = _pages[_currentPage];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => context.pop(),
        ),
        title: Text('Page ${_currentPage + 1} of ${_pages.length}'),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded),
            onPressed: _playPageAudio,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: (_currentPage + 1) / _pages.length,
                  minHeight: 6,
                  backgroundColor: AppColors.primaryLight.withOpacity(0.3),
                  valueColor: const AlwaysStoppedAnimation(AppColors.primary),
                ),
              ),
            ),

            // Illustration placeholder
            Expanded(
              flex: 2,
              child: Container(
                margin: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: AppColors.stageColors[5].withOpacity(0.15),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Center(
                  child: Icon(
                    _currentPage == 2 ? Icons.pest_control_rodent : Icons.pets,
                    size: 100,
                    color: AppColors.stageColors[5],
                  ),
                ),
              ),
            ),

            // Story text
            Expanded(
              flex: 1,
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 24),
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.primary.withOpacity(0.1),
                      blurRadius: 20,
                    ),
                  ],
                ),
                child: Center(
                  child: Wrap(
                    alignment: WrapAlignment.center,
                    spacing: 8,
                    runSpacing: 8,
                    children: List.generate(
                      (page['words'] as List).length,
                      (index) {
                        final word = (page['words'] as List)[index];
                        final isHighlighted = index == _highlightedWordIndex;

                        return GestureDetector(
                          onTap: () => _onWordTap(index),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: isHighlighted
                                  ? AppColors.stageColors[2]
                                  : Colors.transparent,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              word,
                              style: TextStyle(
                                fontSize: 28,
                                fontWeight: FontWeight.w600,
                                color: isHighlighted
                                    ? Colors.white
                                    : AppColors.textPrimary,
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              ),
            ),

            const SizedBox(height: 24),

            // Navigation buttons
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Row(
                children: [
                  // Previous button
                  if (_currentPage > 0)
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _previousPage,
                        icon: const Icon(Icons.arrow_back_rounded),
                        label: const Text('Back'),
                      ),
                    )
                  else
                    const Spacer(),

                  const SizedBox(width: 16),

                  // Next button
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: _nextPage,
                      icon: Icon(
                        _currentPage < _pages.length - 1
                            ? Icons.arrow_forward_rounded
                            : Icons.check_rounded,
                      ),
                      label: Text(
                        _currentPage < _pages.length - 1 ? 'Next' : 'Finish',
                      ),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }

  void _onWordTap(int index) {
    setState(() {
      _highlightedWordIndex = index;
    });
    // TODO: Play word audio
    Future.delayed(const Duration(milliseconds: 500), () {
      if (mounted) {
        setState(() {
          _highlightedWordIndex = -1;
        });
      }
    });
  }

  void _playPageAudio() {
    // TODO: Implement TTS for the page
    // Highlight each word as it's spoken
    _highlightWordsSequentially();
  }

  void _highlightWordsSequentially() async {
    final words = _pages[_currentPage]['words'] as List;
    for (int i = 0; i < words.length; i++) {
      if (!mounted) return;
      setState(() {
        _highlightedWordIndex = i;
      });
      await Future.delayed(const Duration(milliseconds: 400));
    }
    if (mounted) {
      setState(() {
        _highlightedWordIndex = -1;
      });
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      setState(() {
        _currentPage--;
        _highlightedWordIndex = -1;
      });
    }
  }

  void _nextPage() {
    if (_currentPage < _pages.length - 1) {
      setState(() {
        _currentPage++;
        _highlightedWordIndex = -1;
      });
    } else {
      _showCompletionDialog();
    }
  }

  void _showCompletionDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.auto_stories_rounded,
              size: 64,
              color: AppColors.primary,
            ),
            const SizedBox(height: 16),
            Text(
              'Story Complete!',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            const SizedBox(height: 8),
            const Text('You finished the story!'),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                Icon(Icons.star_rounded, color: AppColors.gold),
                SizedBox(width: 4),
                Text(
                  '+25 XP',
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
              child: const Text('Done'),
            ),
          ),
        ],
      ),
    );
  }
}
