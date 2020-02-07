import React from 'react'
import {StyleSheet, View, StatusBar, Text, Dimensions, TouchableOpacity} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"


import colors from '../colors/colors'

export default class  Settings extends React.Component{
  
    render(){
        return(
            <TouchableOpacity onPress={this.props.openSettingsModal} style={[styles.container]} >
                <Ionicons name='ios-settings' size={width/10} color='white' />
            </TouchableOpacity>
        )
    }
}

const {width, height} = Dimensions.get('window')


const styles = StyleSheet.create({
    container:{
        top:0,
        right:0,
        position:'absolute',
        margin:width/20
    }
})