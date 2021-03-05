import React from 'react'
import {StyleSheet, View, Image, Dimensions, Modal, StatusBar, Text, TouchableOpacity} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import F from "react-native-vector-icons/Fontisto"
import colors from '../assets/colors/colors'


import SettingsButton from '../components/settings/SettingsButton'
export default class  Splash extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('Enter',{})
        }, 3000)
    }

  

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='black'/>
                <View style={styles.contentContainer}>
                    <Image resizeMode='contain' style={styles.image} source={require('../assets/brain.png')}/>
                    <Text style={styles.name}>QO<Text style={styles.on}>ON</Text></Text>
                </View>
         
            </View>
        )
    }
}

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'center'
    },
    contentContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    name:{
        color:'white',
        fontSize:35,
        fontWeight:'bold'
    },
    image:{
        height:width/2,
        width:width/2,
        borderRadius:90
        
    },
    on:{
        color:'#2EBBF2'
    }
})
