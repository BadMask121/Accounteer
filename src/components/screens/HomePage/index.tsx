import React, {useState, useEffect} from 'react';
import {View, Text} from 'native-base';
import {Image, KeyboardAvoidingView, Animated, Easing} from 'react-native';
import {Dimensions} from 'react-native';
import * as BoxShadow from 'react-native-shadow';
import {Formik} from 'formik';
import TopTitle from '@custom/TopTitle';
import FormInput from '@custom/Form/Input';
import style from './style';
import CardList from 'components/custom/CardList';

export default props => {
  const [state, setstate] = useState({
    flex: new Animated.Value(0.3),
    labelSize: new Animated.Value(40),
  });

  const handlePageScroll = (flex, labelSize) => {
    setstate(prev => ({
      flex,
      labelSize,
    }));
  };
  useEffect(() => {
    Animated.timing(state.labelSize, {
      toValue: 200,
      easing: Easing.back(),
      duration: 2000,
    }).start();

    Animated.timing(state.flex, {
      toValue: 200,
      duration: 2000,
    }).start();
  }, []);

  return (
    <KeyboardAvoidingView style={style.container}>
      <Animated.View style={[style.topTitle, {flex: state.flex}]}>
        <TopTitle labelSize={state.labelSize} title="Find Car Wash" />
        <View style={style.inputForm}>
          <Formik
            initialValues={{search: ''}}
            onSubmit={values => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <FormInput
                  rounded
                  inputViewStyle={{
                    borderColor: '#e1fbff',
                    backgroundColor: '#e1fbff',
                  }}
                  handleChange={handleChange}
                  name="search"
                  placeholder="Search for car wash"
                  submitting={false}
                />
              </View>
            )}
          </Formik>
        </View>
      </Animated.View>
      <View style={{flex: 1}}>
        <CardList
          handlePageScroll={handlePageScroll}
          {...props}
          loading={true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
