// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ClassInfoScreen from './screens/ClassInfoScreen';
import ClassesScreen from './screens/ClassesScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClassMoreInfoScreen from './screens/ClassMoreInfoScreen';
import { Provider } from 'react-redux';
import store from './redux/store/store';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} /> */}
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ClassInfoScreen" component={ClassInfoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ClassesScreen" component={ClassesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ClassesMoreInfoScreen" component={ClassMoreInfoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
