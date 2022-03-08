import {useContext, useState} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthContext';
import {useNavigation} from '@react-navigation/native';

const useFetchNotes = () => {
  const navigation = useNavigation();

  const {token} = useContext(AuthContext);
  const [pinNoteData, setPinNoteData] = useState([]);
  const [unPinNoteData, setUnPinNoteData] = useState([]);
  const [archieveData, setArchieve] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [noteData, setNoteData] = useState([]);

  const response = firebase.firestore().collection('userNotes');

  const fetchNoteData = async () => {
    let pinNotesArray = [];
    let unPinNotesArray = [];
    let archieveArray = [];
    let deleteArray = [];
    let noteDataArray = [];
    await firestore()
      .collection('userNotes')
      .doc(token)
      .collection('notes')
      .get()
      .then(notes => {
        notes.forEach(note => {
          const data = note.data();
          data.key = note.id;
          if (data.pin && !data.archieve && !data.delete) {
            pinNotesArray.push(data);
          } else if (!data.pin && !data.archieve && !data.delete) {
            unPinNotesArray.push(data);
          }
          if (data.archieve) {
            data.pin = false;
            archieveArray.push(data);
          } else if (data.delete) {
            deleteArray.push(data);
          }
          if (!data.archieve && !data.delete) {
            noteDataArray.push(data);
          }
        });
        setPinNoteData(pinNotesArray);
        setUnPinNoteData(unPinNotesArray);
        setArchieve(archieveArray);
        setDeleteData(deleteArray);
        setNoteData(noteDataArray);
      });
  };

  const updateDeleteData = async (key, trash) => {
    await response.doc(token).collection('notes').doc(key).update({
      delete: trash,
    });
    console.log('trash fetch', trash);
  };

  const storeData = async (
    title,
    note,
    isUpDate,
    key,
    pin,
    archieve,
    trash,
  ) => {
    if (isUpDate) {
      console.log('notes updated');

      if (note.length !== 0 || title.length !== 0) {
        await response.doc(token).collection('notes').doc(key).update({
          title: title,
          note: note,
          pin: pin,
          archieve: archieve,
          delete: trash,
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
    deleteData,
    updateDeleteData,
    noteData,
  };
};

export default useFetchNotes;
