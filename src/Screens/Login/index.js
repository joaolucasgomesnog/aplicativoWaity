import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Header from '../../components/Header';
import Metricas from '../../components/Metricas';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Services/FireBaseConfig';
import Loading from '../../components/Loading';

export default function Login({ navigation }) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                navigation.navigate("Home")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
            setLoading(false)
    }
    return (


        <View style={styles.container}>
            <Loading loading={loading}/>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.logo} source={require('../../shared/logo.png')} resizeMode='contain' resizeMethod='resize' />
                <View style={{ flexDirection: 'column', paddingStart: 10 }}>
                    <Text style={styles.title}>Controle de</Text>
                    <Text style={styles.title}>Logística</Text>
                </View>
            </View>
            <Text style={{ alignSelf: 'flex-start', paddingStart: 30, paddingTop: 30, fontSize: 20, fontWeight: 'bold' }}>Login</Text>
            <View style={{ width: '80%', paddingTop: 20 }}>
                <Text style={styles.label}>Email</Text>
                <View style={{ display: 'flex', borderColor: 'gray', borderBottomWidth: 0.5 }}>

                    <TextInput style={styles.input}
                        placeholder='Insira seu e-mail'
                        placeholderTextColor={'gray'}
                        value={email} onChangeText={(val) => { setEmail(val) }} />

                    <View style={{ position: 'absolute', left: 0, bottom: 2 }}>
                        <FontAwesome5 name="user" size={12} color="gray" />
                    </View>
                </View>
            </View>
            <View style={{ width: '80%' }}>
                <Text style={styles.label}>Senha</Text>
                <View style={{ display: 'flex', borderColor: 'gray', borderBottomWidth: 0.5 }}>

                    <TextInput style={styles.input}
                        placeholder='Insira sua senha'
                        placeholderTextColor={'gray'}
                        value={password} onChangeText={(val) => { setPassword(val) }} />

                    <View style={{ position: 'absolute', left: 0, bottom: 2 }}>
                        <FontAwesome5 name="key" size={12} color="gray" />
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 2 }}>
                        <FontAwesome5 name="eye" size={12} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
                <Text style={{ color: 'white', fontWeight: 500 }}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cadastroButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: 'white', fontWeight: 500 }}>Cadastre-se</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'poppins',
        flexDirection: 'column',
        gap: 20,
        paddingVertical: 70,
        justifyContent: 'center',
        alignItems: 'center'

    },
    logo: {
        width: 100,
        height: 80,
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {


        marginLeft: 14,

    },
    loginButton: {
        backgroundColor: '#821E1B',
        width: '80%',
        paddingVertical: 7,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        zIndex: 99,
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'poppins',
        color: 'white'
    },
    cadastroButton: {
        backgroundColor: 'gray',
        width: '80%',
        paddingVertical: 7,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        zIndex: 99,
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'poppins',
        color: 'white'
    },
    label: {
        fontWeight: '600'
    }
});
