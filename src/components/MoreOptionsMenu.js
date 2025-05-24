import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated, TouchableWithoutFeedback, Modal, Linking, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Styles';
import { styles } from '../styles/MoreOptionsMenu.styles';
import ShareService from '../services/ShareService';
import { WINDGURU_URL } from '../constants/Messages';

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

  const toggleMenu = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setButtonPosition({ x, y, width, height });
    });
    setIsMenuVisible(!isMenuVisible);
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
                      <View style={styles.menuItemTextWithIcon}>
                        <Text style={[styles.menuItemText, { color: Colors.primary }]}>Open in </Text>
                        <Image 
                          source={require('../../assets/images/windguru-icon.png')} 
                          style={styles.windguruIcon}
                          resizeMode="contain"
                        />
                      </View>
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
