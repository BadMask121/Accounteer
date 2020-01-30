import React from 'react';
import {View, Text, Picker, Icon} from 'native-base';
import {KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as _ from 'lodash';

import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import {app} from '@src/helpers/constants';
import {signupValidationSchema} from '../../../helpers/validation/schema';
import style from './style';

interface Props {
  handleSubmit?: Function;
  onCurrencyChange?: Function;
  props: Object;
  state: Object;
}
export default React.memo(
  ({handleSubmit, onCurrencyChange, state, ...props}: Props) => {
    return (
      <KeyboardAvoidingView style={style.container}>
        <View style={style.loginOptions}>
          <TopTitle title="Sign Up" />
          <Button
            icon="facebook"
            iconSize={20}
            iconColor="#fff"
            text="Sign Up with Facebook"
          />
          <Button
            buttonStyle={{
              backgroundColor: '#fff',
            }}
            textStyle={{
              color: '#000',
            }}
            icon="google"
            iconSize={20}
            iconColor="#000"
            text="Sign Up with Google"
          />
          <View
            style={{
              flex: 0.5,
            }}>
            <Text style={style.orStyle}>or</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.5,
          }}>
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              organisationname: '',
              organisationlocation: '',
              currency: '',
              email: '',
            }}
            validateOnChange={signupValidationSchema}
            validationSchema={signupValidationSchema}
            onSubmit={values => handleSubmit(values)}>
            {({handleChange, handleSubmit, values, errors}) => {
              const isFoundErrors = () => !_.isEmpty(errors);
              values.currency = state.selectedValue;
              return (
                <ScrollView>
                  <FormInput
                    inputViewStyle={style.inputStyle}
                    regular
                    handleChange={handleChange}
                    name="firstname"
                    placeholder="First Name"
                    submitting={false}
                    error={isFoundErrors() && errors.firstname}
                    valid={
                      !_.isEmpty(values) &&
                      values.firstname.length !== 0 &&
                      !errors.firstname
                    }
                  />
                  <FormInput
                    inputViewStyle={style.inputStyle}
                    regular
                    handleChange={handleChange}
                    name="lastname"
                    placeholder="Last Name"
                    error={isFoundErrors() && errors.lastname}
                    valid={
                      !_.isEmpty(values) &&
                      values.lastname.length !== 0 &&
                      !errors.lastname
                    }
                    submitting={false}
                  />
                  <FormInput
                    inputViewStyle={style.inputStyle}
                    regular
                    handleChange={handleChange}
                    name="organisationname"
                    placeholder="Organisation Name"
                    error={isFoundErrors() && errors.organisationname}
                    valid={
                      !_.isEmpty(values) &&
                      values.organisationname.length !== 0 &&
                      !errors.organisationname
                    }
                    submitting={false}
                  />
                  <FormInput
                    inputViewStyle={style.inputStyle}
                    regular
                    handleChange={handleChange}
                    name="organisationlocation"
                    placeholder="Organisation Location"
                    error={isFoundErrors() && errors.organisationlocation}
                    valid={
                      !_.isEmpty(values) &&
                      values.organisationlocation.length !== 0 &&
                      !errors.organisationlocation
                    }
                    submitting={false}
                  />
                  <Picker
                    accessibilityLabel="Select Currency"
                    placeholder="Select Currency"
                    selectedValue={state.selectedValue}
                    iosHeader="Select Currency"
                    removeClippedSubviews
                    onValueChange={onCurrencyChange}
                    iosIcon={
                      <Icon
                        name="ios-arrow-dropdown"
                        size={10}
                        style={{
                          color: app.primaryColorDarker,
                        }}
                      />
                    }>
                    <Picker.Item label="NGN" key="ngn" value="NGN" />
                    <Picker.Item label="USD" key="usd" value="USD" />
                    <Picker.Item label="EURO" key="euro" value="EURO" />
                    <Picker.Item label="POUNDS" key="pounds" value="POUNDS" />
                  </Picker>
                  <Button
                    disable={!true}
                    buttonStyle={{
                      marginTop: 20,
                      marginBottom: 30,
                    }}
                    textStyle={{fontFamily: app.primaryFontBold}}
                    onPress={handleSubmit}
                    text="Continue"
                  />
                </ScrollView>
              );
            }}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    );
  },
);
