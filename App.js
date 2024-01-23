
import Routes from "./src/routes/routes";
import { useFonts } from 'expo-font';



export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  }
  );

  if (fontsLoaded) {
    return <Routes />
  }
  
}
