import 'react-native-reanimated';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PortalProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </PortalProvider>
    </SafeAreaProvider>
  );
}
