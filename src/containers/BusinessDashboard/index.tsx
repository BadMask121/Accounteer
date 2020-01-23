import React, {Component} from 'react';
import {BusinessDashboard} from 'components/screens';
import subscriber from 'subscriber';

class BusinessDashbord extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <BusinessDashboard {...this.props} />;
  }
}

export default subscriber(BusinessDashbord);
