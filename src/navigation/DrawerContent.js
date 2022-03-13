import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import SignOut from '../screens/SignOut';
import DrawerLabelCards from '../screens/labels/DrawerLabelCards';
import LabelsFireBase from '../Services/data/LabelsFireBase';

const DrawerContents = ({props}) => {
  const navigation = useNavigation();
  const {handleSignOut} = SignOut();

  const {FetchLabelData, labelData} = LabelsFireBase();

  console.log('Drawer content', labelData);

  useEffect(() => {
    FetchLabelData();
    console.log('Drawer content use Effect', labelData);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text style={Styles.text}>FundooNotes</Text>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="home-outline" color={color} size={30} />
          )}
          label="Home"
          labelStyle={{fontSize: 15}}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="bell-outline" color={color} size={size} />
          )}
          label="Remainder"
          labelStyle={{fontSize: 15}}
          onPress={() => {
            navigation.navigate('Remainder');
          }}
        />
        <View style={Styles.labelView}>
          {labelData.length > 0 ? (
            <View style={Styles.labelHeader}>
              <Text style={Styles.labelText}>Labels</Text>
              <Text style={Styles.labelText}>Edits</Text>
            </View>
          ) : null}
          <FlatList
            data={labelData}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <DrawerLabelCards item={item} navigation={navigation} />
            )}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="plus" color={color} size={size} />
            )}
            label="Create New Label"
            labelStyle={{fontSize: 15}}
            onPress={() => {
              navigation.navigate('EditLabels');
            }}
          />
        </View>

        <DrawerItem
          icon={({color, size}) => (
            <Icon name="archive-arrow-down-outline" color={color} size={size} />
          )}
          label="Archieve"
          labelStyle={{fontSize: 15}}
          onPress={() => {
            navigation.navigate('Archieve');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="delete-outline" color={color} size={size} />
          )}
          label="Delete"
          labelStyle={{fontSize: 15}}
          onPress={() => {
            navigation.navigate('Delete');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="cog-outline" color={color} size={size} />
          )}
          label="Settings"
          labelStyle={{fontSize: 15}}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </DrawerContentScrollView>

      <Drawer.Section>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          labelStyle={{fontSize: 15}}
          onPress={handleSignOut}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContents;

const Styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: 'blue',
    textAlign: 'center',
    padding: 30,
  },
  labelText: {
    fontSize: 15,
    color: 'black',
  },
  labelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
  },
  labelView: {
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    borderTopColor: 'blue',
    borderTopWidth: 1,
  },
});
