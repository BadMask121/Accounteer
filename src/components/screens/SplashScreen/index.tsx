import React, {useEffect} from 'react';
import {Image, Dimensions, StatusBar} from 'react-native';
import {View, Text} from 'native-base';
import {Transition} from 'react-navigation-fluid-transitions';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './style';
import {app} from 'helpers/constants';
import subscribe from '@src/subscriber';
import AsyncStorage from '@react-native-community/async-storage';
import {auth} from 'helpers/constants';

const index = props => {
  const height: number = Dimensions.get('screen').height;
  const width: number = Dimensions.get('screen').width;

  useEffect(() => {
    props.appstate.setLoading(false);
    setTimeout(() => {
      getStarted();
    }, 1000);
  }, []);

  const getStarted = async () => {
    const route =
      (await AsyncStorage.getItem(auth.AUTH_TOKEN)) &&
      (await AsyncStorage.getItem(auth.USER_DETAILS_TOKEN))
        ? app.ROUTES.APP
        : app.ROUTES.AUTH;

    props.navigation.navigate(route, {
      payload: {
        image: require('@assets/images/logo.png'),
      },
    });
  };

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

export default subscribe(index);
