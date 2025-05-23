import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SpotSearch from '../components/SpotSearch';
import { Colors } from '../constants/Styles';
import AppScreen from '../components/AppScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/SearchSpotScreen.styles';
import SuggestedSpots from '../components/SuggestedSpots';

const SearchSpotScreen = ({ navigation }) => {
  const handleSpotSelect = (spot) => {
    navigation.navigate('ConfirmSpot', { spot });
  };

  const handleManualEntry = () => {
    navigation.navigate('ConfirmSpot', { spot: null });
  };

  return (
    <AppScreen keyboardAvoiding={true}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Search a Spot</Text>
          <SpotSearch onSpotSelect={handleSpotSelect} />
          <TouchableOpacity style={styles.manualButton} onPress={handleManualEntry}>
            <Text style={styles.manualButtonText}>Can't find your spot? Add manually</Text>
          </TouchableOpacity>
          
          {/* Add suggested spots based on location */}
          <SuggestedSpots onSpotSelect={handleSpotSelect} />
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default SearchSpotScreen;
