import React from 'react';
import {View, Text} from 'native-base';
import {KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import {app} from '@src/helpers/constants';
import style from './style';
export default props => {
  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={style.loginOptions}>
        <TopTitle title="Sign Up" />
        <Button
          icon="facebook"
          iconSize={20}
          iconColor="#fff"
          text="Signup with Facebook"
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
          initialValues={{email: ''}}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View
              style={
                {
                  // flex: 0.5,
                }
              }>
              <FormInput
                inputViewStyle={{
                  borderRadius: 5,
                  borderColor: 'lightblue',
                }}
                regular
                handleChange={handleChange}
                name="firstname"
                placeholder="First Name"
                submitting={false}
                secureTextEntry
              />
              <FormInput
                inputViewStyle={{
                  borderRadius: 5,
                  borderColor: 'lightblue',
                }}
                regular
                handleChange={handleChange}
                name="lastname"
                placeholder="Last Name"
                submitting={false}
                secureTextEntry
              />
              <FormInput
                inputViewStyle={{
                  borderRadius: 5,
                  borderColor: 'lightblue',
                }}
                regular
                handleChange={handleChange}
                name="email"
                placeholder="Email Address"
                submitting={false}
              />
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
    </KeyboardAvoidingView>
  );
};
