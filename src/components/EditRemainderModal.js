import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DropDownModal from './DropDownModals';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
const EditeditRemainderModal = ({
  editRemainderModal,
  setEditRemainderModal,
  setAlarm,
  setRemainder,
  keys,
  remainder,
}) => {
  const [isDate, setIsDate] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('MMM DD'));
  const [selectedTime, setSelectedTime] = useState(moment().format('hh:mm A'));
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  console.log('editRemainder', remainder);
  return (
    <View>
      <Modal
        transparent={true}
        animationType="slide"
        onDismiss={() => {
          setEditRemainderModal(false);
        }}
        visible={editRemainderModal}
        onRequestClose={() => setEditRemainderModal(false)}>
        <View style={Styles.modalView}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: 'black',
              marginTop: '4%',
              marginLeft: '4%',
            }}>
            {remainder ? 'Edit Reminder' : 'Add Reminder'}
          </Text>
          <Pressable
            onPress={() => {
              console.log('hi');
              setIsDate(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: '4%',
                paddingRight: '4%',
                marginTop: '4%',
                borderBottomWidth: 1,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>{selectedDate}</Text>
              <Icon name="chevron-down" color={'black'} size={20} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log('hi');
              setIsTime(true);
            }}
            onPressOut={() => {
              setIsTime(true);
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: '4%',
                paddingRight: '4%',
                marginTop: '4%',
                borderBottomWidth: 1,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>{selectedTime}</Text>
              <Icon name="chevron-down" color={'black'} size={20} />
            </View>
          </Pressable>

          <DropDownModal
            isDate={isDate}
            setIsDate={setIsDate}
            isTime={isTime}
            setIsTime={setIsTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setAlarm={setAlarm}
            setRemainder={setRemainder}
            setDate={setDate}
            setTime={setTime}
          />
          <View
            style={{
              flexDirection: 'row-reverse',
              marginTop: '12%',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#6495ed',
                height: 35,
                width: '18%',
                borderRadius: 15,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setEditRemainderModal(false);
                  setRemainder(date + time);
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    padding: 6,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            <Pressable
              onPress={() => {
                setEditRemainderModal(false);
              }}>
              <Text
                style={{
                  fontSize: 18,
                  padding: 6,
                  color: 'blue',
                  marginRight: '5%',
                }}>
                Cancel
              </Text>
            </Pressable>
            {remainder ? (
              <Pressable
                onPress={() => {
                  PushNotification.cancelLocalNotification(keys);
                  setRemainder('');
                  setEditRemainderModal(false);
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    padding: 6,
                    color: 'blue',
                    marginRight: '5%',
                    alignSelf: 'center',
                  }}>
                  Delete
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditeditRemainderModal;

const Styles = StyleSheet.create({
  modalView: {
    alignSelf: 'center',
    marginVertical: '60%',
    backgroundColor: 'white',
    borderRadius: 25,
    width: '90%',
    height: '33%',
    elevation: 20,
    padding: '5%',
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontSize: 18,
    backgroundColor: 'white',
    fontWeight: 'bold',
    height: 45,
  },
});
