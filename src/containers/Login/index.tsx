import React, {Component, PureComponent} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginView from 'components/screens/Login/index';
import {app, auth} from '@src/helpers/constants';
import subscriber from 'subscriber';
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
        return Alert.alert('Error', JSON.stringify(err));
      });
  };
  render() {
    return <LoginView handleSubmit={this.handleSubmit} {...this.props} />;
  }
}

export default subscriber(Login);
