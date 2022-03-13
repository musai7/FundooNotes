import React, {Component} from 'react';
import {View} from 'react-native';
import Navigator from './src/navigation/Navigator';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
const App = () => {
  return (
    <Provider store={Store}>
      <Navigator />
    </Provider>
  );
};

export default App;
