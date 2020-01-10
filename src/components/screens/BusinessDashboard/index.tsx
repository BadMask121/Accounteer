import React from 'react';
import {View, Text} from 'native-base';
import {Image, Dimensions, Animated, StatusBar} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './style';

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
          <View
            style={{
              ...style.imageOverlay,
              width,
              height,
            }}>
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
          <View
            style={{
              flex: 0.1,
              position: 'absolute',
              top: 0,
              flexDirection: 'row',
              marginTop: 40,
            }}>
            <Text
              style={{
                fontFamily: app.primaryFontBold,
                color: '#000',
              }}>
              Ace Corps
            </Text>
            <Icon name="ellipsis-v" size={20} />
          </View>
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
          height: height / 1.5,
        }}>
        <LinearGradient
          colors={['#fff', '#FEFEFE', '#F4F4F4']}
          style={{
            ...style.salesContainer,
            width,
            height: height / 1.5,
          }}>
          <View style={{margin: 15}}>
            <Text style={{color: '#fff'}}>Hello</Text>
          </View>
        </LinearGradient>
      </Animatable.View>
    </View>
  );
};
