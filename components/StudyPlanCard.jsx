import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

// Sample data
const events_data = [
    {
        title: "COMPSCI 121",
        startTime: genTimeBlock("MON", 13),
        endTime: genTimeBlock("MON", 14, 50),
        location: "DBH 1100",
        extra_descriptions: ["Lec A"],
    },
    {
        title: "COMPSCI 112",
        startTime: genTimeBlock("MON", 12),
        endTime: genTimeBlock("MON", 12, 50),
        location: "SH 134",
        extra_descriptions: ["Dis 1"],
    },
    {
        title: "Physics",
        startTime: genTimeBlock("MON", 11),
        endTime: genTimeBlock("MON", 11, 50),
        location: "Lab 404",
        extra_descriptions: ["Einstein"],
    },
    {
        title: "Physics",
        startTime: genTimeBlock("WED", 11),
        endTime: genTimeBlock("WED", 11, 50),
        location: "Lab 404",
        extra_descriptions: ["Einstein"],
    },
    {
        title: "Mandarin",
        startTime: genTimeBlock("TUE", 9),
        endTime: genTimeBlock("TUE", 10, 50),
        location: "Language Center",
        extra_descriptions: ["Chen"],
    },
    {
        title: "Japanese",
        startTime: genTimeBlock("FRI", 9),
        endTime: genTimeBlock("FRI", 10, 50),
        location: "Language Center",
        extra_descriptions: ["Nakamura"],
    },
    {
        title: "Club Activity",
        startTime: genTimeBlock("THU", 9),
        endTime: genTimeBlock("THU", 10, 50),
        location: "Activity Center",
    },
    {
        title: "Club Activity",
        startTime: genTimeBlock("FRI", 21, 30),
        endTime: genTimeBlock("FRI", 22,),
        location: "Activity Center",
    },
];

// StudyPlanCard Component
const StudyPlanCard = React.memo(() => {
    const numOfDays = 5;
    const pivotDate = genTimeBlock('mon');

    const onEventPress = (evt) => {
        Alert.alert("onEventPress", JSON.stringify(evt));
    };
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TimeTableView
                events={events_data}
                pivotTime={6}
                pivotEndTime={22}
                pivotDate={pivotDate}
                nDays={numOfDays}
                onEventPress={onEventPress}
                headerStyle={styles.headerStyle}
                formatDateHeader="dddd"
                locale="en-US"
            /></View>
    );
});

export default StudyPlanCard;

const styles = StyleSheet.create({
    classTitle: {
        color: "white",
        fontWeight: "800",
        fontSize: 20,
    },
    className: {
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
    classSection: {
        color: "#011627",
        fontWeight: "600",
        backgroundColor: "white",
    },
    location: {
        color: "#011627",
        fontWeight: "600",
        backgroundColor: "white",
    },
    cardContainer: {
        display: 'flex',
        width: "100%",
    },
    cardMain: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        elevation: 5, // (Android) shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerStyle: {
        backgroundColor: 'rgba( 50, 85, 147, 100)',
        borderRadius: 5,
    }
});
