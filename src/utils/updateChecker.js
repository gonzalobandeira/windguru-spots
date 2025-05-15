import axios from 'axios';
import { Alert, Linking, Platform } from 'react-native';
import * as Application from 'expo-application';
import { APP_STORE_URL, ITUNES_LOOKUP_URL, UPDATE_APP_AVAILABLE } from '../constants/Messages';
import Constants from 'expo-constants';

export async function checkForAppUpdate() {
  if (Platform.OS !== 'ios') return;

  // Skip if running in Expo Go
  if (Constants.executionEnvironment === 'storeClient') {
    console.log('Skipping update check: running in Expo Go');
    return;
  }

  try {
    const response = await axios.get(ITUNES_LOOKUP_URL);

    if (response.data.resultCount === 0) return;

    const appStoreVersion = response.data.results[0].version;
    const currentVersion = Application.nativeApplicationVersion;

    if (compareVersions(currentVersion, appStoreVersion) < 0) {
      Alert.alert(
        'Update Available',
        UPDATE_APP_AVAILABLE,
        [
          { text: 'Later', style: 'cancel' },
          { text: 'Update', onPress: () => Linking.openURL(APP_STORE_URL) },
        ]
      );
    }
  } catch (error) {
    console.log('Error checking App Store version:', error);
  }
}

function compareVersions(v1, v2) {
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const n1 = a[i] || 0;
    const n2 = b[i] || 0;
    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }
  return 0;
}
