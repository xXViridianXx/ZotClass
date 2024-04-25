import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { PureComponent } from 'react'
import { useNavigation } from '@react-navigation/native'
import StatusColor from './StatusColor'
import { getClassStatus } from './getClass'

const ClassCard = React.memo(({ item }) => {
    const navigation = useNavigation()
    const sections = item.sections
    const classStatus = getClassStatus(sections)
    // console.log(sections[0])
    return (
        <TouchableOpacity style={[styles.cardContainer, { borderColor: StatusColor(classStatus) }]} onPress={() => navigation.navigate("ClassInfoScreen", { classInfo: item })}>
            <View>
                <Text style={{ color: "white", fontWeight: 700, fontSize: 25 }}>{item.deptCode} {item.courseNumber}</Text>
                <Text style={{ color: "white", fontWeight: 800 }}>{item.courseTitle}</Text>
            </View>
            <View>
                <Text style={{ color: StatusColor(classStatus), fontWeight: 800 }}>{classStatus}</Text>
            </View>
        </TouchableOpacity>
    )
})

export default ClassCard

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 2,
        borderLeftWidth: 30,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 15,
        width: "100%",
        // alignItems: "center"
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#011627",

        elevation: 5, // (Android) shadow
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
})