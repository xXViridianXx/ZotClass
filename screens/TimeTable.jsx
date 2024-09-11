import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeSlots from './TimeSlots';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import { schedule } from '../components/DummyData';
import { useDispatch, useSelector } from 'react-redux';
import { filterClass } from '../DatabaseHelpers/StudyPlan';
import { StatusBar } from 'expo-status-bar';
// Example data


const TimeTable = () => {

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const dispatch = useDispatch()


    const uid = useSelector((state) => state.currentUser.uid);
    const studyPlan = useSelector((state) => state.currentUser.studyPlan);
    const darkMode = useSelector((state) => state.currentUser.darkMode);

    const schedule = [[], [], [], [], [], []]
    studyPlan.forEach((classObj) => {
        classObj.days.forEach(day => {
            if (day === "M") schedule[0].push(classObj)
            else if (day === "Tu") schedule[1].push(classObj)
            else if (day === "W") schedule[2].push(classObj)
            else if (day === "Th") schedule[3].push(classObj)
            else if (day === "F") schedule[4].push(classObj)
            else schedule[5].push(classObj)
        });
    })

    console.log("schedule", schedule)
    return (
        <View style={[styles.container, {backgroundColor: darkMode ? "black" : "white"}]}>
            <StatusBar style={darkMode ? 'light' : 'dark'} />

            <ScrollView horizontal pagingEnabled >
                {daysOfWeek.map((day, index) => (
                    <View key={index} style={styles.rowContainer}>
                        <View style={[styles.dayContainer, {backgroundColor: darkMode ? "#011627" : "rgba(50, 85, 147, 100)"}]}>
                            <Text style={styles.dayText}>{day}</Text>
                        </View>
                        <TimeSlots classData={schedule[index]} uid={uid} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50
    },
    rowContainer: {
        width: SCREEN_WIDTH - 20,
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    dayContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    dayText: {
        fontSize: 18,
        fontWeight: '800',
        color: "white",
    },
    flatListContainer: {
        paddingVertical: 10,
    },
    item: {
        backgroundColor: 'rgba(50, 85, 147, 100)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: "space-between",
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    itemHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemlocation: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    },
    itemText: {
        fontSize: 18,
        color: "white",
        fontWeight: "800"
    },
});

export default TimeTable;
