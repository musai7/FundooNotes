import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useImagePicker from './ImagePicker';
import SignOut from '../screens/SignOut';
import {useNavigation} from '@react-navigation/native';
import useFetchNotes from '../Services/data/FetchNotes';

const Header = ({headerState, noteData, pinNoteData}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [trash, setTrash] = useState(false);
  const {openCamera, openGalary, imageUri, userName, email} = useImagePicker();
  const {handleSignOut} = SignOut();
  const {updateDeleteData, deleteData, fetchNoteData} = useFetchNotes();

  // console.log('data', headerState.cardsdata);
  console.log('header note data', noteData);

  const onPressHandler = () => {
    setModalVisible(true);
  };

  return headerState.header ? (
    <>
      <View style={Styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon name="menu" color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchNotes', {...pinNoteData});
            }}>
            <Text style={Styles.text}>SearchNotes</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 10}}>
            <Icons name="ios-grid-outline" color={'black'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressHandler}>
            {imageUri ? (
              <Avatar.Image source={imageUri} size={30} />
            ) : (
              <Avatar.Icon label={userName.charAt(0)} size={30} />
            )}
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={Styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setModal(true);
                  }}>
                  {imageUri ? (
                    <Avatar.Image source={imageUri} size={60} />
                  ) : (
                    <Avatar.Text label={userName.charAt(0)} />
                  )}
                </TouchableOpacity>
                <Modal transparent={true} animationType="fade" visible={modal}>
                  <View style={Styles.modalView2}>
                    <Text style={Styles.text}>Choose Image From </Text>
                    <TouchableOpacity
                      style={{paddingRight: 20}}
                      onPress={() => {
                        openCamera();
                        setModal('false');
                      }}>
                      <Text style={Styles.text}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        openGalary();
                        setModal('false');
                      }}>
                      <Text style={Styles.text}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModal(false);
                      }}>
                      <Text style={Styles.text}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <Text style={Styles.text}>{userName}</Text>
                <Text style={Styles.text}>{email}</Text>
              </View>

              <View style={Styles.view}>
                <TouchableOpacity onPress={handleSignOut}>
                  <Text style={Styles.text}>SignOut</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={Styles.text}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </>
  ) : (
    <>
      <View style={Styles.falseContainer}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              updateDeleteData(headerState.cardsdata[0], trash);
              fetchNoteData();
              headerState.setHeader(true);
            }}>
            <Icon style={Styles.icon} name="cross" size={40} color={'black'} />
          </TouchableOpacity>
        </View>

        <View style={Styles.viewIcons}>
          <TouchableOpacity
            onPress={() => {
              // OnPinPressed();
            }}>
            <AntDesign
              style={Styles.icon}
              name={true ? 'pushpin' : 'pushpino'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <AntDesign
              style={Styles.icon}
              name="bells"
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTrash(!trash);
            }}>
            <Icons
              style={Styles.icon}
              name={trash ? 'trash' : 'trash-outline'}
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Header;

const Styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 25,
    margin: '2%',
    alignSelf: 'center',
    padding: '2%',
    flexDirection: 'row',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    width: '90%',
  },
  view: {
    flexDirection: 'row',
    alignSelf: 'auto',
    justifyContent: 'space-between',
  },
  modalView: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '56%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    elevation: 20,
    width: '70%',
    height: '30%',
  },
  modalView2: {
    alignSelf: 'center',
    marginTop: '25%',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 15,
    elevation: 20,
    width: '40%',
    height: '30%',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  falseContainer: {
    height: '7%',
    flexDirection: 'row',
    margin: '2.5%',
    justifyContent: 'space-between',
  },
  viewIcons: {
    flexDirection: 'row',
    marginRight: '2%',
  },
  icon: {
    margin: 5,
  },
});
