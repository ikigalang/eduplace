import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList,ActivityIndicator, Image } from 'react-native';
import {Header} from '@components';
import { AirbnbRating } from 'react-native-ratings';

export default class Splash extends React.Component{



    render(){
        return(
            <View>
                <Header title="List Course" nav={this.props.navigation}/>
                <View style={styles.container}>
                    <Text style={styles.text}>You are not logged in !</Text>
                </View>
                
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
      height:400,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize:16,
        color:'#e67e22'
    }
    
  });