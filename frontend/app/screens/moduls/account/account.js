import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {HeaderAccount} from '@components';

export default class Splash extends React.Component{

    onLoginListeners  () {
        this.props.navigation.navigate('Login')
}

    render(){
        return(
            <View style={styles.container}>
                
                <View style={{height:290, backgroundColor:'#c5cde8', alignItems:'center', justifyContent:'center'}}>
                    <Icons name={'account-circle'} color={'#fff'} size={150}/>
                </View>
                <View style={{alignItems:'center', justifyContent:'center', paddingTop:50}}>
                <Text style={{fontSize:16, fontWeight:'bold', color:'#121d45'}}>You are not logged in !</Text>
                <Text style={{fontSize:16, fontWeight:'bold', color:'#121d45'}}>Please sign in....</Text>
                <TouchableOpacity style={{width:100, height:35, borderRadius:35, backgroundColor:'#e67e22', 
                        alignItems:'center', justifyContent:'center', flexDirection:'row',
                        marginTop:20
                    }}
                    onPress={() => { this.onLoginListeners() }}
                    >
                    <Icons name={'login-variant'} size={20} color={'#fff'}/>
                    <Text style={{color:'#fff', marginLeft:10}}>Sign In</Text>
                </TouchableOpacity>
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