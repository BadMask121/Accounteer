import React, {Component, PureComponent, lazy, Suspense} from 'react';
// import {BusinessDashboard} from 'components/screens';
import subscriber from 'subscriber';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import * as _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import {app} from 'helpers/constants';
const BusinessDashboard = lazy(() =>
  import('components/screens/BusinessDashboard'),
);
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
