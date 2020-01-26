import React, {Component, PureComponent} from 'react';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import {Platform, TouchableHighlightBase} from 'react-native';
import {Toast, Root} from 'native-base';
import * as _ from 'lodash';

import {CreateInvoice} from 'components/screens/Invoice';
import {InvoiceService} from 'providers/App/services';
import {CreateItemProps, CreateInvoiceProps} from 'helpers/Interfaces';
import InvalidException from 'helpers/error/exceptions/InvalidException';

export default class extends PureComponent {
  invoiceService = new InvoiceService();
  state = {
    mode: 'date',
    show: false,
    isIssue: true,
    issuedate: moment(new Date()),
    duedate: moment(new Date()),
    selectedValue: 'key0',
    attachmentCount: 0,
    attachments: [],
    showAddItemModal: false,
    ItemSubmitting: false,
    ItemData: [],
    fetchingItem: true,
    seletedItem: {},
  };

  componentDidMount = () => {
    this.fetchItems(
      this.props.screenProps.appstate.state.selectedOrganisation.id,
    );
  };

  setItemData = item => {
    return this.setState({
      ...this.state,
      ItemData: [...item],
      fetchingItem: false,
    });
  };

  onItemPicked = value => {
    this.setState({
      ...this.state,
      seletedItem: value,
    });
  };

  onPickerChangeValue = value =>
    this.setState({...this.state, selectedValue: value});
  //set the dates
  setDate = (event, date) => {
    date = this.state.isIssue
      ? {
          issuedate: moment(date),
        }
      : {
          duedate: moment(date),
        };
    this.setState(prev => ({
      ...prev,
      show: Platform.OS === 'ios' ? true : false,
      ...date,
    }));
  };

  // toggle date
  showDateTime = (mode, isIssue) =>
    this.setState(prev => ({
      ...prev,
      show: true,
      isIssue,
      mode,
    }));

  onClickAttachment = async () => {
    // Pick multiple files
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.plainText,
          DocumentPicker.types.images,
        ],
      });
      for (const {uri, name, size, type} of results) {
        const fileDetails = {
          uri,
          name,
          size,
          type,
        };

        this.setState({
          ...this.state,
          attachments: [...this.state.attachments, {...fileDetails}],
          attachmentCount: this.state.attachmentCount + 1,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  onClickAddItem = (condition: Boolean) =>
    this.setState({
      ...this.state,
      showAddItemModal: condition,
    });

  //add items to business id
  addItem = async (values: CreateItemProps) => {
    this.setState({
      ...this.state,
      ItemSubmitting: true,
    });
    this.invoiceService
      .createBusinessItem(values)
      .then(res => {
        if (res.token) {
          this.setState({
            ...this.state,
            ItemSubmitting: false,
          });
          Toast.show({
            text: 'Added new item',
            type: 'success',
            position: 'bottom',
          });
          this.onClickAddItem(false);
        }
      })
      .catch(err => {
        this.setState({
          ...this.state,
          ItemSubmitting: false,
        });

        let message = 'Error: No Item Added';
        if (err.code === 408);
        message = 'Error: Item already exists';

        Toast.show({
          text: message,
          type: 'danger',
          position: 'bottom',
        });
      });
  };

  fetchItems = id => {
    this.setState({
      ...this.state,
      fetchingItem: true,
    });
    return this.invoiceService
      .getAllItemsByBusinessId(id)
      .then(res => this.setItemData(res));
  };

  // finally create invoice
  createInvoice = values => {
    if (_.isEmpty(values.item))
      return Toast.show({
        text: 'Please pick an item',
        type: 'warning',
      });

    this.props.screenProps.appstate.setSubmitting(true);
    this.invoiceService
      .createInvoice()
      .then(res => {
        console.log(res);
        this.props.screenProps.appstate.setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        this.props.screenProps.appstate.setSubmitting(false);
      });
  };

  render() {
    return (
      <Root>
        <CreateInvoice
          {...this.props}
          {...this.state}
          setDate={this.setDate}
          showDateTime={this.showDateTime}
          onClickAttachment={this.onClickAttachment}
          onClickAddItem={this.onClickAddItem}
          onPickerChangeValue={this.onPickerChangeValue}
          addItem={this.addItem}
          ItemSubmitting={this.state.ItemSubmitting}
          onItemPicked={this.onItemPicked}
          fetchItems={this.fetchItems}
          attachments={this.state.attachments}
          selectedItem={this.state.seletedItem}
          itemData={this.state.ItemData}
          fetchingItem={this.state.fetchingItem}
          createInvoice={this.createInvoice}
        />
      </Root>
    );
  }
}
