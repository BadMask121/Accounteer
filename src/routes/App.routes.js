import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import AppNavigation from './App';
import AuthNavigation from './Auth';
import MainApp from './MainApp';
import {SplashScreen} from '../components/screens';
const Navigation = createSharedElementStackNavigator(
  createSwitchNavigator,
  {
    SplashScreen: {
      screen: props => <SplashScreen {...props} />,
    },
    App: AppNavigation,
    Auth: AuthNavigation(),
    MainApp: MainApp(),
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(Navigation);
