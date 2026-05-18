import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#0F172A',
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});