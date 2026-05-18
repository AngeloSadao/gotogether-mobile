import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from './style';

export default function LoginPassageiro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function logar() {
    if (!email || !senha) {
      return Alert.alert('Preencha todos os campos');
    }

    Alert.alert('Passageiro cadastrado!');

    setEmail('');
    setSenha('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Cadastro de Passageiro
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={nome}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={telefone}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={logar}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
         </TouchableOpacity>
    </View>
  );
}