import { StyleSheet, Text, View } from 'react-native';


export default function Metricas({pedidos, garcons, mesas}) {
  return (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Pedidos</Text>
            <Text style={styles.itemText}>{pedidos}</Text>
            <Text style={styles.itemText}>9 pedido(s)</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Garçons</Text>
            <Text style={styles.itemText}>{garcons}</Text>
            <Text style={styles.itemText}>5 online</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Mesas</Text>
            <Text style={styles.itemText}>{mesas}</Text>
            <Text style={styles.itemText}>2 livre(s)</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flexDirection:'row',
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
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
    itemTitle:{
        fontSize:16,
        fontWeight: 'bold'
    },
    itemText: {
        flexDirection: 'row'
    }
})