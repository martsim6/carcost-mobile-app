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
  container: {
    flex: 1,
    backgroundColor: '#1d241f',
  },
  statusbar: {
    backgroundColor: "#ff8400",
    height: 20,
    alignItems: 'center',
  },
  header: {
    backgroundColor: "#171717",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ff8400',
    fontSize: normalize(28),
    fontWeight: '900',
  },

  // Top buttons settings

  buttonsMenu:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: normalize(45),
    width: '100%',
  },
  topButtons: {
    padding: 20,
    borderRadius: 5,
    borderBottomColor: "#ff8400",
    borderBottomWidth: 2,
    // alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    fontSize: normalize(12),
    color: '#fff',
  },
  buttonContent:{
    flexDirection: "row",
    justifyContent: 'center',
  },
  icons: {
    width: normalize(16), 
    height: normalize(16),
    marginLeft: 5,
    tintColor: "#ff8400",
  },

  // Main content
});