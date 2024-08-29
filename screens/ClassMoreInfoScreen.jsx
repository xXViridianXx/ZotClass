import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import { useSelector } from 'react-redux';

const ClassMoreInfoScreen = ({ route }) => {
    const { className, classTitle, classPrereqs } = route.params;
    const darkMode = useSelector((state) => state.currentUser.darkMode);
    return (
        <SafeAreaView style={[styles.block, { backgroundColor: darkMode ? "#011627" : "#white" }]}>
            <View style={[styles.block, { backgroundColor: darkMode ? "black" : "#white" }]}>
                <View style={[styles.classContainer, { backgroundColor: darkMode ? "#011627" : "#white" }]}>
                    <Text style={[styles.className, { color: darkMode ? "white" : "#011627" }]}>{className}</Text>
                    <Text style={[styles.classTitle, { color: darkMode ? "white" : "#011627" }]}>{classTitle}</Text>
                    <View style={{ marginTop: 2, paddingHorizontal: 5 }}>
                        <Text style={{ fontWeight: "bold", color: darkMode ? "white" : "#011627" }}>Prereqs:</Text>
                        <Text style={{ fontWeight: "bold", color: darkMode ? "white" : "#011627" }}>{classPrereqs}</Text>
                    </View>
                </View>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingTop: 10 }}>
                    <BackButton />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ClassMoreInfoScreen

const styles = StyleSheet.create({
    classContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        // backgroundColor: "white",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 5, // (Android) shadow
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    className: {
        fontSize: 35,
        fontWeight: "800",
        // color: "#011627"
    },
    classTitle: {
        fontSize: 15,
        fontWeight: "800",
        // color: "#011627"
    },
    classDescription: {
        fontSize: 15,
        fontWeight: "600",
        color: "white",
        textAlign: "left"
    },

    block: {
        // margin: 10,
        // height: "100%"
        flex: 1,
        overflow: 'hidden',
        backgroundColor: "white",
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingBottom: Platform.OS === 'android' ? 10 : 0
    },
    section: {
        marginBottom: 30
    }
})