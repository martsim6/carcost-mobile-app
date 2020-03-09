import { StyleSheet } from 'react-native';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export default StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    marginTop: 40,
    padding: 12,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    fontSize: normalize(20),
    color: '#fff',
  },
  textField: {
    marginTop: 40,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: normalize(14),
    color: '#fff',
    textAlign: 'center',
  },
  languageSection: {
    flexDirection: "column",
  },
  captionLanguage: {
    fontSize: normalize(28),
    color: '#fff',
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center',
  },
  selectButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    padding: 12,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  languageText: {
    color: '#fff',
    fontSize: normalize(16),
  },
  information: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  infoText: {
    color: '#fff',
    fontSize: normalize(24),
  },
  infoButton: {
    width: '40%',
    padding: 12,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
    marginTop: 20,
  },
  infoButtonText: {
    fontSize: normalize(18),
    color: '#fff',
  }
});