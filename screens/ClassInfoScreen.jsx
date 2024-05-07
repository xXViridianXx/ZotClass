import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Button, Dimensions } from 'react-native';
import RenderClassSections from '../components/RenderClassSections';

import BackButton from '../components/BackButton';
const ClassInfoScreen = ({ route }) => {
    const { classInfo } = route.params
    const classTitle = classInfo.courseTitle
    const className = `${classInfo.deptCode} ${classInfo.courseNumber}`
    const classSections = classInfo.sections
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <RenderClassSections classSections={classSections} className={className} classTitle={classTitle} />
            <BackButton />
        </SafeAreaView>
    )
}

export default ClassInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});