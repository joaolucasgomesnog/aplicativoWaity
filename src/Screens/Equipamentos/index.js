import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import Header from '../../components/Header';


export default function Equipamentos({navigation}) {
    return (
        <View style={styles.container}>
            <Header profile={false} back={true} screenName='Equipamentos'  navigateToHome={() => navigation.navigate('Home')}/>
            <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate('Solicitacao')}>
                <text style={styles.buttonTitle}>Solicitar</text>
            </TouchableOpacity>

            <StatusBar style="auto" />
            <Text style={styles.title}>Últimas solicitações</Text>
            <View style={styles.news}>

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
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily:'poppins',
        flex: 1,
        backgroundColor: '#f6f6f6',



    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginEnd: 16,
        marginStart: 16,
        paddingBottom: 15
    },
    buttonTitle:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    news: {
        gap: 20
    },
    bloco: {

        borderBottomColor: 'gray',
        borderBottomWidth: (StyleSheet.hairlineWidth),
        marginStart: 10,
        marginEnd: 10,
        paddingEnd: 5,
        paddingStart: 5

    },
    datahora: {
        fontSize: 10,
        fontWeight: 700,
        color: 'gray',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    subtitle: {
        fontWeight: '400'
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'red'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemText: {
        flexDirection: 'row'
    },
    menu: {
        marginStart: 16,
        marginEnd: 16,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    actionButton: {
        backgroundColor: '#821E1B',
        paddingHorizontal: 18,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        position: 'absolute',
        bottom: 20,
        zIndex: 99,
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'poppins',
        color: 'white'
    },
});
