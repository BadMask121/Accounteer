import React from 'react';
import {View, Text} from 'native-base';
import {Animated, TouchableOpacity} from 'react-native';
import styles from './style';
interface Props {
  title: string;
  labelSize?: Float32Array;
  style?: Object<any | Array>;
  onPress?: Function;
  props?: Object;
}
export default ({title, labelSize, style, onPress, props}: Props) => {
  return (
    <TouchableOpacity style={{flex: 1}} {...{onPress}}>
      <Animated.View style={{...styles.titleContainer, ...style}}>
        <Animated.Text style={[styles.title, {fontSize: labelSize || 40}]}>
          {title || props.children}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
