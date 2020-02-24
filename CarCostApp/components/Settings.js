import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import styles from './styles/styleSettings';

export default function Show() {
  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
	return(
    <View style={styles.content}>
      <TouchableOpacity
        onPress={() => {
          clearAsyncStorage();
          alert("Záznamy boli úspešne vymazané!")
          }
        }
        style={styles.confirmButton}
        >
        <Text style={styles.buttonText}> Reset </Text>
      </TouchableOpacity>
      <View style={styles.textField}>
        <Text style={styles.text}>
          Zresetovaním vymažete všetky doterajšie záznamy a nebude možné sa k nim vrátiť!
        </Text>
      </View>
    </View>
	);
}