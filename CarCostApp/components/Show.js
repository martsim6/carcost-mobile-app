import React from 'react';
import { 
  Text, 
  View,
  AsyncStorage
} from 'react-native';
import styles from './styles/styleShow';

export default function Show() {
  const [kilom, setKilom] = React.useState([]);
  const [refulPrice, setRefulPrice] = React.useState([]);
  const [priceLiter, setPriceLiter] = React.useState([]);
  const [kilomOld, setKilomOld] = React.useState([]);
  const [refulPriceOld, setRefulPriceOld] = React.useState([]);
  const [lastId, setLastId] = React.useState([]);

  const [consumption, setConsum] = React.useState(0);

  React.useEffect(() => {
    getId('id', true);
    getIdOld('id', false)
    calculateConsum(refulPrice, priceLiter)
  }, []);

  function calculateDiff(new_val, last_val) {
    var value = new_val - last_val;
    return value;
  }

  function calculateConsum(ref_price_old, price_liter) {
    var volume = parseFloat(ref_price_old/price_liter);
    var km = calculateDiff(kilom, kilomOld)
    var consum = parseFloat((volume*100)/km).toFixed(2);
    setConsum(consum);
    console.log(`nastavujem consum a jeho hodnota je ${consumption}`)
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
  const getId = (key, bol) => {
    try {
      const value = AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        console.log(`last Id je: ${res}`)
        setLastId(res);
        console.log(`last ID je nastavene na : ${lastId}`);
        getNeededData(`lacko${res}`, bol);
      })
    } catch(err) {
      console.log(err)
    }
  }
  const getIdOld = (key) => {
    try {
      const value = AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        setLastId(res);
        var new_id = res -1;
        getNeededData(`lacko${new_id}`);
      })
    } catch(err) {
      console.log(err)
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