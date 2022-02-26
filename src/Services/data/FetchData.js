import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthContext';

const FetchDataBAse = () => {
  const [data, setData] = useState({});
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const {token} = useContext(AuthContext);

  const FetchData = async () => {
    const response = firebase.firestore().collection('UserInformation');
    try {
      const info = await response.doc(token).get();
      console.log('info', info);
      console.log('information ', info._data.userName);
      console.log('Type', typeof info);
      // info.forEach(item => {
      //   console.log('item', item);
      //   setData(...data);
      //   console.log('infoData', data);
      // });
      setData(info);
      setUserName(info._data.userName);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    FetchData();
    console.log('fetchData', data.userName);
  }, []);

  console.log('data', data);
  console.log(data._data);
  return (
    <View>
      <Text style={{color: 'red'}}>{userName} ASCFF</Text>
    </View>
  );
};

export default FetchDataBAse;
