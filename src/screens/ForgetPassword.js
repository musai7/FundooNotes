import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {firebase} from '@react-native-firebase/auth';
const ForgetPassword = () => {
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessege] = React.useState('');

  const validateEmailOnBlur = () => {
    const emailPattern = new RegExp(
      '^[a-zA-Z0-9]+([-_+.]?[a-zA-Z0-9])*[@]([A-Za-z0-9])+[.][A-Za-z]{2,}([.][A-Za-z]{2,}){0,1}$',
    );
    if (!email) {
      setErrorMessege('empty Field');
    }
    if (!emailPattern.test(email)) {
      setErrorMessege('invalid Email');
    }
    if (emailPattern.test(email)) {
      setErrorMessege('');
    }
  };

  const passwordReset = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert('Please check your email...');
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <ScrollView style={Styles.scrollView}>
      <View style={{alignItems: 'center', paddingTop: 45}}>
        <Text style={Styles.htext}>Fundoo</Text>
        <Text style={Styles.text}>Recover Your Account</Text>
      </View>
      <View style={Styles.view}>
        <TextInput
          style={Styles.textInput}
          label="Email"
          value={email}
          mode="outlined"
          placeholder="Enter Email"
          onChangeText={text => setEmail(text)}
          onBlur={validateEmailOnBlur}
        />
      </View>
      <View style={Styles.button}>
        <Button
          mode="contained"
          style={{color: 'green'}}
          onPress={passwordReset}>
          send request
        </Button>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#ffe4c4',
  },
  view: {
    flex: 2,
    padding: '5%',
    alignItems: 'center',
  },
  htext: {
    fontSize: 30,
    color: '#dc143c',
  },
  text: {
    fontSize: 28,
    color: 'green',
    paddingTop: 15,
  },
  textInput: {
    fontSize: 15,
    color: 'black',
    borderColor: 'blue',
    height: 40,
    width: '75%',
    borderRadius: 7,
  },
  button: {
    flex: 2,
    alignItems: 'center',
  },
});
export {ForgetPassword};
