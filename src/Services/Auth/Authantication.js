import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = async (userName, email, password, callBack) => {
  const ref = firebase.firestore().collection('UserInformation');

  try {
    let response = await auth().createUserWithEmailAndPassword(email, password);
    if (response) {
      console.log('success');
      await ref.doc(response.user.uid).set({
        userName: userName,
        email: email,
      });
      alert('Account Created');
      callBack();
    }
  } catch (e) {
    console.log(e);
    alert('email address is already in use');
  }
};

const SingIn = async (email, password, callBack) => {
  try {
    let response = await auth().signInWithEmailAndPassword(email, password);
    if (response) {
      Alert.alert('Success', 'successfully logedIn');
      await AsyncStorage.setItem('key', response.user.uid);
      callBack(response.user.uid);
    }
  } catch (e) {
    console.error(e.message);
  }
};

export {SignUp, SingIn};
