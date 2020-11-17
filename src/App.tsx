import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/index';

const App: React.FC = () => {
  return (

    <NavigationContainer>
    <StatusBar translucent barStyle="light-content" backgroundColor="#333333" />
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
    </NavigationContainer>

  );
};

export default App;
