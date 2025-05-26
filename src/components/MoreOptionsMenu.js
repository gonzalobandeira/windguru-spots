import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, TouchableWithoutFeedback, Modal, Linking, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Styles';
import { styles } from '../styles/MoreOptionsMenu.styles';
import ShareService from '../services/ShareService';
import { WINDGURU_URL } from '../constants/Messages';
import WindguruService from '../services/WindguruService';
import LocationService from '../services/LocationService';
import { NavigationApps, NavigationUrls, NavigationAppNames } from '../constants/Navigation';

const MoreOptionsMenu = ({ onDelete, item }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const isSpot = item && 'spotId' in item;

  useEffect(() => {
    Animated[isMenuVisible ? 'spring' : 'timing'](menuAnimation, {
      toValue: isMenuVisible ? 1 : 0,
      useNativeDriver: true,
      ...(isMenuVisible ? { tension: 50, friction: 7 } : { duration: 200 })
    }).start();
  }, [isMenuVisible]);

  const handleShare = async () => {
    try {
      setIsMenuVisible(false);
      await new Promise(resolve => setTimeout(resolve, 100));
      await ShareService.shareForecast(item);
    } catch (error) {
      // Error is already handled in ShareService
    }
  };

  const handleOpenInWindguru = async () => {
    try {
      setIsMenuVisible(false);
      await new Promise(resolve => setTimeout(resolve, 100));
      const url = `${WINDGURU_URL}/${item.spotId}`;
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening Windguru:', error);
    }
  };

  const handleDriveTo = () => {
    setIsMenuVisible(false);
    
    // Ask user which navigation app they want to use
    Alert.alert(
      'Open Location',
      'Choose your preferred app',
      [
        {
          text: NavigationAppNames[NavigationApps.GOOGLE_MAPS],
          onPress: () => openInMaps(NavigationApps.GOOGLE_MAPS),
        },
        {
          text: NavigationAppNames[NavigationApps.WAZE],
          onPress: () => openInMaps(NavigationApps.WAZE),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const openInMaps = async (app) => {
    try {
      // Use the stored coordinates
      let coordinates = item.coordinates;
      if (!coordinates) {
        try {
          // Get coordinates from Windguru service
          coordinates = await WindguruService.getSpotCoordinates(item.spotId);
          if (coordinates) {
            // Save coordinates for future use using LocationService
            const updatedLocation = {
              ...item,
              coordinates
            };
            await LocationService.updateLocation(item.id, updatedLocation);
            // Update the local item reference
            item.coordinates = coordinates;
          }
        } catch (error) {
          console.error('Error fetching spot coordinates:', error);
        }
      }
      let url;
      
      if (coordinates) {
        // If we have coordinates for the spot
        url = NavigationUrls[app](coordinates.latitude, coordinates.longitude);
      } else {
        // If we don't have coordinates, we can open the spot in the browser
        Alert.alert(
          'Location Information Missing',
          'Could not find coordinates for this spot. Please try opening it in Windguru instead.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      if (url) {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          Alert.alert(
            'Navigation App Not Found',
            `Could not open ${NavigationAppNames[app]}. Please make sure it's installed on your device.`,
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error opening maps:', error);
      Alert.alert('Error', 'Could not open navigation app');
    }
  };

  const toggleMenu = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setButtonPosition({ x, y, width, height });
      setIsMenuVisible(!isMenuVisible);
      
      // Start animation
      Animated.spring(menuAnimation, {
        toValue: isMenuVisible ? 0 : 1,
        useNativeDriver: true,
        friction: 8,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        ref={buttonRef}
        style={styles.menuButton}
        onPress={toggleMenu}
      >
        <MaterialIcons name="more-vert" size={20} color={Colors.text.secondary} />
      </TouchableOpacity>

      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View 
                style={[
                  styles.menuContainer,
                  {
                    position: 'absolute',
                    top: buttonPosition.y + buttonPosition.height + 5,
                    right: 10,
                    opacity: menuAnimation,
                    transform: [
                      { scale: menuAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1]
                      })}
                    ]
                  }
                ]}
              >
                {isSpot && (
                  <>
                    <TouchableOpacity 
                      style={styles.menuItem}
                      onPress={handleShare}
                    >
                      <MaterialIcons name="share" size={20} color={Colors.primary} />
                      <Text style={[styles.menuItemText, { color: Colors.primary }]}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.menuItem}
                      onPress={handleOpenInWindguru}
                    >
                      <MaterialIcons name="open-in-browser" size={20} color={Colors.primary} />
                      <Text style={[styles.menuItemText, { color: Colors.primary }]}>Open</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.menuItem}
                      onPress={handleDriveTo}
                    >
                      <MaterialIcons name="location-on" size={20} color={Colors.primary} />
                      <Text style={[styles.menuItemText, { color: Colors.primary }]}>Navigate</Text>
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setIsMenuVisible(false);
                    onDelete();
                  }}
                >
                  <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
                  <Text style={[styles.menuItemText, { color: Colors.error }]}>Delete</Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MoreOptionsMenu;
