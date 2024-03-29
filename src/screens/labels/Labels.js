import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import ThreeDotsModal from '../../components/ThreeDotsModal';
import BottomBar from '../../components/BottomBar';
import useFetchNotes from '../../Services/data/FetchNotes';
import Notes from '../../components/Notes';
import {useSelector} from 'react-redux';

const Labels = () => {
  const lableItem = useRoute().params;
  console.log('lableItem', lableItem);
  const navigation = useNavigation();
  const {labelData} = useSelector(state => state.userReducer);
  const {pinNoteData, fetchNoteData, unPinNoteData} = useFetchNotes();

  useEffect(() => {
    const unsibscribe = navigation.addListener('focus', () => fetchNoteData());
    return unsibscribe;
  }, []);

  let pinnedLableNote = pinNoteData.filter(notes => {
    console.log('notes', notes);
    for (let index = 0; index < notes?.labelData?.length; index++) {
      if (lableItem.key === notes.labelData[index]) {
        return true;
      }
    }
  });

  let unpinnedLableNote = unPinNoteData.filter(notes => {
    console.log('notes', notes);
    for (let index = 0; index < notes?.labelData?.length; index++) {
      if (lableItem.key === notes.labelData[index]) {
        return true;
      }
    }
  });

  console.log('pinnedLableNote', pinnedLableNote);

  const sections = [
    {title: 'pinned', data: [pinnedLableNote]},
    {title: 'others', data: [unpinnedLableNote]},
  ];

  const renderItem = item => {
    return (
      <FlatList
        numColumns={1}
        key={1}
        data={item.item}
        keyExtractor={item => item.key}
        renderItem={({item}) => <Notes headerState={headerState} item={item} />}
      />
    );
  };

  return (
    <View style={Styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: '2%',
            height: '7%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: '2.5%',
            }}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Icon name="menu" color={'black'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={Styles.text}>{lableItem.labelName}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: '2.5%',
            }}>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="search" color={'black'} size={28} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="ios-grid-outline" color={'black'} size={25} />
            </TouchableOpacity>
            <ThreeDotsModal />
          </View>
        </View>
        {pinnedLableNote.length > 0 || unpinnedLableNote.length > 0 ? (
          <SectionList
            sections={sections}
            renderSectionHeader={({section}) =>
              pinnedLableNote.length ? (
                <Text style={Styles.pinnedText}>{section.title}</Text>
              ) : null
            }
            renderItem={renderItem}
          />
        ) : (
          <View style={Styles.labelView}>
            <Icons
              style={Styles.icon}
              name={'label-outline'}
              size={70}
              color={'black'}
            />
            <Text style={Styles.text}>Label Notes will </Text>
            <Text style={Styles.text}>Appear Here </Text>
          </View>
        )}
      </View>
      <View>
        <BottomBar lableItem={lableItem} navigation={navigation} />
      </View>
    </View>
  );
};

export default Labels;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  labelView: {
    alignSelf: 'center',
    marginTop: '70%',
    alignItems: 'center',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notesText: {
    color: 'black',
    fontSize: 18,
  },
  view: {
    backgroundColor: '#deb876',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 1,
    borderRadius: 10,
    // width: '40%',
  },
  pinnedText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '1%',
  },
});
