import React from 'react';
import {View, Text} from 'native-base';
import {KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import _ from 'lodash';
import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import {app} from '@src/helpers/constants';
import {confirmSignupValidationSchema} from '@src/helpers/validation/schema';
import style from './style';

interface Props {
  handleSubmit: Function;
  props: Object;
}
export default ({handleSubmit, ...props}: Props) => {
  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={{...style.loginOptions, flex: 0.4}}>
        <TopTitle title="Sign Up" />
      </View>
      <View
        style={{
          flex: 1.5,
        }}>
        <Formik
          initialValues={{password: '', confirmpassword: ''}}
          validationSchema={confirmSignupValidationSchema}
          onSubmit={values => handleSubmit(values)}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => {
            const isFoundErrors = () => !_.isEmpty(errors);
            return (
              <View>
                <FormInput
                  inputViewStyle={style.inputStyle}
                  regular
                  handleChange={() => handleChange('password')}
                  name="password"
                  placeholder="Password"
                  submitting={false}
                  error={isFoundErrors() && errors.password}
                  valid={
                    !_.isEmpty(values) &&
                    values.password.length !== 0 &&
                    !errors.password
                  }
                  secureTextEntry
                />
                <FormInput
                  inputViewStyle={style.inputStyle}
                  regular
                  handleChange={handleChange}
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  submitting={false}
                  error={
                    (isFoundErrors() && errors.confirmpassword) ||
                    values.password !== values.confirmpassword
                  }
                  valid={
                    !_.isEmpty(values) &&
                    values.confirmpassword.length !== 0 &&
                    values.password === values.confirmpassword &&
                    !errors.confirmpassword
                  }
                  secureTextEntry
                />
                <Button
                  disable={values.password !== values.confirmpassword}
                  buttonStyle={{
                    marginTop: 20,
                    marginBottom: 30,
                  }}
                  textStyle={{fontFamily: app.primaryFontBold}}
                  onPress={handleSubmit}
                  text="Create Account"
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};
