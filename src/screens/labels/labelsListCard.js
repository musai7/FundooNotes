import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const LabelsListCard = ({item, selectedLabels, setSelectedLabels}) => {
  const [checkBox, setCheckBox] = useState(
    selectedLabels?.includes(item.key) ? true : false,
  );

  console.log('selectedLabels', selectedLabels);

  const onPressHandler = item => {
    if (selectedLabels.includes(item.key)) {
      const newselectedLabels = selectedLabels.filter(key => key !== item.key);
      setSelectedLabels(newselectedLabels);
    } else setSelectedLabels([...selectedLabels, item.key]);
  };
  console.log('selectedLabels', selectedLabels);
  return (
    <View
      style={{
        marginLeft: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2%',
        justifyContent: 'space-between',
        marginRight: '5%',
      }}>
      <TouchableOpacity
        onPress={() => {
          setCheckBox(!checkBox);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: '5%',
        }}>
        <Icons name={'label-outline'} size={25} color={'black'} />
        <Text style={{fontSize: 17, color: 'black', marginLeft: '15%'}}>
          {item.labelName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCheckBox(!checkBox);
          onPressHandler(item);
        }}>
        <Icons
          name={checkBox ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={25}
          color={'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LabelsListCard;
