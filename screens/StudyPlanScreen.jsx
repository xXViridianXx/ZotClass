import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView, useColorScheme, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native'
import { data, seasons, years } from '../components/Subjects';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { loadDarkMode, toggleDarkMode, clearUserID } from '../redux/reducers/user';
import { FlatList } from 'react-native-gesture-handler';
import { StudyPlanData } from '../components/DummyData';
import StudyPlanCard from '../components/StudyPlanCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const StudyPlanScreen = () => {
    const navigation = useNavigation();

    const darkMode = useSelector((state) => state.currentUser.darkMode);


    const dynamicStyle = (darkMode, darkThemeColor, lightThemeColor) => {
        return darkMode ? darkThemeColor : lightThemeColor
    }

    const renderSection = ({ item }) => {
        return (<StudyPlanCard data={item} />)
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[styles.container, { backgroundColor: dynamicStyle(darkMode, "black", "white") }]}>
                <View style={styles.courseList}>
                    <StudyPlanCard />
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default StudyPlanScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingBottom: Platform.OS === 'android' ? 10 : 0,
        width: "100%"
    },
    courseList: {
        flex: 1,
        // marginHorizontal: 10
        width: "100%",
        paddingHorizontal: 10
    }
});