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
    marginLeft: 25,
    marginTop: 25,
  },
  caption: {
    color: "#fff",
    fontSize: normalize(25),
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  using: {
    color: '#fff',
    fontSize: normalize(15),
    marginTop: 25,
  },
  usingInput: {
    paddingLeft: 10,
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    width: '60%',
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#f3f3f3',
  },
  usingDropdown: {
    height: 35,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '60%',
    marginTop: 10,
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
    borderRadius: 10,
    borderColor: '#ff8400',
    borderWidth: 2,
    padding: 14,
    alignItems: 'center',
    marginTop: 55,
  },
  confirmButtonText: {
    color: '#ff8400',
  },
	
});