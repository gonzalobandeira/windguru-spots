import { init, track, Identify, identify } from '@amplitude/analytics-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AMPLITUDE_API_KEY } from '@env';
import * as Application from 'expo-application';

// Initialize Amplitude
export const initAmplitude = async () => {
  if (!AMPLITUDE_API_KEY) {
    return;
  }
  const config = {
    storage: AsyncStorage,
    trackingOptions: {
      ipAddress: true, // Allow Amplitude to infer country
      language: true,
      platform: true,
      region: true,
      version: true,
    },
    trackingSessionEvents: true,
    serverZone: 'EU', // EU data center
  };
  try {
    init(AMPLITUDE_API_KEY, null, config);
    const userProps = {
      app_version: Application.nativeApplicationVersion,
    };
    const identifyObj = new Identify();
    Object.entries(userProps).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        identifyObj.set(key, value);
      }
    });
    identify(identifyObj);
    track('app_initialized', {
      timestamp: new Date().toISOString(),
      test_event: true
    });
  } catch (error) {
    // Silently ignore errors
  }
}; 