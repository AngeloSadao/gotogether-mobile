import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicial from '../screens/Inicial';
import CadastroPassageiro from '../screens/CadastroPassageiro';;
import LoginPassageiro from '../screens/LoginPassageiro';

import DrawerRoutes from './drawer.routes';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Inicial">

      <Stack.Screen
        name="Inicial"
        component={Inicial}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CadastroPassageiro"
        component={CadastroPassageiro}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoginPassageiro"
        component={LoginPassageiro}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={DrawerRoutes}
        headerShown
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}