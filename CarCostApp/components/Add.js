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

export default function Add() {
  const [kilom, setKilom] = React.useState(100000);
  const [refulPrice, setRefulPrice] = React.useState(0);
  const [priceLiter, setPriceLiter] = React.useState(1.);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    _displayData('id');
  }, []);

  const _storeData = async (key, data) => {
    try {
      console.log(key, data)
      await AsyncStorage.setItem(key, data);
      alert('pridal som ')
    } catch (error) {
      alert(error);
    }
  }

  const _displayData = async (key) => {
    try {
      const value = AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        var new_id = res + 1;
        setCounter(new_id);
      });
    } catch (error) {
      alert(error);
    }
  }
  function getData(){
    var data = {
      kilometers: kilom,
      fulPrice: refulPrice,
      literPrice: priceLiter,
      saving_id: counter,
    };
    var count = counter + 1;
    setCounter(count)
    var pureData = JSON.stringify(data);
    return(pureData);
  }
  return(
    <View>
      <View style={styles.content}>
        <Text style={styles.caption}>Tankovanie</Text>
        <Text style={styles.using}>Najazdené km:</Text>
        <TextInput
          style={styles.usingInput}
          defaultValue='100000'
          onChangeText={text => setKilom(parseInt(text))}
          value={kilom}
        />
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
          value={priceLiter}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            _storeData(`lacko${counter}`, getData());
            _storeData('id', JSON.stringify(counter));
            }
          }
          style={styles.confirmButton}
          >
          <Text style={styles.confirmButtonText}> Pridať záznam </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCounter(0)
            console.log('zresetoval som')
            }
          }
          >
          <Text style={styles.confirmButtonText}> Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
  );  
}