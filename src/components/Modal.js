import React from 'react';
import {View, Text, Pressable, StyleSheet, Modal} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const RemainderModal = ({
  remainderModal,
  setRemainderModal,
  setEditRemainderModal,
  setRemainder,
  setAlarm,
  alarm,
  // handleNotification,
}) => {
  return (
    <Modal
      style={{marginBottom: '2%'}}
      transparent={true}
      animationType="slide"
      onDismiss={() => {
        setRemainderModal(false);
      }}
      visible={remainderModal}
      onRequestClose={() => setRemainderModal(false)}>
      <View style={Styles.modalView}>
        <Pressable
          onPress={() => {
            setAlarm(
              moment().format('hh a') < '8 am'
                ? moment().hours(8).minutes(0).calendar()
                : moment().hours(18).minutes(0).calendar(),
            );
            setRemainder(
              moment().format('hh a') < '8 am'
                ? moment().hours(8).minutes(0).format('YYYY-MM-DD hh:mm')
                : moment().hours(18).minutes(0).format('YYYY-MM-DD hh:mm'),
            );
            setRemainderModal(false);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{padding: '5%', flexDirection: 'row'}}>
              <Icons
                style={Styles.icon}
                name={'clock-time-four-outline'}
                size={25}
                color={'black'}
              />
              <Text style={Styles.text}>
                {moment().format('hh a') < '08 am'
                  ? 'Today Morning'
                  : moment().format('hh a') < '06 pm'
                  ? 'Today Evining'
                  : 'Tomorrow morning'}
              </Text>
            </View>
            <View>
              <Text style={Styles.text}>
                {moment().format('hh a') < '08 am'
                  ? moment().hours(8).minutes(0).format('hh:mm A')
                  : moment().format('hh a') < '06 pm'
                  ? moment().hours(18).minutes(0).format('hh:mm A')
                  : moment().hours(5).minutes(0).format('hh:mm A')}
              </Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setAlarm(moment().add(1, 'day').hours(8).minutes(0).calendar());
            setRemainderModal(false);
            setRemainder(
              moment()
                .add(1, 'day')
                .hours(8)
                .minutes(0)
                .format('YYYY-MM-DD hh:mm'),
            );
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{padding: '5%', flexDirection: 'row'}}>
              <Icons
                style={Styles.icon}
                name={'clock-time-four-outline'}
                size={25}
                color={'black'}
              />
              <Text style={Styles.text}>Tomorrow morning</Text>
            </View>
            <View>
              <Text style={Styles.text}>
                {moment().hours(8).minutes(0).format('hh:mm A')}
              </Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setAlarm(
              moment()
                .add(7, 'day')
                .hours(8)
                .minutes(0)
                .format('DD MMM hh:mm A'),
            );
            setRemainderModal(false);
            setRemainder(
              moment()
                .add(7, 'day')
                .hours(8)
                .minutes(0)
                .format('YYYY-MM-DD hh:mm'),
            );
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{padding: '5%', flexDirection: 'row'}}>
              <Icons
                style={Styles.icon}
                name={'clock-time-four-outline'}
                size={25}
                color={'black'}
              />
              <Text style={Styles.text}>Next {moment().format('dddd')}</Text>
            </View>
            <View>
              <Text style={Styles.text}>
                {moment().hours(8).minutes(0).format('hh:mm A')}
              </Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            setRemainderModal(false);
            setEditRemainderModal(true);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{padding: '5%', flexDirection: 'row'}}>
              <Icons
                style={Styles.icon}
                name={'clock-time-four-outline'}
                size={25}
                color={'black'}
              />
              <Text style={Styles.text}>Choose a date & time</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

export default RemainderModal;

const Styles = StyleSheet.create({
  modalView: {
    marginVertical: '117%',
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    elevation: 20,
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginLeft: '7%',
  },
});
