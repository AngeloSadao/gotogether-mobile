import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { DrawerContentScrollView } from '@react-navigation/drawer';

import styles from './styles';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>

        <Text style={styles.title}>
          Meu Aplicativo
        </Text>


        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('Home')
          }
        >
          <Text style={styles.buttonText}>
            Home
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('Inicial')
          }
        >
          <Text style={styles.buttonText}>
            Tela Inicial
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('CadastroPassageiro')
          }
        >
          <Text style={styles.buttonText}>
            Cadastro
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('LoginPassageiro')
          }
        >
  <Text style={styles.buttonText}>
    Login
  </Text>
</TouchableOpacity>


      </View>
    </DrawerContentScrollView>
  );
}