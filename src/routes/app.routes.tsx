import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Dashboard from '../pages/Dashboard';
import QRCodeReader from '../pages/QRCodeReader';
import Profile from '../pages/Profile';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const App = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
  screenOptions={({ route }) => ({
		tabBarIcon: ({ color, size }) => {
			let iconName;

			switch (route.name) {
				case 'QRCodeReader':
					iconName = 'qrcode';
					break;
				case 'Dashboard':
					iconName = 'th';
					break;
				case 'Profile':
					iconName = 'user';
					break;
				default:
					iconName = 'circle';
					break;
			}

			return <Icon name={iconName} size={size} color={color} />;
		},
	})}
		tabBarOptions={{
		activeTintColor: '#39b100',
		inactiveTintColor: '#fff',
    activeBackgroundColor: '#666666',
    inactiveBackgroundColor: '#666666',
    showLabel: false,
    keyboardHidesTabBar: true,
	}}
    sceneContainerStyle={{
      backgroundColor: '#333333',
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen name="QRCodeReader" component={QRCodeReader} />
    <App.Screen
      name="Dashboard"
      component={Dashboard}
      options={() => ({
        tabBarIcon: ({color, size, focused}) => (
          focused
          ?  <View style={styles.iconTabRound} >
              <Icon name="th" size={26} color='#39b100'/>
            </View>
          : <View style={styles.iconTabRoundNoFocused} >
          <Icon name="th" size={26} color='#fff'/>
        </View>
        ),
      })}
    />
    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconTabRound: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        backgroundColor: '#666666',
        //shadowColor: '#9C27B0',
        //shadowOffset: { width: 0, height: 2 },
        //shadowOpacity: 0.2,
        //shadowRadius: 5,
    },
    iconTabRoundNoFocused: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      color: '#333333',
      backgroundColor: '#666666',
      //shadowColor: '#9C27B0',
      //shadowOffset: { width: 0, height: 2 },
      //shadowOpacity: 0.2,
      //shadowRadius: 5,
  }
});

export default AppRoutes;
