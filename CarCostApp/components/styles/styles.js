import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d241f',
  },
  statusbar: {
    backgroundColor: "#FFCE00",
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
    fontSize: 28,
    fontWeight: '900',
  },

  // Top buttons settings

  buttonsMenu:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  topButtons: {
    padding: 20,
    borderRadius: 5,
    borderBottomColor: "#ff8400",
    borderBottomWidth: 2,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  }, 

  // Main content
});