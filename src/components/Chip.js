import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Chip = ({chipData}) => {
  let ChipArray = [];
  console.log(chipData);
  for (let index = 0; index < chipData.length; index++) {
    ChipArray.push(
      <View style={Styles.labelText} key={chipData[index].labelName}>
        <Text style={{color: 'black'}}>{chipData[index].labelName}</Text>
      </View>,
    );
  }
  // ChipArray = chipData?.length ?? (
  //   <View style={Styles.labelText} key={chipData.labelName}>
  //     <Text style={{color: 'black'}}>{chipData.labelName}</Text>
  //   </View>
  // );

  return ChipArray;
};

export default Chip;

const Styles = StyleSheet.create({
  labelText: {
    marginLeft: 10,
    padding: '1%',
    marginBottom: '2%',
    fontSize: 15,
    color: 'black',
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
    alignSelf: 'baseline',
  },
});
