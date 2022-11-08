import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity ,Image ,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowHeight = Dimensions.get('window').height;

export default function LoginScreen({navigation}) {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(()=>{
    AsyncStorage.getItem('username').then((response)=>{
        if(response !== null){
            navigation.replace('Home')
        }
    })
  },[])

  const loginUser =  async () => {
    const user = JSON.stringify(username);
    await AsyncStorage.setItem('username',user);
    setUsername('');
    setPassword('');
    navigation.replace('Home');
  }

    return(
        <View style={styles.container}>
         <Image style={styles.imgstyle}source={require('../assets/logo2.png')}/>
            <TextInput style={styles.input} placeholder='Username' value={username} onChangeText={(value) => setUsername(value)} />
            <TextInput style={styles.input} secureTextEntry={true}  placeholder='Password' value={password} onChangeText={(value) => setPassword(value)} />
            <TouchableOpacity onPress={loginUser}>            
            <Text style={styles.loginbtn}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        marginTop: windowHeight-900,
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },  
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },
    input: {
        paddingHorizontal: 13,
        borderWidth: 1,
        margin: 5,
        marginBottom: 20,
        borderRadius: 10,
        paddingVertical: 12
        // width: '100%' 
    },
    loginbtn: {
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: '#FF5733',
        color: 'white',
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20
    },
    imgstyle:{
       justifyContent:'center' ,
       allignItems:'center',
       width:350,
       
       
    }
});
