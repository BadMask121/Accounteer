import React, {Component, PureComponent, lazy, Suspense} from 'react';
// import {BusinessDashboard} from 'components/screens';
import subscriber from 'subscriber';
import {ActivityIndicator} from 'react-native';
const BusinessDashboard = lazy(() =>
  import('components/screens/BusinessDashboard'),
);

import Spinner from 'react-native-loading-spinner-overlay';
class BusinessDashbord extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Suspense
        fallback={
          <Spinner
            visible={true}
            textContent={''}
            textStyle={{color: '#fff'}}
          />
        }>
        <BusinessDashboard {...this.props} />
      </Suspense>
    );
  }
}

export default subscriber(BusinessDashbord);
