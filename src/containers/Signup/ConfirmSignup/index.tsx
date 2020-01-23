import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import ConfirmSignup from '../../../components/screens/Signup/ConfirmSignup';
import subscribe from '../../../subscriber';
import {app, auth} from 'helpers/constants';
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
          this.appstate.setSubmitting(false);
          return this.props.navigation.navigate(app.ROUTES.DASHBOARD);
        }
      })
      .catch((err: Error) => {
        this.appstate.setSubmitting(false);
        Alert.alert('Error', JSON.stringify(err));
      });
  };
  render() {
    return (
      <ConfirmSignup
        handleSubmit={this.handleSubmit}
        props={this.props}
        {...this.props}
      />
    );
  }
}

export default subscribe(index);
