import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  // GERAL
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  // MAPA
  mapContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  // DRAWER
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

  // PAINEL INFERIOR
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderTopWidth: 10,
    borderColor: '#435E91',
    padding: 20,
    alignItems: 'center',
  },

  dragHandle: {
    width: 60,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#d0d0d0',
    marginBottom: 5,
  },

  // PAINEL - ETAPA 1
  title: {
    lineHeight: 40,
    fontSize: 64,
    fontFamily: 'Gurajada',
    userSelect: 'none',
  },

  titleNome: {
    color: '#435E91',
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

  // PAINEL - ETAPA 2
  labelInput: {
    fontSize: 18,
    fontFamily: 'Gurajada',
    alignSelf: 'flex-start',
    marginTop: 8,
    color: '#333',
  },

  inputField: {
    borderWidth: 1,
    borderColor: '#468B5B',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 4,
    fontSize: 16,
    fontFamily: 'Gurajada',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },

  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Gurajada',
    color: '#333',
  },

  checkboxAtivo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#468B5B',
    borderWidth: 1,
    borderColor: '#468B5B',
  },

  checkboxInativo: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aaa',
  },

  // PAINEL - ETAPA 3
  infoRow: {
    borderWidth: 1,
    borderColor: '#435E91',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 4,
  },

  infoText: {
    fontSize: 16,
    fontFamily: 'Gurajada',
    color: '#333',
  },

  // BOTÕES
  button: {
    backgroundColor: '#435E91',
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
  },

  // SUGESTÕES DE AUTOCOMPLETE
  sugestaoLista: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 4,
    maxHeight: 120,
    overflow: 'hidden',
  },

  sugestaoItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  sugestaoTexto: {
    fontSize: 13,
    fontFamily: 'Gurajada',
    color: '#333',
  },

});