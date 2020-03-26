import { StyleSheet } from 'react-native';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

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
    height: '100%',
    backgroundColor: '#1d241f',
  },
  statusbar: {
    height: SCREEN_HEIGHT * 0.034,
    backgroundColor: "#ff8400",
    alignItems: 'center',
  },
  header: {
    height: SCREEN_HEIGHT * 0.085,
    backgroundColor: "#171717",
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
    height: SCREEN_HEIGHT * 0.077,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topButtons: {
    width: '30%',
    padding: SCREEN_HEIGHT * 0.03,
    borderRadius: 5,
    borderBottomColor: "#ff8400",
    borderBottomWidth: 2,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: normalize(11.5),
    color: '#fff',
  },
  icons: {
    width: '24%', 
    height: '110%',
    marginLeft: normalize(5),
    tintColor: "#ff8400",
  },
});