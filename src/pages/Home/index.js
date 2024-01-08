import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../../components/Header';
import Metricas from '../../components/Metricas';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header name='João Lucas'/>
      <Metricas/>
      <Text>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    
  },
});
