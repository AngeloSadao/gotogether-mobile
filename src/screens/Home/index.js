import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';

import styles from './style';

export default function App() {
  const [modalVisible, setModalVisible] =
    useState(true);

  return (
    <View style={styles.container}>
      {/* BOTÃO ABRIR */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          Abrir modal
        </Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>
              Olá, Thissyane
            </Text>

            <Text style={styles.text}>
              Precisa de uma carona?
            </Text>
            <Text style={styles.text2}>
              Para onde você vai?
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text style={{ color: '#fff' }}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}