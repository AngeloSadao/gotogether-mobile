import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Inicial from '../screens/Inicial';
import CadastroPassageiro from '../screens/CadastroPassageiro';
import HomePassageiro from '../screens/HomePassageiro';
import LoginPassageiro  from '../screens/LoginPassageiro';

import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#004cff',
        },

        headerTintColor: '#ffffffff',

        drawerStyle: {
          backgroundColor: '#5e0303',
          width: 260,
        },
      }}
    >
      <Drawer.Screen
        name="HomePassageiro"
        component={HomePassageiro}
      />

      <Drawer.Screen
        name="Inicial"
        component={Inicial}
        options={{
          headerLeft: () => null,
          swipeEnabled: false,
          headerShown: false
        }}
      />

      <Drawer.Screen
        name="CadastroPassageiro"
        component={CadastroPassageiro}
        options={{
          headerLeft: () => null,
          swipeEnabled: false,
          headerShown: false
        }}
      />

      <Drawer.Screen
        name="LoginPassageiro"
        component={LoginPassageiro}
        options={{
          headerLeft: () => null,
          swipeEnabled: false,
          headerShown: false
        }}
      />

    </Drawer.Navigator>
  );
}