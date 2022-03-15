import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import useFetchNotes from '../Services/data/FetchNotes';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const NewNotes = () => {
  const noteData = useRoute().params;
  const navigation = useNavigation();

  const {storeData} = useFetchNotes();
  const [title, setTitle] = useState(noteData?.title || '');
  const [note, setNote] = useState(noteData?.note || '');
  const [isUpDate, setIsUpDate] = useState(noteData?.isUpDate || false);
  const [pin, setPin] = useState(noteData?.pin || false);
  const [archieve, setArchieve] = useState(noteData?.archieve || false);
  const [trash, setTrash] = useState(noteData?.delete || false);

  const [modalVisible, setModalVisible] = useState(false);

  const [key] = useState(noteData?.key || '');

  return (
    <View>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => {
            storeData(title, note, isUpDate, key, pin, archieve, trash);
          }}>
          <AntDesign name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>

        <View style={Styles.view}>
          <TouchableOpacity
            onPress={() => {
              setPin(!pin);
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
          <TouchableOpacity
            onPress={() => {
              setArchieve(!archieve);
            }}>
            <Icon
              style={Styles.icon}
              name={archieve ? 'archive' : 'archive-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTrash(!trash);
            }}>
            <Icon
              style={Styles.icon}
              name={trash ? 'trash' : 'trash-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          style={Styles.titleTextInput}
          value={title}
          placeholder="Title"
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <TextInput
          style={Styles.notesTextInput}
          value={note}
          placeholder="Notes"
          placeholderTextColor={'gray'}
          multiline={true}
          onChangeText={text => {
            setNote(text);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: '135%',
          padding: 16,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            style={[Styles.icon, {marginLeft: '5%'}]}
            name={'add-circle-outline'}
            size={32}
            color={'black'}
          />
          <Icon
            style={Styles.icon}
            name={'md-color-palette-outline'}
            size={32}
            color={'black'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Entypo
            style={Styles.icon}
            name="dots-three-vertical"
            size={23}
            color={'black'}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={Styles.modalView}>
            <View style={{padding: '5%'}}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  navigation.navigate('LabelsList');
                  setModalVisible(false);
                }}>
                <Icons
                  style={Styles.icon}
                  name={'label-outline'}
                  size={30}
                  color={'black'}
                />
                <Text style={{color: 'black', fontSize: 20}}>Labels</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    marginRight: 15,
  },
  titleTextInput: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
  },
  notesTextInput: {
    marginLeft: 10,
    fontSize: 15,
    color: 'black',
  },
  modalView: {
    justifyContent: 'space-between',
    marginVertical: '140%',
    backgroundColor: 'white',
    width: '100%',
    height: '28%',
    elevation: 20,
  },
});

export default NewNotes;
