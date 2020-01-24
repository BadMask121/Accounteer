import React from 'react';
import {Container} from 'unstated';
import {AUTH_STATE} from '../intialState';
import FirebaseAuthentication from './Authentication';
import {SignupPayload, Login} from 'helpers/Interfaces';
import AsyncStorage from '@react-native-community/async-storage';
import {app, auth as authConstant} from 'helpers/constants';

export default class AuthState extends Container<any | Object> {
  constructor(props, private auth: FirebaseAuthentication) {
    super(props);
    this.auth = new FirebaseAuthentication();
  }
  state = AUTH_STATE;

  checkSession = async () => {
    let route =
      (await AsyncStorage.getItem(authConstant.AUTH_TOKEN)) &&
      (await AsyncStorage.getItem(authConstant.USER_DETAILS_TOKEN))
        ? async () => {
            await this.setLoggedIn(true);
            return true;
          }
        : async () => {
            await this.setLoggedIn(false);
            return false;
          };

    route = await route();

    return Promise.resolve(route);
  };

  setLoggedIn = (condition: Boolean) => {
    this.setState({
      isLoggedIn: condition,
    });
  };

  setLoginPayload = async payload => {
    await this.setState(prev => ({
      ...prev,
      login: {
        ...prev.login,
        ...payload,
      },
    }));
  };

  // signup payload on state
  setSignupPayload = async payload => {
    await this.setState({
      signup: {
        ...this.state.signup,
        ...payload,
      },
    });
    return this.state.signup;
  };

  logout = async () => {
    await AsyncStorage.multiRemove([
      authConstant.AUTH_TOKEN,
      authConstant.USER_DETAILS_TOKEN,
    ]);
    return this.auth.logout();
  };
  login = async (values: Login) => {
    return this.auth.login(values);
  };
  signup = async (values: SignupPayload) => {
    Reflect.deleteProperty(values, 'confirmpassword');
    return this.auth.signup(values);
  };
}
