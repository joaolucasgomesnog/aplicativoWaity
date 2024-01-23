import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../Screens/Home";
import Equipamentos from '../Screens/Equipamentos';
import Solicitacao from '../Screens/Solicitacao';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import { useState } from 'react';


const Stack = createNativeStackNavigator();

function Routes() {
  const [user, setUser] = useState()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name="Equipamentos" component={Equipamentos} />
        <Stack.Screen name="Solicitacao" component={Solicitacao} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Signup' component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;