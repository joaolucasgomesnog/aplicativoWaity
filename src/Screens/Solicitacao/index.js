import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ViewBase,
    ScrollView
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { auth } from '../../Services/FireBaseConfig';



export default function Solicitacao({ navigation, route }) {
    const { tipo, screenName, solicitacaoId } = route.params
    const [item, setItem] = useState()
    const [cidade, setCidade] = useState()
    const [itemList, setItemList] = useState([])
    const [cidadeList, setCidadeList] = useState([])
    const [quantidade, setQuantidade] = useState(1)
    const [observacao, setObservacao] = useState()
    const [status, setStatus] = useState()
    const [statusList, setStatusList] = useState([])
    const [solicitante, setSolicitante] = useState('')
    const [isFocus, setIsFocus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editavel, setEditavel] = useState(true)
    const [itemDisponivel, setItemDisponivel] = useState(true)

    const getiItems = () => {
        fetch(`https://aplicativo-logistica-api.vercel.app/items/${tipo}`)
            .then(res => res.json())
            .then(dados => {
                console.log('dados')
                console.log(dados)
                setItemList(dados)

            })
    }
    

    const getStatusList = () => {
        fetch(`https://aplicativo-logistica-api.vercel.app/status`)
            .then(res => res.json())
            .then(dados => {
                console.log(dados)
                setStatusList(dados)

            })
    }

    const getiCidades = () => {

        fetch("https://aplicativo-logistica-api.vercel.app/cidades")
            .then(res => res.json())
            .then(dados => {
                console.log(dados)
                setCidadeList(dados)

            })
    }
    const getUsuario = () => {

        fetch(`https://aplicativo-logistica-api.vercel.app/usuario/email/${auth.currentUser.email}`)
            .then(res => res.json())
            .then(dados => {
                console.log(auth.currentUser.email)
                console.log(dados)
                setSolicitante(dados)

            })
    }

    const getSolicitacao = () => {
        if (solicitacaoId != null && solicitacaoId != undefined) {
            fetch(`https://aplicativo-logistica-api.vercel.app/solicitacao/${solicitacaoId}`)
                .then(res => res.json())
                .then(dados => {
                    console.log(dados)
                    setItem(dados.itemId)
                    setCidade(dados.cidadeId)
                    setQuantidade(parseInt(dados.quantidade))
                    setObservacao(dados.observacao)
                    setStatus(dados.statusId)
                    setSolicitante(dados.usuario.nome)
                })
        }
    }


    const lancarSolicitacao = (solicitacaoData) => {
        fetch(`https://aplicativo-logistica-api.vercel.app/solicitacao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitacaoData)
        })
            .then(res => {
                if (res.ok) {
                    console.log('Solicitação lançada') //depois vou colocar um get clientes aqui quando o metodo estiver pronto
                    navigation.navigate('Categoria', { categoria: tipo, screenName: screenName })
                }


            })
    }
    const atualizarSolicitacao = (solicitacaoData) => {
        fetch(`https://aplicativo-logistica-api.vercel.app/solicitacao/${solicitacaoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitacaoData)
        })
            .then(res => {
                if (res.ok) {
                    console.log('Solicitação lançada') //depois vou colocar um get clientes aqui quando o metodo estiver pronto
                    navigation.navigate('Categoria', { categoria: tipo, screenName: screenName })
                }


            })
    }
    const handleSolicitacao = () => {
        if (solicitacaoId != null && solicitacaoId != undefined) {
            atualizarSolicitacao({
                status: status
            })
        } else {
            if (itemDisponivel) {
                lancarSolicitacao({
                    itemId: item,
                    cidadeId: cidade,
                    quantidade: quantidade,
                    observacao: observacao,
                    usuarioId: solicitante.id,
                })
            }

        }
    }
    useEffect(() => {
        setLoading(true)
        getiItems()
        getiCidades()
        if (solicitacaoId != null && solicitacaoId != undefined) {
            getStatusList()
            getSolicitacao()
            setEditavel(false)
        }
        else {
            getUsuario()
        }

        setLoading(false)

    }, [])

    return (
        <View style={styles.container}>
            <Header profile={false} back={true} screenName='Solicitação' navigateTo={() => navigation.navigate('Categoria', { categoria: tipo, screenName: screenName })} />
            <Loading loading={loading} />
            <ScrollView>

                <StatusBar style="auto" />
                <Text style={styles.title}>Formulário</Text>

                <View style={{ paddingHorizontal: 16 }}>
                    <Text>Item</Text>
                    <View pointerEvents={editavel ? "auto" : "none"} >
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'red' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={itemList.map(item => ({ label: item.descricao, value: item.id }))}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Selecione um item' : '...'}
                            searchPlaceholder="Buscar..."
                            value={item}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={itemNew => {
                                if (itemList.find((i) => i.id == itemNew.value).disponivel) {
                                    setItemDisponivel(true)
                                } else {
                                    setItemDisponivel(false)
                                }
                                setItem(itemNew.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>
                    <Text>Unidade de destino</Text>
                    <View pointerEvents={editavel ? "auto" : "none"} >
                        <Dropdown
                            pointerEvents={editavel ? "auto" : "none"}
                            style={[styles.dropdown, isFocus && { borderColor: 'red' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={cidadeList.map(item => ({ label: item.descricao, value: item.id }))}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Selecione uma unidade' : '...'}
                            searchPlaceholder="Buscar..."
                            value={cidade}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={cidadeNew => {
                                setCidade(cidadeNew.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>
                    <Text>Quantidade</Text>
                    <View style={styles.quantityButton} pointerEvents={editavel ? "auto" : "none"} >
                        <TouchableOpacity onPress={() => { quantidade > 1 ? setQuantidade(quantidade - 1) : console.log(quantidade) }}>
                            <FontAwesome5 name="minus" size={15} color={quantidade > 1 ? "black" : "gray"} />
                        </TouchableOpacity>

                        <TextInput placeholder='1' value={String(quantidade)} keyboardType='numeric' style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }} onChangeText={quantidadeNew => { setQuantidade(parseInt(quantidadeNew)) }} />

                        <TouchableOpacity onPress={() => { setQuantidade(quantidade + 1) }}>
                            <FontAwesome5 name="plus" size={15} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Text>Observação</Text>
                    <TextInput style={styles.textArea} multiline={true} value={observacao} editable={editavel} placeholder='Insira uma observação' placeholderTextColor={'gray'} onChangeText={observacaoNew => { setObservacao(observacaoNew) }} />
                    {
                        solicitacaoId != null && solicitacaoId != undefined ? (
                            <>
                                <Text style={{ marginTop: 10 }}>Status</Text>
                                <Dropdown

                                    style={[styles.dropdown, isFocus && { borderColor: 'red' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={statusList.map(item => ({ label: item.descricao, value: item.id }))}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Marque um status' : '...'}
                                    searchPlaceholder="Search..."
                                    value={status}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={statusNew => {
                                        setStatus(parseInt(statusNew.value));
                                        setIsFocus(false);
                                    }}
                                />
                                <Text>Solicitante:</Text>
                                <View style={styles.quantityButton}>
                                    <Text>{`${solicitante}`}</Text>
                                </View>
                            </>
                        ) : itemDisponivel != true ? (
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, flexDirection: 'row', gap: 10 }}>
                                <FontAwesome5 name="exclamation-triangle" size={15} color="red" />
                                <Text style={styles.aviso}>Item não disponivel</Text>
                            </View>
                        ) : null

                    }
                <TouchableOpacity style={styles.actionButton} onPress={() => handleSolicitacao()}>
                    <Text style={styles.buttonTitle}>Enviar</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Poppins',
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
        borderColor: 'gray'
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
        marginTop:50,

        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: 'white'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
        color: 'black'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        color: 'gray'
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
    dropdownContainer: {
        flex: 1,
        backgroundColor: '#533483',
        padding: 16,
        justifyContent: 'center',
        alignContent: 'center',
    },
    quantityButton: {
        flexDirection: 'row',
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    textArea: {
        height: 150,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        textAlignVertical: 'top',
        color: 'black'
    },
    aviso: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 16,



    }
});
