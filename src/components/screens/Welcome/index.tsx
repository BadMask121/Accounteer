import React from 'react';
import {Text} from 'native-base';
import {View, Alert, Image} from 'react-native';
import {Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import style from './style';
import Button from '@custom/Button';
import {app} from '@src/helpers/constants';

export default props => {
  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Animatable.View
          useNativeDriver
          removeClippedSubviews
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          animation="slideInUp"
          delay={0}
          duration={900}
          direction="alternate"
          style={style.logoContainer}>
          <Image
            source={require('@assets/images/logo.png')}
            style={{
              ...style.logoImage,
              width: Dimensions.get('window').width,
            }}
          />
        </Animatable.View>
      </View>
      <Animatable.View
        useNativeDriver
        animation="fadeInDown"
        delay={0}
        duration={600}
        style={style.infoContainer}>
        <View style={style.infoShort}>
          <Text
            style={{
              alignItems: 'center',
              textAlign: 'center',
              fontFamily: app.primaryFontRegular,
              lineHeight: 25,
            }}>
            Connecting you to the best car wash vendors near you, giving you the
            best services
          </Text>
        </View>
        <View style={style.info}>
          <View style={style.infoButton}>
            <Button
              buttonStyle={{
                marginBottom: 20,
                backgroundColor: app.primaryColor,
              }}
              text="Create An Accounteer"
              icon="user-circle"
              iconColor="#fff"
              iconSize={20}
              onPress={() => props.navigation.navigate(app.ROUTES.SIGNUP)}
            />
          </View>
          <View>
            <Button
              buttonStyle={{
                backgroundColor: '#fff',
              }}
              textStyle={{
                color: '#000',
              }}
              text="Login Account"
              onPress={() => props.navigation.navigate(app.ROUTES.LOGIN)}
            />
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};
