import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProvider } from './src/contexts/UserContext';
import { Colors, FontSizes } from './src/constants/theme';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import CheckInScreen from './src/screens/CheckInScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import JournalScreen from './src/screens/JournalScreen';
import ReturnToWorkScreen from './src/screens/ReturnToWorkScreen';
import GenAlphaScreen from './src/screens/GenAlphaScreen';

// Navigation types
export type RootStackParamList = {
  MainTabs: undefined;
  Journal: undefined;
  CheckIn: undefined;
  ReturnToWork: undefined;
  GenAlpha: undefined;
};

export type TabParamList = {
  Home: undefined;
  Alpha: undefined;
  CheckInTab: undefined;
  Progress: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const isCheckIn = route.name === 'CheckInTab';

        const icons: { [key: string]: string } = {
          Home: '🏠',
          Alpha: '💬',
          CheckInTab: '✨',
          Progress: '📊',
          Profile: '👤',
        };

        const labels: { [key: string]: string } = {
          Home: 'Home',
          Alpha: 'Alpha',
          CheckInTab: '',
          Progress: 'Progress',
          Profile: 'Profile',
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

        if (isCheckIn) {
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.checkInButton}
              onPress={onPress}
            >
              <View style={styles.checkInButtonInner}>
                <Text style={styles.checkInIcon}>{icons[route.name]}</Text>
              </View>
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

// Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alpha" component={ChatScreen} />
      <Tab.Screen name="CheckInTab" component={CheckInScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="Journal"
              component={JournalScreen}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="CheckIn"
              component={CheckInScreen}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="ReturnToWork"
              component={ReturnToWorkScreen}
              options={{
                presentation: 'card',
              }}
            />
            <Stack.Screen
              name="GenAlpha"
              component={GenAlphaScreen}
              options={{
                presentation: 'card',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
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
    opacity: 0.5,
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
  checkInButton: {
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkInIcon: {
    fontSize: 28,
  },
});
