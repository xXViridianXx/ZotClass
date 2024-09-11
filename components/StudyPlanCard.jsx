import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { PureComponent } from 'react'
import { useNavigation } from '@react-navigation/native'
import StatusColor from './StatusColor'
import { getClassStatus } from './getClass'

const dataRow = (label, data) => {
    return (
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 2, borderBottomColor: "rgba(255, 255, 255, .3)", paddingVertical: 5 }}>
            <Text style={{ color: "white", fontWeight: "800", }}>{label}</Text>
            <Text style={{ color: "white", fontWeight: "800", textAlign: "right" }}>{data}</Text>
        </View>
    )
}
const StudyPlanCard = React.memo(({ classObj }) => {
    const cardLabels = ["Quarter", "Location", "Times", "Days"]
    const data = [
        `${classObj.quarter} ${classObj.year}`,
        classObj.classLocation ? classObj.classLocation : "TBA",
        classObj.time ? classObj.time : "TBA",
        classObj.days.length > 0 ? classObj.days : "TBA"]
    return (
        <TouchableOpacity style={[styles.cardContainer, { backgroundColor: classObj.color }]}>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 2, borderColor: "rgba(255, 255, 255, .3)", paddingBottom: 10, alignItems: "center" }}>
                <View>
                    <Text style={{ color: "white", fontWeight: "700", fontSize: 25 }}>{classObj.className}</Text>
                    <Text style={{ color: "white", fontWeight: "800" }}>{classObj.classTitle}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "col", justifyContent: "space-between", alignItems: "center", }}>
                    <Text style={{ color: "white", fontWeight: "800", marginBottom: 5 }}>{classObj.sectionType} {classObj.sectionNumber}</Text>
                    <Text style={{ color: "white", fontWeight: "800", borderWidth: 2, padding: 2, borderRadius: 5, borderColor: "white" }}>{classObj.sectionCode}</Text>
                </View>

            </View>

            <View >
                {cardLabels.map((item, index) => dataRow(item, data[index]))}
            </View>

        </TouchableOpacity>
    )
})

export default StudyPlanCard

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5,
        width: "100%",
        // alignItems: "center"
        // flexDirection: "row",
        // justifyContent: "space-between",
        backgroundColor: "rgba( 50, 85, 147, 100)",

        elevation: 5, // (Android) shadow
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
})