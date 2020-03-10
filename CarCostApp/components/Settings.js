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
    <View>
      {!showInfo && 
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
      {showInfo && 
        <View style={styles.content}>
          <Text style={styles.infoText}> Informácie </Text>
          <Text style={styles.text}>
            <p>Táto aplikácia slúži na ukladanie údajov o tankovaní a najazdených kilometroch.</p>
            <p>Najlepšie fungovanie aplikácie je zaručené len v prípade, že záznamy pridávate zakaždým,
            ako zrealuzujete tankovanie.</p>
            <p>Aktuálna spotreba je vypočítavaná na základe naposledy prejdených kilometrov a momentálne natankovanej ceny.</p>
            Z týchto hodnôt však nie je možné zaručiť presnú spotrebu, tá je len orientačná.
            <p>Najpresnejší výsledok spotreby dosiahnete jedine v prípade, že tankujete vždy na plnú nádrž.</p>
            <p>V momentálnej verzii je možné používať aplikáciu (ukladať záznamy) len pre jedno auto.</p>
          </Text>
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