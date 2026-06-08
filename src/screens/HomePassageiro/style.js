import { StyleSheet } from 'react-native';

export default StyleSheet.create({
container: {
    flex: 1,
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

  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 220,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderTopWidth: 10,
    borderColor: '#435E91',
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

  mapContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1000,
    padding: 10,
    borderRadius: 10,
  },

  menuIcon: {
    fontSize: 40,
    color: '#435E91',
  },
});