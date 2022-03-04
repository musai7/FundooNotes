import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import Notes from '../components/Notes';
import useFetchNotes from '../Services/data/FetchNotes';

const HomeScreen = ({navigation}) => {
  const {pinNoteData, unPinNoteData, fetchNoteData, setUnPinNoteData} =
    useFetchNotes();

  useEffect(() => {
    const unsibscribe = navigation.addListener('focus', () => fetchNoteData());
    return unsibscribe;
  }, []);

  return (
    <View style={Styles.container}>
      <Header navigation={navigation} />
      {/* <View style={{flex: 1}}> */}
      <ScrollView style={{flex: 1}}>
        {pinNoteData.length > 0 ? (
          <Text style={Styles.pinnedText}>Pinned</Text>
        ) : null}

        {pinNoteData ? (
          <FlatList
            data={pinNoteData}
            // numColumns={2}
            keyExtractor={item => item.key}
            renderItem={({item}) => <Notes item={item} />}
          />
        ) : null}
        {pinNoteData.length > 0 && unPinNoteData.length > 0 ? (
          <Text style={Styles.pinnedText}>Others</Text>
        ) : null}

        {unPinNoteData ? (
          <FlatList
            data={unPinNoteData}
            // numColumns={2}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <Notes
                unPinNoteData={unPinNoteData}
                setUnPinNoteData={setUnPinNoteData}
                item={item}
              />
            )}
          />
        ) : null}

        {!unPinNoteData.length && !pinNoteData.length ? (
          <View style={Styles.noteView}>
            <Text style={Styles.text}>Notes</Text>
          </View>
        ) : null}
      </ScrollView>
      {/* </View> */}
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
    // marginBottom: '60%',
    marginTop: '70%',
  },
  text: {color: 'gray', fontSize: 30},
  pinnedText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: '5%',
  },
});
