import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BottomBar = ({lableItem}) => {
  const navigation = useNavigation();
  const [isUpDate, setIsUpdate] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row-reverse',
          paddingHorizontal: 20,
          paddingTop: 10,
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.navigate('NewNotes', {labelData: lableItem});
          }}>
          <FontAwesome
            isUpDate={isUpDate}
            name="plus"
            color={'rgba(0, 0, 0, 0.8) '}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: '3%',
          paddingBottom: '8%',
          backgroundColor: 'gray',
        }}>
        <TouchableOpacity
          style={{paddingLeft: '5%'}}
          onPress={() => {
            navigation.navigate('NewListNote');
          }}>
          <FontAwesome name="check-square-o" color={'white'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingLeft: '5%'}}
          onPress={() => {
            navigation.navigate('NewDrawingNote');
          }}>
          <FontAwesome name="pencil" color={'white'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingLeft: '5%'}}
          onPress={() => {
            navigation.navigate('NewAudioNote');
          }}>
          <FontAwesome name="microphone" color={'white'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingLeft: '5%'}}
          onPress={() => {
            navigation.navigate('NewPhotoNote');
          }}>
          <FontAwesome name="image" color={'white'} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BottomBar;

const Styles = StyleSheet;
