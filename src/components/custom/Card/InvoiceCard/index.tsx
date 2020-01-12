import React from 'react';
import {View, Text} from 'native-base';

import {app} from '@src/helpers/constants';
import style from './style';
import ListCard from '../ListCard';

interface Props {
  id: string;
  name: string;
  currency: string;
  amountPaid: string;
  invoiceStatus: string;
}

// TODO add swipe to delete or edit
export default ({...props}: Props) => {
  return (
    <ListCard
      style={style.cardContainer}
      onPress={() =>
        props.navigation.navigate(app.ROUTES.VIEW_INVOICE, {id: props.id})
      }>
      <View style={style.cardLeftInfo}>
        <View>
          <Text
            style={{
              fontFamily: app.primaryFontBold,
            }}>
            {props.name}
          </Text>
        </View>
        <View>
          <View>
            <Text style={style.subTitle}>Amount Paid</Text>
          </View>
          <Text style={{...style.subTitleText, textTransform: 'uppercase'}}>
            {props.currency.toUpperCase()} {props.amountPaid}
          </Text>
        </View>
      </View>
      <View style={style.cardRightInfo}>
        <View>
          <Text style={style.subTitle}>Status</Text>
        </View>
        <Text style={style.subTitleText}>{props.invoiceStatus}</Text>
      </View>
    </ListCard>
  );
};
