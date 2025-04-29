import AsyncStorage from '@react-native-async-storage/async-storage';
import Group from '../models/Group';

const GROUPS_STORAGE_KEY = '@SailingSpots:groups';

class GroupService {
  // Get all saved groups
  async getGroups() {
    try {
      const groupsJson = await AsyncStorage.getItem(GROUPS_STORAGE_KEY);
      if (groupsJson) {
        return JSON.parse(groupsJson);
      }
      return [];
    } catch (error) {
      console.error('Error loading groups:', error);
      return [];
    }
  }

  // Add a new group
  async addGroup(name) {
    try {
      const groups = await this.getGroups();
      
      // Create a unique ID
      const id = Date.now().toString();
      
      // Create new group object
      const newGroup = new Group(id, name, groups.length);
      
      // Add to groups array
      const updatedGroups = [...groups, newGroup];
      
      // Save to storage
      await AsyncStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(updatedGroups));
      
      return newGroup;
    } catch (error) {
      console.error('Error adding group:', error);
      throw error;
    }
  }

  // Delete a group by ID
  async deleteGroup(groupId) {
    try {
      const groups = await this.getGroups();
      const updatedGroups = groups.filter(group => group.id !== groupId);
      
      await AsyncStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(updatedGroups));
      
      return updatedGroups;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  }

  // Update a group
  async updateGroup(groupId, updatedData) {
    try {
      const groups = await this.getGroups();
      const updatedGroups = groups.map(group => 
        group.id === groupId ? { ...group, ...updatedData } : group
      );
      
      await AsyncStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(updatedGroups));
      
      return updatedGroups;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }

  // Save the full groups array (for reordering)
  async saveGroups(groups) {
    try {
      await AsyncStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(groups));
    } catch (error) {
      console.error('Error saving groups:', error);
      throw error;
    }
  }
}

export default new GroupService(); 