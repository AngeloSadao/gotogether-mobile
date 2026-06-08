import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
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

  const [etapa, setEtapa] = useState(1);

  const navigation = useNavigation();

  const slideAnim = useRef(
    new Animated.Value(300)
  ).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  function abrirEtapa2() {

    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {

      setEtapa(2);

      slideAnim.setValue(300);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();

    });
  }

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
        style={[
          styles.bottomSheet,
          {
            transform: [
              {
                translateY: slideAnim,
              },
            ],
          },
        ]}
      >

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
              onPress={abrirEtapa2}
            >
              <Text style={styles.buttonText}>
                Digite aqui
              </Text>
            </TouchableOpacity>
          </>
        )}

        {etapa === 2 && (
          <>
            <Text style={styles.text}>
              Etapa 2
            </Text>

            <Text>
              Aqui entrarão:
            </Text>

            <Text>
              • Origem
            </Text>

            <Text>
              • Destino
            </Text>

            <Text>
              • Preferências
            </Text>
          </>
        )}

      </Animated.View>

    </View>
  );
}