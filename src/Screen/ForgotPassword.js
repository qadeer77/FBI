import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ImagesPath } from '../Constant/ImagesPath/ImagesPath';

const ForgotPassword = ({ navigation }) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, []);

    const handleNext = () => {
        if (password !== confirmPassword) {
            Toast.show('Passwords do not match');
            return;
        }

        // Add password reset logic here

        navigation.replace('Login');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Login')}>
                    <Image source={ImagesPath.arrowBack} style={styles.backIcon} />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.title1}>New Password</Text>
                    <Text style={styles.subtitle}>Enter New Password</Text>
                </View>
                <View style={[styles.inputContainer, { marginTop: keyboardOpen ? '10%' : '10%' }]}>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputIcon}>
                            <Image source={ImagesPath.passwordImages} style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            placeholderTextColor="black"
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.passwordToggle}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Image source={showPassword ? ImagesPath.eyeImage : ImagesPath.eyeSlashImage} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputIcon}>
                            <Image source={ImagesPath.passwordImages} style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            placeholderTextColor="black"
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.passwordToggle}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Image source={showConfirmPassword ? ImagesPath.eyeImage : ImagesPath.eyeSlashImage} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
                        <Text style={styles.loginButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'white'
    },
    header: {
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 10,
        padding: 10,
        backgroundColor: 'white',
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        borderRadius: 10
    },
    backIcon: {
        height: 20,
        width: 20,
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 10
    },
    inputIcon: {
        position: 'absolute',
        left: 0,
        top: 7,
    },
    icon: {
        height: 25,
        width: 25,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        color: 'black'
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingLeft: 35,
        color: 'black',
    },
    title1: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#114e95'
    },
    subtitle: {
        fontSize: 18,
        color: 'black',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#114e95',
        borderRadius: 15,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
    },
    passwordToggle: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
});

export default ForgotPassword;
