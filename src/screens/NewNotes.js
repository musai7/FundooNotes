import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import useFetchNotes from '../Services/data/FetchNotes';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Chip from '../components/Chip';
import RemainderModal from '../components/Modal';
import RemainderChip from '../components/RemainderChip';
import EditeditRemainderModal from '../components/EditRemainderModal';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  err => {
    console.log(err);
  },
);

const NewNotes = () => {
  const noteData = useRoute().params;
  console.log('noteData', noteData);
  const navigation = useNavigation();

  const {storeData} = useFetchNotes();
  const [title, setTitle] = useState(noteData?.title || '');
  const [note, setNote] = useState(noteData?.note || '');
  const [isUpDate, setIsUpDate] = useState(noteData?.isUpDate || false);
  const [pin, setPin] = useState(noteData?.pin || false);
  const [archieve, setArchieve] = useState(noteData?.archieve || false);
  const [trash, setTrash] = useState(noteData?.delete || false);

  const [modalVisible, setModalVisible] = useState(false);
  const [remainderModal, setRemainderModal] = useState(false);
  const [editRemainderModal, setEditRemainderModal] = useState(false);
  const [alarm, setAlarm] = useState();
  const [remainder, setRemainder] = useState(noteData?.remainder || '');
  const {labelData} = useSelector(state => state.userReducer);

  const [key] = useState(noteData?.key || '');
  console.log('noteData', noteData);

  useEffect(() => {
    createTable();
  }, []);

  let chipData = labelData.filter(labels => {
    for (let index = 0; index < noteData?.labelData?.length; index++) {
      if (labels.key === noteData?.labelData[index]) {
        return true;
      }
    }
  });
  console.log('remainder', remainder);
  console.log('date', new Date(remainder));

  const handleNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      channelName: 'Test Channel',
      // id: noteData?.key,
      date: new Date(moment(remainder, 'YYYY-MM-DD hh:mm')),
      title: 'remainder',
      message: 'Empty Notes',
    });
    console.log('noti');
  };

  const createTable = async () => {
    await db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS' +
          'UserNotes' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, title text,note text);',
      );
    });
  };

  const setData = async () => {
    if (title.length !== 0 || note.length !== 0) {
      try {
        await db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO UserNotes (title,note) VALUES (' +
              title +
              ',' +
              note +
              ')',
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getData = async () => {
    try {
      await db.transaction(tx => {
        tx.executeSql('SELECT title,note from UserNotes', [], (tx, results) => {
          console.log('getData');

          let len = results.rows.length;
          if (len > 0) {
            console.log('title->', results.rows.item(0).title);
            console.log('notes->', results.rows.item(0).notes);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  getData();

  return (
    <View style={{flex: 1}}>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => {
            storeData(
              title,
              note,
              isUpDate,
              key,
              pin,
              archieve,
              trash,
              noteData?.labelData,
              remainder,
            );
            if (remainder !== null) {
              // if (remainder > moment().format('YYYY-MM-DD hh:mm')) {
              handleNotification();
            }
            // }
            setData();
          }}>
          <AntDesign name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>

        <View style={Styles.view}>
          <TouchableOpacity
            onPress={() => {
              setPin(!pin);
            }}>
            <AntDesign
              style={Styles.icon}
              name={pin ? 'pushpin' : 'pushpino'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRemainderModal(true);
            }}>
            <AntDesign
              style={Styles.icon}
              name="bells"
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setArchieve(!archieve);
            }}>
            <Icon
              style={Styles.icon}
              name={archieve ? 'archive' : 'archive-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTrash(!trash);
            }}>
            <Icon
              style={Styles.icon}
              name={trash ? 'trash' : 'trash-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <TextInput
          style={Styles.titleTextInput}
          value={title}
          placeholder="Title"
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <TextInput
          style={Styles.notesTextInput}
          value={note}
          placeholder="Notes"
          placeholderTextColor={'gray'}
          multiline={true}
          onChangeText={text => {
            setNote(text);
          }}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <RemainderChip
            remainder={remainder}
            alarm={alarm}
            setEditRemainderModal={setEditRemainderModal}
          />
          <Chip chipData={chipData} />
        </View>

        <RemainderModal
          remainderModal={remainderModal}
          setRemainderModal={setRemainderModal}
          setAlarm={setAlarm}
          setEditRemainderModal={setEditRemainderModal}
          setRemainder={setRemainder}
        />

        <EditeditRemainderModal
          editRemainderModal={editRemainderModal}
          setEditRemainderModal={setEditRemainderModal}
          setRemainder={setRemainder}
          remainder={remainder}
          setAlarm={setAlarm}
          alarm={alarm}
          keys={noteData?.key}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            style={[Styles.icon, {marginLeft: '5%'}]}
            name={'add-circle-outline'}
            size={32}
            color={'black'}
          />
          <Icon
            style={Styles.icon}
            name={'md-color-palette-outline'}
            size={32}
            color={'black'}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Entypo
            style={Styles.icon}
            name="dots-three-vertical"
            size={23}
            color={'black'}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          onDismiss={() => {
            setModalVisible(false);
          }}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={Styles.modalView}>
            <View style={{padding: '5%'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', marginBottom: '2%'}}
                onPress={() => {
                  navigation.navigate('LabelsList', {
                    lablelIds: noteData?.labelData,
                  });
                  setModalVisible(false);
                }}>
                <Icons
                  style={Styles.icon}
                  name={'label-outline'}
                  size={30}
                  color={'black'}
                />
                <Text style={{color: 'black', fontSize: 20}}>Labels</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  setTrash(!trash);
                  setModalVisible(false);
                }}>
                <Icon
                  style={Styles.icon}
                  name={trash ? 'trash' : 'trash-outline'}
                  size={25}
                  color={'black'}
                />
                <Text style={{color: 'black', fontSize: 20}}> Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    marginRight: 15,
  },
  titleTextInput: {
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
  },
  notesTextInput: {
    marginLeft: 10,
    fontSize: 15,
    color: 'black',
  },
  labelText: {
    marginLeft: 15,
    fontSize: 15,
    color: 'black',
  },
  modalView: {
    justifyContent: 'space-between',
    marginVertical: '160%',
    backgroundColor: 'white',
    width: '100%',
    height: '20%',
    elevation: 20,
  },
});

export default NewNotes;
