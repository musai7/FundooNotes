import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import useFetchNotes from '../Services/data/FetchNotes';

const Delete = () => {
  const navigation = useNavigation();
  const {deleteData, fetchNoteData} = useFetchNotes();
  console.log('deleteData', deleteData);
  const [isUpDate, setIsUpdate] = useState(true);

  let pinNoteData = [];

  useEffect(() => {
    const unsibscribe = navigation.addListener('focus', () => fetchNoteData());
    return unsibscribe;
  }, []);

  const onPressUpdate = () => {};

  return (
    <View style={Styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{
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
              <Text style={Styles.text}>Delete</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: '2.5%',
            }}>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="search" color={'black'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="ios-grid-outline" color={'black'} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        {deleteData.length > 0 ? (
          <FlatList
            data={deleteData}
            // numColumns={2}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <View style={Styles.view}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NewNotes', {
                      ...item,
                      isUpDate: isUpDate,
                    });
                  }}
                  onLongPress={() => {}}>
                  <Text style={Styles.titleText}> {item.title}</Text>
                  <Text style={Styles.notesText}>{item.note}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={Styles.deleteView}>
            <Icon
              style={Styles.icon}
              name={'trash-outline'}
              size={70}
              color={'black'}
            />
            <Text style={Styles.text}>Delete Notes will </Text>
            <Text style={Styles.text}>Appear Here </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Delete;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  deleteView: {
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
});
