import React, {Component} from 'react';
import {CreateInvoice} from 'components/screens/Invoice';

export default class extends Component {
  render() {
    return <CreateInvoice {...this.props} />;
  }
}
