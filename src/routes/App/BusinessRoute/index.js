import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Invoice, BusinessDashboard} from '../../../containers';
import {app} from '@src/helpers/constants';

const {ViewInvoice, CreateInvoice, Invoices} = Invoice;

const InvoicesRoute = createAppContainer(
  createStackNavigator(
    {
      Invoices: {
        screen: props => <Invoices {...props} />,
        navigationOptions: ({navigation}) => ({
          headerShown: false,
          title: 'Invoices',
        }),
      },
      ViewInvoice: {
        screen: props => <ViewInvoice {...props} />,
        navigationOptions: ({navigation}) => ({
          headerShown: false,
          title: 'ViewInvoice',
        }),
      },
      CreateInvoice: {
        screen: props => <CreateInvoice {...props} />,
        navigationOptions: ({navigation}) => ({
          headerShown: false,
          title: 'CreateInvoice',
        }),
      },
    },
    {
      defaultNavigationOptions: {},
    },
  ),
);
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
    Invoices: {
      screen: InvoicesRoute,
      navigationOptions: ({navigation}) => ({
        headerShown: false,
        title: 'Invoices',
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
        title: 'Offers',
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
        title: 'Purchases',
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
      headerMode: 'none',
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
