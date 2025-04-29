import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from '../models/Location';
import { DEFAULT_WINDGURU_PARAMS } from '../constants/Models';

const LOCATIONS_STORAGE_KEY = '@SailingSpots:locations';

class LocationService {
  // Get all saved locations
  async getLocations() {
    try {
      const locationsJson = await AsyncStorage.getItem(LOCATIONS_STORAGE_KEY);
      if (locationsJson) {
        return JSON.parse(locationsJson);
      }
      return [];
    } catch (error) {
      console.error('Error loading locations:', error);
      return [];
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

  // Add a new location
  async addLocation(name, spotId, modelId = '100', params = DEFAULT_WINDGURU_PARAMS, groupId = null) {
    try {
      const locations = await this.getLocations();
      
      // Create a unique ID
      const id = Date.now().toString();
      
      // Create new location object
      const newLocation = new Location(id, name, spotId, modelId, params, groupId);
      
      // Add to locations array
      const updatedLocations = [...locations, newLocation];
      
      // Save to storage
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(updatedLocations));
      
      return newLocation;
    } catch (error) {
      console.error('Error adding location:', error);
      throw error;
    }
  }

  // Delete a location by ID
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

  // Update a location
  async updateLocation(locationId, updatedData) {
    try {
      const locations = await this.getLocations();
      const updatedLocations = locations.map(location => 
        location.id === locationId ? { ...location, ...updatedData } : location
      );
      
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, JSON.stringify(updatedLocations));
      
      return updatedLocations;
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
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
