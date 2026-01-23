import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProvider, useUser } from './src/contexts/UserContext';
import { Colors, FontSizes } from './src/constants/theme';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import AlphaScreen from './src/screens/AlphaScreen';
import MindScreen from './src/screens/MindScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
};

export type TabParamList = {
  Alpha: undefined;
  Mind: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Minimal Tab Bar - Alpha-focused
function MinimalTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const isAlpha = route.name === 'Alpha';

        const icons: { [key: string]: string } = {
          Alpha: '💬',
          Mind: '📋',
          Profile: '👤',
        };

        const labels: { [key: string]: string } = {
          Alpha: 'Talk',
          Mind: 'Mind',
          Profile: 'You',
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Alpha is the center, main action
        if (isAlpha) {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.alphaTab}
              onPress={onPress}
            >
              <View style={[styles.alphaTabInner, isFocused && styles.alphaTabActive]}>
                <Text style={styles.alphaTabIcon}>{icons[route.name]}</Text>
              </View>
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {labels[route.name]}
              </Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
          >
            <Text style={[styles.tabIcon, isFocused && styles.tabIconActive]}>
              {icons[route.name]}
            </Text>
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {labels[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Tab Navigator - Alpha-focused
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MinimalTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Alpha"
    >
      <Tab.Screen name="Mind" component={MindScreen} />
      <Tab.Screen name="Alpha" component={AlphaScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main Navigation with Onboarding Check
function AppNavigator() {
  const { isLoading, hasCompletedOnboarding, completeOnboarding } = useUser();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require('./assets/logo.jpeg')}
          style={styles.loadingLogo}
        />
        <Text style={styles.loadingTitle}>AlphaMa</Text>
        <Text style={styles.loadingSubtitle}>Your life partner</Text>
        <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 24 }} />
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppNavigator />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Loading Screen
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.foreground,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: Colors.muted,
    marginTop: 4,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.4,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: Colors.muted,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },

  // Alpha Tab (Center, emphasized)
  alphaTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -20,
  },
  alphaTabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  alphaTabActive: {
    backgroundColor: Colors.primary,
  },
  alphaTabIcon: {
    fontSize: 26,
  },
});
