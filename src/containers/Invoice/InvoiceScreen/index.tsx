import React, {Component, PureComponent, Suspense, lazy} from 'react';
import {ActivityIndicator} from 'react-native';
import {InvoiceService} from 'providers/App/services';
const Invoices = lazy(() =>
  import('../../../components/screens/Invoice/Invoices'),
);

import Spinner from 'react-native-loading-spinner-overlay';
import {isEmptyArray} from 'formik';
export default class extends PureComponent {
  invoiceService = new InvoiceService();
  LIMIT = 10;
  state = {
    InvoiceData: [],
    fetching: true,
  };

  componentDidMount = () => {
    this.fetchInvoice(
      this.props.screenProps.appstate.state.selectedOrganisation.id,
      100,
      this.LIMIT,
    );
  };

  fetchInvoice = (id, offset, limit) => {
    this.setState({...this.state, fetching: true});
    this.invoiceService
      .getInvoiceByBusinessId(id, offset, limit)
      .then(res => {
        if (res instanceof Array)
          this.setState({
            ...this.state.InvoiceData,
            fetching: false,
            InvoiceData: this.state.InvoiceData.concat(res),
          });
      })
      .catch(err => {
        this.setState({...this.state, fetching: false});
      });
  };
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
        <Invoices
          fetching={this.state.fetching}
          InvoiceData={this.state.InvoiceData}
          fetchInvoice={this.fetchInvoice}
          limit={this.LIMIT}
          {...this.props}
        />
      </Suspense>
    );
  }
}
