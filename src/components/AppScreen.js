import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const AppScreen = ({ children, style, keyboardAvoiding = false, scrollable = false }) => {
  const content = scrollable ? <ScrollView contentContainerStyle={styles.scrollContent}>{children}</ScrollView> : children;
  
  if (keyboardAvoiding) {
    return (
      <SafeAreaView style={[styles.safeArea, style]} edges={["top", "left", "right"]}>
        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          {content}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={["top", "left", "right"]}>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  }
});

export default AppScreen;
