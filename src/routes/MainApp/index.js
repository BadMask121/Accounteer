import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {Dashboard} from '../../containers';
import BusinessDashboardRoute from './BusinessRoutes';

// this route takes care of any dashboard based activity that might want to navigate using
// back button to dashboard e.g coming back from settings
const index = values =>
  createStackNavigator(
    {
      Dashboard: {
        screen: props => <Dashboard {...props} {...values} />,
        navigationOptions: ({navigation}) => ({
          headerShown: true,
        }),
      },
      BusinessDashboard: {
        screen: BusinessDashboardRoute(),
        navigationOptions: ({navigation}) => ({
          headerShown: false,
        }),
      },
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
        },
        headerTintColor: 'gray',
        headerBackTitle: null,
        headerTitle: () => null,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
      initialRouteName: 'Dashboard',
    },
  );

export default index;
