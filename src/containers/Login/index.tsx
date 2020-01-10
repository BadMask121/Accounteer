import React, {Component} from 'react';
import LoginView from '../../components/screens/Login/index';

export default class extends Component {
  handleSubmit = () => {
    this.props.navigation.navigate('Dashboard');
  };
  render() {
    return <LoginView handleSubmit={this.handleSubmit} />;
  }
}
