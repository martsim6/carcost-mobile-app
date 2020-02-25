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

export default function Show() {
  const [kilom, setKilom] = React.useState([]);
  const [kilomOld, setKilomOld] = React.useState([]);

  const [priceLiter, setPriceLiter] = React.useState([]);
  
  const [refulPrice, setRefulPrice] = React.useState([]);
  const [refulPriceOld, setRefulPriceOld] = React.useState([]);

  const [lastId, setLastId] = React.useState();

  const [kmTraveled, setKmTraveled] = React.useState([]);
  const [spentMoney, setSpentMoney] = React.useState([]);

  const [kmPerMonth, setKmPerMonth] = React.useState([]);
  const [moneyPerMonth, setMoneyPerMonth] = React.useState([]);

  const [consumption, setConsum] = React.useState(0);

  const date = moment(new Date()).locale('sk').format("MMMM");

  const [showTab, setShowTab] = React.useState([]);
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    getId('id');
    console.log(`lackooo ${lastId}`);
    storeData(`store${lastId}`, getSavingData());
    if(showContent) {
      getId('id');
      calculateConsum(refulPrice, priceLiter);
      storeData(`store${lastId}`, getSavingData());
      caluclateAll(); 
    } else {
      alert('Zatial bol zadaný len inicializačný údaj! Prosím, pridajte nový údaj na možný výpočet');
    }
  }, [refulPrice, lastId]);

  function calculateDiff(new_val, last_val) {
    var value = new_val - last_val;
    return value;
  }

  function getSavingData() {
    var data = {
      kmTraveled: distanceTraveled(kilomOld, kilom),
      spent: refulPrice,
      date: date,
    }
    var pureData = JSON.stringify(data);
    return(pureData);
  }

  function calculateConsum(ref_price_old, price_liter) {
    var volume = parseFloat(ref_price_old/price_liter);
    var km = calculateDiff(kilom, kilomOld)
    var consum = parseFloat((volume*100)/km).toFixed(2);
    setConsum(consum);
  }

  function distanceTraveled(oldDist, newDist) {
    var value = newDist - oldDist;
    return value;
  }

  function caluclateAll() {
    var kmPassed = 0;
    var spentAll = 0;
    var kmMonth = 0;
    var moneyMonth = 0;
    for(var i=1; i<=lastId; i++) {
      try {
        const value = AsyncStorage.getItem(`store${i}`, (err, res) => {
          var result = JSON.parse(res);
          if(lastId > 0) {
            kmPassed += parseInt(result["kmTraveled"])
          }
          if(date == result['date']) {
            kmMonth += parseInt(result['kmTraveled'])
            moneyMonth += parseInt(result['spent'])
          }
          spentAll += parseInt(result["spent"])
         
        });
      } catch (err) {
        alert(err);
      }
    }
    setKmTraveled(kmPassed);
    setSpentMoney(spentAll);
    setKmPerMonth(kmMonth);
    setMoneyPerMonth(moneyMonth);
  }

  const getNeededData = (key, bol) => {
    try {
      if(bol) {
        const value = AsyncStorage.getItem(key, (err, result) => {
          var res = JSON.parse(result)
          setKilom(res['kilometers']);
          setRefulPrice(res['fulPrice']);
          setPriceLiter(res['literPrice'])
        });
      } else {
        const value = AsyncStorage.getItem(key, (err, result) => {
          var res = JSON.parse(result)
          setKilomOld(res['kilometers']);
          setRefulPriceOld(res['fulPrice']);
        });
      }
      
    } catch (error) {
      alert(error);
    }
  }
  const getId = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key, (err, result) => {
        var res = JSON.parse(result)
        console.log(`toto je res SHOW: ${JSON.stringify(res)}`)
        setLastId(res.id);
        console.log(`toto je ast id: ${lastId}`);
        if(lastId == 1){
          setShowContent(true);
        }
        console.log(showContent)
        if(showContent) {
          getNeededData(`${res.id}`, true);
          var old_id = res.id -1;
          getNeededData(`lacko${old_id}`, false);
        }
      })
    } catch(err) {
      console.log(err)
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
                  context.changeDistance(kilom)
                }
              }
              style={showTab == 'current' ? styles.chooseButtonsSelected : styles.chooseButtons}
              >
                <Text style={styles.chooseButtonText}> Aktuálne </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowTab('month');
                  context.changeDistance(kilom)
                }
              }
              style={showTab == 'month' ? styles.chooseButtonsSelected : styles.chooseButtons}
              >
                <Text style={styles.chooseButtonText}> Za mesiac </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowTab('all');
                  context.changeDistance(kilom)
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
                <Text style={styles.caption}>Naposledy prejdené kilometre: <Text style={styles.data}>{distanceTraveled(kilomOld, kilom)} km</Text> </Text>
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