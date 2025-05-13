import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import AppNavigator from './src/navigation/AppNavigator';
import { initAmplitude } from './src/utils/amplitude';

export default function App() {
  useEffect(() => {
    initAmplitude();
  }, []);

  return (
    <SafeAreaProvider>
      <PortalProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </PortalProvider>
    </SafeAreaProvider>
  );
}
