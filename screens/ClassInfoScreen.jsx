import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Button, Dimensions, Platform } from 'react-native';
import RenderClassSections from '../components/RenderClassSections';
import { useSelector } from 'react-redux';

const ClassInfoScreen = ({ route }) => {
    const { classInfo, subject, quarter, year } = route.params
    const classTitle = classInfo.courseTitle
    const className = `${classInfo.deptCode} ${classInfo.courseNumber}`
    const classSections = classInfo.sections
    const darkMode = useSelector((state) => state.currentUser.darkMode);


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? "black" : "white" }]}>
            <StatusBar style={darkMode ? 'light' : 'dark'} />
            <RenderClassSections
                classSections={classSections}
                className={className}
                classTitle={classTitle}
                subject={subject}
                quarter={quarter}
                year={year} />
        </SafeAreaView>
    )
}

export default ClassInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingBottom: Platform.OS === 'android' ? 10 : 0
    },
});