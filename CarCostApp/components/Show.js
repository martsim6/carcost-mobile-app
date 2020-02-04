import React from 'react';
import { 
  Text, 
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import styles from './styles/styleShow';

export default function Show() {
  const [kilom, setKilom] = React.useState([]);
  const [refulPrice, setRefulPrice] = React.useState([]);
  const [priceLiter, setPriceLiter] = React.useState([]);
  const [kilomOld, setKilomOld] = React.useState([]);
  const [lastId, setLastId] = React.useState([]);

  const [consumption, setConsum] = React.useState(0);
  const [consumTogether, setConsTog] = React.useState(0)
  const [averageConsum, setAvgConsum] = React.useState(0);
  const [kmTogether, setKmTog] = React.useState(0);

  React.useEffect(() => {
    getId('id');
    calculateConsum(refulPrice, priceLiter)
    saveData('sum', dataForSave())
  }, [refulPrice]);

  function calculateDiff(new_val, last_val) {
    var value = new_val - last_val;
    return value;
  }

  function calculateConsum(ref_price_old, price_liter) {
    var volume = parseFloat(ref_price_old/price_liter);
    var km = calculateDiff(kilom, kilomOld)
    var consum = parseFloat((volume*100)/km).toFixed(2);
    setConsum(consum);
  }

  const getNeededData = (key, data, bol) => {
    try {
      if(data){
        const value = AsyncStorage.getItem(key, (err, result) =>{
          var res = JSON.parse(result)
          console.log(res)
          setKmTog(res['kmAll']);
          setConsTog(res['averageConsum']);
        })
      } else {
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
          });
        }
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
        getNeededData('sum', true, false)
        getNeededData(`lacko${res}`, false, true);
        var new_id = res -1;
        getNeededData(`lacko${new_id}`, false, false);
      })
    } catch(err) {
      console.log(err)
    }
  }

  function dataForSave() {
    var km = kmTogether + calculateDiff(kilom, kilomOld);
    var avrCon = (consumTogether + consumption) / lastId;
    console.log(`kmTog: ${kmTogether}  a conTog: ${consumTogether}`);
    console.log(`savujem km: ${km} a spotrebu: ${avrCon}`);
    var data = {
      kmAll: km,
      averageConsum: avrCon,
    }
    var pureData = JSON.stringify(data);
    return(pureData);
  }

  const saveData = async (key, data) => {
    try {
      console.log(key, data)
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      alert(error);
    }
  }
	return(
    <View>
      <View style={styles.contentShow}>
        <Text style={styles.caption}>Spotreba: <Text style={styles.data}>{consumption} l/100km</Text></Text>
        <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kilom} km</Text> </Text>
        <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{refulPrice} €</Text></Text>
        <Text style={styles.caption}>Najazdené kilometre stare: <Text style={styles.data}>{kilomOld} km</Text> </Text>
        <TouchableOpacity
          onPress={() => {
            setKmTog(0)
            console.log('zreset')
            }
          }
          >
          <Text style={styles.confirmButtonText}> Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
	);
}