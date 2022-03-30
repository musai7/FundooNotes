import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const RemainderChip = ({remainder, setEditRemainderModal}) => {
  console.log('chip', remainder);
  return (
    <Pressable
      onPress={() => {
        setEditRemainderModal(true);
      }}>
      {remainder ? (
        <View style={Styles.container}>
          <Icon
            style={Styles.icon}
            name={'alarm-outline'}
            size={20}
            color={'black'}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 15,
            }}>
            {moment(remainder).calendar()}
          </Text>
          {remainder < moment().format('YYYY-MM-DD hh:mm') ? (
            <View
              style={{
                position: 'absolute',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                color: 'black',
                width: '95%',
                fontSize: 15,
              }}
            />
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
};

export default RemainderChip;

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    padding: '1%',
    marginBottom: '1%',
    fontSize: 15,
    color: 'black',
    borderRadius: 10,
    backgroundColor: '#d3d3d3',
    alignSelf: 'baseline',
    alignItems: 'center',
  },
  icon: {
    marginRight: '3%',
  },
});
