import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white',
      },
    }}>
      <Stack.Screen name={'MapScreen'} component={MapScreen} />
      <Stack.Screen name={'PermissionsScreen'} component={PermissionsScreen} />
      <Stack.Screen name={'LoadingScreen'} component={LoadingScreen} />
    </Stack.Navigator>
  );
};
