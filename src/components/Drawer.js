import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import Remainder from '../screens/RemainderScreen';
import Settings from '../screens/SettingScreen';
import DrawerContent from './DrawerContent';
import Archieve from '../screens/ArchiveScreen';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{header: () => null}}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Remainder" component={Remainder} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Archieve" component={Archieve} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
