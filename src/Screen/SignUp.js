import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, TouchableOpacity, Platform, Image, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import { ImagesPath } from '../Constant/ImagesPath/ImagesPath';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const SignUp = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardExpiry, setCreditCardExpiry] = useState('');
    const [creditCardExpiryPickerVisible, setCreditCardExpiryPickerVisible] = useState(false);
    const [creditCardCVC, setCreditCardCVC] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const handleSignUp = () => {
        if (validateInputs()) {
            navigation.replace('Images')
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
    }, []);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(Platform.OS === 'ios');
        setDob(currentDate);
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const creditCardNumberRegex = /^\d{16}$/;
        const creditCardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const creditCardCVCRegex = /^\d{3}$/;

        if (!firstName) {
            showToast('Please enter your first name');
            return false;
        }
        if (!lastName) {
            showToast('Please enter your last name');
            return false;
        }
        if (!email) {
            showToast('Please enter your email address');
            return false;
        } else if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address');
            return false;
        }
        if (!password) {
            showToast('Please enter your password');
            return false;
        } else if (!passwordRegex.test(password)) {
            showToast('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit');
            return false;
        }
        if (!dob) {
            showToast('Please select your date of birth');
            return false;
        }
        if (!creditCardNumber) {
            showToast('Please enter your credit card number');
            return false;
        } else if (!creditCardNumberRegex.test(creditCardNumber)) {
            showToast('Please enter a valid credit card number');
            return false;
        }
        if (!creditCardExpiry) {
            showToast('Please enter your credit card expiry date');
            return false;
        } else if (!creditCardExpiryRegex.test(creditCardExpiry)) {
            showToast('Please enter a valid credit card expiry date (MM/YY)');
            return false;
        }
        if (!creditCardCVC) {
            showToast('Please enter your credit card CVC');
            return false;
        } else if (!creditCardCVCRegex.test(creditCardCVC)) {
            showToast('Please enter a valid credit card CVC');
            return false;
        }
        return true;
    };

    const showToast = (text) => {
        Toast.show(text, Toast.LONG);
    };

    const handleCreditCardExpiryConfirm = (date) => {
        setCreditCardExpiry(moment(date).format('MM/YY'));
        setCreditCardExpiryPickerVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('Login')}>
                <Image source={ImagesPath.arrowBack} style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.title1}>Register</Text>
                <Text style={styles.subtitle}>Create Your New Account</Text>
            </View>
            <View style={[styles.inputContainer, { marginTop: keyboardOpen ? '10%' : "10%" }]}>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                        <Image source={ImagesPath.firstName} style={styles.icon} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor="black"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                        <Image source={ImagesPath.firstName} style={styles.icon} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor="black"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                        <Image source={ImagesPath.emailImages} style={styles.icon} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
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
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TouchableOpacity onPress={showDatePickerModal} style={styles.dateInput}>
                        <Text style={styles.dateText}>
                            {dob ? dob.toLocaleDateString() : 'Date of Birth'}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                        <Image source={ImagesPath.creditCardNumber} style={styles.icon} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Credit Card Number"
                        placeholderTextColor="black"
                        value={creditCardNumber}
                        onChangeText={setCreditCardNumber}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <TouchableOpacity onPress={() => setCreditCardExpiryPickerVisible(true)} style={styles.dateInput}>
                        <Text style={styles.dateText}>
                            {creditCardExpiry ? creditCardExpiry : 'Credit Card Expiry (MM/YY)'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={creditCardExpiryPickerVisible}
                        mode="date"
                        onConfirm={handleCreditCardExpiryConfirm}
                        onCancel={() => setCreditCardExpiryPickerVisible(false)}
                        display="spinner"
                        date={dob}
                        minimumDate={new Date()}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <View style={styles.inputIcon}>
                        <Image source={ImagesPath.creditCardNumber} style={styles.icon} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Credit Card CVC"
                        placeholderTextColor="black"
                        value={creditCardCVC}
                        onChangeText={setCreditCardCVC}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                    <Text style={styles.loginButtonText}>Next</Text>
                </TouchableOpacity>
                <Text style={{ color: 'black', textAlign: 'center', marginTop: 10 }}>Or Sign Up in with</Text>
                <View style={styles.googleContainer}>
                    <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]}>
                        <Image source={ImagesPath.GoogleImages} style={styles.loginImages} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.fgaSubContainer, { marginRight: 15 }]}>
                        <Image source={ImagesPath.facebookImages} style={styles.loginImages} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'white'
    },
    header: {
        marginTop: 40
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
    image: {
        position: 'absolute',
        resizeMode: 'cover',
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
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
    dateInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    dateText: {
        color: 'black',
    },
    inputContainer: {
        paddingHorizontal: 0,
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
    googleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    fgaSubContainer: {
        backgroundColor: 'white',
        height: 80,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    loginImages: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    accountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SignUp;
