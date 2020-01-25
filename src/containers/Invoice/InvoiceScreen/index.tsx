import React, {Component, PureComponent} from 'react';
import Invoices from '../../../components/screens/Invoice/Invoices';

export default class extends PureComponent {
  render() {
    return <Invoices {...this.props} />;
  }
}
