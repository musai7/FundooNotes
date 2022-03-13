import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const DrawerLabelCards = ({item, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Labels', {...item})}>
      <View style={{flexDirection: 'row', margin: '3.5%'}}>
        <Icons
          style={Styles.icon}
          name={'label-outline'}
          size={25}
          color={'black'}
        />
        <Text style={Styles.text}>{item.labelName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerLabelCards;

const Styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: 'black',
    marginLeft: '9%',
    marginRight: '2%',
  },
  icon: {
    marginRight: '3%',
    marginLeft: '3.5%',
  },
});
