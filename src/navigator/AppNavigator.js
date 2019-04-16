import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
// Components
import { Image, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc, removeOrientationListener as rol } from 'react-native-responsive-screen';
import { Fonts, Colors } from '../themes';
// Screens
import {
  Home
} from '../screens';

// Bottom Navigator

const BottomNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Beranda',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/icon/home.png')} style={{ height: 21, width: 21, tintColor: tintColor, top: 5 }} />
      )
    }
  },
  Search: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Cari',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/icon/search.png')} style={{ height: 21, width: 21, tintColor: tintColor, top: 5 }} />
      )
    }
  },
},
  {
    tabBarOptions: {
      header: null,
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.black,
      style: {
        backgroundColor: Colors.white,
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: Colors.black,
        shadowOpacity: 0.5,
        elevation: 5,
        height: 50
      }
    }
  });

// Stack Navigator

const MainNavigator = createStackNavigator({
  Home: {
    screen: BottomNavigator,

    navigationOptions: {
      headerTitleStyle: { textAlign: 'center', flex: 1, color: Colors.black, fontFamily: Fonts.type.bold },
      title: 'INI BERITA'
    },

  },
  // Article: { screen: Article },

})
// Switch Navigator

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: MainNavigator
    },
    {
      initialRouteName: "App"
    }
  )
);
export default AppContainer;