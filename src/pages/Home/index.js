import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Clock } from '@expo/vector-icons'
import Header from '../../components/Header';
import Metricas from '../../components/Metricas';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Header name='João Lucas' profile={true}/>
      <Metricas navigateToEquipamnentos={()=>navigation.navigate('Equipamentos')}/>
      <Text style={styles.title}>Últimas atualizações</Text>
      {/* <View style={styles.news}>

        <View style={styles.bloco}>
          <Text style={styles.subtitle}>Marlon está a caminho com seu pedido</Text>
          <View style={styles.datahora}>
            <Text style={styles.datahora}>11/01/2024</Text>
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitle}>Marlon está a caminho com seu pedido</Text>
          <View style={styles.datahora}>
            <Text style={styles.datahora}>11/01/2024</Text>
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitle}>Marlon está a caminho com seu pedido</Text>
          <View style={styles.datahora}>
            <Text style={styles.datahora}>11/01/2024</Text>
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitle}>Marlon está a caminho com seu pedido</Text>
          <View style={styles.datahora}>
            <Text style={styles.datahora}>11/01/2024</Text>
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitle}>Marlon está a caminho com seu pedido</Text>
          <View style={styles.datahora}>
            <Text style={styles.datahora}>11/01/2024</Text>
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitle}>Marlon está a caminho com seu pedido</Text>
          <View style={styles.datahora}>
            <Text style={styles.datahora}>11/01/2024</Text>
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.subtitle}>Marlon está a caminho com seu pedido</Text>
          <View style={styles.datahora}>
            <Text style={styles.datahora}>11/01/2024</Text>
          </View>
        </View>
      </View> */}
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
    marginEnd: 16,
    marginStart: 16,
    paddingBottom: 15
  },
  news:{
    gap: 20
  },
  bloco: {

    borderBottomColor: 'black',
    borderBottomWidth: (StyleSheet.hairlineWidth),
    marginStart: 10,
    marginEnd: 10,
    paddingEnd: 5,
    paddingStart: 5

  },
  datahora: {
    fontSize: 10,
    fontWeight:700,
    color: 'gray',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  subtitle:{
    fontWeight: '400'
  }
});
