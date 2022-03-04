import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Notes = ({unPinNoteData, item, setUnPinNoteData}) => {
  const navigation = useNavigation();
  const [isUpDate, setIsUpdate] = useState(true);

  const [pin, setPin] = useState(false);

  const onPressUpdate = () => {
    navigation.navigate('NewNotes', {...item, isUpDate: isUpDate});
  };

  const OnHandleLongPress = () => {};
  return !item.archieve ? (
    <View style={Styles.view}>
      <TouchableOpacity onPress={onPressUpdate} onLongPress={() => {}}>
        <Text style={Styles.titleText}> {item.title}</Text>
        <Text style={Styles.notesText}>{item.note}</Text>
      </TouchableOpacity>
    </View>
  ) : null;
  // return (
  //   <View style={Styles.view}>
  //     <TouchableOpacity onPress={onPressUpdate} onLongPress={() => {}}>
  //       <Text style={Styles.titleText}> {item.title}</Text>
  //       <Text style={Styles.notesText}>{item.note}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};
export default Notes;

const Styles = StyleSheet.create({
  view: {
    backgroundColor: '#deb876',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 1,
    borderRadius: 10,
    // width: '40%',
  },
  modalView: {
    backgroundColor: 'white',
    elevation: 20,
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingTop: 15,
  },
  icon: {
    margin: 10,
    // marginTop: '10%',
    paddingTop: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notesText: {
    color: 'black',
    fontSize: 18,
  },
});
