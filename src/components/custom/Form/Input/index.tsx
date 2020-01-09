import React from 'react';
import {Item, Label, Input} from 'native-base';
import {Dimensions} from 'react-native';
import {app} from '@src/helpers/constants';
function FormInput({
  handleChange,
  name,
  placeholder,
  submitting,
  inputViewStyle,
  ...props
}) {
  return (
    <Item
      style={{
        ...inputViewStyle,
        height: 50,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
      }}
      {...props}
      floatingLabel>
      <Input
        onChangeText={handleChange(name)}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.5)"
        disabled={submitting || false}
        {...props}
        style={{
          textAlign: 'center',
          fontFamily: app.primaryFontMedium,
          lineHeight: 15,
          fontSize: 15,
          height: 70,
          marginBottom: 10,
        }}
      />
    </Item>
  );
}

export default FormInput;
