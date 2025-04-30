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

      // Confirm import
      Alert.alert(
        'Import Data',
        'This will replace all your current groups and spots. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Import',
            style: 'destructive',
            onPress: async () => {
              try {
                // Save groups and locations
                await Promise.all([
                  GroupService.saveGroups(importData.groups),
                  LocationService.saveLocations(importData.locations)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  closeButton: {
    width: ButtonHeight.md,
    height: ButtonHeight.md,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  content: {
    padding: Spacing.lg,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.text.white,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
});

export default ExportImportScreen; 