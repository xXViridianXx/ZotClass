import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import StatusColor from './StatusColor'

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
    const renderStaff = () => {
        filteredStaff = Array.from(staff).map((item) => <Text key={item} style={{ fontWeight: 800 }}>{item}</Text>)
        return (
            <View style={{ width: "45%", padding: 10, borderLeftWidth: 3 }}>
                {filteredStaff}
            </View>
        )
    };
    return (
        <View style={styles.cardContainer}>
            <View style={{ marginTop: 20 }}>
                {renderStaff()}
                <View style={styles.cardMain}>
                    <Text style={styles.firstRowStyle}>{`${sectionType} ${sectionNum}`}</Text>
                    <Text style={styles.firstRowStyle}>{`${sectionCode}`}</Text>
                    <Text style={{ fontWeight: "800", color: StatusColor(sectionStatus) }}>{`${sectionStatus}`}</Text>
                    <Text style={styles.firstRowStyle}>{`${sectionUnits} units`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={styles.classInfoStyles}>{`${totalEnrolled} / ${maxCapacity} enrolled`}</Text>
                    <Text style={styles.classInfoStyles}>{`${numOnWaitlist} on waitlist`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={styles.classInfoStyles}>{`Location`}</Text>
                    <Text style={styles.classInfoStyles}>{`${location}`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={styles.classInfoStyles}>{`Time`}</Text>
                    <Text style={styles.classInfoStyles}>{`${time}`}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 2, borderBottomColor: "#e5e5e5" }}>
                    <Text style={styles.classInfoStyles}>{`Days`}</Text>
                    <Text style={styles.classInfoStyles}>{`${days}`}</Text>
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

        elevation: 5, // (Android) shadow
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
})