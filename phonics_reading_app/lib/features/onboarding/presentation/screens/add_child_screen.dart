import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/router/app_router.dart';

/// Screen to add a child profile
class AddChildScreen extends StatefulWidget {
  const AddChildScreen({super.key});

  @override
  State<AddChildScreen> createState() => _AddChildScreenState();
}

class _AddChildScreenState extends State<AddChildScreen> {
  final _nameController = TextEditingController();
  int _selectedAge = 5;
  String _selectedAvatar = 'bear';

  final List<Map<String, dynamic>> _avatars = [
    {'id': 'bear', 'icon': Icons.pets, 'color': AppColors.stageColors[0]},
    {'id': 'owl', 'icon': Icons.nightlight_round, 'color': AppColors.stageColors[1]},
    {'id': 'fox', 'icon': Icons.cruelty_free, 'color': AppColors.stageColors[2]},
    {'id': 'rabbit', 'icon': Icons.eco, 'color': AppColors.stageColors[3]},
    {'id': 'dragon', 'icon': Icons.local_fire_department, 'color': AppColors.stageColors[4]},
    {'id': 'unicorn', 'icon': Icons.star, 'color': AppColors.stageColors[5]},
  ];

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Add Child'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Who\'s learning\nto read?',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),

              const SizedBox(height: 32),

              // Avatar selection
              Text(
                'Pick an avatar',
                style: Theme.of(context).textTheme.titleMedium,
              ),

              const SizedBox(height: 16),

              Wrap(
                spacing: 12,
                runSpacing: 12,
                children: _avatars.map((avatar) {
                  final isSelected = _selectedAvatar == avatar['id'];
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        _selectedAvatar = avatar['id'];
                      });
                    },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      width: 70,
                      height: 70,
                      decoration: BoxDecoration(
                        color: isSelected
                            ? avatar['color']
                            : avatar['color'].withOpacity(0.2),
                        shape: BoxShape.circle,
                        border: isSelected
                            ? Border.all(color: avatar['color'], width: 3)
                            : null,
                      ),
                      child: Icon(
                        avatar['icon'],
                        size: 32,
                        color: isSelected ? Colors.white : avatar['color'],
                      ),
                    ),
                  );
                }).toList(),
              ),

              const SizedBox(height: 32),

              // Name field
              Text(
                'Child\'s name',
                style: Theme.of(context).textTheme.titleMedium,
              ),

              const SizedBox(height: 12),

              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(
                  hintText: 'Enter name',
                  prefixIcon: Icon(Icons.child_care_rounded),
                ),
                textCapitalization: TextCapitalization.words,
              ),

              const SizedBox(height: 32),

              // Age selection
              Text(
                'Age',
                style: Theme.of(context).textTheme.titleMedium,
              ),

              const SizedBox(height: 12),

              Wrap(
                spacing: 12,
                runSpacing: 12,
                children: List.generate(8, (index) {
                  final age = index + 3; // Ages 3-10
                  final isSelected = _selectedAge == age;
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        _selectedAge = age;
                      });
                    },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      width: 56,
                      height: 56,
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppColors.primary
                            : AppColors.surface,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: isSelected
                              ? AppColors.primary
                              : AppColors.textLight.withOpacity(0.3),
                          width: 2,
                        ),
                      ),
                      child: Center(
                        child: Text(
                          '$age',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                            color: isSelected
                                ? Colors.white
                                : AppColors.textPrimary,
                          ),
                        ),
                      ),
                    ),
                  );
                }),
              ),

              const SizedBox(height: 48),

              // Continue button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _handleAddChild,
                  child: const Text('Start Learning!'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _handleAddChild() {
    if (_nameController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter your child\'s name')),
      );
      return;
    }

    // TODO: Save child profile
    context.go(AppRoutes.home);
  }
}
