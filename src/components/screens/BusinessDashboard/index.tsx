import React, {useState, useEffect} from 'react';
import {View, Text} from 'native-base';
import {Image, Dimensions, Animated, StatusBar, Easing} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './style';
import {app} from '@src/helpers/constants';
import SubPanel from 'components/custom/Panel/SubPanel';
import ListDashboardContent from 'components/custom/List/ListDashboardContent';

const otherdata = [
  {
    title: '22 Awaiting Payment',
    amount: '300,000,000.000',
    currency: 'NG',
  },
  {
    title: '90 Overdue',
    amount: '400,000,000.000',
    currency: 'USD',
  },
  {
    title: '09 Draft',
    amount: '300,000,000.000',
    currency: 'EU',
  },
];

const DATA = [
  {
    title: 'Invoices',
    data: [...otherdata],
  },
  {
    title: 'Offers',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Purchases',
    data: ['Water', 'Coke', 'Beer'],
  },
];

// change image payload to state
export default props => {
  const payload = props.appstate.state.selectedOrganisation;
  const {width} = Dimensions.get('screen');
  const {height} = Dimensions.get('screen');
  const detailsHeight = height / 1.35;

  const [state, setstate] = useState({
    flex: new Animated.Value(0.8),
    labelSize: new Animated.Value(40),
  });

  const handlePageScroll = (flex, labelSize) => {
    setstate(prev => ({
      flex,
      labelSize,
    }));
  };
  useEffect(() => {
    Animated.timing(state.labelSize, {
      toValue: 200,
      easing: Easing.back(),
      duration: 2000,
    }).start();

    Animated.timing(state.flex, {
      toValue: 200,
      duration: 2000,
    }).start();
  }, []);

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
        <View style={style.imageContainer}>
          <View
            style={{
              ...style.imageOverlay,
              width,
              height,
            }}>
            <View style={[style.titleContainer, {width}]}>
              <Icon
                name="arrow-left"
                size={20}
                color="rgba(255,255,255,0.6)"
                onPress={() => props.navigation.navigate(app.ROUTES.DASHBOARD)}
              />
              <Text style={style.titleText}>{payload.organisationname}</Text>
              <Icon name="ellipsis-v" size={20} color="rgba(255,255,255,0.6)" />
            </View>
          </View>

          <Image
            source={{
              uri: typeof payload !== 'undefined' && payload.avatar,
            }}
            style={{
              ...style.image,
              width,
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
          height: detailsHeight,
        }}>
        <LinearGradient
          colors={['#fff', '#FEFEFE', '#F4F4F4']}
          style={{
            ...style.salesContainer,
            width,
            height: detailsHeight,
          }}>
          <View style={{flex: 1, margin: 15, marginBottom: 0}}>
            <Animated.View style={[{flex: state.flex, marginBottom: 10}]}>
              <SubPanel
                title="Purchases In Amount"
                currency="USD"
                style={{backgroundColor: app.primaryColorDarker}}
              />
            </Animated.View>

            <View style={{flex: 2}}>
              <ListDashboardContent
                flexStart={0.8}
                flexEnd={0.5}
                {...{handlePageScroll}}
                data={DATA}
                {...{props}}
              />
            </View>
          </View>
        </LinearGradient>
      </Animatable.View>
    </View>
  );
};
