import React, { useState, useEffect } from 'react';
import { StyleSheet,View,Text,TouchableOpacity, Image, ScrollView, Linking, SliderComponent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export default function HomeScreen({navigation}) {

    const [restaurant, setRestaurant] = useState([]);
    const [username, setUsername] = useState();

    const getUsername = async () => {
        const user = await AsyncStorage.getItem('username');
        setUsername(JSON.parse(user));
    }

    const logoutUser = async () => {
        await AsyncStorage.removeItem('username');
        navigation.navigate('Login');
    }

    useEffect(()=> {
        getUsername();
        axios.get('https://foodbukka.herokuapp.com/api/v1/restaurant')
        .then(function(response) {
            setRestaurant(response.data.Result);
            // console.log(restaurant.data.Result[0].email);
        })
        .catch(function(error){
            console.log(error);
        })
    },[]);


    return(
        <View style={style.container}>
        <View style={style.navbar}>   
            {/* <Text style={style.textTitle}>Restaurant Lists</Text> */}
            <Text style={style.signout}>{username}</Text>
            <TouchableOpacity style={{marginRight:10}}><Text style={style.signout} onPress={logoutUser}> Logout</Text></TouchableOpacity>

            
        </View>   

        <ScrollView>
        {
            restaurant.map((item) => (
                <View style={style.card} key={item.id}>      
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
                    item?. phone
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
         
            ))
        }
        </ScrollView>
        </View>
    );
 }
    

const style= StyleSheet.create({

container:{
    flex:1,
    marginBottom:30
//  height:  100
}, 

signout :{
    right:15,
    bottom:5,  
    fontSize:20,
    fontWeight:'bold',
    paddingTop:12,
    alignitems:'flex-end',
    right:5,
    flexDirection:'row',
    marginBottom:6,
    marginLeft: 14,
    color:'red'
},
username:{
    right:15,
    bottom:5,  
    fontSize:20,
    fontWeight:'bold',
    paddingTop:12,
    alignitems:'flex-end',
    right:5,
    flexDirection:'row',
    marginBottom:6,
    marginLeft: 14,
    color:'green'
},
    textTitle:{
        fontSize: 17,
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
        // shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 8},
        // shadowOpacity: 1,
        // shadowRadius: 3,
        borderRadius: 8,
        // elevation: 1,
    },
    cardTitle: {
         fontWeight: '700',
        fontSize: 17,
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

//export default HomeScreen;

