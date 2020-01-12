import React, {Component} from 'react';
import Invoices from '../../../components/screens/Invoice/Invoices';

export default class extends Component {
  render() {
    return <Invoices {...this.props} />;
  }
}
