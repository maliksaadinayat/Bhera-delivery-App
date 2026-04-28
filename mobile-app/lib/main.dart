import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        // Add providers here (Auth, Order, etc.)
      ],
      child: const BheraFoodApp(),
    ),
  );
}

class BheraFoodApp extends StatelessWidget {
  const BheraFoodApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bhera Smart Food Delivery',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFFF4B2B),
          primary: const Color(0xFFFF4B2B),
          secondary: const Color(0xFFFF416C),
        ),
        fontFamily: 'Inter',
      ),
      home: const LoginScreen(),
    );
  }
}
