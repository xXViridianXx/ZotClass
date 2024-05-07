import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import SectionCard from './SectionCard'

const RenderClassSections = ({ classSections, className, classTitle }) => {
    const name = className
    const title = classTitle
    let staff = new Set(classSections[0].instructors);
    staff = [...staff]

    const renderSection = ({ item, multiStaff}) => {
        return (<SectionCard section={item}/>)
    }
    return (
        <View style={styles.block}>
            <View style={styles.classContainer}>
                <Text style={styles.className}>{name}</Text>
                <Text style={styles.classTitle}>{title}</Text>
            </View>
            <View style={{ flex: 1, marginHorizontal: 10}}>
                <FlatList
                    data={classSections}
                    renderItem={renderSection}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
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