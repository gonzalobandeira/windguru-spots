import React, { useState } from 'react';
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
  FlatList
} from 'react-native';
import LocationService from '../services/LocationService';
import { styles } from '../styles/AddLocationScreen.styles';
import { WindguruModels } from '../constants/Models';

const AddLocationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [spotId, setSpotId] = useState('');
  const [modelId, setModelId] = useState('100'); // Default to GFS
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);

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
      await LocationService.addLocation(name.trim(), spotId.trim(), modelId);
      
      // Navigate back to home screen
      navigation.goBack();
      
    } catch (error) {
      Alert.alert('Error', 'Failed to add location');
      console.error(error);
    } finally {
      setIsSubmitting(false);
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

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Spot</Text>
        </View>

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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => navigation.goBack()}
              disabled={isSubmitting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.submitButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Adding...' : 'Add Location'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showModelSelector}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModelSelector(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Forecast Model</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowModelSelector(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={Object.values(WindguruModels)}
              renderItem={renderModelItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.modelList}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddLocationScreen;
