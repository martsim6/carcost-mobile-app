import React from 'react';
import { 
  TextInput, 
  Text, 
  View, 
  TouchableOpacity,
  Picker,
  AsyncStorage
} from 'react-native';
import styles from './styles/stylesAdd';
import moment from 'moment';
import { DistanceStore } from './context/DistanceStore';

export default function Add() {
  //new
  const [kilom, setKilom] = React.useState();
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

  const date = moment(new Date()).locale('sk').format("MMMM");

  React.useEffect(() => {
    checkAndSave();
  }, []);

  const checkAndSave = () => {
    AsyncStorage.getItem('saveData', (err, result) => {
      if(!result){
        // console.log(result);
        setKilom(0);
        alert("V záznamoch neboli nájdené žiadne hodnoty. Prosím, zadajte potrebné informácie");
      } else {
        setIsSet(true)
        var res = JSON.parse(result);
        setKilomLast(res.kilometers_new);
        setKilomPassed(parseInt(kmTraveled - kilomLast));
        // console.log(kilomPassed);
        var volume = parseFloat(refulPrice/priceLiter);
        // console.log(volume*100/kilomPassed)
        setConsum(parseFloat((volume*100)/kilomPassed).toFixed(2));
        // console.log(consumption)
        setSpentMoney(res.fulPrice + priceLiter)
        // ---------
        // if(date == res.date){
        //   setMoneyPerMonth()
        // }
        // ---------
        storeData('sendData', getDataOut());
        storeData('saveData', getDataHere());
      }
    });
  }
  function getDataOut(){
    var dataOut = {
      consumption: consumption,
      kmPassed: kilomPassed,
      fulPrice: refulPrice,
      // --- za mesiac
      //
      kmTraveled: kmTraveled,
      spentMoney: spentMoney,
    };
    var pureDataOut = JSON.stringify(dataOut);
    return(pureDataOut)
  }
  function getDataHere(){
    var data = {
      kilometers_new: kilom,
      fulPrice: refulPrice,
      literPrice: priceLiter,
      kilometers_start: kilomStart,
      kilometers_traveled: parseInt(kilom - kilomStart),
      date: date,
    };
    var pureData = JSON.stringify(data);
    return(pureData);
  }

  const storeData = async (key, data) => {
    try {
      // console.log(key, data)
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      alert(error);
    }
  }
  
  return(
    <DistanceStore.Consumer>{(context) => {
      return (
        <View>
          <View style={styles.content}>
            <Text style={styles.caption}>Tankovanie</Text>
            <Text style={styles.using}>Najazdené km:</Text>
            <TextInput
              style={styles.usingInput}
              defaultValue={`${kilom}`}
              onChangeText={text => {
                setKilom(text)
                if(!isSet) {
                  setKilomStart(text);
                  setKmTraveled(kilom - kilomStart);
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
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                alert('pridal som');
                console.log(getDataHere())
                storeData(`saveData`, getDataHere());
                checkAndSave(); 
                }
              }
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