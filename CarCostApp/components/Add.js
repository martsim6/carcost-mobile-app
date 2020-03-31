import React from 'react';
import { 
  TextInput, 
  Text, 
  View, 
  TouchableOpacity,
  Picker,
  AsyncStorage,
} from 'react-native';
import styles from './styles/stylesAdd';
import moment from 'moment';

export default function Add() {
  // state variables
  const [kilom, setKilom] = React.useState("");
  const [kilomStart, setKilomStart] = React.useState();
  const [refulPrice, setRefulPrice] = React.useState(0);
  const [priceLiter, setPriceLiter] = React.useState(1.);
  const [isSet, setIsSet] = React.useState({
    initial: false,
    showReful: false,
    showLiter: false,
    showButton: false,
  });

  const [kilomLast, setKilomLast] = React.useState(0);
  const [kilomPassed, setKilomPassed] = React.useState(0);
  const [kmTraveled, setKmTraveled] = React.useState(0);
  const [kmPerMonth, setKmPerMonth] = React.useState(0);

  const [spentMoney, setSpentMoney] = React.useState(0);
  const [moneyPerMonth, setMoneyPerMonth] = React.useState(0);
  const [consumption, setConsum] = React.useState(0);

  const date = moment(new Date()).format("MMMM");

  const [warning, setWarning] = React.useState({
    kilom: false,
    priceLiter: false,
  });
  // handle changes on page
  React.useEffect(() => {
    checkAndSet();
  }, [kilom, kilomPassed, refulPrice, priceLiter, consumption]);
  // Main function for calculating all values
  const checkAndSet = async () => {
    // try to get saved data, if pass, calculate and set values (some from past values = res, some from now given values)
    try{
      await AsyncStorage.getItem('saveData', (err, result) => {
        if(result){
          setIsSet({...isSet, initial: true});
          var res = JSON.parse(result);
          setKilomStart(res.kilometers_start);
          setKilomLast(res.kilometers_new);
          setKmTraveled(parseInt(kilom) - parseInt(kilomStart));
          setKilomPassed(parseInt(kmTraveled - res.kilometers_traveled));
          // calculate consumtion from last given reful price, price for litter and passed kilometers
          const volume = parseFloat(res.refulPrice/res.literPrice);
          setConsum(parseFloat((volume*100)/parseInt(kmTraveled - res.kilometers_traveled)).toFixed(2));
          setSpentMoney(parseInt(res.spentMoney) + parseInt(refulPrice));
          // check if month did not change, if yes, reset counting
          if(date === res.date){
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
  // data, which are send to Show (displaying data)
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
  // data, which are stored for calculating
  function getDataHere(){
    var data = {
      kilometers_new: kilom,
      literPrice: priceLiter,
      refulPrice: refulPrice,
      kilometers_start: kilomStart,
      kilometers_traveled: parseInt(kilom - kilomStart),
      spentMoney: spentMoney,
      kmPerMon: kmPerMonth,
      date: date,
    };
    var pureData = JSON.stringify(data);
    return(pureData);
  }
  // save data to "DB" = AsyncStorage
  const storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      alert(error);
    }
  }
  // save both data = here data and output data
  function saveAll() {
    storeData('sendData', getDataOut());
    storeData('saveData', getDataHere());
  }
  // check if given value is number or not
  const CheckValueIsNumberOrNot = (value) => {
    if (isNaN(value)) {
      alert('Wrong value!');
    } else {
      alert('It is a Number');
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.caption}>Tankovanie</Text>
        <Text style={styles.using}>Najazdené km:</Text>
        <TextInput
          style={warning["kilom"] ? styles.usingInputWarn : styles.usingInput}
          defaultValue={`${kilom}`}
          onChangeText={text => {
            if(isNaN(text)) {
              setWarning({kilom: true});
              alert("Zadaná hodnota je nesprávna! Prosím, zadajte iba číselné hodnoty");
            } else {
              setWarning({kilom: false});
              setKilom(text)
              if(!isSet.initial) {
                setKilomStart(text);
              }
              if(text.length > 0){
                setIsSet({
                  showReful: true,
                })
              }
            }
          }}
        />
        { isSet.showReful &&
          <View> 
            <Text style={styles.using}>Natankované za (cena):</Text>
            <Picker
              selectedValue={refulPrice}
              style={styles.usingDropdown}
              onValueChange={(itemValue) => {
                setRefulPrice(itemValue)
                if(itemValue !== 0) {
                  setIsSet({
                    showReful: true,
                    showLiter: true
                  })
                }
              }}
              >
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
          </View>
        }
        {isSet.showLiter &&
          <View>
            <Text style={styles.using}>Cena/liter:</Text>
            <TextInput
              style={warning["priceLiter"] ? styles.usingInputWarn : styles.usingInput}
              defaultValue='1.'
              onChangeText={text => {
                if(isNaN(text)) {
                  setWarning({priceLiter: true});
                  alert("Zadaná hodnota je nesprávna! Prosím, zadajte iba číselné hodnoty");
                } else {
                  if(text.length > 0){
                    setIsSet({
                      showReful: true,
                      showLiter: true,
                      showButton: true
                    })
                    setWarning({priceLiter: false});
                    setPriceLiter(text);
                  }
                }
              }}
            />
          </View>
        }
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            if(!isSet.showButton){
              alert("Záznam nie je možné pridať. Prosím, vyplňte všetky potrebné údaje!")
            } else if(!warning['kilom'] && !warning['priceLiter']){
              alert('Záznam bol pridaný');
              if(!isSet.initial) {
                storeData(`saveData`, getDataHere());
                checkAndSet();
              } else {
                saveAll();
              }
            } else {
              alert('Záznam nebolo možné pridať kvôli nesprávne zadaným hodnotám. Prosím, opravte hodnoty a skúste to znova.');
            }                
          }}
          style={isSet.showButton ? styles.confirmButton : styles.confirmButtonDenied}
          >
          <Text style={isSet.showButton ? styles.confirmButtonText : styles.confirmButtonTextDenied}> Pridať záznam </Text>
        </TouchableOpacity>
      </View>
    </View>
  );  
}