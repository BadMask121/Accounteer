import React, {Component} from 'react';
import HomePage from 'components/screens/HomePage';
export default class extends Component {
  render() {
    return <HomePage {...this.props} />;
  }
}
