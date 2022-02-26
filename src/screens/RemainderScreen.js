import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';

const Remainder = () => {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{flex: 15}}>
        <ScrollView>
          <Text style={{color: 'green', fontSize: 30}}>Remainder Screen</Text>
        </ScrollView>
      </View>
      <View>
        <BottomBar />
      </View>
    </View>
  );
};

export default Remainder;
