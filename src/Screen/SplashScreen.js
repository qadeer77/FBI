import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ImagesPath } from '../Constant/ImagesPath/ImagesPath';

const SplashScreen = ({ navigation }) => {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1);
        } else {
            navigation.replace('Login');
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

    return (
        <View style={styles.container}>
            {step === 0 && <Image source={ImagesPath.SplashScreen} style={styles.image} />}
            {step === 1 && <Image source={ImagesPath.supermarket2} style={styles.image} />}
            {step === 2 && <Image source={ImagesPath.manSuperMarket} style={styles.image} />}
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
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        position: 'absolute',
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
    },
});

export default SplashScreen;
