import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { useColorScheme } from 'react-native';
import { theme } from '@/theme';

export function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer theme={theme[colorScheme]}>
      <AppNavigator />
    </NavigationContainer>
  );
}
