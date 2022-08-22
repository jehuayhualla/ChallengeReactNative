import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { NAVIGATION } from '@/constants';
import { Home, Sheets, Images } from '@/screens';
const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontWeight: "700",
          fontSize: 15
        },
        tabBarActiveTintColor: colors.activeTab,
        tabBarInactiveTintColor: colors.inactiveTab,
        tabBarIconStyle: { display: "none" },
      })}>
      <Tab.Screen name={NAVIGATION.home} component={Home} />
      <Tab.Screen name={NAVIGATION.images} component={Images} />
      <Tab.Screen name={NAVIGATION.sheets} component={Sheets} />
    </Tab.Navigator>
  );
}
