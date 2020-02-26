import React from 'react';
import { 
  Text, 
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import styles from './styles/styleShow';
import moment from 'moment';
import { DistanceStore } from './context/DistanceStore';

export default function Show(props) {
  // kilom = aktualne km na tachometri
  // kilomStart = kilometre na tachometri pri prvom spusteni app/ restarte
  // kilomLast = naposledy zapisane CELKOVO prejdene km (nie tach)
  // kilomPassed = aktualne prejdene KM (nie tach) ==> kilomTraveled - kilomLast
  // kmTraveled = AKTUALNE CELKOVO prejdene km (nie tach) ==> kilom - kilomStart
  // kmPerMonth = najazdene za mesiac
  const [kilom, setKilom] = React.useState(0);
  const [kilomStart, setKilomStart] = React.useState(0);
  const [kilomLast, setKilomLast] = React.useState(0);
  const [kilomPassed, setKilomPassed] = React.useState(0);
  const [kmTraveled, setKmTraveled] = React.useState(0);
  const [kmPerMonth, setKmPerMonth] = React.useState(0);

  const [priceLiter, setPriceLiter] = React.useState(0);
  // zaplatene - refulPrice = aktualne, spentMoney = celkovo, money/Mont = za mesiac
  const [refulPrice, setRefulPrice] = React.useState(0);
  const [spentMoney, setSpentMoney] = React.useState(0);
  const [moneyPerMonth, setMoneyPerMonth] = React.useState(0);
  // spotreba
  const [consumption, setConsum] = React.useState(0);
  // datum
  const date = moment(new Date()).locale('sk').format("MMMM");
  // kontrola ukazky tabu
  const [showTab, setShowTab] = React.useState([]);

  React.useEffect(() => {
    console.log('--------------------kek')
    setNeededData();
  }, [kilom, kilomPassed, kmTraveled]);

  function getSavingData() {
    var data = {
      kmTraveled: kmTraveled,
      kmMonth: kmPerMonth,
      spent: spentMoney,
      spentMonth: moneyPerMonth,
      date: date,
    }
    var pureData = JSON.stringify(data);
    return(pureData);
  }

  function calculateConsum(ref_price_old, price_liter) {
    var volume = parseFloat(ref_price_old/price_liter);
    var km = kilom - kilomLast;
    var consum = parseFloat((volume*100)/km).toFixed(2);
    setConsum(consum);
  }

  function caluclateAll() {
    try {
      AsyncStorage.getItem(`storedData`, (err, res) => {
        if(res){
          var result = JSON.parse(res);
          setKilomLast(parseInt(result["kmTraveled"]));
          setKilomPassed(kmTraveled - kilomLast);
          if(date == result['date']) {
            setKmPerMonth(parseInt(result['kmMonth']) + kilomPassed);
            setMoneyPerMonth(parseInt(result['spentMonth'] + parseInt(refulPrice)));
          } else {
            setKmPerMonth(kilomPassed);
            setMoneyPerMonth(parsInt(refulPrice));
          }
          setSpentMoney(parseInt(result["spent"]) + parseInt(refulPrice));
          calculateConsum(refulPrice, priceLiter);
          console.log(kilomLast, kilomPassed, kmPerMonth, moneyPerMonth, spentMoney,consumption);
        }   
      });
    } catch (err) {
      alert(err);
    }
  }

  const setNeededData = () => {
    try {
      // Set actual data
      AsyncStorage.getItem('lacko', (err, result) => {
        if(result){
          var res = JSON.parse(result);
          setKilom(res['kilometers_new']);
          setRefulPrice(res['fulPrice']);
          setPriceLiter(res['literPrice']);
          setKilomStart(res['kilometers_start']);
          setKmTraveled(res['kilometers_new'] - res['kilometers_start']);
          console.log(kilom, refulPrice, priceLiter, kilomStart, kmTraveled);
          caluclateAll();
          if(kilom){
            storeData(`storedData`, getSavingData());
          }
          // if(true){
          //   storeData(`storedDataOld`, getSavingData())
          // } else {
          //   storeData(`storeDataOld`, getSavingData())
          //   storeData(`storedDataNew`, getSavingData())
          // }
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  const storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      alert(error);
    }
  }

	return(
    <DistanceStore.Consumer>{(context) => {
      return(
        <View>
          <View style={styles.contentShow}>
            <View style={styles.chooseTabs}>
              <TouchableOpacity
                onPress={() => {
                  setShowTab('current');
                }
              }
              style={showTab == 'current' ? styles.chooseButtonsSelected : styles.chooseButtons}
              >
                <Text style={styles.chooseButtonText}> Aktuálne </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowTab('month');
                }
              }
              style={showTab == 'month' ? styles.chooseButtonsSelected : styles.chooseButtons}
              >
                <Text style={styles.chooseButtonText}> Za mesiac </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowTab('all');
                }
              }
              style={showTab == 'all' ? styles.chooseButtonsSelected : styles.chooseButtons}
              >
                <Text style={styles.chooseButtonText}>Celkovo</Text>
              </TouchableOpacity>
            </View>
            { 
              showTab == 'current' &&
              <View style={styles.content}>
                <Text style={styles.contentCaption}> Aktuálne </Text>
                <Text style={styles.caption}>Spotreba: <Text style={styles.data}>{consumption} l/km</Text></Text>
                <Text style={styles.caption}>Naposledy prejdené kilometre: <Text style={styles.data}>{kilomPassed} km</Text> </Text>
                <Text style={styles.caption}>Naposledy zaplatený benzín: <Text style={styles.data}>{refulPrice} €</Text></Text>
              </View>
            }
            {
              showTab == 'month' &&
              <View style={styles.content}>
                <Text style={styles.contentCaption}> Za mesiac {date} </Text>
                <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kmPerMonth} km</Text> </Text>
                <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{moneyPerMonth} €</Text></Text>
              </View>
            }
            {
              showTab == 'all' && 
              <View style={styles.content}>
                <Text style={styles.contentCaption}> Celkovo </Text>
                <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kmTraveled} km</Text> </Text>
                <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{spentMoney} €</Text></Text>
              </View>
            }
          </View>
        </View>
      )
    }}</DistanceStore.Consumer>
	);
}

// console.log(`km_tach: ${kilom}, ref: ${refulPrice}, price: ${priceLiter}, kmStart: ${kilomStart}, consum: ${consumption}
//       , kmTrav: ${kmTraveled}, spent: ${spentMoney}, kmMonth: ${kmPerMonth}, spentMont: ${moneyPerMonth}, kmLast: ${kilomLast}, kmPass: ${kilomPassed}`);