import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

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

const TimeSlots = () => {

    
    timeSlots = generateTimeSlots(5, 22, 30)
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
            {/* offset for top: 30, step: 60 */}
            <View style={[styles.schedule, { top: 30, height: 110, }]}>
                <Text style={styles.scheduleText}>COMPSCI 121</Text>
                <Text style={styles.scheduleText}>DBH 1100</Text>
                <Text style={styles.scheduleText}>6-7p</Text>
            </View>
            <View style={[styles.schedule2, { top: 240, height: 90 }]}>
                <Text style={styles.scheduleText}>COMPSCI 161</Text>
            </View>
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
        height: 60,
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
        backgroundColor: 'rgba(0, 0, 0, .5)',
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