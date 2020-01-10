import React, {Component} from 'react';
import LoginView from '../../components/screens/Login/index';
import {app} from '@src/helpers/constants';
export default class extends Component {
  handleSubmit = () => {
    this.props.navigation.navigate(app.ROUTES.APP);
  };
  render() {
    return <LoginView handleSubmit={this.handleSubmit} />;
  }
}
