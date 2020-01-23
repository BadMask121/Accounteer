import React from 'react';
import {Container} from 'unstated';
import {AUTH_STATE} from '../intialState';
import FirebaseAuthentication from './Authentication';
import {SignupPayload, Login} from 'helpers/Interfaces';

export default class AuthState extends Container<any | Object> {
  constructor(props, private auth: FirebaseAuthentication) {
    super(props);
    this.auth = new FirebaseAuthentication();
  }
  state = AUTH_STATE;

  setLoggedIn = () => {
    this.setState({
      isLoggedIn: true,
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

  login = async (values: Login) => {
    return this.auth.login(values);
  };
  signup = async (values: SignupPayload) => {
    Reflect.deleteProperty(values, 'confirmpassword');
    return this.auth.signup(values);
  };
}
