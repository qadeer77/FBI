import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Home from './Home';
import { ImagesPath } from '../Constant/ImagesPath/ImagesPath';
import ProfileScreen from './ProfileScreen';
import FeedBack from './FeedBack';
import Receipt from './Receipt';

const Tab = createBottomTabNavigator();
const BottomScreen = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60, backgroundColor: '#0000FF' },
                tabBarItemStyle: { backgroundColor: '#0000FF' },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.homeWhiteImage : ImagesPath.homeBlackImage}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FFFFFF' : '#FFFFFF', marginBottom: 2 }}>Home</Text>
                    ),
                }}
            />
             <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.Profile : ImagesPath.profileBlack}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FFFFFF' : '#FFFFFF', marginBottom: 2 }}>Profile</Text>
                    ),
                }}
            />
              <Tab.Screen
                name="FeedBack"
                component={FeedBack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.feedbackBlack : ImagesPath.feedbackWhite}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FFFFFF' : '#FFFFFF', marginBottom: 2 }}>FeedBack</Text>
                    ),
                }}
            />
              <Tab.Screen
                name="Receipt"
                component={Receipt}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={focused ? ImagesPath.feedbackBlack : ImagesPath.feedbackWhite}
                            style={{ width: 25, height: 25 }}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#FFFFFF' : '#FFFFFF', marginBottom: 2 }}>Receipt</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

});

export default BottomScreen
