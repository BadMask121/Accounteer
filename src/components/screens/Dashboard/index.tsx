import React, {useState, useEffect} from 'react';
import {View, Text} from 'native-base';
import {Image, KeyboardAvoidingView, Animated, Easing} from 'react-native';
import {Dimensions, FlatList} from 'react-native';
import * as BoxShadow from 'react-native-shadow';
import RippleView from '';
import {Formik} from 'formik';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import SubPanel from '@custom/Panel/SubPanel';
import style from './style';
import ListDashboardContent from 'components/custom/List/ListDashboardContent';

import {data} from '@src/helpers/dummydata';
const DATA = [
  {
    title: 'Businesses',
    data: [...data],
  },
  {
    title: 'Invoices',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
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

export default props => {
  const [state, setstate] = useState({
    flex: new Animated.Value(0.3),
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
    <KeyboardAvoidingView style={style.container}>
      <Animated.View style={[style.topTitle, {flex: state.flex}]}>
        <TopTitle labelSize={state.labelSize} title="Dashboard" />
      </Animated.View>

      <View style={style.subTitleContainer}>
        <View style={style.userFullNameContainer}>
          <Text style={style.userFullName}>
            Hello {props.firstName + props.lastName || 'Ace Corps'}
          </Text>
        </View>
        <SubPanel title="All Business Purchases" />
      </View>
      <View style={{flex: 1}}>
        <ListDashboardContent {...{handlePageScroll}} data={DATA} />
      </View>
    </KeyboardAvoidingView>
  );
};
