import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:phonics_reading_app/app.dart';

void main() {
  testWidgets('App should build without errors', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      const ProviderScope(
        child: PhonicsReadingApp(),
      ),
    );

    // Verify the app starts (splash screen should be visible)
    expect(find.text('PhonicsAI'), findsOneWidget);
  });
}
