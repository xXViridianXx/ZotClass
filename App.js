// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ClassInfoScreen from './screens/ClassInfoScreen';
import ClassesScreen from './screens/ClassesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ClassInfoScreen" component={ClassInfoScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ClassesScreen" component={ClassesScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
