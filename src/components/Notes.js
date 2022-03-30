import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Chip from './Chip';
import RemainderChip from '../components/RemainderChip';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

const Notes = ({item, headerState}) => {
  const navigation = useNavigation();
  const [isUpDate, setIsUpdate] = useState(true);
  const {labelData} = useSelector(state => state.userReducer);
  const [remainder, setRemainder] = useState(item?.remainder || null);

  // useEffect(() => {
  //   if (remainder != null) {
  //     // if (remainder > moment().format('YYYY-MM-DD hh:mm')) {
  //     handleNotification();
  //     console.log('noti');
  //     // }
  //   }
  // }, []);

  let chipData = labelData.filter(labels => {
    for (let index = 0; index < item?.labelData?.length; index++) {
      if (labels.key === item.labelData[index]) {
        return true;
      }
    }
  });

  // const handleNotification = () => {
  //   PushNotification.localNotificationSchedule({
  //     channelId: 'test-channel',
  //     // title: item.title,
  //     // message: item.note || 'empty notes',
  //     // id: item.key,
  //     title: 'remainder',
  //     message: 'hello',

  //     date: new Date(remainder),
  //   });
  // };

  const onPressUpdate = () => {
    // handleNotification();
    if (headerState.header) {
      navigation.navigate('NewNotes', {...item, isUpDate: isUpDate});
    }
  };

  const OnHandleLongPress = () => {
    cardsArray.push(item.key);
    headerState.setHeader(false);
    headerState.setCardData(cardsArray);
  };
  return item ? (
    <TouchableOpacity
      style={[Styles.view, headerState?.grid ? {width: '48%'} : null]}
      onPress={onPressUpdate}>
      {item.title ? <Text style={Styles.titleText}>{item?.title}</Text> : null}
      {item.note ? <Text style={Styles.notesText}>{item?.note}</Text> : null}
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <RemainderChip remainder={item?.remainder} />
        <Chip chipData={chipData} />
      </View>
    </TouchableOpacity>
  ) : null;
};
export default Notes;

const Styles = StyleSheet.create({
  view: {
    marginLeft: '1%',
    marginRight: '1%',
    // marginTop: '%',
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 0.8,
    borderRadius: 10,
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
});
