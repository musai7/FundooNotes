import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import useFetchNotes from '../Services/data/FetchNotes';
import {useRoute} from '@react-navigation/native';

const NewNotes = () => {
  const noteData = useRoute().params;

  const {storeData} = useFetchNotes();
  const [title, setTitle] = useState(noteData?.title || '');
  const [note, setNote] = useState(noteData?.note || '');
  const [isUpDate, setIsUpDate] = useState(noteData?.isUpDate || false);
  const [pin, setPin] = useState(noteData?.pin || false);
  const [archieve, setArchieve] = useState(noteData?.archieve || false);
  const [trash, setTrash] = useState(noteData?.delete || false);

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
              // OnPinPressed();
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
});

export default NewNotes;
