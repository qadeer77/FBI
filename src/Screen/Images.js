import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';
import { launchCamera } from 'react-native-image-picker';
import api from '../server/api';
import { useNavigation } from '@react-navigation/native';

const Images = () => {
    const [images, setImages] = useState([]);

    const navigation = useNavigation()

    const handleCameraLaunch = () => {
        if (images.length >= 5) {
            Toast.show('You can only select up to 5 images.');
            return;
        }

        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                Toast.show('User cancelled image picker');
            } else if (response.errorMessage) {
                Toast.show(`ImagePicker Error: ${response.errorMessage}`);
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (validateImage(response.assets[0])) {
                    setImages([...images, uri]);
                } else {
                    Toast.show('Invalid image. Please take a proper photo.');
                }
            }
        });
    };

    const validateImage = (asset) => {
        const { width, height } = asset;
        return width >= 400 && height >= 400;
    };

    const handleNext = async () => {
        try {
            await api.uploadImage(images)
            Toast.show('Image Succfully Uploaded!', Toast.LONG);
            navigation.navigate('Login');
        } catch (error) {
            Toast.show('Image Uploaded failed. Please try again.', Toast.LONG);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select up to 5 images</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={handleCameraLaunch} disabled={images.length >= 5}>
                    <Text style={styles.loginButtonText}>Take Photo</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {images.map((imageUri, index) => (
                    <Image key={index} source={{ uri: imageUri }} style={styles.image} />
                ))}
            </ScrollView>
            <Text style={styles.imageCount}>Images Selected: {images.length}/5</Text>
            {images.length === 5 && (
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
                        <Text style={styles.loginButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    imageCount: {
        textAlign: 'center',
        marginTop: 10,
    },
    nextButtonContainer: {
        marginTop: 20,
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
});

export default Images;
