import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BusinessRoute from './BusinessRoute';
import {Dashboard} from '../../containers';
import HomeDrawer from 'components/custom/Drawer/HomeDrawer';
import {app} from 'helpers/constants';
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
        backgroundColor: app.primaryColorLight,
        elevation: 0,
      },
      headerTintColor: 'gray',
      headerBackTitle: null,
      headerTitle: () => null,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    drawerBackgroundColor: app.primaryColorLight,
    keyboardDismissMode: 'on-drag',
    contentComponent: props => {
      console.log(props);
      return <HomeDrawer {...props} />;
    },
    initialRouteName: 'Dashboard',
  },
);

export default createAppContainer(index);
