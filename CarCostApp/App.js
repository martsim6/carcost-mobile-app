import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import styles from './components/styles/styles';
import Add from './components/Add';
import Show from './components/Show';
import Settings from './components/Settings'
import DistanceStore from './components/context/DistanceStore';

export default function App() {

  const [slide, setSlide] = React.useState('add');

  React.useEffect(() => {
  }, []);

  function RenderContent(props) {
    if(slide){
      const value = props.loadPage;
      return (<View>
          {value == 'add' && <Add />}
          {value == 'show' && <Show />}
          {value == 'settings' && <Settings />}
        </View>
      );
    }
  }
  return (
    <DistanceStore>
      <View style={styles.container}>
        <View style={styles.statusbar}>
        </View>
      	<View style={styles.header}>
          <Text style={styles.title}> Car Cost </Text>
        </View>
        <View style={styles.buttonsMenu}>
          <TouchableOpacity
            onPress={() => {
              setSlide('add');
              }
            }
            style={styles.topButtons}
          >
            <Text style={styles.buttonText}>Pridať</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSlide('show');
              }
            }
            style={styles.topButtons}
          >
            <Text style={styles.buttonText}>Pozrieť</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSlide('settings')}
            style={styles.topButtons}
          >
            <Text style={styles.buttonText}>Nastavenia</Text>
          </TouchableOpacity>
        </View>
        <RenderContent loadPage={slide} />
      </View>
    </DistanceStore>
  );
}