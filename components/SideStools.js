import React from 'react'
import {StyleSheet, View, StatusBar, Text, Dimensions, TouchableOpacity} from 'react-native'
import {Entypo, Ionicons} from '@expo/vector-icons'
import colors from '../colors/colors'

export default class  SideStools extends React.Component{
  
    render(){
        return(
            <View style={styles.sideStoolsContainer}>

            </View>
        )
    }
}

const {width, height} = Dimensions.get('window')


const styles = StyleSheet.create({

    sideStoolsContainer:{
        backgroundColor:colors.onBackround,
        height:height - (width/2),
        width:width/7,
        position:'absolute',
        alignSelf:'flex-end',
        right:width/30,
        elevation:10
    }
})