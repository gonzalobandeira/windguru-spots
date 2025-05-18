import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const AppScreen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={["top", "left", "right"]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppScreen; 