import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import Header from '../../components/Header';


export default function Solicitacao({ navigation, route }) {
    const [item, setItem] = useState()
    const [cidade, setCidade] = useState()
    const [itemList, setItemList] = useState([])
    const [cidadeList, setCidadeList] = useState([])
    const [quantidade, setQuantidade] = useState(1)
    const [observacao, setObservacao] = useState()
    const [isFocus, setIsFocus] = useState(false);

    const [solicitacao, setSolicitacao] = useState({
        item: item,
        cidade: cidade,
        quantidade: quantidade,
        observacao: observacao

    })
    const getiItems = () => {

        fetch("http://localhost:3030/items/1")
            .then(res => res.json())
            .then(dados => {
                console.log('dados')
                console.log(dados)
                setItemList(dados)

            })
    }

    const getiCidades = () => {

        fetch("http://localhost:3030/cidades")
            .then(res => res.json())
            .then(dados => {
                console.log('dados')
                console.log(dados)
                setCidadeList(dados)

            })
    }

    const lancarSolicitacao = (solicitacaoData) => {
        fetch(`http://localhost:3030/solicitacao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitacaoData)
        })
            .then(res => {
                if (res.ok) {
                    console.log('Solicitação lançada') //depois vou colocar um get clientes aqui quando o metodo estiver pronto

                }

            })
    }

    useEffect(() => {
        getiItems()
        getiCidades()

    }, [])

    return (
        <View style={styles.container}>
            <Header profile={false} back={true} screenName='Solicitação' navigateToHome={() => navigation.navigate('Home')} />
            <TouchableOpacity style={styles.actionButton} onPress={() => lancarSolicitacao({
                itemId: item,
                cidadeId: cidade,
                quantidade: quantidade,
                observacao: observacao,
                usuarioId: 1
            })}>
                <text style={styles.buttonTitle}>Enviar</text>
            </TouchableOpacity>

            <StatusBar style="auto" />
            <Text style={styles.title}>Formulário</Text>

            <View style={{ paddingHorizontal: 16 }}>
                <Text>Item</Text>
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
                    searchPlaceholder="Search..."
                    value={item}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={itemNew => {
                        setItem(itemNew.value);
                        setIsFocus(false);
                    }}
                />
                <Text>Unidade de destino</Text>
                <Dropdown

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
                    searchPlaceholder="Search..."
                    value={cidade}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={cidadeNew => {
                        setCidade(cidadeNew.value);
                        setIsFocus(false);
                    }}
                />
                <Text>Quantidade</Text>
                <View style={styles.quantityButton}>
                    <TouchableOpacity onPress={() => { quantidade > 1 ? setQuantidade(quantidade - 1) : console.log(quantidade) }}>
                        <FontAwesome5 name="minus" size={15} color={quantidade > 1 ? "black" : "gray"} />
                    </TouchableOpacity>

                    <TextInput placeholder='1' value={quantidade} keyboardType='numeric' style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }} onChangeText={quantidadeNew => { setQuantidade(parseInt(quantidadeNew)) }} />

                    <TouchableOpacity onPress={() => { setQuantidade(quantidade + 1) }}>
                        <FontAwesome5 name="plus" size={15} color="black" />
                    </TouchableOpacity>
                </View>

                <Text>Observação</Text>
                <TextInput style={styles.textArea} multiline={true} value={observacao} placeholder='Insira uma observação' placeholderTextColor={'gray'} onChangeText={observacaoNew => { setObservacao(observacaoNew) }} />
            </View>

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
        position: 'absolute',
        bottom: 20,
        zIndex: 99,
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'poppins',
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
        width: '50%',

    },
    textArea: {
        flexDirection: 'row',
        height: 150,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,


    }
});
