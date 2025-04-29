import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useIsFocused } from '@react-navigation/native';
import LocationService from '../services/LocationService';
import WindguruWidget from '../components/WindguruWidget';
import { styles } from '../styles/HomeScreen.styles';
import { getModelName } from '../constants/Models';

function getTimeAgo(date) {
  if (!date) return '';
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins === 1) return '1 minute ago';
  return `${diffMins} minutes ago`;
}

const HomeScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(null);
  const isFocused = useIsFocused();

  // Load locations when screen is focused
  useEffect(() => {
    if (isFocused) {
      loadLocationsAndSetTime();
    }
  }, [isFocused]);

  // Load locations from storage and update last refresh time
  const loadLocationsAndSetTime = async () => {
    await loadLocations();
    setLastRefresh(new Date());
  };

  const loadLocations = async () => {
    try {
      setLoading(true);
      const savedLocations = await LocationService.getLocations();
      setLocations(savedLocations);
    } catch (error) {
      Alert.alert('Error', 'Failed to load locations');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshKey(prev => prev + 1); // Force widgets to reload
    await loadLocations();
    setLastRefresh(new Date());
    setRefreshing(false);
  };

  // Delete a location
  const handleDeleteLocation = (locationId) => {
    Alert.alert(
      'Delete Location',
      'Are you sure you want to delete this location?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedLocations = await LocationService.deleteLocation(locationId);
              setLocations(updatedLocations);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete location');
              console.error(error);
            }
          }
        }
      ]
    );
  };

  // Save new order to storage
  const handleDragEnd = async ({ data }) => {
    setLocations(data);
    await LocationService.saveLocations(data);
  };

  // Render each location item
  const renderLocationItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.locationItem,
          isActive && { opacity: 0.8, transform: [{ scale: 1.05 }] }
        ]}
      >
        <View style={styles.locationHeader}>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>{item.name}</Text>
            <View style={styles.locationDetails}>
              <Text style={styles.locationSpotId}>Spot ID: {item.spotId}</Text>
              <Text style={styles.locationModel}>Model: {getModelName(item.modelId)}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteLocation(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.widgetContainer}>
          <WindguruWidget 
            key={`${item.id}-${refreshKey}`}
            spotId={item.spotId} 
            modelId={item.modelId} 
            params={item.params} 
          />
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Windguru Spots</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddLocation')}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Last refreshed indicator */}
      <View style={styles.lastRefreshContainer}>
        <Text style={styles.lastRefreshText}>
          Last refreshed: {getTimeAgo(lastRefresh)}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      ) : locations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No locations added yet</Text>
          <Text style={styles.emptySubText}>Tap the + Add button to add your first sailing spot</Text>
        </View>
      ) : (
        <DraggableFlatList
          data={locations}
          renderItem={renderLocationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onDragEnd={handleDragEnd}
          activationDistance={20}
          dragItemOverflow={true}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Windguru</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
