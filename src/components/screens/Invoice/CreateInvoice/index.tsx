import React, {useState} from 'react';
import {
  View,
  Text,
  Input,
  Textarea,
  DatePicker,
  Picker,
  Container,
  Content,
} from 'native-base';
import {
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableHighlight,
  ScrollView,
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

import Button from 'components/custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from 'components/custom/Form/Input';
import {app} from '@src/helpers/constants';
import style from './style';

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
  attachmentCount: number;
  attachments: Array;
  setDate: Function;
  showDateTime: Function;
  onClickAttachment: Function;
  onClickAddItem: Function;
  onPickerChangeValue: Function;
  fetchItems: Function;
  ItemSubmitting: Boolean;
  showAddItemModal: Boolean;
  addItem: Function;
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
    fetchItems,
    onClickAddItem,
    addItem,
    ItemSubmitting,
    onPickerChangeValue,
    ...props
  }: Props) => {
    const {width, height} = Dimensions.get('window');

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
                    itemname: '',
                    itemprice: 0,
                  }}
                  onSubmit={values => {
                    values.id = selectedOrganisation.id;
                    addItem(values);
                  }}>
                  {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View>
                      <FormInput
                        placeholder="Item Name"
                        name="itemname"
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
                            style={{
                              fontSize: 20,
                              color: app.primaryColorDark,
                              paddingLeft: 12,
                              top: 0,
                            }}
                          />
                        )}
                        inputStyle={{
                          textAlign: 'left',
                        }}
                        handleChange={handleChange}
                      />
                      <FormInput
                        placeholder="Item Price"
                        name="itemprice"
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
                            style={{
                              fontSize: 20,
                              color: app.primaryColorDark,
                              paddingLeft: 12,
                              top: 0,
                            }}
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

    const data = [
      'Apples',
      'Broccoli',
      'Chicken',
      'Duck',
      'Eggs',
      'Fish',
      'Granola',
      'Hash Browns',
    ];

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
              initialValues={{
                client: '',
                reference: '',
                item: '',
                quantity: '',
                description: '',
              }}
              onSubmit={values => console.log(values)}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
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
                          fontSize: 20,
                          color: app.primaryColorDark,
                          paddingLeft: 12,
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
                        value={isIssue ? issuedate.toDate() : duedate.toDate()}
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
                          top: 0,
                          color: app.primaryColor,
                          paddingLeft: 12,
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
                      <View style={{alignItems: 'flex-end', marginTop: 20}}>
                        <AutoInput
                          placeholder="Add Items"
                          name="item"
                          data={data}
                          valueExtractor={item => item}
                          rightTextExtractor={item => item}
                          renderIcon={() => (
                            <Icon
                              name={
                                Platform.OS === 'ios'
                                  ? 'cart-arrow-down'
                                  : 'cart-arrow-down'
                              }
                              type="FontAwesome5"
                              size={20}
                              style={{
                                ...style.leftIcon,
                                paddingRight: 11,
                                color: app.primaryColorDark,
                              }}
                            />
                          )}
                          inputStyle={{
                            ...style.input,
                            paddingLeft: 50,
                            width: width / 2,
                          }}
                          handleChange={handleChange}
                        />
                      </View>
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
                          valid={false}
                          inputViewStyle={{
                            ...style.input,
                            width: width / 2,
                          }}
                          renderRightIcon={() => (
                            <Icon
                              name={
                                Platform.OS === 'ios'
                                  ? 'ios-menu'
                                  : 'md-analytics'
                              }
                              style={{
                                top: 0,
                                color: app.primaryColor,
                                paddingLeft: 12,
                              }}
                            />
                          )}
                          inputStyle={{...style.input, width: width / 2}}
                          handleChange={handleChange}
                        />
                      </View>
                    </View>
                    <Textarea
                      placeholder="Description"
                      style={style.descriptionArea}
                      onChangeText={handleChange}
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
                          0.00
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
                          0.00
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
                    disable={!true}
                    buttonStyle={style.saveBtn}
                    textStyle={{fontFamily: app.primaryFontBold, color: '#000'}}
                    onPress={handleSubmit}
                    text="Save"
                  />
                  <Button
                    disable={!true}
                    buttonStyle={{
                      borderRadius: 5,
                    }}
                    textStyle={{fontFamily: app.primaryFontBold}}
                    onPress={handleSubmit}
                    text="Save And Approve"
                  />
                </ScrollView>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  },
);

export default withKeyboardAwareScrollView(index);
