import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePassageiro from '../screens/HomePassageiro';

import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#5e0303',
          width: 260,
        },
      }}
    >
      <Drawer.Screen
        name="HomePassageiro"
        component={HomePassageiro}
        options={{headerShown: false}}
      />

    </Drawer.Navigator>
  );
}