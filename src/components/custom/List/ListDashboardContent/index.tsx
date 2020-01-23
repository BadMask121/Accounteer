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
import style from './style';
import {NavigationActions} from 'react-navigation';
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
            return props.navigation.navigate(Route);
          }}>
          <Icon name="plus" size={20} color={app.primaryColorLight} />
        </RippleView>
      </View>
    );

    const renderFooter = () =>
      loading ? (
        <View>
          <ActivityIndicator animating size="large" />
        </View>
      ) : null;

    // render item functions
    const renderBusinessCard = (item, loading) => {
      console.log(loading);
      return (
        <ListCard
          {...{props}}
          onPress={() =>
            props.navigation.navigate(ROUTES.BUSINESS_DASHBOARD, {
              id: item.id,
              image: item.avatar,
            })
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
      );
    };

    const renderOtherCard = item => (
      <ListCard {...{props}} cardStyle={{flexDirection: 'column'}}>
        <View style={[{padding: 10}]}>
          <Text style={[style.listText, {fontFamily: app.primaryFontBold}]}>
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
    );

    return (
      <Suspense fallback={renderFooter()}>
        <View style={style.sectionContainer}>
          <SectionList
            sections={data}
            maxToRenderPerBatch={2}
            onEndReachedThreshold={0.5}
            keyExtractor={(_item, index) => index}
            renderItem={({item, index, section}) => {
              if (typeof section.title !== 'undefined')
                switch (section.title) {
                  case 'Businesses':
                    return renderBusinessCard(item, section.loading);
                  default:
                    return renderOtherCard(item);
                }

              return <View></View>;
            }}
            renderSectionHeader={({section: {title}}) =>
              renderSectionHeader(title)
            }
            scrollEventThrottle={1}
            {...{onScroll}}
          />
        </View>
      </Suspense>
    );
  },
);

export default DashbordContent;
