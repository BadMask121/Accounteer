import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Dashboard} from '../../containers';
import BusinessRoute from './BusinessRoute';

const index = values =>
  createStackNavigator(
    {
      Dashboard: {
        screen: props => <Dashboard {...props} {...values} />,
      },
      BusinessRoute: {
        screen: BusinessRoute,
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
