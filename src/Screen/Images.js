import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { launchCamera } from 'react-native-image-picker';

const Images = () => {
    const [images, setImages] = useState([]);

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
        // Example validation: check image dimensions
        const { width, height } = asset;
        return width >= 400 && height >= 400; // Example minimum dimensions
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select up to 5 images</Text>
            <View style={styles.buttonContainer}>
                <Button title="Take Photo" onPress={handleCameraLaunch} disabled={images.length >= 5} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {images.map((imageUri, index) => (
                    <Image key={index} source={{ uri: imageUri }} style={styles.image} />
                ))}
            </ScrollView>
            <Text style={styles.imageCount}>Images Selected: {images.length}/5</Text>
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
});

export default Images;
