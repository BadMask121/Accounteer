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
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import InvoiceCard from '@custom/Card/InvoiceCard';
import {app} from '@src/helpers/constants';
import style from './style';

const data = [
  {
    id: '1',
    name: 'Ace Corps',
    amountPaid: 200,
    invoiceStatus: 'paid',
    currency: 'NGN',
  },
  {
    id: '2',
    name: 'Ace Corps',
    amountPaid: 200,
    invoiceStatus: 'paid',
    currency: 'NGN',
  },
  {
    id: '3',
    name: 'Ace Corps',
    amountPaid: 200,
    invoiceStatus: 'paid',
    currency: 'NGN',
  },
  {
    id: '4',
    name: 'Ace Corps',
    amountPaid: 200,
    invoiceStatus: 'paid',
    currency: 'NGN',
  },
  {
    id: '5',
    name: 'Ace Corps',
    amountPaid: 200,
    invoiceStatus: 'paid',
    currency: 'NGN',
  },
  {
    id: '6',
    name: 'Ace Corps',
    amountPaid: 200,
    invoiceStatus: 'paid',
    currency: 'NGN',
  },
];

// TODO add lazy loading and swipe able to show delete and edit
export default props => {
  const renderFooter = () => <ActivityIndicator />;
  return (
    <KeyboardAvoidingView style={style.container}>
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
        <Animated.FlatList
          data={data}
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[style.separator]} />
          )}
          renderItem={({item, index, separators}) => (
            <InvoiceCard key={item.id} {...item} {...props} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={renderFooter}
          scrollEventThrottle={1}
          // {...{onScroll}}
        />
        <FloatingAction
          distanceToEdge={{vertical: 30, horizontal: 10}}
          showBackground={false}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
