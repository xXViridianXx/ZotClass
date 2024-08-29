import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadDarkMode } from '../redux/reducers/user';
const LoadingScreen = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.currentUser.darkMode);
    useEffect(() => {
        dispatch(loadDarkMode());
    }, [dispatch]);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? "black" : "white" }]}>
            <StatusBar style={darkMode ? 'light' : 'dark'} />
            <ActivityIndicator size="large" color="rgba( 50, 85, 147, 100)" />
        </SafeAreaView>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "white"
    },
});