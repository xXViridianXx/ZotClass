import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, RefreshControl, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { getClass } from '../components/getClass';
import ClassCard from '../components/ClassCard';
import NotFound from '../components/NotFound';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';

const ClassesScreen = ({ route }) => {
    const { selected, selectedSeason, selectedYear, buttonPosition } = route.params
    // console.log(selected, selectedSeason, selectedYear)
    const [classData, setClassData] = useState([])
    const navigation = useNavigation();
    const [numClasses, setNumClasses] = useState(0)
    const [loading, setLoading] = useState(false);

    // const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.currentUser.darkMode);

    const retrieve = async (subject, season, year) => {
        try {
            if (!subject || !season || !year) {

                return []
            }

            setLoading(true)
            const data = await getClass(subject, season, year)
            classArray = Object.values(data.classes)
            setClassData(classArray)
            setNumClasses(data.numOfClasses)
        }
        catch (e) {
            console.log(e)
        }
        setLoading(false)

    }
    useEffect(() => {

        retrieve(selected, selectedSeason, selectedYear)
    }, [])

    const renderClass = ({ item }) => {
        return (<ClassCard item={item} subject={selected} quarter={selectedSeason} year={selectedYear} />)
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? "black" : "white" }]}>
            <StatusBar style={darkMode ? 'light' : 'dark'} />
            {loading ?
                (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>)
                :
                (<View style={{ width: "90%", height: "100%" }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={classData} renderItem={renderClass}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={selected && selectedSeason && selectedYear ? NotFound : null}
                    />
                    <View style={{ display: "flex", justifyContent: "flex-start", paddingTop: 10 }}>
                        <BackButton />
                    </View>
                </View>)
            }
        </SafeAreaView>
    )
}

export default ClassesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingBottom: Platform.OS === 'android' ? 10 : 0
    },
});