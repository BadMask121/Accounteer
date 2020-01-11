import React, {useEffect} from 'react';
import {Image, Dimensions, StatusBar} from 'react-native';
import {View, Text} from 'native-base';
import {Transition} from 'react-navigation-fluid-transitions';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './style';
import {app} from '@src/helpers/constants';

export default props => {
  const height: number = Dimensions.get('screen').height;
  const width: number = Dimensions.get('screen').width;

  useEffect(() => {
    setTimeout(() => {
      getStarted();
    }, 1000);
  }, []);
  const getStarted = () =>
    // app.ROUTES.DASHBOARD
    props.navigation.navigate('CreateInvoice', {
      payload: {
        image: require('@assets/images/logo.png'),
      },
    });

  return (
    <View style={style.container}>
      <StatusBar hidden />
      <Animatable.View
        useNativeDriver
        animation="fadeInDown"
        delay={300}
        duration={400}
        style={{
          ...style.logoContainer,
        }}>
        <Image
          source={require('@assets/images/logo.png')}
          style={{
            ...style.logoImage,
            width,
            height,
          }}
        />
      </Animatable.View>
    </View>
  );
};
