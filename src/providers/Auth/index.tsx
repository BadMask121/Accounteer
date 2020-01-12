import React from 'react';
import {Container} from 'unstated';
import {AUTH_STATE} from '../intialState';
import FirebaseAuthentication from './Authentication';
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
    return await this.setState({
      signup: {
        ...this.state.signup,
        ...payload,
      },
    });
  };

  signup = async values => {
    return await this.auth.signup(values);
  };
}
