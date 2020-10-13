import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Header extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{paddingTop:5}}  
                    onPress={() => {
                            this.props.nav.goBack()
                        }}>
                    <Icons name={'arrow-left'} size={24} color={'#fff'}/>
                </TouchableOpacity>
                
                <Text style={styles.title }>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:80, backgroundColor:'#121d45', paddingTop:40, padding:10
    },
    title:{
        color:'#fff', fontSize:24, fontWeight:'bold', paddingLeft:5
    }
})