import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import useFetchNotes from '../Services/data/FetchNotes';

const ThreeDotsModal = ({item, setUnPinNoteData, unPinNoteData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {deleteNotes} = useFetchNotes();

  const OnDelete = () => {
    // deleteNotes(item.key);
    console.log(unPinNoteData);
    // unPinNoteData.forEach(value => {
    //   console.log(value);
    //   setModalVisible(false);vbbbbnvvnbbvnb
    // });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Icon
          style={Styles.icon}
          name="dots-three-vertical"
          size={25}
          color={'black'}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={Styles.text}>archive</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={OnDelete}>
          <Text style={Styles.text}>Delete</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
export default ThreeDotsModal;

const Styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    textAlign: 'center',

    elevation: 20,
    height: '20%',
    width: '30',
    justifyContent: 'space-between',
  },
  icon: {
    margin: 10,
    paddingTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
});
