import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, SectionList} from 'react-native';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import Notes from '../components/Notes';
import useFetchNotes from '../Services/data/FetchNotes';

const HomeScreen = ({navigation}) => {
  const {pinNoteData, unPinNoteData, fetchNoteData} = useFetchNotes();
  const [header, setHeader] = useState(true);
  const [cardsdata, setCardData] = useState([]);
  const [grid, setGrid] = useState(false);
  const numColumns = grid ? 2 : 1;

  headerState = {
    header,
    setHeader,
    cardsdata,
    setCardData,
    pinNoteData,
    unPinNoteData,
    grid,
    setGrid,
  };

  useEffect(() => {
    const unsibscribe = navigation.addListener('focus', () => fetchNoteData());
    return unsibscribe;
  }, [fetchNoteData]);

  const sections = [
    {title: 'pinned', data: [pinNoteData]},
    {title: 'others', data: [unPinNoteData]},
  ];

  const renderItem = item => {
    return (
      <FlatList
        numColumns={numColumns}
        key={numColumns}
        data={item.item}
        keyExtractor={item => item.key}
        renderItem={({item}) => <Notes headerState={headerState} item={item} />}
      />
    );
  };

  return (
    <View style={Styles.container}>
      <Header headerState={headerState} navigation={navigation} />
      <View style={{flex: 1}}>
        {pinNoteData.length > 0 || unPinNoteData.length > 0 ? (
          <SectionList
            sections={sections}
            renderSectionHeader={({section}) =>
              pinNoteData.length ? (
                <Text style={Styles.pinnedText}>{section.title}</Text>
              ) : null
            }
            renderItem={renderItem}
          />
        ) : null}

        {!unPinNoteData.length && !pinNoteData.length ? (
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

// yarn add uuid
// npm i uuid
// https://www.npmjs.com/package/uuid
