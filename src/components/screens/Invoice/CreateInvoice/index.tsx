import React from 'react';
import {View, Text} from 'native-base';
import {KeyboardAvoidingView, Dimensions, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FloatingAction} from 'react-native-floating-action';
import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import {app} from '@src/helpers/constants';
import style from './style';

export default props => {
  return (
    <KeyboardAvoidingView style={style.container}>
      <View
        style={{
          flex: 0.3,
          marginTop: 30,
          width: Dimensions.get('screen').width,
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
      <View
        style={{
          flex: 1,
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
