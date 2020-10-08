import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FontAwesome} from '@expo/vector-icons';

export default function Header(){
    return(
        <View>
            <View style={styles.header}>
                <TextInput 
                    placeholder='search'
                    style={styles.input}
                >
                <FontAwesome name="search" size={20} color='blue' />
                </TextInput>
                
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    header:{
        height:80,
        paddingTop:35,
        paddingLeft:20,
        paddingRight:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    input:{
        borderBottomWidth:1,
        width:300,
        borderBottomColor:'blue'
    }

})