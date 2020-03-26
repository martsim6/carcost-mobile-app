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
  container:{
    height: '100%',
    width: '100%'
  },
	content: {
    marginLeft: SCREEN_WIDTH * 0.08,
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  caption: {
    color: "#fff",
    fontSize: normalize(25),
    marginBottom: SCREEN_HEIGHT * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
  },
  using: {
    color: '#fff',
    fontSize: normalize(15),
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  usingInput: {
    height: SCREEN_WIDTH * 0.11,
    width: '60%',
    paddingLeft: SCREEN_WIDTH * 0.025,
    marginTop: SCREEN_HEIGHT * 0.01,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f3f3f3',
  },
  usingInputWarn: {
    height: SCREEN_WIDTH * 0.11,
    width: '60%',
    paddingLeft: SCREEN_WIDTH * 0.025,
    marginTop: SCREEN_HEIGHT * 0.01,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'orange',
  },
  usingDropdown: {
    height: SCREEN_WIDTH * 0.11,
    width: '60%',
    paddingLeft: SCREEN_WIDTH * 0.025,
    marginTop: SCREEN_HEIGHT * 0.01,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
  },

  // Footer / confirmation button

  footer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: '40%',
    padding: SCREEN_WIDTH * 0.045,
    marginTop: SCREEN_HEIGHT * 0.07,
    borderRadius: 10,
    borderColor: '#ff8400',
    borderWidth: 2,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ff8400',
  },
});