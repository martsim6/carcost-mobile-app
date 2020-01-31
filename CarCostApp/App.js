import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './styles';
import Add from './components/Add';
import Show from './components/Show';

export default function App() {

  const [slide, setSlide] = React.useState('add');

  React.useEffect(() => {
  }, []);

  function RenderContent(props) {
    const value = props.loadPage;
    if (value == 'add') {
      return <Add />;
    } else {
      return <Show />;
    }
  }

  return (
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
      <RenderContent loadPage={slide} />
    </View>
  );
}