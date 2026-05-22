import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './style';

export default function Inicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Tela Inicial
      </Text>

      <TouchableOpacity
        style={styles.buttonLoginPassageiro}
        onPress={() =>
          navigation.navigate('LoginPassageiro')
        }
      >
        <Text style={styles.buttonTextLoginPassageiro}>
          Sou Passageiro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonLoginMotorista}
        onPress={() =>
          navigation.navigate('LoginPassageiro')
        }
      >
        <Text style={styles.buttonTextLoginMotorista}>
          Sou Motorista
        </Text>
      </TouchableOpacity>
    </View>
  );
}