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
        <Stack.Screen name="Equipamentos" component={(props) => <Equipamentos {...props} user={user} />} />
        <Stack.Screen name="Solicitacao" component={(props) => <Solicitacao {...props} user={user} />} />
        <Stack.Screen name="Home" component={(props) => <Home {...props} user={user} />} />
        <Stack.Screen name='Login' component={(props) => <Login {...props} user={user} />} />
        <Stack.Screen name='Signup' component={(props) => <Signup {...props} user={user} />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;