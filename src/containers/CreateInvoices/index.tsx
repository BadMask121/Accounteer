import React, {Component} from 'react';
import CreateInvoices from '../../components/screens/CreateInvoices';
export default class extends Component {
  render() {
    return <CreateInvoices {...this.props} />;
  }
}
