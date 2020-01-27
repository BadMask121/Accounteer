import React, {Component, PureComponent} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginView from 'components/screens/Login/index';
import {app, auth} from '@src/helpers/constants';
import subscriber from 'subscriber';
import {Root, Toast} from 'native-base';
class Login extends PureComponent {
  constructor(props) {
    super(props);
  }
  handleSubmit = values => {
    this.props.appstate.setSubmitting(true);
    this.props.authstate
      .login(values)
      .then(async (res: any) => {
        if (res.hasOwnProperty('token') && res.hasOwnProperty('userDetails')) {
          await AsyncStorage.setItem(auth.AUTH_TOKEN, res.token);
          await AsyncStorage.setItem(
            auth.USER_DETAILS_TOKEN,
            JSON.stringify(res.userDetails),
          );
          await this.props.authstate.setLoggedIn(true);
          await this.props.appstate.setCurrentUser(res.userDetails);
          this.props.appstate.setSubmitting(false);
          return this.props.navigation.navigate(app.ROUTES.APP);
        }
      })
      .catch((err: Error) => {
        this.props.appstate.setSubmitting(false);
        let message = '';
        try {
          const messageOb = JSON.parse(err.message);
          if (messageOb.code === 404) message = messageOb.info;
          if (messageOb.code === 408) message = messageOb.info;
        } catch (error) {}

        Toast.show({
          text: message || 'Request Error',
          type: 'danger',
        });
      });
  };
  render() {
    return (
      <Root>
        <LoginView handleSubmit={this.handleSubmit} {...this.props} />
      </Root>
    );
  }
}

export default subscriber(Login);
