import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LabelsFireBase from '../../Services/data/LabelsFireBase';
import {useDispatch} from 'react-redux';
import {fetchLabels} from '../../redux/actions';

const LabelCards = ({item, navigation}) => {
  const [value, setValue] = useState(item.labelName);
  const [iconVisibility, setIconVisiility] = useState(false);
  const {updateLabelData, FetchLabelData} = LabelsFireBase();

  // const dispatch = useDispatch();

  const OnPressHandler = () => {
    setIconVisiility(false);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1}}>
      {iconVisibility ? (
        <TouchableOpacity style={{marginLeft: '3%'}}>
          <Icons name={'delete-outline'} size={25} color={'black'} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{marginLeft: '3%'}}>
          <Icons name={'label-outline'} size={25} color={'black'} />
        </TouchableOpacity>
      )}

      <TextInput
        style={Styles.textInput}
        value={value}
        placeholder="Create New Label"
        placeholderTextColor={'gray'}
        onChangeText={text => {
          setValue(text);
        }}
        onBlur={() => {
          setIconVisiility(false);
          updateLabelData(item.key, value);
          // dispatch(fetchLabels());
          FetchLabelData();
        }}
        onPressIn={() => {
          setIconVisiility(true);
        }}
      />
      {iconVisibility ? (
        <TouchableOpacity
          onPress={() => {
            OnPressHandler();
          }}>
          <Icon
            style={Styles.icon}
            name={'checkmark-sharp'}
            size={25}
            color={'blue'}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Icon
            style={Styles.icon}
            name={'pencil-sharp'}
            size={25}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LabelCards;

const Styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    color: 'black',
    width: '75%',
    marginLeft: '3%',
    marginRight: '2%',
  },
  icon: {
    marginRight: '3%',
  },
});
