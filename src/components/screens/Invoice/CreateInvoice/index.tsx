import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Input,
  Textarea,
  DatePicker,
  Picker,
  Container,
  Content,
  Toast,
} from 'native-base';
import {
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableHighlight,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FloatingAction} from 'react-native-floating-action';
import {
  Autocomplete,
  withKeyboardAwareScrollView,
} from 'react-native-dropdown-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import shortid from 'shortid';
import * as _ from 'lodash';

import Button from 'components/custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from 'components/custom/Form/Input';
import {app} from '@src/helpers/constants';
import style from './style';
import {createInvoiceValidationSchema} from 'helpers/validation/schema';

const action = [
  {
    text: 'Add Attachment',
    icon: require('@assets/images/paperclip.svg'),
    name: 'attachment',
    position: 1,
  },
  {
    text: 'Add Item',
    icon: require('@assets/images/bag.svg'),
    name: 'item',
    position: 1,
  },
];

interface Props {
  mode: String;
  show: Boolean;
  isIssue: Boolean;
  issuedate: any;
  duedate: any;
  selectedValue: String;
  attachmentCount?: number;
  attachments?: Array;
  setDate: Function;
  showDateTime: Function;
  onClickAttachment: Function;
  onClickAddItem: Function;
  onPickerChangeValue: Function;
  onItemPicked: Function;
  selectedItem: Object;
  ItemSubmitting: Boolean;
  showAddItemModal: Boolean;
  itemData: Array;
  fetchingItem: Boolean;
  createInvoice: Function;
  addItem: Function;
  fetchItems: Function;
}

