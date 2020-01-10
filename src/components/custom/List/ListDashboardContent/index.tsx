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
import Icon from 'react-native-vector-icons/FontAwesome5';
import RippleView from 'react-native-material-ripple';
import {ActivityIndicator} from 'react-native';
import {app} from '@src/helpers/constants';
import ListContent from '../../Card/ListCard';
import style from './style';
const ListCard = lazy(() => import('@custom/Card/ListCard'));

export default ({loading, handlePageScroll, data, ...props}) => {
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
          sections={data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <ListCard {...{props}}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={item.image}
                  style={{
                    flex: 1,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    width: (Dimensions.get('screen').width / 2) * 0.5,
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <View style={{padding: 10}}>
                <Text style={style.listText}>{item.name}</Text>
                <Text style={style.listText}>{item.location}</Text>
              </View>
            </ListCard>
          )}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={style.sectionTitle}>{title}</Text>
              <RippleView
                style={{
                  zIndex: -1,
                  borderRadius: 50,
                  marginRight: 20,
                }}>
                <Icon name="plus" size={20} color={app.primaryColorLight} />
              </RippleView>
            </View>
          )}
          scrollEventThrottle={1}
          {...{onScroll}}
        />
      </View>
    </Suspense>
  );
};
