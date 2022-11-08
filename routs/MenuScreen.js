import axios from 'axios';
import React ,{useState, useEffect}from 'react';
import {StyleSheet, View, Text,TouchableOpacity,ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Entypo';


export default function MenuScreen({ naviagtion, route }){
  const { restaurantname, location, address } = route.params;
  const[menu, setMenu]= useState([]);

  useEffect(()=>{
    axios.get('https://foodbukka.herokuapp.com/api/v1/menu')
    .then(function (response){
      //console.log(response.data.Result);
      setMenu(response.data.Result);
    })
    .catch( function(error){
      console.log('error');
    })
  },[]);



    return(
        <View style={style.menubar}>
        <View style={style.menuHeader}>
        <Text style={style.menuTitle}>{restaurantname.charAt(0).toUpperCase() + restaurantname.slice(1)}</Text>
        <Text style={{marginHorizontal:5,marginTop:2,marginBottom:6,paddingHorizontal:0}}>{location}, {address}</Text>
        </View>
        <View style={style.catView}>
          <TouchableOpacity>
            <Text style={style.catBtn}><Image style={style.catIcon} source={ require('../assets/veg.png')} /> Veg</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={style.catBtn}><Image style={style.catIcon} source={ require('../assets/nonveg.png')} />  Non Veg</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {
            menu.map((item) =>(
          <View style={style.card} key ={item._id} >
            
            <View style={style.cardInfo}>
              <Text style={style.cardTitle}>{item.menuname}</Text>
              <Text style={style.description}>{item.description.substring(0,60)}...</Text> 
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={style.likeBtn} onPress={()=>{}}>
                   <Icon name = "heart-o" color="#ed4a52" size={20}  />
                </TouchableOpacity>
                <TouchableOpacity style={style.forwardBtn} onPress={()=>{}}>
                     <Icon name = "mail-forward" color="#ff471a" size={20} />
                </TouchableOpacity>
              
              </View>
              {/* <Text stlye={style.price}>&#x20B9; 200</Text> */}
            </View>
            
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              {/* <Text style={style.cardPrice}>&#8377;20</Text>  */}
              <TouchableOpacity style={style.addbtn}>
                <Text style={style.cardBtn}>Add +</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'flex-start'  }}>
                <TouchableOpacity onPress={()=>{
                        alert("we will shortly connect with you,thanks for reaching us");
                      }}>
                <Image style={style.cardImage}  source={{uri :item.images[1]}} />
                </TouchableOpacity> 
            </View>    
          </View>


      
          ))}

          </ScrollView>
        
      </View>
    );
}

const style= StyleSheet.create({

    menuTitle:{
        fontSize: 18,
        fontWeight: '800',
        marginHorizontal:5
        
    },
    menuHeader: {
      padding: 8,
      marginHorizontal: 8,
      marginVertical: 12,
      backgroundColor: 'white',
      borderRadius: 13,
      elevation: 1,
    },
    price:{
      
    },
    catView: {
      flexDirection: 'row',
      marginLeft: 8,
      marginBottom: 8,
      paddingHorizontal:5,
      paddingRight:6
    },
    catBtn: {
      marginHorizontal: 4,
      backgroundColor: 'white',
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontWeight: 'bold',
      elevation: 3,
      borderRadius:13,
    
    },
    card : {  
        flexDirection: 'row',
        padding: 12,
        backgroundColor: "#ffff",
        margin: 8,
        marginTop: 12,
        // shadowOffset: {width: -2, height: 8}, 
        shadowOpacity: 0.25,
        shadowRadius: 3,
        borderRadius: 3,
        elevation: 0,
        backgroundColor: '#FFFFFF'
    },
    cardTitle :{
        padding : 4,
        fontSize:19,
        margin:4,
      fontWeight: '700'
   
    },
    cardPrice:{     
    padding: 2,
    marginLeft: 12,
    fontWeight: 'bold',

    },
    cardImage:{
        width: 90,
        height: 90,
        borderRadius: 5,
    },
    description: {
      marginLeft: 8,
      color: '#999999',
      marginBottom:18
    },  
    cardInfo: {
      flexDirection: 'column',
      flex: 1,
      
    },
    cardBtn: {
      marginTop: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      color: 'white',
      backgroundColor: 'red',
      borderRadius: 10,
      fontWeight: 'bold',
    },
    catIcon: {
      width:18,
      height: 18,
    },likeBtn:{
      borderWidth:1,
      borderColor:'grey',
      borderRadius:90,
      marginRight:10,
      padding:5,
      alignSelf:'center'
    },forwardBtn:{
      borderWidth:1,
      borderColor:'grey',
      borderRadius:90,
      marginRight:10,
      padding:5,
      alignSelf:'center'
    },
    addbtn:{
      paddingVertical:17,
      left:80,
      top:15,
      marginTop:10
    }
    
        
      
      

})