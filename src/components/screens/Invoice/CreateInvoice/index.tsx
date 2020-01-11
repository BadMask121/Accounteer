import React, {useState} from 'react';
import {View, Text, Input} from 'native-base';
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

  const format = (year, month, day) => `${year}/${month}/${day}`;

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
      <ScrollView
        alwaysBounceVertical
        automaticallyAdjustContentInsets
        bouncesZoom>
        <View
          style={{
            flex: 0.1,
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
        <FloatingAction
          showBackground={false}
          actions={action}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
        <View
          style={{
            flex: 1,
            margin: 10,
          }}>
          <Formik
            initialValues={{email: ''}}
            onSubmit={values => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
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
                <View style={{marginTop: 10}}>
                  <TopTitle
                    title="Items"
                    textStyle={{fontSize: 25, color: 'rgba(0,0,0,0.7)'}}
                  />
                  <View>
                    <AutoInput
                      placeholder="Add Items"
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
                    <AutoInput placeholder="Reference" autoCorrect={false} />
                  </View>
                </View>

                <Button
                  disable={!true}
                  buttonStyle={{
                    marginTop: 20,
                    marginBottom: 30,
                  }}
                  textStyle={{fontFamily: app.primaryFontBold}}
                  onPress={() => props.handleSubmit()}
                  text="Create Account"
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default withKeyboardAwareScrollView(index);
