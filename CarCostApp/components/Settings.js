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
          console.log('vymazané')
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
      <View style={styles.languageSection}>
        <Text style={styles.captionLanguage}> Jazyk </Text>
        <View style={styles.selectButtons}>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>
              Slovenský
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>
              Anglický
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.information}>
        <Text style={styles.infoText}> Informácie o aplikácii </Text>
        <View style={styles.selectButtons}>
          <TouchableOpacity style={styles.infoButton}>
            <Text style={styles.infoButtonText}> Info </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
	);
}