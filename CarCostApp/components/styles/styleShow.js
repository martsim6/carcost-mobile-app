import { StyleSheet } from 'react-native';

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
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 40,
  },
  caption: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 50,
  },
  data: {
    color: '#ff8400',
  }
});