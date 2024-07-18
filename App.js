import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screen/Login';
import SignUp from './src/Screen/SignUp';
import Images from './src/Screen/Images';
import SplashScreen from './src/Screen/SplashScreen';
import ForgotPassword from './src/Screen/ForgotPassword';
import OTP from './src/Screen/OTP';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Tab = createNativeStackNavigator();

function App() {

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="SplashScreen" component={SplashScreen}/>
          <Tab.Screen name="Login" component={Login}/>
          <Tab.Screen name="SignUp" component={SignUp}/>
          <Tab.Screen name="Images" component={Images}/>
          <Tab.Screen name="ForgotPassword" component={ForgotPassword}/>
          <Tab.Screen name="OTP" component={OTP}/>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
