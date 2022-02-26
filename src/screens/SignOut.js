import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOut = () => {
  const {setToken} = useContext(AuthContext);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('key');
    setToken(null);
  };

  return {handleSignOut};
};

export default SignOut;
