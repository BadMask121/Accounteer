import React from 'react';
import {View, Text} from 'native-base';
import {KeyboardAvoidingView, TouchableOpacity} from 'react-native';
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
  props: Object;
}
export default ({handleSubmit, ...props}: Props) => {
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
            email: '',
          }}
          validateOnChange={signupValidationSchema}
          validationSchema={signupValidationSchema}
          onSubmit={values => handleSubmit(values)}>
          {({handleChange, handleSubmit, values, errors}) => {
            const isFoundErrors = () => !_.isEmpty(errors);
            return (
              <View>
                <FormInput
                  inputViewStyle={style.inputStyle}
                  regular
                  handleChange={() => handleChange('firstname')}
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
                  handleChange={() => handleChange('lastname')}
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
                  handleChange={() => handleChange('organisationname')}
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
                  handleChange={() => handleChange('organisationlocation')}
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
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};
