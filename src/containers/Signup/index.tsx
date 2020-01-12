import React, {Component} from 'react';
import SignupView from '../../components/screens/Signup/index.tsx';
import {app} from '@src/helpers/constants';
import subscribe from 'subscriber';

class index extends Component {
  constructor(props) {
    super(props);
    this.authstate = this.props.authstate;
    this.appstate = this.props.appstate;
  }
  handleSubmit = async values => {
    this.appstate.setSubmitting(true);
    await this.authstate.setSignupPayload(values);
    return this.props.navigation.navigate(app.ROUTES.CONFIRM_SIGNUP);
  };
  render() {
    return <SignupView {...this.props} handleSubmit={this.handleSubmit} />;
  }
}

export default subscribe(index);
