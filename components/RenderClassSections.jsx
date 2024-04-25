import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import SectionCard from './SectionCard'

const RenderClassSections = ({ classSections, className, classTitle }) => {
    const name = className
    const title = classTitle
    let staff = new Set(classSections[0].instructors);
    staff = [...staff]

    // const renderStaff = () => {
    //     filteredStaff = Array.from(staff).map((item) => <Text key={item} style={{ color: "black", fontWeight: "800", fontSize: 20 }}>{item}</Text>)
    //     return (
    //         <View style={{ flexDirection: "row" }}>
    //             <View style={{ borderBottomWidth: 3, borderBottomColor: "black" }}>
    //                 {filteredStaff}
    //             </View>
    //             <View>

    //             </View>
    //         </View>
    //     )
    // };
    const renderSection = ({ item, multiStaff}) => {
        return (<SectionCard section={item}/>)
    }
    return (
        <View style={styles.block}>
            <View style={styles.classContainer}>
                <Text style={styles.className}>{name}</Text>
                <Text style={styles.classTitle}>{title}</Text>
                {/* {renderStaff()} */}
            </View>
            <View style={{ flex: 1, marginHorizontal: 10}}>
                <FlatList
                    data={classSections}
                    renderItem={renderSection}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            {/* {Object.keys(classSections).map(code => {
                const sectionInfo = classSections[code]
                const classType = sectionInfo.classType
                const classStatus = sectionInfo.classStatus
                const classInstructors = sectionInfo.classInstructors
                const maxEnrollment = sectionInfo.maxEnrollment
                const enrolled = sectionInfo.enrolled
                const classSection = sectionInfo.classSection
                const classUnits = sectionInfo.classUnits
                const classLocation = sectionInfo.classLocation
                const startTime = sectionInfo.startTime
                const endTime = sectionInfo.endTime
                const days = sectionInfo.days.join(" ")
                return (
                    <View key={code} style={styles.section}>
                        <Text>{`${code} || ${classUnits} || ${classSection} || ${classType}`}</Text>
                        <Text>{`${classStatus} || ${enrolled} || ${maxEnrollment}`}</Text>
                        <Text>{`${classLocation} || ${startTime} || ${endTime} ${days}`}</Text>
                        <View>
                            {classInstructors.map((instructor, index) => (
                                <Text key={index}>{`${instructor}`}</Text>
                            ))}
                        </View>
                    </View>
                )
            })} */}
        </View>
    )
}

export default RenderClassSections

const styles = StyleSheet.create({
    classContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        backgroundColor: "white",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 5, // (Android) shadow
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    className: {
        fontSize: 35,
        fontWeight: "800",
        color: "#011627"
    },
    classTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#011627"
    },
    block: {
        // margin: 10,
        // height: "100%"
        flex: 1,

        overflow: 'hidden',
        backgroundColor: "white"
        // height: "90%",
    },
    section: {
        marginBottom: 30
    }
})