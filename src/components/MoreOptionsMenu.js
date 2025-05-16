import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, ButtonHeight, FontSize, FontWeight, Shadow } from '../constants/Styles';

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

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  menuButton: {
    backgroundColor: Colors.secondary,
    width: ButtonHeight.sm * 0.85,
    height: ButtonHeight.sm * 0.85,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: ButtonHeight.sm * 0.85 + Spacing.xs,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    minWidth: 150,
    ...Shadow.medium,
    zIndex: 1001,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  menuItemText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});

export default MoreOptionsMenu; 