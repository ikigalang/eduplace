import React from 'react';
import { StyleSheet,  View, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Header extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder="Find course here...." style={styles.input}  >
                    <Icons name={'magnify'} color={'grey'} size={24} />
                </TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:80, 
        backgroundColor:'#121d45', 
        paddingTop:40, 
        paddingLeft:10
    },
    input:{
        backgroundColor:'#fff',
        borderRadius:20,
        height:30,
        width:335,
        fontSize:12,
       
    },
})