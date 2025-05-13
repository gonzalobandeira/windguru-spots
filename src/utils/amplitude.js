import { init, track } from '@amplitude/analytics-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AMPLITUDE_API_KEY } from '@env';
import { Platform } from 'react-native';

// Initialize Amplitude
export const initAmplitude = () => {
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
    serverUrl: 'https://api.eu.amplitude.com/2/httpapi', // EU data center
  };

  try {
    init(AMPLITUDE_API_KEY, null, config);

    // Send a test event to verify Amplitude is working
    track('app_initialized', {
      timestamp: new Date().toISOString(),
      test_event: true
    });
  } catch (error) {
    console.error('Amplitude initialization error:', error);
  }
}; 