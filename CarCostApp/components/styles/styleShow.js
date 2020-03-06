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
    marginTop: 15,
  },
  chooseTabs: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chooseButtons: {
    alignItems: 'center',
    width: '25%',
    padding: 10,
    borderColor: 'gray',
    borderBottomWidth: 2,
    borderRadius: 5,
  },
  chooseButtonsSelected: {
    alignItems: 'center',
    width: '25%',
    padding: 10,
    borderColor: 'green',
    borderBottomWidth: 2,
    borderRadius: 5,
  },
  chooseButtonText: {
    color: '#ff8400',
  },
  content: {
    marginLeft: 25,
    marginTop: 25,
    flexDirection: 'column',
    marginBottom: 12,
  },
  contentCaption: {
    color: '#ff8400',
    fontSize: normalize(28),
    fontWeight: '400',
    marginBottom: 40,
  },
  caption: {
    color: "#fff",
    fontSize: normalize(20),
    marginBottom: 50,
  },
  data: {
    color: '#ff8400',
  },
  confirmButtonText: {
    color: '#ff8400',
  },
});