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
    marginTop: normalize(40),
  },
  confirmButton: {
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
    justifyContent: 'center',
  },
  text: {
    fontSize: normalize(14),
    color: '#fff',
    textAlign: 'center',
    marginTop: normalize(20),
    marginLeft: normalize(20),
    marginRight: normalize(20),
  },
  newSection: {
    flexDirection: "column",
    justifyContent: 'center',
    marginTop: normalize(40),
  },
  captionLanguage: {
    fontSize: normalize(24),
    color: '#fff',
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
    marginRight: normalize(20),
    marginLeft: normalize(20),
    width: '34%',
  },
  languageText: {
    color: '#fff',
    fontSize: normalize(16),
  },
  infoText: {
    color: '#fff',
    fontSize: normalize(24),
  },
  infoTextCon: {
    color: '#ff8400',
    fontSize: normalize(24),
  },
  infoButton: {
    width: '40%',
    padding: 12,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
    marginTop: normalize(20),
  },
  infoButtonText: {
    fontSize: normalize(18),
    color: '#fff',
  },
  textContent: {
    color: '#fff',
    margin: normalize(12),
    textAlign: 'center',
  },
  icon: {
    marginTop: normalize(20),
    width: normalize(36), 
    height: normalize(36),
    tintColor: "#ff8400",
  },
});