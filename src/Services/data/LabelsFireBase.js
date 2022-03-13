import {useContext, useState} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthContext';

const LabelsFireBase = () => {
  const {token} = useContext(AuthContext);
  const [labelData, setLabelData] = useState([]);

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
    await firestore()
      .collection('LabelsNotes')
      .doc(token)
      .collection('labels')
      .get()
      .then(labels => {
        console.log('labels', labels);
        labels.forEach(label => {
          console.log('label......', label);

          const data = label.data();
          data.key = label.id;
          labelArray.push(data);
        });
      });
    setLabelData(labelArray);
    console.log('label Array', labelArray);
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
