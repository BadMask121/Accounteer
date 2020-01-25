import React, {Component, PureComponent} from 'react';
import {BusinessDashboard} from 'components/screens';
import subscriber from 'subscriber';

class BusinessDashbord extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return <BusinessDashboard {...this.props} />;
  }
}

export default subscriber(BusinessDashbord);
