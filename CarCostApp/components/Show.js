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
  const [lastId, setLastId] = React.useState([]);

  React.useEffect(() => {
    getId('id');
  }, []);

  const getNeededData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        setKilom(res['kilometers']);
        setRefulPrice(res['fulPrice']);
        setPriceLiter(res['literPrice'])
      });
    } catch (error) {
      alert(error);
    }
  }

  const getId = async (key) => {
    try {
      const value = AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        console.log(`last Id je: ${res}`)
        setLastId(res);
        console.log(`last ID je nastavene na : ${lastId}`);
        getNeededData(`lacko${res}`);
      })
    } catch(err) {
      console.log(err)
    }
  }

	return(
    <View>
      <View style={styles.contentShow}>
        <Text style={styles.caption}>Spotreba:  </Text>
        <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kilom}</Text> </Text>
        <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{refulPrice}</Text></Text>
      </View>
    </View>
	);
}