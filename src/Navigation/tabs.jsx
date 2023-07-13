import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/loginScreen';
import ListWordScreen from '../screens/listWordScreen';

const Tabs = () => {
    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
    <Tab.Screen name="Login" component={LoginScreen} />
    <Tab.Screen name="ListWord" component={ListWordScreen} />
  </Tab.Navigator>
  )
}

export default Tabs