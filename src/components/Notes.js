import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ThreeDotsModal from './ThreeDotsModal';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Notes = ({unPinNoteData, item, setUnPinNoteData}) => {
  const navigation = useNavigation();
  const [isUpDate, setIsUpdate] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dotsModalVisible, setDotsModalVisible] = useState(false);
  const [pin, setPin] = useState(false);

  console.log('item');

  // console.log('notes item', item);

  const onPressUpdate = () => {
    navigation.navigate('NewNotes', {...item, isUpDate: isUpDate});
  };

  const OnHandleLongPress = () => {};
  return (
    <View style={Styles.view}>
      <TouchableOpacity
        onPress={() => {
          onPressUpdate();
        }}
        onLongPress={() => {
          // navigation.navigate('NewNotes');
          setModalVisible(true);
        }}>
        <Text style={Styles.titleText}> {item.title}</Text>
        <Text style={Styles.notesText}>{item.note}</Text>
      </TouchableOpacity>
      <View>
        <Modal
          item={item}
          setUnPinNoteData={setUnPinNoteData}
          unPinNoteData={unPinNoteData}
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={Styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <Icon
                style={Styles.icon}
                name="cross"
                size={35}
                color={'black'}
              />
            </TouchableOpacity>
            <View style={Styles.viewIcons}>
              <TouchableOpacity
                onPress={() => {
                  // OnPinPressed();
                }}>
                <AntDesign
                  style={Styles.icon}
                  name={pin ? 'pushpin' : 'pushpino'}
                  size={25}
                  color={'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <AntDesign
                  style={Styles.icon}
                  name="bells"
                  size={25}
                  color={'black'}
                />
              </TouchableOpacity>
              <ThreeDotsModal item={item} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
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
