import React from 'react'
import {StyleSheet, View, StatusBar, Text, Dimensions, TouchableOpacity} from 'react-native'
import {Entypo, Ionicons} from '@expo/vector-icons'
import colors from '../colors/colors'

export default class  Number extends React.Component{
  
    render(){
        return(
            <View style={[styles.container, {...this.props.style}]}>
                <Text style={styles.value}>{this.props.value}</Text>
            </View>
        )
    }
}

const {width, height} = Dimensions.get('window')


const styles = StyleSheet.create({
    container:{
        padding:0,
        borderColor:'white',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        width:width/6,
        height:width/6,
        marginRight:10,
        marginVertical:10,
    },
    value:{
        color:'white',
        fontWeight:'bold',
        fontSize:40
    }
})