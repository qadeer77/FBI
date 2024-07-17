import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';

const SignUp = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardExpiry, setCreditCardExpiry] = useState('');
    const [creditCardCVC, setCreditCardCVC] = useState('');

    const handleSignUp = () => {
        if (validateInputs()) {
            navigation.replace('Images')
        }
    };

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="black"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="black"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
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
            <TextInput
                style={styles.input}
                placeholder="Credit Card Number"
                placeholderTextColor="black"
                value={creditCardNumber}
                onChangeText={setCreditCardNumber}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Credit Card Expiry (MM/YY)"
                placeholderTextColor="black"
                value={creditCardExpiry}
                onChangeText={setCreditCardExpiry}
            />
            <TextInput
                style={styles.input}
                placeholder="Credit Card CVC"
                placeholderTextColor="black"
                value={creditCardCVC}
                onChangeText={setCreditCardCVC}
                keyboardType="numeric"
            />
            <Button title="Next" onPress={handleSignUp} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
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
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 4,
        color: 'black'
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
});

export default SignUp;
