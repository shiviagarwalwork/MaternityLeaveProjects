import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';

/// PIN entry screen for parent access
class ParentPinScreen extends StatefulWidget {
  const ParentPinScreen({super.key});

  @override
  State<ParentPinScreen> createState() => _ParentPinScreenState();
}

class _ParentPinScreenState extends State<ParentPinScreen> {
  String _enteredPin = '';
  bool _hasError = false;
  final String _correctPin = '1234'; // TODO: Get from secure storage

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              const Spacer(),

              // Lock icon
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  color: AppColors.primary.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.lock_outline_rounded,
                  size: 40,
                  color: AppColors.primary,
                ),
              ),

              const SizedBox(height: 24),

              Text(
                'Parent Area',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),

              const SizedBox(height: 8),

              Text(
                'Enter your 4-digit PIN',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.textSecondary,
                    ),
              ),

              const SizedBox(height: 32),

              // PIN dots
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(4, (index) {
                  final isFilled = index < _enteredPin.length;
                  return AnimatedContainer(
                    duration: const Duration(milliseconds: 150),
                    margin: const EdgeInsets.symmetric(horizontal: 8),
                    width: 20,
                    height: 20,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isFilled
                          ? (_hasError ? AppColors.error : AppColors.primary)
                          : Colors.transparent,
                      border: Border.all(
                        color: _hasError
                            ? AppColors.error
                            : (isFilled ? AppColors.primary : AppColors.textLight),
                        width: 2,
                      ),
                    ),
                  );
                }),
              ),

              if (_hasError) ...[
                const SizedBox(height: 16),
                Text(
                  'Incorrect PIN. Try again.',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: AppColors.error,
                      ),
                ),
              ],

              const Spacer(),

              // Number pad
              _NumberPad(
                onKeyPressed: _onKeyPressed,
                onDelete: _onDelete,
              ),

              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  void _onKeyPressed(String key) {
    if (_enteredPin.length < 4) {
      setState(() {
        _enteredPin += key;
        _hasError = false;
      });

      if (_enteredPin.length == 4) {
        _validatePin();
      }
    }
  }

  void _onDelete() {
    if (_enteredPin.isNotEmpty) {
      setState(() {
        _enteredPin = _enteredPin.substring(0, _enteredPin.length - 1);
        _hasError = false;
      });
    }
  }

  void _validatePin() {
    if (_enteredPin == _correctPin) {
      context.go('/parent/dashboard');
    } else {
      setState(() {
        _hasError = true;
        _enteredPin = '';
      });
    }
  }
}

class _NumberPad extends StatelessWidget {
  final Function(String) onKeyPressed;
  final VoidCallback onDelete;

  const _NumberPad({
    required this.onKeyPressed,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _NumberKey(number: '1', onPressed: onKeyPressed),
            _NumberKey(number: '2', onPressed: onKeyPressed),
            _NumberKey(number: '3', onPressed: onKeyPressed),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _NumberKey(number: '4', onPressed: onKeyPressed),
            _NumberKey(number: '5', onPressed: onKeyPressed),
            _NumberKey(number: '6', onPressed: onKeyPressed),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _NumberKey(number: '7', onPressed: onKeyPressed),
            _NumberKey(number: '8', onPressed: onKeyPressed),
            _NumberKey(number: '9', onPressed: onKeyPressed),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(width: 80, height: 80),
            _NumberKey(number: '0', onPressed: onKeyPressed),
            SizedBox(
              width: 80,
              height: 80,
              child: IconButton(
                onPressed: onDelete,
                icon: const Icon(
                  Icons.backspace_outlined,
                  size: 28,
                  color: AppColors.textSecondary,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _NumberKey extends StatelessWidget {
  final String number;
  final Function(String) onPressed;

  const _NumberKey({
    required this.number,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80,
      height: 80,
      margin: const EdgeInsets.symmetric(horizontal: 8),
      child: Material(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(40),
        child: InkWell(
          onTap: () => onPressed(number),
          borderRadius: BorderRadius.circular(40),
          child: Center(
            child: Text(
              number,
              style: const TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
