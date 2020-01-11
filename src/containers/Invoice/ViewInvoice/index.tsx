import React, {Component} from 'react';
import {ViewInvoice} from 'components/screens/Invoice';

export default class extends Component {
  render() {
    return <ViewInvoice {...this.props} />;
  }
}
