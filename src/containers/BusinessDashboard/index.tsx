import React, {Component} from 'react';
import BusinessDashboard from '@src/components/screens/BusinessDashboard';
export default class extends Component {
  render() {
    return <BusinessDashboard {...this.props} />;
  }
}
