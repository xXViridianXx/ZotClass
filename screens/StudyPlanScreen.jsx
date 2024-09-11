import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView, useColorScheme, Button, ActivityIndicator } from 'react-native';
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
import { fetchStudyPlan } from '../DatabaseHelpers/StudyPlan';
const StudyPlanScreen = () => {
    const navigation = useNavigation();

    const darkMode = useSelector((state) => state.currentUser.darkMode);
    const studyPlan = useSelector((state) => state.currentUser.studyPlan);
    const uid = useSelector((state) => state.currentUser.uid);

    // console.log(studyPlan.length)

    const [loading, setLoading] = useState(false)
    const [classData, setClassData] = useState([])
    const dynamicStyle = (darkMode, darkThemeColor, lightThemeColor) => {
        return darkMode ? darkThemeColor : lightThemeColor
    }

    const renderSection = ({ item }) => {
        return <StudyPlanCard classObj={item} />
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[styles.container, { backgroundColor: dynamicStyle(darkMode, "black", "white") }]}>
                <View style={styles.courseList}>
                    <Text style={{ fontSize: 45, fontWeight: "800", fontStyle: "italic", color: "rgba( 50, 85, 147, 100)", marginBottom: 5}}>Study Plan</Text>
                    <View style={{ width: "90%", flex: 1}}>
                        {loading ?
                            (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" />
                            </View>)
                            :
                            (
                                <FlatList
                                    showsVerticalScrollIndicator={false}

                                    data={studyPlan}
                                    renderItem={renderSection}
                                    keyExtractor={(item, index) => index.toString()}
                                // ListEmptyComponent={selected && selectedSeason && selectedYear ? NotFound : null}
                                />
                            )}

                    </View>
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
        width: "100%",
        justifyContent: "center"
    },
    courseList: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingBottom: Platform.OS === 'android' ? 10 : 0,
        width: "100%",
    }
});