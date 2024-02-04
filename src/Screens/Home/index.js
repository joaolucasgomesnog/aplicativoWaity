import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Clock } from '@expo/vector-icons'
import Header from '../../components/Header';
import Metricas from '../../components/Metricas';
import { setCustomText } from 'react-native-global-props';
import { useState, useEffect} from 'react';

export default function Home({ navigation }) {
  const [categorias, setCategorias] = useState([])
  const customTextProps = {
    style: {
      fontFamily: 'Poppins'
    }
  }

  const getCategorias = () => {

    fetch("https://7614-186-211-230-19.ngrok-free.app/categorias")
      .then(res => res.json())
      .then(dados => {
        console.log(dados)
        setCategorias(dados)
      })
  }

  useEffect(() => {
    getCategorias()

  },[])

  return (
    <View style={styles.container}>
      <Header name={'João Lucas'} profile={true}  />
      <View style={styles.categorys}>
        {
          categorias.map((opcao) =>
            <TouchableOpacity style={styles.category} activeOpacity={100} onPress={() => navigation.navigate('Categoria',{categoria: opcao.id, screenName: opcao.descricao})}>
              <Text style={styles.itemTitle}>{opcao.descricao}</Text>
              <Text style={styles.itemText}></Text>
              <Text style={styles.itemText}>9 pedido(s)</Text>
            </TouchableOpacity>
          )
        }

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'poppins',
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
  news: {
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
    fontWeight: '700',
    color: 'gray',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  subtitle: {
    fontWeight: '400'
  },
  categorys: {
    fontFamily: 'poppins',
    flexDirection: 'column',
    gap: 10,
    marginTop: -24,
  },
  category: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingStart: 18,
    paddingEnd: 18,
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 4,
    paddingBottom: 22,
    paddingTop: 22,
    zIndex: 99,
    justifyContent: 'space-between'
  },
  item: {

  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  itemText: {
    flexDirection: 'row'
  }
})

