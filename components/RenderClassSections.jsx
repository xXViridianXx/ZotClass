import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import SectionCard from './SectionCard'
import { GetCourseInfo } from './getClass'
import MoreInfoButton from './MoreInfoButton'
import BackButton from './BackButton'
import { useSelector } from 'react-redux';


const RenderClassSections = ({ classSections, className, classTitle }) => {
    const name = className
    const title = classTitle
    const [courseInfo, setCourseInfo] = useState('');
    const [prereqs, setPrereqs] = useState('');
    const [loading, setLoading] = useState(true)

    const darkMode = useSelector((state) => state.toggleDarkMode.darkMode);

    let staff = new Set(classSections[0].instructors);
    staff = [...staff]

    useEffect(() => {
        const fetchCourseInfo = async () => {
            const info = await GetCourseInfo(className);
            setCourseInfo(info.description || 'No course information available or class not supported');
            setPrereqs(info.prereqs || 'No course prereqs found or class not supported');
            setLoading(false)
        };
        fetchCourseInfo();
    }, [className]);


    const renderSection = ({ item, multiStaff }) => {
        return (<SectionCard section={item} />)
    }

    return (
        <View style={[styles.block, { backgroundColor: darkMode ? "black" : "white" }]}>
            {loading ?
                (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>)
                :
                <View style={[styles.block, { backgroundColor: darkMode ? "black" : "white" }]}>
                    <View style={styles.classContainer}>
                        <Text style={[styles.className, {color: darkMode ? "white" : "#011627"}]}>{name}</Text>
                        <Text style={[styles.classTitle, {color: darkMode ? "white" : "#011627"}]}>{title}</Text>
                        <View style={{ marginTop: 10, marginBottom: 5, padding: 10, backgroundColor: "#011627", borderRadius: 5 }}>
                            <Text style={styles.classDescription}>{courseInfo}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <FlatList
                            data={classSections}
                            renderItem={renderSection}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, paddingTop: 10 }}>
                        <BackButton />
                        <MoreInfoButton to={"ClassesMoreInfoScreen"} data={{ className: name, classTitle: title, classPrereqs: prereqs }} />
                    </View>

                </View>

            }
        </View>
    )
}

export default RenderClassSections

const styles = StyleSheet.create({
    classContainer: {
        paddingHorizontal: 5,
        paddingBottom: 5,
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
        color: ""
    },
    classTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: "#011627"
    },
    classDescription: {
        fontSize: 15,
        fontWeight: "600",
        color: "white",
        textAlign: "left"
    },

    block: {
        // margin: 10,
        // height: "100%"
        flex: 1,

        overflow: 'hidden',
        // height: "90%",
    },
    section: {
        marginBottom: 30
    }
})