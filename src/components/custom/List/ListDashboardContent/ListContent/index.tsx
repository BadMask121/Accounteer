import React, {lazy, Suspense, useState, useEffect} from 'react';
import {View, Text} from 'native-base';
import {
  Image,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Animated,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {data} from '@src/helpers/dummydata';
import {app} from '@src/helpers/constants';
const BusinessCard = lazy(() => import('@custom/Card/BusinessCard'));

export default ({loading, ...props}) => {
  const renderFooter = () =>
    loading ? (
      <View>
        <ActivityIndicator animating size="large" />
      </View>
    ) : null;

  return (
    <Suspense fallback={renderFooter()}>
      <BusinessCard />
    </Suspense>
  );
};
