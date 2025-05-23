import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import windguruSpots from '../data/windguru_spots.json';
import { getNearbySpots } from '../utils/LocationUtils';
import { Colors } from '../constants/Styles';
import { SUGGESTED_SPOTS_CONFIG } from '../constants/SuggestedSpotsConfig';

const SuggestedSpots = ({ onSpotSelect }) => {
  const [loading, setLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState(null);
  const [nearbySpots, setNearbySpots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status);
        
        if (status !== 'granted') {
          setError('Location permission is required to suggest nearby spots');
          setLoading(false);
          return;
        }
        
        // Get current location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy[SUGGESTED_SPOTS_CONFIG.LOCATION_ACCURACY],
        });
        
        // Get nearby spots
        const spots = getNearbySpots(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          windguruSpots,
          SUGGESTED_SPOTS_CONFIG.MAX_DISTANCE_KM,
          SUGGESTED_SPOTS_CONFIG.MAX_SPOTS_TO_DISPLAY
        );
        
        setNearbySpots(spots);
      } catch (err) {
        console.error('Error getting location or nearby spots:', err);
        setError('Could not get nearby spots');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderSpotItem = ({ item }) => (
    <TouchableOpacity
      style={styles.spotItem}
      onPress={() => onSpotSelect(item)}
    >
      <View style={styles.spotInfo}>
        <Text style={styles.spotName}>{item.name}</Text>
        <Text style={styles.spotLocation}>
          {item.country}, {item.continent}
        </Text>
      </View>
      <View style={styles.distanceContainer}>
        <MaterialIcons name="place" size={16} color={Colors.primary} />
        <Text style={styles.distance}>{item.distance} km</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Nearby Spots</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <Text style={styles.loadingText}>Finding spots near you...</Text>
        </View>
      </View>
    );
  }

  if (error || locationPermission !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Nearby Spots</Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status);
          }}
        >
          <MaterialIcons name="location-on" size={20} color={Colors.primary} />
          <Text style={styles.permissionText}>
            Enable location to see nearby spots
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (nearbySpots.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Nearby Spots</Text>
        <Text style={styles.noSpotsText}>No spots found near your location</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Nearby Spots</Text>
      <FlatList
        data={nearbySpots}
        renderItem={renderSpotItem}
        keyExtractor={(item) => item.id}
        style={styles.spotsList}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.text.primary,
  },
  spotsList: {
    marginBottom: 8,
  },
  spotItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    marginBottom: 8,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  spotLocation: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distance: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  permissionText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.primary,
  },
  noSpotsText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 14,
    color: Colors.text.secondary,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
});

export default SuggestedSpots;
