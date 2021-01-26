import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import React, { useEffect } from 'react';
import {StatusBar, View} from 'react-native';

import backgroundImage from '../src/assets/backgroundImage.png';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/index';

import {
  BackgroundImage
} from './pages/SignIn/styles';



const App: React.FC = () => {

  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (

    <NavigationContainer>
    <StatusBar translucent barStyle="light-content" backgroundColor="#333333" />
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
    <BackgroundImage
            source={backgroundImage}
            imageStyle={{
              left: 15,
              top: -20,
              width: 370,
              height: 550,
            }}
          />
    </NavigationContainer>

  );
};

export default App;
