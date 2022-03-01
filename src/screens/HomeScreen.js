import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import Notes from '../components/Notes';
import {firebase} from '@react-native-firebase/firestore';
import {FetchNoteData} from '../Services/FetchUserNotes';
import NotesFlatList from '../components/NotesFlatList';

const HomeScreen = ({navigation}) => {
  const {noteData, fetchNoteData} = NotesFlatList();
  console.log('Notes Flat List home Data ', noteData);
  // var notedata;

  useEffect(() => {
    fetchNoteData();
  }, []);

  let array = [
    {key: 'hello', demo: 'data'},
    {key: 'jbjhj', demo: 'data'},
  ];
  // console.log('out side ', notedata);
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Header navigation={navigation} />
      <View style={{flex: 1}}>
        <Text style={{color: 'red', fontSize: 30}}>HOME PAGE</Text>
        <View>
          <FlatList
            style={{color: 'red'}}
            data={noteData}
            // numColumns={2}
            // keyExtractor={item => item.key}
            renderItem={({item}) => <Notes item={item} />}
            navigation={navigation}
          />
        </View>
      </View>
      <View>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;
