import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, KeyboardAvoidingView, useColorScheme, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native'
import { data, seasons, years } from '../components/Subjects';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { loadDarkMode, toggleDarkMode, clearUserID } from '../redux/reducers/user';
import { signOut, getAuth } from 'firebase/auth';
const ClassesScreen = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("")
    const [selectedYear, setSelectedYear] = useState(years[0].value)
    const [selectedSeason, setSelectedSeason] = useState("")
    const [buttonPosition, setButtonPosition] = useState({ left: 0 });
    // const [darkMode, setDarkMode] = useState(false)

    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.currentUser.darkMode);

    useEffect(() => {
        dispatch(loadDarkMode());
    }, [dispatch]);

    const handleToggle = () => {
        dispatch(toggleDarkMode());
    };

    const handleYearChange = (value) => {
        if (value.length > 4) {
            return;
        }
        setSelectedYear(value);
    };

    const dynamicStyle = (darkMode, darkThemeColor, lightThemeColor) => {
        return darkMode ? darkThemeColor : lightThemeColor
    }

    const logout = async () => {
        console.log('logging out')
        try {
            await signOut(getAuth())
            dispatch(clearUserID())
            setTimeout(() => {
                navigation.navigate("LoginScreen");
            }, 100);
        } catch (error) {
            console.log("failed to logout: ", error)
        }

    }
    useEffect(() => {
        const { width, height } = Dimensions.get('window');
        const buttonWidth = 50; // Adjust button width as needed
        const left = (width - buttonWidth) / 2;
        setButtonPosition({ left });
    }, []);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={[styles.container, { backgroundColor: dynamicStyle(darkMode, "black", "white") }]}>
                <View style={{ width: '80%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={handleToggle}
                        style={{ padding: 10, borderRadius: 5, alignSelf: 'flex-start', backgroundColor: darkMode ? "#011627" : "rgba( 50, 85, 147, 100)" }}
                        activeOpacity={1}>
                        <Ionicons name="moon" size={25} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={logout}
                        style={{ padding: 10, borderRadius: 5, alignSelf: 'flex-start', backgroundColor: darkMode ? "#011627" : "rgba( 50, 85, 147, 100)" }}>
                        <MaterialIcons name="logout" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                    style={{ flex: 1, width: '100%', justifyContent: "space-evenly", alignItems: 'center', }}>

                    <StatusBar style={darkMode ? 'light' : 'dark'} />


                    <Text style={{ fontSize: 45, fontWeight: "800", fontStyle: 'italic', color: dynamicStyle(darkMode, "rgba( 50, 85, 147, 100)", "rgba( 50, 85, 147, 100)") }}>ZotClass</Text>
                    <Dropdown
                        style={[styles.boxStyle, { borderBottomColor: dynamicStyle(darkMode, "#011627", "rgba( 50, 85, 147, 100)") }]}
                        data={data}
                        search={true}
                        labelField="value"
                        valueField="key"
                        placeholder='Enter Subject...'
                        activeColor={dynamicStyle(darkMode, "black", "white")}
                        placeholderStyle={{ color: "#e5e5e5", fontWeight: 700 }}
                        searchPlaceholder="Search Subject..."
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={{ color: dynamicStyle(darkMode, "white", "#011627") }}
                        itemTextStyle={[styles.dropDownTextStyle, { color: dynamicStyle(darkMode, "white", "#011627") }]}
                        containerStyle={{ borderRadius: 5, backgroundColor: dynamicStyle(darkMode, "#011627", "white") }}
                        onChange={(subject) => {
                            setSelected(subject.key);
                        }}
                    />
                    <Dropdown
                        style={[styles.boxStyle, { borderBottomColor: dynamicStyle(darkMode, "#011627", "rgba( 50, 85, 147, 100)") }]}
                        data={seasons}
                        labelField="value"
                        valueField="key"
                        maxHeight={200}
                        activeColor={dynamicStyle(darkMode, "black", "white")}
                        placeholder='Enter Quarter...'
                        placeholderStyle={{ color: "#e5e5e5", fontWeight: 700 }}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={[styles.dropDownTextStyle, { color: dynamicStyle(darkMode, "white", "#011627") }]}
                        containerStyle={{ borderRadius: 5, backgroundColor: dynamicStyle(darkMode, "#011627", "white") }}
                        onChange={(season) => {
                            setSelectedSeason(season.key);
                        }}
                    />
                    <TextInput
                        placeholder="Enter Year..."
                        keyboardType="numeric"
                        value={selectedYear}
                        onChangeText={handleYearChange}
                        maxLength={4}
                        style={[styles.boxStyle, { paddingBottom: 10, fontWeight: "700", color: "rgba( 50, 85, 147, 100)", fontSize: 16, borderBottomColor: dynamicStyle(darkMode, "#011627", "rgba( 50, 85, 147, 100)") }]}
                        placeholderTextColor={"#e5e5e5"}
                    >
                    </TextInput>

                    <TouchableOpacity
                        style={[styles.searchButton, { backgroundColor: dynamicStyle(darkMode, "#011627", "rgba( 50, 85, 147, 100)") }]}
                        onPress={() => {
                            if (selected && selectedSeason && selectedYear) {
                                navigation.navigate("ClassesScreen", { selected, selectedSeason, selectedYear, buttonPosition });
                            } else {
                                alert("Please fill out all fields");
                            }
                        }}>
                        <View>
                            <Text style={{ fontWeight: 700, color: dynamicStyle(darkMode, "rgba( 50, 85, 147, 100)", "white") }}>Search</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}

export default ClassesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingBottom: Platform.OS === 'android' ? 10 : 0
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