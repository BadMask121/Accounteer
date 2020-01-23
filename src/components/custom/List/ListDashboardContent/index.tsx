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
import * as short from 'shortid';

import {ActivityIndicator} from 'react-native';
import {app} from '@src/helpers/constants';
import style from './style';
const ListCard = lazy(() => import('@custom/Card/ListCard'));

interface Props {
  loading?: boolean;
  handlePageScroll?: Function;
  data: Array;
  props?: any;
  flexStart?: number;
  flexEnd?: number;
}

const DashbordContent = React.memo(
  ({loading, handlePageScroll, data, flexEnd, flexStart, props}: Props) => {
    const [state, setstate] = useState({
      scrollY: new Animated.Value(0),
    });
    const {ROUTES} = app;

    const labelSize = state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [40, 30],
      extrapolate: 'clamp',
    });
    const flex = state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [flexStart, flexEnd],
      extrapolate: 'clamp',
    });

    useEffect(() => {
      handlePageScroll(flex, labelSize);
    }, []);

    const onScroll = Animated.event([
      {nativeEvent: {contentOffset: {y: state.scrollY}}},
    ]);

    //render header and footer functions
    const renderSectionHeader = (title: string) => (
      <View style={style.sectionHeader}>
        <Text style={style.sectionTitle}>{title}</Text>
        <RippleView
          style={{
            zIndex: -1,
            borderRadius: 50,
            marginRight: 20,
          }}
          onPress={() => {
            let Route = '';
            switch (title) {
              case 'Businesses':
                Route = ROUTES.CREATE_BUSINESS;
                break;
              case 'Invoices':
                Route = ROUTES.CREATE_INVOICE;
                break;
              case 'Offers':
                Route = '';
                break;
              case 'Purchases':
                Route = '';
                break;

              default:
                break;
            }
            return props.props.navigation.navigate(Route);
          }}>
          <Icon name="plus" size={20} color={app.primaryColorLight} />
        </RippleView>
      </View>
    );

    const renderFooter = show =>
      show ? (
        <View>
          <ActivityIndicator animating size="large" />
        </View>
      ) : null;

    // business list data
    const selectionBusinessList = item => {
      return [
        {
          data: item.data,
          key: short.generate(),
        },
      ];
    };
    // render business items
    const renderBusinessCard = (item, loading) => {
      return (
        <SectionList
          sections={selectionBusinessList(item)}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          keyExtractor={(_item, index) => short.generate()}
          renderItem={({item}) => (
            <ListCard
              {...{props}}
              onPress={() =>
                props.props.navigation.navigate(ROUTES.BUSINESS_DASHBOARD)
              }>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={{
                    uri: item.avatar,
                  }}
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
                <Text style={style.listText}>{item.organisationname}</Text>
                <Text style={style.listText}>{item.organisationlocation}</Text>
              </View>
            </ListCard>
          )}
          ListFooterComponent={() => {
            return renderFooter(loading);
          }}
          renderSectionHeader={({section}) => renderSectionHeader('Businesses')}
          scrollEventThrottle={1}
          {...{onScroll}}
        />
      );
    };

    // listing data of other cards
    const selectionOtherList = item => {
      return [
        {
          data: item.data,
          key: 'aaa',
        },
      ];
    };

    // render other items
    const renderOtherCard = item => (
      <View>
        {renderSectionHeader(item.title)}
        <SectionList
          contentContainerStyle={{
            display: 'flex',
            padding: 30,
          }}
          pagingEnabled
          invertStickyHeaders={true}
          sections={selectionOtherList(item)}
          horizontal={true}
          invertStickyHeaders={true}
          maxToRenderPerBatch={2}
          onEndReachedThreshold={0.5}
          keyExtractor={(_item, index) => short.generate()}
          renderItem={({item, index, section}) => (
            <ListCard {...{props}} cardStyle={{flexDirection: 'column'}}>
              <View style={[{padding: 10}]}>
                <Text
                  style={[style.listText, {fontFamily: app.primaryFontBold}]}>
                  {item.title}
                </Text>
              </View>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    color: app.primaryColorLight,
                    fontSize: 10,
                    marginBottom: 2,
                  }}>
                  Amount
                </Text>
                <Text style={{...style.listText}}>
                  {item.currency}
                  {item.amount}
                </Text>
              </View>
            </ListCard>
          )}
          scrollEventThrottle={1}
        />
      </View>
    );

    return (
      <Suspense fallback={renderFooter(true)}>
        <View style={style.sectionContainer}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              if (typeof item.title !== 'undefined')
                switch (item.title) {
                  case 'Businesses':
                    return renderBusinessCard(item, item.loading);
                  default:
                    return renderOtherCard(item);
                }

              return <View></View>;
            }}
            keyExtractor={(_item, index) => short.generate()}
            scrollEventThrottle={1}
            {...{onScroll}}
          />
        </View>
      </Suspense>
    );
  },
);

export default DashbordContent;
