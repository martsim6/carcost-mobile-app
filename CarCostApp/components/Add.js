import React from 'react';
import { 
  TextInput, 
  Text, 
  View, 
  TouchableOpacity,
  Picker,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import styles from './styles/stylesAdd';
import moment from 'moment';
import { DistanceStore } from './context/DistanceStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view-fix';

export default function Add() {
  //new
  const [kilom, setKilom] = React.useState("");
  const [kilomStart, setKilomStart] = React.useState();
  const [refulPrice, setRefulPrice] = React.useState(0);
  const [priceLiter, setPriceLiter] = React.useState(1.);
  const [isSet, setIsSet] = React.useState(false);
  //old
  const [kilomLast, setKilomLast] = React.useState(0);
  const [kilomPassed, setKilomPassed] = React.useState(0);
  const [kmTraveled, setKmTraveled] = React.useState(0);
  const [kmPerMonth, setKmPerMonth] = React.useState(0);

  const [spentMoney, setSpentMoney] = React.useState(0);
  const [moneyPerMonth, setMoneyPerMonth] = React.useState(0);
  const [consumption, setConsum] = React.useState(0);

  const [loading, setLoading] = React.useState(true);

  const date = moment(new Date()).format("MMMM");

  React.useEffect(() => {
    checkAndSet();
  }, [kilomPassed, refulPrice, priceLiter, consumption]);

  const checkAndSet = async () => {
    try{
      await AsyncStorage.getItem('saveData', (err, result) => {
        if(!result){
          setKilom(0);
        } else {
          setIsSet(true);
          var res = JSON.parse(result);
          setKilomStart(res.kilometers_start);
          setKilomLast(res.kilometers_new);
          setKmTraveled(parseInt(kilom) - parseInt(kilomStart));
          setKilomPassed(parseInt(kmTraveled - res.kilometers_traveled));

          const volume = parseFloat(refulPrice/priceLiter);
          setConsum(parseFloat((volume*100)/parseInt(kmTraveled - res.kilometers_traveled)).toFixed(2));
          setSpentMoney(parseInt(res.spentMoney) + parseInt(refulPrice));

          if(date == res.date){
            setMoneyPerMonth(parseInt(res.spentMoney) + parseInt(refulPrice));
            setKmPerMonth(parseInt(res.kmPerMon) + parseInt(kmTraveled - res.kilometers_traveled));
          } else {
            setMoneyPerMonth(parseInt(refulPrice));
            setKmPerMonth(parseInt(kmTraveled - res.kilometers_traveled));
          }
        }
      });
    } catch(err) {
      console.log(err);
    }
  }
  function getDataOut(){
    var dataOut = {
      consumption: consumption,
      kmPassed: kilomPassed,
      fulPrice: refulPrice,
      monPerMon: moneyPerMonth,
      kmPerMon: kmPerMonth,
      kmTraveled: kmTraveled,
      spentMoney: spentMoney,
    };
    var pureDataOut = JSON.stringify(dataOut);
    return(pureDataOut)
  }
  function getDataHere(){
    var data = {
      kilometers_new: kilom,
      literPrice: priceLiter,
      kilometers_start: kilomStart,
      kilometers_traveled: parseInt(kilom - kilomStart),
      spentMoney: spentMoney,
      kmPerMon: kmPerMonth,
      date: date,
    };
    var pureData = JSON.stringify(data);
    return(pureData);
  }
  const storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      alert(error);
    }
  }
  function saveAll() {
    storeData('sendData', getDataOut());
    storeData('saveData', getDataHere());
  }

  return(
    <DistanceStore.Consumer>{(context) => {
      return (
        <View>
          <View style={styles.content}>
            <Text style={styles.caption}>Tankovanie</Text>
            <Text style={styles.using}>Najazdené km:</Text>
            <KeyboardAwareScrollView
              contentContainerStyle={{ flexGlow: 1 }}
              scrollEnabled={true}
              enableOnAndroid={true}
              extraHeight={100}
              extraScrollHeight={100}
            >
              <TextInput
                style={styles.usingInput}
                defaultValue={`${kilom}`}
                onChangeText={text => {
                  setKilom(text)
                  if(!isSet) {
                    setKilomStart(text);
                    }
                  }
                }
              />
              { isSet &&
                <View>
                  <Text style={styles.using}>Natankované za (cena):</Text>
                  <Picker
                    selectedValue={refulPrice}
                    style={styles.usingDropdown}
                    onValueChange={(itemValue, itemIndex) =>
                      {setRefulPrice(itemValue)}
                    }>
                    <Picker.Item label="0€" value='0' />
                    <Picker.Item label="5€" value='5' />
                    <Picker.Item label="10€" value="10" />
                    <Picker.Item label="15€" value="15" />
                    <Picker.Item label="20€" value="20" />
                    <Picker.Item label="25€" value="25" />
                    <Picker.Item label="30€" value="30" />
                    <Picker.Item label="35€" value="35" />
                    <Picker.Item label="40€" value="40" />
                    <Picker.Item label="45€" value="45" />
                    <Picker.Item label="50€" value="50" />
                    <Picker.Item label="55€" value="55" />
                    <Picker.Item label="60€" value="60" />
                  </Picker>
                  <Text style={styles.using}>Cena/liter:</Text>
                  <TextInput
                    style={styles.usingInput}
                    defaultValue='1.'
                    onChangeText={text => setPriceLiter(text)}
                  />
                </View>
              }
            </KeyboardAwareScrollView>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                alert('Záznam bol pridaný');
                if(!isSet) {
                  storeData(`saveData`, getDataHere());
                  checkAndSet();
                } else {
                  saveAll();
                }
              }}
              style={styles.confirmButton}
              >
              <Text style={styles.confirmButtonText}> Pridať záznam </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }}</DistanceStore.Consumer>
  );  
}