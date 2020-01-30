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
  Icon as NIcon,
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
  SafeAreaView,
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
  selectedOrganisationId?: number;
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
    selectedOrganisationId,
    ...props
  }: Props) => {
    const {width, height} = Dimensions.get('window');

    const [state, setstate] = useState({
      description: '',
    });

    // control description on chnage text
    const textChange = value => setstate({...state, description: value});
    const {currentUserOrganisations} = props.screenProps.appstate.state;

    //format our issued and due date
    const format = (year, month, day) => `${year}/${month}/${day}`;

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
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="#fff"
                style={{backgroundColor: '#fff'}}
                onPress={() => onClickAddItem(false)}>
                <View style={{alignItems: 'flex-end', padding: 10}}>
                  <Icon name="times" color={app.primaryColorDark} size={25} />
                </View>
              </TouchableHighlight>
              <View style={{paddingLeft: 5, paddingRight: 5}}>
                <Formik
                  initialValues={{
                    name: '',
                    price: 0,
                    tax: 0,
                  }}
                  onSubmit={values => {
                    values.id = selectedOrganisationId;
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
      <View style={style.titleContainer}>
        <TopTitle title="New Invoice" />
        <View style={style.attachmentIcon}>
          <View style={style.attachmentNumber}>
            <Text style={style.attachmentNumberText}>{attachmentCount}</Text>
          </View>
          <Icon name="paperclip" size={20} color={app.primaryColor} />
        </View>
      </View>
    );

    return (
      <SafeAreaView style={style.container}>
        <View style={style.container}>
          {showAddItemModal && renderAddItemModal()}
          <TitleTop />
          {typeof props.navigation.state.params !== 'undefined' &&
            props.navigation.state.params.from === 'main' && (
              <View style={{flex: 0.1}}>
                <Picker
                  mode="dropdown"
                  iosHeader="Select business"
                  iosIcon={
                    <NIcon
                      name="ios-arrow-dropdown"
                      style={{
                        color: app.primaryColorLight,
                        fontSize: 20,
                        paddingRight: 10,
                      }}
                    />
                  }
                  placeholder="Select Business"
                  accessibilityLabel="Select Business"
                  placeholderIconColor={app.primaryColorDark}
                  style={{
                    width: '50%',
                    color: app.primaryColorDark,
                    alignSelf: 'flex-end',
                  }}
                  selectedValue={selectedValue}
                  removeClippedSubviews
                  onValueChange={onPickerChangeValue}>
                  {currentUserOrganisations.data.map(element => (
                    <Picker.Item
                      label={element.organisationname}
                      value={element.organisationname}
                      key={element.id}
                    />
                  ))}
                </Picker>
              </View>
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
                values.id = selectedOrganisationId;
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
                          onPress={() => showDateTime('date', !show, true)}>
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
                          onPress={() => showDateTime('date', !show, false)}>
                          <Text style={style.dateStyle}>
                            {format(
                              duedate.year(),
                              duedate.month() + 1,
                              duedate.dayOfYear(),
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {show ? (
                      <View
                        style={{
                          flex: 1,
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          // backgroundColor: '#ddd',
                          zIndex: -1,
                        }}>
                        <DateTimePicker
                          value={
                            isIssue ? issuedate.toDate() : duedate.toDate()
                          }
                          style={{
                            flex: 1,
                            width: '100%',
                            justifyContent: 'center',
                          }}
                          mode={'date'}
                          shouldRasterizeIOS={true}
                          removeClippedSubviews
                          is24Hour={true}
                          display="default"
                          onChange={setDate}
                        />
                      </View>
                    ) : (
                      <></>
                    )}

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
                      <View
                        style={{
                          flexDirection: 'row',
                          flexShrink: 0.1,
                          marginTop: 10,
                          marginBottom: 15,
                        }}>
                        <TouchableWithoutFeedback
                          onPressIn={() => fetchItems(selectedOrganisationId)}>
                          <View style={{width: '45%'}}>
                            <Text
                              style={{
                                ...style.dateTitleStyle,
                                color: 'rgba(0,0,0,0.7)',
                                alignSelf: 'center',
                              }}>
                              Add item
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'baseline',
                              }}>
                              {fetchingItem && Platform.OS !== 'ios' ? (
                                <ActivityIndicator
                                  color={app.primaryColorDark}
                                  style={{top: -15, left: 5}}
                                />
                              ) : Platform.OS !== 'ios' ? (
                                <Icon
                                  name="cart-plus"
                                  size={20}
                                  color={app.primaryColorDark}
                                  style={{
                                    top: -10,
                                    paddingLeft: 12,
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              <Picker
                                mode="dropdown"
                                iosHeader="Select an item"
                                iosIcon={
                                  <View
                                    style={{
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      alignSelf: 'center',
                                    }}>
                                    {fetchingItem ? (
                                      <ActivityIndicator
                                        color={app.primaryColorDark}
                                        style={{top: 0, left: 5}}
                                      />
                                    ) : Platform.OS === 'ios' ? (
                                      <Icon
                                        name="cart-plus"
                                        size={20}
                                        color={app.primaryColorDark}
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </View>
                                }
                                placeholder="Select an item"
                                importantForAccessibility="yes"
                                shouldRasterizeIOS
                                enabled={!fetchingItem}
                                accessibilityLabel="Select Business"
                                placeholderIconColor={app.primaryColorDark}
                                style={{
                                  ...style.input,
                                  backgroundColor:
                                    (Platform.OS === 'ios' &&
                                      'rgba(0,0,0,0.1)') ||
                                    'transparent',
                                  borderWidth: 0.2,
                                  alignItems: 'center',
                                  paddingRight: 15,
                                  top: 5,
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
                          }}
                          handleChange={handleChange}
                        />
                      </View>
                      <Textarea
                        placeholder="Description"
                        style={style.descriptionArea}
                        onChangeText={textChange}
                        scrollEnabled
                        autoCorrect
                        underline
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
      </SafeAreaView>
    );
  },
);

export default index;
