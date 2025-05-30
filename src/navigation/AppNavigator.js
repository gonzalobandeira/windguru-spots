import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ExportImportScreen from '../screens/ExportImportScreen';
import AddSpotStack from './AddSpotStack';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f5f5f5' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddSpot" component={AddSpotStack} />
        <Stack.Screen name="ExportImport" component={ExportImportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
