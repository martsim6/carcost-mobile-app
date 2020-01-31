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
    justifyContent: 'flex-start',
    width: '100%',
  },
  topButtons: {
    padding: 20,
    borderRadius: 5,
    borderBottomColor: "#ff8400",
    borderBottomWidth: 2,
    alignItems: 'center',
    width: '33%',
  },
  topButtonsMiddle: {
    padding: 20,
    borderBottomColor: "#ff8400",
    borderBottomWidth: 2,
    alignItems: 'center',
    width: '33%',
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  }, 

  // Main content

  content: {
    marginLeft: 25,
    marginTop: 25,
    color: '#fff',
  },
  caption: {
    color: "#fff",
    fontSize: 25,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  using: {
    color: '#fff',
    fontSize: 15,
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