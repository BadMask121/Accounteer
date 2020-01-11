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
      <View style={{flex: 1}}>
        <TopTitle title="Invoice" />
      </View>
      <View style={{flex: 1}}></View>
    </KeyboardAvoidingView>
  );
};
