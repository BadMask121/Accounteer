import React, {useState, useEffect} from 'react';
import {View, Text} from 'native-base';
import {
  Image,
  KeyboardAvoidingView,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import * as BoxShadow from 'react-native-shadow';
import RippleView from '';
import {Formik} from 'formik';
import TopTitle from '@custom/TopTitle';
import SubPanel from '@custom/Panel/SubPanel';
import style from './style';
import ListDashboardContent from 'components/custom/List/ListDashboardContent';

import {data} from '@src/helpers/dummydata';
import {app} from '@src/helpers/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    title: 'Businesses',
    data: [...data],
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
      <StatusBar
        hidden
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        animated
        showHideTransition="fade"
      />

      <TouchableOpacity style={{flex: 0.15}}>
        <Animated.View
          style={[
            style.topHeader,
            {position: 'absolute', width: Dimensions.get('screen').width},
          ]}>
          <View style={{flex: 1, marginLeft: 10, justifyContent: 'center'}}>
            <Icon
              name="user-circle"
              size={30}
              color="rgba(0,0,0,0.5)"
              style={{justifyContent: 'center'}}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[style.topTitle, {flex: state.flex}]}>
        <TopTitle labelSize={state.labelSize} title="Dashboard" {...{props}} />
      </Animated.View>

      <View style={style.subTitleContainer}>
        <View style={style.userFullNameContainer}>
          <Text style={style.userFullName}>
            Hello {props.firstName + props.lastName || 'Emakpor Jeffrey'}
          </Text>
        </View>
        <SubPanel
          title="All Business Purchases"
          style={{backgroundColor: app.primaryColorDark}}
        />
      </View>
      <View style={{flex: 1}}>
        <ListDashboardContent
          flexStart={0.3}
          flexEnd={0.1}
          {...{handlePageScroll}}
          {...{props}}
          data={DATA}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
