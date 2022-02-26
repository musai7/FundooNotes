import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import FetchDataBAse from '../Services/data/FetchData';
import {Paragraph} from 'react-native-paper';
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Header navigation={navigation} />
      <View style={{flex: 15}}>
        <ScrollView>
          <Text style={{color: 'red', fontSize: 30}}>HOME PAGE</Text>
        </ScrollView>
      </View>
      <View>
        <BottomBar />
      </View>
    </View>
  );
}

export default HomeScreen;
