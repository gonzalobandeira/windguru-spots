import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadow, Tooltip as TooltipStyles } from '../constants/Styles';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={TooltipStyles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        {children}
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          style={TooltipStyles.overlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={TooltipStyles.tooltipContainer}>
            <View style={TooltipStyles.tooltipContent}>
              {content}
            </View>
            <TouchableOpacity 
              style={TooltipStyles.closeButton}
              onPress={() => setIsVisible(false)}
            >
              <MaterialIcons name="close" size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
} 