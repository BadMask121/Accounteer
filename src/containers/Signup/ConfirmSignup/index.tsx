import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import ConfirmSignup from '../../../components/screens/Signup/ConfirmSignup';
import subscribe from '../../../subscriber';
import {app, auth} from 'helpers/constants';
import {Toast, Root} from 'native-base';
class index extends Component {
  constructor(props) {
    super(props);
    this.authstate = this.props.authstate;
    this.appstate = this.props.appstate;

    this.appstate.setLoading(false);
  }

  handleSubmit = async values => {
    this.appstate.setSubmitting(true);
    const signupValues = await this.authstate.setSignupPayload(values);

    signupValues.organisation = {
      organisationname: signupValues.organisationname,
      organisationlocation: signupValues.organisationlocation,
      currency: signupValues.currency,
    };
    this.authstate
      .signup(signupValues)
      .then(async (res: any) => {
        if (res.hasOwnProperty('token')) {
          await AsyncStorage.setItem(auth.AUTH_TOKEN, res.token);
          await AsyncStorage.setItem(
            auth.USER_DETAILS_TOKEN,
            JSON.stringify(res.userDetails),
          );

          await this.props.authstate.setLoggedIn(true);
          await this.props.appstate.setCurrentUser(res.userDetails);
          this.appstate.setSubmitting(false);
          return this.props.navigation.navigate(app.ROUTES.APP);
        }
      })
      .catch((err: Error) => {
        this.appstate.setSubmitting(false);
        let message = '';

        try {
          const messageOb = JSON.parse(err.message);
          if (messageOb.code === 400) message = messageOb.info;
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
        <ConfirmSignup
          handleSubmit={this.handleSubmit}
          props={this.props}
          {...this.props}
        />
      </Root>
    );
  }
}

export default subscribe(index);
