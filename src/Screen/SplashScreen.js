import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ImagesPath } from '../Constant/ImagesPath/ImagesPath';
import { AppFonts } from '../Constant/Fonts/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    const [step, setStep] = useState(0);

    const handleNext = async () => {
        if (step < 2) {
            setStep(step + 1);
        } else {
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === 'true') {
                navigation.replace('Home');
            } else {
                navigation.replace('Login');
            }
        }
    };

    const renderCircles = () => {
        return [0, 1, 2].map((index) => (
            <View
                key={index}
                style={[
                    styles.circle,
                    { backgroundColor: step >= index ? '#007BFF' : '#e0e0e0' }
                ]}
            />
        ));
    };

    const renderText = () => {
        switch (step) {
            case 0:
                return {
                    heading: 'Welcome to Our App',
                    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                };
            case 1:
                return {
                    heading: 'Explore Features',
                    paragraph: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                };
            case 2:
                return {
                    heading: 'Get Started',
                    paragraph: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ex ea consequat.'
                };
            default:
                return {
                    heading: '',
                    paragraph: ''
                };
        }
    };

    const { heading, paragraph } = renderText();

    return (
        <View style={styles.container}>
            {step === 0 && <Image source={ImagesPath.SplashScreen} style={styles.image} />}
            {step === 1 && <Image source={ImagesPath.supermarket2} style={styles.image} />}
            {step === 2 && <Image source={ImagesPath.manSuperMarket} style={styles.image} />}
            <View style={{position: 'relative', top: '20%'}}>
                <Text style={styles.heading}>{heading}</Text>
                <Text style={styles.paragraph}>{paragraph}</Text>
            </View>
            <View style={styles.circlesContainer}>
                {renderCircles()}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>{step < 2 ? 'Next' : 'Get Started'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '50%',
        width: '50%',
        resizeMode: 'contain',
        position: 'absolute',
    },
    heading: {
        textAlign: 'center',
        fontSize: 25,
        color: '#114e95',
        fontFamily: AppFonts.bold
    },
    paragraph: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        fontFamily: AppFonts.regular
    },
    circlesContainer: {
        position: 'absolute',
        bottom: 120,
        flexDirection: 'row',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    button: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 50,
        backgroundColor: '#114e95',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: AppFonts.regular
    },
});

export default SplashScreen;
