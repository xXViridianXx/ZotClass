import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeSlots from './TimeSlots';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import { schedule } from '../components/DummyData';
import { useDispatch, useSelector } from 'react-redux';
// Example data


const App = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const schedule = useSelector((state) => state.currentUser.schedule);
    // const itemsByDay = daysOfWeek.reduce((acc, day) => {
    //     acc[day] = StudyPlanData.filter(item => item.days.includes(day[0]));
    //     return acc;
    // }, {});
    return (
        <View style={styles.container}>
            <ScrollView horizontal pagingEnabled >
                {daysOfWeek.map((day, index) => (
                    <View key={index} style={styles.rowContainer}>
                        <View style={styles.dayContainer}>
                            <Text style={styles.dayText}>{day}</Text>
                        </View>
                        {/* <FlatList
                            data={itemsByDay[day]}
                            renderItem={renderItem}
                            keyExtractor={item => item.sectionCode}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatListContainer}
                        /> */}
                        <TimeSlots classData={schedule[index]} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50
    },
    rowContainer: {
        width: SCREEN_WIDTH - 20,
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    dayContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(50, 85, 147, 100)",
        borderRadius: 5,
    },
    dayText: {
        fontSize: 18,
        fontWeight: '800',
        color: "white",
    },
    flatListContainer: {
        paddingVertical: 10,
    },
    item: {
        backgroundColor: 'rgba(50, 85, 147, 100)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: "space-between",
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    itemHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemlocation: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    },
    itemText: {
        fontSize: 18,
        color: "white",
        fontWeight: "800"
    },
});

export default App;
