import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {SplashScreen} from '../../components/screens';
import {createAppContainer} from 'react-navigation';

const Navigator = createSwitchNavigator(
  {
    SplashScreen: {
      screen: props => <SplashScreen {...props} />,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
  },
);
export default createAppContainer(Navigator);
