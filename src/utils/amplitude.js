import { init, track, Identify, identify } from '@amplitude/analytics-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AMPLITUDE_API_KEY } from '@env';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as Localization from 'expo-localization';

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
    serverUrl: 'https://api.eu.amplitude.com/2/httpapi', // EU data center
  };

  try {
    init(AMPLITUDE_API_KEY, null, config);

    // Set user properties for device and app info using Identify
    const userProps = {
      device_type: Device.modelName,
      device_family: Device.deviceName,
      device_carrier: Device.carrier,
      language: Localization.locale,
      os: Device.osName,
      os_version: Device.osVersion,
      app_version: Application.nativeApplicationVersion,
    };
    const identifyObj = new Identify();
    Object.entries(userProps).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        identifyObj.set(key, value);
      }
    });
    identify(identifyObj);

    // Send a test event to verify Amplitude is working
    track('app_initialized', {
      timestamp: new Date().toISOString(),
      test_event: true
    });
  } catch (error) {
    console.error('Amplitude initialization error:', error);
  }
}; 