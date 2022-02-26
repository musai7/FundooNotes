import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import useImagePicker from './ImagePicker';
import SignOut from '../screens/SignOut';

const Header = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const {openCamera, openGalary, imageUri, userName, email} = useImagePicker();

  // console.log('IMage url', imageUri);
  const {handleSignOut} = SignOut();

  const onPressHandler = () => {
    setModalVisible(true);
  };

  return (
    <View style={Styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name="menu" color={'black'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={Styles.text}>SearchNotes</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{marginRight: 10}}>
          <Icon name="ios-grid-outline" color={'black'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHandler}>
          {imageUri ? (
            <Avatar.Image source={imageUri} size={30} />
          ) : (
            <Avatar.Icon label="k" size={30} />
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
                  <Avatar.Text label="k" />
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
  );
};

export default Header;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    margin: '5%',
    padding: '2%',
    flexDirection: 'row',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '30%',
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
});
