import { StyleSheet } from 'react-native';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

function normalizeText(size) {
  const newSize = size * scale 
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT * 0.05,
  },
  confirmButton: {
    width: '30%',
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: normalizeText(20),
    color: '#fff',
  },
  textField: {
    justifyContent: 'center',
  },
  text: {
    fontSize: normalizeText(14),
    color: '#fff',
    textAlign: 'center',
    marginTop: SCREEN_HEIGHT * 0.03,
    marginLeft: SCREEN_WIDTH * 0.03,
    marginRight: SCREEN_WIDTH * 0.03,
  },
  newSection: {
    flexDirection: "column",
    justifyContent: 'center',
    marginTop: SCREEN_HEIGHT * 0.08,
  },
  captionLanguage: {
    fontSize: normalizeText(24),
    color: '#fff',
    marginBottom: SCREEN_HEIGHT * 0.03,
    textAlign: 'center',
  },
  selectButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  languageButton: {
    width: '34%',
    marginRight: SCREEN_WIDTH * 0.05,
    marginLeft: SCREEN_WIDTH * 0.05,
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
  },
  languageText: {
    color: '#fff',
    fontSize: normalizeText(16),
  },
  infoText: {
    color: '#fff',
    fontSize: normalizeText(24),
  },
  infoTextCon: {
    color: '#ff8400',
    fontSize: normalizeText(24),
  },
  infoButton: {
    width: '40%',
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  infoButtonText: {
    fontSize: normalizeText(18),
    color: '#fff',
  },
  textContent: {
    color: '#fff',
    margin: SCREEN_WIDTH * 0.03,
    textAlign: 'center',
  },
  icon: {
    marginTop: SCREEN_HEIGHT * 0.04,
    width: SCREEN_WIDTH * 0.1, 
    height: SCREEN_HEIGHT * 0.06,
    tintColor: "#ff8400",
  },
});