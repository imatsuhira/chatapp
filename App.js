import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ScrollView,
} from 'react-native';

//import react native gesture handler
import 'react-native-gesture-handler';

//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import components
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Screen1'>
          <Stack.Screen name='Start' component={Start} />
          <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
