import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../Screens/Home";
import Solicitacao from '../Screens/Solicitacao';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import { useState } from 'react';
import React from 'react';
import Categoria from '../Screens/Categoria';


const Stack = createNativeStackNavigator();

function Routes() {
  const [user, setUser] = useState()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Categoria" component={Categoria} />
        <Stack.Screen name="Solicitacao" component={Solicitacao} />
        <Stack.Screen name='Signup' component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;