import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
  Share,
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import GroupService from '../services/GroupService';
import LocationService from '../services/LocationService';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, ButtonHeight } from '../constants/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/ExportImportScreen.styles';

const ExportImportScreen = ({ navigation }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Get all groups and locations
      const [groups, locations] = await Promise.all([
        GroupService.getGroups(),
        LocationService.getLocations()
      ]);

      // Create export data object
      const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        groups,
        locations
      };

      // Convert to JSON string
      const jsonString = JSON.stringify(exportData, null, 2);

      // Create file path
      const fileName = `windguru-spots-export-${new Date().toISOString().split('T')[0]}.json`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      // Write file
      await FileSystem.writeAsStringAsync(filePath, jsonString);

      // Share file
      await Share.share({
        url: Platform.OS === 'ios' ? filePath : `file://${filePath}`,
        title: 'Windguru Spots Export',
        message: 'Here is my Windguru Spots export file'
      });

    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    try {
      setIsImporting(true);

      // Pick file
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true
      });

      if (result.canceled) {
        return;
      }

      // Read file content
      const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const importData = JSON.parse(fileContent);

      // Validate import data
      if (!importData.version || !importData.groups || !importData.locations) {
        throw new Error('Invalid export file format');
      }

      // Get current groups and locations
      const [currentGroups, currentLocations] = await Promise.all([
        GroupService.getGroups(),
        LocationService.getLocations()
      ]);

      // Create a map of existing group names to their IDs
      const existingGroupMap = new Map(
        currentGroups.map(group => [group.name.toLowerCase(), group])
      );

      // Process imported groups
      const finalGroups = [...currentGroups];
      const importedGroupsMap = new Map();

      importData.groups.forEach(importedGroup => {
        const existingGroup = existingGroupMap.get(importedGroup.name.toLowerCase());
        if (existingGroup) {
          // Update existing group
          const index = finalGroups.findIndex(g => g.id === existingGroup.id);
          if (index !== -1) {
            finalGroups[index] = { ...importedGroup, id: existingGroup.id };
          }
        } else {
          // Add new group
          finalGroups.push(importedGroup);
        }
        importedGroupsMap.set(importedGroup.id, importedGroup);
      });

      // Process locations
      const finalLocations = [...currentLocations];
      
      importData.locations.forEach(importedLocation => {
        // Find the corresponding group in the final groups array
        const originalGroup = importedGroupsMap.get(importedLocation.groupId);
        if (originalGroup) {
          const matchingGroup = finalGroups.find(g => 
            g.name.toLowerCase() === originalGroup.name.toLowerCase()
          );
          
          if (matchingGroup) {
            // Check if location already exists
            const existingLocationIndex = finalLocations.findIndex(
              loc => loc.spotId === importedLocation.spotId
            );

            if (existingLocationIndex !== -1) {
              // Update existing location
              finalLocations[existingLocationIndex] = {
                ...importedLocation,
                id: finalLocations[existingLocationIndex].id,
                groupId: matchingGroup.id
              };
            } else {
              // Add new location
              finalLocations.push({
                ...importedLocation,
                groupId: matchingGroup.id
              });
            }
          }
        }
      });

      // Confirm import
      Alert.alert(
        'Import Data',
        'This will merge the imported groups with your existing groups. Groups with the same name will be replaced. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Import',
            style: 'destructive',
            onPress: async () => {
              try {
                // Save merged groups and updated locations
                await Promise.all([
                  GroupService.saveGroups(finalGroups),
                  LocationService.saveLocations(finalLocations)
                ]);

                Alert.alert('Success', 'Data imported successfully');
                navigation.goBack();
              } catch (error) {
                Alert.alert('Error', 'Failed to import data');
                console.error(error);
              }
            }
          }
        ]
      );

    } catch (error) {
      Alert.alert('Error', 'Failed to import data');
      console.error(error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Export / Import</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.button, isExporting && styles.buttonDisabled]}
          onPress={handleExport}
          disabled={isExporting}
        >
          <Text style={styles.buttonText}>
            {isExporting ? 'Exporting...' : 'Export Groups & Spots'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, isImporting && styles.buttonDisabled]}
          onPress={handleImport}
          disabled={isImporting}
        >
          <Text style={styles.buttonText}>
            {isImporting ? 'Importing...' : 'Import Groups & Spots'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExportImportScreen; 