import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const BackButton = () => {
    const navigation = useNavigation()
    const darkMode = useSelector((state) => state.currentUser.darkMode);
    return (
        <View style={styles.containerStyles}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View>
                        <Feather name="arrow-left-circle" size={35} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default BackButton

const styles = StyleSheet.create({
    containerStyles: {

        backgroundColor: "rgba( 50, 85, 147, 1)",
        borderRadius: 5,
        padding: 5,
        width: 120,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }
})