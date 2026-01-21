import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

/// Progress map showing the learning journey
class ProgressMapScreen extends StatelessWidget {
  const ProgressMapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Header
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Your Journey',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Keep learning to unlock new stages!',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: AppColors.textSecondary,
                          ),
                    ),
                  ],
                ),
              ),
            ),

            // Overall stats
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Row(
                  children: [
                    _StatCard(
                      icon: Icons.star_rounded,
                      value: '150',
                      label: 'XP',
                      color: AppColors.gold,
                    ),
                    const SizedBox(width: 12),
                    _StatCard(
                      icon: Icons.check_circle_rounded,
                      value: '12',
                      label: 'Lessons',
                      color: AppColors.success,
                    ),
                    const SizedBox(width: 12),
                    _StatCard(
                      icon: Icons.local_fire_department,
                      value: '3',
                      label: 'Streak',
                      color: AppColors.streakOrange,
                    ),
                  ],
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 24)),

            // Stages list
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final stages = [
                    {'name': 'Letter Recognition', 'progress': 0.8, 'unlocked': true},
                    {'name': 'Letter Sounds', 'progress': 0.3, 'unlocked': true},
                    {'name': 'CVC Words', 'progress': 0.0, 'unlocked': false},
                    {'name': 'Consonant Blends', 'progress': 0.0, 'unlocked': false},
                    {'name': 'Sight Words', 'progress': 0.0, 'unlocked': false},
                    {'name': 'Simple Sentences', 'progress': 0.0, 'unlocked': false},
                    {'name': 'Short Stories', 'progress': 0.0, 'unlocked': false},
                    {'name': 'Chapter Books', 'progress': 0.0, 'unlocked': false},
                  ];

                  final stage = stages[index];
                  return _StageCard(
                    stageNumber: index + 1,
                    name: stage['name'] as String,
                    progress: stage['progress'] as double,
                    isUnlocked: stage['unlocked'] as bool,
                    color: AppColors.stageColors[index],
                    isLast: index == stages.length - 1,
                  );
                },
                childCount: 8,
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;
  final Color color;

  const _StatCard({
    required this.icon,
    required this.value,
    required this.label,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.1),
              blurRadius: 10,
            ),
          ],
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 8),
            Text(
              value,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w800,
                color: color,
              ),
            ),
            Text(
              label,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }
}

class _StageCard extends StatelessWidget {
  final int stageNumber;
  final String name;
  final double progress;
  final bool isUnlocked;
  final Color color;
  final bool isLast;

  const _StageCard({
    required this.stageNumber,
    required this.name,
    required this.progress,
    required this.isUnlocked,
    required this.color,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline
          Column(
            children: [
              // Stage circle
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: isUnlocked ? color : AppColors.textLight.withOpacity(0.3),
                  shape: BoxShape.circle,
                  boxShadow: isUnlocked
                      ? [
                          BoxShadow(
                            color: color.withOpacity(0.3),
                            blurRadius: 10,
                          ),
                        ]
                      : null,
                ),
                child: Center(
                  child: isUnlocked
                      ? Text(
                          '$stageNumber',
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                            color: Colors.white,
                          ),
                        )
                      : const Icon(
                          Icons.lock_rounded,
                          color: Colors.white,
                          size: 20,
                        ),
                ),
              ),
              // Connector line
              if (!isLast)
                Container(
                  width: 3,
                  height: 60,
                  color: isUnlocked
                      ? color.withOpacity(0.3)
                      : AppColors.textLight.withOpacity(0.2),
                ),
            ],
          ),

          const SizedBox(width: 16),

          // Stage info
          Expanded(
            child: Container(
              margin: const EdgeInsets.only(bottom: 16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: isUnlocked ? AppColors.surface : AppColors.surface.withOpacity(0.5),
                borderRadius: BorderRadius.circular(16),
                border: progress > 0
                    ? Border.all(color: color.withOpacity(0.3), width: 2)
                    : null,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        name,
                        style: Theme.of(context).textTheme.titleSmall?.copyWith(
                              fontWeight: FontWeight.w700,
                              color: isUnlocked
                                  ? AppColors.textPrimary
                                  : AppColors.textLight,
                            ),
                      ),
                      if (progress >= 1.0)
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: AppColors.success,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Text(
                            'Complete',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                        ),
                    ],
                  ),
                  if (isUnlocked && progress > 0) ...[
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: progress,
                        minHeight: 6,
                        backgroundColor: color.withOpacity(0.2),
                        valueColor: AlwaysStoppedAnimation(color),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${(progress * 100).toInt()}% complete',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: AppColors.textSecondary,
                          ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
