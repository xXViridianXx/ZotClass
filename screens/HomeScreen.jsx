import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
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
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                    style={{ flex: 1, width: '100%', justifyContent: "space-evenly", alignItems: 'center', }}>
                    <StatusBar style="auto" />
                    <Text style={{ fontSize: 45, fontWeight: 700, color: "rgba( 50, 85, 147, 100)" }}>ZotClass</Text>
                    <Dropdown
                        style={styles.boxStyle}
                        data={data}
                        search
                        labelField="value"
                        valueField="key"
                        placeholder='Subject'
                        placeholderStyle={{ color: "rgba(169, 169, 169, 1)", fontWeight: 700 }}
                        searchPlaceholder="Search Subject..."
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.dropDownTextStyle}
                        containerStyle={{ borderRadius: 5 }}
                        onChange={(subject) => {
                            setSelected(subject.key);
                        }}
                    />
                    <Dropdown
                        style={styles.boxStyle}
                        data={seasons}
                        labelField="value"
                        valueField="key"
                        maxHeight={200}
                        placeholder='Quarter'
                        placeholderStyle={{ color: "rgba(169, 169, 169, 1)", fontWeight: 700 }}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.dropDownTextStyle}
                        containerStyle={{ borderRadius: 5 }}
                        onChange={(season) => {
                            setSelectedSeason(season.key);
                        }}
                    />
                    <TextInput placeholder="2024"
                        keyboardType="numeric"
                        value={selectedYear}
                        onChangeText={handleYearChange}
                        maxLength={4}
                        style={[styles.boxStyle, { paddingBottom: 10, fontWeight: "800", color: "rgba( 50, 85, 147, 100)" }]}
                    >
                    </TextInput>



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
                </KeyboardAvoidingView>

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
    selectedTextStyle: {
        color: "rgba( 50, 85, 147, 100)",
        fontWeight: "bold",
        width: 280
    },
    boxStyle: {
        width: "80%",
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 3,
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