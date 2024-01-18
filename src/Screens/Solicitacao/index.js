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
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../Services/FireBaseConfig';

export default function Solicitacao({ navigation }) {
    const [item, setItem] = useState()
    const [itemList, setItemList] = useState([])

    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                var list = [];
                const querySnapshot = await getDocs(collection(db, "equipamentos"));
                querySnapshot.forEach((doc) => {
                    list.push({ label: doc.get('descricao'), value: doc.get('descricao') });
                });
                setItemList(list);
                console.log(list);
            } catch (error) {
                console.error("Erro ao obter dados:", error);
            }
        };
    
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Header profile={false} back={true} screenName='Solicitação' navigateToHome={() => navigation.navigate('Home')} />
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Home')}>
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
                    data={itemList}
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
                        setItem(itemNew);
                        setIsFocus(false);
                    }}
                />
                <View style={styles.quantityButton}>
                    <TouchableOpacity>
                        <FontAwesome5 name="minus" size={15} color="black" />
                    </TouchableOpacity>

                    <TextInput placeholder='1' keyboardType='numeric' style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }} />

                    <TouchableOpacity>
                        <FontAwesome5 name="plus" size={15} color="black" />
                    </TouchableOpacity>
                </View>
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
        color:'black'
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
        alignSelf: 'center'
    }
});
