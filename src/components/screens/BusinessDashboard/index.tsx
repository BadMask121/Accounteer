import React from 'react';
import {View, Text} from 'native-base';
import {Image, Dimensions, Animated, StatusBar} from 'react-native';
// import {Bo} from 'react-native-shadow'

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import TopTitle from '@custom/TopTitle';
import {app} from '@src/helpers/constants';

export default props => {
  const payload = props.navigation.state.params;
  const {width} = Dimensions.get('screen');
  const {height} = Dimensions.get('screen');

  return (
    <View style={style.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        animated
        showHideTransition="fade"
      />
      <Animated.View style={style.headerContainer}>
        {/* <TopTitle style={style.headerTitle}>Booking</TopTitle> */}
        <View style={style.imageContainer}>
          <View style={{...style.imageOverlay, width, height}}>
            <Text></Text>
          </View>
          <Image
            source={payload.image}
            style={{
              ...style.image,
              width,
              resizeMode: 'cover',
            }}
          />
        </View>
      </Animated.View>
      <Animatable.View
        useNativeDriver
        removeClippedSubviews
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
        animation="fadeInUp"
        delay={0}
        duration={300}
        style={{
          ...style.salesContainer,
          width,
          height: height / 2,
        }}>
        <View
          // colors={['#fff', '#FEFEFE', '#F4F4F4']}
          style={{
            ...style.salesContainer,
            backgroundColor: '#fff',
            width,
            height: height / 2,
          }}>
          <View style={{margin: 15}}>
            <Text style={{color: '#fff'}}>Hello</Text>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};
