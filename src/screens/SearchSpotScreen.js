import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SpotSearch from '../components/SpotSearch';
import { Colors } from '../constants/Styles';
import AppScreen from '../components/AppScreen';
import { MaterialIcons } from '@expo/vector-icons';

const SearchSpotScreen = ({ navigation }) => {
  const handleSpotSelect = (spot) => {
    navigation.navigate('ConfirmSpot', { spot });
  };

  const handleManualEntry = () => {
    navigation.navigate('ConfirmSpot', { spot: null });
  };

  return (
    <AppScreen>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Search a Spot</Text>
        <SpotSearch onSpotSelect={handleSpotSelect} />
        <TouchableOpacity style={styles.manualButton} onPress={handleManualEntry}>
          <Text style={styles.manualButtonText}>Can't find your spot? Add manually</Text>
        </TouchableOpacity>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text.primary,
  },
  manualButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  manualButtonText: {
    color: Colors.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SearchSpotScreen; 