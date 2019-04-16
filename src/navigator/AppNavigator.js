import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
// Components
import {Image, Text, View } from 'react-native';
import { Fonts, Images } from '../themes';
// Screens
import {
  Home,
  Book,
  SearchArticle,
  Article
} from '../screens';

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
  Book: {
    screen: Book,
    navigationOptions: {
      tabBarLabel: 'Buku',
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('../assets/icon/agenda.png')} style={{ height: 21, width: 21, tintColor: tintColor, top: 5 }} />
      )
    }
  },
  Search: {
    screen: SearchArticle,
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
      activeTintColor: '#00a699',
      inactiveTintColor: '#000',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
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
      headerTitleStyle: {textAlign: 'center', flex: 1, color: '#000', fontSize: 15, fontFamily: Fonts.type.bold},
      title: 'INI BERITA'
    },
    
  },
  Article: { screen: Article },
  Book: { screen: Book },
  SearchArticle: { screen: SearchArticle },
})
  
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