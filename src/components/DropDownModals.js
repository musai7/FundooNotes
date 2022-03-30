import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DropDownModal = ({
  isDate,
  setIsDate,
  isTime,
  setIsTime,
  setSelectedDate,
  setSelectedTime,
  selectedDate,
  selectedTime,
  setAlarm,
  setRemainder,
  setDate,
  setTime,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisibile] = useState(false);

  const showTimePicker = () => {
    setIsTimePickerVisibile(true);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisibile(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    setSelectedTime(moment(time).format('hh:mm A'));
    console.log('time->', time);
    setRemainder(moment(time).format('YYYY-MM-DD hh:mm'));
    let dates = JSON.stringify(time);
    let dateTime = dates.substring(11, dates.length - 1);
    console.log('dateTime->', dateTime);
    setTime(dateTime);

    hideTimePicker();
    setIsTime(false);
  };

  const handleConfirmDate = date => {
    setSelectedDate(moment(date).format('MMM DD'));
    setRemainder(moment(date).format('YYYY-MM-DD hh:mm'));
    let dates = JSON.stringify(date);
    let dateTime = dates.substring(1, 11);
    setDate(dateTime);
    console.log('date->', date);
    console.log('datePic->', dateTime);
    hideDatePicker();
    setIsDate(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        animationType="fade"
        onDismiss={() => {
          setIsDate(false);
        }}
        visible={isDate}
        onRequestClose={() => setIsDate(false)}>
        <View style={Styles.modalDateView}>
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(moment().format('MMM DD'));
              setRemainder(moment().format('YYYY-MM-DD hh:mm'));
              setIsDate(false);
            }}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Today</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(moment().add(1, 'day').format('MMM DD'));
              setRemainder(moment().add(1, 'day').format('YYYY-MM-DD hh:mm'));

              setIsDate(false);
            }}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Tomorrow</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(moment().add(7, 'day').format('MMM DD'));
              setRemainder(moment().add(7, 'day').format('YYYY-MM-DD hh:mm'));
              setIsDate(false);
            }}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Next {moment().format('dddd')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={showDatePicker}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Select a Date</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        onDismiss={() => {
          setIsTime(false);
        }}
        visible={isTime}
        onRequestClose={() => setIsTime(false)}>
        <View style={Styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(moment().hours(8).minutes(0).format('hh:mm A'));
              setRemainder(
                moment().hours(8).minutes(0).format('YYYY-MM-DD hh:mm'),
              );
              setIsTime(false);
            }}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Morning</Text>
              <Text style={Styles.text}>08:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(moment().hours(13).minutes(0).format('hh:mm A'));

              setRemainder(
                moment().hours(13).minutes(0).format('YYYY-MM-DD hh:mm'),
              );
              setIsTime(false);
            }}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Afternoon</Text>
              <Text style={Styles.text}>13:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(moment().hours(18).minutes(0).format('hh:mm A'));
              setRemainder(
                moment().hours(18).minutes(0).format('YYYY-MM-DD hh:mm'),
              );
              setIsTime(false);
            }}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Evening</Text>
              <Text style={Styles.text}>18:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTime(moment().hours(20).minutes(0).format('hh:mm A'));
              setRemainder(
                moment().hours(20).minutes(0).format('YYYY-MM-DD hh:mm'),
              );
              setIsTime(false);
            }}>
            <View style={Styles.view}>
              <Text style={Styles.text}>Night</Text>
              <Text style={Styles.text}>20:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimePicker}>
            <View>
              <Text style={Styles.text}>SelectTime</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        is24Hour={false}
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date()}
        is24Hour={false}
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DropDownModal;
const Styles = StyleSheet.create({
  modalView: {
    marginVertical: '99%',
    backgroundColor: 'white',
    width: '40%',
    height: '25%',
    marginLeft: '12%',
    elevation: 20,
  },
  modalDateView: {
    marginVertical: '88%',
    backgroundColor: 'white',
    width: '40%',
    height: '25%',
    marginLeft: '12%',
    elevation: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '4%',
    margin: '4%',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
});