// TODO check if user is coming from busines dashboard and add an dropdown to select which business user wants
// add invoice to
const index = React.memo(
  ({
    mode,
    show,
    attachments,
    isIssue,
    selectedValue,
    attachmentCount,
    duedate,
    issuedate,
    setDate,
    showDateTime,
    showAddItemModal,
    onClickAttachment,
    selectedItem,
    fetchItems,
    onItemPicked,
    onClickAddItem,
    addItem,
    ItemSubmitting,
    createInvoice,
    onPickerChangeValue,
    itemData,
    fetchingItem,
    ...props
  }: Props) => {
    const {width, height} = Dimensions.get('window');

    const [state, setstate] = useState({
      description: '',
    });

    // control description on chnage text
    const textChange = value => setstate({...state, description: value});
    const {selectedOrganisation} = props.screenProps.appstate.state;
    //format our issued and due date
    const format = (year, month, day) => `${year}/${month}/${day}`;

    const AutoInput = autoInputProps => (
      <View style={style.inputContainer}>
        <Autocomplete
          key={shortid.generate()}
          style={{
            maxHeight: 100,
          }}
          inputStyle={{
            ...style.input,
            width,
          }}
          minimumCharactersCount={2}
          highlightText
          valueExtractor={item => item.name}
          rightContent
          {...autoInputProps}
        />

        {autoInputProps.rightIcon || <></>}
      </View>
    );

    const renderAddItemModal = () => {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          animated
          visible={showAddItemModal}
          presentationStyle="overFullScreen"
          hardwareAccelerated>
          <Container
            style={{
              ...style.addItemModalContainer,
            }}>
            <View style={style.addItemModalContent}>
              <TouchableHighlight onPress={() => onClickAddItem(false)}>
                <View style={{alignItems: 'flex-end', padding: 10}}>
                  <Icon name="times" color={app.primaryColorDark} size={25} />
                </View>
              </TouchableHighlight>
              <View>
                <Formik
                  initialValues={{
                    name: '',
                    price: 0,
                    tax: 0,
                  }}
                  onSubmit={values => {
                    values.id = selectedOrganisation.id;
                    addItem(values);
                  }}>
                  {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View>
                      <FormInput
                        placeholder="Item Name"
                        name="name"
                        submitting={false}
                        valid={false}
                        inputViewStyle={{
                          ...style.inputViewStyle,
                          marginLeft: 0,
                        }}
                        renderRightIcon={() => (
                          <Icon
                            name="cart-arrow-down"
                            type="FontAwesome5"
                            style={style.addItemIcon}
                          />
                        )}
                        inputStyle={{
                          textAlign: 'left',
                        }}
                        handleChange={handleChange}
                      />
                      <FormInput
                        placeholder="Item Price"
                        name="price"
                        type="number"
                        keyboardType="phone-pad"
                        submitting={false}
                        valid={false}
                        inputViewStyle={{
                          ...style.inputViewStyle,
                          marginLeft: 0,
                        }}
                        renderRightIcon={() => (
                          <Icon
                            name="dollar-sign"
                            type="FontAwesome5"
                            style={style.addItemIcon}
                          />
                        )}
                        inputStyle={{
                          textAlign: 'left',
                        }}
                        handleChange={handleChange}
                      />
                      <FormInput
                        placeholder="Tax"
                        name="tax"
                        type="number"
                        keyboardType="phone-pad"
                        submitting={false}
                        valid={false}
                        inputViewStyle={{
                          ...style.inputViewStyle,
                          marginLeft: 0,
                        }}
                        renderRightIcon={() => (
                          <Icon
                            name="cash-register"
                            type="FontAwesome5"
                            style={style.addItemIcon}
                          />
                        )}
                        inputStyle={{
                          textAlign: 'left',
                        }}
                        handleChange={handleChange}
                      />
                      <Button
                        disable={ItemSubmitting}
                        loading={ItemSubmitting}
                        textStyle={{
                          fontFamily: app.primaryFontBold,
                          color: '#fff',
                        }}
                        onPress={handleSubmit}
                        text="Add Item"
                      />
                    </View>
                  )}
                </Formik>
              </View>
            </View>
          </Container>
        </Modal>
      );
    };

    const TitleTop = () => (
      <View
        style={{
          flex: 1,
          marginTop: 30,
          width,
        }}>
        <View style={style.titleContainer}>
          <TopTitle title="New Invoice" />
          <View style={style.attachmentIcon}>
            <View style={style.attachmentNumber}>
              <Text style={style.attachmentNumberText}>{attachmentCount}</Text>
            </View>
            <Icon name="paperclip" size={20} color={app.primaryColor} />
          </View>
        </View>
      </View>
    );

    return (
      <KeyboardAvoidingView style={style.container}>
        <View>
          {showAddItemModal && renderAddItemModal()}
          <TitleTop />
          {typeof props.navigation.state.params !== 'undefined' &&
            props.navigation.state.params.from === 'main' && (
              <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={
                  <Icon
                    name="arrow-dropdown-circle"
                    style={{
                      color: app.primaryColorDark,
                      fontSize: 25,
                    }}
                  />
                }
                accessibilityLabel="Select Business"
                placeholderIconColor={app.primaryColorDark}
                style={{
                  width: '50%',
                  color: app.primaryColorDark,
                  alignSelf: 'flex-end',
                }}
                selectedValue={selectedValue}
                onValueChange={onPickerChangeValue}>
                <Picker.Item label="Ace Corps" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            )}
          <View
            style={{
              flex: 1,
              margin: 10,
            }}>
            <Formik
              // enableReinitialize
              initialValues={{
                id: '',
                attachments: [],
                client: '',
                reference: '',
                quantity: '1.0',
                totalInTax: 0.0,
                totalExTax: 0.0,
                amountPaid: 0.0,
                issuedate: '',
                duedate: '',
              }}
              validationSchema={createInvoiceValidationSchema}
              onSubmit={values => {
                values.item = selectedItem;
                values.issuedate = format(
                  issuedate.year(),
                  issuedate.month() + 1,
                  issuedate.dayOfYear(),
                );
                values.duedate = format(
                  duedate.year(),
                  duedate.month() + 1,
                  duedate.dayOfYear(),
                );
                values.attachments = attachments;
                values.id = selectedOrganisation.id;
                values.amountPaid = parseFloat(values.amountPaid);
                values.totalExTax = parseFloat(values.totalExTax);

                if (values.amountPaid > values.totalExTax)
                  return Toast.show({
                    text:
                      'Amount Paid cannot be higher than total amount of items',
                    type: 'warning',
                  });
                values.description = state.description;
                return createInvoice(values);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                isValid,
                errors,
              }) => {
                const totalExTax =
                  parseFloat(parseFloat(selectedItem.price)) *
                  parseFloat(
                    (!_.isEmpty(values.quantity) && values.quantity) || 1.0,
                  );
                const totalInTax =
                  parseFloat(selectedItem.price) *
                    parseFloat(
                      (!_.isEmpty(values.quantity) && values.quantity) || 1.0,
                    ) +
                  parseFloat(selectedItem.tax || 0.0);

                // assign mutated values
                values.totalInTax = totalInTax;
                values.totalExTax = totalExTax;

                return (
                  <ScrollView
                    automaticallyAdjustContentInsets
                    alwaysBounceVertical>
                    <FormInput
                      placeholder="Client"
                      name="client"
                      submitting={false}
                      valid={false}
                      inputViewStyle={style.inputViewStyle}
                      renderRightIcon={() => (
                        <Icon
                          name="user-check"
                          type="FontAwesome5"
                          style={{
                            ...style.leftIcon,
                            fontSize: 20,
                            color: app.primaryColorDark,
                            top: 0,
                          }}
                        />
                      )}
                      inputStyle={{
                        textAlign: 'left',
                      }}
                      handleChange={handleChange}
                    />

                    <View style={{...style.dateContainer}}>
                      <View>
                        <Text style={style.dateTitleStyle}>Issue Date</Text>
                        <TouchableOpacity
                          onPress={() => showDateTime('date', true)}>
                          <Text style={style.dateStyle}>
                            {format(
                              issuedate.year(),
                              issuedate.month() + 1,
                              issuedate.dayOfYear(),
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text
                          style={{
                            ...style.dateTitleStyle,
                            alignSelf: 'flex-end',
                          }}>
                          Due Date
                        </Text>
                        <TouchableOpacity
                          onPress={() => showDateTime('date', false)}>
                          <Text style={style.dateStyle}>
                            {format(
                              duedate.year(),
                              duedate.month() + 1,
                              duedate.dayOfYear(),
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {show ? (
                        <DateTimePicker
                          value={
                            isIssue ? issuedate.toDate() : duedate.toDate()
                          }
                          mode={'date'}
                          is24Hour={true}
                          display="default"
                          onChange={setDate}
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                    <FormInput
                      placeholder="Reference"
                      name="reference"
                      submitting={false}
                      valid={false}
                      inputViewStyle={style.inputViewStyle}
                      renderRightIcon={() => (
                        <Icon
                          name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                          style={{
                            ...style.leftIcon,
                            top: 0,
                            color: app.primaryColor,
                          }}
                        />
                      )}
                      inputStyle={{
                        textAlign: 'left',
                      }}
                      handleChange={handleChange}
                    />
                    <View style={{marginTop: 30, marginBottom: 50}}>
                      <TopTitle
                        title="Items"
                        textStyle={{fontSize: 25, color: 'rgba(0,0,0,0.7)'}}
                      />
                      <View style={{flexDirection: 'row', flexShrink: 0.1}}>
                        <TouchableWithoutFeedback
                          onPressIn={() => fetchItems(selectedOrganisation.id)}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'baseline',
                              marginTop: 20,
                            }}>
                            {fetchingItem ? (
                              <ActivityIndicator
                                color={app.primaryColorDark}
                                style={{top: -15, left: 5}}
                              />
                            ) : (
                              <Icon
                                name="cart-plus"
                                size={20}
                                color={app.primaryColorDark}
                                style={{
                                  top: -10,
                                  paddingLeft: 12,
                                }}
                              />
                            )}
                            <Picker
                              mode="dropdown"
                              iosHeader="Select an item"
                              iosIcon={
                                <Icon
                                  name="arrow-dropdown-circle"
                                  style={{
                                    color: app.primaryColorDark,
                                    fontSize: 25,
                                  }}
                                />
                              }
                              enabled={!fetchingItem}
                              accessibilityLabel="Select Business"
                              placeholderIconColor={app.primaryColorDark}
                              style={{
                                ...style.input,
                                width: width / 2.5,
                              }}
                              selectedValue={
                                selectedItem.name !== null && selectedItem
                              }
                              onValueChange={onItemPicked}>
                              <Picker.Item label="Pick Item" value="key0" />
                              {fetchingItem ? (
                                <Picker.Item label="fetching" value="key0" />
                              ) : (
                                itemData.map((element, index) => (
                                  <Picker.Item
                                    label={element.name}
                                    key={shortid.generate()}
                                    value={element}
                                  />
                                ))
                              )}
                            </Picker>
                          </View>
                        </TouchableWithoutFeedback>
                        <View style={{alignItems: 'center'}}>
                          <Text
                            style={{
                              ...style.dateTitleStyle,
                              color: 'rgba(0,0,0,0.7)',
                            }}>
                            Quantity
                          </Text>
                          <FormInput
                            placeholder="1.0"
                            name="quantity"
                            submitting={false}
                            keyboardType="phone-pad"
                            valid={false}
                            inputViewStyle={{
                              ...style.input,
                              width: width / 2,
                            }}
                            renderRightIcon={() => (
                              <Icon
                                name={
                                  Platform.OS === 'ios'
                                    ? 'sort-amount-up'
                                    : 'sort-amount-up'
                                }
                                type="FontAwesome5"
                                style={{
                                  ...style.leftIcon,
                                  top: 0,
                                  color: app.primaryColor,
                                }}
                              />
                            )}
                            inputStyle={{...style.input, width: width / 2}}
                            handleChange={handleChange}
                          />
                        </View>
                      </View>

                      <View>
                        <Text
                          style={{
                            ...style.dateTitleStyle,
                            paddingLeft: 15,
                            color: 'rgba(0,0,0,0.7)',
                          }}>
                          Amount Paid
                        </Text>
                        <FormInput
                          placeholder="1000"
                          name="amountPaid"
                          submitting={false}
                          keyboardType="phone-pad"
                          valid={false}
                          inputViewStyle={{
                            ...style.input,
                          }}
                          renderRightIcon={() => (
                            <Icon
                              name={
                                Platform.OS === 'ios'
                                  ? 'hand-holding-usd'
                                  : 'hand-holding-usd'
                              }
                              type="FontAwesome5"
                              style={{
                                ...style.leftIcon,
                                top: 0,
                                color: app.primaryColor,
                              }}
                            />
                          )}
                          inputStyle={{
                            ...style.input,
                            textAlign: 'left',
                            width: width / 2,
                          }}
                          handleChange={handleChange}
                        />
                      </View>
                      <Textarea
                        placeholder="Description"
                        style={style.descriptionArea}
                        onChangeText={textChange}
                      />
                      <View style={{marginTop: 15}}>
                        <View style={style.taxContainer}>
                          <Text style={{fontFamily: app.primaryFontMedium}}>
                            Tax
                          </Text>
                          <Text
                            style={{
                              color: 'rgba(0,0,0,0.6)',
                            }}>
                            {typeof selectedItem.tax !== 'undefined'
                              ? selectedItem.tax
                              : 0.0}
                          </Text>
                        </View>
                        <View style={style.taxContainer}>
                          <Text style={{fontFamily: app.primaryFontMedium}}>
                            Total In. tax
                          </Text>
                          <Text
                            style={{
                              color: 'rgba(0,0,0,0.6)',
                            }}>
                            {typeof selectedItem.tax !== 'undefined' ||
                            typeof selectedItem.price !== 'undefined'
                              ? totalInTax
                              : 0.0}
                          </Text>
                        </View>
                        <View style={style.taxContainer}>
                          <Text style={{fontFamily: app.primaryFontMedium}}>
                            Total ex. tax
                          </Text>
                          <Text
                            style={{
                              color: 'rgba(0,0,0,0.6)',
                            }}>
                            {typeof selectedItem.tax !== 'undefined' ||
                            typeof selectedItem.price !== 'undefined'
                              ? totalExTax
                              : 0.0}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <FloatingAction
                      distanceToEdge={{vertical: 120, horizontal: 10}}
                      showBackground={false}
                      actions={action}
                      onPressItem={name => {
                        switch (name) {
                          case 'attachment':
                            return onClickAttachment();
                            break;
                          case 'item':
                            return onClickAddItem(true);

                          default:
                            break;
                        }
                      }}
                    />
                    <Button
                      disable={!isValid}
                      loading={ItemSubmitting}
                      loaderColor={app.primaryColorDark}
                      buttonStyle={style.saveBtn}
                      textStyle={{
                        fontFamily: app.primaryFontBold,
                        color: '#000',
                      }}
                      onPress={() => {
                        values.type = 'save';
                        return handleSubmit(values);
                      }}
                      text="Save"
                    />
                    <Button
                      disable={!isValid}
                      loading={ItemSubmitting}
                      loaderColor={app.primaryColorDark}
                      buttonStyle={{
                        borderRadius: 5,
                      }}
                      textStyle={{fontFamily: app.primaryFontBold}}
                      onPress={() => {
                        values.type = 'saveandapprove';
                        return handleSubmit(values);
                      }}
                      text="Save And Approve"
                    />
                  </ScrollView>
                );
              }}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  },
);

export default withKeyboardAwareScrollView(index);
