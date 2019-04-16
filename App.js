import React, { Component } from 'react';
import AppContainerNavigator from './src/navigator/AppNavigator';
import NavigationService from './src/navigator/NavigationServices';

export default class App extends Component {
  render() {
    return (
        <AppContainerNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
    );
  }
}
