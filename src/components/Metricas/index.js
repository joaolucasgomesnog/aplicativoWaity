import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function Metricas({ pedidos , navigateToEquipamnentos}) {
    return (
        <View style={styles.categorys}>
            <TouchableOpacity style={styles.category} activeOpacity={100} onPress={navigateToEquipamnentos}>
                <Text style={styles.itemTitle}>Equipamentos</Text>
                <Text style={styles.itemText}>{pedidos}</Text>
                <Text style={styles.itemText}>9 pedido(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} activeOpacity={100}>
                <Text style={styles.itemTitle}>Almoxarifado</Text>
                <Text style={styles.itemText}>{pedidos}</Text>
                <Text style={styles.itemText}>9 pedido(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} activeOpacity={100}>
                <Text style={styles.itemTitle}>Material de venda</Text>
                <Text style={styles.itemText}>{pedidos}</Text>
                <Text style={styles.itemText}>9 pedido(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} activeOpacity={100}>
                <Text style={styles.itemTitle}>Relatórios</Text>
                <Text style={styles.itemText}>{pedidos}</Text>
                <Text style={styles.itemText}>9 pedido(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} activeOpacity={100}>
                <Text style={styles.itemTitle}>Brindes</Text>
                <Text style={styles.itemText}>{pedidos}</Text>
                <Text style={styles.itemText}>9 pedido(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} activeOpacity={100}>
                <Text style={styles.itemTitle}>Cartões</Text>
                <Text style={styles.itemText}>{pedidos}</Text>
                <Text style={styles.itemText}>9 pedido(s)</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    categorys: {
        fontFamily:'poppins',
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