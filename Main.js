// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ClassInfoScreen from './screens/ClassInfoScreen';
import ClassesScreen from './screens/ClassesScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClassMoreInfoScreen from './screens/ClassMoreInfoScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getUserID } from './redux/reducers/user';
import { useEffect, useState } from 'react';
import LoadingScreen from './screens/LoadingScreen';
const Stack = createNativeStackNavigator();
export default function Main() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    const uid = useSelector((state) => state.currentUser.uid);

    useEffect(() => {
        const fetchUserID = async () => {
            await dispatch(getUserID());
            setTimeout(() => setLoading(false), 100); // Adjust as needed
        }
        fetchUserID()
    }, [dispatch])

    if (loading) {
        return (
            <LoadingScreen />)
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {uid ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
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
                {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ClassInfoScreen" component={ClassInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ClassesScreen" component={ClassesScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ClassesMoreInfoScreen" component={ClassMoreInfoScreen} options={{ headerShown: false }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
