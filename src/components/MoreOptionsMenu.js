import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Styles';
import { styles } from '../styles/MoreOptionsMenu.styles';

const MoreOptionsMenu = ({ onDelete }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const menuRef = useRef(null);

  useEffect(() => {
    if (isMenuVisible) {
      Animated.spring(menuAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isMenuVisible]);

  const handleDelete = () => {
    setIsMenuVisible(false);
    onDelete();
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handlePressOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener('mousedown', handlePressOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handlePressOutside);
    };
  }, [isMenuVisible]);

  return (
    <View ref={menuRef} style={styles.container}>
      <TouchableOpacity 
        style={styles.menuButton}
        onPress={toggleMenu}
      >
        <MaterialIcons name="more-vert" size={20} color={Colors.text.white} />
      </TouchableOpacity>

      {isMenuVisible && (
        <Animated.View 
          style={[
            styles.menuContainer,
            {
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
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleDelete}
          >
            <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
            <Text style={[styles.menuItemText, { color: Colors.error }]}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default MoreOptionsMenu; 