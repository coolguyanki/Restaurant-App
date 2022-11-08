import React, { useState, useEffect } from 'react';
import { StyleSheet,ActivityIndicator,View,Text,TouchableOpacity, Image, ScrollView, Linking, SliderComponent, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export default function HomeScreen({navigation}) {
    const [restaurant, setRestaurant] = useState([]);
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(false);

        useEffect(()=> {
            setLoading(true);
            getUsername();
            axios.get('https://foodbukka.herokuapp.com/api/v1/restaurant')
            .then(function(response) {
                setRestaurant(response.data.Result);
                console.log("Api Response", response.data)
                setLoading(false);
            })
            .catch(function(error){
                setLoading(false);
                console.log("APi Error Homescreen",error);
                Alert.alert("Warening","Something went wrong");
            })
        },[]);
        const getUsername = async () => {
            const user = await AsyncStorage.getItem('username');
            setUsername(JSON.parse(user));
        }
        const logoutUser = async () => {
            await AsyncStorage.removeItem('username');
            navigation.navigate('Login');
        }
   console.log("restaurant -------",restaurant)
    return(
        <View style={style.container}>
        <View style={style.navbar}>   
            <Icon style={style.userimg} name='user-o' size={20}  color="black"/>
            <Text style={style.username}>{username}</Text>
            <TouchableOpacity style={{marginRight:10}}><Text style={style.signout} onPress={logoutUser}> Logout</Text></TouchableOpacity>
            <Icon1 style={style.logoutimg} name='logout' size={20} color="black"/>
        </View>   
        <View style={style.loaderstyle}>
        { loading && <ActivityIndicator  size="large" />}
        </View>
        <FlatList 
          data={restaurant}
          keyExtractor={item=>item.id}
          renderItem={({item})=>
                <View style={style.card} >      
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={style.cardTitle}>{item.businessname.charAt(0).toUpperCase()+item.businessname.slice(1)}</Text>
                        <Text style={style.cardDes}>{item.location}</Text> 
                        <Text style={style.cardPrice}>&#8377;{item.averagecost}</Text>
                        <View style={{ flexDirection:'row' }}>
                        <TouchableOpacity style={style.cardButton} onPress={()=> Linking.openURL(`geo:${item.location}?center=${item.location}&q=${item.location}&z=16`)}>
                        <Icon name="map-marker" color="red" size={22} />
                        </TouchableOpacity>
                {
                    item?.email
                    &&
                    <TouchableOpacity style={style.cardButton} onPress={() => Linking.openURL(`mailto:${item.email}`)}>
                    <Icon name="envelope" color="rgb(25,121,169)" size={22} />
                    </TouchableOpacity>
                }
                {
                    item?.phone
                    &&
                    <TouchableOpacity style={style.cardButton} onPress={()=> Linking.openURL(`tel:${item.phone}`)}>
                    <Icon name="phone" color="green" size={22} />
                    </TouchableOpacity>
                }
                </View>    
                 </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end'  }}>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Menu',{
                                restaurantname: item.businessname,
                                location: item.location,
                                address: item.address,
                            })
                        }}>
                            <Image style={style.cardImage}  source={{uri: item.image }} />
                        </TouchableOpacity>
                    </View>
                </View>      
            </View>  
        }
        />
        
        </View>
    );
 }

const style= StyleSheet.create({
    container:{
        flex:1,
        marginBottom:30
    }, 
    loaderstyle: {
        flex: 1,
        justifyContent: 'center'
    },
    signout :{
        right:15,
        bottom:7,  
        fontSize:20,
        fontWeight:'600',
        paddingTop:12,
        alignitems:'flex-end',
        left:1,
        flexDirection:'row',
        marginBottom:6,
        marginLeft: 6,
        color:'black'
    },
    username:{
        right:10,
        bottom:5,  
        fontSize:20,
        fontWeight:'600',
        paddingTop:12,
        alignitems:'flex-start',    
        flexDirection:'row',
        marginBottom:6,
        marginRight:135,
        color:'black'
    },
    userimg:{
        top:2,
        flex:1,
        marginTop:8,
        paddingLeft:18
    },
    logoutimg:{
        flex:1,
        marginTop:9,
        right:2
    },
    textTitle:{
            fontSize: 18,
            fontWeight: '700',
            paddingTop: 8,
            marginLeft:10
        },
    navbar : {
            margin: 4,
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom: 8

        },
    card : {
            paddingHorizontal:14,
            paddingTop: 8,
            backgroundColor: "white",
            margin: 8,
            marginTop: 12,  
            borderRadius: 8,
        },
    cardTitle: {
            fontWeight: '700',
            fontSize: 16,
        },
    cardDes: {
            marginTop: 2,
            color: '#999999'
        },
    cardPrice: {
            fontWeight: '400',
            paddingVertical: 8
        },
    cardButton: {
            marginVertical: 4,
            marginHorizontal: 8,
            padding: 4       
        },
    cardImage: {
            width: 100,
            height: 100,
            borderRadius:5,
        }
});



