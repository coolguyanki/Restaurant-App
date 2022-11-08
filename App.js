
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
 import HomeScreen from './screens/HomeScreen';
 import MenuScreen from './screens/MenuScreen';
 import LoginScreen from './screens/LoginScreen';


const Stack = createNativeStackNavigator()

export default function App() {

  return (
    
     <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" options={{ title: 'Login Screen' }} component={LoginScreen}/>
      <Stack.Screen name="Home" options={{ title: 'Restaurants List' }} component={HomeScreen}/>
      <Stack.Screen name="Menu" component={MenuScreen}/>  
      </Stack.Navigator>
     </NavigationContainer>
    
    
      
  );   
}


const styles = StyleSheet.create({
header:{
  flex:1,
  alignItems:'center',
  justifyContent:'center'
}
 

});
