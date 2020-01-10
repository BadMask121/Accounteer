import React from 'react';
import {View, Text} from 'native-base';
import RippleView from 'react-native-material-ripple';
import style from './style';

interface Props {
  firstName?: string;
  lastName?: string;
  currency?: string;
  totalPurchaseInAllBusiness?: string;
}
export default props => {
  return (
    <RippleView rippleDuration={1000} style={style.businessPurchaseContainer}>
      <View style={{flex: 0.7, justifyContent: 'space-evenly'}}>
        <Text style={style.businessPurchaseContainerTitle}>
          All Business Purchase
        </Text>
        <Text style={style.businessPurchaseContainerAmount}>
          {props.currency || 'N'}
          {props.totalPurchaseInAllBusiness || '200,000,000,000.00'}
        </Text>
      </View>
    </RippleView>
  );
};
