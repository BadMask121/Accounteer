import React from 'react';
import {View, Text} from 'native-base';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as short from 'shortid';
import * as _ from 'lodash';

import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import InvoiceCard from '@custom/Card/InvoiceCard';
import {app} from 'helpers/constants';
import style from './style';

interface InvoiceProps {
  fetching: Boolean;
  InvoiceData: Array;
  fetchInvoice: Function;
  limit: number;
}
// TODO add lazy loading and swipe able to show delete and edit
export default React.memo(
  ({fetching, InvoiceData, fetchInvoice, limit, ...props}: InvoiceProps) => {
    const {id} = props.screenProps.appstate.state.selectedOrganisation;
    const renderFooter = () => (fetching ? <ActivityIndicator /> : <></>);
    return (
      <KeyboardAvoidingView style={style.container}>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
          animated
          showHideTransition="fade"
        />
        <View style={{flex: 0.1, marginTop: 10}}>
          <TopTitle title="Invoices" />
        </View>
        <View style={{flex: 1}}>
          {
            <Animated.FlatList
              data={InvoiceData}
              onEndReached={
                InvoiceData.length > limit && fetchInvoice(id, 0, limit)
              }
              onEndReachedThreshold={0.7}
              ItemSeparatorComponent={({highlighted}) => (
                <View style={[style.separator]} />
              )}
              renderItem={({item, index, separators}) => (
                <InvoiceCard key={short.generate()} item={item} {...props} />
              )}
              keyExtractor={item => short.generate()}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={() => {
                if (InvoiceData.length < limit && props.finished && !fetching)
                  return (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: app.primaryFontBold,
                          top: 0,
                          fontSize: 35,
                          color: '#353BC930',
                        }}>
                        No Invoice Found
                      </Text>
                    </View>
                  );
                return null;
              }}
              // scrollEventThrottle={11000}
            />
          }
          <FloatingAction
            distanceToEdge={{vertical: 30, horizontal: 10}}
            showBackground={false}
            onPressMain={name => {
              props.navigation.navigate(app.ROUTES.CREATE_INVOICE);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  },
);
