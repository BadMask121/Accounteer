/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'unstated';
import AppComponent from './src/App';
import {name as appName} from './app.json';
import Why from '@welldone-software/why-did-you-render';
const App = () => {
  Why(React);
  return (
    <Provider>
      <AppComponent />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => App);
