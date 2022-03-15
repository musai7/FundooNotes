export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const FETCH_LABELS = 'FETCH_LABELS';
import firestore, {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchLabels = labelArray => dispatch => {
  dispatch({
    type: FETCH_LABELS,
    payload: labelArray,
  });
};

// export const setAge = age => dispatch => {
//   dispatch({
//     type: SET_USER_AGE,
//     payload: age,
//   });
// };
