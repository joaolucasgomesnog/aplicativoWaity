import React from 'react';
import Routes from "./src/routes/routes";
import { useFonts } from 'expo-font';



export default function App() {
  let [fontsLoaded] = useFonts({
    'poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  }
  );

  if (fontsLoaded) {
    return <Routes />
  }
  
}
