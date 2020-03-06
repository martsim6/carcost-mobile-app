import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image } from 'react-native';
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
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Pridať</Text>
              <Image
                source={require('./assets/images/fuel.png')}
                fadeDuration={0}
                style={styles.icons}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSlide('show');
              }
            }
            style={styles.topButtons}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Pozrieť</Text>
              <Image
                source={require('./assets/images/watch.png')}
                fadeDuration={0}
                style={styles.icons}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSlide('settings')}
            style={styles.topButtons}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Nastavenia</Text>
              <Image
                source={require('./assets/images/settings.png')}
                fadeDuration={0}
                style={styles.icons}
              />
            </View>
          </TouchableOpacity>
        </View>
        <RenderContent loadPage={slide} />
      </View>
    </DistanceStore>
  );
}