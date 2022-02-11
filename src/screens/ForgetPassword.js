import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
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
      setCheck(check + 1);
    }
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
});
export {ForgetPassword};
