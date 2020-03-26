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
	contentShow: {
    marginTop: SCREEN_HEIGHT * 0.025,
  },
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
  content: {
    marginLeft: SCREEN_WIDTH * 0.057,
    marginTop: SCREEN_HEIGHT * 0.04,
    flexDirection: 'column',
  },
  contentCaption: {
    color: '#ff8400',
    fontSize: normalize(28),
    fontWeight: '400',
    marginBottom: SCREEN_HEIGHT * 0.05,
  },
  caption: {
    color: "#fff",
    fontSize: normalize(20),
    marginBottom: SCREEN_HEIGHT * 0.08,
  },
  data: {
    color: '#ff8400',
  },
});