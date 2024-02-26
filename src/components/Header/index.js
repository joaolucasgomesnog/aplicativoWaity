import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { auth } from '../../Services/FireBaseConfig';
import { signOut } from 'firebase/auth';
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64


export default function Header({ name, profile, back, screenName, navigateTo}) {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigateTo()
        } catch (error) {
            console.error('Erro ao desconectar:', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {back ? (
                    <>
                        <TouchableOpacity style={styles.back} onPress={navigateTo}>
                            <Ionicons name="arrow-back-circle-outline" size={27} color="white" style={{ paddingEnd: 10 }} />
                        </TouchableOpacity>
                        <Text style={styles.screenName}>{screenName}</Text>
                    </>
                ) : null}
                {profile ? (
                    <>
                        <Text style={styles.screenName}>{name}</Text>
                        <TouchableOpacity style={styles.buttonExit} onPress={handleLogout}>
                            <Ionicons name="exit-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'poppins',
        backgroundColor: '#821E1B',
        paddingTop: statusBarHeight,
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 30,
    },
    content: {
        flexDirection: "row",
    },
    screenName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'

    },
    buttonExit: {
        width: 35,
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        position: 'absolute',
        right: 0


    },
})