import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';

import 'leaflet/dist/leaflet.css';
import { useNavigation } from '@react-navigation/native';

import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';

import styles from './style';

// ÍCONE
const icon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function HomePassageiro() {

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');

  const [preferencias, setPreferencias] = useState({
    motoristaMasculino: false,
    motoristaFeminino: false,
    comPet: false,
    maisDeUma: false,
  });

  function togglePreferencia(chave) {
    setPreferencias(prev => ({
      ...prev,
      [chave]: !prev[chave],
    }));
  }

  const [etapa, setEtapa] = useState(1);

  const navigation = useNavigation();

  const alturaAnim = useRef(
    new Animated.Value(220)
  ).current;

  const translateY = useRef(
    new Animated.Value(0)
  ).current;

  const fadeAnim = useRef(
    new Animated.Value(1)
  ).current;


  const alturaPainel = {
  1: 220,
  2: 450,
  3: 450,
  }[etapa];

const fechadoY = alturaAnim._value - 50;

  const startY = useRef(0);

  function mudarEtapa(novaEtapa) {

  const novaAltura = {
    1: 220,
    2: 450,
    3: 450,
  }[novaEtapa];

  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 600,
    useNativeDriver: true,
  }).start(() => {

    setEtapa(novaEtapa);

    translateY.setValue(0);

    Animated.parallel([
      Animated.timing(alturaAnim, {
        toValue: novaAltura,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

  });
}

  const panResponder =
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => {
      return Math.abs(gesture.dy) > 5;
    },

    onPanResponderGrant: () => {
      startY.current = translateY._value;
    },

    onPanResponderMove: (_, gesture) => {

      let novoValor =
        startY.current + gesture.dy;

      if (novoValor < 0) {
        novoValor = 0;
      }

      if (novoValor > fechadoY) {
        novoValor = fechadoY;
      }

      translateY.setValue(novoValor);
    },

    onPanResponderRelease: (_, gesture) => {

      if (gesture.dy > 80) {

        Animated.timing(translateY, {
          toValue: fechadoY,
          duration: 200,
          useNativeDriver: true,
        }).start();

      } else {

        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();

      }
    },
  });

  return (
    <View style={styles.container}>

      {/* MAPA */}
      <View style={styles.mapContainer}>
        <MapContainer
          center = {[-24.4979, -47.8449]}
          zoomControl = {false}
          attributionControl = {false}
          zoom = {16}
          style = {{
            width: '100%',
            height: '100%',
          }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
        </MapContainer>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {/* PAINEL INFERIOR */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomSheet,
          {
            height: alturaAnim,

            transform: [
              {
                translateY: translateY,
              },
            ],
          },
        ]}
      >

        <View style={styles.dragHandle} />

        <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>

        {etapa === 1 && (
          <>
            <Text style={styles.title}>
              Olá, Thissiany!
            </Text>

            <Text style={styles.text}>
              Precisa de uma carona?
            </Text>

            <Text style={styles.text2}>
              Para onde vai?
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => mudarEtapa(2)}
            >
              <Text style={styles.buttonText}>
                Digite aqui
              </Text>
            </TouchableOpacity>
          </>
        )}

        {etapa === 2 && (
          <>
            <Text style={styles.labelInput}>
              Você está em:
            </Text>

            <TextInput
              style={styles.inputField}
              placeholder="Origem"
              value={origem}
              onChangeText={setOrigem}
            />

            <Text style={styles.labelInput}>
              Você vai para:
            </Text>

            <TextInput
              style={styles.inputField}
              placeholder="Destino"
              value={destino}
              onChangeText={setDestino}
            />

            <Text style={styles.labelInput}>
              Preferências:
            </Text>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => togglePreferencia('motoristaMasculino')}
            >
              <Text style={styles.checkboxLabel}>
                Motorista do sexo masculino
              </Text>
              <View style={preferencias.motoristaMasculino ? styles.checkboxAtivo : styles.checkboxInativo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => togglePreferencia('motoristaFeminino')}
            >
              <Text style={styles.checkboxLabel}>
                Motorista do sexo feminino
              </Text>
              <View style={preferencias.motoristaFeminino ? styles.checkboxAtivo : styles.checkboxInativo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => togglePreferencia('comPet')}
            >
              <Text style={styles.checkboxLabel}>
                Carona com pet
              </Text>
              <View style={preferencias.comPet ? styles.checkboxAtivo : styles.checkboxInativo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => togglePreferencia('maisDeUma')}
            >
              <Text style={styles.checkboxLabel}>
                Carona para mais de uma pessoa
              </Text>
              <View style={preferencias.maisDeUma ? styles.checkboxAtivo : styles.checkboxInativo} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => mudarEtapa(3)}
            >
              <Text style={styles.buttonText}>
                →
              </Text>
            </TouchableOpacity>
          </>
        )}

        {etapa === 3 && (
          <>
            <Text style={styles.labelInput}>
              Motorista está em:
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                Prefeitura Municipal de Registro
              </Text>
            </View>

            <Text style={styles.labelInput}>
              Você está em:
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {origem}
              </Text>
            </View>

            <Text style={styles.labelInput}>
              Destino em comum:
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {destino}
              </Text>
            </View>

            {(preferencias.motoristaMasculino || preferencias.motoristaFeminino || preferencias.comPet || preferencias.maisDeUma) && (
              <>
                <Text style={styles.labelInput}>
                  Preferências selecionadas:
                </Text>

                {preferencias.motoristaMasculino && (
                  <Text style={styles.infoText}>
                    • Motorista do sexo masculino
                  </Text>
                )}

                {preferencias.motoristaFeminino && (
                  <Text style={styles.infoText}>
                    • Motorista do sexo feminino
                  </Text>
                )}

                {preferencias.comPet && (
                  <Text style={styles.infoText}>
                    • Carona com pet
                  </Text>
                )}

                {preferencias.maisDeUma && (
                  <Text style={styles.infoText}>
                    • Carona para mais de uma pessoa
                  </Text>
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => mudarEtapa(1)}
            >
              <Text style={styles.buttonText}>
                Confirmar Carona
              </Text>
            </TouchableOpacity>
          </>
        )}
        </Animated.View>
      </Animated.View>

    </View>
  );
}