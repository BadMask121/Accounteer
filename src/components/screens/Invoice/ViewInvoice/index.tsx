import React from 'react';
import {View, Text} from 'native-base';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '@custom/Button';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import {app} from '@src/helpers/constants';
import style from './style';
import {FloatingAction} from 'react-native-floating-action';

interface Props {}
export default ({...props}: Props) => {
  // sections to render
  const CompanySection = () => (
    <View style={style.contentSection}>
      <View>
        <Text style={style.contentTitle}>Company</Text>
        <Text style={{...style.contentText}}>Ace Corps</Text>
      </View>
      <View style={{...style.contentSection}}>
        <Text style={style.contentTitle}>Details</Text>
        <View style={{...style.rowBetween}}>
          <Text style={{...style.contentText}}>Issued Date</Text>
          <Text style={{...style.contentText}}>2019-12-2</Text>
        </View>
        <View style={{...style.rowBetween}}>
          <Text style={{...style.contentText}}>Due Date</Text>
          <Text style={{...style.contentText}}>2019-12-1</Text>
        </View>
      </View>
    </View>
  );
  const AttachmentSection = () => (
    <View style={style.contentSection}>
      <Text style={{...style.contentTitle, paddingBottom: 5}}>Attachments</Text>
      <View
        style={{
          ...style.rowBetween,
          width: '31%',
        }}>
        <Icon name="paperclip" size={15} color={app.primaryColorLight} />
        <Text style={{...style.contentText}}>Bookmake.pdf</Text>
      </View>
    </View>
  );

  const ItemSection = () => (
    <View style={style.contentSection}>
      <Text style={style.contentTitle}>Items</Text>
      <View style={{paddingLeft: 10}}>
        <View>
          <Text style={{...style.contentTitle, ...style.contentSubTitle}}>
            Mobile Development
          </Text>
          <View>
            <View style={{...style.rowBetween}}>
              <Text style={{...style.contentText}}>Complete Android App</Text>
              <Text style={{...style.contentText}}>1,000</Text>
            </View>
            <Text style={{...style.contentText}}>
              1.00 x 1,000.00 (VAT Exempt)
            </Text>
          </View>
        </View>
        <View
          style={{
            ...style.rowBetween,
            ...style.contentSubTitleContainer,
          }}>
          <Text style={{...style.contentTitle, ...style.contentSubTitle}}>
            Sub Total
          </Text>
          <Text
            style={{
              color: 'rgba(0,0,0,0.6)',
              ...style.contentText,
            }}>
            1,000.00
          </Text>
        </View>
        <View
          style={{
            ...style.rowBetween,
            ...style.contentSubTitleContainer,
          }}>
          <Text style={{...style.contentTitle, ...style.contentSubTitle}}>
            Vat
          </Text>
          <Text style={{...style.contentText}}>0.00</Text>
        </View>
        <View
          style={{
            ...style.rowBetween,
            ...style.contentSubTitleContainer,
          }}>
          <Text style={{...style.contentTitle, ...style.contentSubTitle}}>
            Total
          </Text>
          <Text style={{...style.contentText}}>1,000.00</Text>
        </View>
        <View
          style={{
            ...style.rowBetween,
            ...style.contentSubTitleContainer,
          }}>
          <Text style={{...style.contentTitle, ...style.contentSubTitle}}>
            Amount Paid
          </Text>
          <Text style={{...style.contentText}}>1,000.00</Text>
        </View>
        <View
          style={{
            ...style.rowBetween,
            ...style.contentSubTitleContainer,
          }}>
          <Text style={{...style.contentTitle, ...style.contentSubTitle}}>
            Amount Due
          </Text>
          <Text style={{...style.contentText}}>0.00</Text>
        </View>
      </View>
    </View>
  );

  const PaymentSection = () => (
    <View style={style.contentSection}>
      <View style={{...style.rowBetween}}>
        <View>
          <Text style={style.contentTitle}>Payment</Text>
          <Text style={{...style.contentText}}>1,000.00</Text>
          <Text style={{...style.contentText}}>GT Bank</Text>
        </View>
        <View
          style={{
            backgroundColor: app.primaryColorLight,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '15%',
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Icon name="trash" size={20} color="#fff" />
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={style.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        animated
        showHideTransition="fade"
      />
      <View style={style.headerContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>
        <View style={style.headerInfo}>
          <Text
            style={{
              ...style.headerInfoText,
              color: 'rgba(255,255,255,0.4)',
              fontSize: 25,
            }}>
            Total Amount
          </Text>
          <Text
            style={{
              ...style.headerInfoText,
              fontSize: 30,
            }}>
            NGN 20000
          </Text>
          <View style={{...style.headerInfoButton}}>
            <Text
              style={{
                ...style.headerInfoText,
                ...style.headerInfoButtonText,
              }}>
              Paid
            </Text>
          </View>
        </View>
        <View style={style.headerMiscIcon}>
          <Icon name="share-alt" size={20} color="rgba(255,255,255,0.5)" />
          <Icon name="ellipsis-v" size={20} color="rgba(255,255,255,0.5)" />
        </View>
      </View>
      <View style={{flex: 2, zIndex: 1}}>
        <ScrollView
          automaticallyAdjustContentInsets
          alwaysBounceVertical
          contentContainerStyle={{paddingBottom: 10, padding: 5}}
          style={style.contentContainer}>
          <CompanySection />
          <AttachmentSection />
          <ItemSection />
          <PaymentSection />
        </ScrollView>
        <FloatingAction
          distanceToEdge={{vertical: 20, horizontal: 10}}
          showBackground={false}
          iconWidth={25}
          iconHeight={25}
          floatingIcon={require('@assets/images/send.png')}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
