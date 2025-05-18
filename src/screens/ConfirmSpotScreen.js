import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform, Modal, FlatList, Linking } from 'react-native';
import { styles } from '../styles/AddLocationScreen.styles';
import { WindguruModels, windUnitOptions, tempUnitOptions } from '../constants/Models';
import { MAX_SPOTS, WindguruLimits } from '../constants/Limits';
import { Colors } from '../constants/Styles';
import { MaterialIcons } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector';
import LocationService from '../services/LocationService';
import GroupService from '../services/GroupService';
import { Tooltip } from '../components/Tooltip';
import { DEFAULT_WINDGURU_PARAMS, WINDGURU_PARAMS_LIST } from '../constants/Models';
import AppScreen from '../components/AppScreen';

const ConfirmSpotScreen = ({ navigation, route }) => {
  const spot = route.params?.spot;
  const [name, setName] = useState(spot?.name || '');
  const [spotId, setSpotId] = useState(spot?.id || '');
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

  React.useEffect(() => {
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

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a spot name');
      return;
    }
    if (!spotId.trim()) {
      Alert.alert('Error', 'Please enter a Windguru spot ID');
      return;
    }
    try {
      setIsSubmitting(true);
      await LocationService.addLocation(name.trim(), spotId.trim(), modelId, params.join(','), groupId, windUnit, tempUnit);
      navigation.navigate('Home');
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

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }
    const trimmedName = newGroupName.trim();
    const isDuplicate = groups.some(group => group.name.toLowerCase() === trimmedName.toLowerCase());
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

  return (
    <AppScreen>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => {
              navigation.navigate('Home');
          }}>
            <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Confirm Spot Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Spot Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter a custom name for this spot"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Windguru Spot ID</Text>
              <Tooltip
                content={
                  <Text style={styles.helpText}>
                    Use search box to automatically fill in the spot ID, or you can find the spot ID in the URL of the Windguru forecast page
                    (e.g.,{' '}
                    <Text 
                      style={{ color: Colors.primary, textDecorationLine: 'underline' }}
                      onPress={() => Linking.openURL(`https://www.windguru.cz/${WindguruLimits.DEFAULT_SPOT_ID}`)}
                    >
                      https://www.windguru.cz/{WindguruLimits.DEFAULT_SPOT_ID}
                    </Text>
                  </Text>
                }
              >
                <MaterialIcons name="help-outline" size={20} color={Colors.text.secondary} />
              </Tooltip>
            </View>
            <TextInput
              style={styles.input}
              value={spotId}
              onChangeText={setSpotId}
              placeholder="Enter Windguru spot ID"
              keyboardType="numeric"
            />
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
              {isSubmitting ? 'Adding...' : 'Add Spot'}
            </Text>
          </TouchableOpacity>
        </View>
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
      </ScrollView>
    </AppScreen>
  );
};

export default ConfirmSpotScreen; 