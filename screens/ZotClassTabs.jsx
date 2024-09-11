import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import StudyPlanScreen from "./StudyPlanScreen";
import TimeTable from "./TimeTable";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from "react-redux";
const Tabs = createBottomTabNavigator()
export default function ZotClassTabs() {

    const darkMode = useSelector((state) => state.currentUser.darkMode);
    return (
        <Tabs.Navigator
            initialRouteName='SearchScreen'
            swipeEnabled={true}
            screenOptions={{
                tabBarActiveTintColor: "rgba( 50, 85, 147, 100)",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: darkMode ? "black" : "white"
                }
            }}>
            <Tabs.Screen name="TimeTableScreen" component={TimeTable} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <AntDesign name="calendar" size={24} color={focused ? "rgba( 50, 85, 147, 100)" : "#e5e5e5"} />
                )
            }} />
            <Tabs.Screen name="StudyPlanScreen" component={StudyPlanScreen} options={{
                headerShown: false, tabBarIcon: ({ focused }) => (
                    <FontAwesome name="list" size={24} color={focused ? "rgba( 50, 85, 147, 100)" : "#e5e5e5"} />
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
