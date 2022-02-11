import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Loginpage} from '../screens/Loginpage';
import HomeScreen from '../screens/HomeScreen';
import {ForgetPassword} from '../screens/ForgetPassword';
import {CreateAccount} from '../screens/CreateAccount';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="SignIn" component={Loginpage} />
        <Stack.Screen name="Login" component={HomeScreen} />
        <Stack.Screen name="forgetPassword" component={ForgetPassword} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
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
