import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { isFeatureEnabled } from '../../src/constants/FeatureFlags';

const PAYPAL_ME_URL = 'https://paypal.me/gonzalobandeira?country.x=ES&locale.x=es_ES'; 
export default function DonateScreen() {
  const handleDonate = async () => {
    try {
      await Linking.openURL(PAYPAL_ME_URL);
    } catch (error) {
      console.error('Error opening PayPal.Me:', error);
    }
  };

  if (!isFeatureEnabled('DONATE_FEATURE')) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Support Us' }} />
      <View style={styles.content}>
        <Text style={styles.title}>Support WindGuru Spots</Text>
        <Text style={styles.description}>
          If you find this app helpful, consider supporting its development with a donation.
          Your contribution helps us maintain and improve the app for everyone.
        </Text>
        <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
          <Text style={styles.donateButtonText}>Donate with PayPal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  donateButton: {
    backgroundColor: '#0070BA',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 