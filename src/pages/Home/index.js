import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header';
import Metricas from '../../components/Metricas';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header name='João Lucas'/>
      <Metricas/>
      <Text style={styles.title}>Últimos pedidos</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginEnd:16,
    marginStart:16
  }
});
