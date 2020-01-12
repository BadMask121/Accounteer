import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Welcome from '../../components/screens/Welcome';
import {Login, Signup, ConfirmSignup} from '../../containers';
import AppNavigation from '../App';

const index = values =>
  createStackNavigator(
    {
      Welcome: {
        screen: props => <Welcome {...props} {...values} />,
        navigationOptions: ({navigation}) => ({
          headerShown: false,
        }),
      },
      Login: {
        screen: props => <Login {...props} {...values} />,
      },
      Signup: {
        screen: props => <Signup {...props} {...values} />,
      },
      ConfirmSignup: {
        screen: props => <ConfirmSignup {...props} {...values} />,
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
      initialRouteName: 'Welcome',
    },
  );

export default index;
