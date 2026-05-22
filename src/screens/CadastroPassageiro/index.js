import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from './style';

export default function CadastroPassageiro({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  function cadastrar() {
    /*if (!nome || !telefone) {
      return Alert.alert('Preencha todos os campos');
    } */

    Alert.alert('Passageiro cadastrado!');

    setNome('');
    setTelefone('');

    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro de Passageiro
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrar}
      >
        <Text style={styles.buttonText}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}