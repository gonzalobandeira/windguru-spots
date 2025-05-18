import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  RefreshControl,
  Linking,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { useIsFocused } from '@react-navigation/native';
import LocationService from '../services/LocationService';
import GroupService from '../services/GroupService';
import WindguruWidget from '../components/WindguruWidget';
import MoreOptionsMenu from '../components/MoreOptionsMenu';
import { styles } from '../styles/HomeScreen.styles';
import { getModelName } from '../constants/Models';
import { Colors, WidgetHeight } from '../constants/Styles';
import Constants from 'expo-constants';
import { isFeatureEnabled } from '../constants/FeatureFlags';

const HomeScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [error, setError] = useState(null);
  const isFocused = useIsFocused();

  // Load locations and groups when screen is focused
  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  // Load locations and groups
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [savedLocations, savedGroups] = await Promise.all([
        LocationService.getLocations(),
        GroupService.getGroups()
      ]);
      setLocations(savedLocations);
      setGroups(savedGroups);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data. Please try again.');
      Alert.alert('Error', 'Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshKey(prev => prev + 1); // Force widgets to reload
    await loadData();
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

  // Delete a group
  const handleDeleteGroup = (groupId) => {
    Alert.alert(
      'Delete Group',
      'Are you sure you want to delete this group? All spots in this group will be ungrouped.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const [updatedGroups, updatedLocations] = await Promise.all([
                GroupService.deleteGroup(groupId),
                LocationService.getLocations()
              ]);
              setGroups(updatedGroups);
              setLocations(updatedLocations);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete group');
              console.error(error);
            }
          }
        }
      ]
    );
  };

  // Toggle group expansion
  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Save new order to storage
  const handleDragEnd = async ({ data }) => {
    setLocations(data);
    await LocationService.saveLocations(data);
  };

  // Save new group order to storage
  const handleGroupDragEnd = async ({ data }) => {
    setGroups(data);
    await GroupService.saveGroups(data);
  };

  // Render each location item
  const renderLocationItem = ({ item, drag, isActive }) => {
    const paramList = item.params ? item.params.split(',').filter(Boolean) : [];
    const noParamsSelected = paramList.length === 0;

    return (
      <ScaleDecorator>
        <View
          style={[
            styles.locationItem,
            isActive && { opacity: 0.8 }]
          }
        >
          {/* Absolutely position the share and menu buttons at the top right of the card */}
          <View style={styles.locationButtonsContainer}>
            <MoreOptionsMenu 
              onDelete={() => handleDeleteLocation(item.id)}
              item={item}
            />
          </View>
          <View style={styles.locationHeader}>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{item.name}</Text>
              <View style={styles.locationDetails}>
                <Text style={styles.locationSpotId}>Spot ID: {item.spotId}</Text>
                <Text style={styles.locationModel}>Model: {getModelName(item.modelId)}</Text>
              </View>
            </View>
            <View style={styles.locationActions}>
              {/* Drag handle could go here if needed */}
            </View>
          </View>
          <View style={[styles.widgetContainer, { height: WidgetHeight.fixed }]}> 
            {noParamsSelected ? (
              <View style={styles.noParamsContainer}>
                <Text style={styles.noParamsText}>
                  No variables selected. Please edit this spot to choose at least one variable.
                </Text>
              </View>
            ) : (
              <WindguruWidget 
                key={`${item.id}-${refreshKey}`}
                spotId={item.spotId} 
                modelId={item.modelId} 
                params={item.params} 
                windUnit={item.windUnit || 'knots'}
                tempUnit={item.tempUnit === 'fahrenheit' ? 'f' : 'c'}
              />
            )}
          </View>
        </View>
      </ScaleDecorator>
    );
  };

  // Render each group item
  const renderGroupItem = ({ item, drag, isActive }) => {
    const groupLocations = locations.filter(loc => loc.groupId === item.id);
    const isExpanded = expandedGroups[item.id];

    return (
      <ScaleDecorator>
        <View style={styles.groupItem}>
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={[
              styles.groupHeader,
              isActive && { opacity: 0.8 }
            ]}
            onPress={() => toggleGroup(item.id)}
          >
            <TouchableOpacity 
              style={styles.expandButton}
              onPress={() => toggleGroup(item.id)}
            >
              <Text style={styles.expandButtonText}>
                {isExpanded ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupCount}>{groupLocations.length} spots</Text>
            </View>
            <View style={styles.groupActions}>
              <MoreOptionsMenu onDelete={() => handleDeleteGroup(item.id)} />
            </View>
          </TouchableOpacity>
          
          {isExpanded && (
            <View style={styles.groupContent}>
              <DraggableFlatList
                data={groupLocations}
                renderItem={renderLocationItem}
                keyExtractor={item => item.id}
                onDragEnd={handleDragEnd}
                activationDistance={20}
                dragItemOverflow={true}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          )}
        </View>
      </ScaleDecorator>
    );
  };

  // Render ungrouped locations
  const renderUngroupedLocations = () => {
    const ungroupedLocations = locations.filter(loc => !loc.groupId);
    
    if (ungroupedLocations.length === 0) return null;

    return (
      <View style={styles.ungroupedSection}>
        <DraggableFlatList
          data={ungroupedLocations}
          renderItem={renderLocationItem}
          keyExtractor={item => item.id}
          onDragEnd={handleDragEnd}
          activationDistance={20}
          dragItemOverflow={true}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  };

  const handleGithubPress = async () => {
    try {
      await Linking.openURL(GITHUB_REPO_URL);
    } catch (error) {
      Alert.alert('Error', 'Could not open GitHub repository');
      console.error('Error opening GitHub:', error);
    }
  };

  const handleWindguruPress = async () => {
    try {
      await Linking.openURL(WINDGURU_URL);
    } catch (error) {
      Alert.alert('Error', 'Could not open Windguru website');
      console.error('Error opening Windguru:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Windguru Spots</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('ExportImport')}
          >
            <MaterialIcons name="import-export" size={24} color={Colors.text.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddSpot')}
          >
            <Text style={styles.addButtonText}>+ Add Spot</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={loadData}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : locations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <MaterialIcons name="cloud" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.emptyText}>
            No spots added yet
          </Text>
          <Text style={styles.emptySubText}>
            Add your favorite spots to track wind conditions and forecasts.
          </Text>
          <TouchableOpacity
            style={[styles.addButton, { marginTop: 28 }]}
            onPress={() => navigation.navigate('AddSpot')}
          >
            <Text style={styles.addButtonText}>+ Add Your First Spot</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <DraggableFlatList
            data={groups}
            renderItem={renderGroupItem}
            keyExtractor={item => item.id}
            onDragEnd={handleGroupDragEnd}
            activationDistance={20}
            dragItemOverflow={true}
            ListFooterComponent={renderUngroupedLocations}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.listContainer}
          />
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <TouchableOpacity onPress={handleWindguruPress} style={styles.footerLink}>
            <Image 
              source={require('../../assets/images/windguru-icon.png')} 
              style={styles.footerIcon}
              resizeMode="contain"
            />
            <Text style={styles.footerText}>Powered by Windguru</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>|</Text>
          <Text style={styles.footerText}>v{Constants.expoConfig.version}</Text>
          <Text style={styles.footerSeparator}>|</Text>
          <TouchableOpacity onPress={handleGithubPress}>
            <FontAwesome name="github" size={16} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
