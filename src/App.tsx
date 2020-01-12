/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Route from './routes/App.routes';
import {app} from 'helpers/constants';
import subscribe from './subscriber';

interface Props {
  user?: string;
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

// const MyStatusBar = ({backgroundColor, ...props}) => (
//   <View style={[{height: STATUSBAR_HEIGHT}, {backgroundColor}]}>
//     <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//   </View>
// );
const App = (props: Props) => {
  const {state} = props.appstate;
  return (
    <Fragment>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Spinner
          visible={state.isLoading}
          textContent={state.loadingMessage}
          textStyle={{color: '#fff'}}
        />
        <Route />
      </SafeAreaView>
    </Fragment>
  );
};

export default subscribe(App);
