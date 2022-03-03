import {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthContext';

const useFetchNotes = () => {
  let notesArray = [];

  const {token} = useContext(AuthContext);
  const [noteData, setNoteData] = useState({});

  const fetchNoteData = async () => {
    await firestore()
      .collection('userNotes')
      .doc(token)
      .collection('notes')
      .get()
      .then(notes => {
        notes.forEach(note => {
          const data = note.data();
          data.key = note.id;
          notesArray.push(data);
        });
      });
    setNoteData(notesArray);
  };

  const storeData = async (title, note, isUpDate, key) => {
    const response = firebase.firestore().collection('userNotes');

    if (isUpDate) {
      if (note.length !== 0 || title.length !== 0) {
        await response.doc(token).collection('notes').doc(key).update({
          title: title,
          note: note,
        });
      }
    } else {
      try {
        if (note.length !== 0 || title.length !== 0) {
          await response.doc(token).collection('notes').add({
            title: title,
            note: note,
          });
          var count = 0;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    noteData,
    fetchNoteData,
    storeData,
  };
};

export default useFetchNotes;
