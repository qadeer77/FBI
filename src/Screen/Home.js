import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { ImagesPath } from '../Constant/ImagesPath/ImagesPath';
import { AppFonts } from '../Constant/Fonts/Font';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const cardData = [
    { id: '1', title: 'Card 1', image: ImagesPath.cardImage, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '2', title: 'Card 2', image: ImagesPath.cardImage1, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '3', title: 'Card 3', image: ImagesPath.cardImage2, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '4', title: 'Card 4', image: ImagesPath.cardImage3, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '5', title: 'Card 5', image: ImagesPath.cardImage2, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: '6', title: 'Card 6', image: ImagesPath.cardImage2, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

const Home = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = auth().currentUser;
                if (user) {
                    const userDoc = await firestore().collection('users').doc(user.uid).get();
                    setUserData(userDoc.data());
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchData();
    }, []);


    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.navigate('Login');
            await AsyncStorage.setItem('isLoggedIn', 'false');
            showToast('Logout Succefull!')
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    const showToast = (text) => {
        Toast.show(text, Toast.LONG);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => {
                    if (userData) {
                        navigation.navigate('ProfileScreen', { userData });
                    }
                }}>
                    {userData && userData.imageUrl ? (
                        <Image source={{ uri: userData.imageUrl }} style={styles.userImage} />
                    ) : (
                        <Text>No Image</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.name}>Mart</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Image source={ImagesPath.logoutIcon} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={cardData}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cardContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    name: {
        color: "black",
        fontSize: 20,
        fontFamily: AppFonts.regular
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 15,
        padding: 15,
        alignItems: 'center'
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: AppFonts.regular,
        color: '#333',
        marginBottom: 5
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontFamily: AppFonts.regular
    }
});

export default Home;
