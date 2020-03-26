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

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }
	return(
    <View style={styles.container}>
      {showInfo === false && 
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
          <View style={styles.newSection}>
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
          <View style={styles.newSection}>
            <Text style={styles.infoText}> Informácie o aplikácii </Text>
            <View style={styles.selectButtons}>
              <TouchableOpacity 
              style={styles.infoButton}
              onPress={() => {
                setShowInfo(true)
              }}
              >
                <Text style={styles.infoButtonText}> Info </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
      {showInfo === true && 
        <View style={styles.content}>
          <Text style={styles.infoTextCon}> Informácie </Text>
          <View>
            <Text style={styles.textContent}>Táto aplikácia slúži na ukladanie údajov o tankovaní a najazdených kilometroch.</Text>
            <Text style={styles.textContent}>Najlepšie fungovanie aplikácie je zaručené len v prípade, že záznamy pridávate zakaždým,
            ako zrealuzujete tankovanie.</Text>
            <Text style={styles.textContent}>Aktuálna spotreba je vypočítavaná na základe naposledy prejdených kilometrov a momentálne natankovanej ceny.
            Z týchto hodnôt však nie je možné zaručiť presnú spotrebu, tá je len orientačná.</Text>
            <Text style={styles.textContent}>Najpresnejší výsledok spotreby dosiahnete jedine v prípade, že tankujete vždy na plnú nádrž.</Text>
            <Text style={styles.textContent}>V momentálnej verzii je možné používať aplikáciu (ukladať záznamy) len pre jedno auto.</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowInfo(false)
            }}
          >
            <Image
                  source={require('../assets/images/back.png')}
                  fadeDuration={0}
                  style={styles.icon}
                />
          </TouchableOpacity>
        </View>
      }
    </View>
	);
}