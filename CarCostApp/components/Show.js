import React from 'react';
import { 
  Text, 
  View,
  AsyncStorage
} from 'react-native';
import styles from '../styles';

export default function Show() {
  const [kilom, setKilom] = React.useState([]);
  const [refulPrice, setRefulPrice] = React.useState([]);
  const [priceLiter, setPriceLiter] = React.useState([]);

  React.useEffect(() => {
    _displayData('lacko');
  }, []);

  const _displayData = async (key) => {
    try {
      const value = AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        console.log(res)
        setKilom(res['kilometers']);
        setRefulPrice(res['fulPrice']);
        setPriceLiter(res['literPrice'])
      });
    } catch (error) {
      alert(error);
    }
  }

	return(
    <View>
      <View style={styles.content}>
        <Text style={styles.using}>Spotreba:  </Text>
        <Text style={styles.using}>Najazdené kilometre: {kilom} </Text>
        <Text style={styles.using}>Zaplatený benzín: {refulPrice} </Text>
      </View>
    </View>
	);
}