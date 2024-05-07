import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native'
import { data, seasons, years } from '../components/Subjects';

const ClassesScreen = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("")
    const [selectedYear, setSelectedYear] = useState("")
    const [selectedSeason, setSelectedSeason] = useState("")

    const [buttonPosition, setButtonPosition] = useState({ left: 0 });

    const handleYearChange = (value) => {
        if (value.length > 4) {
            return;
        }
        setSelectedYear(value);
    };

    useEffect(() => {
        const { width, height } = Dimensions.get('window');
        const buttonWidth = 50; // Adjust button width as needed
        const left = (width - buttonWidth) / 2;
        setButtonPosition({ left });
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ flex: 1, width: '100%', justifyContent: "space-evenly", alignItems: 'center', }}>
                    <Text style={{ fontSize: 45, fontWeight: 700, color: "rgba( 50, 85, 147, 100)" }}>ZotClass</Text>
                    <SelectList
                        data={data}
                        boxStyles={styles.boxStyle}
                        inputStyles={styles.inputTextStyle}
                        dropdownTextStyles={styles.dropDownTextStyle}
                        dropdownStyles={{ borderWidth: 0, backgroundColor: "white" }}
                        placeholder={"Subject"}
                        setSelected={(subject) => { setSelected(subject) }}
                    />
                    <SelectList
                        data={seasons}
                        boxStyles={styles.boxStyle}
                        inputStyles={styles.inputTextStyle}
                        dropdownTextStyles={styles.dropDownTextStyle}
                        dropdownStyles={{ borderWidth: 0, backgroundColor: "white" }}
                        placeholder={"Quarter"}
                        search={false}
                        maxHeight={100}
                        setSelected={(season) => (setSelectedSeason(season))}
                    />

                    <TextInput placeholder="2024"
                        keyboardType="numeric"
                        value={selectedYear}
                        onChangeText={handleYearChange}
                        maxLength={4}
                        style={[styles.boxStyle, { paddingLeft: 20, paddingBottom: 10, fontWeight: "bold", color: "rgba( 50, 85, 147, 100)" }]}></TextInput>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => {
                            if (selected && selectedSeason && selectedYear) {
                                navigation.navigate("ClassesScreen", { selected, selectedSeason, selectedYear, buttonPosition });
                            } else {
                                alert("Please fill out all fields");
                            }
                        }}>
                        <View>
                            <Text style={{ fontWeight: 700, color: "white" }}>Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ClassesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    inputTextStyle: {
        color: "rgba( 50, 85, 147, 100)",
        fontWeight: "bold"
    },
    dropDownTextStyle: {
        color: "#011627",
        fontWeight: "bold",
        width: 280
    },
    boxStyle: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 3,
        width: '80%',
        borderBottomColor: 'rgba( 50, 85, 147, 100)',
    },
    searchButton: {
        backgroundColor: 'rgba( 50, 85, 147, 100)',
        borderRadius: 5, padding: 15,
        width: '80%',
        justifyContent: "center",
        alignItems: 'center',

        elevation: 5, // (Android) shadow
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }

});