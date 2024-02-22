import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { auth } from '../../Services/FireBaseConfig';


export default function Categoria({ navigation, route }) {
    const { categoria, screenName } = route.params
    const [solicitacoes, setSolicitacoes] = useState([])
    const [loading, setLoading] = useState(false)



    const getSolicitacoes = () => {

        fetch(`https://40a2-191-5-206-33.ngrok-free.app/solicitacoes/categoria/${categoria}/usuario/${auth.currentUser.email}`)
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
        let dia = data.getUTCDate();
        let mes = data.getUTCMonth() + 1; // Os meses começam do zero, então adicionamos 1
        if (dia < 10) {
            dia = `0${dia}`
        }
        if (mes < 10) {
            mes = `0${mes}`
        }
        const ano = data.getUTCFullYear();

        // Formatar a data no estilo desejado (dia/mês/ano)
        const dataFormatada = `${dia}/${mes}/${ano}`;

        return dataFormatada;
    }

    useEffect(() => {
        setLoading(true)
        getSolicitacoes()

    }, [])
    return (
        <View style={styles.container}>
            <Header profile={false} back={true} screenName={screenName} navigateTo={() => navigation.navigate('Home')} />
            <Loading loading={loading} />
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Solicitacao', { tipo: `${categoria}`, screenName:screenName})}>
                <Text style={styles.buttonTitle}>Solicitar</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
            <Text style={styles.title}>Últimas solicitações</Text>
            <View style={styles.news}>
                {
                    Array.isArray(solicitacoes)? (

                        solicitacoes.map((solicitacao, index) => (
                            <Pressable style={styles.bloco} key={index} onPress={() => navigation.navigate('Solicitacao', { tipo: `${categoria}`, screenName:screenName, solicitacaoId:solicitacao.id})}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.subtitle}>{solicitacao.quantidade}x </Text>
                                    <Text style={styles.subtitle}>{solicitacao.item.descricao}</Text>
                                    <Text style={styles.subtitle}> para {solicitacao.cidade.descricao}</Text>
                                </View>
                                <View style={styles.informacao}>
                                    <Text style={styles.status}>{solicitacao.status.descricao}</Text>
                                    <Text style={styles.datahora}>{formatarData(solicitacao.dataCriacao)}</Text>
                                </View>
                            </Pressable>
                        )
                        )
                    ) : (
                        <View style={styles.bloco}>
                            <Text style={styles.subtitle}>Nenhuma solicitação por enquanto</Text>
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
