import React from 'react';
import {View, Text} from 'react-native';
const Notes = ({item}) => {
  // const {title, note} = item;
  console.log('item', item);
  return (
    <View>
      <Text style={{color: 'red', fontSize: 25}}> {item.title}</Text>
      <Text style={{color: 'red', fontSize: 25}}>{item.note}</Text>
    </View>
  );
};
export default Notes;
