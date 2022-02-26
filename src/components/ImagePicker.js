import {useContext, useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../navigation/AuthContext';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState({});
  const [userdata, setUserData] = useState({});
  const [userName, setUSerName] = useState('');
  const [email, setEmail] = useState('');

  const {token} = useContext(AuthContext);

  console.log(token);

  const ref = firebase.firestore().collection('UserInformation');

  const FetchData = async () => {
    const response = firebase.firestore().collection('UserInformation');
    try {
      const userInfo = await response.doc(token).get();
      setUserData(userInfo);
      setUSerName(userInfo._data.userName);
      setEmail(userInfo._data.email);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  const openGalary = async () => {
    const uid = await AsyncStorage.getItem('key');

    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    const response = await launchImageLibrary(options);
    if (response.assets) {
      const source = {
        uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
      };
      setImageUri(source);
      // console.log('Source', source)
    }
    // FetchData();
  };
  const openCamera = async () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    const response = await launchCamera(options);
    // console.log(response);
    if (response) {
      const source = {
        uri: 'data : image/jpeg;base64,' + response.assets[0].base64,
      };
      setImageUri(source);
    }
  };
  return {openCamera, openGalary, imageUri, userdata, userName, email};
};

export default useImagePicker;
