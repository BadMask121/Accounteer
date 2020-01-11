import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Invoice, BusinessDashboard} from '../../../containers';
import {app} from '@src/helpers/constants';

const {ViewInvoice, CreateInvoice} = Invoice;
const index = createBottomTabNavigator(
  {
    BusinessDashboard: {
      screen: props => <BusinessDashboard {...props} />,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        title: 'Home',
        tabBarIcon: ({focused}) => (
          <Icon
            name="home"
            size={24}
            color={focused ? '#fdf' : 'rgba(255,255,255,0.5)'}
          />
        ),
      }),
    },

    ViewInvoice: {
      screen: props => <ViewInvoice {...props} />,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        title: 'Invoice',
        tabBarIcon: ({focused}) => (
          <Icon
            name="receipt"
            size={24}
            color={focused ? '#fdf' : 'rgba(255,255,255,0.5)'}
          />
        ),
      }),
    },
    CreateInvoice: {
      screen: props => <CreateInvoice {...props} />,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        title: 'CreateInvoice',
        tabBarIcon: ({focused}) => (
          <Icon
            name="receipt"
            size={24}
            color={focused ? '#fdf' : 'rgba(255,255,255,0.5)'}
          />
        ),
      }),
    },
    ViewOffer: {
      screen: props => <ViewInvoice {...props} />,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        title: 'Offer',
        tabBarIcon: ({focused}) => (
          <Icon
            name="box"
            size={24}
            color={focused ? '#fdf' : 'rgba(255,255,255,0.5)'}
          />
        ),
      }),
    },
    ViewPurchase: {
      screen: props => <ViewInvoice {...props} />,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        title: 'Purchase',
        tabBarIcon: ({focused}) => (
          <Icon
            name="money-bill-wave"
            size={24}
            color={focused ? '#fdf' : 'rgba(255,255,255,0.5)'}
          />
        ),
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 1,
      },
      headerTintColor: 'gray',
      headerBackTitle: null,
      headerTitle: () => null,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#fdd',
      inactiveTintColor: 'rgba(255,255,255,0.5)',
      keyboardHidesTabBar: true,
      tabStyle: {
        fontFamily: 'Monaco',
        borderTopWidth: 0,
        backgroundColor: app.primaryColorDarker,
        paddingBottom: 3,
        paddingTop: 7,
      },
    },
    resetOnBlur: true,
    initialRouteName: 'BusinessDashboard',
  },
);

export default createAppContainer(index);
