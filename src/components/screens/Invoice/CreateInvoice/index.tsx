import React, {useState} from 'react';
import {View, Text, Input, Textarea, DatePicker, Picker} from 'native-base';
import {
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Platform,
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
import moment from 'moment';
import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from 'components/custom/Form/Input';
import {app} from '@src/helpers/constants';
import style from './style';
import {ScrollView} from 'react-native-gesture-handler';

const action = [
  {
    text: 'Add Attachment',
    icon: '',
    name: 'attachment',
    position: 1,
  },
  {
    text: 'Add Item',
    icon: '',
    name: 'item',
    position: 1,
  },
];

// TODO check if user is coming from busines dashboard and add an dropdown to select which business user wants
// add invoice to
const index = React.memo(props => {
  const [state, setstate] = useState({
    mode: 'date',
    show: false,
    isIssue: true,
    issuedate: moment(new Date()),
    duedate: moment(new Date()),
    selectedValue: 'key0',
  });

  const {width, height} = Dimensions.get('window');

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
            <Text style={style.attachmentNumberText}>1</Text>
          </View>
          <Icon name="paperclip" size={20} color={app.primaryColor} />
        </View>
      </View>
    </View>
  );

  //format our issued and due date
  const format = (year, month, day) => `${year}/${month}/${day}`;

  //set the dates
  const setDate = (event, date) => {
    date = state.isIssue
      ? {
          issuedate: moment(date),
        }
      : {
          duedate: moment(date),
        };
    setstate(prev => ({
      ...prev,
      show: Platform.OS === 'ios' ? true : false,
      ...date,
    }));
  };

  // toggle date
  const showDateTime = (mode, isIssue) =>
    setstate(prev => ({
      ...prev,
      show: true,
      isIssue,
      mode,
    }));

  const {issuedate, duedate, show, mode} = state;

  return (
    <KeyboardAvoidingView style={style.container}>
      <View>
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
              selectedValue={state.selectedValue}
              onValueChange={item =>
                setstate(prev => ({...prev, selectedValue: item}))
              }>
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
              <ScrollView automaticallyAdjustContentInsets alwaysBounceVertical>
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
                      style={{...style.dateTitleStyle, alignSelf: 'flex-end'}}>
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
                        state.isIssue ? issuedate.toDate() : duedate.toDate()
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
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          ...style.dateTitleStyle,
                          color: 'rgba(0,0,0,0.7)',
                        }}></Text>
                      <FormInput
                        placeholder="Add Items"
                        name="item"
                        submitting={false}
                        valid={false}
                        inputViewStyle={{
                          ...style.input,
                          width: width / 2 - 20,
                        }}
                        renderRightIcon={() => (
                          <Icon
                            name={
                              Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'
                            }
                            size={15}
                            style={{
                              ...style.leftIcon,
                              color: app.primaryColorDark,
                            }}
                          />
                        )}
                        inputStyle={{...style.input, width: width / 2}}
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
                    console.log(`selected button: ${name}`);
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
});

export default withKeyboardAwareScrollView(index);
