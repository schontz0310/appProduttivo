import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AppBottomTab from './app.bottom.routes'
import Details from '../pages/Details'

const App = createStackNavigator();

const AppRoutes: React.FC = () => (

  <App.Navigator
    initialRouteName="AppBottomTab"
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#333333' },
    }}
  >
    <App.Screen name="AppBottomTab" component={AppBottomTab} />
    <App.Screen name="Details" component={Details} />
  </App.Navigator>

);


export default AppRoutes;
