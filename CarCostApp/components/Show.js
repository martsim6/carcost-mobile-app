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

  React.useEffect(() => {
    _displayData('lacko0');
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
      <View style={styles.contentShow}>
        <Text style={styles.caption}>Spotreba:  </Text>
        <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kilom}</Text> </Text>
        <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{refulPrice}</Text></Text>
      </View>
    </View>
	);
}