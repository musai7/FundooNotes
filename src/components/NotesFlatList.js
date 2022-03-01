import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthContext';

const NotesFlatList = () => {
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
          console.log('foreach', data);
          data.key = note.id;
          notesArray.push(data);
          console.log('flat list notes ', notesArray);
        });
      });
    setNoteData(notesArray);
  };

  // useEffect(() => {
  //   fetchNoteData();
  // }, []);

  return {
    noteData,
    fetchNoteData,
  };
  // <View>
  //   <Text>ABCSDBHB</Text>
  //   <FlatList
  //     data={notesArray}
  //     keyExtractor={item => item.key}
  //     renderItem={({item}) => (
  //       console.log('rendeer item', item),
  //       (
  //         // console.log('flat note data', noteData),
  //         <>
  //           <Text style={{color: 'red', fontSize: 50}}> hello</Text>
  //           <Text style={{color: 'red', fontSize: 50}}> hello</Text>
  //         </>
  //       )
  //       // <Notes item={item} />
  //     )}
  //   />
  // </View>
  // );
};

export default NotesFlatList;
