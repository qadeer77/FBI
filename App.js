import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screen/Login';
import SignUp from './src/Screen/SignUp';
import Images from './src/Screen/Images';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Tab = createNativeStackNavigator();

function App() {

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Login" component={Login}/>
          <Tab.Screen name="SignUp" component={SignUp}/>
          <Tab.Screen name="Images" component={Images}/>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
