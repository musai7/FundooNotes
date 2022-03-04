import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import Remainder from '../screens/RemainderScreen';
import Settings from '../screens/SettingScreen';
import DrawerContents from '../navigation/DrawerContent';
import Archieve from '../screens/ArchiveScreen';

const Drawar = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawar.Navigator
      drawerContent={props => <DrawerContents {...props} />}
      screenOptions={{header: () => null}}>
      <Drawar.Screen name="HomeScreen" component={HomeScreen} />
      <Drawar.Screen name="Remainder" component={Remainder} />
      <Drawar.Screen name="Settings" component={Settings} />
      <Drawar.Screen name="Archieve" component={Archieve} />
    </Drawar.Navigator>
  );
};

export default MyDrawer;
