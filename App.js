import React from 'react';
import Routes from './src/routes';

import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const [fontsLoaded] = useFonts({
    Gurajada: require('./assets/fonts/Gurajada-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
  <NavigationContainer>
    <Routes/>;
  </NavigationContainer>
    );
}