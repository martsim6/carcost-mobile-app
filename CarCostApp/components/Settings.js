import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
} from 'react-native';
import styles from './styles/styles';

export default function Show() {
	return(
    <View style={styles.content}>
      <TouchableOpacity
        onPress={() => {
          setCounter(0)
          clearAsyncStorage();
          checkValue();
          console.log('zresetoval som')
          }
        }
        style={styles.confirmButton}
        >
        <Text style={styles.confirmButtonText}> Reset </Text>
      </TouchableOpacity>
    </View>
	);
}