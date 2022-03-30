import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, Pressable, ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SingIn} from '../Services/Auth/Authantication';
import {AuthContext} from '../navigation/AuthContext';
import PushNotification from 'react-native-push-notification';

const Loginpage = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessege] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);

  const {setToken} = useContext(AuthContext);

  useEffect(() => {
    createChannels();
  });
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };
  const setTokenValue = uid => {
    setToken(uid);
  };

  const navigateToHomePage = () => {
    navigation.navigate('HomePage');
  };

  const OnpressHandler = () => {
    if (!(email || password)) {
      alert('Fill the empty fields');
    } else if (email == ' ' || password == ' ') {
      alert('Fill space the empty fields');
    } else if (errorMessage === '' && errorPassword === '') {
      SingIn(email, password, setTokenValue);
    } else alert('Email or password are not matched');
  };

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
    if (!password) {
      setErrorPassword('empty field');
    }
    if (!passwordPattern.test(password)) {
      setErrorPassword('invalid password');
    }
    if (passwordPattern.test(password)) {
      setErrorPassword('');
    }
  };

  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center', paddingTop: 45}}>
          <Text style={Styles.htext}>Fundoo</Text>
          <Text style={Styles.text}>Sign In</Text>
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
          <Text style={{color: 'red'}}>{errorMessage}</Text>
        </View>
        <View style={Styles.view}>
          <TextInput
            style={Styles.textInput}
            label="Password"
            value={password}
            mode="outlined"
            onChangeText={text => setText(text)}
            placeholder="Enter Password"
            secureTextEntry={passwordVisibility}
            onChangeText={text => setPassword(text)}
            onBlur={validatePasswordlOnBlur}
            right={
              <TextInput.Icon
                name={passwordVisibility ? 'eye-off-outline' : 'eye-outline'}
                onPress={() => {
                  setpasswordVisibility(!passwordVisibility);
                }}
              />
            }
          />
          <Text style={{color: 'red'}}>{errorPassword}</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('forgetPassword');
            }}>
            <Text style={Styles.forgetpassword}>Forget Password?</Text>
          </Pressable>
        </View>
        <View style={Styles.createAccount}>
          <Pressable
            onPress={() => {
              navigation.navigate('CreateAccount');
            }}>
            <Text style={{color: '#0000cd', fontSize: 20}}>Creact Account</Text>
          </Pressable>
          <Button
            mode="contained"
            onPress={OnpressHandler}
            contentStyle={{height: 45}}>
            Sign In
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4c4',
  },
  view: {
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
    color: 'blue',
    borderColor: 'blue',
    width: '75%',
  },
  forgetpassword: {
    color: 'blue',
    fontSize: 18,
    paddingTop: '5%',
    paddingBottom: 20,
    paddingStart: '16%',
  },
  createAccount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: '16%',
    paddingEnd: '17%',
  },
});

export {Loginpage};
