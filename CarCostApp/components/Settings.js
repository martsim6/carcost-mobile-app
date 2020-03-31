import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import styles from './styles/styleSettings';

export default function Settings() {
  const [showInfo, setShowInfo] = React.useState(false);
  const [showTab, setShowTab] = React.useState([]);

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
	return(
    <View style={styles.container}>
      <View style={styles.chooseTabs}>
        <TouchableOpacity
          onPress={() => {
            setShowTab('reset');
          }
        }
        style={showTab === 'reset' ? styles.chooseButtonsSelected : styles.chooseButtons}
        >
          <Text style={styles.chooseButtonText}> Reset </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowTab('language');
          }
        }
        style={showTab === 'language' ? styles.chooseButtonsSelected : styles.chooseButtons}
        >
          <Text style={styles.chooseButtonText}> Jazyk </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowTab('info');
          }
        }
        style={showTab === 'info' ? styles.chooseButtonsSelected : styles.chooseButtons}
        >
          <Text style={styles.chooseButtonText}>Informácie</Text>
        </TouchableOpacity>
      </View>
      { showTab === 'reset' &&
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              clearAsyncStorage();
              alert("Záznamy boli úspešne vymazané!")
              }
            }
            style={styles.resetButton}
            >
            <Text style={styles.buttonText}> Reset </Text>
          </TouchableOpacity>
          <Text style={styles.textContent}>
            Zresetovaním vymažete všetky doterajšie záznamy a nebude možné sa k nim vrátiť!
          </Text>
        </View>
      }
      { showTab === 'language' &&
        <View style={styles.content}>
          <View style={styles.selectButtons}>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.buttonText}>
                Slovenský
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageButton}>
              <Text style={styles.buttonText}>
                Anglický
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      { showTab === 'info' &&
        <View style={styles.content}>
          <Text style={styles.infoTextCon}> Informácie </Text>
          <View>
            <Text style={styles.textContentStrong}>Prvý záznam je len iniciálny! Jeho hodnoty sa nezobrazujú vo výsledných dátach!</Text>
            <Text style={styles.textContent}>Táto aplikácia slúži na ukladanie údajov o tankovaní a najazdených kilometroch.</Text>
            <Text style={styles.textContent}>Najlepšie fungovanie aplikácie je zaručené len v prípade, že záznamy pridávate zakaždým,
            ako zrealuzujete tankovanie.</Text>
            <Text style={styles.textContent}>Aktuálna spotreba je vypočítavaná na základe naposledy prejdených kilometrov a poslednej natankovanej ceny.
            Z týchto hodnôt však nie je možné zaručiť presnú spotrebu, tá je len orientačná.</Text>
            <Text style={styles.textContent}>V momentálnej verzii je možné používať aplikáciu (ukladať záznamy) len pre jedno auto.</Text>
          </View>
        </View>
      }
    </View>
  );
}