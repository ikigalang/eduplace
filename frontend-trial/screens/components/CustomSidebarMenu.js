import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'


export default class Splash extends React.Component{


    render(){
        return(
            <View style={styles.container}>
                
                <View style={{height:200, backgroundColor:'#c5cde8', }}>
                    <Icons name={'account-circle'} color={'#fff'} size={50}/>
                </View>
                <View style={{padding:20,}}>
                    <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:16, fontWeight:'bold',color:'#121d45', width:100}}>Username </Text>
                        <Text style={{fontSize:16, fontWeight:'bold',color:'#121d45',}}>: Your Name</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{fontSize:16, fontWeight:'bold',color:'#121d45',width:100}}>Email </Text>
                        <Text style={{fontSize:16, fontWeight:'bold',color:'#121d45'}}>: Yourmail@mail.com </Text>
                    </View>
                </View>
                

            </View>
        )
    }

 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
  });