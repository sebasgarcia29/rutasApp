import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation/StackNavigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

export default function App() {

  const AppState = ({ children }: any) => {
    return (
      <PermissionsProvider>
        {children}
      </PermissionsProvider>
    );
  };



  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>

  );
}
