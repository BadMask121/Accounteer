import React, {Component} from 'react';
import ConfirmSignup from '../../../components/screens/Signup/ConfirmSignup';
import subscribe from '../../../subscriber';

class index extends Component {
  constructor(props) {
    super(props);
    this.authstate = this.props.authstate;
    this.appstate = this.props.appstate;

    this.appstate.setLoading(false);
  }

  handleSubmit = async values => {
    this.appstate.setSubmitting(true);
    await this.authstate.setSignupPayload(values);
  };
  render() {
    return <ConfirmSignup handleSubmit={this.handleSubmit} {...this.props} />;
  }
}

export default subscribe(index);
