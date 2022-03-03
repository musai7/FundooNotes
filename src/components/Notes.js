import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Notes = ({item}) => {
  const navigation = useNavigation();
  const [isUpDate, setIsUpdate] = useState(true);
  // const {title, note} = item;
  // console.log('item', item);
  const onPressUpdate = () => {
    navigation.navigate('NewNotes', {...item, isUpDate: isUpDate});
  };
  return (
    <View style={Styles.view} isUpDate={isUpDate}>
      <TouchableOpacity
        onPress={() => {
          // setIsUpdate(true);
          onPressUpdate();
        }}>
        <Text style={{color: 'red', fontSize: 25}}> {item.title}</Text>
        <Text style={{color: 'red', fontSize: 25}}>{item.note}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Notes;

const Styles = StyleSheet.create({
  view: {
    backgroundColor: '#deb876',
    marginLeft: '5%',
    marginBottom: '2%',
    borderWidth: 1,
    borderRadius: 10,
    width: '40%',
  },
});
