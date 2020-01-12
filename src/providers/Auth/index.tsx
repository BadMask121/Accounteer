import React from 'react';
import {Container} from 'unstated';
import {AUTH_STATE} from '../intialState';
export default class AuthState extends Container<any | Object> {
  constructor(props) {
    super(props);
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
}
