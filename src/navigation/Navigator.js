import 'react-native-gesture-handler';

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Loginpage} from '../screens/Loginpage';
import HomeScreen from '../screens/HomeScreen';
import {ForgetPassword} from '../screens/ForgetPassword';
import {CreateAccount} from '../screens/CreateAccount';
import {AuthProvider} from './AuthContext';
import MyDrawer from './drawer/Drawer';
import NewListNote from '../screens/NewListNote';
import NewPhotoNote from '../screens/NewPhotoNote';
import NewAudioNote from '../screens/NewAudioNote';
import NewDrawingNote from '../screens/NewDrawingNote';
import NewNotes from '../screens/NewNotes';
const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <AuthProvider>
      {token => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: () => null,
            }}>
            {token ? (
              <>
                <Stack.Screen name="Drawer" component={MyDrawer} />
                <Stack.Screen name="NewListNote" component={NewListNote} />
                <Stack.Screen
                  name="NewDrawingNote"
                  component={NewDrawingNote}
                />
                <Stack.Screen name="NewAudioNote" component={NewAudioNote} />
                <Stack.Screen name="NewPhotoNote" component={NewPhotoNote} />
                <Stack.Screen name="NewNotes" component={NewNotes} />
              </>
            ) : (
              <>
                <Stack.Screen name="SignIn" component={Loginpage} />
                <Stack.Screen
                  name="forgetPassword"
                  component={ForgetPassword}
                />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthProvider>
  );
};

export default Navigator;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 30,
    color: 'orange',
    textAlign: 'center',
    paddingTop: 80,
    paddingBottom: 20,
  },
  navigator: {
    flex: 2,
    backgroundColor: 'white',
  },
});
