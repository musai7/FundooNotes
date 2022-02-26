import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

const Settings = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {/* <Header /> */}
      <Text style={{color: 'green', fontSize: 30}}>Settings Screen</Text>
    </View>
  );
};

export default Settings;
