import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  PanResponder,
  Easing,
  ScrollView,
} from 'react-native';

import 'leaflet/dist/leaflet.css';
import { useNavigation } from '@react-navigation/native';

import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
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

// ÍCONE DO MOTORISTA (CARRINHO)
const carIcon = new L.divIcon({
  html: '<div style="font-size: 30px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">🚗</div>',
  className: 'car-icon-wrapper',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// COMPONENTE QUE ATUALIZA A VISTA DO MAPA
function AtualizarMapa({ origem, destino }) {
  const map = useMap();

  useEffect(() => {
    if (origem && destino) {
      map.fitBounds([origem, destino], { padding: [50, 50] });
    } else if (origem) {
      map.setView(origem, 14);
    }
  }, [origem, destino]);

  return null;
}
export default function HomePassageiro({ route }) {
  const nome = route.params?.nome ?? 'Usuário';

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [coordMotorista, setCoordMotorista] = useState([-24.4979, -47.8449]); // posição simulada

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

  const alturas = {
    1: 220,
    2: 450,
    3: 550,
  };

  const alturaVisivel = 50;

  const fechadoY = alturas[etapa] - alturaVisivel;

  const startY = useRef(0);

  // AUTOCOMPLETE E ROTA
  const [origemTexto, setOrigemTexto] = useState('');
  const [destinoTexto, setDestinoTexto] = useState('');
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [coordOrigem, setCoordOrigem] = useState(null);
  const [coordDestino, setCoordDestino] = useState(null);
  const [rota, setRota] = useState([]);

  async function buscarSugestoes(texto, tipo) {
    if (texto.length < 3) {
      if (tipo === 'origem') setSugestoesOrigem([]);
      else setSugestoesDestino([]);
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${texto}&countrycodes=br`;
      const resposta = await fetch(url, {
        headers: { 'Accept-Language': 'pt-BR' },
      });
      const dados = await resposta.json();

      if (tipo === 'origem') setSugestoesOrigem(dados);
      else setSugestoesDestino(dados);
    } catch (erro) {
      console.log('Erro:', erro);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      buscarSugestoes(origemTexto, 'origem');
    }, 1000);
    return () => clearTimeout(timer);
  }, [origemTexto]);

  useEffect(() => {
    const timer = setTimeout(() => {
      buscarSugestoes(destinoTexto, 'destino');
    }, 1000);
    return () => clearTimeout(timer);
  }, [destinoTexto]);

  async function calcularRota(cOrigem, cDestino) {
    if (!cOrigem || !cDestino) return;

    const url =
      'https://router.project-osrm.org/route/v1/driving/' +
      cOrigem[1] + ',' + cOrigem[0] + ';' +
      cDestino[1] + ',' + cDestino[0] +
      '?overview=full&geometries=geojson';

    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (dados.routes.length > 0) {
        const coords = dados.routes[0].geometry.coordinates;
        const latlngs = coords.map(c => [c[1], c[0]]);
        setRota(latlngs);
      }
    } catch (erro) {
      console.log('Erro rota:', erro);
    }
  }

  useEffect(() => {
    if (coordOrigem && coordDestino) {
      calcularRota(coordOrigem, coordDestino);
    }
  }, [coordOrigem, coordDestino]);

  useEffect(() => {
    if (rota.length === 0) return;

    let indice = 0;

    const intervalo = setInterval(() => {
      if (indice >= rota.length) {
        clearInterval(intervalo);
      return;
      }

      setCoordMotorista(rota[indice]);
      indice++;
    }, 200); // velocidade: menor = mais rápido

  return () => clearInterval(intervalo);
}, [rota]);

  function mudarEtapa(novaEtapa) {
    const novaAltura = alturas[novaEtapa];

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {

      setEtapa(novaEtapa);

      translateY.setValue(0);

      Animated.parallel([
        Animated.timing(alturaAnim, {
          toValue: novaAltura,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
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
      let novoValor = startY.current + gesture.dy;

      if (novoValor < 0) novoValor = 0;
      if (novoValor > fechadoY) novoValor = fechadoY;

      translateY.setValue(novoValor);
    },

    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy > 80 || gesture.vy > 1.2) {
        Animated.timing(translateY, {
          toValue: fechadoY,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          easing: Easing.out(Easing.cubic),
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
          center={[-24.4979, -47.8449]}
          zoomControl={false}
          attributionControl={false}
          zoom={16}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {coordOrigem && (
            <Marker position={coordOrigem} icon={icon}>
              <Popup>Origem</Popup>
            </Marker>
          )}

          {coordDestino && (
            <Marker position={coordDestino} icon={icon}>
              <Popup>Destino</Popup>
            </Marker>
          )}

          {coordMotorista && (
            <Marker position={coordMotorista} icon={carIcon}>
              <Popup>Motorista</Popup>
            </Marker>
          )}

          {rota.length > 0 && (
            <Polyline positions={rota} color="blue" weight={5} />
          )}

          <AtualizarMapa origem={coordOrigem} destino={coordDestino} />

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
            transform: [{ translateY: translateY }],
          },
        ]}
      >

        <View style={styles.dragHandle} />

        <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>

          {etapa === 1 && (
            <>
              <Text style={styles.title} numberOfLines={2} adjustsFontSizeToFit>
                Olá, <Text style={styles.titleNome}>{nome}!</Text>
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
                value={origemTexto}
                onChangeText={setOrigemTexto}
              />

              {sugestoesOrigem.length > 0 && (
                <ScrollView style={styles.sugestaoLista} nestedScrollEnabled>
                  {sugestoesOrigem.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.sugestaoItem}
                      onPress={() => {
                        const coord = [
                          parseFloat(item.lat),
                          parseFloat(item.lon),
                        ];
                        setCoordOrigem(coord);
                        setOrigem(item.display_name);
                        setOrigemTexto(item.display_name);
                        setSugestoesOrigem([]);
                      }}
                    >
                      <Text style={styles.sugestaoTexto}>
                        {item.display_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              <Text style={styles.labelInput}>
                Você vai para:
              </Text>

              <TextInput
                style={styles.inputField}
                placeholder="Destino"
                value={destinoTexto}
                onChangeText={setDestinoTexto}
              />

              {sugestoesDestino.length > 0 && (
                <ScrollView style={styles.sugestaoLista} nestedScrollEnabled>
                  {sugestoesDestino.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.sugestaoItem}
                      onPress={() => {
                        const coord = [
                          parseFloat(item.lat),
                          parseFloat(item.lon),
                        ];
                        setCoordDestino(coord);
                        setDestino(item.display_name);
                        setDestinoTexto(item.display_name);
                        setSugestoesDestino([]);
                      }}
                    >
                      <Text style={styles.sugestaoTexto}>
                        {item.display_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

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
                <Text style={styles.buttonText}>→</Text>
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
                  {origemTexto}
                </Text>
              </View>

              <Text style={styles.labelInput}>
                Destino em comum:
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {destinoTexto}
                </Text>
              </View>

              {(preferencias.motoristaMasculino || preferencias.motoristaFeminino || preferencias.comPet || preferencias.maisDeUma) && (
                <>
                  <Text style={styles.labelInput}>
                    Preferências selecionadas:
                  </Text>

                  {preferencias.motoristaMasculino && (
                    <Text style={styles.infoText}>• Motorista do sexo masculino</Text>
                  )}

                  {preferencias.motoristaFeminino && (
                    <Text style={styles.infoText}>• Motorista do sexo feminino</Text>
                  )}

                  {preferencias.comPet && (
                    <Text style={styles.infoText}>• Carona com pet</Text>
                  )}

                  {preferencias.maisDeUma && (
                    <Text style={styles.infoText}>• Carona para mais de uma pessoa</Text>
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