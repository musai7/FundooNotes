import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';

const Archieve = () => {
  return (
    <View style={Styles.container}>
      <View style={{flex: 1}}>
        <Header />
        <Text style={{color: 'green', fontSize: 30}}>Archieve Screen</Text>
      </View>
    </View>
  );
};

export default Archieve;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
