import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Notes = ({item, headerState, lableItem}) => {
  const navigation = useNavigation();
  const [isUpDate, setIsUpdate] = useState(true);
  const [pin, setPin] = useState(false);

  console.log('item', item);

  let cardsArray = [];

  const onPressUpdate = () => {
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
    <View style={[Styles.view, headerState?.grid ? {width: '40%'} : null]}>
      <TouchableOpacity onPress={onPressUpdate} onLongPress={OnHandleLongPress}>
        <Text style={Styles.titleText}> {item?.title}</Text>
        <Text style={Styles.notesText}>{item?.note}</Text>
        {lableItem?.labelName ? (
          <View>
            <Text style={{color: 'black'}}>{lableItem?.labelName || ''}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  ) : null;
};
export default Notes;

const Styles = StyleSheet.create({
  view: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 2,
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
