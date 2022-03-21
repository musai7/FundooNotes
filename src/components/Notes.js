import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Chip from './Chip';

const Notes = ({item, headerState}) => {
  const navigation = useNavigation();
  const [isUpDate, setIsUpdate] = useState(true);
  const {labelData} = useSelector(state => state.userReducer);

  let chipData = labelData.filter(labels => {
    for (let index = 0; index < item?.labelData?.length; index++) {
      if (labels.key === item.labelData[index]) {
        return true;
      }
    }
  });

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
    <TouchableOpacity
      style={[Styles.view, headerState?.grid ? {width: '40%'} : null]}
      onPress={onPressUpdate}>
      {item.title ? <Text style={Styles.titleText}>{item?.title}</Text> : null}
      {item.note ? <Text style={Styles.notesText}>{item?.note}</Text> : null}
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Chip chipData={chipData} />
      </View>
    </TouchableOpacity>
  ) : null;
};
export default Notes;

const Styles = StyleSheet.create({
  view: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 1,
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
