import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import Notes from '../components/Notes';
import useFetchNotes from '../Services/data/FetchNotes';

const HomeScreen = ({navigation}) => {
  const {pinNoteData, unPinNoteData, fetchNoteData, setUnPinNoteData} =
    useFetchNotes();
  const [header, setHeader] = useState(true);
  const [cardsdata, setCardData] = useState([]);
  // const [noOfColumns, setNoOfColumns] = useState(1);
  // const [grid, setGrid] = useState(false);

  headerState = {
    header,
    setHeader,
    cardsdata,
    setCardData,
    pinNoteData,
    unPinNoteData,
  };
  let noteData = [{...pinNoteData, ...unPinNoteData}];
  console.log('pimData', pinNoteData);
  console.log('noteData home', noteData);
  useEffect(() => {
    const unsibscribe = navigation.addListener('focus', () => fetchNoteData());
    return unsibscribe;
  }, []);

  return (
    <View style={Styles.container}>
      <Header
        headerState={headerState}
        noteData={noteData}
        navigation={navigation}
        pinNoteData={pinNoteData}
      />
      <ScrollView style={{flex: 1}}>
        {pinNoteData.length > 0 ? (
          <Text style={Styles.pinnedText}>Pinned</Text>
        ) : null}

        {pinNoteData ? (
          <FlatList
            data={pinNoteData}
            // numColumns={1}
            // key={1}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <Notes headerState={headerState} item={item} />
            )}
          />
        ) : null}
        {pinNoteData.length > 0 && unPinNoteData.length > 0 ? (
          <Text style={Styles.pinnedText}>Others</Text>
        ) : null}

        {unPinNoteData ? (
          <FlatList
            data={unPinNoteData}
            // numColumns={1}
            // key={1}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <Notes headerState={headerState} item={item} />
            )}
          />
        ) : null}

        {!unPinNoteData.length && !pinNoteData.length ? (
          <View style={Styles.noteView}>
            <Text style={Styles.text}>Notes</Text>
          </View>
        ) : null}
      </ScrollView>
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
    marginBottom: '1%',
  },
});
