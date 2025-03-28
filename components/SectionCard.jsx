import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import StatusColor from './StatusColor'
import { useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';
import { addClass, deleteClass } from '../DatabaseHelpers/StudyPlan';
const SectionCard = React.memo(({ section, name, title, subject, quarter, year }) => {

    const finalExam = section.finalExam
    const maxCapacity = section.maxCapacity
    let staff = new Set(section.instructors);
    staff = [...staff]
    const totalEnrolled = section.numCurrentlyEnrolled.totalEnrolled
    const numOnWaitlist = section.numOnWaitlist
    const numRequested = section.numRequested
    const sectionNum = section.sectionNum
    const sectionType = section.sectionType
    const sectionStatus = section.status
    const sectionUnits = section.units
    const sectionCode = section.sectionCode
    const meetings = section.meetings[0]
    
    let location = null;
    let days = null
    let time = null
    let startHour = null
    let startMin = null
    let endHour = null
    let endMin = null

    const getTimes = (start, end) => {
        let startHour = start["hour"]
        let startMin = start["minute"]

        let endHour = end["hour"]
        let endMin = end["minute"]

        let startMarker = "AM"
        let endmarker = "AM"
        if (startHour > 12) {
            startHour -= 12
            startMarker = "PM"
        }
        if (endHour > 12) {
            endHour -= 12
            endmarker = "PM"
        }

        let stringStart = `${startHour}:${startMin === 0 ? "00" : startMin} ${startMarker}`
        let stringEnd = `${endHour}:${endMin === 0 ? "00" : endMin} ${endmarker}`
        return `${stringStart}-${stringEnd}`
    }
    if (!meetings["timeIsTBA"]){
        location = meetings.bldg[0]
        days = meetings.days
        time = getTimes(meetings["startTime"], meetings["endTime"])
        startHour = meetings["startTime"]["hour"]
        startMin = meetings["startTime"]["minute"]
        endHour = meetings["endTime"]["hour"]
        endMin = meetings["endTime"]["minute"]
    }

    const darkMode = useSelector((state) => state.currentUser.darkMode);
    const uid = useSelector((state) => state.currentUser.uid);

    const [addedClass, setAddedClass] = useState(false)
    const [removedClass, setRemovedClass] = useState(false)
    const [loading, setLoading] = useState(false)

    const classData = {
        className: name,
        classTitle: title,
        sectionType: sectionType,
        sectionNumber: sectionNum,
        sectionCode: sectionCode,
        classLocation: location,
        days: days,
        time: time,
        subject: subject,
        quarter: quarter,
        year: year,
        sectionUnits: sectionUnits,
        startHour: startHour,
        startMinutes: startMin,
        endHour: endHour,
        endMinutes: endMin
    }

    const handleAddClass = async () => {
        console.log("uid: " + uid)
        setLoading(true)
        try {
            await addClass(uid, classData);
            setAddedClass(true)
            setRemovedClass(false)
            console.log("Class added successfully");
        } catch (error) {
            console.error("Error adding class: ", error);
        }
        setLoading(false)
    }

    const handleRemoveClass = async () => {
        setLoading(true)
        try {
            await deleteClass(uid, sectionCode);
            setAddedClass(false)
            setRemovedClass(true)
            console.log("Class added successfully");
        } catch (error) {
            console.error("Error adding class: ", error);
        }
        setLoading(false)
    }

    const renderStaff = () => {
        filteredStaff = Array.from(staff).map((item) => <Text key={item} style={{ fontWeight: 800, color: darkMode ? "white" : "#011627" }}>{item}</Text>)
        return (
            <View style={{ width: "100%", padding: 10, borderLeftWidth: 3, borderColor: "rgba( 50, 85, 147, 1)", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    {filteredStaff}
                </View>
                {/* {loading ? (
                    <ActivityIndicator color="#e5e5e5" size={30} /> // Loading Indicator
                ) : (
                    !addedClass ? (
                        <TouchableOpacity onPress={handleAddClass}>
                            <AntDesign name="pluscircle" size={30} color="rgba(50, 85, 147, 1)" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleRemoveClass}>
                            <AntDesign name="minuscircle" size={30} color="#ff5a5f" />
                        </TouchableOpacity>
                    )
                )} */}
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