import React from 'react';
import { 
  Text, 
  View,
  AsyncStorage
} from 'react-native';
import styles from './styles/styleShow';
import moment from 'moment';

export default function Show() {
  const [kilom, setKilom] = React.useState([]);
  const [refulPrice, setRefulPrice] = React.useState([]);
  const [priceLiter, setPriceLiter] = React.useState([]);
  const [kilomOld, setKilomOld] = React.useState([]);
  const [refulPriceOld, setRefulPriceOld] = React.useState([]);
  const [lastId, setLastId] = React.useState([]);

  const [consumption, setConsum] = React.useState(0);
  const date = moment(new Date()).format("MMMM");

  React.useEffect(() => {
    getId('id');
    calculateConsum(refulPrice, priceLiter);
    storeData(`store${lastId}`, getSavingData());
    caluclateAll();
  }, [refulPrice]);

  function calculateDiff(new_val, last_val) {
    var value = new_val - last_val;
    return value;
  }

  function getSavingData() {
    var data = {
      kmTraveled: distanceTraveled(kilomOld, kilom),
      spent: refulPrice,
      date: date,
    }
    var pureData = JSON.stringify(data);
    return(pureData);
  }

  function calculateConsum(ref_price_old, price_liter) {
    var volume = parseFloat(ref_price_old/price_liter);
    var km = calculateDiff(kilom, kilomOld)
    var consum = parseFloat((volume*100)/km).toFixed(2);
    setConsum(consum);
  }

  function distanceTraveled(oldDist, newDist) {
    var value = newDist - oldDist;
    return value;
  }

  function caluclateAll() {
    var kmPassed = 0;
    var spentAll = 0;
    for(var i=1; i<=lastId; i++) {
      try {
        const value = AsyncStorage.getItem(`store${i}`, (err, res) => {
          var result = JSON.parse(res);
          console.log(result);
        });
      } catch (err) {
        alert(err);
      }
    }
  }
  const displayData = async (key) => {
    try {
      const value = AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
      });
    } catch (error) {
      alert(error);
    }
  }

  const getNeededData = (key, bol) => {
    try {
      if(bol) {
        const value = AsyncStorage.getItem(key, (err, result) => {
          var res = JSON.parse(result)
          setKilom(res['kilometers']);
          setRefulPrice(res['fulPrice']);
          setPriceLiter(res['literPrice'])
        });
      } else {
        const value = AsyncStorage.getItem(key, (err, result) => {
          var res = JSON.parse(result)
          setKilomOld(res['kilometers']);
          setRefulPriceOld(res['fulPrice']);
        });
      }
      
    } catch (error) {
      alert(error);
    }
  }
  const getId = (key) => {
    try {
      const value = AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        setLastId(res);
        getNeededData(`lacko${res}`, true);
        var old_id = res -1;
        getNeededData(`lacko${old_id}`, false);
      })
    } catch(err) {
      console.log(err)
    }
  }

  const storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
      alert('pridal som ')
    } catch (error) {
      alert(error);
    }
  }

	return(
    <View>
      <View style={styles.contentShow}>
        <Text style={styles.caption}>Spotreba: <Text style={styles.data}>{consumption} </Text></Text>
        <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kilom}</Text> </Text>
        <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{refulPrice}</Text></Text>
        <Text style={styles.caption}>Najazdené kilometre stare: <Text style={styles.data}>{kilomOld}</Text> </Text>
        <Text style={styles.caption}>Zaplatený benzín stare: <Text style={styles.data}>{refulPriceOld}</Text></Text>
      </View>
    </View>
	);
}