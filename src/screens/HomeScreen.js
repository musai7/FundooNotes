import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import Notes from '../components/Notes';
import useFetchNotes from '../Services/data/FetchNotes';

const HomeScreen = ({navigation}) => {
  const {noteData, fetchNoteData} = useFetchNotes();

  useEffect(() => {
    const unsibscribe = navigation.addListener('focus', () => fetchNoteData());
    return unsibscribe;
  }, [navigation]);

  return (
    <View style={Styles.container}>
      <Header navigation={navigation} />
      <View style={{flex: 1}}>
        <FlatList
          data={noteData}
          numColumns={2}
          // keyExtractor={item => item.key}
          renderItem={({item}) => <Notes item={item} />}
          navigation={navigation}
        />
        {!noteData.length ? (
          <View style={Styles.noteView}>
            <Text style={Styles.text}>Notes</Text>
          </View>
        ) : null}
      </View>
      <View>
        <BottomBar navigation={navigation} />
      </View>
    </View>
  );
};

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  noteView: {
    alignItems: 'center',
    marginBottom: '60%',
  },
  text: {color: 'gray', fontSize: 30},
});
