import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchSpotScreen from '../screens/SearchSpotScreen';
import ConfirmSpotScreen from '../screens/ConfirmSpotScreen';

const Stack = createStackNavigator();

const AddSpotStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchSpot"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SearchSpot" component={SearchSpotScreen} />
      <Stack.Screen name="ConfirmSpot" component={ConfirmSpotScreen} />
    </Stack.Navigator>
  );
};

export default AddSpotStack; 