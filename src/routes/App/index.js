import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BusinessRoute from './BusinessRoute';
import {Dashboard} from '../../containers';
const index = createDrawerNavigator(
  {
    Dashboard: {
      screen: props => <Dashboard {...props} />,
      navigationOptions: ({}) => ({
        drawerIcon: () => <Icon name="camera" size={20} color="#000" />,
      }),
    },
    BusinessRoute: {
      screen: BusinessRoute,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
      }),
    },
  },
  {
    drawerPosition: 'left',
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

export default createAppContainer(index);
