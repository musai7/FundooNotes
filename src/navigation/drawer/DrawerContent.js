import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Drawer, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import SignOut from '../../screens/SignOut';

const DrawerContent = props => {
  const navigation = useNavigation();
  const {handleSignOut} = SignOut();
  // console.log(props);
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
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="plus" color={color} size={size} />
          )}
          label="Create New Label"
          labelStyle={{fontSize: 15}}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        />
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
          onPress={() => {}}
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

export default DrawerContent;

const Styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: 'blue',
    textAlign: 'center',
    padding: 30,
  },
});
