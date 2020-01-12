/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'unstated';
import AppComponent from './src/App';
import {name as appName} from './app.json';

const App = () => (
  <Provider>
    <AppComponent />
  </Provider>
);
AppRegistry.registerComponent(appName, () => App);
