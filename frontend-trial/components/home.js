import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(){
    return(
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>EduPlace</Text>
                <Text style={styles.title}>Sign In</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.titleItem}>Kategori</Text>
                <Text style={styles.titleItem}>Course</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    header:{
        height:80,
        paddingTop:35,
        paddingRight:10,
        paddingLeft:10,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'pink'
    },
    title:{
        color:'blue',
        fontSize:16,
    },
    content:{
        padding:10,
    },
    titleItem:{
        fontSize:14,
        fontWeight:'bold'
    }
})