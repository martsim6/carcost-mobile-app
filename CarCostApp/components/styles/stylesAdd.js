import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	content: {
    marginLeft: 25,
    marginTop: 25,
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