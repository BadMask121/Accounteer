import React from 'react';
import {View, Text} from 'native-base';
import {KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as _ from 'lodash';
import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import {app} from '@src/helpers/constants';
import style from './style';
import {loginValidationSchema} from 'helpers/validation/schema';
interface Props {
  handleSubmit: Function;
  props: Object;
}
export default ({handleSubmit, ...props}: Props) => {
  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={style.loginOptions}>
        <TopTitle title="Log In" />
        <Button
          icon="facebook"
          iconSize={20}
          iconColor="#fff"
          text="Sign in with Facebook"
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
          text="Sign in with Google"
        />
        <View
          style={{
            flex: 0.5,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: app.primaryFontLight,
            }}>
            or
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1.5,
        }}>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
          validateOnChange={loginValidationSchema}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => {
            const isFoundErrors = () => !_.isEmpty(errors);

            return (
              <View>
                <FormInput
                  inputViewStyle={{
                    borderRadius: 5,
                    borderColor: 'lightblue',
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  regular
                  handleChange={handleChange}
                  {...{handleBlur}}
                  name="email"
                  placeholder="Email Address"
                  submitting={false}
                  error={isFoundErrors() && errors.email}
                  valid={
                    !_.isEmpty(values) &&
                    values.email.length !== 0 &&
                    !errors.email
                  }
                />
                <FormInput
                  inputViewStyle={{
                    borderRadius: 5,
                    borderColor: 'lightblue',
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                  regular
                  handleChange={handleChange}
                  {...{handleBlur}}
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
                <Button
                  disable={!true}
                  buttonStyle={{
                    marginTop: 20,
                    marginBottom: 30,
                  }}
                  textStyle={{fontFamily: app.primaryFontBold}}
                  onPress={handleSubmit}
                  text="Log in"
                />

                <TouchableOpacity onPress={() => alert('Forgot Password')}>
                  <Text
                    style={{
                      justifyContent: 'center',
                      textAlign: 'center',
                      fontSize: 15,
                      color: 'rgba(0,0,0,0.9)',
                    }}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};
