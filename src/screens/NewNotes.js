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
import {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthContext';

const NewNotes = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const {token} = useContext(AuthContext);
  // console.log('token', token);
  // console.log(title);
  // console.log(note);
  const response = firebase.firestore().collection('userNotes');

  const storeData = async () => {
    try {
      if (note.length !== 0 || title.length !== 0) {
        await response.doc(token).collection('notes').add({
          title: title,
          note: note,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => {
            storeData();
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
        placeholder="Title"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setTitle(text);
        }}
        // onBlur={setNote(note)}
      />
      <TextInput
        style={Styles.notesTextInput}
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
