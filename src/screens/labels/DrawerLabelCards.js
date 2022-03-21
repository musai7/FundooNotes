import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const DrawerLabelCards = ({navigation, labelData}) => {
  let LableArray = [];
  for (let index = 0; index < labelData.length; index++) {
    LableArray.push(
      <TouchableOpacity
        key={labelData[index].labelName}
        onPress={() => {
          navigation.navigate('Labels', {...labelData[index]});
        }}>
        <View style={{flexDirection: 'row', margin: '3.5%'}}>
          <Icons
            style={Styles.icon}
            name={'label-outline'}
            size={25}
            color={'black'}
          />
          <Text style={{color: 'black'}}>{labelData[index].labelName}</Text>
        </View>
      </TouchableOpacity>,
    );
  }
  return LableArray;
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
