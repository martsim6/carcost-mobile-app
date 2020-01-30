import React from 'react';
import { 
  TextInput, 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native';
import styles from './styles';

export default function App() {
  const [todoInput, setTodoInput] = React.useState([]);
  const [todos, setTodos] = React.useState([
    {id: 0, title: "Take out the trash", done: false},
    {id: 1, title: "Cook dinner", done: false},
  ]);

  React.useEffect(() => {
    // kappa here
  }, []);

  // const styles = require('./styles');
  return (
    <View style={styles.container}>
      <View style={styles.statusbar}></View>
      	<View style={styles.header}>
          <Text style={styles.title}> Car Cost App </Text>
        </View>
        <View style={styles.buttonsMenu}>
          <TouchableOpacity
            onPress={() => alert('Pridavam')}
            style={styles.topButtons}
          >
            <Text style={styles.buttonText}>Pridať</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('Pozeram')}
            style={styles.topButtonsMiddle}
          >
            <Text style={styles.buttonText}>Pozrieť</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('Nastavujem')}
            style={styles.topButtons}
          >
            <Text style={styles.buttonText}>Nastavenia</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.caption}>Tankovanie</Text>
          <Text style={styles.using}> 
            Najazdené km. 
          </Text>
          <TextInput
            style={styles.usingInput}
            onChangeText={text => onChangeText(text)}
            value={'Lacko'}
          />
          <Text style={styles.using}> 
            Natankované litre 
          </Text>
          <TextInput
            style={styles.usingInput}
            onChangeText={text => onChangeText(text)}
            value={'Lacko'}
          />
          <Text style={styles.using}> 
            Cena/liter 
          </Text>
          <TextInput
            style={styles.usingInput}
            onChangeText={text => onChangeText(text)}
            value={'Lacko'}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => alert("Pridal som zaznam")}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}> Pridať záznam </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}