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

const NewNotes = ({navigation}) => {
  const noteData = useRoute().params;
  // const route = useRoute();
  console.log('Note Data', noteData);

  const {storeData} = useFetchNotes();
  const [title, setTitle] = useState(noteData?.title || '');
  const [note, setNote] = useState(noteData?.note || '');
  const [isUpDate, setIsUpDate] = useState(noteData?.isUpDate || '');
  const [key, setKey] = useState(noteData?.key || '');

  return (
    <View>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => {
            storeData(title, isUpDate, key);
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>

        <View style={Styles.view}>
          <AntDesign
            style={Styles.icon}
            name="pushpino"
            size={25}
            color={'black'}
          />
          <AntDesign
            style={Styles.icon}
            name="bells"
            size={25}
            color={'black'}
          />
          <Icon style={Styles.icon} name="archive" size={25} color={'black'} />
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
