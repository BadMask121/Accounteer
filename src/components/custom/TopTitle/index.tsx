import React from 'react';
import {View, Text} from 'native-base';
import {Animated} from 'react-native';
import styles from './style';
export default ({title, labelSize, children, style}) => {
  return (
    <Animated.View style={{...styles.titleContainer, ...style}}>
      <Animated.Text style={[styles.title, {fontSize: labelSize || 40}]}>
        {title || children}
      </Animated.Text>
    </Animated.View>
  );
};
