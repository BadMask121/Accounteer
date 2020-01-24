import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import AuthNavigation from './Auth';
import AppNavigation from './App';
import {SplashScreen} from '../components/screens';

const Navigation = createSwitchNavigator(
  {
    App: {
      screen: props => {
        console.log(props.screenProps);
        return props.screenProps.isLoggedIn ? (
          <AppNavigation {...props} />
        ) : (
          <SplashScreen {...props} />
        );
      },
    },
    Auth: AuthNavigation(),
  },
  {
    initialRouteName: 'App',
  },
);

export default createAppContainer(Navigation);
