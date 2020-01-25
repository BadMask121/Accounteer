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
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as _ from 'lodash';

import TopTitle from '@custom/TopTitle';
import SubPanel from '@custom/Panel/SubPanel';
import style from './style';
import ListDashboardContent from 'components/custom/List/ListDashboardContent';

import {app} from '@src/helpers/constants';

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

const DATA_TITLE_LIST = [
  {
    title: 'Businesses',
    data: [],
  },
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

interface Props {
  userDetails: Object<any | string>;
  organisationsData: Array<any | string>;
  getOrganisationsByUserId: Function;
  props: Object;
}
export default React.memo(
  ({
    userDetails,
    getOrganisationsByUserId,
    organisationsData,
    ...props
  }: Props) => {
    const [state, setstate] = useState({
      flex: new Animated.Value(0.3),
      labelSize: new Animated.Value(40),
    });

    // assign business list data
    const [businessData] = DATA_TITLE_LIST;
    businessData.data = organisationsData.data;
    businessData.loading = organisationsData.loading;

    const handlePageScroll = (flex: Float32Array, labelSize: Float32Array) => {
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
                onPress={() => props.props.navigation.toggleDrawer()}
              />
            </View>
          </Animated.View>
        </TouchableOpacity>
        <Animated.View style={[style.topTitle, {flex: state.flex}]}>
          <TopTitle
            labelSize={state.labelSize}
            title="Dashboard"
            {...{props}}
          />
        </Animated.View>

        <View style={style.subTitleContainer}>
          <View style={style.userFullNameContainer}>
            <Text style={style.userFullName}>
              {typeof userDetails !== 'undefined' && !_.isEmpty(userDetails) ? (
                `Hello ${userDetails.firstname} ${userDetails.lastname}`
              ) : (
                <></>
              )}
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
            props={props}
            data={DATA_TITLE_LIST}
          />
        </View>
      </KeyboardAvoidingView>
    );
  },
);
