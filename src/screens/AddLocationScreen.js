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
  StatusBar,
  Linking
} from 'react-native';
import LocationService from '../services/LocationService';
import GroupService from '../services/GroupService';
import { styles } from '../styles/AddLocationScreen.styles';
import { WindguruModels } from '../constants/Models';
import { MAX_SPOTS, WindguruLimits } from '../constants/Limits';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, ButtonHeight } from '../constants/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector';
import SpotSearch from '../components/SpotSearch';

const WINDGURU_PARAMS_LIST = [
  { label: 'Wind speed', value: 'WINDSPD' },
  { label: 'Wind gusts', value: 'GUST' },
  { label: 'Wind direction', value: 'SMER' },
  { label: 'Temperature', value: 'TMP' },
  { label: '*Temperature', value: 'TMPE' },
  { label: 'Wind chill', value: 'WCHILL' },
  { label: '*0° isotherm (m)', value: 'FLHGT' },
  { label: 'Cloud cover (%) high / mid / low', value: 'CDC' },
  { label: 'Cloud cover (%)', value: 'TCDC' },
  { label: '*Precip. (mm/1h)', value: 'APCP1s' },
  { label: '*Pressure (hPa)', value: 'SLP' },
  { label: 'Humidity (%)', value: 'RH' },
  { label: 'Windguru rating', value: 'RATING' },
];
import { DEFAULT_WINDGURU_PARAMS } from '../constants/Models';

const windUnitOptions = [
  { key: 'knots', label: 'knots' },
  { key: 'ms', label: 'm/s' },
  { key: 'ms01', label: 'm/s (0.1)' },
  { key: 'kmh', label: 'kmh' },
  { key: 'mph', label: 'mph' },
  { key: 'bft', label: 'Bft' },
];
const tempUnitOptions = [
  { key: 'celsius', label: 'Celsius' },
  { key: 'fahrenheit', label: 'Fahrenheit' },
];

const AddLocationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [spotId, setSpotId] = useState('');
  const [modelId, setModelId] = useState(WindguruLimits.DEFAULT_MODEL_ID);
  const [groupId, setGroupId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [showGroupSelector, setShowGroupSelector] = useState(false);
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [params, setParams] = useState(DEFAULT_WINDGURU_PARAMS.split(','));
  const [windUnit, setWindUnit] = useState('knots');
  const [tempUnit, setTempUnit] = useState('celsius');

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
      console.log('Submitting params to LocationService:', params.join(','));
      
      // Add new location
      await LocationService.addLocation(name.trim(), spotId.trim(), modelId, params.join(','), groupId, windUnit, tempUnit);
      
      // Navigate back to home screen
      navigation.goBack();
      
    } catch (error) {
      if (error.message === `Maximum number of spots (${MAX_SPOTS}) reached`) {
        Alert.alert('Maximum Spots Reached', `You have reached the maximum limit of ${MAX_SPOTS} spots. Please delete some spots before adding new ones.`);
      } else {
        Alert.alert('Error', 'Failed to add location');
      }
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

  const handleParamToggle = (param) => {
    setParams((prev) => {
      const updated = prev.includes(param)
        ? prev.filter((p) => p !== param)
        : [...prev, param];
      return updated;
    });
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

  const handleSpotSelect = (spot) => {
    setName(spot.name);
    setSpotId(spot.id);
  };

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
            <SpotSearch onSpotSelect={handleSpotSelect} />
          </View>

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
              placeholder={`Enter Windguru spot ID (e.g., ${WindguruLimits.DEFAULT_SPOT_ID})`}
              placeholderTextColor="#999"
              keyboardType="number-pad"
              editable={false}
            />
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                Use search box to automatically fill in the spot Id, or you can find the spot ID in the URL of the Windguru forecast page
                (e.g., https://www.windguru.cz/{WindguruLimits.DEFAULT_SPOT_ID})
              </Text>
            </View>
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

          <View style={styles.inputGroup}>
            <TouchableOpacity onPress={() => setShowAdvanced((prev) => !prev)}>
              <Text style={[styles.label, { color: Colors.primary }]}>Advanced Configuration {showAdvanced ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {showAdvanced && (
              <View style={{ marginTop: 8 }}>
                <View style={{ marginBottom: 20 }}>
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

                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Variables</Text>
                  {WINDGURU_PARAMS_LIST.map((param) => (
                    <TouchableOpacity
                      key={param.value}
                      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                      onPress={() => handleParamToggle(param.value)}
                    >
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          borderWidth: 1,
                          borderColor: Colors.primary,
                          backgroundColor: params.includes(param.value) ? Colors.primary : '#fff',
                          marginRight: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {params.includes(param.value) && (
                          <MaterialIcons name="check" size={16} color="#fff" />
                        )}
                      </View>
                      <Text style={{ color: Colors.text.primary }}>{param.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Wind units</Text>
                  <ModalSelector
                    data={windUnitOptions}
                    initValue={windUnitOptions.find(o => o.key === windUnit)?.label}
                    onChange={option => setWindUnit(option.key)}
                    style={{ width: 160, marginBottom: 12 }}
                    initValueTextStyle={{ fontSize: 16, color: '#222' }}
                    selectTextStyle={{ fontSize: 16, color: '#222' }}
                  />
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Temperature units</Text>
                  <ModalSelector
                    data={tempUnitOptions}
                    initValue={tempUnitOptions.find(o => o.key === tempUnit)?.label}
                    onChange={option => setTempUnit(option.key)}
                    style={{ width: 160, marginBottom: 12 }}
                    initValueTextStyle={{ fontSize: 16, color: '#222' }}
                    selectTextStyle={{ fontSize: 16, color: '#222' }}
                  />
                </View>
              </View>
            )}
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
