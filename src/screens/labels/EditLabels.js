import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import LabelCards from './LabelCard';
import LabelsFireBase from '../../Services/data/LabelsFireBase';
import {useSelector} from 'react-redux';

const EditLabels = () => {
  const navigation = useNavigation();
  const [labelName, setLabelName] = useState('');
  const [iconVisibility, setIconVisibility] = useState(false);
  const {storeLabelsData, FetchLabelData} = LabelsFireBase();

  const {labelData} = useSelector(state => state.userReducer);

  const OnPressHandler = () => {
    storeLabelsData(labelName);
    FetchLabelData();
    setLabelName('');
  };

  useEffect(() => {
    FetchLabelData();
  }, []);

  return (
    <View>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={Styles.headerText}>EditLabels</Text>
      </View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', borderWidth: 1}}>
        <TouchableOpacity style={{marginLeft: '3%'}}>
          <Icon
            name={iconVisibility ? 'close' : 'add-sharp'}
            size={25}
            color={'black'}
          />
        </TouchableOpacity>

        <TextInput
          style={Styles.textInput}
          value={labelName}
          placeholder="Create New Label"
          placeholderTextColor={'gray'}
          onChangeText={text => {
            setLabelName(text);
          }}
          onBlur={() => {
            setIconVisibility(false);
          }}
          onPressIn={() => {
            setIconVisibility(true);
          }}
        />
        <TouchableOpacity onPress={OnPressHandler}>
          <Icon
            style={Styles.icon}
            name={iconVisibility ? 'checkmark-sharp' : null}
            size={25}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={labelData}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <LabelCards item={item} navigation={navigation} />
        )}
      />

      {/* <LabelCards /> */}
    </View>
  );
};

export default EditLabels;

const Styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    marginLeft: '2%',
  },
  textInput: {
    fontSize: 18,
    color: 'black',
    width: '75%',
    marginLeft: '3%',
    marginRight: '2%',
  },
  icon: {
    marginRight: '3%',
  },
});
