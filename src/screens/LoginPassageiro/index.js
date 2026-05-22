import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TextComponent,
  Image,
  ImageBackground,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

export default function LoginPassageiro({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [tipoUsuario, setTipoUsuario] =
  useState('passageiro');

  function logar() {
    /*if (!email || !senha) {
      return Alert.alert('Preencha todos os campos');
    }*/

    Alert.alert('Passageiro cadastrado!');

    setEmail('');
    setSenha('');

    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/backgroundGoTogether.png')} 
      style={styles.background}
      resizeMode="stretch"
      >

      <Text style={styles.title}>
        Entrar na sua conta
      </Text>
      <Text style={styles.title2}>
        Que bom que você voltou!
      </Text>
      
      <View style={styles.containerInput}>
      <Text style={styles.text}>Email</Text>
      <View style={styles.input}>

      <Ionicons name="mail-outline" size={24} color="#81A1DF" />

      <TextInput
        style={styles.inputText}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      </View>

      <Text style={styles.text}>Senha</Text>
      <View style={styles.input}>

        <Ionicons name="lock-closed-outline" size={24} color="#81A1DF" />

      <TextInput
        style={styles.inputText}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={!showPassword}
      />

      <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#6C92E6"
          />
        </TouchableOpacity>
      </View>
      <Text
      style={{
        fontFamily: 'Gurajada',
        fontSize: 24,
        color: '#435E91',
        marginLeft: 130,
        marginBottom: -17,
      }}>
      Esqueci minha senha
      </Text>

      <View style={styles.radioContainer}>
  {/* PASSAGEIRO */}
  <TouchableOpacity
    style={styles.option}
    onPress={() =>
      setTipoUsuario('passageiro')
    }
  >
    <Text
      style={[
        styles.radioText,
        tipoUsuario === 'passageiro' &&
          styles.activeText
      ]}
    >
      Sou passageiro
    </Text>

    <View
      style={[
        styles.circle,
        tipoUsuario === 'passageiro'
          ? styles.activeCircle
          : styles.inactiveCircle
      ]}
    />
  </TouchableOpacity>

  {/* MOTORISTA */}
  <TouchableOpacity
    style={styles.option}
    onPress={() =>
      setTipoUsuario('motorista')
    }
  >
    <Text
      style={[
        styles.radioText,
        tipoUsuario === 'motorista' &&
          styles.activeText
      ]}
    >
      Sou motorista
    </Text>

    <View
      style={[
        styles.circle,
        tipoUsuario === 'motorista'
          ? styles.activeCircle
          : styles.inactiveCircle
      ]}
    />
  </TouchableOpacity>
      </View>

      <TouchableOpacity
    style={styles.button}
    onPress={logar}
  >
      <Text style={styles.buttonText}>
        Entrar
      </Text>
    </TouchableOpacity>

      </View>
      </ImageBackground>
    </View>
  );
}