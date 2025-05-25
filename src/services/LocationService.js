import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../models/Location';
import { LOCATIONS_STORAGE_KEY, MAX_SPOTS } from '../constants/Storage';
import WindguruService from './WindguruService';

class LocationService {
  constructor(coordinatesService = WindguruService) {
    this.coordinatesService = coordinatesService;
  }

  async getLocations() {
    try {
      const locationsJson = await AsyncStorage.getItem(LOCATIONS_STORAGE_KEY);
      return locationsJson ? JSON.parse(locationsJson) : [];
    } catch (error) {
      console.error('Error getting locations:', error);
      return [];
    }
  }

  async addLocation(spotName, spotId, modelId, params = '', groupId = null, windUnit = 'knots', tempUnit = 'c') {
    try {
      const locations = await this.getLocations();
      
      if (locations.length >= MAX_SPOTS) {
        throw new Error(`Maximum number of spots (${MAX_SPOTS}) reached`);
      }

      const coordinates = await this.coordinatesService.getSpotCoordinates(spotId);
      
      const id = Date.now().toString();

      const newLocation = new Location(
        id, 
        spotName,
        spotId,
        modelId,
        params,
        groupId,
        windUnit,
        tempUnit,
        coordinates
      );
      
      console.log('New location:', newLocation);

      const updatedLocations = [...locations, newLocation];
      console.log(LOCATIONS_STORAGE_KEY, JSON.stringify(updatedLocations));
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(updatedLocations));
      
      return newLocation;
    } catch (error) {
      console.error('Error adding location:', error);
      throw error;
    }
  }

  async deleteLocation(locationId) {
    try {
      const locations = await this.getLocations();
      const updatedLocations = locations.filter(location => location.id !== locationId);
      
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(updatedLocations));
      
      return updatedLocations;
    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
  }

  async updateLocation(locationId, updates) {
    try {
      const locations = await this.getLocations();
      const locationIndex = locations.findIndex(location => location.id === locationId);
      
      if (locationIndex === -1) {
        throw new Error('Location not found');
      }

      const updatedLocation = { ...locations[locationIndex], ...updates };
      locations[locationIndex] = updatedLocation;
      
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(locations));
      
      return updatedLocation;
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }

  // Get locations by group ID
  async getLocationsByGroup(groupId) {
    try {
      const locations = await this.getLocations();
      return locations.filter(location => location.groupId === groupId);
    } catch (error) {
      console.error('Error loading locations by group:', error);
      return [];
    }
  }

  // Save the full locations array (for reordering)
  async saveLocations(locations) {
    try {
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(locations));
    } catch (error) {
      console.error('Error saving locations:', error);
      throw error;
    }
  }

  // Move location to a different group
  async moveLocationToGroup(locationId, groupId) {
    try {
      const locations = await this.getLocations();
      const updatedLocations = locations.map(location => 
        location.id === locationId ? { ...location, groupId } : location
      );
      
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(updatedLocations));
      
      return updatedLocations;
    } catch (error) {
      console.error('Error moving location to group:', error);
      throw error;
    }
  }
}

export default new LocationService();
