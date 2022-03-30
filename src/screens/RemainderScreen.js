import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import BottomBar from '../components/BottomBar';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Remainder = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: '8%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: '2.5%',
            }}>
            <TouchableOpacity
              style={{marginRight: 10}}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Icon name="menu" color={'black'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={Styles.text}>Archieve</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: '2.5%',
            }}>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="search" color={'black'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="ios-grid-outline" color={'black'} size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={Styles.ArchieveView}>
          <Icons
            style={Styles.icon}
            name={'bell-outline'}
            size={70}
            color={'black'}
          />
          <Text style={Styles.text}>Remainder Notes will </Text>
          <Text style={Styles.text}>Appear Here </Text>
        </View>
      </View>

      <View>
        <BottomBar />
      </View>
    </View>
  );
};

export default Remainder;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  ArchieveView: {
    alignSelf: 'center',
    marginTop: '70%',
    alignItems: 'center',
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
  view: {
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '2%',
    padding: '2%',
    borderWidth: 1,
    borderRadius: 10,
  },
});
