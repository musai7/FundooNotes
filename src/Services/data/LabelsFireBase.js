import {useContext, useState} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthContext';
import {fetchLabels} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';

const LabelsFireBase = () => {
  const {token} = useContext(AuthContext);
  const [labelData, setLabelData] = useState([]);
  const dispatch = useDispatch();

  const response = firebase.firestore().collection('LabelsNotes');

  const storeLabelsData = async labelName => {
    if (labelName !== '') {
      try {
        await response.doc(token).collection('labels').add({
          labelName: labelName,
        });
        console.log('data stored');
      } catch (error) {
        console.log('error....', error);
      }
    }
  };

  const FetchLabelData = async () => {
    let labelArray = [];
    let responce = await firestore()
      .collection('LabelsNotes')
      .doc(token)
      .collection('labels')
      .get();
    responce.forEach(doc => {
      const data = doc.data();
      data.key = doc.id;
      labelArray.push(data);
    });
    setLabelData(labelArray);
    dispatch(fetchLabels(labelArray));
    return labelArray;
  };

  const updateLabelData = async (key, labelName) => {
    console.log('updated data');
    if (labelName !== '') {
      try {
        await response.doc(token).collection('labels').doc(key).update({
          labelName: labelName,
        });
        console.log('updated data');
      } catch (error) {
        console.log('error....', error);
      }
    }
  };
  return {storeLabelsData, FetchLabelData, labelData, updateLabelData};
};

export default LabelsFireBase;
