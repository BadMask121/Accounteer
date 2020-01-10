import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {BusinessDashboard, Dashboard} from '../../containers';

const index = values =>
  createStackNavigator(
    {
      Dashboard: {
        screen: props => <Dashboard {...props} {...values} />,
      },
      BusinessDashboard: {
        screen: props => <BusinessDashboard {...props} {...values} />,
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
