import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import AuthNavigation from './Auth';
import AppNavigation from './App';
import {SplashScreen} from '../components/screens';

const Navigation = createSharedElementStackNavigator(
  createSwitchNavigator,
  {
    SplashScreen: {
      screen: props => <SplashScreen {...props} />,
    },
    App: AppNavigation,
    Auth: AuthNavigation(),
  },
  {
    initialRouteName: 'SplashScreen',
  },
);

export default createAppContainer(Navigation);
