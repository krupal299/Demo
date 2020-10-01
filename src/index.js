import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

import Home from './containers/home/index';
import Albums from './containers/albums/index';
import About from './containers/about/index';

function Alblammo() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Albums" component={Albums} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

function Routers() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="App">
          <Stack.Screen name="Alblammo" component={Alblammo} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Routers;
