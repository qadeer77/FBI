import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Image, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ImagesPath } from '../Constant/ImagesPath/ImagesPath';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (validateInputs()) {
            navigation.replace('SignUp')
        }
    };

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
    }, [])


    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!email && !password) {
            showToast('Please fill in all fields');
            return false;
        } else if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address');
            return false;
        } else if (!passwordRegex.test(password)) {
            showToast('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit');
            return false;
        } else {
            return true;
        }
    };

    const showToast = (text) => {
        Toast.show(text, Toast.LONG);
    };

    const handleRegister = () => {
        navigation.replace('SignUp');
    }

    const handleForgotPassword = () => {
        navigation.replace('ForgotPassword')
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled' behavior="padding" >
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                    <Image source={ImagesPath.logo} style={styles.image} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.subtitle}>Welcome Back!</Text>
                </View>
                <View style={[styles.inputContainer, { marginTop: keyboardOpen ? '10%' : "10%" }]}>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputIcon}>
                            <Image source={ImagesPath.emailImages} style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            placeholderTextColor="black"
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputIcon}>
                            <Image source={ImagesPath.passwordImages} style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="black"
                            value={password}
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
                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.registerTextContainer}>
                        <Text style={styles.registerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={handleRegister}>
                            <Text style={styles.registerLink}> Register</Text>
                        </TouchableOpacity>
                    </View>
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
    inputWrapper: {
        position: 'relative',
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
    image: {
        resizeMode: 'cover',
        width: 200,
        height: 200
    },
    text: {
        fontSize: 50,
        color: 'white',
        marginBottom: 30,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
    },
    overlaySub: {
        marginTop: 100
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
    inputContainer: {
        paddingHorizontal: 0,
        marginTop: 200
    },
    registerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    registerText: {
        color: 'black',
        fontSize: 16,
    },
    registerLink: {
        color: '#114e95',
        fontSize: 16,
    },
    forgotPasswordLink: {
        color: '#F1565D',
        textAlign: 'right',
        marginBottom: 12,
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#114e95',
        // fontFamily: 'San Francisco', 
    },
    subtitle: {
        fontSize: 18,
        color: 'black',
        marginTop: 10,
        fontFamily: 'San Francisco', 
    },
    passwordToggle: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
});

export default Login;
