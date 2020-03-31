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
  // Whole section
  container: {
    width: '100%',
    height: '100%',
    marginTop: SCREEN_HEIGHT * 0.025,
  },
  // Top tabs
  chooseTabs: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chooseButtons: {
    width: '25%',
    padding: SCREEN_WIDTH * 0.03,
    alignItems: 'center',
    borderColor: 'gray',
    borderBottomWidth: 2,
    borderRadius: 5,
  },
  chooseButtonsSelected: {
    width: '25%',
    padding: SCREEN_WIDTH * 0.03,
    alignItems: 'center',
    borderColor: 'green',
    borderBottomWidth: 2,
    borderRadius: 5,
  },
  chooseButtonText: {
    color: '#ff8400',
  },
  // Content section
  content: {
    marginTop: SCREEN_HEIGHT * 0.02,
  },
  // Buttons
  resetButton: {
    width: '30%',
    marginTop: SCREEN_HEIGHT * 0.2,
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  languageButton: {
    width: '34%',
    marginTop: SCREEN_HEIGHT * 0.2,
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: 5,
    borderColor: "#ff8400",
    borderWidth: 3,
    alignItems: 'center',
  },
  selectButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  // Text
  buttonText: {
    fontSize: normalizeText(20),
    color: '#fff',
  },
  infoTextCon: {
    alignSelf: 'center',
    color: '#ff8400',
    fontSize: normalizeText(24),
  },
  textContent: {
    margin: SCREEN_WIDTH * 0.03,
    textAlign: 'center',
    color: '#fff',
    fontSize: normalizeText(13),
  },
  textContentStrong: {
    margin: SCREEN_WIDTH * 0.03,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: normalizeText(15),
  },
});