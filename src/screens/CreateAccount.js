import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const CreateAccount = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [confimpasswordVisibility, setConfimpasswordVisibility] =
    useState(true);

  const [email, setEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [errorMessage, setErrorMessege] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorUserName, setErrorUserName] = useState('');
  const [errorConPassword, seterrorConPassword] = useState('');

  const validateEmailOnBlur = () => {
    const emailPattern = new RegExp(
      '^[a-zA-Z0-9]+([-_+.]?[a-zA-Z0-9])*[@]([A-Za-z0-9])+[.][A-Za-z]{2,}([.][A-Za-z]{2,}){0,1}$',
    );
    if (email === null) {
      setErrorMessege('empty Field');
    } else if (!emailPattern.test(email)) {
      setErrorMessege('invalid Email');
    }
    if (emailPattern.test(email)) {
      setErrorMessege('');
    }
  };

  const validatePasswordlOnBlur = () => {
    const passwordPattern = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    let count = 0;
    if (!password) {
      setErrorPassword('empty field');
    }
    if (!passwordPattern.test(password)) {
      setErrorPassword('invalid password');
    }
    if (passwordPattern.test(password)) {
      setErrorPassword('');
      count++;
    }
  };

  const validateUserNameOnBlur = () => {
    const userNamePattern = new RegExp('^[a-z]{3,}$');
    if (!userName) {
      setErrorUserName('empty field');
    }
    if (!userNamePattern.test(userName)) {
      setErrorUserName('invalid user name');
    }
    if (userNamePattern.test(userName)) {
      setErrorUserName('');
    }
  };
  const validateConfimPasswordlOnBlur = () => {
    if (!confirmPassword) {
      seterrorConPassword('empty Filed');
    }
    if (!(confirmPassword === password)) {
      seterrorConPassword('password is not matched');
    }
    if (confirmPassword === password) {
      seterrorConPassword('');
    }
  };

  // const CreateUser = async (email, password) => {
  //   try {
  //     let response = await auth().createUserWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     if (response) {
  //       console.log('success');
  //     }
  //   } catch (e) {
  //     console.error(e.message);
  //   }
  // };

  return (
    <ScrollView style={Styles.container}>
      <View style={{}}>
        <View style={{flex: 1, alignItems: 'center', paddingTop: 45}}>
          <Text style={Styles.htext}>Fundoo</Text>
          <Text style={Styles.text}>Create Your Fundoo Account</Text>
        </View>
        <View style={Styles.view}>
          <TextInput
            style={Styles.textInput}
            label="User Name"
            value={userName}
            mode="outlined"
            placeholder="Enter User Name"
            onChangeText={userName => setUserName(userName)}
            onBlur={validateUserNameOnBlur}
          />
          <Text style={{color: 'red'}}>{errorUserName}</Text>

          <TextInput
            style={Styles.textInput}
            label="Email"
            value={email}
            mode="outlined"
            placeholder="Enter Email"
            onChangeText={text => setEmail(text)}
            onBlur={validateEmailOnBlur}
          />
          <Text style={{color: 'red'}}>{errorMessage}</Text>
          <TextInput
            style={Styles.textInput}
            label="Password"
            value={password}
            mode="outlined"
            placeholder="Enter Password"
            secureTextEntry={passwordVisibility}
            right={
              <TextInput.Icon
                name={passwordVisibility ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => {
                  setpasswordVisibility(!passwordVisibility);
                }}
              />
            }
            onChangeText={password => setPassword(password)}
            onBlur={validatePasswordlOnBlur}
          />
          <Text style={{color: 'red'}}>{errorPassword}</Text>

          <TextInput
            style={Styles.textInput}
            label="Confirm Password"
            value={confirmPassword}
            mode="outlined"
            placeholder="Enter Confirm Password"
            secureTextEntry={confimpasswordVisibility}
            onChangeText={text => setConfirmPassword(text)}
            onBlur={validateConfimPasswordlOnBlur}
            right={
              <TextInput.Icon
                name={
                  confimpasswordVisibility ? 'eye-off-outline' : 'eye-outline'
                }
                onPress={() => {
                  setConfimpasswordVisibility(!confimpasswordVisibility);
                }}
              />
            }
          />
          <Text style={{color: 'red'}}>{errorConPassword}</Text>
        </View>
        <View style={Styles.viewButton}>
          <Button
            mode="contained"
            style={{color: 'green'}}
            onPress={() => {
              if (!(email || userName || password || confirmPassword)) {
                alert('Fill the empty fields');
              } else if (
                errorMessage === '' &&
                errorUserName === '' &&
                errorPassword === '' &&
                errorConPassword === ''
              ) {
                signUp(email, password);
                navigation.replace('SignIn');
              } else alert('enter with valid details');
            }}>
            Sign Up
          </Button>
        </View>
        <View style={Styles.view}>
          <Pressable
            onPress={() => {
              if (true) {
                navigation.replace('SignIn');
              }
            }}>
            <Text
              style={{
                color: 'blue',
                fontSize: 18,
              }}>
              Go Back To Loginpage !
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4c4',
  },
  view: {
    flex: 2,
    padding: 20,
    alignItems: 'center',
  },
  viewButton: {
    flex: 2,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 15,
    color: 'black',
    borderColor: 'blue',
    height: 40,
    width: '75%',
    borderRadius: 7,
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
});
export {CreateAccount};
