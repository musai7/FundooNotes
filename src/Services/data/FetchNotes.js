import {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthContext';
import {useNavigation} from '@react-navigation/native';

const useFetchNotes = () => {
  const navigation = useNavigation();

  const {token} = useContext(AuthContext);
  const [pinNoteData, setPinNoteData] = useState([]);
  const [unPinNoteData, setUnPinNoteData] = useState([]);
  const [archieveData, setArchieve] = useState([]);

  const response = firebase.firestore().collection('userNotes');

  const fetchNoteData = async () => {
    let pinNotesArray = [];
    let unPinNotesArray = [];
    let archieveArray = [];
    await firestore()
      .collection('userNotes')
      .doc(token)
      .collection('notes')
      .get()
      .then(notes => {
        notes.forEach(note => {
          const data = note.data();
          data.key = note.id;
          if (data.pin) {
            pinNotesArray.push(data);
          } else {
            unPinNotesArray.push(data);
          }
          if (data.archieve) {
            archieveArray.push(data);
          }
        });
        setPinNoteData(pinNotesArray);
        setUnPinNoteData(unPinNotesArray);
        setArchieve(archieveArray);
        console.log('archieveData', archieveArray);
      });
  };

  const storeData = async (title, note, isUpDate, key, pin, archieve) => {
    if (isUpDate) {
      console.log('notes updated');

      if (note.length !== 0 || title.length !== 0) {
        await response.doc(token).collection('notes').doc(key).update({
          title: title,
          note: note,
          pin: pin,
          archieve: archieve,
          delete: false,
        });
      }
      navigation.goBack();
    } else {
      console.log('notes added');
      try {
        if (note.length !== 0 || title.length !== 0) {
          await response.doc(token).collection('notes').add({
            title: title,
            note: note,
            pin: pin,
            archieve: archieve,
            delete: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
      navigation.goBack();
    }
  };

  const deleteNotes = async key => {
    await response.doc(token).collection('notes').doc(key).delete();
  };

  return {
    pinNoteData,
    unPinNoteData,
    fetchNoteData,
    storeData,
    deleteNotes,
    setUnPinNoteData,
    archieveData,
  };
};

export default useFetchNotes;
