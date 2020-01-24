import React, {useState} from 'react';
import {View, Text, Input, Textarea, DatePicker} from 'native-base';
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
import FormInput from '@custom/Form/Input';
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
const index = props => {
  const [state, setstate] = useState({
    mode: 'date',
    show: false,
    isIssue: true,
    issuedate: moment(new Date()),
    duedate: moment(new Date()),
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

        <View
          style={{
            flex: 1,
            margin: 10,
          }}>
          <Formik
            initialValues={{email: ''}}
            onSubmit={values => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <ScrollView automaticallyAdjustContentInsets alwaysBounceVertical>
                {
                  <AutoInput
                    noDataText="Please add clients"
                    placeholder="Client"
                    renderIcon={() => (
                      <Icon
                        name="user-check"
                        size={15}
                        color={app.primaryColorDark}
                        style={style.leftIcon}
                      />
                    )}
                    rightIcon={
                      <View>
                        <Icon
                          name="plus-circle"
                          size={20}
                          color={app.primaryColorDark}
                          style={style.rightIcon}
                        />
                      </View>
                    }
                  />
                }
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
                {
                  <AutoInput
                    placeholder="Reference"
                    autoCorrect={false}
                    renderIcon={() => (
                      <Icon
                        name="align-left"
                        size={15}
                        color={app.primaryColorDark}
                        style={style.leftIcon}
                      />
                    )}
                  />
                }
                <View style={{marginTop: 30, marginBottom: 50}}>
                  <TopTitle
                    title="Items"
                    textStyle={{fontSize: 25, color: 'rgba(0,0,0,0.7)'}}
                  />
                  <View style={{flexDirection: 'row', flexShrink: 0.1}}>
                    <AutoInput
                      placeholder="Add Items"
                      autoCorrect={false}
                      inputStyle={{...style.input, width: width / 2 - 20}}
                      renderIcon={() => (
                        <Icon
                          name="cart-plus"
                          size={15}
                          color={app.primaryColorDark}
                          style={{...style.leftIcon, top: 20}}
                        />
                      )}
                    />
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          ...style.dateTitleStyle,
                          color: 'rgba(0,0,0,0.7)',
                        }}>
                        Quantity
                      </Text>
                      <AutoInput
                        placeholder="1.0"
                        inputStyle={{...style.input, width: width / 2}}
                        autoCorrect={false}
                      />
                    </View>
                  </View>
                  <Textarea
                    placeholder="Description"
                    style={style.descriptionArea}
                  />
                  <View style={{marginTop: 15}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}>
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
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
                  onPress={() => props.handleSubmit()}
                  text="Save"
                />
                <Button
                  disable={!true}
                  buttonStyle={{
                    borderRadius: 5,
                  }}
                  textStyle={{fontFamily: app.primaryFontBold}}
                  onPress={() => props.handleSubmit()}
                  text="Save And Approve"
                />
              </ScrollView>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default withKeyboardAwareScrollView(index);
