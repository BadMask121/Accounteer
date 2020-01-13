import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {BusinessDashboard, Dashboard} from '../../../containers';

// This Navigation contains all our business activity routes
const index = values =>
  createStackNavigator(
    {
      BusinessDashboard: {
        screen: props => <BusinessDashboard {...props} {...values} />,
        navigationOptions: ({navigation}) => ({
          headerShown: false,
        }),
      },
    },
    {
      initialRouteName: 'BusinessDashboard',
    },
  );

export default index;
