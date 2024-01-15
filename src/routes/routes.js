import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/home";
import Equipamentos from '../pages/Equipamentos';
import Solicitacao from '../pages/solicitacao';


const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Solicitacao" component={Solicitacao}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Equipamentos" component={Equipamentos}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;