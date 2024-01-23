import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';


export default function Equipamentos({ navigation }) {
    const [solicitacoes, setSolicitacoes] = useState([])
    const [loading, setLoading] = useState(false)
    const getSolicitacoes = () => {

        fetch("https://54b1-186-211-230-19.ngrok-free.app/solicitacoes/categoria/1/usuario/lucasgomes145987@gmail.com")
            .then(res => res.json())
            .then(dados => {
                console.log('dados')
                console.log(dados)
                setSolicitacoes(dados)
                setLoading(false)
            })
    }


    function formatarData(dataUTC) {
        const data = new Date(dataUTC);

        // Obter componentes da data (dia, mês e ano)
        const dia = data.getUTCDate();
        let mes = data.getUTCMonth() + 1; // Os meses começam do zero, então adicionamos 1
        if (mes < 10) {
            mes = `0${mes}`
        }
        const ano = data.getUTCFullYear();

        // Formatar a data no estilo desejado (dia/mês/ano)
        const dataFormatada = `${dia}/${mes}/${ano}`;

        return dataFormatada;
    }

    useEffect(() => {
        getSolicitacoes()

    }, [])
    return (
        <View style={styles.container}>
            <Header profile={false} back={true} screenName='Equipamentos' navigateToHome={() => navigation.navigate('Home')} />
            <Loading loading={loading}/>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Solicitacao')}>
                <Text style={styles.buttonTitle}>Solicitar</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
            <Text style={styles.title}>Últimas solicitações</Text>
            <View style={styles.news}>
                {
                    solicitacoes.map((solicitacao) =>
                        <View style={styles.bloco}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.subtitle}>{solicitacao.quantidade}x </Text>
                                <Text style={styles.subtitle}>{solicitacao.item.descricao}</Text>
                                <Text style={styles.subtitle}> para {solicitacao.cidade.descricao}</Text>
                            </View>
                            <View style={styles.informacao}>
                                <Text style={styles.status}>{solicitacao.status.descricao}</Text>
                                <Text style={styles.datahora}>{formatarData(solicitacao.dataCriacao)}</Text>
                            </View>
                        </View>

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
        marginTop: 16,
        marginEnd: 16,
        marginStart: 16,
        paddingBottom: 15
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
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
    informacao: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        fontSize: 10,
        fontWeight: '700',
        color: 'gray',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end'
    },
    datahora: {
        fontSize: 10,
        fontWeight: '700',
        color: 'gray',
        position: 'absolute',
        right: 0
    },
    status: {
        fontSize: 10,
        fontWeight: '700',
        color: 'gray',
        position: 'absolute',
        left: 0
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
        zIndex: 90,
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'poppins',
        color: 'white'
    },
});
