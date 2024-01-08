import { StyleSheet, Text, View } from 'react-native';


export default function Metricas() {
  return (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Pedidos</Text>
            <Text style={styles.itemText}>8 pedidos</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Garçons</Text>
            <Text style={styles.itemText}>6 online</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Mesas</Text>
            <Text style={styles.itemText}>4 livres</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1,
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