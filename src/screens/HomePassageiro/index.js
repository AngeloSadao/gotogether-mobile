import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from 'react-leaflet';

import styles from './style';

// ÍCONE
const icon = new L.Icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function HomePassageiro() {
  const [modalVisible, setModalVisible] =
    useState(true);

  const [origemTexto, setOrigemTexto] =
    useState('');

  const [destinoTexto, setDestinoTexto] =
    useState('');

  const [origem, setOrigem] =
    useState(null);

  const [destino, setDestino] =
    useState(null);

  const [rota, setRota] =
    useState([]);

  async function buscarLocal(
    texto,
    tipo
  ) {
    if (!texto) return;

    try {
      const resposta =
        await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${texto}&countrycodes=br`
        );

      const dados =
        await resposta.json();

      if (dados.length > 0) {
        const coord = [
          parseFloat(dados[0].lat),
          parseFloat(dados[0].lon)
        ];

        if (tipo === 'origem') {
          setOrigem(coord);
        } else {
          setDestino(coord);
        }
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  async function calcularRota() {
    if (!origem || !destino)
      return;

    const url =
      'https://router.project-osrm.org/route/v1/driving/' +
      origem[1] +
      ',' +
      origem[0] +
      ';' +
      destino[1] +
      ',' +
      destino[0] +
      '?overview=full&geometries=geojson';

    const resposta =
      await fetch(url);

    const dados =
      await resposta.json();

    if (dados.routes.length > 0) {
      const route =
        dados.routes[0];

      const coords =
        route.geometry.coordinates;

      const latlngs =
        coords.map(c => [
          c[1],
          c[0]
        ]);

      setRota(latlngs);
    }
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          setModalVisible(true)
        }
      >
        <Text style={styles.buttonText}>
          Abrir modal
        </Text>
      </TouchableOpacity>

      {/* INPUT ORIGEM */}
      <TextInput
        placeholder="Digite a origem"
        value={origemTexto}
        onChangeText={
          setOrigemTexto
        }
        onBlur={() =>
          buscarLocal(
            origemTexto,
            'origem'
          )
        }
        style={styles.input}
      />

      {/* INPUT DESTINO */}
      <TextInput
        placeholder="Digite destino"
        value={destinoTexto}
        onChangeText={
          setDestinoTexto
        }
        onBlur={() =>
          buscarLocal(
            destinoTexto,
            'destino'
          )
        }
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={calcularRota}
      >
        <Text style={styles.buttonText}>
          Buscar rota
        </Text>
      </TouchableOpacity>

      {/* MAPA */}
      <View style={styles.mapContainer}>
        <MapContainer
          center={[-24.6, -47.6]}
          zoom={7}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {origem && (
            <Marker
              position={origem}
              icon={icon}
            >
              <Popup>
                Origem
              </Popup>
            </Marker>
          )}

          {destino && (
            <Marker
              position={destino}
              icon={icon}
            >
              <Popup>
                Destino
              </Popup>
            </Marker>
          )}

          {rota.length > 0 && (
            <Polyline
              positions={rota}
              color="blue"
            />
          )}
        </MapContainer>
      </View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.overlay}>
          <View
            style={
              styles.modalContainer
            }
          >
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
              style={
                styles.closeButton
              }
              onPress={() =>
                setModalVisible(
                  false
                )
              }
            >
              <Text
                style={{
                  color: '#fff'
                }}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}