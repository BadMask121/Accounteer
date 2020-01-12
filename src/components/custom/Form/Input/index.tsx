import React from 'react';
import {Item, Label, Input, Text, Icon} from 'native-base';
import {Dimensions, Platform} from 'react-native';
import {app} from '@src/helpers/constants';
import style from './style';
interface Props {
  handleChange?: Function;
  name: string;
  placeholder?: string;
  submitting?: Boolean;
  inputViewStyle?: Object;
  error?: Boolean;
  valid?: Boolean;
}
function FormInput({
  handleChange,
  name,
  placeholder,
  submitting,
  inputViewStyle,
  error,
  valid,
  ...props
}) {
  return (
    <Item
      style={{...style.inputContainer, ...inputViewStyle}}
      {...props}
      floatingLabel>
      <Input
        onChangeText={handleChange(name)}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.5)"
        disabled={submitting || false}
        style={style.inputStyle}
        {...props}
      />

      {typeof valid !== 'undefined' || typeof error !== 'undefined' ? (
        <Icon
          name={
            valid
              ? Platform.OS === 'ios'
                ? 'ios-checkmark-circle'
                : 'md-checkmark-circle'
              : !valid && error
              ? Platform.OS === 'ios'
                ? 'ios-warning'
                : 'md-warning'
              : ''
          }
          style={{
            top: -5,
            color: valid ? app.primaryColor : !valid || error ? 'red' : '',
          }}
        />
      ) : (
        <></>
      )}
    </Item>
  );
}

export default FormInput;
