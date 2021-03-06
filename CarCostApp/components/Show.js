import React from 'react';
import { 
  Text, 
  View,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import styles from './styles/styleShow';
import moment from 'moment';

export default function Show(props) {
  // state variables
  const [showTab, setShowTab] = React.useState([]);
  const [consumption, setConsum] = React.useState(0);
  const [kilomPassed, setKilomPassed] = React.useState(0);
  const [refulPrice, setRefulPrice] = React.useState(0);
  const [kmTraveled, setKmTraveled] = React.useState(0);
  const [spentMoney, setSpentMoney] = React.useState(0);
  const [moneyPerMonth, setMoneyPerMonth] = React.useState(0);
  const [kmPerMonth, setKmPerMonth] = React.useState(0);

  const date = moment(new Date()).format("MMMM");
  // On visit, load all needed data
  React.useEffect(() => {
    setNeededData();
  }, [setNeededData, consumption, kilomPassed, kmTraveled, spentMoney]);

  const setNeededData = () => {
    try {
      // Set data taken from input (Add page)
      AsyncStorage.getItem('sendData', (err, result) => {
        if(result){
          var res = JSON.parse(result);
          setConsum(res.consumption);
          setKilomPassed(res.kmPassed);
          setRefulPrice(res.fulPrice);
          setKmTraveled(res.kmTraveled);
          setSpentMoney(res.spentMoney);
          setMoneyPerMonth(res.monPerMon);
          setKmPerMonth(res.kmPerMon);
        }
      });
    } catch (error){
      alert(error);
    }
  };

  return(
    <View>
      <View style={styles.contentShow}>
        <View style={styles.chooseTabs}>
          <TouchableOpacity
            onPress={() => {
              setShowTab('current');
            }
          }
          style={showTab === 'current' ? styles.chooseButtonsSelected : styles.chooseButtons}
          >
            <Text style={styles.chooseButtonText}> Aktuálne </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowTab('month');
            }
          }
          style={showTab === 'month' ? styles.chooseButtonsSelected : styles.chooseButtons}
          >
            <Text style={styles.chooseButtonText}> Za mesiac </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowTab('all');
            }
          }
          style={showTab === 'all' ? styles.chooseButtonsSelected : styles.chooseButtons}
          >
            <Text style={styles.chooseButtonText}>Celkovo</Text>
          </TouchableOpacity>
        </View>
        { 
          showTab === 'current' &&
          <View style={styles.content}>
            <Text style={styles.contentCaption}> Aktuálne </Text>
            <Text style={styles.caption}>Spotreba: <Text style={styles.data}>{consumption} l/100km</Text></Text>
            <Text style={styles.caption}>Naposledy prejdené kilometre: <Text style={styles.data}>{kilomPassed} km</Text> </Text>
            <Text style={styles.caption}>Naposledy zaplatený benzín: <Text style={styles.data}>{refulPrice} €</Text></Text>
          </View>
        }
        {
          showTab === 'month' &&
          <View style={styles.content}>
            <Text style={styles.contentCaption}> Za mesiac {date} </Text>
            <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kmPerMonth} km</Text> </Text>
            <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{moneyPerMonth} €</Text></Text>
          </View>
        }
        {
          showTab === 'all' && 
          <View style={styles.content}>
            <Text style={styles.contentCaption}> Celkovo </Text>
            <Text style={styles.caption}>Najazdené kilometre: <Text style={styles.data}>{kmTraveled} km</Text> </Text>
            <Text style={styles.caption}>Zaplatený benzín: <Text style={styles.data}>{spentMoney} €</Text></Text>
          </View>
        }
      </View>
    </View>
  )
}