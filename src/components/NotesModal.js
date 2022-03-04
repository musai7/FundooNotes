import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NotesModal = ({setModalVisible, modalVisible}) => {
  //   const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState(false);
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Icon style={Styles.icon} name="cross" size={35} color={'black'} />
        </TouchableOpacity>
        <View style={Styles.viewIcons}>
          <TouchableOpacity
            onPress={() => {
              // OnPinPressed();
            }}>
            <AntDesign
              style={Styles.icon}
              name={pin ? 'pushpin' : 'pushpino'}
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
          <TouchableOpacity onPress={() => {}}>
            <Icon
              style={Styles.icon}
              name="dots-three-vertical"
              size={25}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default NotesModal;
