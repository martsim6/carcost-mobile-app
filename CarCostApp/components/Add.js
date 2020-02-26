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
import { DistanceStore } from './context/DistanceStore';

export default function Add() {
  const [kilom, setKilom] = React.useState();
  const [kilomStart, setKilomStart] = React.useState();
  const [refulPrice, setRefulPrice] = React.useState(0);
  const [priceLiter, setPriceLiter] = React.useState(1.);
  const [isSet, setIsSet] = React.useState(false);

  React.useEffect(() => {
    checkValue();
  }, []);

  const _storeData = async (key, data) => {
    try {
      console.log(key, data)
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      alert(error);
    }
  }
  const checkValue = () => {
    try {
      AsyncStorage.getItem('lacko', (err, result) => {
        var res = JSON.parse(result)
        if (res) {
          setIsSet(true);
          console.log(`toto je res Add: ${JSON.stringify(res)}`)
          setKilom(res.kilometers_new);
          setKilomStart(res.kilometers_start);
        } else {
          setIsSet(false);
          setKilom(0)
          alert("V záznamoch neboli nájdené žiadne hodnoty. Prosím, zadajte potrebné informácie");
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  function getData(){
    var data = {
      kilometers_new: kilom,
      fulPrice: refulPrice,
      literPrice: priceLiter,
      kilometers_start: kilomStart,
    };
    var pureData = JSON.stringify(data);
    return(pureData);
  }
  return(
    <DistanceStore.Consumer>{(context) => {
      console.log(kilom);
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
                  setKilomStart(text)
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
                _storeData(`lacko`, getData());
                alert('pridal som');
                checkValue();
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