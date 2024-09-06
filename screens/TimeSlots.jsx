import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { schedule } from '../components/DummyData'
import { useDispatch } from 'react-redux'
import { removeClassFromDay } from '../redux/reducers/user'
// startTime (exclusive), endtime {inclusive}, step (minutes)
const generateTimeSlots = (startTime, endTime, step) => {
    const times = []
    let currentHour = startTime
    let minutes = 0
    let day = "AM"
    while (currentHour < endTime) {
        minutes %= 60
        if (minutes == 0) {
            currentHour += 1
        }
        let hourString = `${currentHour > 12 ? `${currentHour - 12}` : `${currentHour}`}`
        let minuteString = `${minutes == 0 ? "00" : `${minutes}`}`
        let period = `${currentHour < 12 || currentHour == 24 ? "AM" : "PM"}`
        let timeString = `${hourString}:${minuteString} ${period}`
        times.push(timeString)
        minutes += step
    }
    return times
}

const addClassToTimeTable = (startHour, startMinutes) => {
    const scaledMinutes = (startHour - 8) * 60
    const convertToRender = (scaledMinutes + startMinutes)
    const offset = 15
    return offset + convertToRender
}


const TimeSlots = ({ classData }) => {
    const dispatch = useDispatch()
    if (classData) {
        for (let i of classData) {
            console.log(i)
        }
    }

    const removeClassFromTimetable = (code) => {
        dispatch(removeClassFromDay(code));
    }

    timeSlots = generateTimeSlots(7, 20, 30)
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 10 }}>
                {timeSlots.map((time, index) => (
                    <View key={index} style={styles.timeSlot}>
                        <Text style={styles.timeText}>{time}</Text>
                        {(time.endsWith('00 AM') || time.endsWith('00 PM')) && <View style={styles.fullHourLine} />}
                        {(time.endsWith('30 AM') || time.endsWith('30 PM')) && <View style={styles.halfHourLine} />}
                    </View>
                ))}
            </View>
            {classData.map((classInfo, index) => (
                <TouchableOpacity onLongPress={() => {
                    Alert.alert(
                        'Deleting Class',
                        `Are you sure you want to delete \n ${classInfo.className}`,
                        [
                            { text: 'Cancel', onPress: () => null },
                            { text: 'Delete', style: 'destructive', onPress: () => removeClassFromTimetable(classInfo.sectionCode) },
                        ]
                    )
                }}
                    key={classInfo.sectionCode} style={[
                        styles.schedule,
                        {
                            top: addClassToTimeTable(classInfo.startHour, classInfo.startMinutes),
                            height: classInfo.duration,
                            backgroundColor: classInfo.color
                        }]}>
                    <Text style={styles.scheduleText}>{classInfo.className}</Text>
                    <Text style={styles.scheduleText}>{classInfo.classLocation}</Text>
                    <Text style={styles.scheduleText}>{classInfo.time}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default TimeSlots

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: 'white',
    },
    timeSlot: {
        height: 30,
        justifyContent: 'center',
        position: 'relative',
    },
    timeText: {
        fontSize: 16,
        // color: "#ddd",
    },
    fullHourLine: {
        position: 'absolute',
        left: 70,
        right: 0,
        height: 1,
        backgroundColor: '#d1cece',
        top: '50%',
    },
    halfHourLine: {
        position: 'absolute',
        left: 70,
        right: 0,
        height: 1,
        backgroundColor: '#e5e5e5',
        top: '50%',
    },
    schedule: {
        position: 'absolute',
        left: 70,
        right: 0,

        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    schedule2: {
        position: 'absolute',
        left: 70,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scheduleText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})