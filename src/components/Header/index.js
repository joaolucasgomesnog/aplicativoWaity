import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64


export default function Header({ name, profile, back, screenName, navigateTo }) {
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
                        <TouchableOpacity style={styles.buttonUser}>
                            <FontAwesome5 name="user" size={20} color="white" />
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
        paddingBottom: 44,
    },
    content: {
        flexDirection: "row",
    },
    screenName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'

    },
    buttonUser: {
        width: 35,
        height: 35,
        backgroundColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        position: 'absolute',
        right: 0


    },
})