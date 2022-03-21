import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LabelsFireBase from '../../Services/data/LabelsFireBase';
import LabelsListCard from './labelsListCard';
import {useRoute} from '@react-navigation/native';

const LabelsList = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState();
  const [filterLabelData, setFilterLabelData] = useState([]);
  const [labelVisible, setLabelVisibile] = useState(false);
  const {storeLabelsData, FetchLabelData} = LabelsFireBase();
  const {labelData} = useSelector(state => state.userReducer);

  const lableId = useRoute().params.lablelIds;
  const [selectedLabels, setSelectedLabels] = useState(lableId ?? []);

  console.log('labelData', labelData);
  console.log('lableId list', lableId);

  useEffect(() => {
    FetchLabelData();
  }, []);

  const OnChangeTextHandler = text => {
    setValue(text);
    let filterLabel = labelData.filter(label =>
      label.labelName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilterLabelData(filterLabel);
  };

  console.log('selectedLabels', selectedLabels);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewNotes', {
              labelData: selectedLabels,
            });
          }}>
          <AntDesign name="arrowleft" size={25} color={'black'} />
        </TouchableOpacity>
        <TextInput
          style={Styles.textInput}
          value={value}
          placeholder="Enter Label Name"
          placeholderTextColor={'gray'}
          onPressIn={() => {
            // OnChangeTextHandler(value);
          }}
          onChangeText={text => {
            OnChangeTextHandler(text);
            setLabelVisibile(true);
          }}
          onBlur={() => {
            setLabelVisibile(false);
            setValue('');
          }}
        />
      </View>
      {labelVisible ? (
        filterLabelData.length > 0 ? (
          <FlatList
            data={filterLabelData}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <LabelsListCard item={item} isCheckBox={true} />
            )}
          />
        ) : (
          <TouchableOpacity
            style={{
              marginLeft: '15%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={async () => {
              await storeLabelsData(value);
              FetchLabelData();
              setLabelVisibile(false);
            }}>
            <Icon
              style={Styles.icon}
              name={'add-sharp'}
              size={25}
              color={'black'}
            />
            <Text style={{color: 'black', marginLeft: '2%'}}> Create</Text>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                marginLeft: '2%',
                fontWeight: 'bold',
              }}>
              "{value}"
            </Text>
          </TouchableOpacity>
        )
      ) : (
        <FlatList
          data={labelData}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <LabelsListCard
              item={item}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
              lableId={lableId}
            />
          )}
        />
      )}
    </View>
  );
};

export default LabelsList;

const Styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
});
