import React, {lazy, Suspense, useState, useEffect} from 'react';
import {View, Text} from 'native-base';
import {
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Animated,
  SectionList,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {data} from '@src/helpers/dummydata';
import {app} from '@src/helpers/constants';
import ListContent from './ListContent';
import style from './style';
const BusinessCard = lazy(() => import('@custom/Card/BusinessCard'));

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

export default ({loading, handlePageScroll, ...props}) => {
  const [state, setstate] = useState({
    scrollY: new Animated.Value(0),
  });

  const renderFooter = () =>
    loading ? (
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    ) : null;

  const labelSize = state.scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [40, 30],
    extrapolate: 'clamp',
  });
  const flex = state.scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0.3, 0.1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    handlePageScroll(flex, labelSize);
  }, []);

  const onScroll = Animated.event([
    {nativeEvent: {contentOffset: {y: state.scrollY}}},
  ]);

  return (
    <Suspense fallback={renderFooter()}>
      <View style={style.sectionContainer}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <ListContent />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={style.sectionTitle}>{title}</Text>
          )}
          scrollEventThrottle={1}
          {...{onScroll}}
        />
      </View>
    </Suspense>
  );
};
