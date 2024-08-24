import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import StatusColor from './StatusColor'
import { useSelector } from 'react-redux';

const SectionCard = React.memo(({ section }) => {
    // console.log(section)
    const finalExam = section.finalExam
    const maxCapacity = section.maxCapacity
    let staff = new Set(section.instructors);
    staff = [...staff]
    // const sectionEnrolled = section.numCurrentlyEnrolled.sectionEnrolled
    const totalEnrolled = section.numCurrentlyEnrolled.totalEnrolled
    const numOnWaitlist = section.numOnWaitlist
    const numRequested = section.numRequested
    const sectionNum = section.sectionNum
    const sectionType = section.sectionType
    const sectionStatus = section.status
    const sectionUnits = section.units
    const sectionCode = section.sectionCode
    const meetings = section.meetings[0]
    const location = meetings.bldg, days = meetings.days
    const time = meetings.time

    const darkMode = useSelector((state) => state.toggleDarkMode.darkMode);

    const renderStaff = () => {
        filteredStaff = Array.from(staff).map((item) => <Text key={item} style={{ fontWeight: 800, color: darkMode ? "white" : "#011627" }}>{item}</Text>)
        return (
            <View style={{ width: "45%", padding: 10, borderLeftWidth: 3, borderColor: "rgba( 50, 85, 147, 1)" }}>
                {filteredStaff}
            </View>
        )
    };
    return (
        <View style={styles.cardContainer}>
            <View style={{ marginTop: 20 }}>
                {renderStaff()}
                <View style={[styles.cardMain, { backgroundColor: darkMode ? "#011627" : "#011627" }]}>
                    <Text style={styles.firstRowStyle}>{`${sectionType} ${sectionNum}`}</Text>
                    <Text style={styles.firstRowStyle}>{`${sectionCode}`}</Text>
                    <Text style={{ fontWeight: "800", color: StatusColor(sectionStatus) }}>{`${sectionStatus}`}</Text>
                    <Text style={styles.firstRowStyle}>{`${sectionUnits} units`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`${totalEnrolled} / ${maxCapacity} enrolled`}</Text>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`${numOnWaitlist} on waitlist`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`Location`}</Text>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`${location}`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`Time`}</Text>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`${time}`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`Days`}</Text>
                    <Text style={[styles.classInfoStyles, { color: darkMode ? "white" : "#011627" }]}>{`${days}`}</Text>
                </View>
            </View>
        </View>
    )
})

export default SectionCard

const styles = StyleSheet.create({
    firstRowStyle: {
        color: "white",
        fontWeight: "800"
    },
    classInfoStyles: {
        color: "#011627",
        fontWeight: "600"
    },
    cardContainer: {
        display: 'flex'
    },
    cardMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#011627",
        padding: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        // borderColor: "#011627",
        elevation: 5, // (Android) shadow
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
})