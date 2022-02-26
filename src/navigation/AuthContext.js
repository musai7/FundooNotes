import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});
const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);

  const getKey = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      setToken(value);
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getKey();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}>
      {children(token)}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
