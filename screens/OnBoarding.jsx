import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';


const OnBoarding = () => {

    const navigation = useNavigation()
    const onboardingDone = () => {
        navigation.navigate("Home")
    }
    return (<Onboarding
        onDone={onboardingDone}
        onSkip={onboardingDone}
        bottomBarHighlight={false}
        pages={[
            {
                backgroundColor: '#fff',
                image: <Image style={styles.imageStyle} source={require('../images/Search.png')} />,
                title: 'Search Classes',
                subtitle: 'Anytime. Anywhere.',
            },
            {
                backgroundColor: 'red',
                image: <Image style={styles.imageStyle} source={require('../images/Add.png')} />,
                title: 'Add Classes',
                subtitle: 'To Your Study Plan',
            },
            {
                backgroundColor: '#fff',
                image: <Image style={styles.imageStyle} source={require('../images/Delete.png')} />,
                title: 'Delete Classes',
                subtitle: 'By Long Pressing',
            },
            {
                backgroundColor: '#fff',
                image: <Image style={styles.imageStyle} source={require('../images/Hero.png')} />,
                title: 'Have a Great Year!',
                subtitle: 'It\'s All Up To You Now',
            },


        ]}
    />)
}

export default OnBoarding

const styles = StyleSheet.create({
    imageStyle: {
        width: 250,
        height: 250
    }
})