// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ClassInfoScreen from './screens/ClassInfoScreen';
import ClassesScreen from './screens/ClassesScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import StudyPlanScreen from './screens/StudyPlanScreen';
import TimeTable from './screens/TimeTable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClassMoreInfoScreen from './screens/ClassMoreInfoScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserID } from './redux/reducers/user';
import { useEffect, useState } from 'react';
import LoadingScreen from './screens/LoadingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator()
export default function Main() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const darkMode = useSelector((state) => state.currentUser.darkMode);
    const uid = useSelector((state) => state.currentUser.uid);

    useEffect(() => {
        const fetchUserID = async () => {
            await dispatch(getUserID());
            setTimeout(() => setLoading(false), 100); // Adjust as needed
        }
        fetchUserID()
    }, [dispatch])

    function ZotClassTabs() {
        return (
            <Tabs.Navigator initialRouteName='SearchScreen'
                screenOptions={{
                    tabBarActiveTintColor: "rgba( 50, 85, 147, 100)",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: darkMode ? "black" : "white"
                    }
                }}>
                <Tabs.Screen name="TimeTableScreen" component={TimeTable} options={{
                    headerShown: false, tabBarIcon: ({ focused }) => (
                        <FontAwesome name="list-ul" size={24} color={focused ? "rgba( 50, 85, 147, 100)" : "#e5e5e5"} />
                    )
                }} />
                <Tabs.Screen name="SearchScreen" component={HomeScreen} options={{
                    headerShown: false, tabBarIcon: ({ focused }) => (
                        <FontAwesome name="search" size={24} color={focused ? "rgba( 50, 85, 147, 100)" : "#e5e5e5"} />
                    )
                }} />

            </Tabs.Navigator>
        );
    }

    if (loading) {
        return (
            <LoadingScreen />)
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {uid ? (
                    <>
                        <Stack.Screen name="Home" component={ZotClassTabs} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassInfoScreen" component={ClassInfoScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassesScreen" component={ClassesScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ClassesMoreInfoScreen" component={ClassMoreInfoScreen} options={{ headerShown: false }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
