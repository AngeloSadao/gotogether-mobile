import { StyleSheet } from 'react-native';

export default StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },

  button: {
    backgroundColor: '#435E91',
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  modalContainer: {
    height: '25%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: '#526EAA',
    borderTopWidth: 10,
    padding: 20,
    alignItems: 'center',
  },

  title: {
    marginTop: -30,
    fontSize: 64,
    marginBottom: -50,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  text: {
    fontSize: 32,
    marginBottom: -40,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  text2: {
    fontSize: 32,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  closeButton: {
    backgroundColor: '#435E91',
    padding: 10,
    borderRadius: 8,
  },

  input: {
   width: '90%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },

  mapContainer: {
    width: '90%',
    height: 350,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
});