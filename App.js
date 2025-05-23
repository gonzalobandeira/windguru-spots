import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortalProvider } from '@gorhom/portal';
import { View, Text, ActivityIndicator } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { initAmplitude } from './src/utils/amplitude';
import { Colors } from './src/constants/Styles';
import { checkForAppUpdate } from './src/utils/updateChecker';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Amplitude - errors are handled internally and won't throw
        await initAmplitude();
        
        // Check for app updates - this could still cause errors
        try {
          await checkForAppUpdate();
        } catch (updateError) {
          console.error('Error checking for updates:', updateError);
          // Don't set hasError for update check failures
        }
        
        // Complete initialization
        setIsInitializing(false);
      } catch (error) {
        console.error('Critical error initializing app:', error);
        setHasError(true);
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
        <Text style={{ color: Colors.error, textAlign: 'center', padding: 20 }}>
          Failed to initialize app. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PortalProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </PortalProvider>
    </SafeAreaProvider>
  );
}
