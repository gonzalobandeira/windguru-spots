import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';
import LocationService from '../services/LocationService';
import GroupService from '../services/GroupService';
import { styles } from '../styles/AddLocationScreen.styles';
import { WindguruModels } from '../constants/Models';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, ButtonHeight } from '../constants/Styles';
import { MaterialIcons } from '@expo/vector-icons';

const AddLocationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [spotId, setSpotId] = useState('');
  const [modelId, setModelId] = useState('100'); // Default to GFS
  const [groupId, setGroupId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showGroupSelector, setShowGroupSelector] = useState(false);
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);

  // Load groups when component mounts
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const loadedGroups = await GroupService.getGroups();
      setGroups(loadedGroups);
    } catch (error) {
      console.error('Error loading groups:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate inputs
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a location name');
      return;
    }

    if (!spotId.trim()) {
      Alert.alert('Error', 'Please enter a Windguru spot ID');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Add new location
      await LocationService.addLocation(name.trim(), spotId.trim(), modelId, undefined, groupId);
      
      // Navigate back to home screen
      navigation.goBack();
      
    } catch (error) {
      Alert.alert('Error', 'Failed to add location');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle new group creation
  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    // Check for duplicate group names
    const trimmedName = newGroupName.trim();
    const isDuplicate = groups.some(group => 
      group.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      Alert.alert('Error', 'A group with this name already exists');
      return;
    }

    try {
      const newGroup = await GroupService.addGroup(trimmedName);
      setGroups(prev => [...prev, newGroup]);
      setGroupId(newGroup.id);
      setNewGroupName('');
      setShowNewGroupInput(false);
      setShowGroupSelector(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to create group');
      console.error(error);
    }
  };

  const renderModelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => {
        setModelId(item.id);
        setShowModelSelector(false);
      }}
    >
      <Text style={styles.modelName}>{item.name}</Text>
      <Text style={styles.modelDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => {
        setGroupId(item.id);
        setShowGroupSelector(false);
      }}
    >
      <Text style={styles.groupName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Add New Spot</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter a custom name for this location"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Windguru Spot ID</Text>
            <TextInput
              style={styles.input}
              value={spotId}
              onChangeText={setSpotId}
              placeholder="Enter Windguru spot ID (e.g., 48743)"
              placeholderTextColor="#999"
              keyboardType="number-pad"
            />
            <Text style={styles.helpText}>
              You can find the spot ID in the URL of the Windguru forecast page
              (e.g., https://www.windguru.cz/48743)
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Forecast Model</Text>
            <TouchableOpacity 
              style={styles.modelSelector}
              onPress={() => setShowModelSelector(true)}
            >
              <Text style={styles.modelSelectorText}>
                {WindguruModels[Object.keys(WindguruModels).find(key => WindguruModels[key].id === modelId)]?.name}
              </Text>
            </TouchableOpacity>
            <Text style={styles.helpText}>
              {WindguruModels[Object.keys(WindguruModels).find(key => WindguruModels[key].id === modelId)]?.description}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Group</Text>
            <TouchableOpacity 
              style={styles.groupSelector}
              onPress={() => setShowGroupSelector(true)}
            >
              <Text style={styles.groupSelectorText}>
                {groupId ? groups.find(g => g.id === groupId)?.name : 'No Group'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Adding...' : 'Add Location'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Model Selector Modal */}
      <Modal
        visible={showModelSelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModelSelector(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Forecast Model</Text>
            <FlatList
              data={Object.values(WindguruModels)}
              renderItem={renderModelItem}
              keyExtractor={item => item.id}
              style={styles.modalList}
            />
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowModelSelector(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Group Selector Modal */}
      <Modal
        visible={showGroupSelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGroupSelector(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Group</Text>
            
            {showNewGroupInput ? (
              <View style={styles.newGroupContainer}>
                <TextInput
                  style={styles.input}
                  value={newGroupName}
                  onChangeText={setNewGroupName}
                  placeholder="Enter new group name"
                  placeholderTextColor="#999"
                  autoFocus
                />
                <View style={styles.newGroupButtons}>
                  <TouchableOpacity 
                    style={[styles.newGroupButton, styles.cancelButton]}
                    onPress={() => {
                      setShowNewGroupInput(false);
                      setNewGroupName('');
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.newGroupButton, styles.createButton]}
                    onPress={handleCreateGroup}
                  >
                    <Text style={styles.createButtonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <FlatList
                  data={groups}
                  renderItem={renderGroupItem}
                  keyExtractor={item => item.id}
                  style={styles.modalList}
                  ListHeaderComponent={() => (
                    <TouchableOpacity 
                      style={styles.newGroupButton}
                      onPress={() => setShowNewGroupInput(true)}
                    >
                      <Text style={styles.newGroupButtonText}>+ Create New Group</Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
            
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowGroupSelector(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddLocationScreen;
